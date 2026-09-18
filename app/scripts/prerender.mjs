/* 构建后预渲染：把 docs/ 下 20 个构建页在无头浏览器里渲染成静态 HTML 再写回。
 *
 * 为什么需要：站点的构建页正文完全由 React 在浏览器里生成，静态 HTML 只有 boot 骨架。
 * Google 能靠 JS 渲染索引，但 Bing/百度 与 AI 抓取器（GPTBot、ClaudeBot 等）读不到内容。
 * 预渲染后正文、标题层级、内链都直接出现在 HTML 里，首屏也不再依赖 JS。
 *
 * 设计要点：
 * - 静态服务用 Node 内置 http，零 web 依赖；路径解析规则与 Cloudflare Pages 一致
 *   （/x → x.html、/en/x → en/x.html），因此渲染出来的内链与实际线上行为相同。
 * - 浏览器用系统已装的 Chrome/Edge（puppeteer-core 不下载浏览器），找不到就报错退出。
 * - 中文页先写入 localStorage:genepad-lang=zh，避免无头浏览器的 navigator.language
 *   把中文页渲染成英文；英文页靠 /en/ 路径前缀判定（见 src/i18n.tsx isEnContext）。
 * - 全部页面渲染成功后才统一写盘，失败不落地半成品。
 * - stats 页（noindex、依赖实时接口，会把加载态固化进 HTML）与 404 页不在预渲染之列。
 *
 * 手动重建 og 图：node scripts/og-image.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, "../../docs");
const SETTLE_MS = 300;

/* 待预渲染页面：path 是请求路径，file 是 docs/ 下要写回的产物，en 表示走英文主机。
   英文页必须用 en.genepad.cn 主机名渲染（靠 --host-resolver-rules 指到本地服务），
   否则 isEnHost() 为假，产物里的语言切换 / 仅中文页链接会指向错误的主机。 */
const PAGES = [
  { path: "/", file: "index.html" },
  { path: "/tech-support", file: "tech-support.html" },
  { path: "/projects", file: "projects.html" },
  { path: "/library", file: "library.html" },
  { path: "/ngs", file: "ngs.html" },
  { path: "/tutorial", file: "tutorial.html" },
  { path: "/tutorial-ai", file: "tutorial-ai.html" },
  { path: "/tutorial-library", file: "tutorial-library.html" },
  { path: "/tutorial-ngs", file: "tutorial-ngs.html" },
  { path: "/tutorial-lang", file: "tutorial-lang.html" },
  { path: "/", file: "en/index.html", en: true },
  { path: "/tech-support", file: "en/tech-support.html", en: true },
  { path: "/projects", file: "en/projects.html", en: true },
  { path: "/library", file: "en/library.html", en: true },
  { path: "/ngs", file: "en/ngs.html", en: true },
  { path: "/tutorial", file: "en/tutorial.html", en: true },
  { path: "/tutorial-ai", file: "en/tutorial-ai.html", en: true },
  { path: "/tutorial-library", file: "en/tutorial-library.html", en: true },
  { path: "/tutorial-ngs", file: "en/tutorial-ngs.html", en: true },
  { path: "/tutorial-lang", file: "en/tutorial-lang.html", en: true },
];

/* 英文主机不前缀的共享路径（与 _worker.js 的 EN_SHARED_PREFIXES 保持一致） */
const EN_SHARED_PREFIXES = [
  "/assets/",
  "/shots/",
  "/release/",
  "/api/",
  "/update.json",
  "/icon.ico",
  "/icon.png",
  "/robots.txt",
  "/sitemap.xml",
];

const EN_HOST_PATTERN = /(^|\.)en\.genepad\.cn$/i;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

/* ── 静态服务：解析规则对齐 Cloudflare Pages + _worker.js ── */
function resolveAsset(pathname) {
  const decoded = decodeURIComponent(pathname);
  const rel = decoded.replace(/^\/+/, "");
  const direct = path.join(DOCS_DIR, rel);
  if (rel && fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  const withHtml = `${direct}.html`;
  if (fs.existsSync(withHtml)) return withHtml;
  const indexPath = path.join(direct, "index.html");
  if (fs.existsSync(indexPath)) return indexPath;
  return null;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const host = req.headers.host ?? "";
    // 复刻 _worker.js：英文主机下非共享路径映射到 /en 子树
    const pathname =
      EN_HOST_PATTERN.test(host.split(":")[0]) &&
      !EN_SHARED_PREFIXES.some((p) => url.pathname.startsWith(p))
        ? `/en${url.pathname}`
        : url.pathname;
    const file = resolveAsset(pathname);
    if (!file) {
      const notFound = path.join(DOCS_DIR, "404.html");
      const body = fs.existsSync(notFound)
        ? fs.readFileSync(notFound)
        : Buffer.from("not found");
      res.writeHead(404, { "Content-Type": MIME[".html"] });
      res.end(body);
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

/* ── 收尾处理 ── */
function finalize(html, url) {
  let out = html;
  if (!/^<!doctype html>/i.test(out.trimStart())) {
    out = `<!doctype html>\n${out.trimStart()}`;
  }
  if (out.includes('id="boot"')) {
    // 固定定位的骨架层若残留会盖住静态正文，宁可让构建失败也不要产出这种页面
    throw new Error(`${url} 的产物里仍残留 #boot 骨架层`);
  }
  // 剥掉 kimi-plugin-inspect-react 运行时注入的 code-path="src\...:行:列" 调试属性：
  // 它们只在开发工具里有意义，写进静态产物纯属体积负担（首屏 HTML 里每个元素都有一条）
  out = out.replace(/ code-path="[^"]*"/g, "");
  return out;
}

async function main() {
  const { server, port } = await startServer();
  const origin = `http://127.0.0.1:${port}`;
  const enOrigin = `http://en.genepad.cn:${port}`;
  const headless = await launchBrowser({ hostMap: ["en.genepad.cn"] });
  const browser = headless.browser;

  const rendered = [];
  try {
    const page = await browser.newPage();

    // 预热 localStorage：中文页的 detectLang() 优先读它，保证渲染语言确定
    await page.goto(`${origin}/404.html`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try {
        localStorage.setItem("genepad-lang", "zh");
      } catch {
        /* 忽略 */
      }
    });

    for (const { path: pagePath, file, en } of PAGES) {
      const startedAt = Date.now();
      const url = `${en ? enOrigin : origin}${pagePath}`;
      await page.goto(url, { waitUntil: "load", timeout: 60000 });
      await page.waitForSelector("#root > *", { timeout: 30000 });
      // 让 useEffect（document.title、IntersectionObserver）与图片解码跑完
      await new Promise((r) => setTimeout(r, SETTLE_MS));
      await page.evaluate(() => document.getElementById("boot")?.remove());

      const html = finalize(await page.content(), url);
      rendered.push({ file, html });
      console.log(
        `  ${file.padEnd(28)} ${String(Math.round(html.length / 1024)).padStart(4)} KB  ${Date.now() - startedAt}ms`,
      );
    }
  } finally {
    await headless.close();
    server.close();
  }

  for (const { file, html } of rendered) {
    fs.writeFileSync(path.join(DOCS_DIR, file), html);
  }
  console.log(`预渲染完成：${rendered.length} 个页面已写回 docs/`);
}

main().catch((err) => {
  console.error(`\n预渲染失败：${err.message}`);
  process.exit(1);
});
