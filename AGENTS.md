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
  src/
    i18n.tsx                 # zh/en dictionary + LangProvider + useLang() — ALL site copy lives here
    download-data.ts         # VERSION + per-platform installer files & sizes (edit on every release)
    sections/                # Nav / Hero / Workbench / DayNight / Sanger / Toolbox / Download / Footer
    pages/                   # Home.tsx, TechSupport.tsx
  public/shots/              # Screenshots (webp, converted from docs/screenshot/)
  vite.config.ts             # build.outDir = ../docs, emptyOutDir: false, two html inputs
docs/                        # SERVED ROOT — do not hand-edit index.html / tech-support.html / assets/ / shots/
  index.html                 # BUILD OUTPUT (overwritten by `npm run build`)
  tech-support.html          # BUILD OUTPUT
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
call `t("key")` from `useLang()`. The toggle sits in the Nav; the choice is
persisted to `localStorage` (`genepad-lang`), defaulting to the browser
language. When adding UI text, add BOTH `zh` and `en` entries.

## Download Panel

`app/src/sections/Download.tsx` renders per-platform installer rows from
`app/src/download-data.ts`, each with three sources:

- **本站直链 (Direct)** — `docs/release/...` served by the site itself
- **Gitee** — `https://gitee.com/GenePad/GenePad.github.io/releases/download/v<VERSION>/<file>`
- **GitHub** — `https://github.com/GenePad/GenePad.github.io/releases/latest/download/<file>`

It also shows, per platform:

- **macOS** — command-line install first (`brew install genepad/tap/genepad`
  primary, `npm i -g @genepad/app` secondary), then a copyable AI-assistant
  install prompt (`dl.ai.prompt` in i18n.tsx, zh/en), then the unsigned
  `macos-dmg.zip` / `macos-app.zip` direct links inside a collapsed
  `<details>` with a Gatekeeper "unsigned" warning.
- **Linux** — split into two cards (x86_64 / ARM64); `npm i -g @genepad/app`
  plus the three packages per arch, and a Spark Store note.
- **Windows / Android** — direct installer rows only.

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

Copy the latest version files to `docs/release/` (current naming, e.g. v0.6.2):
```
docs/release/windows/GenePad_x.x.x_Windows_amd64.zip   (zip the NSIS exe to avoid browser security warnings)
docs/release/linux/GenePad_x.x.x_Linux_amd64.deb
docs/release/linux/GenePad_x.x.x_Linux_amd64.rpm
docs/release/linux/GenePad_x.x.x_Linux_amd64.tar.gz
docs/release/linux/GenePad_x.x.x_Linux_arm64.deb
docs/release/linux/GenePad_x.x.x_Linux_arm64.rpm
docs/release/linux/GenePad_x.x.x_Linux_arm64.tar.gz
docs/release/android/app-universal-release.apk   (in-place update, no version in filename)
docs/release/mac/macos-dmg.zip                   (copied manually by user)
docs/release/mac/macos-app.zip                   (copied manually by user)
```

**Important: Windows exe must be compressed to zip** — use `Compress-Archive` to zip the `.exe` into `.zip` before placing in `docs/release/windows/`. This avoids browser security warnings when downloading.

**Important: Do NOT include AppImage files** — skip any `.AppImage` files found in the Linux bundle directory.

**macOS notes:** the app is unsigned, so browser downloads get flagged by
Gatekeeper — the site steers macOS users to `brew install genepad/tap/genepad`
(recommended) or `npm i -g @genepad/app`; `macos-dmg.zip` / `macos-app.zip`
are the manual fallback and are copied by hand, not from CI.

**Alternative source: per-platform zip drop folder.** The user may instead hand
over five zips in a Downloads folder (e.g. `C:\Users\moqiq\Downloads\新建文件夹`):
`windows-x64.zip`, `linux-x86_64.zip`, `linux-arm64.zip`, `macos-arm64.zip`,
`android-release.zip`. Extract them and rename to the convention above:

| Inside the drop zips | Destination in `docs/release/` |
|---|---|
| `GenePad_x.x.x_Windows_amd64.zip` (exe already zipped) | `windows/…amd64.zip` — copy as-is, no re-zip needed |
| `GenePad_x.x.x_Linux_amd64.{deb,rpm,tar.gz}` / `…_arm64.*` | `linux/…` — names already final |
| `apk/universal/release/GenePad-vX.Y.Z-android-universal-release.apk` | `android/app-universal-release.apk` — rename |
| `GenePad_x.x.x_Darwin_arm64.dmg` | `mac/macos-dmg.zip` — raw dmg renamed, do NOT zip again |
| `GenePad_x.x.x_Darwin_arm64.app.zip` | `mac/macos-app.zip` — rename |

Note `macos-dmg.zip` is a raw dmg with a `.zip` extension (that is the existing
convention — browsers flag a bare `.dmg` harder than a `.zip` name).

### 2. Delete old release files

Remove the previous version's binaries from `docs/release/`.

**Keep `docs/release/linux/install.sh`** — it is the version-agnostic
one-click install script linked from the download panel (it reads the latest
version from `update.json` at runtime); do not delete it when clearing old
binaries.

### 3. Update `docs/update.json`

- `version` — match the new app package version.
- `pub_date` — today's date in ISO 8601 with timezone (e.g. `2026-06-15T00:00:00+08:00`).
- `notes` — read commit history from `C:\Users\moqiq\PycharmProjects\Gene_Editor-master` since the last release, summarize new features in Chinese. A user-facing condensed version is derived from the developer changelog (keep user-visible items, drop dev-only details like test/build fixes).
- `platforms.*.url` — point to the new version filenames under `https://genepad.pages.dev/release/...`.
- Preserve platform keys: `windows-x86_64`, `linux-x86_64-deb`, `linux-x86_64-rpm`, `android`.

If the final notes are not ready yet, ship with a placeholder (`# GenePad vX.Y.Z\n\n更新说明整理中，稍后补充。`)
and sync the real notes everywhere later — see step 10.

### 4. Update the download data and rebuild the site

Edit `app/src/download-data.ts`:

- `VERSION` — bump to the new version (it drives all versioned filenames and
  the Gitee tag URL).
- `size` fields — match actual file sizes (check with `dir` / `ls -l`).
- The macOS entries (`macos-dmg.zip`, `macos-app.zip`) are versionless and
  only need touching if the bundle layout changes.

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
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.rpm" \
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.tar.gz" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.deb" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.rpm" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.tar.gz" \
  "docs/release/android/app-universal-release.apk" \
  "docs/release/mac/macos-dmg.zip" \
  "docs/release/mac/macos-app.zip" \
  --title "GenePad vx.x.x" \
  --notes "<same Chinese release notes from update.json>"
```

### 7. Push to Gitee and create Gitee Release

Gitee repo: `https://gitee.com/GenePad/GenePad.github.io`
Gitee token: stored in opencode skill config

```bash
# Push to Gitee
git remote add gitee https://oauth2:<gitee_token>@gitee.com/GenePad/GenePad.github.io.git
git push gitee main
git remote remove gitee

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
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.rpm" \
  "docs/release/linux/GenePad_x.x.x_Linux_amd64.tar.gz" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.deb" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.rpm" \
  "docs/release/linux/GenePad_x.x.x_Linux_arm64.tar.gz" \
  "docs/release/android/app-universal-release.apk" \
  "docs/release/mac/macos-dmg.zip" \
  "docs/release/mac/macos-app.zip"; do
  curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
    -F "file=@$f"
done
```

Gitee quirks:

- Gitee auto-attaches source archives (`vx.x.x.zip` / `vx.x.x.tar.gz`), so the
  release ends up with 12 assets after uploading 10 — that is normal.
- To edit notes later, `PATCH` the release — the request must repeat
  `tag_name` **and** `name` alongside `body`, otherwise 400:

```bash
printf '%s' '{"tag_name":"vx.x.x","name":"GenePad vx.x.x","body":"<new notes>"}' > /tmp/gitee-body.json
curl -s -X PATCH "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>?access_token=<gitee_token>" \
  -H "Content-Type: application/json" -d @/tmp/gitee-body.json
```

### 8. Update the Homebrew tap

Repo `GenePad/homebrew-tap`, file `Casks/genepad.rb`. The cask downloads the
**versionless** `https://genepad.cn/release/mac/macos-app.zip`, so on every
release bump `version` and `sha256` (= `sha256sum docs/release/mac/macos-app.zip`):

```bash
gh repo clone GenePad/homebrew-tap /tmp/homebrew-tap
cd /tmp/homebrew-tap
# edit Casks/genepad.rb: version "x.x.x" + new sha256
git commit -am "genepad x.x.x" && git push origin main
```

**Only push after Cloudflare Pages has deployed the new `macos-app.zip`** —
verify the live file first, otherwise `brew` users hit a sha mismatch:

```bash
curl -sL -x http://127.0.0.1:10801 -o /tmp/deployed.zip "https://genepad.cn/release/mac/macos-app.zip"
sha256sum /tmp/deployed.zip   # must equal the sha written into the cask
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

1. `docs/update.json` → `notes` — edit + commit + push **both** remotes (GitHub
   and Gitee); no rebuild needed. Easiest via a small node script that reads the
   markdown file and `JSON.stringify`s it back, avoiding manual `\n` escaping.
2. GitHub Release — `gh release edit vx.x.x --repo GenePad/GenePad.github.io --notes-file <file>`
3. Gitee Release — the `PATCH` call from step 7.

## Update Metadata

`docs/update.json` is the stable update manifest fetched by the Gene Editor app from:

```text
https://genepad.pages.dev/update.json
```

The app checks this manifest in the background once per week. Keep the metadata small and valid JSON.

Required shape:

```json
{
  "version": "0.6.2",
  "pub_date": "2026-08-12T00:00:00+08:00",
  "notes": "Release notes shown in the app update dialog",
  "platforms": {
    "windows-x86_64": { "url": "https://genepad.pages.dev/release/windows/GenePad_0.6.2_Windows_amd64.zip" },
    "linux-x86_64-deb": { "url": "https://genepad.pages.dev/release/linux/GenePad_0.6.2_Linux_amd64.deb" },
    "linux-x86_64-rpm": { "url": "https://genepad.pages.dev/release/linux/GenePad_0.6.2_Linux_amd64.rpm" },
    "android": { "url": "https://genepad.pages.dev/release/android/app-universal-release.apk" }
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
