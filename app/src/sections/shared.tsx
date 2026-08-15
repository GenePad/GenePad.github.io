import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { useLightboxImage } from "../lightbox";

/* ── 滚动显现容器：进入视口时给自身与子级加 .rv-in ── */
export function Reveal({
  children,
  className = "",
  delay = 0,
  clip = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  as?: "div" | "section" | "figure" | "span";
}) {
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`${clip ? "" : "rv"} ${className}`}
      style={{ "--rvd": `${delay}ms` } as CSSProperties}
    >
      {clip ? <div className="rv-clip">{children}</div> : children}
    </Tag>
  );
}

/* ── 章节头：编号 + 眉题 + 大标题 ── */
export function SectionHead({
  index,
  eyebrow,
  title,
  dark = false,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div
          className={`flex items-baseline gap-4 font-mono text-[11px] tracking-[0.28em] uppercase ${
            dark ? "text-paper/60" : "text-ink/55"
          }`}
        >
          <span className={dark ? "text-gfp" : "text-gfp-deep"}>{index}</span>
          <span className={`h-px w-10 ${dark ? "bg-lined-strong" : "bg-line-strong"}`} />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-6 font-display font-bold leading-[1.12] tracking-tight text-[clamp(1.9rem,4.4vw,3.4rem)] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={170}>
          <div
            className={`mt-6 max-w-2xl text-[15px] leading-8 ${
              dark ? "text-paper/70" : "text-ink/70"
            }`}
          >
            {children}
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ── 截图相框：白卡 + 发丝边框 + 对位十字 + 等宽注脚 ── */
export function Shot({
  src,
  caption,
  className = "",
  dark = false,
}: {
  src: string;
  caption: string;
  className?: string;
  dark?: boolean;
}) {
  const zoom = useLightboxImage({ src, caption });
  return (
    <figure className={`shot-frame ${dark ? "text-paper/70" : "text-ink/60"} ${className}`}>
      <div
        className={`cursor-zoom-in border bg-white p-2 md:p-2.5 ${
          dark ? "border-lined" : "border-line-strong"
        } shadow-[0_24px_60px_-28px_rgba(28,58,19,0.45)]`}
        onClick={zoom}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") zoom();
        }}
        aria-label={caption}
      >
        <img src={src} alt={caption} className="block w-full" />
      </div>
      <figcaption
        className={`mt-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] ${
          dark ? "text-paper/55" : "text-ink/55"
        }`}
      >
        <span className={`inline-block h-1.5 w-1.5 ${dark ? "bg-gfp" : "bg-gfp-deep"}`} />
        {caption}
      </figcaption>
    </figure>
  );
}

/* ── 箭头 ── */
export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/* ── 品牌标识（原手绘质粒环 SVG 已停用，换用应用图标） ── */
export function PlasmidGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <>
      {/* 手绘质粒环，暂不启用：
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3.5a8.5 8.5 0 0 1 7.4 4.4" stroke="#45c51f" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M20.5 12 23 12M12 20.5 12 23M3.5 12 1 12M12 3.5 12 1" stroke="currentColor" strokeWidth="1.2" />
      </svg> */}
      <img src="icon.png" alt="" className={className} />
    </>
  );
}
