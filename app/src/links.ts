/* 跨子域名的站内链接工具。
   en.genepad.cn / cn.genepad.cn 是面向搜索引擎的纯英文 / 纯中文镜像（_worker.js 把
   两个主机下的路径分别映射到构建输出的 /en、/cn 子树）；genepad.cn 保持原行为：
   按浏览器环境自动选语言、原地切换。
   这里只处理两类需要跨主机的地址：
   1. 镜像主机上的语言切换按钮 —— 跳到另一语言站点的同一页；
   2. 仅中文站存在的页面（changelog、tech-* 文档）—— 镜像主机上必须用绝对地址跨回 genepad.cn，
      否则相对链接会被 worker 映射进 /en、/cn 子树而 404。 */

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

export function isCnHost(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "cn.genepad.cn" ||
    window.location.hostname.endsWith(".cn.genepad.cn") ||
    // 同上：/cn 子树静态托管的场景（本地 dev、pages.dev、GitHub Pages）按中文上下文处理
    window.location.pathname.startsWith("/cn/")
  );
}

/** 镜像主机（en / cn 子域名或其静态托管的子树）：语言切换用跳转而非原地切换 */
export function isMirrorHost(): boolean {
  return isEnHost() || isCnHost();
}

/** 站点首页地址：/en、/cn 子树被静态托管时（本地预览、GitHub Pages 镜像）要显式带前缀，
    镜像域名与中文主机都交给 worker 处理，直接给 / 即可 */
export function homeHref(): string {
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/en/")) return "/en/";
    if (window.location.pathname.startsWith("/cn/")) return "/cn/";
  }
  return "/";
}

/** 另一语言版本的同一页地址（en 镜像 → 中文主机；cn 镜像 → en 镜像；中文主机 → en 镜像） */
export function otherLangHref(): string {
  const p = window.location.pathname;
  const path = p.startsWith("/en/") || p.startsWith("/cn/") ? p.slice(3) : p;
  if (isEnHost()) {
    // en.genepad.cn 上必须写绝对地址：worker 会把该主机的 /x 前缀映射到 /en/x，
    // 相对链接 /library 会被映射回英文页，中文按钮就成了原地踏步。
    // 静态托管 /en 子树的镜像（本地预览、pages.dev、GitHub Pages）没有这层映射，相对链接即中文页。
    return window.location.hostname.endsWith("en.genepad.cn")
      ? `https://genepad.cn${path || "/"}`
      : path || "/";
  }
  if (isCnHost()) {
    // cn.genepad.cn → en.genepad.cn 的同一页；静态托管的 /cn 子树跳 /en 同页
    return window.location.hostname.endsWith("cn.genepad.cn")
      ? `https://en.genepad.cn${path || "/"}`
      : `/en${path || "/"}`;
  }
  // 中文主机 → en 镜像
  return `https://en.genepad.cn${path}`;
}

/** 仅中文站存在的页面：中文主机返回根相对路径（行为同相对链接），镜像主机返回绝对地址 */
export function rootHref(name: string): string {
  return isMirrorHost() ? `https://genepad.cn/${name}` : `/${name}`;
}
