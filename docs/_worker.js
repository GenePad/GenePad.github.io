// GenePad 匿名使用统计接口（Cloudflare Pages 高级模式 _worker.js）
//
// 部署于 genepad.pages.dev 构建输出根目录后,Pages 自动启用高级模式：
// 所有请求先进本 Worker,/api/telemetry 由本文件处理并读写绑定的 D1
// （变量名必须是 DB）,其余路径原样回落到静态资源(env.ASSETS),
// 站点行为与之前完全一致。
//
// 客户端载荷(每 7 天一次,见 Gene Editor 仓库 docs/telemetry.md)：
// { uuid, appVersion, platform, os, usageSecondsTotal, usageSecondsPeriod, reportedAt }
// os 为粗粒度系统归属:windows/linux/macos/android/other(旧客户端不带,按 platform 前缀回退推导)
//
// 建表 SQL(在 D1 控制台执行一次)：
//   CREATE TABLE IF NOT EXISTS usage_reports (
//     uuid TEXT PRIMARY KEY,
//     app_version TEXT NOT NULL DEFAULT '',
//     platform TEXT,
//     os TEXT,
//     usage_seconds_total INTEGER NOT NULL DEFAULT 0,
//     report_count INTEGER NOT NULL DEFAULT 0,
//     first_seen_at INTEGER NOT NULL,
//     last_seen_at INTEGER NOT NULL
//   );
//   CREATE INDEX IF NOT EXISTS idx_usage_reports_last_seen ON usage_reports (last_seen_at);
//   CREATE INDEX IF NOT EXISTS idx_usage_reports_version ON usage_reports (app_version);
//
// 已建库升级(一次性,必须先于本版本部署执行,否则 os 列缺失导致 UPSERT 500)：
//   ALTER TABLE usage_reports ADD COLUMN os TEXT;
//
// ── 用户反馈 / 公开留言墙(/api/feedback)──
// 前端:全站页脚「在线反馈」弹窗 POST 提交(文本 + 可选联系方式),
// 公开反馈墙 /feedback 页经 GET /api/feedback/list 只读展示。
// 提交需 Cloudflare Turnstile 令牌(服务端 siteverify 二次校验),
// 并按 IP 限流(固定 1 小时窗口 ≤5 条);公开列表只输出 hidden=0 的行,
// page / ip_hash / user_agent 不出接口。
// 【图片功能下线(2026-09-27,纯文字版)】:R2 存储/图片端点代码保留为注释块,
// 统一打 IMAGE-REENABLE 标记,恢复指南见 AGENTS.md「Feedback API」;
// images 列保留为预留(恒为 '[]'),list 接口仍返回该字段(空数组)。
// 一次性配置(Turnstile widget、TURNSTILE_SECRET_KEY)与删除/隐藏手册见
// AGENTS.md「Feedback API」一节。
// 建表 SQL(在 D1 控制台执行一次)：
//   CREATE TABLE IF NOT EXISTS feedback (
//     id TEXT PRIMARY KEY,
//     text TEXT NOT NULL,
//     contact TEXT,
//     page TEXT,
//     images TEXT NOT NULL DEFAULT '[]',  -- 预留列:图片功能下线期间恒为 '[]'
//     ip_hash TEXT NOT NULL,
//     user_agent TEXT,
//     hidden INTEGER NOT NULL DEFAULT 0,
//     created_at INTEGER NOT NULL
//   );
//   CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback (created_at);
//   CREATE TABLE IF NOT EXISTS feedback_ip_window (
//     ip_hash TEXT PRIMARY KEY,
//     window_start INTEGER NOT NULL,
//     count INTEGER NOT NULL
//   );

const UUID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const MAX_TEXT_LENGTH = 64;
const MAX_USAGE_SECONDS = 1_000_000_000;
const OS_WHITELIST = new Set(['windows', 'linux', 'macos', 'android', 'other']);

// ── 用户反馈限制 ──
const FB_MAX_TEXT = 5000;
const FB_MAX_CONTACT = 200;
const FB_MAX_PAGE = 300;
/* 【IMAGE-REENABLE】图片功能下线(2026-09-27)。恢复步骤:
   ① 取消本块与 handleFeedback / handleFeedbackImage 内同标记注释;
   ② Pages 项目重新绑定 R2 桶变量 FEEDBACK_BUCKET(并重新部署);
   ③ 前端表单图片 UI 按 git 历史(app/src/feedback.tsx @ 170a04d)恢复。 */
// const FB_MAX_IMAGES = 3;
// const FB_MAX_IMAGE_BYTES = 5 * 1024 * 1024;
// const FB_IMAGE_TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
const FB_RATE_WINDOW_MS = 60 * 60 * 1000; // 每 IP 固定 1 小时窗口
const FB_RATE_LIMIT = 5;
/* 【IMAGE-REENABLE】R2 对象 key 白名单(与写入侧 fb/<yyyymmdd>/<uuid>/<n>.<ext> 一一对应):
   key 含随机 UUID,不经 list 接口拿不到,图片 URL 不可枚举 */
// const FB_IMAGE_KEY_RE = /^fb\/\d{8}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[123]\.(png|jpg|webp|gif)$/;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS, ...extraHeaders },
  });
}

function clampSeconds(value) {
  const seconds = typeof value === 'number' && Number.isFinite(value) ? Math.floor(value) : 0;
  return Math.min(Math.max(seconds, 0), MAX_USAGE_SECONDS);
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.slice(0, MAX_TEXT_LENGTH) : '';
}

async function handleReport(request, env) {
  if (!env.DB) {
    return json({ error: 'd1 binding missing' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid json' }, 400);
  }

  const uuid = typeof body.uuid === 'string' ? body.uuid : '';
  if (!UUID_PATTERN.test(uuid)) {
    return json({ error: 'invalid uuid' }, 400);
  }

  const appVersion = sanitizeText(body.appVersion);
  const platform = body.platform === null ? null : sanitizeText(body.platform);
  // 旧客户端载荷没有 os:存 NULL,聚合查询按 platform 前缀回退推导
  const os = typeof body.os === 'string' && OS_WHITELIST.has(body.os) ? body.os : null;
  const usageSecondsTotal = clampSeconds(body.usageSecondsTotal);
  const now = Date.now();

  try {
    // 累计时长取 MAX：离线补报 / 多窗口偶发双发不会把总量回退;
    // os 取 COALESCE:旧客户端(不带 os)重报不会抹掉已记录的值
    await env.DB.prepare(
      `INSERT INTO usage_reports (uuid, app_version, platform, os, usage_seconds_total, report_count, first_seen_at, last_seen_at)
       VALUES (?1, ?2, ?3, ?4, ?5, 1, ?6, ?6)
       ON CONFLICT(uuid) DO UPDATE SET
         app_version = excluded.app_version,
         platform = excluded.platform,
         os = COALESCE(excluded.os, usage_reports.os),
         usage_seconds_total = MAX(usage_reports.usage_seconds_total, excluded.usage_seconds_total),
         report_count = usage_reports.report_count + 1,
         last_seen_at = MAX(usage_reports.last_seen_at, excluded.last_seen_at)`
    )
      .bind(uuid, appVersion, platform, os, usageSecondsTotal, now)
      .run();
  } catch (err) {
    return json({ error: 'db error' }, 500);
  }

  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// ── 用户反馈(留言墙)──

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* 服务端二次校验前端 Turnstile 令牌;remoteip 交给 Cloudflare 做风控加权 */
async function verifyTurnstile(secret, token, ip) {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const outcome = await res.json();
    return outcome.success === true;
  } catch {
    return false;
  }
}

/* 每 IP 固定窗口计数;读写竞态下偶尔多放行一两条无关紧要,不值得上事务 */
async function feedbackRateLimited(env, ipHash, now) {
  const row = await env.DB.prepare(
    'SELECT window_start, count FROM feedback_ip_window WHERE ip_hash = ?1',
  )
    .bind(ipHash)
    .first();
  const inWindow = row && now - row.window_start < FB_RATE_WINDOW_MS;
  const windowStart = inWindow ? row.window_start : now;
  const count = (inWindow ? row.count : 0) + 1;
  await env.DB.prepare(
    `INSERT INTO feedback_ip_window (ip_hash, window_start, count) VALUES (?1, ?2, ?3)
     ON CONFLICT(ip_hash) DO UPDATE SET window_start = ?2, count = ?3`,
  )
    .bind(ipHash, windowStart, count)
    .run();
  return count > FB_RATE_LIMIT;
}

async function handleFeedback(request, env) {
  // 【IMAGE-REENABLE】恢复图片时改回三绑定守卫:
  // if (!env.DB || !env.FEEDBACK_BUCKET || !env.TURNSTILE_SECRET_KEY)
  if (!env.DB || !env.TURNSTILE_SECRET_KEY) {
    return json({ error: 'feedback bindings missing' }, 503);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'invalid form' }, 400);
  }

  const text = typeof form.get('text') === 'string' ? form.get('text').trim().slice(0, FB_MAX_TEXT) : '';
  if (!text) {
    return json({ error: 'text required' }, 400);
  }
  const contact = typeof form.get('contact') === 'string' ? form.get('contact').trim().slice(0, FB_MAX_CONTACT) : '';
  const page = typeof form.get('page') === 'string' ? form.get('page').trim().slice(0, FB_MAX_PAGE) : '';

  /* 【IMAGE-REENABLE】图片解析与校验(下线中):
  const images = form.getAll('images').filter((f) => f instanceof File && f.size > 0);
  if (images.length > FB_MAX_IMAGES) {
    return json({ error: 'too many images' }, 400);
  }
  for (const file of images) {
    if (!FB_IMAGE_TYPES[file.type]) return json({ error: 'invalid image type' }, 400);
    if (file.size > FB_MAX_IMAGE_BYTES) return json({ error: 'image too large' }, 400);
  }
  */

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const token = typeof form.get('turnstile') === 'string' ? form.get('turnstile') : '';
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
    return json({ error: 'captcha failed' }, 403);
  }

  const now = Date.now();
  const ipHash = await sha256Hex(ip);
  if (await feedbackRateLimited(env, ipHash, now)) {
    return json({ error: 'rate limited' }, 429);
  }

  const id = crypto.randomUUID();
  /* 【IMAGE-REENABLE】图片写 R2(下线中):
  const dateDir = new Date(now).toISOString().slice(0, 10).replace(/-/g, '');
  const keys = [];
  for (let i = 0; i < images.length; i += 1) {
    // 先写 R2 再写 D1:中间失败会留下孤儿图片对象,量级可忽略,不做回滚
    const key = `fb/${dateDir}/${id}/${i + 1}.${FB_IMAGE_TYPES[images[i].type]}`;
    await env.FEEDBACK_BUCKET.put(key, await images[i].arrayBuffer(), {
      httpMetadata: { contentType: images[i].type },
    });
    keys.push(key);
  }
  */
  try {
    await env.DB.prepare(
      `INSERT INTO feedback (id, text, contact, page, images, ip_hash, user_agent, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`,
    )
      .bind(
        id,
        text,
        contact,
        page,
        '[]', // images 预留列:纯文字版恒为空数组
        ipHash,
        (request.headers.get('User-Agent') ?? '').slice(0, 256),
        now,
      )
      .run();
  } catch (err) {
    return json({ error: 'storage error' }, 500);
  }

  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/* 公开留言墙列表:只吐 hidden=0 的行;before=上一页最后一条的 created_at(游标翻页) */
async function handleFeedbackList(url, env) {
  if (!env.DB) {
    return json({ error: 'd1 binding missing' }, 503);
  }

  const beforeRaw = Number(url.searchParams.get('before') ?? '0');
  const before = Number.isFinite(beforeRaw) && beforeRaw > 0 ? Math.floor(beforeRaw) : 0;
  const limitRaw = Number(url.searchParams.get('limit') ?? '20');
  const limit = Math.min(Math.max(Number.isFinite(limitRaw) ? Math.floor(limitRaw) : 20, 1), 50);

  try {
    const [rows, totalRow] = await Promise.all([
      env.DB.prepare(
        `SELECT id, text, contact, images, created_at FROM feedback
         WHERE hidden = 0${before ? ' AND created_at < ?2' : ''}
         ORDER BY created_at DESC LIMIT ?1`,
      )
        .bind(...(before ? [limit, before] : [limit]))
        .all(),
      env.DB.prepare('SELECT COUNT(*) AS n FROM feedback WHERE hidden = 0').first(),
    ]);
    const items = (rows.results ?? []).map((row) => ({
      id: row.id,
      text: row.text,
      contact: row.contact || null,
      images: JSON.parse(row.images ?? '[]'),
      createdAt: Number(row.created_at),
    }));
    return json({ ok: true, items, total: Number(totalRow?.n ?? 0) }, 200, {
      'Cache-Control': 'public, max-age=60',
    });
  } catch (err) {
    return json({ error: 'db error' }, 500);
  }
}

/* 【IMAGE-REENABLE】留言图片直读端点(下线中,整段保留):
async function handleFeedbackImage(url, env) {
  if (!env.FEEDBACK_BUCKET) {
    return json({ error: 'r2 binding missing' }, 503);
  }
  const key = url.searchParams.get('key') ?? '';
  if (!FB_IMAGE_KEY_RE.test(key)) {
    return json({ error: 'invalid key' }, 400);
  }
  try {
    const object = await env.FEEDBACK_BUCKET.get(key);
    if (!object) return json({ error: 'not found' }, 404);
    return new Response(object.body, {
      status: 200,
      headers: {
        'Content-Type': object.httpMetadata?.contentType ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
    return json({ error: 'storage error' }, 500);
  }
}
*/

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const STATS_WEEKS = 26;
const STATS_DAYS = 30;
// 周桶对齐到「周一 00:00 UTC」：epoch(1970-01-01) 是周四,直接用 t/WEEK 分桶会得到
// 周四~周三这种反直觉的周区间,向前平移 4 天后即为周一~周日。
const WEEK_ALIGN_MS = 4 * DAY_MS;
const STATS_CACHE_SECONDS = 300;

/* 桶起点（与服务端 SQL 的分桶表达式保持一致） */
const dayStart = (t) => Math.floor(t / DAY_MS) * DAY_MS;
const weekStart = (t) => Math.floor((t - WEEK_ALIGN_MS) / WEEK_MS) * WEEK_MS + WEEK_ALIGN_MS;

// ── 语言镜像路由 ──
// en/cn/de/ru/jp/kr/fr.genepad.cn 分别是面向搜索引擎的纯语言镜像：
// 镜像主机的路径映射到构建输出的 /<dir> 子树（docs/<dir>/*.html）；
// 哈希产物、截图、安装包、接口等共享资源仍取根路径。任何主机上的 /<dir>/*
// 一律 308 到对应子域名（容错历史路径）；genepad.pages.dev 的 /<dir>/* 静态直出，
// 作为子域名 DNS 配好前的预览入口。
const MIRROR_PREFIX_BY_HOST = {
  'en.genepad.cn': '/en',
  'cn.genepad.cn': '/cn',
  'de.genepad.cn': '/de',
  'ru.genepad.cn': '/ru',
  'jp.genepad.cn': '/jp',
  'kr.genepad.cn': '/kr',
  'fr.genepad.cn': '/fr',
};
// 镜像主机不前缀的共享路径。注意 /sitemap.xml 不共享：每个镜像主机有各自的
// /<dir>/sitemap.xml（gen-shells.mjs 生成），/robots.txt 共用同一份（其中列出全部主机的 sitemap）
const MIRROR_SHARED_PREFIXES = [
  '/assets/',
  '/shots/',
  '/release/',
  '/api/',
  '/update.json',
  '/icon.ico',
  '/icon.png',
  '/robots.txt',
];

function hostMatches(hostname, mirror) {
  return hostname === mirror || hostname.endsWith('.' + mirror);
}

/* 前缀路径（/en、/en/ 形式）重定向到拥有该前缀的镜像子域名 */
function prefixRedirect(pathname, search) {
  for (const [host, prefix] of Object.entries(MIRROR_PREFIX_BY_HOST)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return { redirect: 'https://' + host + pathname.slice(prefix.length) + search };
    }
  }
  return null;
}

/* 纯函数，便于 node 单测：返回 { redirect } 或 { assetPath }（null 表示原样交给 ASSETS） */
export function route(url) {
  for (const [mirror, prefix] of Object.entries(MIRROR_PREFIX_BY_HOST)) {
    if (!hostMatches(url.hostname, mirror)) continue;
    const redirected = prefixRedirect(url.pathname, url.search);
    if (redirected) return redirected;
    if (!MIRROR_SHARED_PREFIXES.some((p) => url.pathname.startsWith(p))) {
      return { assetPath: prefix + url.pathname };
    }
    return { assetPath: null };
  }
  if (url.hostname === 'genepad.cn') {
    const redirected = prefixRedirect(url.pathname, url.search);
    if (redirected) return redirected;
  }
  return { assetPath: null };
}

/* 公开聚合统计：只输出计数/总和,不含任何 uuid 明细。
   时间序列两条：weekly(近 26 周,周一 00:00 UTC 起)与 daily(近 30 个 UTC 自然日,
   最后一项是当天、仍在累计)——前端 stats 页按同一份数据切换视图,
   日/周分桶都补齐空桶,不依赖前端补零。
   另有 weeklyByOs / dailyByOs：同一批桶按系统拆分的装机数,桶键与合计序列逐一对齐,
   os 只保留非零键——前端把每根柱按系统堆叠着色 */
const OS_KEYS = ['windows', 'linux', 'macos', 'android', 'other'];
/* os 归一表达式:历史行 os 为 NULL(旧客户端载荷)时按 platform 前缀回退推导。
   总计 / 按周 / 按日三处查询必须共用它,拆分序列求和才严格等于合计序列 */
const OS_KEY_SQL = `COALESCE(os, CASE
             WHEN platform LIKE 'windows%' THEN 'windows'
             WHEN platform LIKE 'darwin%' THEN 'macos'
             WHEN platform LIKE 'linux%' THEN 'linux'
             WHEN platform = 'android' THEN 'android'
             ELSE 'other'
           END) AS os_key`;

/* 把 GROUP BY 桶,os_key 的行折成 桶起点ms -> {os: n} */
function collectOsBuckets(rows, field) {
  const map = new Map();
  for (const row of rows.results ?? []) {
    const at = Number(row[field]);
    const key = String(row.os_key ?? 'other');
    if (!OS_KEYS.includes(key)) continue;
    const m = map.get(at) ?? {};
    m[key] = (m[key] ?? 0) + Number(row.n);
    map.set(at, m);
  }
  return map;
}

/* 补齐空桶并按固定键序输出非零计数;field 为 'w'/'d',与合计序列桶键一致 */
function osSeries(map, nowBucket, count, stepMs, field) {
  const series = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const at = nowBucket - i * stepMs;
    const m = map.get(at) ?? {};
    const os = {};
    for (const k of OS_KEYS) {
      if (m[k]) os[k] = m[k];
    }
    series.push({ [field]: at, os });
  }
  return series;
}

async function handleStats(env) {
  if (!env.DB) {
    return json({ error: 'd1 binding missing' }, 503);
  }

  const now = Date.now();
  const [totals, weeklyRows, dailyRows, osRows, weeklyOsRows, dailyOsRows] = await Promise.all([
    env.DB.prepare(
      `SELECT COUNT(*) AS installs,
              COALESCE(SUM(CASE WHEN last_seen_at > ?1 THEN 1 ELSE 0 END), 0) AS active30d,
              COALESCE(SUM(CASE WHEN last_seen_at > ?2 THEN 1 ELSE 0 END), 0) AS active7d,
              COALESCE(SUM(usage_seconds_total), 0) AS total_seconds
       FROM usage_reports`,
    )
      .bind(now - 30 * 24 * 60 * 60 * 1000, now - 7 * 24 * 60 * 60 * 1000)
      .first(),
    env.DB.prepare(
      `SELECT ((first_seen_at - ${WEEK_ALIGN_MS}) / ${WEEK_MS}) * ${WEEK_MS} + ${WEEK_ALIGN_MS} AS wk,
              COUNT(*) AS n
       FROM usage_reports
       WHERE first_seen_at > ?1
       GROUP BY wk`,
    )
      .bind(now - STATS_WEEKS * WEEK_MS)
      .all(),
    // 日桶：按 UTC 自然日（与「近 30 天活跃」口径一致）,供前端「每日」视图切换
    env.DB.prepare(
      `SELECT (first_seen_at / ${DAY_MS}) * ${DAY_MS} AS d, COUNT(*) AS n
       FROM usage_reports
       WHERE first_seen_at > ?1
       GROUP BY d`,
    )
      .bind(now - STATS_DAYS * DAY_MS)
      .all(),
    // 分系统装机数;历史行 os 为 NULL(旧客户端载荷)时按 platform 前缀回退推导
    env.DB.prepare(
      `SELECT ${OS_KEY_SQL}, COUNT(*) AS n
       FROM usage_reports
       GROUP BY os_key`,
    ).all(),
    // 分系统 × 按周新增(桶定义与合计 weekly 完全一致)
    env.DB.prepare(
      `SELECT ((first_seen_at - ${WEEK_ALIGN_MS}) / ${WEEK_MS}) * ${WEEK_MS} + ${WEEK_ALIGN_MS} AS wk,
              ${OS_KEY_SQL}, COUNT(*) AS n
       FROM usage_reports
       WHERE first_seen_at > ?1
       GROUP BY wk, os_key`,
    )
      .bind(now - STATS_WEEKS * WEEK_MS)
      .all(),
    // 分系统 × 按日新增(桶定义与合计 daily 完全一致)
    env.DB.prepare(
      `SELECT (first_seen_at / ${DAY_MS}) * ${DAY_MS} AS d,
              ${OS_KEY_SQL}, COUNT(*) AS n
       FROM usage_reports
       WHERE first_seen_at > ?1
       GROUP BY d, os_key`,
    )
      .bind(now - STATS_DAYS * DAY_MS)
      .all(),
  ]);

  const counts = new Map(
    (weeklyRows.results ?? []).map((row) => [Number(row.wk), Number(row.n)]),
  );
  const currentWeekStart = weekStart(now);
  const weekly = [];
  for (let i = STATS_WEEKS - 1; i >= 0; i -= 1) {
    const w = currentWeekStart - i * WEEK_MS;
    weekly.push({ w, n: counts.get(w) ?? 0 });
  }

  const dayCounts = new Map(
    (dailyRows.results ?? []).map((row) => [Number(row.d), Number(row.n)]),
  );
  const currentDayStart = dayStart(now);
  const daily = [];
  for (let i = STATS_DAYS - 1; i >= 0; i -= 1) {
    const d = currentDayStart - i * DAY_MS;
    daily.push({ d, n: dayCounts.get(d) ?? 0 });
  }

  const byOs = { windows: 0, linux: 0, macos: 0, android: 0, other: 0 };
  for (const row of osRows.results ?? []) {
    const key = String(row.os_key ?? 'other');
    if (key in byOs) byOs[key] = Number(row.n);
  }

  const weeklyByOs = osSeries(
    collectOsBuckets(weeklyOsRows, 'wk'),
    currentWeekStart,
    STATS_WEEKS,
    WEEK_MS,
    'w',
  );
  const dailyByOs = osSeries(
    collectOsBuckets(dailyOsRows, 'd'),
    currentDayStart,
    STATS_DAYS,
    DAY_MS,
    'd',
  );

  return new Response(
    JSON.stringify({
      ok: true,
      installs: Number(totals?.installs ?? 0),
      active30d: Number(totals?.active30d ?? 0),
      active7d: Number(totals?.active7d ?? 0),
      totalHours: Math.round(Number(totals?.total_seconds ?? 0) / 360) / 10,
      byOs,
      weekly,
      daily,
      weeklyByOs,
      dailyByOs,
      updatedAt: now,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${STATS_CACHE_SECONDS}`,
        ...CORS_HEADERS,
      },
    },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/telemetry') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      if (request.method === 'GET') {
        return json({ ok: true }, 200);
      }
      if (request.method === 'POST') {
        return handleReport(request, env);
      }
      return json({ error: 'method not allowed' }, 405);
    }

    if (url.pathname === '/api/telemetry/stats' && request.method === 'GET') {
      return handleStats(env);
    }

    if (url.pathname === '/api/feedback') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      if (request.method === 'POST') {
        return handleFeedback(request, env);
      }
      return json({ error: 'method not allowed' }, 405);
    }
    if (url.pathname === '/api/feedback/list' && request.method === 'GET') {
      return handleFeedbackList(url, env);
    }
    /* 【IMAGE-REENABLE】图片直读端点(下线中):
    if (url.pathname === '/api/feedback/image' && request.method === 'GET') {
      return handleFeedbackImage(url, env);
    }
    */

    const routed = route(url);
    if (routed.redirect) {
      return Response.redirect(routed.redirect, 308);
    }
    if (routed.assetPath) {
      return env.ASSETS.fetch(new Request('https://en.genepad.cn' + routed.assetPath, request));
    }
    return env.ASSETS.fetch(request);
  },
};
