import { useCallback, useEffect, useState } from "react";
import { Reveal, SectionHead, SubpageNav, ArrowRight } from "../sections/shared";
import Footer from "../sections/Footer";
import { LightboxProvider, useLightboxImage } from "../lightbox";
import { useLang, usePageTitle } from "../i18n";
import { dismissBoot } from "../boot";
import { feedbackApiUrl, openFeedback } from "../feedback";

/* 公开留言墙（/feedback）：经 GET /api/feedback/list 分页拉取用户留言（仅 hidden=0），
   图片经 /api/feedback/image 从 R2 读出、点击用 Lightbox 放大；
   提交入口复用全站反馈弹窗（openFeedback）。管理口径见 AGENTS.md「Feedback API」。 */

interface FeedbackItem {
  id: string;
  text: string;
  contact: string | null;
  images: string[];
  createdAt: number;
}

const PAGE_SIZE = 20;

function imageUrl(key: string): string {
  return feedbackApiUrl(`/api/feedback/image?key=${encodeURIComponent(key)}`);
}

/* 单张留言截图：注册进全站 Lightbox,点击放大 */
function WallImage({ objectKey, index }: { objectKey: string; index: number }) {
  const open = useLightboxImage({
    src: imageUrl(objectKey),
    caption: `#${index + 1}`,
  });
  return (
    <button
      onClick={open}
      className="group block h-24 w-24 overflow-hidden border border-line md:h-28 md:w-28"
      aria-label={`#${index + 1}`}
    >
      <img
        src={imageUrl(objectKey)}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
    </button>
  );
}

export default function Feedback() {
  const { t, lang } = useLang();
  usePageTitle("title.feedback");
  const [items, setItems] = useState<FeedbackItem[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreFailed, setMoreFailed] = useState(false);
  const [exhausted, setExhausted] = useState(true);

  useEffect(() => dismissBoot(), []);

  const locale = lang === "zh" ? "zh-CN" : "en-US";
  const fmtDate = (ms: number) =>
    new Date(ms).toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const load = useCallback(() => {
    setFailed(false);
    setItems(null);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10000);
    fetch(feedbackApiUrl(`/api/feedback/list?limit=${PAGE_SIZE}`), {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ items?: FeedbackItem[]; total?: number }>;
      })
      .then((json) => {
        const list = json.items ?? [];
        setItems(list);
        setTotal(json.total ?? list.length);
        setExhausted(list.length < PAGE_SIZE);
      })
      .catch(() => setFailed(true))
      .finally(() => window.clearTimeout(timer));
    return () => controller.abort();
  }, []);

  useEffect(() => load(), [load]);

  const loadMore = async () => {
    if (!items?.length || loadingMore) return;
    setLoadingMore(true);
    setMoreFailed(false);
    try {
      const before = items[items.length - 1].createdAt;
      const res = await fetch(
        feedbackApiUrl(`/api/feedback/list?limit=${PAGE_SIZE}&before=${before}`),
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { items?: FeedbackItem[] };
      const more = json.items ?? [];
      setItems((prev) => [...(prev ?? []), ...more]);
      setExhausted(more.length < PAGE_SIZE);
    } catch {
      setMoreFailed(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="MESSAGE WALL" />
      <LightboxProvider>
        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <SectionHead
            index="F"
            eyebrow={t("fbw.eyebrow") as string}
            title={t("fbw.title")}
            titleTag="h1"
          >
            {t("fbw.lead")}
          </SectionHead>

          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                onClick={openFeedback}
                className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[14px] font-medium text-paper transition-colors hover:bg-gfp-deep"
              >
                {t("fbw.write")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              {items && (
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink/45">
                  {total.toLocaleString(locale)} {t("fbw.messages")}
                </p>
              )}
            </div>
          </Reveal>

          {failed ? (
            <div className="mt-14 border border-line px-6 py-16 text-center text-[13px] text-ink/60">
              {t("fbw.error")}
            </div>
          ) : !items ? (
            <div className="mt-14 flex justify-center" aria-hidden>
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink/15 border-t-gfp-deep" />
            </div>
          ) : items.length === 0 ? (
            <div className="mt-14 border border-line px-6 py-16 text-center">
              <p className="text-[13.5px] leading-7 text-ink/65">{t("fbw.empty")}</p>
              <button
                onClick={openFeedback}
                className="mt-6 border border-gfp-deep/45 px-5 py-2.5 font-mono text-[12px] tracking-[0.14em] text-gfp-deep transition-colors hover:bg-gfp-deep hover:text-paper"
              >
                {t("fbw.write")}
              </button>
            </div>
          ) : (
            <ul className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
              {items.map((item, idx) => (
                <li key={item.id} className="bg-paper">
                  <Reveal delay={Math.min(idx, 6) * 60}>
                    <article className="flex h-full flex-col p-6 md:p-7">
                      <p className="whitespace-pre-wrap break-words text-[13.5px] leading-7 text-ink/85">
                        {item.text}
                      </p>
                      {item.images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {item.images.map((k, i) => (
                            <WallImage key={k} objectKey={k} index={i} />
                          ))}
                        </div>
                      )}
                      <p className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-5 font-mono text-[10.5px] tracking-[0.12em] text-ink/45">
                        <span>{fmtDate(item.createdAt)}</span>
                        {item.contact && (
                          <span className="break-all text-ink/60">✉ {item.contact}</span>
                        )}
                        {item.images.length > 0 && (
                          <span>
                            {item.images.length} 🖼
                          </span>
                        )}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}

          {items && items.length > 0 && !exhausted && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="border border-line px-6 py-3 font-mono text-[12px] tracking-[0.16em] text-ink/70 transition-colors hover:border-gfp-deep hover:text-gfp-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loadingMore ? "…" : (t("fbw.loadMore") as string)}
              </button>
              {moreFailed && (
                <p className="text-[12px] text-ink/55">{t("fbw.error")}</p>
              )}
            </div>
          )}
        </main>
      </LightboxProvider>
      <Footer />
    </div>
  );
}
