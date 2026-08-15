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

### 2. Delete old release files

Remove the previous version's binaries from `docs/release/`.

**Keep `docs/release/linux/install.sh`** — it is the version-agnostic
one-click install script linked from the download panel (it reads the latest
version from `update.json` at runtime); do not delete it when clearing old
binaries.

### 3. Update `docs/update.json`

- `version` — match the new app package version.
- `pub_date` — today's date in ISO 8601 with timezone (e.g. `2026-06-15T00:00:00+08:00`).
- `notes` — read commit history from `C:\Users\moqiq\PycharmProjects\Gene_Editor-master` since the last release, summarize new features in Chinese.
- `platforms.*.url` — point to the new version filenames under `https://genepad.pages.dev/release/...`.
- Preserve platform keys: `windows-x86_64`, `linux-x86_64-deb`, `linux-x86_64-rpm`, `android`.

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
git add app docs/update.json docs/index.html docs/tech-support.html docs/assets docs/shots docs/release/
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
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases?access_token=<gitee_token>" \
  -H "Content-Type: application/json" \
  -d '{"tag_name":"vx.x.x","name":"GenePad vx.x.x","body":"<release notes>","target_commitish":"main"}'

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
