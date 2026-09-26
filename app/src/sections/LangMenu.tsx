import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";
import { LANG_NAMES, MIRRORS, mirrorHref, mirrorOf } from "../links";

/* 镜像主机上的语言菜单：列出全部纯语言站点，点击跳到同一页的对应镜像。
   主站 genepad.cn 不用本组件——保持 zh/en 原地切换的交互不变 */
export default function LangMenu() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = mirrorOf()?.lang ?? lang;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Switch language"
        className="flex items-center gap-1.5 border border-line-strong px-3 py-2 font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
      >
        {LANG_NAMES[current]}
        <span
          aria-hidden
          className={`inline-block text-[9px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {open && (
        <ul
          role="menu"
          aria-label="Languages"
          className="absolute right-0 top-full z-50 mt-2 w-44 border border-line bg-paper py-1 shadow-lg"
        >
          {MIRRORS.map((m) => (
            <li key={m.lang} role="none">
              <a
                role="menuitem"
                href={mirrorHref(m.lang)}
                hrefLang={m.lang === "zh" ? "zh-CN" : m.lang}
                className={`flex items-center justify-between px-4 py-2 font-mono text-[12px] tracking-[0.08em] transition-colors hover:bg-pine/5 hover:text-gfp-deep ${
                  m.lang === current ? "font-bold text-gfp-deep" : "text-ink/70"
                }`}
              >
                {LANG_NAMES[m.lang]}
                {m.lang === current && (
                  <span aria-hidden className="text-[10px]">
                    ✓
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
