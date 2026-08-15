import { Reveal, SectionHead, ArrowRight, SubpageNav } from "../sections/shared";
import Footer from "../sections/Footer";
import { useLang, type Lang } from "../i18n";

/* 生态项目页：GenePad 组织的两个独立小项目（commonfeatures / CodonAtlas）
   叙述文案走 i18n（pr.*），规格表与分类 chips 属于结构化数据，按语言记录在本文件内 */

type L = Record<Lang, string>;

const CF_REPO = "https://github.com/GenePad/genepad-commonfeatures/";
const CF_FEATURES = "https://github.com/GenePad/genepad-commonfeatures/blob/main/docs/FEATURES.md";
const CA_REPO = "https://github.com/GenePad/GenePadCodonAtlas";
const ORG_URL = "https://github.com/GenePad";

const CF_CATS: { name: L; n: number }[] = [
  { name: { zh: "抗生素抗性", en: "Antibiotic resistance" }, n: 14 },
  { name: { zh: "复制起点", en: "Origins" }, n: 12 },
  { name: { zh: "原核启动子", en: "Bacterial promoters" }, n: 16 },
  { name: { zh: "原核终止子", en: "Bacterial terminators" }, n: 6 },
  { name: { zh: "原核调控", en: "Bacterial regulatory" }, n: 15 },
  { name: { zh: "哺乳动物启动子", en: "Mammalian promoters" }, n: 19 },
  { name: { zh: "哺乳动物 polyA", en: "Mammalian polyA" }, n: 4 },
  { name: { zh: "哺乳动物调控", en: "Mammalian regulatory" }, n: 10 },
  { name: { zh: "酵母元件", en: "Yeast elements" }, n: 17 },
  { name: { zh: "植物元件", en: "Plant elements" }, n: 8 },
  { name: { zh: "昆虫元件", en: "Insect elements" }, n: 4 },
  { name: { zh: "iGEM BioBrick 标准件", en: "iGEM BioBrick parts" }, n: 30 },
  { name: { zh: "AAV 载体元件", en: "AAV vectors" }, n: 15 },
  { name: { zh: "病毒载体元件", en: "Viral vectors" }, n: 9 },
  { name: { zh: "蛋白标签", en: "Protein tags" }, n: 34 },
  { name: { zh: "荧光蛋白", en: "Fluorescent proteins" }, n: 14 },
  { name: { zh: "报告酶", en: "Reporter enzymes" }, n: 7 },
  { name: { zh: "重组位点", en: "Recombination sites" }, n: 16 },
  { name: { zh: "引物结合位点", en: "Primer binding sites" }, n: 12 },
  { name: { zh: "其他", en: "Misc" }, n: 4 },
];

const CF_SPECS: { k: L; v: L }[] = [
  {
    k: { zh: "规模", en: "Scale" },
    v: { zh: "266 个元件 · 20 个分类", en: "266 elements · 20 categories" },
  },
  {
    k: { zh: "溯源", en: "Provenance" },
    v: {
      zh: "每条元件记录 NCBI 登录号 + 参考质粒名",
      en: "Each element records an NCBI accession + reference plasmid",
    },
  },
  {
    k: { zh: "格式", en: "Formats" },
    v: { zh: "GenBank (.gb) + FASTA (.fa) 双格式", en: "GenBank (.gb) + FASTA (.fa)" },
  },
  {
    k: { zh: "兼容", en: "Compatible" },
    v: {
      zh: "SnapGene / Benchling common features 库导入即用",
      en: "Import as a SnapGene / Benchling common features library",
    },
  },
  {
    k: { zh: "重建", en: "Rebuild" },
    v: {
      zh: "fetch_features.py · export.py · verify.py 质量门",
      en: "fetch_features.py · export.py · verify.py quality gate",
    },
  },
  {
    k: { zh: "许可", en: "License" },
    v: {
      zh: "MIT（元件序列为公共领域事实数据）",
      en: "MIT (element sequences are public-domain facts)",
    },
  },
];

const CA_SPECS: { k: L; v: L }[] = [
  {
    k: { zh: "上游", en: "Inputs" },
    v: {
      zh: "GTEx v8 基因中位 TPM + GENCODE release 50（注释 + CDS FASTA）",
      en: "GTEx v8 gene median TPM + GENCODE release 50 (GTF + CDS FASTA)",
    },
  },
  {
    k: { zh: "方法", en: "Method" },
    v: {
      zh: "按组织表达加权计数；每基因取一条代表性编码转录本",
      en: "Tissue-expression-weighted counting; one representative coding transcript per gene",
    },
  },
  {
    k: { zh: "输出", en: "Outputs" },
    v: {
      zh: "Frequency/1000 · 同义分数 · RSCU · CAI 权重 · 偏好密码子",
      en: "Frequency/1000 · synonymous fraction · RSCU · CAI weights · preferred codons",
    },
  },
  {
    k: { zh: "工程", en: "Engineering" },
    v: {
      zh: "Python 管线 · unittest · 发布检查与打包脚本",
      en: "Python pipeline · unittest · release check & packaging scripts",
    },
  },
  {
    k: { zh: "商用", en: "Commercial" },
    v: {
      zh: "附商用自查清单（COMMERCIAL_USE_CHECKLIST）",
      en: "Commercial-use checklist included",
    },
  },
  {
    k: { zh: "许可", en: "License" },
    v: {
      zh: "源码公开 · GenePad 专有许可（商用需书面授权）",
      en: "Source-available · GenePad Proprietary License (written agreement for commercial use)",
    },
  },
];

const CA_METRICS = [
  "FREQUENCY / 1000",
  "RSCU",
  "CAI WEIGHTS",
  "SYNONYMOUS FRACTION",
  "PREFERRED CODONS",
  "PER-TISSUE TABLES",
];

function SpecTable({ rows, lang }: { rows: { k: L; v: L }[]; lang: Lang }) {
  return (
    <dl className="mt-4">
      {rows.map((r) => (
        <div
          key={r.k.en}
          className="grid grid-cols-[76px_1fr] gap-4 border-b border-line py-3 last:border-b-0 md:grid-cols-[104px_1fr]"
        >
          <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
            {r.k[lang]}
          </dt>
          <dd className="text-[13px] leading-6 text-ink/75">{r.v[lang]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Projects() {
  const { t, lang } = useLang();

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="PROJECTS" />
      <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead
          index="06"
          eyebrow={t("pr.eyebrow") as string}
          title={t("pr.title")}
          titleTag="h1"
        >
          {t("pr.lead")}
        </SectionHead>

        {/* 01 · 质粒通用元件库 */}
        <section className="mb-16">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6 border-t-2 border-ink pt-6">
              <h2 className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-gfp-deep">
                  01
                </span>
                <span className="text-[24px] font-bold leading-none tracking-tight md:text-[30px]">
                  {t("pr.cf.head")}
                </span>
              </h2>
              <span className="hidden pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-ink/45 sm:block">
                COMMON FEATURES
              </span>
            </div>
          </Reveal>

          <Reveal>
            <article className="border border-line bg-paper">
              <div className="border-b border-line p-6 md:p-8">
                <span className="font-mono text-[10px] tracking-[0.22em] text-gfp-deep">
                  266 ELEMENTS · 20 CATEGORIES · GENBANK + FASTA
                </span>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                  <h3 className="text-[22px] font-bold tracking-tight md:text-[26px]">
                    {t("pr.cf.title")}
                  </h3>
                  <span className="font-mono text-[12px] text-ink/50">genepad-commonfeatures</span>
                  <span className="border border-gfp-deep/40 px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-gfp-deep">
                    MIT
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-[14px] leading-7 text-ink/70">{t("pr.cf.desc")}</p>
              </div>

              <div className="grid gap-px bg-line lg:grid-cols-2">
                <div className="bg-paper p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-ink/45">
                    {t("pr.specs")}
                  </p>
                  <SpecTable rows={CF_SPECS} lang={lang} />
                </div>
                <div className="flex flex-col bg-paper p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-ink/45">
                    {t("pr.cf.catsTitle")}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {CF_CATS.map((c) => (
                      <li
                        key={c.name.en}
                        className="border border-line-strong bg-ink/[0.02] px-2.5 py-1 text-[12px] text-ink/70"
                      >
                        {c.name[lang]}
                        <span className="ml-1.5 font-mono text-[10px] text-ink/40">{c.n}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <div className="border-l-2 border-gfp-deep bg-ink/[0.03] px-4 py-3.5">
                      <p className="text-[12.5px] leading-6 text-ink/70">{t("pr.cf.usage")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line px-6 py-4 font-mono text-[11px] tracking-[0.16em] md:px-8">
                <a
                  href={CF_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-gfp-deep hover:underline"
                >
                  GITHUB REPOSITORY
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={CF_FEATURES}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-gfp-deep hover:underline"
                >
                  ELEMENT LIST · FEATURES.MD
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        {/* 02 · 组织特异性密码子图谱 */}
        <section className="mb-16">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-6 border-t-2 border-ink pt-6">
              <h2 className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-gfp-deep">
                  02
                </span>
                <span className="text-[24px] font-bold leading-none tracking-tight md:text-[30px]">
                  {t("pr.ca.head")}
                </span>
              </h2>
              <span className="hidden pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-ink/45 sm:block">
                CODON ATLAS
              </span>
            </div>
          </Reveal>

          <Reveal>
            <article className="border border-line bg-paper">
              <div className="border-b border-line p-6 md:p-8">
                <span className="font-mono text-[10px] tracking-[0.22em] text-gfp-deep">
                  GTEX V8 · GENCODE 50 · EXPRESSION-WEIGHTED
                </span>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                  <h3 className="text-[22px] font-bold tracking-tight md:text-[26px]">
                    {t("pr.ca.title")}
                  </h3>
                  <span className="font-mono text-[12px] text-ink/50">GenePadCodonAtlas</span>
                  <span className="border border-line-strong px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-ink/55">
                    SOURCE-AVAILABLE · PROPRIETARY
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-[14px] leading-7 text-ink/70">{t("pr.ca.desc")}</p>
              </div>

              <div className="grid gap-px bg-line lg:grid-cols-2">
                <div className="bg-paper p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-ink/45">
                    {t("pr.specs")}
                  </p>
                  <SpecTable rows={CA_SPECS} lang={lang} />
                </div>
                <div className="flex flex-col bg-paper p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-ink/45">
                    {t("pr.ca.metricsTitle")}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {CA_METRICS.map((m) => (
                      <li
                        key={m}
                        className="border border-line-strong bg-ink/[0.02] px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-ink/70"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <div className="border-l-2 border-gfp-deep bg-ink/[0.03] px-4 py-3.5">
                      <p className="text-[12.5px] leading-6 text-ink/70">{t("pr.ca.usage")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line px-6 py-4 font-mono text-[11px] tracking-[0.16em] md:px-8">
                <a
                  href={CA_REPO}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-gfp-deep hover:underline"
                >
                  GITHUB REPOSITORY
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        <Reveal>
          <div className="border-l-2 border-gfp-deep bg-ink/[0.03] px-5 py-4">
            <p className="text-[13px] leading-7 text-ink/70">{t("pr.org.text")}</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em]">
              <a
                href={ORG_URL}
                target="_blank"
                rel="noreferrer"
                className="text-gfp-deep hover:underline"
              >
                GITHUB.COM/GENEPAD →
              </a>
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
