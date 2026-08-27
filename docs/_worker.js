// GenePad 匿名使用统计接口（Cloudflare Pages 高级模式 _worker.js）
//
// 部署于 genepad.pages.dev 构建输出根目录后,Pages 自动启用高级模式：
// 所有请求先进本 Worker,/api/telemetry 由本文件处理并读写绑定的 D1
// （变量名必须是 DB）,其余路径原样回落到静态资源(env.ASSETS),
// 站点行为与之前完全一致。
//
// 客户端载荷(每 7 天一次,见 Gene Editor 仓库 docs/telemetry.md)：
// { uuid, appVersion, platform, usageSecondsTotal, usageSecondsPeriod, reportedAt }
//
// 建表 SQL(在 D1 控制台执行一次)：
//   CREATE TABLE IF NOT EXISTS usage_reports (
//     uuid TEXT PRIMARY KEY,
//     app_version TEXT NOT NULL DEFAULT '',
//     platform TEXT,
//     usage_seconds_total INTEGER NOT NULL DEFAULT 0,
//     report_count INTEGER NOT NULL DEFAULT 0,
//     first_seen_at INTEGER NOT NULL,
//     last_seen_at INTEGER NOT NULL
//   );
//   CREATE INDEX IF NOT EXISTS idx_usage_reports_last_seen ON usage_reports (last_seen_at);
//   CREATE INDEX IF NOT EXISTS idx_usage_reports_version ON usage_reports (app_version);

const UUID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const MAX_TEXT_LENGTH = 64;
const MAX_USAGE_SECONDS = 1_000_000_000;

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
  const usageSecondsTotal = clampSeconds(body.usageSecondsTotal);
  const now = Date.now();

  try {
    // 累计时长取 MAX：离线补报 / 多窗口偶发双发不会把总量回退
    await env.DB.prepare(
      `INSERT INTO usage_reports (uuid, app_version, platform, usage_seconds_total, report_count, first_seen_at, last_seen_at)
       VALUES (?1, ?2, ?3, ?4, 1, ?5, ?5)
       ON CONFLICT(uuid) DO UPDATE SET
         app_version = excluded.app_version,
         platform = excluded.platform,
         usage_seconds_total = MAX(usage_reports.usage_seconds_total, excluded.usage_seconds_total),
         report_count = usage_reports.report_count + 1,
         last_seen_at = MAX(usage_reports.last_seen_at, excluded.last_seen_at)`
    )
      .bind(uuid, appVersion, platform, usageSecondsTotal, now)
      .run();
  } catch (err) {
    return json({ error: 'db error' }, 500);
  }

  return new Response(null, { status: 204, headers: CORS_HEADERS });
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

    return env.ASSETS.fetch(request);
  },
};
