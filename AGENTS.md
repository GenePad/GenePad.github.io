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

When updating releases:

- Update `version` to match the app package version.
- Update `pub_date` using an ISO 8601 timestamp with timezone.
- Keep `notes` user-facing and concise; it may contain `\n` line breaks.
- Ensure every platform URL points to an existing file under `docs/release/` or another stable public URL.
- Preserve platform keys used by the app: `windows-x86_64`, `linux-x86_64-deb`, `linux-x86_64-rpm`, and `android`.

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