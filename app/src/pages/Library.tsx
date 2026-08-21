import type { ReactNode } from "react";
import { Reveal, SectionHead, SubpageNav, Shot, ArrowRight } from "../sections/shared";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { LightboxProvider } from "../lightbox";
import { useLang, type TKey } from "../i18n";

/* 基因文件库宣传页：痛点 → 三种管理方式 → AI 标签 / AI 助手 → 上手步骤 → 日常工作流 */

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

const PAINS: { no: string; en: string; name: TKey; desc: TKey }[] = [
  { no: "P-01", en: "PILES UP", name: "lib.pain.1.name", desc: "lib.pain.1.desc" },
  { no: "P-02", en: "WHERE", name: "lib.pain.2.name", desc: "lib.pain.2.desc" },
  { no: "P-03", en: "NAMELESS", name: "lib.pain.3.name", desc: "lib.pain.3.desc" },
];

const WAYS: { no: string; en: string; name: TKey; desc: TKey }[] = [
  { no: "01", en: "BY PROJECT", name: "lib.ways.1.name", desc: "lib.ways.1.desc" },
  { no: "02", en: "BY PATH", name: "lib.ways.2.name", desc: "lib.ways.2.desc" },
  { no: "03", en: "BY TAGS", name: "lib.ways.3.name", desc: "lib.ways.3.desc" },
];

const STEPS: { name: TKey; desc: TKey; shot: TKey; src: string }[] = [
  { name: "lib.setup.1.name", desc: "lib.setup.1.desc", shot: "lib.setup.1.shot", src: "shots/library-01.webp" },
  { name: "lib.setup.2.name", desc: "lib.setup.2.desc", shot: "lib.setup.2.shot", src: "shots/library-02.webp" },
  { name: "lib.setup.3.name", desc: "lib.setup.3.desc", shot: "lib.setup.3.shot", src: "shots/library-03.webp" },
  { name: "lib.setup.4.name", desc: "lib.setup.4.desc", shot: "lib.setup.4.shot", src: "shots/library-04.webp" },
  { name: "lib.setup.5.name", desc: "lib.setup.5.desc", shot: "lib.setup.5.shot", src: "shots/library-05.webp" },
];

export default function Library() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="FILE LIBRARY" />
      <LightboxProvider>
        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionHead
            index="07"
            eyebrow={t("lib.eyebrow") as string}
            title={t("lib.title")}
            titleTag="h1"
          >
            {t("lib.lead")}
          </SectionHead>

          <Reveal clip>
            <Shot src="shots/library-06.webp" caption={t("lib.hero.shot") as string} />
          </Reveal>

          {/* 痛点 */}
          <GroupLabel no="07-A" cn={t("lib.pain.title")} en={t("lib.pain.headEn") as string} />
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            {PAINS.map((p, i) => (
              <TextCard key={p.no} no={p.no} en={p.en} name={t(p.name)} desc={t(p.desc)} delay={i * 100} />
            ))}
          </div>

          {/* 三种管理方式 */}
          <GroupLabel no="07-B" cn={t("lib.ways.title")} en={t("lib.ways.headEn") as string} />
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            {WAYS.map((w, i) => (
              <TextCard key={w.no} no={w.no} en={w.en} name={t(w.name)} desc={t(w.desc)} delay={i * 100} />
            ))}
          </div>

          {/* AI 标签 */}
          <GroupLabel no="07-C" cn={t("lib.tags.title")} en={t("lib.tags.headEn") as string} />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <p className="text-[14px] leading-8 text-ink/70">{t("lib.tags.desc")}</p>
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/library-08.webp" caption={t("lib.tags.shot") as string} />
            </Reveal>
          </div>

          {/* AI 助手 */}
          <GroupLabel no="07-D" cn={t("lib.ai.title")} en={t("lib.ai.headEn") as string} />
          <Reveal>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t("lib.ai.desc")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <Shot src="shots/library-09.webp" caption={t("lib.ai.shot1") as string} />
            </Reveal>
            <Reveal delay={120}>
              <Shot src="shots/library-10.webp" caption={t("lib.ai.shot2") as string} />
            </Reveal>
          </div>

          {/* 上手步骤 */}
          <GroupLabel no="07-E" cn={t("lib.setup.title")} en={t("lib.setup.headEn") as string} />
          <Reveal>
            <p className="mb-10 max-w-3xl text-[14px] leading-8 text-ink/70">{t("lib.setup.lead")}</p>
          </Reveal>
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.name}>
                <Reveal delay={i * 60}>
                  <div className="grid items-center gap-6 border border-line bg-paper p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-8">
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.24em] text-gfp-deep">
                        STEP {i + 1} / {STEPS.length}
                      </span>
                      <h3 className="mt-3 text-[20px] font-bold tracking-tight">{t(s.name)}</h3>
                      <p className="mt-3 text-[13.5px] leading-7 text-ink/70">{t(s.desc)}</p>
                    </div>
                    <Shot src={s.src} caption={t(s.shot) as string} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <div className="mt-6 border-l-2 border-gfp-deep bg-ink/[0.03] px-5 py-4">
              <p className="text-[13px] leading-7 text-ink/70">{t("lib.setup.note")}</p>
            </div>
          </Reveal>

          {/* 日常工作流 */}
          <GroupLabel no="07-F" cn={t("lib.daily.title")} en={t("lib.daily.headEn") as string} />
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="grid gap-px self-stretch border border-line bg-line">
              <TextCard no="D-01" en="OPEN WITH" name={t("lib.daily.1.name")} desc={t("lib.daily.1.desc")} />
              <TextCard no="D-02" en="YOUR TAGS" name={t("lib.daily.2.name")} desc={t("lib.daily.2.desc")} />
            </div>
            <Reveal delay={120}>
              <Shot src="shots/library-07.webp" caption={t("lib.daily.shot") as string} />
            </Reveal>
          </div>

          {/* 收尾 CTA */}
          <Reveal>
            <div className="mt-24 bg-ink px-6 py-12 text-paper md:px-12 md:py-16">
              <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-paper/55">
                <span className="text-gfp">07</span> — PART OF GENEPAD
              </p>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-tight">
                {t("lib.final.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-[14px] leading-8 text-paper/70">
                {t("lib.final.desc")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="index.html"
                  className="group inline-flex items-center gap-3 bg-gfp px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-ink transition-colors hover:bg-paper"
                >
                  {t("lib.final.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#download"
                  className="group inline-flex items-center gap-3 border border-paper/40 px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:border-gfp hover:text-gfp"
                >
                  {t("lib.final.cta2")}
                  <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </main>
      </LightboxProvider>
      {/* 复用主页下载区（编号顺延为 07-G） */}
      <Download index="07-G" />
      <Footer />
    </div>
  );
}
