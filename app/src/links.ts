/* 跨子域名的站内链接工具与语言镜像表。
   genepad.cn 主站保持原行为：按浏览器环境自动选语言、原地切换 zh/en；
   en / cn 之外又新增 de / ru / jp / kr / fr 五个纯语言镜像（面向搜索引擎），
   _worker.js 把每个镜像主机下的路径映射到构建输出的 /<dir> 子树。
   这里只处理三类需要跨主机的地址：
   1. 镜像主机上的语言菜单 —— 列出全部语言、跳到对应语言站点的同一页；
   2. 仅中文站存在的页面（changelog、tech-* 文档）—— 镜像主机上必须用绝对地址跨回 genepad.cn，
      否则相对链接会被 worker 映射进 /<dir> 子树而 404；
   3. 首页地址 —— /<dir> 子树被静态托管时（本地 dev、pages.dev 预览、GitHub Pages）要带前缀。 */

export type MirrorLang = "zh" | "en" | "de" | "ru" | "ja" | "ko" | "fr";

export interface Mirror {
  /** 该镜像锁定的界面语言（与 i18n.tsx 的 Lang 一致） */
  lang: MirrorLang;
  /** 镜像子域名 */
  host: string;
  /** 构建输出子树 docs/<dir>/，也是静态托管路径前缀。注意 ja/ko 的 dir 用域名习惯 jp/kr */
  dir: string;
}

/* 顺序即语言菜单顺序；zh 的“镜像”是 cn.genepad.cn（主站 genepad.cn 不在此表）。
   与 docs/_worker.js 的 MIRROR_PREFIX_BY_HOST、app/scripts/prerender.mjs 的 MIRRORS 保持一致 */
export const MIRRORS: readonly Mirror[] = [
  { lang: "zh", host: "cn.genepad.cn", dir: "cn" },
  { lang: "en", host: "en.genepad.cn", dir: "en" },
  { lang: "de", host: "de.genepad.cn", dir: "de" },
  { lang: "ru", host: "ru.genepad.cn", dir: "ru" },
  { lang: "ja", host: "jp.genepad.cn", dir: "jp" },
  { lang: "ko", host: "kr.genepad.cn", dir: "kr" },
  { lang: "fr", host: "fr.genepad.cn", dir: "fr" },
];

/* 语言菜单显示用本名（各语言界面上固定显示自身名字，不随界面语言翻译） */
export const LANG_NAMES: Record<MirrorLang, string> = {
  zh: "中文",
  en: "English",
  de: "Deutsch",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
};

/* 当前上下文对应的镜像：镜像子域名，或 /<dir> 子树被静态托管的场景
   （本地 dev、genepad.pages.dev 预览、GitHub Pages 镜像）；主站返回 null */
export function mirrorOf(): Mirror | null {
  if (typeof window === "undefined") return null;
  const host = window.location.hostname;
  for (const m of MIRRORS) {
    if (host === m.host || host.endsWith("." + m.host)) return m;
  }
  const path = window.location.pathname;
  for (const m of MIRRORS) {
    if (path === `/${m.dir}` || path.startsWith(`/${m.dir}/`)) return m;
  }
  return null;
}

/** 镜像上下文（任一语言子域名或其静态托管的子树）：语言切换用跳转而非原地切换 */
export function isMirrorHost(): boolean {
  return mirrorOf() !== null;
}

/** 站点首页地址：/<dir> 子树被静态托管时要显式带前缀，镜像域名与中文主机都交给 worker 处理，直接给 / 即可 */
export function homeHref(): string {
  if (typeof window !== "undefined") {
    const m = mirrorOf();
    if (m) return `/${m.dir}/`;
  }
  return "/";
}

/** 同一页在目标语言镜像上的地址（镜像主机的语言菜单/页脚用，各镜像之间必须写绝对地址：
    worker 会把镜像主机的 /x 映射到 /<dir>/x，相对链接会落回当前语言页） */
export function mirrorHref(target: MirrorLang): string {
  if (typeof window === "undefined") return "/";
  const cur = mirrorOf();
  let path = window.location.pathname;
  // 仅当路径真的带 /<dir>/ 前缀时（pages.dev、GitHub Pages 的静态托管子树）才剥前缀；
  // 镜像主机上 worker 已剥过前缀，pathname 是干净的 /library 形式，不能按 dir 长度截断
  if (cur && (path === `/${cur.dir}` || path.startsWith(`/${cur.dir}/`))) {
    path = path.slice(cur.dir.length + 1) || "/";
  }
  const m = MIRRORS.find((x) => x.lang === target);
  if (!m) return "/";
  if (cur && cur.lang === m.lang) return path || "/";
  return `https://${m.host}${path || "/"}`;
}

/** 仅中文站存在的页面：中文主机返回根相对路径（行为同相对链接），镜像主机返回绝对地址 */
export function rootHref(name: string): string {
  return isMirrorHost() ? `https://genepad.cn/${name}` : `/${name}`;
}
