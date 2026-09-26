/* 生成/维护纯语言镜像壳页的 <head>（app/de|ru|jp|kr|fr/*.html），并统一全站 hreflang。
 *
 * 分工：
 * - app/*.html（中文根页）、app/en/*.html、app/cn/*.html 是手写底稿，本脚本不改其文案；
 * - de/ru/jp/kr/fr 五套壳页由本脚本以 app/en/*.html 为结构模板生成：
 *   只替换语言相关位（html lang、title/description/og/twitter/JSON-LD、canonical/
 *   hreflang、boot 骨架文案），正文骨架与脚本引用与 en 完全一致；
 * - 语言数据在 app/scripts/shell-i18n/<code>.mjs（title 必须与 src/lang/<code>.tsx
 *   的 title.* 译文一致）；
 * - 所有含 hreflang 的壳页（含 en/cn/中文根页）统一刷新为 7 语言 + x-default 的
 *   完整集合；stats 页 noindex、不带 hreflang，跳过。
 *
 * 手动运行：node scripts/gen-shells.mjs（npm run build 在 vite build 前自动执行）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(__dirname, "..");
const DOCS_DIR = path.resolve(APP_DIR, "..", "docs");
const SHELL_I18N_DIR = path.join(__dirname, "shell-i18n");

/* 站点全部语言的 alternates（顺序稳定，逐页一致）；zh 的规范主机是 cn.genepad.cn，
   x-default 是主站 genepad.cn。与 src/links.ts 的 MIRRORS、docs/_worker.js 保持一致 */
const SITES = [
  { lang: "zh-CN", host: "cn.genepad.cn" },
  { lang: "en", host: "en.genepad.cn" },
  { lang: "de", host: "de.genepad.cn" },
  { lang: "ru", host: "ru.genepad.cn" },
  { lang: "ja", host: "jp.genepad.cn" },
  { lang: "ko", host: "kr.genepad.cn" },
  { lang: "fr", host: "fr.genepad.cn" },
];
const X_DEFAULT = "https://genepad.cn";

/* 11 个构建页：key（shell-i18n 元数据键）与文件名 / 站内路径 */
const PAGES = [
  { key: "index", file: "index.html", sitePath: "/" },
  { key: "tech-support", file: "tech-support.html", sitePath: "/tech-support" },
  { key: "projects", file: "projects.html", sitePath: "/projects" },
  { key: "library", file: "library.html", sitePath: "/library" },
  { key: "ngs", file: "ngs.html", sitePath: "/ngs" },
  { key: "tutorial", file: "tutorial.html", sitePath: "/tutorial" },
  { key: "tutorial-ai", file: "tutorial-ai.html", sitePath: "/tutorial-ai" },
  { key: "tutorial-library", file: "tutorial-library.html", sitePath: "/tutorial-library" },
  { key: "tutorial-ngs", file: "tutorial-ngs.html", sitePath: "/tutorial-ngs" },
  { key: "tutorial-lang", file: "tutorial-lang.html", sitePath: "/tutorial-lang" },
  { key: "tutorial-langpack", file: "tutorial-langpack.html", sitePath: "/tutorial-langpack" },
  { key: "stats", file: "stats.html", sitePath: "/stats" },
];

/* 由本脚本生成的语言（en/cn/中文根页是手写底稿） */
const GENERATED = ["de", "ru", "ja", "ko", "fr"];

/* hreflang 块：现有壳页里是连续的 <link rel="alternate" hreflang=… /> 行 */
const HREFLANG_LINE = /[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n/;
const HREFLANG_BLOCK = new RegExp(`(?:${HREFLANG_LINE.source})+`);

function escAttr(s) {
  // HTML 属性/文本转义：& 先行（不碰已有实体），双引号防属性截断
  return s.replace(/&(?![a-zA-Z][a-zA-Z0-9]*;|#)/g, "&amp;").replace(/"/g, "&quot;");
}

function escJsString(s) {
  // JSON-LD 字符串值转义
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/* 替换 <meta …(name|property)="selector"…content="…"> 的 content（属性间可换行） */
function metaRe(selector) {
  return new RegExp(
    `(<meta[^>]*?(?:name|property)=(["'])${selector}\\2[^>]*?content=")[^"]*(")`,
  );
}

function mustReplace(html, re, replacement, label) {
  if (!re.test(html)) {
    throw new Error(`gen-shells: 未找到 ${label}`);
  }
  return html.replace(re, replacement);
}

/* 可选位（og/twitter/JSON-LD）：部分页（如 tech-support）的 head 本就没有这些标签 */
function softReplace(html, re, replacement) {
  return re.test(html) ? html.replace(re, replacement) : html;
}

function alternatesLines(sitePath) {
  const lines = SITES.map(
    (s) => `<link rel="alternate" hreflang="${s.lang}" href="https://${s.host}${sitePath}" />`,
  );
  lines.push(`<link rel="alternate" hreflang="x-default" href="${X_DEFAULT}${sitePath}" />`);
  return lines;
}

/* 把 hreflang 块刷新为全语言集合；块不存在时插到 canonical 之后（stats 页无 canonical 以下逻辑由调用方跳过） */
function refreshHreflang(html, sitePath) {
  const block = `${alternatesLines(sitePath)
    .map((l) => `    ${l}`)
    .join("\n")}\n`;
  if (HREFLANG_BLOCK.test(html)) {
    return html.replace(HREFLANG_BLOCK, block);
  }
  const canonicalRe = /([ \t]*<link rel="canonical" href="[^"]*" \/>\n)/;
  if (!canonicalRe.test(html)) {
    throw new Error(`gen-shells: 无 canonical 可挂 hreflang（sitePath=${sitePath}）`);
  }
  return html.replace(canonicalRe, `$1${block}`);
}

/* 生成一套语言壳页 */
async function generateLang(code) {
  const meta = (await import(pathToFileURL(path.join(SHELL_I18N_DIR, `${code}.mjs`)))).default;
  if (meta.code !== code) {
    throw new Error(`gen-shells: shell-i18n/${code}.mjs 的 code=${meta.code} 不符`);
  }
  let count = 0;
  for (const page of PAGES) {
    const m = meta.pages[page.key];
    if (!m) {
      throw new Error(`gen-shells: shell-i18n/${code}.mjs 缺少页面 ${page.key}`);
    }
    const canonical = `https://${meta.host}${page.sitePath}`;
    let html = fs.readFileSync(path.join(APP_DIR, "en", page.file), "utf8");

    html = mustReplace(html, /(<html lang=")en(")/, `$1${meta.htmlLang}$2`, `${code}/${page.file} <html lang>`);
    html = mustReplace(html, metaRe("description"), `$1${escAttr(m.description)}$2`, `${code}/${page.file} description`);
    html = mustReplace(html, /(<title>)[^<]*(<\/title>)/, `$1${escAttr(m.title)}$2`, `${code}/${page.file} <title>`);
    html = mustReplace(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`, `${code}/${page.file} canonical`);
    if (page.key !== "stats") {
      html = refreshHreflang(html, page.sitePath);
    }
    html = softReplace(html, metaRe("og:locale"), `$1${meta.ogLocale}$2`);
    html = softReplace(html, metaRe("og:title"), `$1${escAttr(m.title)}$2`);
    html = softReplace(html, metaRe("og:description"), `$1${escAttr(m.description)}$2`);
    html = softReplace(html, metaRe("og:url"), `$1${canonical}$2`);
    html = softReplace(html, metaRe("twitter:title"), `$1${escAttr(m.title)}$2`);
    html = softReplace(html, metaRe("twitter:description"), `$1${escAttr(m.description)}$2`);
    // boot 骨架：tech-support 页的 .bt 是 "Developer Docs<small>DEV DOCS</small>"（保持不译），
    // 其余页是 "GenePad<small>…</small>"；无对应位时跳过
    html = softReplace(
      html,
      /(<div class="bt">GenePad<small>)[^<]*(<\/small>)/,
      `$1${escAttr(meta.boot.tagline)}$2`,
    );
    html = softReplace(
      html,
      /(<p class="bd">)[^<]*(<\/p>)/,
      `$1${escAttr(meta.boot.desc)}$2`,
    );
    html = softReplace(
      html,
      /(role="status" aria-label=")[^"]*(")/,
      `$1${escAttr(meta.boot.loading)}$2`,
    );
    // JSON-LD 里的 description（0..n 处，统一改为该页 description）
    html = softReplace(
      html,
      /("description": ?)(?:"(?:[^"\\]|\\.)*")/g,
      `$1"${escJsString(m.description)}"`,
    );

    fs.mkdirSync(path.join(APP_DIR, meta.dir), { recursive: true });
    fs.writeFileSync(path.join(APP_DIR, meta.dir, page.file), html);
    count += 1;
  }
  return count;
}

/* 手写底稿（中文根页 / en / cn）只刷新 hreflang 块 */
function refreshExistingHreflang() {
  let count = 0;
  for (const dir of [".", "en", "cn"]) {
    for (const page of PAGES) {
      const file = path.join(APP_DIR, dir, page.file);
      if (!fs.existsSync(file)) continue;
      let html = fs.readFileSync(file, "utf8");
      if (page.key === "stats" || !HREFLANG_BLOCK.test(html)) continue;
      html = refreshHreflang(html, page.sitePath);
      fs.writeFileSync(file, html);
      count += 1;
    }
  }
  return count;
}

/* 每个镜像主机一份单源 sitemap（docs/<dir>/sitemap.xml）：sitemap 不允许混主机，
   根 sitemap 只列 genepad.cn；镜像 URL 靠 hreflang 互指 + 各自 sitemap + 页脚互链被发现。
   口径与根 sitemap 一致：stats 无 noindex 之外的独立价值且依赖实时接口，不列出。
   七个镜像主机全覆盖（en/cn 的壳页是手写的，但 sitemap 同样在此生成）。 */
const SITEMAP_PAGES = PAGES.filter((p) => p.key !== "stats");
const SITEMAP_HOSTS = [
  { dir: "en", host: "en.genepad.cn" },
  { dir: "cn", host: "cn.genepad.cn" },
  { dir: "de", host: "de.genepad.cn" },
  { dir: "ru", host: "ru.genepad.cn" },
  { dir: "jp", host: "jp.genepad.cn" },
  { dir: "kr", host: "kr.genepad.cn" },
  { dir: "fr", host: "fr.genepad.cn" },
];
const SITEMAP_PRIORITY = {
  index: "1.0",
  "tech-support": "0.8",
  library: "0.8",
  ngs: "0.8",
  tutorial: "0.8",
  projects: "0.7",
  "tutorial-ai": "0.7",
  "tutorial-library": "0.7",
  "tutorial-ngs": "0.7",
  "tutorial-lang": "0.7",
};
const today = () => new Date().toISOString().slice(0, 10);

function generateMirrorSitemaps() {
  const lastmod = today();
  let count = 0;
  for (const { dir, host } of SITEMAP_HOSTS) {
    const urls = SITEMAP_PAGES.map(
      (p) => `    <url>
        <loc>https://${host}${p.sitePath}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${SITEMAP_PRIORITY[p.key]}</priority>
    </url>`,
    ).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- 由 app/scripts/gen-shells.mjs 自动生成（勿手改）：仅列 ${host} 单主机 URL。
     镜像间的语言对应关系靠各页 head 的 hreflang 八联互指。 -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    fs.mkdirSync(path.join(DOCS_DIR, dir), { recursive: true });
    fs.writeFileSync(path.join(DOCS_DIR, dir, "sitemap.xml"), xml);
    count += 1;
  }
  return count;
}

async function main() {
  for (const code of GENERATED) {
    const n = await generateLang(code);
    console.log(`  app/${code}/*.html  ${n} 页已生成`);
  }
  const refreshed = refreshExistingHreflang();
  console.log(`  手写底稿 hreflang 刷新：${refreshed} 页`);
  const sitemaps = generateMirrorSitemaps();
  console.log(`  镜像 sitemap 生成：${sitemaps} 份 → docs/<dir>/sitemap.xml`);
  console.log("gen-shells 完成");
}

main().catch((err) => {
  console.error(`\ngen-shells 失败：${err.message}`);
  process.exit(1);
});
