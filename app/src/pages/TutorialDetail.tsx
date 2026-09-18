import { useEffect } from "react";
import { Reveal, SectionHead, SubpageNav, Shot, ArrowRight } from "../sections/shared";
import TutorialSidebar from "../sections/TutorialSidebar";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { LightboxProvider } from "../lightbox";
import { useLang, usePageTitle } from "../i18n";
import { TUTORIALS, tutorialHref, type TutorialEntry, type TutorialStep } from "../tutorial-data";
import { dismissBoot } from "../boot";
import { homeHref } from "../links";

/* 教程详情页：一篇教程一页，由 tutorial-detail-main.tsx 按壳页的
   data-tutorial 属性选中对应条目渲染；左侧分类侧边导航（当前页高亮），
   底部提供上一篇 / 下一篇翻页。 */

function Steps({ steps }: { steps: TutorialStep[] }) {
  const { t } = useLang();
  return (
    <ol className="space-y-6">
      {steps.map((s, i) => (
        <li key={s.name as string}>
          <Reveal delay={i * 60}>
            <div className="grid items-center gap-6 border border-line bg-paper p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-8">
              <div>
                <span className="font-mono text-[11px] tracking-[0.24em] text-gfp-deep">
                  STEP {i + 1} / {steps.length}
                </span>
                <h2 className="mt-3 text-[20px] font-bold tracking-tight">{t(s.name)}</h2>
                <p className="mt-3 text-[13.5px] leading-7 text-ink/70">{t(s.desc)}</p>
              </div>
              {s.shots.length === 1 ? (
                <Shot src={s.shots[0].src} caption={t(s.shots[0].shot) as string} />
              ) : (
                <div className="grid items-start gap-5 sm:grid-cols-2">
                  {s.shots.map((sh) => (
                    <Shot key={sh.src} src={sh.src} caption={t(sh.shot) as string} />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Pager({ current }: { current: TutorialEntry }) {
  const { t } = useLang();
  const idx = TUTORIALS.findIndex((x) => x.id === current.id);
  const prev = idx > 0 ? TUTORIALS[idx - 1] : undefined;
  const next = idx < TUTORIALS.length - 1 ? TUTORIALS[idx + 1] : undefined;
  return (
    <nav aria-label="tutorial pager" className="mt-16">
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {prev ? (
          <a
            href={tutorialHref(prev)}
            className="group flex flex-col gap-1.5 bg-paper p-6 transition-colors hover:bg-ink/[0.03]"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-ink/50">
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
              {t("tut.prev")}
            </span>
            <span className="text-[15px] font-bold tracking-tight">{t(prev.toc.name)}</span>
          </a>
        ) : (
          <div className="hidden bg-paper sm:block" aria-hidden />
        )}
        {next && (
          <a
            href={tutorialHref(next)}
            className="group flex flex-col items-end gap-1.5 bg-paper p-6 text-right transition-colors hover:bg-ink/[0.03]"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-ink/50">
              {t("tut.next")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[15px] font-bold tracking-tight">{t(next.toc.name)}</span>
          </a>
        )}
      </div>
      <Reveal>
        <div className="mt-6 flex justify-center">
          <a
            href="tutorial"
            className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] text-ink/60 transition-colors hover:text-gfp-deep"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            {t("tut.backTo")}
          </a>
        </div>
      </Reveal>
    </nav>
  );
}

export default function TutorialDetail({ tut }: { tut: TutorialEntry }) {
  const { t } = useLang();
  usePageTitle(tut.pageTitle);
  useEffect(() => dismissBoot(), []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="TUTORIALS" />
      <LightboxProvider>
        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            <TutorialSidebar current={tut.id} />
            <div className="min-w-0">
              {/* 面包屑：教程目录 / 本篇 */}
              <Reveal>
                <nav className="mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/45 md:-mt-6">
                  <a href="tutorial" className="transition-colors hover:text-gfp-deep">
                    {t("nav.tutorial")}
                  </a>
                  <span className="text-ink/30">/</span>
                  <span className="text-gfp-deep">{t(tut.head)}</span>
                </nav>
              </Reveal>

              <SectionHead
                index="10"
                eyebrow={t(tut.headEn) as string}
                title={t(tut.title)}
                titleTag="h1"
              >
                {t(tut.lead)}
              </SectionHead>

              {/* 顶部快捷入口：跳过正文直接跳到底部下载区 */}
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

              <Steps steps={tut.steps} />

              {tut.note && (
                <Reveal>
                  <div className="mt-6 border-l-2 border-gfp-deep bg-ink/[0.03] px-5 py-4">
                    <p className="text-[13px] leading-7 text-ink/70">{t(tut.note)}</p>
                  </div>
                </Reveal>
              )}

              {tut.video && (
                <>
                  <Reveal>
                    <h2 className="mb-4 mt-16 text-[20px] font-bold tracking-tight">
                      {t(tut.video.head)}
                    </h2>
                    <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">
                      {t(tut.video.lead)}
                    </p>
                  </Reveal>
                  <Reveal clip>
                    <figure className="shot-frame text-ink/60">
                      <div className="border border-line-strong bg-white p-2 shadow-[0_24px_60px_-28px_rgba(28,58,19,0.45)] md:p-2.5">
                        <div className="relative aspect-video bg-ink">
                          <iframe
                            src={tut.video.embed}
                            title={t(tut.video.caption) as string}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      </div>
                      <figcaption className="mt-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-ink/55">
                        <span className="inline-block h-1.5 w-1.5 bg-gfp-deep" />
                        {t(tut.video.caption)}
                      </figcaption>
                    </figure>
                  </Reveal>
                </>
              )}

              <Pager current={tut} />

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
                      href={homeHref()}
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
      </LightboxProvider>
      <Download index="10-A" />
      <Footer />
    </div>
  );
}
