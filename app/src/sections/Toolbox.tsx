import { useRef, type ReactNode } from "react";
import { Reveal, SectionHead, ImgSpin, useImgLoaded } from "./shared";
import { useLang, type TKey } from "../i18n";
import { useLightboxImage } from "../lightbox";

/* 右键菜单工具 */
const CONTEXT_TOOLS = [
  {
    no: "C-01",
    name: "tb.c1.name",
    en: "DNA GEL",
    src: "shots/dna-gel.webp",
    desc: "tb.c1.desc",
  },
  {
    no: "C-02",
    name: "tb.c2.name",
    en: "PROTEIN GEL",
    src: "shots/protein-gel.webp",
    desc: "tb.c2.desc",
  },
  {
    no: "C-03",
    name: "tb.c3.name",
    en: "CRISPR DESIGN",
    src: "shots/crispr.webp",
    desc: "tb.c3.desc",
  },
] as const;

/* 全局工具箱 */
const GLOBAL_TOOLS = [
  {
    no: "T-01",
    name: "tb.t1.name",
    en: "AI ASSISTANT",
    src: "shots/ai-assistant.webp",
    desc: "tb.t1.desc",
  },
  {
    no: "T-02",
    name: "tb.t2.name",
    en: "FILE LIBRARY",
    src: "shots/file-library.webp",
    desc: "tb.t2.desc",
    href: "library.html",
  },
] as const;

/* 开放性 */
const OPEN_TOOLS = [
  {
    no: "O-01",
    name: "tb.o1.name",
    en: "MULTILINGUAL",
    src: "shots/i18n.webp",
    desc: "tb.o1.desc",
  },
  {
    no: "O-02",
    name: "tb.o2.name",
    en: "OPEN WITH",
    src: "shots/open-with.webp",
    desc: "tb.o2.desc",
  },
] as const;

type Tool = {
  no: string;
  name: TKey;
  en: string;
  src: string;
  desc: TKey;
  href?: string;
};

function ToolCard({ tool, delay = 0 }: { tool: Tool; delay?: number }) {
  const { t } = useLang();
  const zoom = useLightboxImage({
    src: tool.src,
    caption: `${t(tool.name)} · ${tool.en}`,
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const { loaded, onLoad, onError } = useImgLoaded(imgRef);
  return (
    <Reveal delay={delay} className="group bg-paper">
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-line">
          {!loaded && <ImgSpin />}
          <img
            ref={imgRef}
            src={tool.src}
            alt={t(tool.name) as string}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            onError={onError}
            onClick={zoom}
            className="aspect-[16/8.6] w-full cursor-zoom-in object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[18px] font-bold tracking-tight">{t(tool.name)}</h3>
            <span className="font-mono text-[10px] tracking-[0.22em] text-ink/40">
              {tool.no} · {tool.en}
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-7 text-ink/70">{t(tool.desc)}</p>
          {tool.href && (
            <a
              href={tool.href}
              className="group/link mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-gfp-deep hover:underline"
            >
              {t("tb.more")}
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">→</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function GroupLabel({ no, cn, en }: { no: string; cn: ReactNode; en: string }) {
  return (
    <Reveal>
      <div className="mb-8 mt-16 flex items-end justify-between gap-6 border-t-2 border-ink pt-6 first:mt-10">
        <h3 className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-gfp-deep">{no}</span>
          <span className="text-[24px] font-bold leading-none tracking-tight md:text-[30px]">{cn}</span>
        </h3>
        <span className="hidden pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-ink/45 sm:block">{en}</span>
      </div>
    </Reveal>
  );
}

export default function Toolbox() {
  const { t } = useLang();
  return (
    <section id="toolbox" className="border-b border-line bg-paper-2">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead index="06" eyebrow={t("tb.eyebrow") as string} title={t("tb.title")}>
          {t("tb.lead")}
        </SectionHead>

        <GroupLabel no="06-A" cn={t("tb.groupA")} en="Context Menu" />
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {CONTEXT_TOOLS.map((tool, i) => (
            <ToolCard key={tool.no} tool={tool} delay={i * 100} />
          ))}
        </div>

        <GroupLabel no="06-B" cn={t("tb.groupB")} en="Toolbox" />
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {GLOBAL_TOOLS.map((tool, i) => (
            <ToolCard key={tool.no} tool={tool} delay={i * 100} />
          ))}
        </div>

        <GroupLabel no="06-C" cn={t("tb.groupC")} en="Openness" />
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {OPEN_TOOLS.map((tool, i) => (
            <ToolCard key={tool.no} tool={tool} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
