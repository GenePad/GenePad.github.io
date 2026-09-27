import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLang } from "./i18n";

/* ── 用户反馈：页脚/Hero 入口 → 全屏弹窗表单 → POST /api/feedback ──
   文本（必填）+ 可选联系方式，Cloudflare Turnstile 人机验证；
   留言公开陈列在 /feedback 留言墙（GET /api/feedback/list，见 pages/Feedback.tsx，
   主页卡片轮播见 sections/FeedbackSection.tsx）。
   <FeedbackModal/> 挂在 Footer（每页都有）；其他位置（Hero、TechSupport 反馈框、
   留言墙页）调 openFeedback() 触发 —— 模块级 CustomEvent，不引入全局 Provider。
   管理（删除/隐藏留言）见 AGENTS.md「Feedback API」。
   【图片上传已下线（2026-09-27，纯文字版）】：选图/粘贴/压缩 UI 已移除，
   恢复时前端按 git 历史（本文件 @ 170a04d）取回，后端 R2 代码以 IMAGE-REENABLE
   标记注释保留在 docs/_worker.js；i18n 图片词条（fb.images 等 6 键）仍保留。 */

const FB_OPEN_EVENT = "genepad:feedback-open";
const MAX_TEXT = 5000;
const MAX_CONTACT = 200;

/* Turnstile 站点密钥(公开值,随页面分发即可)。对应 Turnstile 控制台的
   Managed widget,secret 存在 Pages 的 TURNSTILE_SECRET_KEY,绝不下前端;
   widget 域名须覆盖 genepad.cn、*.genepad.cn、genepad.pages.dev、
   genepad.github.io、localhost(见 AGENTS.md「Feedback API」)。 */
const TURNSTILE_SITEKEY = "0x4AAAAAAFE5EI70ze4K5yUN";

export function openFeedback() {
  window.dispatchEvent(new CustomEvent(FB_OPEN_EVENT));
}

/* API 地址：八个 CF 托管主机（genepad.cn + 七镜像 + pages.dev）同源直达；
   GitHub Pages 镜像没有 worker，跨域回落 pages.dev（CORS 由 _worker.js 放开） */
export function feedbackApiUrl(path: string): string {
  if (typeof window !== "undefined" && window.location.hostname.endsWith(".github.io")) {
    return `https://genepad.pages.dev${path}`;
  }
  return path;
}

/* ── Turnstile 懒加载 + 显式渲染 ── */

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstilePromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstilePromise) return turnstilePromise;
  turnstilePromise = new Promise<TurnstileApi>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("timeout")), 12000);
    const done = () => {
      window.clearTimeout(timer);
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("missing api"));
    };
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.addEventListener("load", done);
    script.addEventListener("error", () => {
      window.clearTimeout(timer);
      reject(new Error("script error"));
    });
    document.head.appendChild(script);
  });
  // 失败后清空缓存，下次打开弹窗可重试加载
  turnstilePromise.catch(() => {
    turnstilePromise = null;
  });
  return turnstilePromise;
}

export function FeedbackModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [contact, setContact] = useState("");
  const [phase, setPhase] = useState<"form" | "sending" | "success">("form");
  const [notice, setNotice] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const widgetId = useRef<string | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setPhase("form");
    setNotice(null);
    if (widgetId.current !== null) {
      window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    }
    setToken("");
    setCaptchaFailed(false);
    setCaptchaReady(false);
  }, []);

  /* openFeedback() 事件总线 */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(FB_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(FB_OPEN_EVENT, onOpen);
  }, []);

  /* 打开时加载/渲染 Turnstile */
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !boxRef.current) return;
        widgetId.current = api.render(boxRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          callback: (tok) => setToken(tok),
          "expired-callback": () => setToken(""),
          "error-callback": () => setCaptchaFailed(true),
        });
        setCaptchaReady(true);
      })
      .catch(() => {
        if (!cancelled) setCaptchaFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  /* Esc 关闭 + 打开时锁定页面滚动（同 lightbox） */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const submit = async () => {
    if (phase === "sending") return;
    setNotice(null);
    if (!text.trim()) return;
    setPhase("sending");
    const fd = new FormData();
    fd.set("text", text.trim().slice(0, MAX_TEXT));
    if (contact.trim()) fd.set("contact", contact.trim().slice(0, MAX_CONTACT));
    fd.set("page", window.location.href);
    fd.set("turnstile", token);
    try {
      const res = await fetch(feedbackApiUrl("/api/feedback"), { method: "POST", body: fd });
      if (res.status === 204) {
        // 提交成功：清空草稿，下次打开是干净表单
        setText("");
        setContact("");
        setPhase("success");
        return;
      }
      // 令牌失效/被风控时重置验证码让人重过一次；其余按通用失败处理
      if (res.status === 403 || res.status === 429) {
        setToken("");
        if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
      }
      setPhase("form");
      setNotice(t("fb.error") as string);
    } catch {
      setPhase("form");
      setNotice(t("fb.error") as string);
    }
  };

  if (!open) return null;

  const labelCls = "font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50";
  const inputCls =
    "mt-2 w-full border border-line bg-paper-2 px-3.5 py-2.5 text-[13.5px] leading-6 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gfp-deep";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/95 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={t("fb.title") as string}
    >
      <div className="flex min-h-full items-start justify-center p-4 md:items-center md:p-8">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl border border-lined bg-paper text-ink shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          {/* 顶栏 */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/55">
              {t("fb.title")}
            </p>
            <button
              onClick={close}
              aria-label={t("fb.close") as string}
              className="flex h-9 w-9 items-center justify-center border border-line font-mono text-ink/60 transition-colors hover:border-gfp-deep hover:text-gfp-deep"
            >
              ✕
            </button>
          </div>

          {phase === "success" ? (
            <div className="px-5 py-12 text-center md:px-6">
              <p className="font-mono text-[26px] text-gfp-deep">✓</p>
              <p className="mt-4 text-[14px] leading-7 text-ink/80">{t("fb.success")}</p>
              <button
                onClick={close}
                className="mt-8 bg-ink px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-paper transition-colors hover:bg-gfp-deep"
              >
                {t("fb.close")}
              </button>
            </div>
          ) : (
            <div className="px-5 py-5 md:px-6">
              <p className="text-[12.5px] leading-6 text-ink/60">{t("fb.intro")}</p>

              <div className="mt-5">
                <label htmlFor="fb-text" className={labelCls}>
                  {t("fb.text")}
                </label>
                <textarea
                  id="fb-text"
                  value={text}
                  maxLength={MAX_TEXT}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t("fb.textPh") as string}
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="fb-contact" className={labelCls}>
                  {t("fb.contact")}
                </label>
                <input
                  id="fb-contact"
                  value={contact}
                  maxLength={MAX_CONTACT}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t("fb.contactPh") as string}
                  className={inputCls}
                />
              </div>

              {/* Turnstile 容器：显式渲染 */}
              <div className="mt-5">
                <div ref={boxRef} />
                {captchaFailed && (
                  <p className="mt-2 text-[12px] leading-6 text-red-600 dark:text-red-400">
                    {t("fb.captchaError")}
                  </p>
                )}
              </div>

              {notice && (
                <p className="mt-4 border-l-2 border-gfp-deep bg-ink/[0.04] px-4 py-2.5 text-[12.5px] leading-6 text-ink/75">
                  {notice}
                </p>
              )}

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-[11px] leading-5 text-ink/40">
                  {text.trim().length}/{MAX_TEXT}
                </p>
                <button
                  onClick={submit}
                  disabled={!text.trim() || !token || !captchaReady || captchaFailed}
                  className="bg-ink px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-paper transition-colors hover:bg-gfp-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {phase === "sending" ? (t("fb.sending") as string) : (t("fb.submit") as string)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
