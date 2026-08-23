import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Reveal,
  SectionHead,
  ArrowRight,
  WindowsIcon,
  AppleIcon,
  LinuxIcon,
  AndroidIcon,
  HarmonyIcon,
} from "./shared";
import { useLang } from "../i18n";
import {
  PLATFORMS,
  RELEASES_URL,
  GITEE_RELEASES_URL,
  type PlatformId,
} from "../download-data";

type CardId = PlatformId | "harmony";

const ICONS: Record<CardId, (p: { className?: string }) => React.JSX.Element> = {
  windows: WindowsIcon,
  mac: AppleIcon,
  "linux-x64": LinuxIcon,
  "linux-arm64": LinuxIcon,
  android: AndroidIcon,
  harmony: HarmonyIcon,
};

function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      /* 剪贴板不可用时静默 */
    }
  };
  return { copied, copy };
}

function CopyCmd({ label, cmd, note }: { label: string; cmd: string; note?: string }) {
  const { t } = useLang();
  const { copied, copy } = useCopy();
  return (
    <div className="border border-lined bg-ink-deep">
      <div className="flex items-center justify-between border-b border-lined px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-paper/50">{label}</span>
        <button
          onClick={() => copy(cmd)}
          className="font-mono text-[10px] tracking-[0.2em] text-gfp transition-colors hover:text-paper"
        >
          {copied ? t("dl.copied") : t("dl.copy")}
        </button>
      </div>
      <div className="px-4 py-4">
        <code className="block overflow-x-auto whitespace-nowrap font-mono text-[13.5px] text-paper">
          {cmd}
        </code>
        {note && <p className="mt-3 text-[12px] leading-6 text-paper/50">{note}</p>}
      </div>
    </div>
  );
}

/* 命令行安装方式互斥切换 */
function CmdTabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string; recommended?: boolean }[];
  value: string;
  onChange: (id: string) => void;
}) {
  const { t } = useLang();
  return (
    <div className="flex divide-x divide-lined border border-lined">
      {tabs.map((tb) => {
        const on = tb.id === value;
        return (
          <button
            key={tb.id}
            type="button"
            onClick={() => onChange(tb.id)}
            aria-pressed={on}
            className={`flex flex-1 items-center justify-center gap-2.5 px-4 py-3 font-mono text-[11.5px] tracking-[0.14em] transition-colors ${
              on
                ? "bg-gfp font-bold text-on-gfp"
                : "text-paper/60 hover:bg-ink-2 hover:text-paper"
            }`}
          >
            {tb.label}
            {tb.recommended && (
              <span
                className={`border px-1.5 py-0.5 text-[9px] tracking-[0.18em] ${
                  on ? "border-ink/40" : "border-gfp/50 text-gfp"
                }`}
              >
                {t("dl.cmd.recommendedTag")}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* “或者使用 xx 方式”分隔提示 */
function OrDivider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <span className="h-px flex-1 bg-lined" aria-hidden />
      <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-paper/45">
        {children}
      </span>
      <span className="h-px flex-1 bg-lined" aria-hidden />
    </div>
  );
}

/* AI 辅助安装提示词（macOS 未签名包） */
function AiPromptBox() {
  const { t } = useLang();
  const { copied, copy } = useCopy(2000);
  const prompt = t("dl.ai.prompt") as string;
  return (
    <div className="border border-lined">
      <div className="flex items-center justify-between border-b border-lined px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-paper/50">
          {t("dl.ai.title")}
        </span>
        <button
          onClick={() => copy(prompt)}
          className="font-mono text-[10px] tracking-[0.2em] text-gfp transition-colors hover:text-paper"
        >
          {copied ? t("dl.copied") : t("dl.copy")}
        </button>
      </div>
      <div className="px-4 py-4">
        <p className="text-[12.5px] leading-6 text-paper/60">{t("dl.ai.desc")}</p>
        <pre className="mt-3 max-h-36 overflow-y-auto whitespace-pre-wrap border border-lined bg-[#152b0e] p-3 font-mono text-[11.5px] leading-6 text-paper/70">
          {prompt}
        </pre>
      </div>
    </div>
  );
}

type FileEntry = (typeof PLATFORMS)[number]["files"][number];

/* 初始平台按 UA 预选；iPhone/iPad（iPadOS 伪装成 Macintosh）暂无安装包，回退 Windows */
function detectPlatform(): CardId {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "windows";
  if (/Mac/i.test(ua)) return (navigator.maxTouchPoints ?? 0) > 1 ? "windows" : "mac";
  if (/Linux/i.test(ua)) return /aarch64|arm64/i.test(ua) ? "linux-arm64" : "linux-x64";
  return "windows";
}

/* 安装包列表：每行 = 文件名 + 大小 + 三个下载源 */
function FileBox({ files }: { files: FileEntry[] }) {
  const { t } = useLang();
  return (
    <div className="border border-lined">
      <div className="flex items-center justify-between border-b border-lined px-5 py-3">
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-paper/50">
          {t("dl.filesTitle")}
        </span>
        <span className="hidden gap-5 font-mono text-[10px] tracking-[0.18em] text-paper/40 sm:flex">
          <span>{t("dl.source.direct")}</span>
          <span>
            {t("dl.source.gitee")} · {t("dl.giteeBadge")}
          </span>
          <span>{t("dl.source.github")}</span>
        </span>
      </div>
      <ul className="divide-y divide-lined">
        {files.map((f) => (
          <li
            key={f.name}
            className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[13px] text-paper">{f.name}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-paper/45">
                {f.size}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 font-mono text-[11px] tracking-[0.1em]">
              <a
                href={f.sources.direct}
                download
                className="border border-gfp/60 px-3.5 py-2 text-gfp transition-colors hover:bg-gfp hover:text-on-gfp"
              >
                {t("dl.source.direct")}
              </a>
              <a
                href={f.sources.gitee}
                className="border border-lined px-3.5 py-2 text-paper/80 transition-colors hover:border-gfp hover:text-gfp"
              >
                {t("dl.source.gitee")}
                <span className="ml-2 text-[9px] text-gfp/80">{t("dl.giteeBadge")}</span>
              </a>
              <a
                href={f.sources.github}
                className="border border-lined px-3.5 py-2 text-paper/80 transition-colors hover:border-gfp hover:text-gfp"
              >
                {t("dl.source.github")}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* index：章节编号，主页为 06，子页复用时传自己的编号 */
export default function Download({ index = "06" }: { index?: string }) {
  const { t } = useLang();
  const [selected, setSelected] = useState<CardId>(detectPlatform);
  const [linuxCmd, setLinuxCmd] = useState<"script" | "npm">("script");
  const stripRef = useRef<HTMLUListElement>(null);

  /* 选中平台变化（含 UA 预选）时，手机端横滑条自动把选中卡滚到可视区中央 */
  useEffect(() => {
    const ul = stripRef.current;
    const li = ul?.querySelector<HTMLLIElement>(`li[data-card="${selected}"]`);
    if (!ul || !li) return;
    const left = li.offsetLeft;
    const right = left + li.offsetWidth;
    const viewLeft = ul.scrollLeft;
    const viewRight = viewLeft + ul.clientWidth;
    if (left >= viewLeft && right <= viewRight) return;
    ul.scrollTo({
      left: left - (ul.clientWidth - li.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [selected]);

  const platformCards: { id: CardId; name: string; note: string; soon?: boolean }[] = [
    { id: "windows", name: "Windows", note: t("dl.note.desktop") as string },
    { id: "mac", name: "macOS", note: t("dl.note.desktop") as string },
    { id: "linux-x64", name: "Linux", note: t("dl.note.linuxX64") as string },
    { id: "linux-arm64", name: "Linux", note: t("dl.note.linuxArm64") as string },
    { id: "android", name: "Android", note: t("dl.note.mobile") as string },
    { id: "harmony", name: "HarmonyOS", note: t("dl.note.soon") as string, soon: true },
  ];

  const active = PLATFORMS.find((p) => p.id === selected);
  const isMac = selected === "mac";
  const isLinux = selected === "linux-x64" || selected === "linux-arm64";

  return (
    <section id="download" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionHead index={index} eyebrow={t("dl.eyebrow") as string} dark title={t("dl.title")}>
          {t("dl.lead")}
        </SectionHead>

        {/* 平台格：手机端单行横向滑动，避免图标占满首屏；sm+ 恢复网格（Linux 分 x86_64 / ARM64） */}
        <Reveal>
          <ul ref={stripRef} className="flex gap-px overflow-x-auto border border-lined bg-lined sm:grid sm:grid-cols-3 lg:grid-cols-6">
            {platformCards.map((p) => {
              const Icon = ICONS[p.id];
              const on = selected === p.id;
              return (
                <li key={p.id} data-card={p.id} className="w-[44%] shrink-0 bg-ink sm:w-auto sm:shrink">
                  <button
                    type="button"
                    disabled={p.soon}
                    onClick={() => setSelected(p.id)}
                    className={`group flex h-full w-full flex-col px-5 py-6 text-left transition-colors ${
                      on ? "bg-ink-2" : p.soon ? "cursor-default opacity-60" : "hover:bg-ink-2"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors ${
                        on ? "text-gfp" : "text-paper/70 group-hover:text-gfp"
                      }`}
                    />
                    <p className="mt-4 font-display text-[19px] font-bold tracking-tight">{p.name}</p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-paper/45">
                      {p.note}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* 选中平台的安装方式 */}
        {active && (
          <Reveal delay={120}>
            <div className="mt-8 space-y-4">
              {/* 命令行安装：仅 macOS / Linux，多方式互斥切换 */}
              {(isMac || isLinux) && (
                <>
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-paper/50">
                    {t(isMac ? "dl.cmdTitle.recommended" : "dl.cmdTitle.plain")}
                  </p>
                  {isMac ? (
                    <>
                      <CopyCmd
                        label={t("dl.cmd.scriptLabelMac") as string}
                        cmd="curl -fsSL https://genepad.cn/release/install.sh | bash"
                        note={t("dl.cmd.note") as string}
                      />
                      <OrDivider>{t("dl.or.mac")}</OrDivider>
                      <CopyCmd
                        label={t("dl.cmd.brewLabel") as string}
                        cmd="brew install genepad/tap/genepad"
                        note={t("dl.cmd.note") as string}
                      />
                      <CopyCmd
                        label={t("dl.cmd.npmLabelMac") as string}
                        cmd="npm i -g @genepad/app"
                        note={t("dl.cmd.note") as string}
                      />
                    </>
                  ) : (
                    <>
                      <CmdTabs
                        tabs={[
                          { id: "script", label: t("dl.cmdTab.script") as string, recommended: true },
                          { id: "npm", label: t("dl.cmdTab.npm") as string },
                        ]}
                        value={linuxCmd}
                        onChange={(id) => setLinuxCmd(id as "script" | "npm")}
                      />
                      {linuxCmd === "script" ? (
                        <CopyCmd
                          label={t("dl.cmd.scriptLabel") as string}
                          cmd="curl -fsSL https://genepad.cn/release/install.sh | bash"
                          note={t("dl.cmd.note") as string}
                        />
                      ) : (
                        <CopyCmd
                          label={t("dl.cmd.npmLabel") as string}
                          cmd="npm i -g @genepad/app"
                          note={t("dl.cmd.note") as string}
                        />
                      )}
                      <OrDivider>{t("dl.or.linux")}</OrDivider>
                    </>
                  )}
                </>
              )}

              {/* macOS：AI 辅助安装提示词 */}
              {isMac && <AiPromptBox />}

              {/* 安装包直链：macOS 折叠并提示未签名 */}
              {isMac ? (
                <details className="group border border-lined">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 transition-colors hover:bg-ink-2 [&::-webkit-details-marker]:hidden">
                    <span className="inline-block text-gfp transition-transform group-open:rotate-90">
                      ▸
                    </span>
                    <span className="text-[14px] font-bold">{t("dl.mac.other")}</span>
                  </summary>
                  <div className="border-t border-lined px-5 py-4">
                    <p className="border-l-2 border-amber-400/70 bg-amber-400/[0.06] px-4 py-3 text-[12.5px] leading-6 text-amber-200/90">
                      {t("dl.mac.unsigned")}
                    </p>
                    <div className="mt-4">
                      <FileBox files={active.files} />
                    </div>
                  </div>
                </details>
              ) : (
                <FileBox files={active.files} />
              )}

              {active.sparkStore && (
                <p className="border border-lined px-5 py-3 text-[12px] leading-6 text-paper/50">
                  <a
                    href="https://www.spark-app.store/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gfp hover:underline"
                  >
                    {t("dl.spark")}
                  </a>
                  {" — "}
                  {t("dl.sparkNote")}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* 全部版本 */}
          <Reveal delay={120}>
            <div className="space-y-3">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-lined px-5 py-4 transition-colors hover:border-gfp"
              >
                <span className="block text-[15px] font-bold">{t("dl.releases")}</span>
                <ArrowRight className="h-4 w-4 text-gfp transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={GITEE_RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-lined px-5 py-4 transition-colors hover:border-gfp"
              >
                <span className="block text-[15px] font-bold">{t("dl.releasesGitee")}</span>
                <ArrowRight className="h-4 w-4 text-gfp transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* 授权 */}
          <Reveal delay={220}>
            <div className="border-l-2 border-gfp bg-paper/[0.04] px-5 py-4">
              <p className="font-mono text-[10px] tracking-[0.22em] text-gfp">{t("dl.licenseTag")}</p>
              <p className="mt-2.5 text-[13px] leading-7 text-paper/70">{t("dl.license")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
