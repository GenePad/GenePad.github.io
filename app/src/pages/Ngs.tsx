import { useEffect, type ReactNode } from "react";
import { Reveal, SectionHead, SubpageNav, Shot, ArrowRight } from "../sections/shared";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { LightboxProvider } from "../lightbox";
import { useLang, type TKey } from "../i18n";
import { dismissBoot } from "../boot";

/* NGS 数据查看宣传页：打开方式 → 双端配对 → 逐条浏览 → AA 搜索 → 锚点裁切 → 丰度分析 */

function GroupLabel({ no, cn, en }: { no: string; cn: ReactNode; en: string }) {
  return (
    <Reveal>
      <div className="mb-8 mt-20 flex items-end justify-between gap-6 border-t-2 border-ink pt-6 first:mt-10">
        <h2 className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-gfp-deep">
            {no}
          </span>
          <span className="text-[24px] font-bold leading-none tracking-tight md:text-[30px]">
            {cn}
          </span>
        </h2>
        <span className="hidden pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-ink/45 sm:block">
          {en}
        </span>
      </div>
    </Reveal>
  );
}

function TextCard({
  no,
  en,
  name,
  desc,
  delay = 0,
}: {
  no: string;
  en: string;
  name: ReactNode;
  desc: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="bg-paper">
      <div className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[18px] font-bold tracking-tight">{name}</h3>
          <span className="font-mono text-[10px] tracking-[0.22em] text-ink/40">
            {no} · {en}
          </span>
        </div>
        <p className="mt-3 text-[13.5px] leading-7 text-ink/70">{desc}</p>
      </div>
    </Reveal>
  );
}

const OPENS: {
  no: string;
  name: TKey;
  desc: TKey;
  shots: { src: string; shot: TKey }[];
}[] = [
  {
    no: "01",
    name: "ngs.open.1.name",
    desc: "ngs.open.1.desc",
    shots: [
      { src: "shots/ngs-02.webp", shot: "ngs.open.1.shot" },
      { src: "shots/ngs-03.webp", shot: "ngs.open.1.shot2" },
    ],
  },
  {
    no: "02",
    name: "ngs.open.2.name",
    desc: "ngs.open.2.desc",
    shots: [{ src: "shots/ngs-04.webp", shot: "ngs.open.2.shot" }],
  },
];

const READS: { no: string; en: string; name: TKey; desc: TKey }[] = [
  { no: "R-01", en: "MERGE", name: "ngs.reads.1.name", desc: "ngs.reads.1.desc" },
  { no: "R-02", en: "QUALITY", name: "ngs.reads.2.name", desc: "ngs.reads.2.desc" },
  { no: "R-03", en: "STATS", name: "ngs.reads.3.name", desc: "ngs.reads.3.desc" },
];

export default function Ngs() {
  const { t } = useLang();
  useEffect(() => dismissBoot(), []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="NGS VIEWER" />
      <LightboxProvider>
        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionHead
            index="09"
            eyebrow={t("ngs.eyebrow") as string}
            title={t("ngs.title")}
            titleTag="h1"
          >
            {t("ngs.lead")}
          </SectionHead>

          {/* 顶部快捷入口：跳过正文直接跳到底部下载区 */}
          <Reveal>
            <div className="-mt-6 mb-12 flex flex-wrap items-center gap-4 md:-mt-8">
              <a
                href="#download"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
              >
                {t("ngs.final.cta2")}
                <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-1" />
              </a>
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/45">
                {t("ngs.top.hint")}
              </span>
            </div>
          </Reveal>

          <Reveal clip>
            <Shot src="shots/ngs-01.webp" caption={t("ngs.hero.shot") as string} />
          </Reveal>

          {/* 打开方式 */}
          <GroupLabel no="09-A" cn={t("ngs.open.head")} en={t("ngs.open.headEn") as string} />
          <Reveal>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t("ngs.open.lead")}</p>
          </Reveal>
          <ol className="space-y-6">
            {OPENS.map((o, i) => (
              <li key={o.no}>
                <Reveal delay={i * 60}>
                  <div className="grid items-center gap-6 border border-line bg-paper p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-8">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.24em] text-gfp-deep">
                        METHOD {o.no} / {OPENS.length}
                      </span>
                      <h3 className="mt-3 text-[20px] font-bold tracking-tight">{t(o.name)}</h3>
                      <p className="mt-3 text-[13.5px] leading-7 text-ink/70">{t(o.desc)}</p>
                    </div>
                    {o.shots.length === 1 ? (
                      <Shot src={o.shots[0].src} caption={t(o.shots[0].shot) as string} />
                    ) : (
                      <div className="grid items-start gap-5 sm:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
                        {o.shots.map((s) => (
                          <Shot key={s.src} src={s.src} caption={t(s.shot) as string} />
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* 双端配对 */}
          <GroupLabel no="09-B" cn={t("ngs.pair.head")} en={t("ngs.pair.headEn") as string} />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <h3 className="text-[20px] font-bold tracking-tight">{t("ngs.pair.title")}</h3>
              <p className="mt-4 text-[14px] leading-8 text-ink/70">{t("ngs.pair.desc")}</p>
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/ngs-05.webp" caption={t("ngs.pair.shot") as string} />
            </Reveal>
          </div>

          {/* 逐条浏览 */}
          <GroupLabel no="09-C" cn={t("ngs.reads.head")} en={t("ngs.reads.headEn") as string} />
          <Reveal>
            <h3 className="mb-4 text-[20px] font-bold tracking-tight">{t("ngs.reads.title")}</h3>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t("ngs.reads.lead")}</p>
          </Reveal>
          <Reveal clip>
            <Shot src="shots/ngs-01.webp" caption={t("ngs.reads.shot") as string} />
          </Reveal>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {READS.map((r, i) => (
              <TextCard key={r.no} no={r.no} en={r.en} name={t(r.name)} desc={t(r.desc)} delay={i * 100} />
            ))}
          </div>

          {/* 氨基酸搜索 */}
          <GroupLabel no="09-D" cn={t("ngs.aa.head")} en={t("ngs.aa.headEn") as string} />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <h3 className="text-[20px] font-bold tracking-tight">{t("ngs.aa.title")}</h3>
              <p className="mt-4 text-[14px] leading-8 text-ink/70">{t("ngs.aa.desc")}</p>
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/ngs-06.webp" caption={t("ngs.aa.shot") as string} />
            </Reveal>
          </div>

          {/* 锚点裁切 */}
          <GroupLabel no="09-E" cn={t("ngs.trim.head")} en={t("ngs.trim.headEn") as string} />
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Reveal>
              <h3 className="text-[20px] font-bold tracking-tight">{t("ngs.trim.title")}</h3>
              <p className="mt-4 text-[14px] leading-8 text-ink/70">{t("ngs.trim.desc")}</p>
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/ngs-07.webp" caption={t("ngs.trim.shot") as string} />
            </Reveal>
          </div>

          {/* 文库丰度分析 */}
          <GroupLabel no="09-F" cn={t("ngs.report.head")} en={t("ngs.report.headEn") as string} />
          <Reveal>
            <h3 className="mb-4 text-[20px] font-bold tracking-tight">{t("ngs.report.title")}</h3>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t("ngs.report.desc")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <Shot src="shots/ngs-08.webp" caption={t("ngs.report.shot1") as string} />
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/ngs-09.webp" caption={t("ngs.report.shot2") as string} />
            </Reveal>
          </div>

          {/* 收尾 CTA */}
          <Reveal>
            <div className="mt-24 bg-ink px-6 py-12 text-paper md:px-12 md:py-16">
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-paper/55">
                <span className="text-gfp">09</span> — PART OF GENEPAD
              </p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
                {t("ngs.final.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-[14px] leading-8 text-paper/70">
                {t("ngs.final.desc")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="index.html"
                  className="group inline-flex items-center gap-3 bg-gfp px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-on-gfp transition-colors hover:bg-white"
                >
                  {t("ngs.final.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#download"
                  className="group inline-flex items-center gap-3 border border-paper/40 px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:border-gfp hover:text-gfp"
                >
                  {t("ngs.final.cta2")}
                  <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </main>
      </LightboxProvider>
      {/* 复用主页下载区（编号顺延为 09-G） */}
      <Download index="09-G" />
      <Footer />
    </div>
  );
}
