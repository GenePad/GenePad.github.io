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
  screenshot/                # Website screenshots/assets
wrangler.jsonc               # Cloudflare Pages configuration
```

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
docs/release/windows/Gene Editor_x.x.x_x64-setup.exe
docs/release/linux/Gene Editor_x.x.x_amd64.deb
docs/release/linux/Gene Editor-x.x.x-1.x86_64.rpm
docs/release/android/app-universal-release.apk   (in-place update, no version in filename)
```

**Important: Do NOT include AppImage files** — skip any `.AppImage` files found in the Linux bundle directory.

### 2. Delete old release files

Remove the previous version's binaries from `docs/release/`.

### 3. Update `docs/update.json`

- `version` — match the new app package version.
- `pub_date` — today's date in ISO 8601 with timezone (e.g. `2026-06-15T00:00:00+08:00`).
- `notes` — read commit history from `C:\Users\moqiq\PycharmProjects\Gene_Editor-master` since the last release, summarize new features in Chinese.
- `platforms.*.url` — point to the new version filenames under `https://genepad.pages.dev/release/...`.
- Preserve platform keys: `windows-x86_64`, `linux-x86_64-deb`, `linux-x86_64-rpm`, `android`.

### 4. Update `docs/index.html`

Edit the `localFiles` array (around line 1022) — update version numbers in `name` and `path` for Windows/Linux entries, and update `size` fields to match actual file sizes (check with `dir`).

### 5. Validate

```powershell
Get-Content -Raw docs/update.json | ConvertFrom-Json | Out-Null
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