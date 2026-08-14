import { Reveal, PlasmidGlyph } from "./shared";
import { useLang } from "../i18n";
import { RELEASES_URL, GITEE_RELEASES_URL } from "../download-data";

/* 页脚质粒环：滚动到位后描线绘制 */
function FooterPlasmid() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="plasmid-draw h-full w-full" aria-hidden>
      <circle cx="100" cy="100" r="78" stroke="rgba(246,246,244,0.28)" strokeWidth="1.5" style={{ "--dash": 520 } as React.CSSProperties} />
      <path d="M100 22a78 78 0 0 1 68 40" stroke="#45c51f" strokeWidth="7" strokeLinecap="round" style={{ "--dash": 220 } as React.CSSProperties} />
      <path d="M100 178a78 78 0 0 1-62-30" stroke="rgba(69,197,31,0.45)" strokeWidth="7" strokeLinecap="round" style={{ "--dash": 220 } as React.CSSProperties} />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 86;
        const y1 = 100 + Math.sin(a) * 86;
        const x2 = 100 + Math.cos(a) * 92;
        const y2 = 100 + Math.sin(a) * 92;
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`}
            stroke="rgba(246,246,244,0.35)"
            strokeWidth="1"
            style={{ "--dash": 12 } as React.CSSProperties}
          />
        );
      })}
      <text x="100" y="97" textAnchor="middle" fill="rgba(246,246,244,0.75)" fontSize="13" fontFamily="'IBM Plex Mono',monospace" letterSpacing="1">
        4,732 bp
      </text>
      <text x="100" y="114" textAnchor="middle" fill="rgba(69,197,31,0.9)" fontSize="9" fontFamily="'IBM Plex Mono',monospace" letterSpacing="2">
        CIRCULAR
      </text>
    </svg>
  );
}

export default function Footer() {
  const { t } = useLang();

  const COLS = [
    {
      title: t("ft.col.download"),
      links: [
        { label: "GitHub Releases", href: RELEASES_URL, external: true },
        { label: t("ft.giteeMirror"), href: GITEE_RELEASES_URL, external: true },
        { label: t("ft.changelog"), href: "changelog.html", external: false },
      ],
    },
    {
      title: t("ft.col.support"),
      links: [
        { label: "GitHub Issues", href: "https://github.com/GenePad/GenePad.github.io/issues", external: true },
        { label: "Gitee Issues", href: "https://gitee.com/GenePad/GenePad.github.io/issues", external: true },
        { label: t("ft.docs"), href: "tech-support.html", external: false },
      ],
    },
    {
      title: t("ft.col.more"),
      links: [
        { label: t("ft.sponsor"), href: "https://ifdian.net/a/geneeditor", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="border-t border-lined">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <PlasmidGlyph className="h-6 w-6 text-paper" />
                  <span className="font-display text-[22px] font-bold tracking-tight">GenePad</span>
                </div>
                <p className="mt-4 max-w-md text-[13.5px] leading-7 text-paper/60">
                  {t("ft.blurb")}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10 grid gap-10 sm:grid-cols-3">
                  {COLS.map((col) => (
                    <div key={col.title as string}>
                      <p className="font-mono text-[10px] tracking-[0.26em] uppercase text-paper/45">
                        {col.title}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {col.links.map((l) => (
                          <li key={l.label as string}>
                            <a
                              href={l.href}
                              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                              className="text-[13.5px] text-paper/75 transition-colors hover:text-gfp"
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="hidden w-[200px] lg:block">
              <FooterPlasmid />
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-lined pt-6 font-mono text-[10.5px] tracking-[0.18em] text-paper/40 md:flex-row md:items-center md:justify-between">
            <span>{t("ft.copyright")}</span>
            <span>GENBANK · FASTA · DNA · AB1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
