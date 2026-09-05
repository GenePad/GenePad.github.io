import { useEffect, useState } from "react";
import { Reveal, SectionHead, SubpageNav, ArrowRight } from "../sections/shared";
import Footer from "../sections/Footer";
import { useLang, usePageTitle } from "../i18n";
import { dismissBoot } from "../boot";

/* 实时数据页：公开的匿名使用统计聚合（总装机 / 活跃 / 时长 / 每周新增）
   数据来自 /api/telemetry/stats（仅聚合计数，无任何 uuid 明细），
   该接口托管在 genepad.pages.dev，跨域调用（genepad.cn / GitHub Pages 镜像）依赖其 CORS 头 */

const STATS_URL = "https://genepad.pages.dev/api/telemetry/stats";
const WEEKS_SHOWN = 26;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

interface StatsData {
  installs: number;
  active30d: number;
  active7d: number;
  totalHours: number;
  byOs?: Partial<Record<"windows" | "linux" | "macos" | "android" | "other", number>>;
  weekly: { w: number; n: number }[];
  updatedAt: number;
}

export default function Stats() {
  const { t, lang } = useLang();
  usePageTitle("title.stats");
  const [data, setData] = useState<StatsData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => dismissBoot(), []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10000);
    fetch(STATS_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<StatsData>;
      })
      .then((json) => {
        if (!json || !Array.isArray(json.weekly)) throw new Error("bad payload");
        setData(json);
      })
      .catch(() => setFailed(true))
      .finally(() => window.clearTimeout(timer));
    return () => controller.abort();
  }, []);

  const locale = lang === "zh" ? "zh-CN" : "en-US";
  const fmt = (n: number) => n.toLocaleString(locale);
  const fmtHours = (n: number) =>
    n.toLocaleString(locale, { maximumFractionDigits: 1 });
  const fmtDay = (ms: number) =>
    new Date(ms).toLocaleDateString(locale, { month: "short", day: "numeric" });
  const fmtUpdated = (ms: number) =>
    new Date(ms).toLocaleString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const cards: { label: string; value: string; unit?: string }[] = [
    { label: t("st.k.installs") as string, value: data ? fmt(data.installs) : "—" },
    { label: t("st.k.active30") as string, value: data ? fmt(data.active30d) : "—" },
    { label: t("st.k.active7") as string, value: data ? fmt(data.active7d) : "—" },
    {
      label: t("st.k.hours") as string,
      value: data ? fmtHours(data.totalHours) : "—",
      unit: t("st.k.hoursUnit") as string,
    },
  ];

  const weekly = data?.weekly?.slice(-WEEKS_SHOWN) ?? [];
  const maxN = Math.max(1, ...weekly.map((d) => d.n));

  /* 系统分布:按装机数降序,零计数不占行 */
  const osLabels: Record<string, string> = {
    windows: "Windows",
    linux: "Linux",
    macos: "macOS",
    android: "Android",
    other: t("st.os.other") as string,
  };
  const osRows = Object.entries(data?.byOs ?? {})
    .map(([key, n]) => ({ key, label: osLabels[key] ?? key, n: n ?? 0 }))
    .filter((row) => row.n > 0)
    .sort((a, b) => b.n - a.n || a.key.localeCompare(b.key));
  const osTotal = osRows.reduce((sum, row) => sum + row.n, 0);

  /* 图表绘制区：viewBox 固定 26 根柱，柱高按最大值归一 */
  const CHART_W = 780;
  const CHART_H = 200;
  const PAD_BOTTOM = 26;
  const BAR_SLOT = CHART_W / Math.max(1, weekly.length);
  const BAR_W = Math.floor(BAR_SLOT * 0.56);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <SubpageNav tag="LIVE STATS" />
      <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <SectionHead index="01" eyebrow={t("st.eyebrow") as string} title={t("st.title")}>
          {t("st.lead")}
        </SectionHead>

        {/* 四格大数字 */}
        <Reveal delay={120}>
          <ul className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
            {cards.map((c) => (
              <li key={c.label} className="border-b border-r border-line px-6 py-8 md:px-8 md:py-10">
                <p className="font-mono text-[10px] tracking-[0.22em] text-ink/45">{c.label}</p>
                <p className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-none tracking-tight text-gfp-deep tabular-nums">
                  {c.value}
                  {c.unit && (
                    <span className="ml-2 font-mono text-[13px] font-normal tracking-[0.1em] text-ink/50">
                      {c.unit}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 装机系统分布(接口未返回 byOs 时整块不渲染) */}
        {osRows.length > 0 && (
          <Reveal delay={160}>
            <figure className="mt-14 border border-line">
              <figcaption className="border-b border-line px-6 py-4 md:px-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
                  {t("st.os.title")}
                </span>
              </figcaption>
              <ul className="flex flex-col gap-4 px-6 py-6 md:px-8 md:py-7">
                {osRows.map((row) => {
                  const pct = osTotal > 0 ? (row.n / osTotal) * 100 : 0;
                  return (
                    <li key={row.key} className="flex items-center gap-4">
                      <span className="w-20 shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink/60">
                        {row.label}
                      </span>
                      <span className="h-2 flex-1 overflow-hidden bg-ink/[0.06]">
                        <span
                          className="block h-full bg-gfp-deep"
                          style={{ width: `${Math.max(pct, 0.75)}%` }}
                        />
                      </span>
                      <span className="w-28 shrink-0 text-right font-mono text-[11px] tabular-nums tracking-[0.08em] text-ink/70">
                        {fmt(row.n)} · {pct.toLocaleString(locale, { maximumFractionDigits: 1 })}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </figure>
          </Reveal>
        )}

        {/* 每周新增装机柱状图 */}
        <Reveal delay={200}>
          <figure className="mt-14 border border-line">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4 md:px-8">
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
                {t("st.chart.title")}
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-ink/40">
                {data ? `${fmtDay(weekly[0]?.w ?? 0)} — ${fmtDay((weekly[weekly.length - 1]?.w ?? 0) + WEEK_MS - 1)}` : ""}
              </span>
            </figcaption>

            {failed ? (
              <div className="flex h-[220px] items-center justify-center px-6 text-[13px] text-ink/60">
                {t("st.error")}
              </div>
            ) : !data ? (
              <div className="flex h-[220px] items-center justify-center" aria-hidden>
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink/15 border-t-gfp-deep" />
              </div>
            ) : (
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H + PAD_BOTTOM}`}
                className="block h-auto w-full"
                role="img"
                aria-label={t("st.chart.caption") as string}
              >
                {/* 基准线 */}
                <line x1="0" y1={CHART_H} x2={CHART_W} y2={CHART_H} stroke="currentColor" strokeWidth="1" className="text-line-strong" />
                {weekly.map((d, i) => {
                  const h = d.n > 0 ? Math.max(3, (CHART_H - 18) * (d.n / maxN)) : 0;
                  return (
                    <g key={d.w}>
                      <title>{`${fmtDay(d.w)} · ${fmt(d.n)}`}</title>
                      {d.n > 0 && (
                        <rect
                          x={i * BAR_SLOT + (BAR_SLOT - BAR_W) / 2}
                          y={CHART_H - h}
                          width={BAR_W}
                          height={h}
                          fill="currentColor"
                          className="text-gfp-deep"
                        >
                          <animate attributeName="height" from="0" to={h} dur="0.5s" fill="freeze" />
                          <animate attributeName="y" from={CHART_H} to={CHART_H - h} dur="0.5s" fill="freeze" />
                        </rect>
                      )}
                      <text
                        x={i * BAR_SLOT + BAR_SLOT / 2}
                        y={CHART_H + 17}
                        textAnchor="middle"
                        className="fill-ink/40"
                        fontSize="9.5"
                        fontFamily="ui-monospace, monospace"
                        letterSpacing="0.08em"
                      >
                        {i % 4 === 0 ? fmtDay(d.w) : ""}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
            <p className="border-t border-line px-6 py-3 font-mono text-[10px] tracking-[0.14em] text-ink/45 md:px-8">
              {t("st.chart.caption")}
            </p>
          </figure>
        </Reveal>

        {/* 口径说明 + 更新时间 + CTA */}
        <Reveal delay={260}>
          <div className="mt-12 flex flex-col gap-6 border-l-2 border-gfp-deep bg-ink/[0.03] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[13px] leading-7 text-ink/70">{t("st.note")}</p>
              {data && (
                <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-ink/45">
                  {t("st.updated")} · {fmtUpdated(data.updatedAt)}
                </p>
              )}
            </div>
            <a
              href="./index.html#download"
              className="group inline-flex shrink-0 items-center gap-3 bg-ink px-6 py-3.5 font-mono text-[13px] tracking-[0.12em] text-paper transition-colors hover:bg-gfp-deep"
            >
              {t("st.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
