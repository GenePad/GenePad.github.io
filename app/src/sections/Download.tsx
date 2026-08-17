import { useState, type ReactNode } from "react";
import { Reveal, SectionHead, ArrowRight } from "./shared";
import { useLang } from "../i18n";
import {
  PLATFORMS,
  RELEASES_URL,
  GITEE_RELEASES_URL,
  type PlatformId,
} from "../download-data";

function WindowsIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 5.6 10.6 4.5v7H3V5.6Zm0 12.8 7.6 1.1v-7H3v5.9Zm8.6-14.9v8.2H21V3.1l-9.4.2Zm0 9.4v8.2L21 21v-8.4l-9.4.2Z" />
    </svg>
  );
}
function AppleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.5.96 1.39 2.1 2.94 3.6 2.88 1.45-.06 2-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.55-1.41 3.5-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.03-1.16-3.07-4.6ZM14.16 4.06c.8-.97 1.34-2.31 1.19-3.65-1.15.05-2.54.77-3.37 1.73-.74.86-1.39 2.23-1.22 3.55 1.28.1 2.6-.65 3.4-1.63Z" />
    </svg>
  );
}
function LinuxIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
    </svg>
  );
}
function AndroidIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.3 9.5c.5 0 .9.4.9.9v5.2c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-5.2c0-.5.4-.9.9-.9ZM17.7 9.5c.5 0 .9.4.9.9v5.2c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-5.2c0-.5.4-.9.9-.9ZM7.6 9.5v7.3c0 .5.4.9.9.9h1v2.6c0 .5.4.9.9.9s.9-.4.9-.9v-2.6h1.4v2.6c0 .5.4.9.9.9s.9-.4.9-.9v-2.6h1c.5 0 .9-.4.9-.9V9.5H7.6Zm8.7-2.4.9-1.5c.1-.2 0-.5-.2-.6s-.5 0-.6.2l-.9 1.6c-1-.5-2.2-.8-3.5-.8s-2.5.3-3.5.8l-.9-1.6c-.1-.2-.4-.3-.6-.2s-.3.4-.2.6l.9 1.5C6.6 8 6 9.1 6 10.3v.2h12v-.2c0-1.2-.6-2.3-1.7-3.2Zm-6.8 2c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Zm5 0c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6Z" />
    </svg>
  );
}
function HarmonyIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
      <text x="12" y="15.5" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif">HM</text>
    </svg>
  );
}

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
    <div className="border border-lined bg-[#152b0e]">
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
          <span className="mr-2 text-gfp">$</span>
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
                ? "bg-gfp font-bold text-ink"
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
                className="border border-gfp/60 px-3.5 py-2 text-gfp transition-colors hover:bg-gfp hover:text-ink"
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

export default function Download() {
  const { t } = useLang();
  const [selected, setSelected] = useState<CardId>(detectPlatform);
  const [macCmd, setMacCmd] = useState<"brew" | "npm">("brew");
  const [linuxCmd, setLinuxCmd] = useState<"script" | "npm">("script");

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
        <SectionHead index="05" eyebrow={t("dl.eyebrow") as string} dark title={t("dl.title")}>
          {t("dl.lead")}
        </SectionHead>

        {/* 平台格：手机端单行横向滑动，避免图标占满首屏；sm+ 恢复网格（Linux 分 x86_64 / ARM64） */}
        <Reveal>
          <ul className="flex gap-px overflow-x-auto border border-lined bg-lined sm:grid sm:grid-cols-3 lg:grid-cols-6">
            {platformCards.map((p) => {
              const Icon = ICONS[p.id];
              const on = selected === p.id;
              return (
                <li key={p.id} className="w-[44%] shrink-0 bg-ink sm:w-auto sm:shrink">
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
                      <CmdTabs
                        tabs={[
                          { id: "brew", label: t("dl.cmdTab.brew") as string, recommended: true },
                          { id: "npm", label: t("dl.cmdTab.npm") as string },
                        ]}
                        value={macCmd}
                        onChange={(id) => setMacCmd(id as "brew" | "npm")}
                      />
                      {macCmd === "brew" ? (
                        <CopyCmd
                          label={t("dl.cmd.brewLabel") as string}
                          cmd="brew install genepad/tap/genepad"
                        />
                      ) : (
                        <CopyCmd
                          label={t("dl.cmd.npmLabel") as string}
                          cmd="npm i -g @genepad/app"
                          note={t("dl.cmd.npmNote") as string}
                        />
                      )}
                      <OrDivider>{t("dl.or.mac")}</OrDivider>
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
                          cmd="curl -fsSL https://genepad.cn/release/linux/install.sh | bash"
                          note={t("dl.cmd.scriptNote") as string}
                        />
                      ) : (
                        <CopyCmd
                          label={t("dl.cmd.npmLabel") as string}
                          cmd="npm i -g @genepad/app"
                          note={t("dl.cmd.npmNote") as string}
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
