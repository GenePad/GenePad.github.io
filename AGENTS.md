# AGENTS.md - GenePad Website

## Project Overview

This repository is the static website and Cloudflare Pages deployment source for GenePad / Gene Editor downloads and support pages.
The public site is served from `docs/` through `wrangler.jsonc` / Cloudflare Pages.

## Project Structure

```
docs/
  index.html                 # Main product/download page
  tech-support.html          # Technical support page
  styles.css                 # Site styles
  update.json                # App update metadata consumed by Gene Editor
  release/
    windows/                 # Windows installer downloads
    linux/                   # Linux package downloads
    android/                 # Android APK downloads
    mac/                     # macOS downloads (tar.gz installer + dmg/app fallback)
  screenshot/                # Website screenshots/assets
wrangler.jsonc               # Cloudflare Pages configuration
```

## macOS Distribution Model

The macOS app is **unsigned** (no Apple Developer ID), so any `.app`/`.dmg`
downloaded through a browser gets the `com.apple.quarantine` xattr and is
flagged "damaged" by Gatekeeper on Sequoia. The site's macOS download panel
works around this with two paths (see `showSources()` in `index.html`):

1. **Primary — one-line Terminal installer (quarantine-free):** `curl` never
   attaches the quarantine xattr, so piping a self-hosted install script to
   `bash` produces a clean `.app`. The panel shows a copy-to-clipboard
   command and serves three files from `docs/release/mac/`:
   - `install-macos.sh` — the installer (sourced from the Gene Editor repo at
     `scripts/install-macos.sh`)
   - `Gene Editor-macos-arm64.tar.gz` — the app bundle, tarred (preserves
     symlinks/perms that a zip would corrupt)
   - `Gene Editor-macos-arm64.tar.gz.sha256` — its SHA-256 (hex-only)

   The install command is hardcoded in `index.html` as `MAC_INSTALL_SCRIPT`
   and `MAC_TARBALL_URL` (both point at `https://genepad.pages.dev/release/mac/`).
   The tarball URL is passed as an argument (`bash -s -- <url>`) because `$0`
   is `"bash"` when piped, so the script cannot auto-detect its own URL.

2. **Fallback — manual DMG / APP download (collapsed by default):** a
   `<details>` block hidden under "▸ 其他下载方式" exposes the `.dmg`/`.app`
   direct links plus the old Gatekeeper warning (right-click → Open, or
   `xattr -cr`).

The `macos-dmg.zip` and `macos-app.zip` fallbacks are copied manually by the
user; the tarball + installer are the recommended path.

## Release Checklist

When updating to a new version, all of the following files must be touched:

### 1. Copy new release files from build outputs

Copy the latest built binaries from the Gene Editor source project into `docs/release/`. Look for files in these locations:

| Platform | Source build output directory |
|---|---|
| Windows | `C:\Users\moqiq\PycharmProjects\Gene_Editor-master\src-tauri\target\release\bundle\nsis` |
| Linux | `\\wsl.localhost\Ubuntu-24.04\home\chief\Gene_Editor\src-tauri\target\release\bundle` |
| Android | `C:\Users\moqiq\PycharmProjects\Gene_Editor-master\src-tauri\gen\android\app\build\outputs\apk\universal\release` |

Copy the latest version files to `docs/release/`:
```
docs/release/windows/Gene Editor_x.x.x_x64-setup.zip   (must zip the exe to avoid browser security warnings)
docs/release/linux/Gene Editor_x.x.x_amd64.deb
docs/release/linux/Gene Editor-x.x.x-1.x86_64.rpm
docs/release/android/app-universal-release.apk   (in-place update, no version in filename)
docs/release/mac/Gene Editor-macos-arm64.tar.gz            (recommended installer path)
docs/release/mac/Gene Editor-macos-arm64.tar.gz.sha256     (hex-only SHA-256, matching the tarball)
docs/release/mac/install-macos.sh                          (the one-line installer script)
docs/release/mac/macos-dmg.zip                             (fallback, copied manually by user)
docs/release/mac/macos-app.zip                             (fallback, copied manually by user)
```

**Important: Windows exe must be compressed to zip** — use `Compress-Archive` to zip the `.exe` into `.zip` before placing in `docs/release/windows/`. This avoids browser security warnings when downloading.

**Important: Do NOT include AppImage files** — skip any `.AppImage` files found in the Linux bundle directory.

**macOS release files come from two sources:**
- `Gene Editor-macos-arm64.tar.gz`, `*.tar.gz.sha256`, and `install-macos.sh`
  are produced by the Gene Editor repo's `Build macOS` GitHub Actions workflow
  (download the `macos-tarball` artifact and unzip it; copy `install-macos.sh`
  from `scripts/install-macos.sh`). These are the **recommended installer** path.
- `macos-dmg.zip` and `macos-app.zip` are the **fallback** path and are copied
  manually by the user — do not attempt to copy them from build output.

**After replacing macOS files, regenerate the sha256** if the tarball changed —
the installer verifies it at runtime. On the build machine (or any Mac/WSL with
the file):
```bash
cd docs/release/mac
shasum -a 256 "Gene Editor-macos-arm64.tar.gz" | awk '{print $1}' > "Gene Editor-macos-arm64.tar.gz.sha256"
```
The `.sha256` file must contain the hex digest only (the installer strips
whitespace before comparing).

### 2. Delete old release files

Remove the previous version's binaries from `docs/release/`.

### 3. Update `docs/update.json`

- `version` — match the new app package version.
- `pub_date` — today's date in ISO 8601 with timezone (e.g. `2026-06-15T00:00:00+08:00`).
- `notes` — read commit history from `C:\Users\moqiq\PycharmProjects\Gene_Editor-master` since the last release, summarize new features in Chinese.
- `platforms.*.url` — point to the new version filenames under `https://genepad.pages.dev/release/...`.
- Preserve platform keys: `windows-x86_64`, `linux-x86_64-deb`, `linux-x86_64-rpm`, `android`.

### 4. Update `docs/index.html`

Edit the `downloadData` array (around line 1021) — update version numbers in `name` and `path` for Windows/Linux entries, and update `size` fields to match actual file sizes (check with `dir`).

The macOS entry does **not** carry a version in its filenames (the tarball is
always `Gene Editor-macos-arm64.tar.gz`, `install-macos.sh` is versionless), so
the macOS `downloadData` entries only need updating if the bundle layout
changes. The one-line install command is built from the `MAC_INSTALL_SCRIPT`
and `MAC_TARBALL_URL` constants near `showSources()` — update those only if the
canonical download host changes (default `https://genepad.pages.dev`).

### 5. Validate

```powershell
Get-Content -Raw docs/update.json | ConvertFrom-Json | Out-Null
```

### 6. Commit, push to GitHub, and create GitHub Release

```bash
git add docs/update.json docs/index.html docs/release/
git commit -m "release: bump to x.x.x"
git push origin main

# Create GitHub Release with all assets
gh release create vx.x.x \
  "docs/release/windows/Gene Editor_x.x.x_x64-setup.zip" \
  "docs/release/linux/Gene Editor_x.x.x_amd64.deb" \
  "docs/release/linux/Gene Editor-x.x.x-1.x86_64.rpm" \
  "docs/release/android/app-universal-release.apk" \
  "docs/release/mac/Gene Editor-macos-arm64.tar.gz" \
  "docs/release/mac/Gene Editor-macos-arm64.tar.gz.sha256" \
  "docs/release/mac/install-macos.sh" \
  --title "Gene Editor vx.x.x" \
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
  -d '{"tag_name":"vx.x.x","name":"Gene Editor vx.x.x","body":"<release notes>","target_commitish":"main"}'

# Upload assets to Gitee Release (replace <release_id> from previous response)
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/windows/Gene Editor_x.x.x_x64-setup.zip"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/linux/Gene Editor_x.x.x_amd64.deb"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/linux/Gene Editor-x.x.x-1.x86_64.rpm"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/android/app-universal-release.apk"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/mac/Gene Editor-macos-arm64.tar.gz"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/mac/Gene Editor-macos-arm64.tar.gz.sha256"
curl -s -X POST "https://gitee.com/api/v5/repos/GenePad/GenePad.github.io/releases/<release_id>/attach_files?access_token=<gitee_token>" \
  -F "file=@docs/release/mac/install-macos.sh"
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
  "version": "0.3.3",
  "pub_date": "2026-06-01T00:00:00+08:00",
  "notes": "Release notes shown in the app update dialog",
  "platforms": {
    "windows-x86_64": { "url": "https://genepad.pages.dev/release/windows/...exe" },
    "linux-x86_64-deb": { "url": "https://genepad.pages.dev/release/linux/...deb" },
    "linux-x86_64-rpm": { "url": "https://genepad.pages.dev/release/linux/...rpm" },
    "android": { "url": "https://genepad.pages.dev/release/android/...apk" }
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