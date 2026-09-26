/* 校验镜像语言词典 + 壳页元数据：
 * 1. src/lang/<code>.tsx 的 key 集合与 i18n.tsx 的 dict.zh 完全一致；
 * 2. 九个标题 key 是 JSX 片段；\${VERSION} 转义保留；有默认导出；
 * 3. scripts/shell-i18n/<code>.mjs 结构完整（11 页 title/description + boot），
 *    且 pages.*.title 与词典 title.* 逐字一致（HTML 实体豁免）。
 * 用法：node scripts/check-dict-keys.mjs de fr ja ko
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

const i18n = fs.readFileSync("src/i18n.tsx", "utf8");
const zhStart = i18n.indexOf("const zhDict = {");
const zhEnd = i18n.indexOf("} as const;", zhStart);
const zhBlock = i18n.slice(zhStart, zhEnd);
const keyRe = /^\s*"([a-zA-Z0-9.]+)":/gm;
const zhKeys = [...zhBlock.matchAll(keyRe)].map((m) => m[1]);

const JSX_KEYS = [
  "wb.title", "dn.title", "sg.title", "tb.title", "dl.title",
  "lib.title", "ngs.title", "tut.title", "st.title",
];

const PAGES = [
  "index", "tech-support", "projects", "library", "ngs", "tutorial",
  "tutorial-ai", "tutorial-library", "tutorial-ngs", "tutorial-lang",
  "tutorial-langpack", "stats",
];
const TITLE_KEY_OF_PAGE = {
  "index": "title.home",
  "tech-support": "title.tech",
  "projects": "title.projects",
  "library": "title.library",
  "ngs": "title.ngs",
  "tutorial": "title.tutorial",
  "tutorial-ai": "title.tutorial.ai",
  "tutorial-library": "title.tutorial.library",
  "tutorial-ngs": "title.tutorial.ngs",
  "tutorial-lang": "title.tutorial.lang",
  "tutorial-langpack": "title.tutorial.langpack",
  "stats": "title.stats",
};

const norm = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');

let fail = false;
for (const code of process.argv.slice(2)) {
  const probs = [];

  const src = fs.readFileSync(`src/lang/${code}.tsx`, "utf8");
  const keys = [...src.matchAll(/^\s*"([a-zA-Z0-9.]+)":/gm)].map((m) => m[1]);
  const uniq = new Set(keys);
  const missing = zhKeys.filter((k) => !uniq.has(k));
  const extra = [...uniq].filter((k) => !zhKeys.includes(k));
  const dup = keys.length - uniq.size;
  if (missing.length) probs.push(`缺失:${missing.join(",")}`);
  if (extra.length) probs.push(`多余:${extra.join(",")}`);
  if (dup) probs.push(`重复${dup}`);
  for (const k of JSX_KEYS) {
    if (!new RegExp(`"${k.replace(/\./g, "\\.")}": (<>|\\()`).test(src)) {
      probs.push(`${k} 非JSX`);
    }
  }
  if (!src.includes("\\${VERSION")) probs.push("\\${VERSION} 转义丢失");
  if (!/export default \w+;/.test(src)) probs.push("缺 default 导出");

  const metaPath = path.join(__dirname, "shell-i18n", `${code}.mjs`);
  const meta = (await import(pathToFileURL(metaPath))).default;
  for (const k of ["tagline", "desc", "loading"]) {
    if (!meta.boot?.[k]) probs.push(`boot.${k} 缺`);
  }
  const dictTitle = (dottedKey) => {
    const km = dottedKey.replace(/\./g, "\\.") ;
    const mm = src.match(new RegExp(`"${km}":\\s*"([^"]+)"`));
    return mm ? mm[1] : null;
  };
  for (const p of PAGES) {
    const pg = meta.pages?.[p];
    if (!pg?.title || !pg?.description) {
      probs.push(`pages.${p} 缺 title/description`);
      continue;
    }
    if (/[<>]/.test(pg.title)) probs.push(`pages.${p}.title 含 <>`);
    const dt = dictTitle(TITLE_KEY_OF_PAGE[p]);
    if (dt === null) probs.push(`词典 ${TITLE_KEY_OF_PAGE[p]} 非纯字符串`);
    else if (norm(pg.title) !== norm(dt)) probs.push(`pages.${p}.title ≠ 词典`);
  }

  console.log(
    code.padEnd(3),
    `keys:${keys.length}/${zhKeys.length}`,
    probs.length ? `FAIL → ${probs.join(" | ")}` : "全部通过",
  );
  if (probs.length) fail = true;
}
process.exit(fail ? 1 : 0);
