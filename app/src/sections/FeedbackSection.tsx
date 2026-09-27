import { useEffect, useMemo, useState } from "react";
import { Reveal, SectionHead, ArrowRight } from "./shared";
import { useLang } from "../i18n";
import { feedbackApiUrl, openFeedback } from "../feedback";

/* ── 主页「用户反馈」分节（07，位于下载区之上）：留言卡片轮播 ──
   数据来自公开 list 接口（contact 服务端已脱敏）；每 6 秒自动翻页，
   悬停暂停，prefers-reduced-motion 时不自动播放；箭头/圆点可手动切换。
   无留言时展示空态引导。样式与全站分节(SectionHead + Reveal + mono)一致。 */

interface FeedbackItem {
  id: string;
  text: string;
  contact: string | null;
  createdAt: number;
}

const ROTATE_MS = 6000;

function usePerView(): number {
  const [per, setPer] = useState(1);
  useEffect(() => {
    const lgs = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setPer(lgs.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lgs.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lgs.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return per;
}

export default function FeedbackSection({ index }: { index: string }) {
  const { t, lang } = useLang();
  const [items, setItems] = useState<FeedbackItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const per = usePerView();

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8000);
    fetch(feedbackApiUrl(`/api/feedback/list?limit=30`), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ items?: FeedbackItem[] }>;
      })
      .then((json) => {
        if (!cancelled) setItems(json.items ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setFailed(true);
        }
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const pages = Math.max(1, Math.ceil((items?.length ?? 0) / per));
  const cur = Math.min(page, pages - 1);
  const visible = useMemo(
    () => (items ?? []).slice(cur * per, cur * per + per),
    [items, cur, per],
  );

  useEffect(() => setPage(0), [per]);

  /* 自动翻页：悬停暂停；系统偏好减少动态时不自动播 */
  useEffect(() => {
    if (paused || pages <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setPage((p) => (p + 1) % pages), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused, pages]);

  const locale = lang === "zh" ? "zh-CN" : "en-US";
  const fmtDate = (ms: number) =>
    new Date(ms).toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead index={index} eyebrow={t("fbw.eyebrow") as string} title={t("fbw.title")}>
          {t("fbw.lead")}
        </SectionHead>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={openFeedback}
              className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[14px] font-medium text-paper transition-colors hover:bg-gfp-deep"
            >
              {t("fbw.write")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="feedback"
              className="group inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[12px] tracking-[0.14em] text-ink/70 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
            >
              {t("fbw.viewAll")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            {items && (
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45">
                {items.length.toLocaleString(locale)} {t("fbw.messages")}
              </p>
            )}
          </div>
        </Reveal>

        {failed ? (
          <div className="mt-12 border border-line px-6 py-14 text-center text-[13px] text-ink/60">
            {t("fbw.error")}
          </div>
        ) : !items ? (
          <div className="mt-12 flex justify-center" aria-hidden>
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink/15 border-t-gfp-deep" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12 border border-line px-6 py-14 text-center">
            <p className="text-[13.5px] leading-7 text-ink/65">{t("fbw.empty")}</p>
            <button
              onClick={openFeedback}
              className="mt-5 border border-gfp-deep/45 px-5 py-2.5 font-mono text-[12px] tracking-[0.14em] text-gfp-deep transition-colors hover:bg-gfp-deep hover:text-paper"
            >
              {t("fbw.write")}
            </button>
          </div>
        ) : (
          <Reveal delay={140}>
            {/* 卡片区：悬停暂停自动播放 */}
            <div
              className="mt-12"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div key={cur} className="gp-fade-in grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                  <article
                    key={item.id}
                    className="flex min-h-[220px] flex-col bg-paper p-6 md:p-7"
                  >
                    <span className="font-mono text-[20px] leading-none text-gfp-deep/60">“</span>
                    <p className="mt-3 flex-1 overflow-hidden text-[13.5px] leading-7 text-ink/85 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6]">
                      {item.text}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-[10.5px] tracking-[0.12em] text-ink/45">
                      <span>{fmtDate(item.createdAt)}</span>
                      {item.contact && (
                        <span className="text-ink/55">✉ {item.contact}</span>
                      )}
                    </p>
                  </article>
                ))}
              </div>

              {/* 轮播控制：圆点 + 箭头 */}
              {pages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2" role="tablist" aria-label={t("fbw.title") as string}>
                    {Array.from({ length: pages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        aria-label={`${i + 1} / ${pages}`}
                        aria-current={i === cur}
                        className={`h-1.5 w-6 transition-colors ${
                          i === cur ? "bg-gfp-deep" : "bg-ink/15 hover:bg-ink/30"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((cur - 1 + pages) % pages)}
                      aria-label={t("fbw.prev") as string}
                      className="flex h-10 w-10 items-center justify-center border border-line font-mono text-ink/60 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setPage((cur + 1) % pages)}
                      aria-label={t("fbw.next") as string}
                      className="flex h-10 w-10 items-center justify-center border border-line font-mono text-ink/60 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
