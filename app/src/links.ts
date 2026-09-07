/* 跨子域名的站内链接工具。
   en.genepad.cn 是面向搜索引擎的纯英文镜像（_worker.js 把该主机下的路径映射到
   构建输出的 /en 子树）；genepad.cn 保持原行为：按浏览器环境自动选语言、原地切换。
   这里只处理两类需要跨主机的地址：
   1. 英文主机上的语言切换按钮 —— 跳回中文主机的同一页；
   2. 仅中文站存在的页面（changelog、tech-* 文档）—— 英文主机上必须用绝对地址跨回 genepad.cn，
      否则相对链接会被 worker 映射进 /en 子树而 404。 */

export function isEnHost(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname === "en.genepad.cn" ||
      window.location.hostname.endsWith(".en.genepad.cn"))
  );
}

/** 另一语言版本的同一页地址（英文主机 → 中文主机；中文主机 → 英文主机） */
export function otherLangHref(): string {
  const path = window.location.pathname.startsWith("/en/")
    ? window.location.pathname.slice(3)
    : window.location.pathname;
  return isEnHost() ? path || "/" : `https://en.genepad.cn${path}`;
}

/** 仅中文站存在的页面：中文主机返回根相对路径（行为同相对链接），英文主机返回绝对地址 */
export function rootHref(name: string): string {
  return isEnHost() ? `https://genepad.cn/${name}` : `/${name}`;
}
