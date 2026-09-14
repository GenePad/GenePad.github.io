import { useEffect } from "react";
import { Reveal, SectionHead, SubpageNav, ArrowRight } from "../sections/shared";
import TutorialSidebar from "../sections/TutorialSidebar";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { useLang, usePageTitle } from "../i18n";
import {
  TUTORIAL_CATEGORIES,
  tutorialHref,
  tutorialNo,
  tutorialsInCategory,
  type TutorialEntry,
} from "../tutorial-data";
import { dismissBoot } from "../boot";

/* 使用教程目录页：左侧分类侧边导航，右侧按分类分区列出教程卡片；
   每篇教程独立成页（tutorial-<id>.html，见 TutorialDetail.tsx）。
   目录与分区均由 tutorial-data.ts 的 TUTORIALS / TUTORIAL_CATEGORIES 驱动。 */

function TutorialCard({ tut, delay }: { tut: TutorialEntry; delay: number }) {
  const { t } = useLang();
  return (
    <Reveal delay={delay} className="bg-paper">
      <a
        href={tutorialHref(tut)}
        className="group flex h-full flex-col p-6 transition-colors hover:bg-ink/[0.03] md:p-7"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.22em] text-gfp-deep">
            {String(tutorialNo(tut) + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-ink/40">
            {t(tut.toc.en)}
          </span>
        </div>
        <h3 className="mt-3 text-[18px] font-bold tracking-tight">{t(tut.toc.name)}</h3>
        <p className="mt-3 flex-1 text-[13.5px] leading-7 text-ink/70">{t(tut.toc.desc)}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] tracking-[0.18em] text-gfp-deep">
          <span>{tut.steps.length} STEPS</span>
          <span className="inline-flex items-center gap-2">
            {t("tut.card.view")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Tutorial() {
  const { t } = useLang();
  usePageTitle("title.tutorial");
  useEffect(() => dismissBoot(), []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="TUTORIALS" />
      <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <TutorialSidebar current={null} />
          <div className="min-w-0">
            <SectionHead
              index="10"
              eyebrow={t("tut.eyebrow") as string}
              title={t("tut.title")}
              titleTag="h1"
            >
              {t("tut.lead")}
            </SectionHead>

            {/* 顶部快捷入口：跳过目录直接跳到底部下载区 */}
            <Reveal>
              <div className="-mt-6 mb-12 flex flex-wrap items-center gap-4 md:-mt-8">
                <a
                  href="#download"
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
                >
                  {t("tut.final.cta2")}
                  <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-1" />
                </a>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/45">
                  {t("tut.top.hint")}
                </span>
              </div>
            </Reveal>

            {/* 按分类分区列出教程（GETTING STARTED 打头） */}
            {TUTORIAL_CATEGORIES.map((cat) => (
              <section key={cat.id} className="mt-16 first:mt-0">
                <Reveal>
                  <div className="mb-3 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-5">
                    <h2 className="text-[24px] font-bold leading-none tracking-tight">
                      {t(cat.name)}
                    </h2>
                    <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink/45">
                      {t(cat.en)}
                    </span>
                  </div>
                  <p className="mb-8 max-w-2xl text-[13.5px] leading-7 text-ink/60">
                    {t(cat.desc)}
                  </p>
                </Reveal>
                <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  {tutorialsInCategory(cat).map((tut, i) => (
                    <TutorialCard key={tut.id} tut={tut} delay={i * 100} />
                  ))}
                </div>
              </section>
            ))}

            {/* 收尾 CTA */}
            <Reveal>
              <div className="mt-24 bg-ink px-6 py-12 text-paper md:px-12 md:py-16">
                <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-paper/55">
                  <span className="text-gfp">10</span> — PART OF GENEPAD
                </p>
                <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
                  {t("tut.final.title")}
                </h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-8 text-paper/70">
                  {t("tut.final.desc")}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="index.html"
                    className="group inline-flex items-center gap-3 bg-gfp px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-on-gfp transition-colors hover:bg-white"
                  >
                    {t("tut.final.cta")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#download"
                    className="group inline-flex items-center gap-3 border border-paper/40 px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:border-gfp hover:text-gfp"
                  >
                    {t("tut.final.cta2")}
                    <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Download index="10-A" />
      <Footer />
    </div>
  );
}
