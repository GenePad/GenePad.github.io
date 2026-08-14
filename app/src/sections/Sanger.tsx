import { Reveal, SectionHead, Shot } from "./shared";
import { useLang } from "../i18n";

export default function Sanger() {
  const { t } = useLang();

  const BADGES = [
    { k: "IDENTITY", v: "100.0%" },
    { k: "E-VALUE", v: "< 1e-200" },
    { k: "READ LENGTH", v: "1,104 bp" },
    { k: "FORMAT", v: t("sg.badge.format") },
  ];

  return (
    <section id="sanger" className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          {/* 左侧：双截图错落叠放 */}
          <div className="relative order-2 lg:order-1">
            <Reveal clip>
              <Shot
                src="shots/sanger-1.webp"
                caption={t("sg.shot1") as string}
              />
            </Reveal>
            <Reveal clip delay={180} className="relative z-10 -mt-10 ml-auto w-[86%] md:-mt-16">
              <Shot
                src="shots/sanger-2.webp"
                caption={t("sg.shot2") as string}
              />
            </Reveal>
          </div>

          {/* 右侧：文案 + 指标 */}
          <div className="order-1 lg:order-2">
            <SectionHead index="03" eyebrow={t("sg.eyebrow") as string} title={t("sg.title")}>
              {t("sg.lead")}
            </SectionHead>

            <Reveal delay={220}>
              <ul className="grid grid-cols-2 border-l border-t border-line">
                {BADGES.map((b) => (
                  <li key={b.k} className="border-b border-r border-line px-5 py-4">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-ink/45">{b.k}</p>
                    <p className="mt-1.5 font-mono text-[17px] font-semibold tracking-tight text-gfp-deep">
                      {b.v}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
