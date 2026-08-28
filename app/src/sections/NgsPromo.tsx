import { Reveal, SectionHead, Shot, ArrowRight } from "./shared";
import { useLang, type TKey } from "../i18n";

/* 首页 NGS 数据查看推荐节：承接 Sanger(03)，链接到 ngs.html 详述页 */

const BADGES: { k: string; v: TKey }[] = [
  { k: "FORMATS", v: "np.c1" },
  { k: "PAIRED-END", v: "np.c2" },
  { k: "QUALITY", v: "np.c3" },
  { k: "ANALYSIS", v: "np.c4" },
];

export default function NgsPromo() {
  const { t } = useLang();

  return (
    <section id="ngs" className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
          {/* 左侧：文案 + 卖点格 + 按钮 */}
          <div className="order-1">
            <SectionHead
              index="04"
              eyebrow={t("ngs.eyebrow") as string}
              title={t("ngs.title")}
            >
              {t("np.lead")}
            </SectionHead>

            <Reveal delay={220}>
              <ul className="grid grid-cols-2 border-l border-t border-line">
                {BADGES.map((b) => (
                  <li key={b.k} className="border-b border-r border-line px-5 py-4">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-ink/45">{b.k}</p>
                    <p className="mt-1.5 text-[14px] font-semibold tracking-tight text-gfp-deep">
                      {t(b.v)}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="ngs.html"
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
                >
                  {t("np.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="font-mono text-[11px] tracking-[0.1em] text-ink/50">
                  {t("np.safe")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* 右侧：主界面 + 丰度报告截图错落叠放 */}
          <div className="relative order-2">
            <Reveal clip>
              <Shot src="shots/ngs-01.webp" caption={t("ngs.hero.shot") as string} />
            </Reveal>
            <Reveal clip delay={180} className="relative z-10 -mt-10 ml-auto w-[64%] md:-mt-16">
              <Shot src="shots/ngs-09.webp" caption={t("ngs.report.shot2") as string} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
