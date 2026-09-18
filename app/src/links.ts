/* 跨子域名的站内链接工具。
   en.genepad.cn 是面向搜索引擎的纯英文镜像（_worker.js 把该主机下的路径映射到
   构建输出的 /en 子树）；genepad.cn 保持原行为：按浏览器环境自动选语言、原地切换。
   这里只处理两类需要跨主机的地址：
   1. 英文主机上的语言切换按钮 —— 跳回中文主机的同一页；
   2. 仅中文站存在的页面（changelog、tech-* 文档）—— 英文主机上必须用绝对地址跨回 genepad.cn，
      否则相对链接会被 worker 映射进 /en 子树而 404。 */

export function isEnHost(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "en.genepad.cn" ||
    window.location.hostname.endsWith(".en.genepad.cn") ||
    // 本地 dev、genepad.pages.dev 预览与 GitHub Pages 镜像直接静态托管 /en 子树，
    // 没有 worker 做主机级映射，这里也按英文上下文处理（与 i18n.tsx isEnContext 对齐）
    window.location.pathname.startsWith("/en/")
  );
}

/** 站点首页地址：/en 子树被静态托管时（本地预览、GitHub Pages 镜像）要显式带前缀，
    en.genepad.cn 与中文主机都交给 worker 处理，直接给 / 即可 */
export function homeHref(): string {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/en/")) {
    return "/en/";
  }
  return "/";
}

/** 另一语言版本的同一页地址（英文上下文 → 中文主机；中文主机 → 英文主机） */
export function otherLangHref(): string {
  const path = window.location.pathname.startsWith("/en/")
    ? window.location.pathname.slice(3)
    : window.location.pathname;
  if (!isEnHost()) return `https://en.genepad.cn${path}`;
  // en.genepad.cn 上必须写绝对地址：worker 会把该主机的 /x 前缀映射到 /en/x，
  // 相对链接 /library 会被映射回英文页，中文按钮就成了原地踏步。
  // 静态托管 /en 子树的镜像（本地预览、pages.dev、GitHub Pages）没有这层映射，相对链接即中文页。
  return window.location.hostname.endsWith("en.genepad.cn")
    ? `https://genepad.cn${path || "/"}`
    : path || "/";
}

/** 仅中文站存在的页面：中文主机返回根相对路径（行为同相对链接），英文主机返回绝对地址 */
export function rootHref(name: string): string {
  return isEnHost() ? `https://genepad.cn/${name}` : `/${name}`;
}
