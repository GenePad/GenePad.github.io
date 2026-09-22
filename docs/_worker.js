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

const UUID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const MAX_TEXT_LENGTH = 64;
const MAX_USAGE_SECONDS = 1_000_000_000;
const OS_WHITELIST = new Set(['windows', 'linux', 'macos', 'android', 'other']);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
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

// ── en / cn 语言镜像路由 ──
// en.genepad.cn / cn.genepad.cn 分别是面向搜索引擎的纯英文 / 纯中文镜像：
// 镜像主机的路径映射到构建输出的 /en、/cn 子树（docs/en/*.html、docs/cn/*.html）；
// 哈希产物、截图、安装包、接口等共享资源仍取根路径。任何主机上的 /en/*、/cn/*
// 一律 308 到对应子域名（容错历史路径）；genepad.pages.dev 的 /en/*、/cn/* 静态直出，
// 作为子域名 DNS 配好前的预览入口。
const MIRROR_PREFIX_BY_HOST = {
  'en.genepad.cn': '/en',
  'cn.genepad.cn': '/cn',
};
const MIRROR_SHARED_PREFIXES = [
  '/assets/',
  '/shots/',
  '/release/',
  '/api/',
  '/update.json',
  '/icon.ico',
  '/icon.png',
  '/robots.txt',
  '/sitemap.xml',
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
