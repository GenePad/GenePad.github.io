import { useEffect, useState } from "react";
import { Reveal, Shot, ArrowRight } from "./shared";
import { useLang } from "../i18n";

/* 真实 superfolder GFP 起始区序列 */
const SEQ = "ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAAGTTCAGCGTG";

function useTypewriter(text: string, speed = 34, startDelay = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setInterval>;
    const kick = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(kick);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);
  return text.slice(0, n);
}

export default function Hero() {
  const { t } = useLang();
  const typed = useTypewriter(SEQ);

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">

      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
        <div className="grid items-end gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* 左侧文案 */}
          <div>
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.26em] uppercase text-ink/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse bg-gfp-deep" />
                  {t("hero.badge")}
                </span>
                <span className="text-ink/30">/</span>
                <span>{t("hero.badgeEn")}</span>
              </p>
            </Reveal>

            <Reveal delay={110}>
              <h1 className="mt-7 font-display font-bold leading-none tracking-tight">
                <span className="block text-[clamp(3.4rem,8.5vw,7.2rem)]">GenePad</span>
                <span className="mt-3 flex items-baseline gap-4 text-[clamp(1.4rem,3vw,2.4rem)]">
                  <span className="text-gfp-deep">{t("hero.titleCn")}</span>
                  <span className="font-mono text-[11px] font-normal tracking-[0.3em] text-ink/40 uppercase">
                    {t("hero.titleEn")}
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-7 max-w-xl text-[15px] leading-8 text-ink/70">
                {t("hero.desc")}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#download"
                  className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[14px] font-medium text-paper transition-colors hover:bg-gfp-deep"
                >
                  {t("hero.download")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#workbench"
                  className="inline-flex items-center gap-2.5 border border-line-strong px-6 py-3.5 text-[14px] font-medium text-ink transition-colors hover:border-gfp-deep hover:text-gfp-deep"
                >
                  {t("hero.tour")}
                  <span className="font-mono text-xs">↓</span>
                </a>
              </div>
            </Reveal>

            {/* 打字序列读出 */}
            <Reveal delay={430}>
              <div className="mt-10 max-w-xl border border-line bg-white/60 px-4 py-3 font-mono text-[12px] leading-6 text-ink/70">
                <div className="flex items-center justify-between text-[10px] tracking-[0.18em] text-ink/45">
                  <span>SEQ 571..735 — SUPERFOLDER GFP</span>
                  <span>{Math.min(typed.length, SEQ.length)} BP</span>
                </div>
                <p className="mt-1.5 break-all tracking-[0.08em]">
                  <span className="text-gfp-deep">&gt;&nbsp;</span>
                  {typed}
                  <span className="gp-cursor ml-0.5 inline-block h-[13px] w-[7px] translate-y-[2px] bg-gfp-deep" />
                </p>
              </div>
            </Reveal>
          </div>

          {/* 右侧主截图 */}
          <Reveal clip delay={260} className="relative">
            <div className="lg:translate-y-6">
              <Shot
                src="/shots/light-mode.webp"
                caption="ADDGENE-PLASMID-54737 — 4,732 BP · CIRCULAR · GC 53.6%"
              />
            </div>
          </Reveal>
        </div>

        {/* 底部刻度尺 + 格式条 */}
        <Reveal delay={520}>
          <div className="tick-x mt-16 border-t border-line pb-3 pt-4 md:mt-20">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-ink/55">
              <span>GENBANK / FASTA / DNA / AB1</span>
              <span className="hidden md:inline">{t("hero.features")}</span>
              <span>WIN / MAC / LINUX / ANDROID</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
