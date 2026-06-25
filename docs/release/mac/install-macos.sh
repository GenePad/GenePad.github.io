#!/usr/bin/env bash
#
# Gene Editor — macOS installer (quarantine-free)
#
# Fetches the .app tarball via curl (which does NOT attach the
# com.apple.quarantine xattr), extracts it into /Applications, and re-signs it
# ad-hoc locally so Apple Silicon will launch it. No Apple Developer ID or
# notarization is required, and the user never has to run `xattr -cr`.
#
# Usage (from your own HTTPS server):
#   curl -fsSL https://example.com/releases/v0.4.1/install-macos.sh | bash
#
# Or with a custom archive URL:
#   curl -fsSL https://example.com/releases/v0.4.1/install-macos.sh | bash -s -- https://example.com/releases/v0.4.1/Gene%20Editor-macos-arm64.tar.gz
#
# How the script finds the tarball:
#   1. A URL passed as the first argument ($1).
#   2. The GE_TARBALL_URL environment variable.
#   3. The tarball sitting next to this script on the server
#      (same directory, resolved from the script's own URL).

set -euo pipefail

APP_NAME="Gene Editor"
ARCH="arm64"
TARBALL_NAME="Gene Editor-macos-arm64.tar.gz"
INSTALL_DIR="/Applications"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

c_red()    { printf '\033[31m%s\033[0m\n' "$*"; }
c_green()  { printf '\033[32m%s\033[0m\n' "$*"; }
c_yellow() { printf '\033[33m%s\033[0m\n' "$*"; }
c_blue()   { printf '\033[34m%s\033[0m\n' "$*"; }

die() { c_red "✗ $*"; exit 1; }

if [ "$(uname -s)" != "Darwin" ]; then
  die "This installer is for macOS only."
fi

# Resolve the base URL of the script's own location (so the tarball + sha256
# can live right next to it with no configuration).
resolve_script_url() {
  local self="${BASH_SOURCE[0]:-$0}"
  if command -v curl >/dev/null 2>&1 && [ "$self" != "bash" ] && [ "$self" != "" ]; then
    # When piped (`curl ... | bash`) $0 is "bash", so we fall back to the
    # caller-supplied URL / env var instead.
    local dir
    dir="$(printf '%s' "$self" | sed -E 's|/[^/]+$|/|')"
    if printf '%s' "$dir" | grep -q '^https\?://'; then
      printf '%s' "$dir"
      return 0
    fi
  fi
  return 1
}

if [ "$#" -ge 1 ] && [ -n "$1" ]; then
  ARCHIVE_URL="$1"
elif [ -n "${GE_TARBALL_URL:-}" ]; then
  ARCHIVE_URL="$GE_TARBALL_URL"
else
  BASE_URL="$(resolve_script_url || true)"
  if [ -z "$BASE_URL" ]; then
    die "Could not determine archive URL. Pass it as an argument:\n    curl -fsSL https://.../install-macos.sh | bash -s -- https://.../Gene%20Editor-macos-arm64.tar.gz"
  fi
  ARCHIVE_URL="${BASE_URL}${TARBALL_NAME}"
fi
ARCHIVE_URL_ENC="$(printf '%s' "$ARCHIVE_URL" | sed 's/ /%20/g')"
SHA_URL_ENC="$(printf '%s' "${ARCHIVE_URL%.tar.gz}.tar.gz.sha256" | sed 's/ /%20/g')"

ARCHIVE_FILE="$TMP_DIR/$TARBALL_NAME"
SHA_FILE="$TMP_DIR/$TARBALL_NAME.sha256"

c_blue "► Installing $APP_NAME for macOS ($ARCH)"
printf '  archive: %s\n' "$ARCHIVE_URL"

# 1. Download the tarball. curl never attaches com.apple.quarantine, so the
#    extracted app is never flagged as "damaged" by Gatekeeper.
c_yellow "  • downloading…"
if ! curl -fSL --retry 3 -o "$ARCHIVE_FILE" "$ARCHIVE_URL_ENC"; then
  die "Failed to download the archive. Check the URL: $ARCHIVE_URL"
fi

# 2. Verify the sha256 if a matching .sha256 file is published alongside.
if curl -fsSLI "$SHA_URL_ENC" >/dev/null 2>&1; then
  c_yellow "  • verifying checksum…"
  if curl -fSL -o "$SHA_FILE" "$SHA_URL_ENC"; then
    EXPECTED="$(tr -d '[:space:]' < "$SHA_FILE")"
    ACTUAL="$(shasum -a 256 "$ARCHIVE_FILE" | awk '{print $1}')"
    if [ -z "$EXPECTED" ] || [ "$EXPECTED" != "$ACTUAL" ]; then
      die "Checksum mismatch.\n    expected: $EXPECTED\n    actual:   $ACTUAL"
    fi
  fi
else
  printf '  • no checksum file found (skipped)\n'
fi

# 3. Remove any previous install and extract into /Applications.
c_yellow "  • extracting to $INSTALL_DIR…"
EXISTING="$INSTALL_DIR/$APP_NAME.app"
if [ -e "$EXISTING" ]; then
  rm -rf "$EXISTING"
fi
tar xzf "$ARCHIVE_FILE" -C "$INSTALL_DIR"
if [ ! -e "$EXISTING" ]; then
  die "Extraction did not produce $EXISTING. The archive may be malformed."
fi

# 4. Re-sign ad-hoc locally. Apple Silicon (arm64) refuses to launch an
#    unsigned Mach-O, so even an un-quarantined bundle needs this.
c_yellow "  • re-signing ad-hoc…"
codesign -s - --force --deep "$EXISTING" >/dev/null 2>&1 || true

# 5. Strip any stray quarantine attr defensively (e.g. if the user re-runs the
#    script on a copy that somehow got flagged).
xattr -cr "$EXISTING" >/dev/null 2>&1 || true

c_green "✓ $APP_NAME installed to $EXISTING"
printf '\nOpen it from the Applications folder or:\n  open -a "%s"\n' "$APP_NAME"
