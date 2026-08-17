import { useState } from "react";
import { Reveal, SectionHead, Shot } from "./shared";
import { useLang, type TKey } from "../i18n";

const ITEMS: { key: string; no: string; name: TKey; en: string; src: string; caption: string; desc: TKey }[] = [
  {
    key: "atlas",
    no: "01",
    name: "wb.1.name",
    en: "PLASMID ATLAS",
    src: "shots/atlas-overview.webp",
    caption: "CIRCULAR MAP — 26 ANNOTATIONS · 89 ENZYME SITES",
    desc: "wb.1.desc",
  },
  {
    key: "jump",
    no: "02",
    name: "wb.2.name",
    en: "MAP → SEQUENCE",
    src: "shots/map-to-seq.webp",
    caption: "FEATURE TABLE → JUMP TO 630..648 · 19 BP · TM 29.5 °C",
    desc: "wb.2.desc",
  },
  {
    key: "enzyme",
    no: "03",
    name: "wb.3.name",
    en: "RESTRICTION SITES",
    src: "shots/enzyme-sites.webp",
    caption: "ECORI — GAATTC · TOP CUT 7441 · 5′ OVERHANG",
    desc: "wb.3.desc",
  },
  {
    key: "protein",
    no: "04",
    name: "wb.4.name",
    en: "PROTEIN PROPERTIES",
    src: "shots/protein-props.webp",
    caption: "AMPR — 263 AA · 28.95 KDA · PI 5.34 (IPC2_PROTEIN)",
    desc: "wb.4.desc",
  },
];

export default function Workbench() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  return (
    <section id="workbench" className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead index="01" eyebrow={t("wb.eyebrow") as string} title={t("wb.title")}>
          {t("wb.lead")}
        </SectionHead>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
          {/* 左侧条目列表 */}
          <Reveal className="lg:pt-2">
            <ul className="border-t border-line">
              {ITEMS.map((it, i) => {
                const on = i === active;
                return (
                  <li key={it.key} className="border-b border-line">
                    <button
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-baseline gap-4 px-1 py-5 text-left transition-colors ${
                        on ? "text-ink" : "text-ink/55 hover:text-ink"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] tracking-[0.2em] ${
                          on ? "text-gfp-deep" : "text-ink/40"
                        }`}
                      >
                        {it.no}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[17px] font-bold leading-6">{t(it.name)}</span>
                        <span className="mt-1 block font-mono text-[10px] tracking-[0.22em] text-ink/40">
                          {it.en}
                        </span>
                      </span>
                      <span
                        className={`h-2 w-2 shrink-0 translate-y-[-2px] transition-all ${
                          on ? "bg-gfp-deep" : "bg-line-strong group-hover:bg-ink/40"
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        on ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-1 pb-6 pl-10 text-[13.5px] leading-7 text-ink/70 max-lg:pb-4">
                          {t(it.desc)}
                        </p>
                        {/* 手机端截图跟在条目正下方，宽屏仍用右侧大图 */}
                        <div className="px-1 pb-7 pl-10 lg:hidden">
                          <Shot src={it.src} caption={it.caption} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* 右侧大图：交叉淡化切换（仅宽屏；手机端改为条目内嵌） */}
          <Reveal clip delay={140} className="hidden lg:block">
            <div className="relative">
              {ITEMS.map((it, i) => (
                <div
                  key={it.key}
                  className={`transition-opacity duration-500 ${
                    i === active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                  }`}
                >
                  <Shot src={it.src} caption={it.caption} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
