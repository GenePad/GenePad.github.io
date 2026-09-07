import { useEffect, useState } from "react";
import { PlasmidGlyph } from "./shared";
import { useLang } from "../i18n";
import { VERSION } from "../download-data";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LINKS = [
    { href: "#workbench", label: t("nav.workbench") },
    { href: "#sanger", label: t("nav.sanger") },
    { href: "#daynight", label: t("nav.daynight") },
    { href: "#toolbox", label: t("nav.toolbox") },
    { href: "#download", label: t("nav.download") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <PlasmidGlyph className="h-5 w-5 text-pine" />
          <span className="font-display text-[17px] font-bold tracking-tight">GenePad</span>
          <span className="mt-0.5 hidden font-mono text-[10px] tracking-[0.2em] text-ink/50 sm:inline">
            v{VERSION} BETA
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:text-gfp-deep"
            >
              {l.label}
            </a>
          ))}
          <a
            href="library.html"
            className="font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:text-gfp-deep"
          >
            {t("nav.library")}
          </a>
          <a
            href="ngs.html"
            className="hidden font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:text-gfp-deep lg:inline"
          >
            {t("nav.ngs")}
          </a>
          <a
            href="tech-support.html"
            className="font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:text-gfp-deep"
          >
            {t("nav.docs")}
          </a>
          <a
            href="projects.html"
            className="hidden font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:text-gfp-deep lg:inline"
          >
            {t("nav.projects")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            aria-label="Switch language"
            className="border border-line-strong px-3 py-2 font-mono text-[12px] tracking-[0.12em] text-ink/70 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
          >
            {t("nav.lang")}
          </button>
          <a
            href="#download"
            className="group flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[12px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
          >
            {t("nav.cta")}
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
