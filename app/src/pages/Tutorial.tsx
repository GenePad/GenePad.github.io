import { useEffect, type ReactNode } from "react";
import { Reveal, SectionHead, SubpageNav, Shot, ArrowRight } from "../sections/shared";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { LightboxProvider } from "../lightbox";
import { useLang, usePageTitle } from "../i18n";
import { TUTORIALS, type TutorialEntry, type TutorialStep } from "../tutorial-data";
import { dismissBoot } from "../boot";

/* 使用教程页（教程中心）：目录与各教程章节均由 tutorial-data.ts 的 TUTORIALS
   数组驱动，新增教程只需在数组末尾追加条目并补 i18n 文案。 */

/** 0 → A、1 → B …：章节编号 10-A/10-B… 与底部下载区编号都由它推导 */
function idxLetter(i: number): string {
  return String.fromCharCode(65 + i);
}

function GroupLabel({ id, no, cn, en }: { id?: string; no: string; cn: ReactNode; en: ReactNode }) {
  return (
    <Reveal>
      <div
        id={id}
        className={`mb-8 mt-20 flex items-end justify-between gap-6 border-t-2 border-ink pt-6 first:mt-10 ${
          id ? "scroll-mt-20" : ""
        }`}
      >
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
                <h3 className="mt-3 text-[20px] font-bold tracking-tight">{t(s.name)}</h3>
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

function TutorialSection({ tut, no }: { tut: TutorialEntry; no: string }) {
  const { t } = useLang();
  return (
    <section>
      <GroupLabel no={no} cn={t(tut.head)} en={t(tut.headEn)} id={tut.id} />
      <Reveal>
        <h3 className="mb-4 text-[20px] font-bold tracking-tight">{t(tut.title)}</h3>
        <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t(tut.lead)}</p>
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
            <h3 className="mb-4 mt-16 text-[20px] font-bold tracking-tight">{t(tut.video.head)}</h3>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t(tut.video.lead)}</p>
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
    </section>
  );
}

export default function Tutorial() {
  const { t } = useLang();
  usePageTitle("title.tutorial");
  useEffect(() => dismissBoot(), []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="TUTORIALS" />
      <LightboxProvider>
        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionHead
            index="10"
            eyebrow={t("tut.eyebrow") as string}
            title={t("tut.title")}
            titleTag="h1"
          >
            {t("tut.lead")}
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

          {/* 教程目录：由 TUTORIALS 自动生成，新增教程自动出现 */}
          <Reveal>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/45">
              <span className="inline-block h-1.5 w-1.5 bg-gfp-deep" />
              {t("tut.toc.hint")}
            </div>
          </Reveal>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {TUTORIALS.map((c, i) => (
              <Reveal key={c.id} delay={i * 100} className="bg-paper">
                <a
                  href={`#${c.id}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-ink/[0.03] md:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-gfp-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-ink/40">
                      {t(c.toc.en)}
                    </span>
                  </div>
                  <h2 className="mt-3 text-[18px] font-bold tracking-tight">{t(c.toc.name)}</h2>
                  <p className="mt-3 flex-1 text-[13.5px] leading-7 text-ink/70">{t(c.toc.desc)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gfp-deep">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* 各教程章节（10-A、10-B… 随 TUTORIALS 自动顺延） */}
          {TUTORIALS.map((tut, i) => (
            <TutorialSection key={tut.id} tut={tut} no={`10-${idxLetter(i)}`} />
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
        </main>
      </LightboxProvider>
      {/* 复用主页下载区：编号跟在最后一篇教程之后，随新增教程自动顺延 */}
      <Download index={`10-${idxLetter(TUTORIALS.length)}`} />
      <Footer />
    </div>
  );
}
