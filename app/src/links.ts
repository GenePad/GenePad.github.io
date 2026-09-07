import { PAGE_LANG } from "./i18n";

/* 跨语言 / 跨子树的站内链接工具。
   同语言页面之间沿用相对 ".html" 链接（/en/ 子树自包含，相对路径自动落在英文树上），
   这里只处理两类需要跨树的地址：
   1. 语言切换按钮 —— 跳到另一语言版本的同一页；
   2. 根路径独有的中文页（changelog、tech-* 文档）—— 从 /en/ 页也要能回到根路径。 */

const EN_PREFIX = "/en";

/** 根路径独有的中文页相对文件名 → 绝对地址（两棵树通用） */
export function rootHref(name: string): string {
  return "/" + name;
}

/** 当前页的另一语言版本地址（语言切换 = 跳转链接，不是原地换文案） */
export function otherLangHref(): string {
  const p = window.location.pathname;
  // 当前在 /en/ 子树：去掉 /en 前缀即中文同页；英文首页 → 中文首页
  if (p.startsWith(EN_PREFIX)) {
    const rest = p.slice(EN_PREFIX.length); // "/library.html" | "/index.html" | "/" | ""
    return rest === "" || rest === "/" ? "/index.html" : rest;
  }
  // 当前在中文根路径：其余情况都指向 /en/ 下的同名页；首页 / → /en/index.html
  const name =
    p === "/" || p === "/index.html" ? "index.html" : p.replace(/^\//, "");
  return `${EN_PREFIX}/${name}`;
}

/** 当前语言（组件里需要知道自己在哪棵树上时用） */
export { PAGE_LANG };
