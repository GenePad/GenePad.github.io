import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLang } from "./i18n";

/* ── 图片灯箱：点击截图放大查看，左右切换上/下一张 ──
   各截图组件用 useLightboxImage() 注册自己，点击时 open(src)。
   全站图片按组件挂载顺序（≈ 页面顺序）排成一条序列。 */

export interface LightboxItem {
  src: string;
  caption: string;
}

const LightboxCtx = createContext<{
  register: (item: LightboxItem) => () => void;
  open: (src: string) => void;
}>({
  register: () => () => {},
  open: () => {},
});

export function useLightboxImage(item: LightboxItem, enabled = true) {
  const { register, open } = useContext(LightboxCtx);
  const { src, caption } = item;
  useEffect(() => {
    if (!enabled) return;
    return register({ src, caption });
  }, [register, src, caption, enabled]);
  return useCallback(() => open(src), [open, src]);
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const [items, setItems] = useState<LightboxItem[]>([]);
  const itemsRef = useRef<LightboxItem[]>([]);
  itemsRef.current = items;
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  const register = useCallback((item: LightboxItem) => {
    setItems((prev) =>
      prev.some((p) => p.src === item.src) ? prev : [...prev, item]
    );
    return () =>
      setItems((prev) => prev.filter((p) => p.src !== item.src));
  }, []);

  const open = useCallback((src: string) => setOpenSrc(src), []);
  const close = useCallback(() => setOpenSrc(null), []);

  const idx = openSrc ? items.findIndex((i) => i.src === openSrc) : -1;
  const current = idx >= 0 ? items[idx] : null;

  const step = useCallback(
    (d: 1 | -1) => {
      const list = itemsRef.current;
      if (!list.length) return;
      setOpenSrc((prev) => {
        const i = list.findIndex((it) => it.src === prev);
        const next = i < 0 ? 0 : (i + d + list.length) % list.length;
        return list[next].src;
      });
    },
    []
  );

  /* 键盘：Esc 关闭，←/→ 切换；打开时锁定页面滚动 */
  useEffect(() => {
    if (!openSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openSrc, close, step]);

  const navBtn =
    "flex h-11 w-11 items-center justify-center border border-lined font-mono text-paper/80 transition-colors hover:border-gfp hover:text-gfp";

  return (
    <LightboxCtx.Provider value={{ register, open }}>
      {children}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* 顶栏：计数 + 关闭 */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <span className="font-mono text-[11px] tracking-[0.24em] text-paper/50">
              {idx + 1} / {items.length}
            </span>
            <button
              onClick={close}
              aria-label={t("lb.close") as string}
              className={navBtn}
            >
              ✕
            </button>
          </div>

          {/* 图片区：左右箭头 + 大图 */}
          <div className="flex min-h-0 flex-1 items-center gap-3 px-3 md:gap-6 md:px-8">
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={t("lb.prev") as string}
              className={`${navBtn} shrink-0`}
            >
              ←
            </button>
            <div
              className="flex min-w-0 flex-1 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={current.src}
                src={current.src}
                alt={current.caption}
                className="max-h-full max-w-full border border-lined object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={t("lb.next") as string}
              className={`${navBtn} shrink-0`}
            >
              →
            </button>
          </div>

          {/* 底部 caption */}
          <div className="flex items-center justify-center gap-3 px-5 py-4 font-mono text-[11px] tracking-[0.16em] text-paper/55">
            <span className="inline-block h-1.5 w-1.5 bg-gfp" />
            {current.caption}
          </div>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
