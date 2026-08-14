import { useState } from "react";
import { Reveal, SectionHead } from "./shared";
import { useLang, type TKey } from "../i18n";
import { useLightboxImage } from "../lightbox";

const MODES = {
  night: {
    src: "shots/dark-mode.webp",
    alt: "dn.alt.night",
    caption: "dn.caption.night",
    frame: "bg-[#101a0c]",
    state: "dn.state.night",
  },
  day: {
    src: "shots/light-mode.webp",
    alt: "dn.alt.day",
    caption: "dn.caption.day",
    frame: "bg-white",
    state: "dn.state.day",
  },
} as const satisfies Record<
  string,
  { src: string; alt: TKey; caption: TKey; frame: string; state: TKey }
>;

type ModeKey = keyof typeof MODES;

/* 只注册当前可见的那张图（避免灯箱里出现被隐藏的昼/夜另一张） */
function ModeImg({ mode, active }: { mode: ModeKey; active: boolean }) {
  const { t } = useLang();
  const m = MODES[mode];
  const zoom = useLightboxImage(
    { src: m.src, caption: t(m.caption) as string },
    active
  );
  return (
    <img
      src={m.src}
      alt={t(m.alt) as string}
      onClick={active ? zoom : undefined}
      className={`w-full transition-opacity duration-700 ${
        active
          ? "relative block cursor-zoom-in opacity-100"
          : "pointer-events-none absolute inset-2 opacity-0 md:inset-2.5"
      }`}
    />
  );
}

export default function DayNight() {
  const { t } = useLang();
  const [mode, setMode] = useState<ModeKey>("night");
  const cur = MODES[mode];

  return (
    <section id="daynight" className="border-b border-lined bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <SectionHead
            index="02"
            eyebrow={t("dn.eyebrow") as string}
            dark
            title={t("dn.title")}
          >
            {t("dn.lead")}
          </SectionHead>

          {/* 切换开关：图上方 */}
          <Reveal delay={180}>
            <div className="mb-8 flex flex-wrap items-center gap-5">
              <div className="flex border border-lined font-mono text-[12px] tracking-[0.18em]">
                {(
                  [
                    ["day", t("dn.day")],
                    ["night", t("dn.night")],
                  ] as const
                ).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setMode(k)}
                    className={`px-8 py-3.5 transition-colors ${
                      mode === k ? "bg-paper text-ink" : "text-paper/55 hover:text-paper"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-paper/45">
                {t(cur.state)}
              </p>
            </div>
          </Reveal>
        </div>

        {/* 单图原位切换 */}
        <Reveal clip delay={140}>
          <figure className="shot-frame text-paper/70">
            <div
              className={`relative border border-lined p-2 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.8)] transition-colors duration-700 md:p-2.5 ${cur.frame}`}
            >
              {(
                [
                  ["night", MODES.night],
                  ["day", MODES.day],
                ] as const
              ).map(([k]) => (
                <ModeImg key={k} mode={k} active={mode === k} />
              ))}
            </div>
            <figcaption className="mt-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-paper/55">
              <span className="inline-block h-1.5 w-1.5 bg-gfp" />
              {t(cur.caption)}
            </figcaption>
          </figure>
        </Reveal>

      </div>
    </section>
  );
}
