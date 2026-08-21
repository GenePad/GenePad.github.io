import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type RefObject } from "react";
import { useLightboxImage } from "../lightbox";
import { useLang } from "../i18n";

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
  titleTag = "h2",
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  dark?: boolean;
  titleTag?: "h1" | "h2";
  children?: ReactNode;
}) {
  const Title = titleTag;
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
        <Title
          className={`mt-6 font-display font-bold leading-[1.12] tracking-tight text-[clamp(1.9rem,4.4vw,3.4rem)] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </Title>
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

/* ── 截图原始尺寸：加载期间用 width/height 预留宽高比，避免白卡塌陷与布局抖动 ── */
const SHOT_DIMS: Record<string, { w: number; h: number }> = {
  "shots/light-mode.webp": { w: 2101, h: 1504 },
  "shots/dark-mode.webp": { w: 2101, h: 1504 },
  "shots/atlas-overview.webp": { w: 2101, h: 1504 },
  "shots/protein-gel.webp": { w: 2101, h: 1504 },
  "shots/ai-assistant.webp": { w: 2101, h: 1504 },
  "shots/file-library.webp": { w: 2101, h: 1504 },
  "shots/crispr.webp": { w: 2101, h: 1504 },
  "shots/dna-gel.webp": { w: 2101, h: 1504 },
  "shots/sanger-1.webp": { w: 1804, h: 1204 },
  "shots/sanger-2.webp": { w: 1804, h: 1204 },
  "shots/map-to-seq.webp": { w: 1804, h: 1204 },
  "shots/enzyme-sites.webp": { w: 1804, h: 1204 },
  "shots/protein-props.webp": { w: 1804, h: 1204 },
  "shots/open-with.webp": { w: 1804, h: 1204 },
  "shots/i18n.webp": { w: 1804, h: 1204 },
  "shots/library-01.webp": { w: 1652, h: 952 },
  "shots/library-02.webp": { w: 1652, h: 952 },
  "shots/library-05.webp": { w: 1652, h: 952 },
  "shots/library-06.webp": { w: 1652, h: 952 },
  "shots/library-07.webp": { w: 1652, h: 952 },
  "shots/library-03.webp": { w: 1838, h: 736 },
  "shots/library-09.webp": { w: 1652, h: 928 },
  "shots/library-10.webp": { w: 1468, h: 921 },
  "shots/library-04.webp": { w: 855, h: 757 },
  "shots/library-08.webp": { w: 550, h: 348 },
};
const SHOT_DIMS_DEFAULT = { w: 2101, h: 1504 };

/* 图片加载状态：mount 时检查 complete，避免缓存图不触发 onLoad 导致转圈不消失 */
export function useImgLoaded(ref: RefObject<HTMLImageElement | null>) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);
  return {
    loaded,
    onLoad: () => setLoaded(true),
    onError: () => setLoaded(true),
  };
}

/* 图片加载转圈：加载完成前居中占位 */
export function ImgSpin({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-[1] flex items-center justify-center ${className}`} aria-hidden>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-[0_2px_10px_rgba(28,58,19,0.15)]">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink/20 border-t-gfp-deep" />
      </span>
    </div>
  );
}

/* ── 截图相框：白卡 + 发丝边框 + 对位十字 + 等宽注脚 ── */
export function Shot({
  src,
  caption,
  className = "",
  dark = false,
  eager = false,
}: {
  src: string;
  caption: string;
  className?: string;
  dark?: boolean;
  eager?: boolean;
}) {
  const zoom = useLightboxImage({ src, caption });
  const imgRef = useRef<HTMLImageElement>(null);
  const { loaded, onLoad, onError } = useImgLoaded(imgRef);
  const { w, h } = SHOT_DIMS[src] ?? SHOT_DIMS_DEFAULT;
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
        <div className="relative">
          {!loaded && <ImgSpin />}
          <img
            ref={imgRef}
            src={src}
            alt={caption}
            width={w}
            height={h}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : undefined}
            onLoad={onLoad}
            onError={onError}
            className="block h-auto w-full"
          />
        </div>
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

/* ── 品牌标识：墨绿手绘图标（fill 跟随 text-* 类；原质粒环/应用图标 PNG 已停用） ── */
export function PlasmidGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 810 682" fill="none" className={className} aria-hidden>
      {/* 手绘质粒环，暂不启用：
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.5a8.5 8.5 0 0 1 7.4 4.4" stroke="#45c51f" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20.5 12 23 12M12 20.5 12 23M3.5 12 1 12M12 3.5 12 1" stroke="currentColor" strokeWidth="1.2" /> */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M309 601 300 613 286 640 286 653 289 659 296 666 304 669 312 669 322 665 327 660 331 650 330 638ZM345 490 307 581 308 583 360 500ZM522 411 516 416 516 449 526 453 528 450 528 415ZM689 327 652 323 627 326 603 333 559 355 494 403 477 410 460 410 476 419 487 420 496 418 519 406 563 376 564 459 566 463 572 464 576 461 576 369 607 354 614 354 614 438 620 442 626 436 626 350 639 346 665 345 664 374 657 407 645 440 628 472 622 478 588 486 560 486 533 480 507 468 490 457 435 410 426 427 469 464 506 487 526 495 561 501 587 499 613 490 615 491 600 510 569 540 539 561 510 576 474 589 432 597 382 597 343 590 342 595 351 616 389 622 424 622 476 614 508 604 537 591 588 557 617 529 637 504 653 479 668 449 679 418 686 388 689 364ZM423 305 415 322 419 346 347 477 348 480 368 491 372 487 440 361 463 352 475 336ZM221 291 193 300 160 321 144 337 132 353 121 373 119 384 127 419 137 447 151 476 171 507 189 529 217 556 249 579 275 592 279 567 251 551 224 529 196 499 177 472 170 458 203 462 232 462 271 455 304 440 324 426 353 401 369 396 357 390 345 392 301 421 300 349 293 345 288 350 289 427 270 437 251 442 251 334 249 331 241 331 239 333 239 439 244 443 238 446 217 449 202 448 201 352 195 349 190 353 190 448 188 450 166 450 155 427 142 379 159 352 182 330 205 317 234 309 271 311 306 325 333 344 377 384 386 366 340 325 319 310 298 299 276 292 257 289ZM524 174 517 176 479 244 480 249 497 259 502 259 506 255 542 190 540 183ZM631 163 618 185 636 213 649 240 658 266 664 296 687 300 679 255 667 222 648 186ZM490 69 460 60 423 54 384 53 361 55 333 60 300 70 261 88 237 103 215 120 191 143 169 170 153 195 138 226 125 265 119 298 117 325 142 301 147 273 158 240 183 193 210 159 249 125 295 99 332 86 373 79 408 78 443 82 479 91ZM541 47 529 46 521 51 522 56 538 66 538 73 417 286 418 290 490 331 493 331 604 132 613 126 635 130 641 125 641 117 636 108 613 85 572 59ZM566 80 594 96 601 104 601 111 513 269 507 274 498 274 468 257 464 253 463 244 551 88 557 81ZM592 32 581 53 607 68 618 47ZM585 5 584 14 591 20 633 45 639 45 643 42 645 35 642 27 627 12 614 5 600 1 593 1Z"
      />
    </svg>
  );
}

/* ── 子页面共用导航头：logo 返回首页 + 语言切换 + 返回首页 CTA ── */
export function SubpageNav({ tag }: { tag: string }) {
  const { t, lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="index.html" className="flex items-center gap-2.5">
          <PlasmidGlyph className="h-5 w-5 text-pine" />
          <span className="font-display text-[17px] font-bold tracking-tight">GenePad</span>
          <span className="mt-0.5 hidden font-mono text-[10px] tracking-[0.2em] text-ink/50 sm:inline">
            {tag}
          </span>
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            aria-label="Switch language"
            className="border border-line-strong px-3 py-2 font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
          >
            {t("nav.lang")}
          </button>
          <a
            href="index.html"
            className="group flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[12px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
          >
            {t("sub.back")}
          </a>
        </div>
      </div>
    </header>
  );
}
