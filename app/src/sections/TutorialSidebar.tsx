import { useLang } from "../i18n";
import {
  TUTORIAL_CATEGORIES,
  tutorialHref,
  tutorialNo,
  tutorialsInCategory,
} from "../tutorial-data";

/* 教程侧边导航：顶部「目录总览」+ 分类分组 + 各教程（当前页高亮）。
   lg 以下隐藏——详情页另有面包屑与上一篇/下一篇翻页兜底。
   current 传教程 id；目录页传 null（总览高亮）。 */

export default function TutorialSidebar({ current }: { current: string | null }) {
  const { t } = useLang();
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-8">
        <a
          href="tutorial.html"
          aria-current={current === null ? "page" : undefined}
          className={`-ml-px block border-l-2 py-1.5 pl-4 font-mono text-[12px] tracking-[0.18em] transition-colors ${
            current === null
              ? "border-gfp-deep text-gfp-deep"
              : "border-transparent text-ink/60 hover:border-line-strong hover:text-ink"
          }`}
        >
          {t("nav.tutorial")}
          <span className="mt-0.5 block text-[10px] tracking-[0.24em] text-ink/40">INDEX</span>
        </a>

        {TUTORIAL_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <p className="mb-2 pl-4 font-mono text-[10px] leading-5 tracking-[0.24em] uppercase text-ink/45">
              {t(cat.name)}
              <span className="block text-ink/30">{t(cat.en)}</span>
            </p>
            <ul className="border-l border-line">
              {tutorialsInCategory(cat).map((tut) => {
                const active = tut.id === current;
                return (
                  <li key={tut.id}>
                    <a
                      href={tutorialHref(tut)}
                      aria-current={active ? "page" : undefined}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-6 transition-colors ${
                        active
                          ? "border-gfp-deep font-medium text-gfp-deep"
                          : "border-transparent text-ink/70 hover:border-line-strong hover:text-ink"
                      }`}
                    >
                      <span className="mr-2 font-mono text-[10px] text-ink/40">
                        {String(tutorialNo(tut) + 1).padStart(2, "0")}
                      </span>
                      {t(tut.toc.name)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
