# AGENTS.md - GenePad Website

## Project Overview

This repository is the static website and Cloudflare Pages deployment source for GenePad / Gene Editor downloads and support pages.
The public site is served from `docs/` through `wrangler.jsonc` / Cloudflare Pages.

## Project Structure

The site is a React + Vite app; its **build output is committed to `docs/`**.

```
app/                         # Website source (React 19 + Vite + Tailwind, TypeScript)
  index.html                 # Home page entry (SEO meta lives here)
  tech-support.html          # Tech-support page entry (multi-page build)
  en/                        # English mirror shells (en.genepad.cn) — see "English mirror" below
  src/
    i18n.tsx                 # zh/en dictionary + LangProvider + useLang() — ALL site copy lives here
    download-data.ts         # VERSION + per-platform installer files & sizes (edit on every release)
    links.ts                 # Cross-host link helpers (isEnHost / otherLangHref / rootHref)
    sections/                # Nav / Hero / Workbench / DayNight / Sanger / Toolbox / Download / Footer
    pages/                   # Home.tsx, TechSupport.tsx
  public/shots/              # Screenshots (webp, converted from docs/screenshot/)
  vite.config.ts             # build.outDir = ../docs, emptyOutDir: false, zh + en html inputs
docs/                        # SERVED ROOT — do not hand-edit index.html / tech-support.html / assets/ / shots/
  index.html                 # BUILD OUTPUT (overwritten by `npm run build`)
  tech-support.html          # BUILD OUTPUT
  en/                        # BUILD OUTPUT (English mirror pages, served at en.genepad.cn)
  assets/                    # BUILD OUTPUT (hashed js/css; safe to delete before rebuild)
  shots/                     # BUILD OUTPUT (copied from app/public/)
  styles.css                 # Hand-maintained: styles for the legacy tech-*.html / changelog pages
  changelog.html             # Hand-maintained changelog page
  tech-gen-format.html etc.  # Hand-maintained developer doc pages (legacy style)
  update.json                # App update metadata consumed by Gene Editor
  release/                   # Installer downloads (windows/linux/android/mac)
  screenshot/                # Original PNG screenshots (source material for app/public/shots/)
wrangler.jsonc               # Cloudflare Pages configuration (serves docs/)
```

## Sitemap (`docs/sitemap.xml`)

`docs/sitemap.xml` is hand-maintained (no build step) and referenced by
`docs/robots.txt`. It must cover **every** public HTML page in `docs/` — both
build output (`index` / `tech-support` / `projects` / `library` / `ngs` /
`stats`) and hand-maintained pages (`changelog`, `tech-*.html`). **Whenever a
page is added, removed, renamed, or its content changes, update the sitemap in
the same change**: add/remove its `<url>` block and refresh `<lastmod`
(`YYYY-MM-DD`) for any page whose content changed. Keep entries in site nav
order. `priority` conventions: home 1.0; main nav pages (library/ngs/
tech-support) 0.8; secondary pages (projects, tech-*) 0.7; utility pages
(changelog/stats) 0.6.

Exception: the English mirror pages (`docs/en/*.html`, served at
`en.genepad.cn`) are **not** listed here — a sitemap must not mix hosts, so the
English URLs are discovered via the `hreflang` alternates in each page's
`<head>` instead.

## Telemetry API (`/api/telemetry`)

`docs/_worker.js` is a Pages advanced-mode Worker committed in the build output: it serves
`/api/telemetry` (anonymous usage stats POSTed by the Gene Editor app every 7 days, D1-backed)
and falls back to `env.ASSETS.fetch()` for every other path, so static serving is unchanged.
Requirements (dashboard, one-time): create a D1 database, run the CREATE TABLE SQL embedded
at the top of `_worker.js`, and bind it to the Pages project as variable **`DB`**.
No build tooling touches this file — edit it directly and push.

The payload carries a coarse `os` field (`windows`/`linux`/`macos`/`android`/`other`,
whitelist-validated server-side; old clients omit it, in which case the stored value is kept
via `COALESCE`). Existing databases must run
`ALTER TABLE usage_reports ADD COLUMN os TEXT;` in the D1 console **before** deploying a
`_worker.js` that writes `os` — otherwise the UPSERT fails with 500 (clients simply retry,
no data loss). Legacy rows with NULL `os` are derived from the `platform` prefix at query
time; no backfill is needed.

It also exposes `GET /api/telemetry/stats` — aggregate-only counters (installs, active 7d/30d,
total hours, `byOs` OS distribution, 26-week install histogram) consumed by the public
`stats.html` subpage; no per-uuid rows are ever exposed. Dashboard binding changes take
effect only after a redeploy (push an empty commit if needed).

## Stats Subpage (`stats.html`)

`app/stats.html` + `app/src/stats-main.tsx` + `app/src/pages/Stats.tsx` render the public
live-stats page (big-number cards + OS distribution bars + weekly install bar chart, pure
SVG/divs, no chart library). Data is fetched client-side from
`https://genepad.pages.dev/api/telemetry/stats` (absolute URL so genepad.cn / GitHub Pages
mirrors work; CORS handled by `_worker.js`). Copy lives in `app/src/i18n.tsx` under `st.*`
and `nav.stats` (zh + en). Remember: `docs/stats.html` is build output — never hand-edit.

## Build & Deploy

```bash
cd app
npm install        # first time only
npm run build      # tsc + vite build → writes into ../docs
```

Then commit `docs/` and push — both hosts serve `docs/` as-is, no CI build step:

- **Cloudflare Pages**: serves `docs/` per `wrangler.jsonc` (`assets.directory`). No build command needed.
- **GitHub Pages**: repo `GenePad/GenePad.github.io` serves from the `docs/` folder on `main`.

The build uses relative asset paths (`base: './'`), so it works from any mount point.
`docs/assets/` accumulates stale hashed files across builds (`emptyOutDir: false`
protects `release/` etc.) — it is safe to `rm -rf docs/assets` before a build.

## i18n

The site is bilingual (zh/en). All copy lives in `app/src/i18n.tsx`; components
call `t("key")` from `useLang()`. On **genepad.cn** the language is chosen at
runtime (localStorage `genepad-lang`, falling back to the browser language) and
the Nav toggle swaps copy in place — this UX is deliberately unchanged. The only
exception: `en.genepad.cn` (and local dev `/en/` paths) render English and never
read localStorage/navigator. When adding UI text, add BOTH `zh` and `en` entries.

## English Mirror (`en.genepad.cn`)

`en.genepad.cn` is a crawler-facing pure-English mirror of the five bilingual
pages (+ stats), so search engines can index English without changing anything
about how genepad.cn behaves for users:

- **Shells**: `app/en/*.html` are static English HTML shells (en `<title>` /
  description / boot skeleton / JSON-LD, `<html lang="en">`) built to
  `docs/en/` via the `en-*` inputs in `app/vite.config.ts`. They share the same
  `/src` modules as the zh pages.
- **Routing**: `docs/_worker.js` maps `en.genepad.cn/<path>` to the asset
  `/en<path>` (pure helper `route()`, unit-testable via node). Shared prefixes
  (`/assets/` `/shots/` `/release/` `/api/` `/update.json` `/icon.*`
  `/robots.txt` `/sitemap.xml`) are never prefixed. `genepad.cn/en/*` 308s to
  `en.genepad.cn/*`; on en hosts `/en/*` 308s to `/*`.
- **Prerequisite (dashboard, one-time)**: Pages project → Custom domains → add
  `en.genepad.cn` (the zone's DNS record is created automatically).
- **Language binding**: `i18n.tsx` `detectLang()` returns `"en"` when the
  hostname is `en.genepad.cn` (or the path starts with `/en/` for local dev);
  elsewhere the localStorage/browser detection runs as before.
- **Cross-host links**: `app/src/links.ts` — `otherLangHref()` (toggle target
  on en hosts), `rootHref(name)` for zh-only pages (changelog, `tech-*.html`;
  must be absolute on en hosts, else the worker prefix-maps them into `/en/`
  and 404s).
- **SEO pairing**: every bilingual page's zh and en shell carry matching
  `hreflang` trios (`zh-CN` → genepad.cn, `en` → en.genepad.cn,
  `x-default` → genepad.cn). Static `<title>`/og on zh pages are Chinese; en
  shells are English. `stats` carries no hreflang (robots-disallowed anyway).
- **When adding/removing a bilingual page**: add/remove BOTH `app/<page>.html`
  and `app/en/<page>.html`, wire both into `vite.config.ts`, add/remove the
  hreflang pair in both heads, and keep `rootHref()` for any zh-only links.
- The GitHub Pages mirror has no worker: `genepad.github.io/en/...` serves the
  en shells directly — harmless, their canonicals point at `en.genepad.cn`.

## Download Panel

`app/src/sections/Download.tsx` renders per-platform installer rows from
`app/src/download-data.ts`, each with three sources:

- **本站直链 (Direct)** — `docs/release/...` served by the site itself
- **Gitee** — `https://gitee.com/GenePad/GenePad.github.io/releases/download/v<VERSION>/<file>`
- **GitHub** — `https://github.com/GenePad/GenePad.github.io/releases/latest/download/<file>`

It also shows, per platform:

- **macOS** — one-click install script first (`curl -fsSL https://genepad.cn/release/install.sh | bash` — same script as Linux, lives at the platform-neutral `docs/release/install.sh`; on macOS it installs via Homebrew, auto-installing Homebrew with a USTC mirror when GitHub is unreachable — any failed step aborts with an error, no fallback), then — under an "Or use one of the options below" divider — `brew install genepad/tap/genepad`, `npm i -g @genepad/app`, a copyable AI-assistant
  install prompt (`dl.ai.prompt` in i18n.tsx, zh/en; the manual fallback
  downloads the versioned `GenePad_<v>_Darwin_arm64.app.tar.gz`), and the
  versioned `GenePad_<v>_Darwin_arm64.dmg` direct link inside a collapsed
  `<details>` with a Gatekeeper "unsigned" warning. Every command box
  carries the same one-liner note (`dl.cmd.note`). 0.7.1 起不再产
  `.app.zip`/`macos-*.zip`(updater 产物 `.app.tar.gz` 与 dmg 同源)。
- **Linux** — single x86_64 card (ARM64 自 0.7.1 停发,仅 deb);Spark Store note.
- **Windows / Android** — direct installer rows only (Windows 为 zip 包裹的 NSIS
  安装器 `GenePad_<v>_Windows_amd64.zip`——内含 setup exe,防浏览器直下裸 exe 被
  拦截,应用内 updater 下载同一 zip 自动解压静默安装;2026-09-09 于 0.7.1 周期内
  从裸 exe 中途切换,更早为裸 exe;Android 为
  `GenePad-v<v>-android-universal-release.apk`).

## Release Checklist

When updating to a new version, all of the following files must be touched:

**Network: all uploads go through the local proxy** `http://127.0.0.1:10801`
(`export http_proxy=http://127.0.0.1:10801 https_proxy=http://127.0.0.1:10801`
before `git push` / `gh` / Gitee `curl`). Gitee also works direct (`--noproxy '*'`)
if the proxy is down.

### 1. Copy new release files from build outputs

Copy the latest built binaries from the Gene Editor source project into `docs/release/`. Look for files in these locations:

| Platform | Source build output directory |
|---|---|
| Windows | `C:\Users\moqiq\PycharmProjects\Gene_Editor-master\src-tauri\target\release\bundle\nsis` |
| Linux | `\\wsl.localhost\Ubuntu-24.04\home\chief\Gene_Editor\src-tauri\target\release\bundle` |
| Android | `C:\Users\moqiq\PycharmProjects\Gene_Editor-master\src-tauri\gen\android\app\build\outputs\apk\universal\release` |

Copy the latest version files to `docs/release/` (naming since the 2026-09-09
zip switch during 0.7.1 — 渠道裁撤
见 app 仓 docs/distribution.md:Windows zip 包裹 NSIS exe、mac dmg+app.tar.gz、
Linux x86_64 deb、Android 版本化 apk;updater `.sig` 一并入库——windows 的
`.zip.sig` 签的是 **zip 本体**而非内部 exe,来自 CI 的 Sign Windows zip 步):
```
docs/release/windows/GenePad_x.x.x_Windows_amd64.zip (+ .zip.sig)
docs/release/linux/GenePad_x.x.x_Linux_amd64.deb     (+ .deb.sig)
docs/release/android/GenePad-vx.x.x-android-universal-release.apk
docs/release/mac/GenePad_x.x.x_Darwin_arm64.dmg
docs/release/mac/GenePad_x.x.x_Darwin_arm64.app.tar.gz (+ .app.tar.gz.sig)
```

**Windows zip 回归(2026-09-09,0.7.1 周期内切换,未另发版)**:人用下载与 updater
直链同为一个 zip(内含 NSIS setup exe)——浏览器直下裸 exe 会被 SmartScreen/下载
拦截,zip 不会;应用内 updater
(tauri-plugin-updater 2.11,0.7.0 起所有客户端内置)下载 zip→minisign 验签→自动
解压临时目录→静默安装,存量客户端无需任何改动。mac 的 `.app.zip`/`macos-*.zip`
伪装扩展名惯例仍废。旧版本 0.6.9 的 rpm/tar.gz/arm64 包与 0.7.1 的裸 exe(+sig)
保留作存档(install.sh 的停发提示指向它们),勿删。

**macOS notes:** the app is unsigned, so browser downloads get flagged by
Gatekeeper — the site steers macOS users to `brew install genepad/tap/genepad`
(recommended) or the one-click script; the versioned dmg / app.tar.gz are the
manual fallback.

**Alternative source: per-platform zip drop folder.** The user may instead hand
over the CI artifact zips in a Downloads Folder (e.g.
`C:\Users\moqiq\Downloads\新建文件夹`): `windows-x64.zip`, `linux-x86_64.zip`,
`macos-arm64.zip`, `android-release.zip` (arm64 Linux 已停发). Extract them and
rename to the convention above:

| Inside the drop zips | Destination in `docs/release/` |
|---|---|
| `GenePad_x.x.x_Windows_amd64.zip` + `.zip.sig` (exe already zipped by CI) | `windows/…amd64.zip` — copy both as-is, no re-zip needed |
| `GenePad_x.x.x_Linux_amd64.deb` (+ `.deb.sig`) | `linux/…` — names already final |
| `apk/universal/release/GenePad-vX.Y.Z-android-universal-release.apk` | `android/…` — versioned name already final, copy as-is |
| `GenePad_x.x.x_Darwin_arm64.dmg` | `mac/…` — copy as-is |
| `GenePad_x.x.x_Darwin_arm64.app.tar.gz` (+ `.app.tar.gz.sig`) | `mac/…` — updater artifact, copy with its sig |

### 2. Delete old release files

Remove the previous version's binaries from `docs/release/`.

**Keep `docs/release/install.sh`** — it is the version-agnostic
one-click install script linked from the download panel for **both Linux and
macOS** (macOS goes through Homebrew with automatic mirror detection; it reads
the latest version from `update.json` at runtime); do not delete it when
clearing old binaries.

### 3. Update `docs/update.json`

- `version` — match the new app package version.
- `pub_date` — today's date in ISO 8601 with timezone (e.g. `2026-06-15T00:00:00+08:00`).
- `notes` — read commit history from `C:\Users\moqiq\PycharmProjects\Gene_Editor-master` since the last release, summarize new features in Chinese. A user-facing condensed version is derived from the developer changelog (keep user-visible items, drop dev-only details like test/build fixes).
- `platforms.*.url` — point to the new version filenames under `https://genepad.pages.dev/release/...`
  (windows 指向 `.zip`——老客户端的浏览器回落下载链路同样防拦截).
- Preserve platform keys: `windows-x86_64`, `linux-x86_64-deb`, `android`.

If the final notes are not ready yet, ship with a placeholder (`# GenePad vX.Y.Z\n\n更新说明整理中，稍后补充。`)
and sync the real notes everywhere later — see step 10.

### 3b. Regenerate `docs/latest.json` (in-app updater manifest)

`docs/latest.json` serves the **in-app updater** of 0.7.0+ clients (0.6.x and
older only read `update.json`). **Never hand-edit it** — the minisign signatures
must be embedded verbatim from the `.sig` files; generate it with the app repo
script AFTER `update.json` is finalized (notes/pub_date are taken from
update.json so the two manifests cannot drift):

```bash
node <app-repo>/scripts/generate-updater-manifest.js \
  --release-dir <GenePad-free>/docs/release \
  --output <GenePad-free>/docs/latest.json \
  --notes-from-json <GenePad-free>/docs/update.json
```

Requires step 1's files in `docs/release/`: windows `GenePad_<v>_Windows_amd64.zip`
(+ `.zip.sig`,zip 内含 NSIS exe——updater 下载 zip 自动解压安装,2026-09-09 起)、
mac `app.tar.gz`(+sig)、linux deb(+sig);android 不进 latest.json。任一产物或
`.sig` 缺失时脚本直接报错退出(勿加 `--allow-missing` 掩盖,那是 CI 的容错口径)。
Full runbook: app 仓 `docs/distribution.md`「内置 updater」.

### 4. Update the download data and rebuild the site

Edit `app/src/download-data.ts`:

- `VERSION` — bump to the new version (it drives all versioned filenames and
  the Gitee tag URL).
- Windows entry — `GenePad_${VERSION}_Windows_amd64.zip` (bare `.exe` until the
  2026-09-09 switch during 0.7.1; bump with VERSION on every release, otherwise
  the panel links 404).
- `size` fields — match actual file sizes (check with `dir` / `ls -l`).
- macOS/Linux entries are versioned and follow `VERSION` automatically; only
  touch if the bundle layout changes.

Then rebuild so `docs/` picks up the change:

```bash
rm -rf docs/assets   # optional: drop stale hashed bundles
cd app && npm run build
```

(`docs/index.html` and `docs/tech-support.html` are build output — never edit
them by hand.)

### 5. Validate

```powershell
Get-Content -Raw docs/update.json | ConvertFrom-Json | Out-Null
```

### 6. Commit, push to GitHub, and create GitHub Release

```bash
git add app docs/update.json docs/index.html docs/tech-support.html docs/projects.html docs/assets docs/shots docs/release/
git commit -m "release: bump to x.x.x"
git push origin main

# Create GitHub Release with all assets (filenames per step 1)
gh release create vx.x.x \
  "docs/release/windows/GenePad_x.x.x_Windows_amd64.zip" \
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.deb" \
  "docs/release/android/GenePad-vx.x.x-android-universal-release.apk" \
  "docs/release/mac/GenePad_x.x.x_Darwin_arm64.dmg" \
  "docs/release/mac/GenePad_x.x.x_Darwin_arm64.app.tar.gz" \
  --title "GenePad vx.x.x" \
  --notes "<same Chinese release notes from update.json>"
```

### 7. Create Gitee Release (git mirror frozen — release assets only)

Gitee repo: `https://gitee.com/GenePad/GenePad.github.io`
Gitee token: stored in opencode skill config

**Do NOT `git push` to Gitee.** The Gitee git mirror exceeded the free-tier
quota (repo size 1301MB > 1024MB; the culprit is release binaries committed
into git history across 0.6.x releases) and its pre-receive hook now rejects
**every** push, including ref deletions — the mirror is frozen at `4228db7`
(2026-09-08). Nobody consumes the Gitee git branch: the download panel's Gitee
source points at **Release attach_files**, which are stored independently of
git and keep working. Per release, only create the release + upload assets via
the API below.

```bash
# Create Gitee Release (capture release ID from response)
# IMPORTANT: put access_token in the QUERY STRING and send the JSON body from a
# UTF-8 file. Inline -d '{"body":"中文…"}' mangles the encoding and Gitee
# answers with an HTML 400 page. Never use --data-urlencode for the token.
printf '%s' '{"tag_name":"vx.x.x","name":"GenePad vx.x.x","body":"<release notes with \n escapes>","target_commitish":"main"}' > /tmp/gitee-body.json
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases?access_token=<gitee_token>" \
  -H "Content-Type: application/json" \
  -d @/tmp/gitee-body.json

# Upload assets to Gitee Release (replace <release_id> from previous response)
# The download panel's Gitee URLs expect tag v<x.x.x> and the exact filenames from step 1.
for f in \
  "docs/release/windows/GenePad_x.x.x_Windows_amd64.zip" \
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.deb" \
  "docs/release/android/GenePad-vx.x.x-android-universal-release.apk" \
  "docs/release/mac/GenePad_x.x.x_Darwin_arm64.dmg" \
  "docs/release/mac/GenePad_x.x.x_Darwin_arm64.app.tar.gz"; do
  curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
    -F "file=@$f"
done
```

Gitee quirks:

- Gitee auto-attaches source archives (`vx.x.x.zip` / `vx.x.x.tar.gz`) built
  from the (frozen) git tag, so the release ends up with 7 assets after
  uploading 5 — that is normal.
- Old releases before v0.7.1 were deleted (2026-09-08) to shed attach storage;
  keep only the current version's release going forward.
- To edit notes later, `PATCH` the release — the request must repeat
  `tag_name` **and** `name` alongside `body`, otherwise 400:

```bash
printf '%s' '{"tag_name":"vx.x.x","name":"GenePad vx.x.x","body":"<new notes>"}' > /tmp/gitee-body.json
curl -s -X PATCH "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>?access_token=<gitee_token>" \
  -H "Content-Type: application/json" -d @/tmp/gitee-body.json
```

### 8. Update the Homebrew tap

Repo `GenePad/homebrew-tap`, file `Casks/genepad.rb`. The cask downloads the
versioned `https://genepad.cn/release/mac/GenePad_<v>_Darwin_arm64.app.tar.gz`
(0.7.1 起从 versionless `macos-app.zip` 改指版本化 .app.tar.gz——与应用内
updater / 官网一键脚本的 SKIP 下载共用同一份文件同一哈希;一键脚本 mac 安装
仍强制走 Homebrew:应用未签名/未公证,curl 或浏览器下载的 app 会被 Gatekeeper
拦成「已损坏」,brew cask 安装自动处理隔离属性), so on every
release bump `version` and `sha256` (= `sha256sum` of the .app.tar.gz):

```bash
gh repo clone GenePad/homebrew-tap /tmp/homebrew-tap
cd /tmp/homebrew-tap
# edit Casks/genepad.rb: version "x.x.x" + new sha256
git commit -am "genepad x.x.x" && git push origin main
```

**Only push after Cloudflare Pages has deployed the new `.app.tar.gz`** —
verify the live file first, otherwise `brew` users hit a sha mismatch:

```bash
curl -sL -x http://127.0.0.1:10801 -o /tmp/deployed.tgz "https://genepad.cn/release/mac/GenePad_<v>_Darwin_arm64.app.tar.gz"
sha256sum /tmp/deployed.tgz   # must equal the sha written into the cask
```

### 9. Update the changelog page

`docs/changelog.html` is hand-maintained (no rebuild). Two edits:

- TOC (`<aside class="doc-toc">`): add the new version at the top and move
  `class="current"` onto it.
- New `<section class="doc-section" id="v0-6-x">` before the previous newest,
  following the existing blocks: eyebrow date (`YYYY-MM-DD`), intro paragraph,
  `## ✨ 新功能` grouped `<li><strong>…</strong>` lists, `## 🐛 缺陷修复`,
  optional `📦 分发` / `🔧 维护`, and the `完整变更` compare link.

**Do not skip this step** — v0.6.4 shipped without a changelog entry and had to
be backfilled at v0.6.5. After pushing, verify `https://genepad.cn/changelog`
(note: it 308-redirects to `/changelog`, use `curl -sL`).

### 10. Sync finalized release notes in three places

When notes start as a placeholder (or get rewritten later), the final text must
land in all three spots:

1. `docs/update.json` → `notes` — edit + commit + push GitHub only (the Gitee
   git mirror is frozen, see step 7); no rebuild needed. Easiest via a small node script that reads the
   markdown file and `JSON.stringify`s it back, avoiding manual `\n` escaping.
2. GitHub Release — `gh release edit vx.x.x --repo GenePad/GenePad.github.io --notes-file <file>`
3. Gitee Release — the `PATCH` call from step 7.

## Update Metadata

`docs/update.json` is the stable update manifest fetched by the Gene Editor app from:

```text
https://genepad.pages.dev/update.json
```

The app checks this manifest in the background once per week. Keep the metadata small and valid JSON.
`docs/latest.json` is a **separate** manifest consumed only by the in-app updater
of 0.7.0+ clients — regenerate it with the app repo script (step 3b), never
hand-edit; its `version` must match `update.json`. Since the 2026-09-09 switch
(during 0.7.1) the windows entry of both manifests points at
`GenePad_<v>_Windows_amd64.zip`.

Required shape:

```json
{
  "version": "0.7.1",
  "pub_date": "2026-09-08T21:39:02.030+08:00",
  "notes": "Release notes shown in the app update dialog",
  "platforms": {
    "windows-x86_64": { "url": "https://genepad.pages.dev/release/windows/GenePad_0.7.1_Windows_amd64.zip" },
    "linux-x86_64-deb": { "url": "https://genepad.pages.dev/release/linux/GenePad_0.7.1_Linux_amd64.deb" },
    "android": { "url": "https://genepad.pages.dev/release/android/GenePad-v0.7.1-android-universal-release.apk" }
  }
}
```

## Validation

After editing `docs/update.json`, validate locally:

```powershell
Get-Content -Raw docs/update.json | ConvertFrom-Json | Out-Null
```

After Cloudflare Pages deployment, verify the public endpoint returns HTTP 200 and valid JSON:

```bash
curl -s https://genepad.pages.dev/update.json
```

Do not commit generated cache files or unrelated local changes with update metadata changes.
