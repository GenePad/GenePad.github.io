import { Reveal, SectionHead, ArrowRight, PlasmidGlyph } from "../sections/shared";
import Footer from "../sections/Footer";
import { useLang } from "../i18n";

/* 技术支持 / 开发者文档首页：.gen、.gjson、.dna、Rust 示例四个入口 */

function DocNav() {
  const { t, lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="index.html" className="flex items-center gap-2.5">
          <PlasmidGlyph className="h-5 w-5 text-ink" />
          <span className="font-display text-[17px] font-bold tracking-tight">GenePad</span>
          <span className="mt-0.5 hidden font-mono text-[10px] tracking-[0.2em] text-ink/50 sm:inline">
            DEV DOCS
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
            {t("ts.back")}
          </a>
        </div>
      </div>
    </header>
  );
}

export default function TechSupport() {
  const { t } = useLang();

  const GROUPS = [
    {
      no: "A",
      cn: t("ts.group.formats"),
      en: t("ts.group.formatsEn") as string,
      docs: [
        {
          href: "tech-gen-format.html",
          title: t("ts.gen.title"),
          desc: t("ts.gen.desc"),
          tag: ".GEN · SQLITE 3",
        },
        {
          href: "tech-gjson-format.html",
          title: t("ts.gjson.title"),
          desc: t("ts.gjson.desc"),
          tag: ".GJSON · JSON",
        },
        {
          href: "tech-dna-conversion.html",
          title: t("ts.dna.title"),
          desc: t("ts.dna.desc"),
          tag: ".DNA · SNAPGENE",
        },
      ],
    },
    {
      no: "B",
      cn: t("ts.group.code"),
      en: t("ts.group.codeEn") as string,
      docs: [
        {
          href: "tech-rust-readers.html",
          title: t("ts.rust.title"),
          desc: t("ts.rust.desc"),
          tag: "RUST · RUSQLITE + SERDE_JSON",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <DocNav />
      <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead index="D" eyebrow={t("ts.eyebrow") as string} title={t("ts.title")}>
          {t("ts.lead")}
        </SectionHead>

        {GROUPS.map((g) => (
          <section key={g.no} className="mb-16">
            <Reveal>
              <div className="mb-8 flex items-end justify-between gap-6 border-t-2 border-ink pt-6">
                <h2 className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-gfp-deep">
                    {g.no}
                  </span>
                  <span className="text-[24px] font-bold leading-none tracking-tight md:text-[30px]">
                    {g.cn}
                  </span>
                </h2>
                <span className="hidden pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-ink/45 sm:block">
                  {g.en}
                </span>
              </div>
            </Reveal>

            <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {g.docs.map((d, i) => (
                <Reveal key={d.href} delay={i * 100} className="group bg-paper">
                  <a
                    href={d.href}
                    className="flex h-full flex-col p-6 transition-colors hover:bg-white md:p-7"
                  >
                    <span className="font-mono text-[10px] tracking-[0.22em] text-gfp-deep">
                      {d.tag}
                    </span>
                    <h3 className="mt-3 text-[19px] font-bold tracking-tight">{d.title}</h3>
                    <p className="mt-3 flex-1 text-[13.5px] leading-7 text-ink/70">{d.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-ink/50 transition-colors group-hover:text-gfp-deep">
                      {t("ts.readDoc")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <Reveal>
          <div className="border-l-2 border-gfp-deep bg-ink/[0.03] px-5 py-4">
            <p className="text-[13px] leading-7 text-ink/70">{t("ts.feedback")}</p>
            <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] tracking-[0.14em]">
              <a
                href="https://github.com/GenePad/GenePad.github.io/issues"
                target="_blank"
                rel="noreferrer"
                className="text-gfp-deep hover:underline"
              >
                GITHUB ISSUES →
              </a>
              <a
                href="https://gitee.com/GenePad/GenePad.github.io/issues"
                target="_blank"
                rel="noreferrer"
                className="text-gfp-deep hover:underline"
              >
                GITEE ISSUES →
              </a>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
