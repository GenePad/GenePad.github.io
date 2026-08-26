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
  "shots/ngs-01.webp": { w: 1502, h: 1002 },
  "shots/ngs-02.webp": { w: 1918, h: 1077 },
  "shots/ngs-03.webp": { w: 588, h: 800 },
  "shots/ngs-04.webp": { w: 1918, h: 1078 },
  "shots/ngs-05.webp": { w: 1365, h: 942 },
  "shots/ngs-06.webp": { w: 1920, h: 1020 },
  "shots/ngs-07.webp": { w: 1502, h: 1002 },
  "shots/ngs-08.webp": { w: 1502, h: 1002 },
  "shots/ngs-09.webp": { w: 1292, h: 852 },
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

/* ── 平台图标：Download 卡片与 Hero 平台行共用（fill 跟随 currentColor） ── */
export function WindowsIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 5.6 10.6 4.5v7H3V5.6Zm0 12.8 7.6 1.1v-7H3v5.9Zm8.6-14.9v8.2H21V3.1l-9.4.2Zm0 9.4v8.2L21 21v-8.4l-9.4.2Z" />
    </svg>
  );
}
export function AppleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.5.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 2-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.55-1.41 3.5-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3.07-4.6ZM14.16 4.06c.8-.97 1.34-2.31 1.19-3.65-1.15.05-2.54.77-3.37 1.73-.74.86-1.39 2.23-1.22 3.55 1.28.1 2.6-.65 3.4-1.63Z" />
    </svg>
  );
}
export function LinuxIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
    </svg>
  );
}
export function AndroidIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.3 9.5c.5 0 .9.4.9.9v5.2c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-5.2c0-.5.4-.9.9-.9ZM17.7 9.5c.5 0 .9.4.9.9v5.2c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-5.2c0-.5.4-.9.9-.9ZM7.6 9.5v7.3c0 .5.4.9.9.9h1v2.6c0 .5.4.9.9.9s.9-.4.9-.9v-2.6h1.4v2.6c0 .5.4.9.9.9s.9-.4.9-.9v-2.6h1c.5 0 .9-.4.9-.9V9.5H7.6Zm8.7-2.4.9-1.5c.1-.2 0-.5-.2-.6s-.5 0-.6.2l-.9 1.6c-1-.5-2.2-.8-3.5-.8s-2.5.3-3.5.8l-.9-1.6c-.1-.2-.4-.3-.6-.2s-.3.4-.2.6l.9 1.5C6.6 8 6 9.1 6 10.3v.2h12v-.2c0-1.2-.6-2.3-1.7-3.2Zm-6.8 2c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Zm5 0c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Z" />
    </svg>
  );
}
export function HarmonyIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
      <text x="12" y="15.5" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif">HM</text>
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
