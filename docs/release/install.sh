#!/usr/bin/env bash
# =============================================================
#  GenePad 一键安装脚本（Linux / macOS 通用）
#  GenePad one-click installer (Linux / macOS)
#
#  用法 / Usage:
#    curl -fsSL https://genepad.cn/release/install.sh | bash
#
#  Linux:  自动识别架构（x86_64 / ARM64）与包管理器
#          （apt / dnf / yum / zypper，其余环境改用 tar.gz）
#  macOS:  检测 Homebrew——已安装则直接用 brew 安装；未安装则先
#          自动安装 Homebrew（按网络环境自动选择官方源或国内
#          USTC 镜像）再安装；任一步失败则报错退出，不做兜底。
#
#  可选环境变量 / Optional env vars:
#    GENEPAD_VERSION=x.y.z    指定版本（默认自动读取最新版，仅 Linux）
#                             / Pin a version (latest by default, Linux only)
#    GENEPAD_BREW_MIRROR=1|0  强制开启/关闭 Homebrew 国内镜像（默认自动探测）
#                             / Force the Homebrew CN mirror on/off (auto)
#    GENEPAD_DRY_RUN=1        只打印将执行的操作，不下载不安装
#                             / Print planned actions only, no download
#    GENEPAD_SKIP_INSTALL=1   只下载到当前目录，不安装
#                             （macOS 即下载 macos-app.zip）
#                             / Download only, skip installation
# =============================================================
set -u

REPO_SLUG="GenePad/GenePad.github.io"
SITE="https://genepad.cn"
GITEE_DL="https://gitee.com/${REPO_SLUG}/releases/download"
GITHUB_DL="https://github.com/${REPO_SLUG}/releases/latest/download"

DRY_RUN="${GENEPAD_DRY_RUN:-0}"
SKIP_INSTALL="${GENEPAD_SKIP_INSTALL:-0}"
USE_MIRROR=0
VERSION="${GENEPAD_VERSION:-}"

# ---------- 输出工具 / output helpers ----------
if [ -t 1 ]; then
  B=$'\033[1m'; D=$'\033[2m'; G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; N=$'\033[0m'
else
  B=''; D=''; G=''; Y=''; R=''; N=''
fi
SEP="${D} · ${N}"

# bi "中文" "English" —— 双语单行输出 / bilingual single-line output
bi() {
  if [ -n "${2:-}" ]; then
    printf '%s%s%s' "$1" "$SEP" "$2"
  else
    printf '%s' "$1"
  fi
}
say()  { printf '%s\n' "${B}==>${N} $(bi "$1" "${2:-}")"; }
ok()   { printf '%s\n' "${G}$(bi "完成:" "Done:")${N} $(bi "$1" "${2:-}")"; }
warn() { printf '%s\n' "${Y}$(bi "警告:" "Warning:")${N} $(bi "$1" "${2:-}")" >&2; }
die()  { printf '%s\n' "${R}$(bi "错误:" "Error:")${N} $(bi "$1" "${2:-}")" >&2; exit 1; }
has()  { command -v "$1" >/dev/null 2>&1; }

command -v curl >/dev/null 2>&1 \
  || die "未找到 curl，请先安装 curl 再运行本脚本" "curl not found; install curl first, then rerun this script"
TMP="$(mktemp -d /tmp/genepad-install.XXXXXX)" \
  || die "无法创建临时目录" "failed to create a temp directory"
trap 'rm -rf "$TMP"' EXIT

# ---------- 下载（进度条 + 失败换源重试）----------
# fetch <输出文件> <url>... — download with progress bar and mirror rotation
fetch() {
  _out="$1"; shift
  _urls=("$@")
  _attempt=1; _mi=0
  _max_try=$(( ${#_urls[@]} * 2 ))
  [ "$_max_try" -lt 6 ] && _max_try=6
  while :; do
    _url="${_urls[$(( _mi % ${#_urls[@]} ))]}"
    say "下载 $(basename "$_out")" "Downloading $(basename "$_out")"
    echo "    ${_url}"
    if curl -fL --progress-bar --connect-timeout 15 --speed-time 30 --speed-limit 1024 -o "$_out" "$_url"; then
      return 0
    fi
    rc=$?
    [ "$_attempt" -ge "$_max_try" ] \
      && die "下载失败（curl 退出码 ${rc}）。请检查网络，或到 ${SITE} 手动下载" \
             "download failed (curl exit code ${rc}); check your network or download manually at ${SITE}"
    warn "下载失败（curl 退出码 ${rc}），第 ${_attempt}/${_max_try} 次尝试，换源重试 ..." \
         "download failed (curl exit code ${rc}), attempt ${_attempt}/${_max_try}, retrying from another mirror ..."
    _attempt=$(( _attempt + 1 )); _mi=$(( _mi + 1 )); sleep 2
  done
}

# ---------- 读取最新版本号 / resolve latest version ----------
# 失败返回非零（VERSION 保持为空）/ returns non-zero on failure
resolve_version() {
  [ -n "$VERSION" ] && return 0
  say "获取最新版本号 ..." "Fetching the latest version ..."
  for ju in \
    "${SITE}/update.json" \
    "https://gitee.com/${REPO_SLUG}/raw/main/docs/update.json" \
    "https://raw.githubusercontent.com/${REPO_SLUG}/main/docs/update.json"; do
    VERSION="$(curl -fsSL --connect-timeout 10 "$ju" 2>/dev/null \
      | grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' | head -n 1 \
      | sed 's/.*"\([0-9][0-9.]*\)"$/\1/')" || true
    [ -n "$VERSION" ] && return 0
  done
  return 1
}

OS_NAME="$(uname -s)"

# =============================================================
#  macOS 流程 / macOS flow
# =============================================================
if [ "$OS_NAME" = "Darwin" ]; then

  if [ "$(uname -m)" != "arm64" ]; then
    warn "检测到 Intel Mac（$(uname -m)）：GenePad 目前仅提供 Apple Silicon（ARM64）构建，安装后可能无法运行" \
         "Intel Mac detected ($(uname -m)): GenePad currently ships Apple Silicon (ARM64) builds only; it may not run after install"
  fi

  # find_brew —— brew 可执行文件（新装 brew 不在当前 PATH 时检查常见位置）
  # locate the brew executable (checks the usual prefixes if not on PATH)
  find_brew() {
    _b="$(command -v brew 2>/dev/null || true)"
    if [ -z "$_b" ]; then
      for _c in /opt/homebrew/bin/brew /usr/local/bin/brew; do
        if [ -x "$_c" ]; then printf '%s' "$_c"; return 0; fi
      done
      return 1
    fi
    printf '%s' "$_b"
  }

  # cn_mirror_needed —— github.com 不可达时使用 USTC 镜像；GENEPAD_BREW_MIRROR=1|0 强制指定；
  # 用户已配置 HOMEBREW_* 镜像环境变量时不干预
  # use the USTC mirror when github.com is unreachable; force with
  # GENEPAD_BREW_MIRROR=1|0; never override an existing HOMEBREW_* mirror config
  cn_mirror_needed() {
    case "${GENEPAD_BREW_MIRROR:-}" in
      1|true|yes) return 0 ;;
      0|false|no) return 1 ;;
    esac
    [ -n "${HOMEBREW_API_DOMAIN:-}${HOMEBREW_BOTTLE_DOMAIN:-}" ] && return 1
    ! curl -fsS -o /dev/null --connect-timeout 5 --max-time 8 https://github.com 2>/dev/null
  }

  install_brew() {
    local inst
    if cn_mirror_needed; then
      USE_MIRROR=1
      export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
      export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
      export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
      export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
      say "网络无法直连 GitHub，使用中科大（USTC）镜像安装 Homebrew ..." \
          "GitHub is unreachable; installing Homebrew via the USTC mirror ..."
      inst="$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)" || return 1
    else
      say "使用官方源安装 Homebrew ..." "Installing Homebrew from the official source ..."
      inst="$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || return 1
    fi
    NONINTERACTIVE=1 /bin/bash -c "$inst"
  }

  BREW_BIN="$(find_brew || true)"

  if [ "$DRY_RUN" = "1" ]; then
    echo
    say "DRY RUN — 将执行以下操作:" "DRY RUN — planned actions:"
    if [ -n "$BREW_BIN" ]; then
      echo "    $(bi "Homebrew" "Homebrew"): ${BREW_BIN}"
      echo "    $(bi "安装" "Install"): brew install genepad/tap/genepad"
    else
      echo "    $(bi "安装 Homebrew" "Install Homebrew"): 官方源 / USTC 镜像（自动探测） / official or USTC mirror (auto)"
      echo "    $(bi "安装" "Install"): brew install genepad/tap/genepad"
    fi
    exit 0
  fi

  if [ "$SKIP_INSTALL" = "1" ]; then
    fetch "${TMP}/macos-app.zip" \
      "${SITE}/release/mac/macos-app.zip" \
      "${GITHUB_DL}/macos-app.zip"
    cp -f "${TMP}/macos-app.zip" "${PWD}/macos-app.zip" \
      || die "复制到当前目录失败" "failed to copy the file into the current directory"
    ok "GENEPAD_SKIP_INSTALL=1，已跳过安装。文件已保存: ${PWD}/macos-app.zip" \
       "GENEPAD_SKIP_INSTALL=1, installation skipped. File saved to: ${PWD}/macos-app.zip"
    exit 0
  fi

  if [ -n "$BREW_BIN" ]; then
    say "检测到 Homebrew: ${BREW_BIN}" "Homebrew found: ${BREW_BIN}"
  else
    warn "未检测到 Homebrew，将先安装 Homebrew（约需数分钟，可能要求输入密码）" \
         "Homebrew not found; installing it first (takes a few minutes, may ask for your password)"
    install_brew \
      || die "Homebrew 安装失败。可到 ${SITE} 查看其他安装方式（手动 brew / npm / 直接下载）" \
             "Homebrew installation failed; see ${SITE} for other options (manual brew / npm / direct download)"
    BREW_BIN="$(find_brew || true)"
    if [ -n "$BREW_BIN" ] && [ "$USE_MIRROR" = "1" ]; then
      echo
      say "提示：本次仅临时使用 USTC 镜像，建议将以下内容加入 ~/.zshrc 长期生效:" \
          "Tip: the USTC mirror was used for this session only; add these lines to ~/.zshrc to keep them:"
      echo '    export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"'
      echo '    export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"'
    fi
    [ -n "$BREW_BIN" ] \
      || die "Homebrew 安装后仍找不到 brew 命令。可到 ${SITE} 查看其他安装方式（手动 brew / npm / 直接下载）" \
             "brew still not found after installation; see ${SITE} for other options (manual brew / npm / direct download)"
  fi

  # 让（刚安装的）brew 环境变量在当前进程可用 / pick up a freshly installed brew
  eval "$("$BREW_BIN" shellenv 2>/dev/null)" >/dev/null 2>&1 || true

  if "$BREW_BIN" list --cask genepad >/dev/null 2>&1; then
    say "已通过 Homebrew 安装过 GenePad，尝试升级到最新版 ..." \
        "GenePad is already installed via Homebrew; upgrading to the latest version ..."
    if "$BREW_BIN" upgrade genepad/tap/genepad; then
      :
    else
      warn "升级失败，保留已安装的版本" "upgrade failed; keeping the installed version"
    fi
  else
    say "通过 Homebrew 安装 GenePad ..." "Installing GenePad via Homebrew ..."
    "$BREW_BIN" install genepad/tap/genepad \
      || die "Homebrew 安装 GenePad 失败（上方有报错）。可到 ${SITE} 查看其他安装方式（npm / 直接下载）" \
             "installing GenePad via Homebrew failed (see the error above); see ${SITE} for other options (npm / direct download)"
  fi

  ok "GenePad 已通过 Homebrew 安装" "GenePad installed via Homebrew"
  echo
  echo "  启动: 运行 ${B}open -a GenePad${N}，或在「应用程序」/启动台中找到 GenePad"
  echo "  Launch: run ${B}open -a GenePad${N}, or find GenePad in Applications / Launchpad"
  exit 0
fi

# =============================================================
#  Linux 流程 / Linux flow
# =============================================================

# ---------- 1. 识别 CPU 架构 / detect architecture ----------
case "$(uname -m)" in
  x86_64|amd64)  ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) die "不支持的 CPU 架构: $(uname -m)（目前提供 x86_64 与 ARM64 安装包）" \
        "unsupported CPU architecture: $(uname -m) (only x86_64 / ARM64 builds are provided)" ;;
esac
say "检测到架构: ${ARCH}" "Detected architecture: ${ARCH}"

# ---------- 2. 识别包管理器 / detect package manager ----------
PKG_TYPE="" PM=""
if has apt-get;       then PKG_TYPE="deb"; PM="apt-get"
elif has apt;         then PKG_TYPE="deb"; PM="apt"
elif has dnf;         then PKG_TYPE="rpm"; PM="dnf"
elif has yum;         then PKG_TYPE="rpm"; PM="yum"
elif has zypper;      then PKG_TYPE="rpm"; PM="zypper"
else                        PKG_TYPE="tgz"; PM=""
fi

if [ "$PKG_TYPE" = "tgz" ]; then
  has tar || die "未检测到 deb/rpm 包管理器，且未找到 tar，无法安装" \
                 "no deb/rpm package manager detected and tar is missing; cannot install"
  say "未检测到 deb/rpm 包管理器，将使用 tar.gz 解压安装到 /usr/local/bin" \
      "No deb/rpm package manager found; will install from tar.gz into /usr/local/bin"
else
  say "检测到包管理器: ${PM}（.${PKG_TYPE} 包）" \
      "Detected package manager: ${PM} (.${PKG_TYPE} package)"
fi

# ---------- 3. 确定版本 / resolve version ----------
resolve_version \
  || die "无法获取最新版本号。可先设置 GENEPAD_VERSION=x.y.z 再运行本脚本" \
         "failed to resolve the latest version; set GENEPAD_VERSION=x.y.z and rerun"
say "安装版本: v${VERSION}" "Installing version: v${VERSION}"

# ---------- 4. 组装文件名与下载地址 / build file name and URLs ----------
# 注意 tgz 对应的发布文件扩展名是 .tar.gz / note: the tgz fallback file ships as .tar.gz
if [ "$PKG_TYPE" = "tgz" ]; then
  FILE="GenePad_${VERSION}_Linux_${ARCH}.tar.gz"
else
  FILE="GenePad_${VERSION}_Linux_${ARCH}.${PKG_TYPE}"
fi
urls=(
  "${SITE}/release/linux/${FILE}"
  "${GITEE_DL}/v${VERSION}/${FILE}"
  "${GITHUB_DL}/${FILE}"
)

if [ "$DRY_RUN" = "1" ]; then
  echo
  say "DRY RUN — 将执行以下操作:" "DRY RUN — planned actions:"
  echo "    $(bi "文件" "File"): ${FILE}"
  for u in "${urls[@]}"; do echo "    $(bi "下载" "Download"): $u"; done
  if [ "$PKG_TYPE" = "tgz" ]; then
    echo "    $(bi "安装" "Install"): tar -xzf ${FILE} -> /usr/local/bin/genepad"
  else
    echo "    $(bi "安装" "Install"): sudo ${PM} install ${FILE}"
  fi
  exit 0
fi

# ---------- 5. 下载 / download ----------
OUT="${TMP}/${FILE}"
fetch "$OUT" "${urls[@]}"
[ -s "$OUT" ] || die "下载产物为空，安装中止" "downloaded file is empty; aborting"
say "下载完成: ${OUT}" "Download complete: ${OUT}"

if [ "$SKIP_INSTALL" = "1" ]; then
  cp -f "$OUT" "${PWD}/${FILE}" || die "复制到当前目录失败" "failed to copy the file into the current directory"
  ok "GENEPAD_SKIP_INSTALL=1，已跳过安装。文件已保存: ${PWD}/${FILE}" \
     "GENEPAD_SKIP_INSTALL=1, installation skipped. File saved to: ${PWD}/${FILE}"
  exit 0
fi

# ---------- 6. 安装 / install ----------
if [ "$(id -u)" = "0" ]; then
  SUDO=""
else
  has sudo || die "当前不是 root 且未安装 sudo，无法提权安装" \
                  "not running as root and sudo is missing; cannot elevate to install"
  SUDO="sudo"
fi

case "$PKG_TYPE" in
  deb)
    say "使用 ${PM} 安装 ..." "Installing with ${PM} ..."
    if [ "$PM" = "apt-get" ] || [ "$PM" = "apt" ]; then
      $SUDO "$PM" install -y "$OUT" \
        || die "${PM} 安装失败，请把上方报错反馈到 ${SITE}" \
               "${PM} install failed; please report the error above at ${SITE}"
    else
      $SUDO dpkg -i "$OUT" \
        || die "dpkg 安装失败，请把上方报错反馈到 ${SITE}" \
               "dpkg install failed; please report the error above at ${SITE}"
    fi
    ;;
  rpm)
    say "使用 ${PM} 安装 ..." "Installing with ${PM} ..."
    case "$PM" in
      dnf|yum) $SUDO "$PM" install -y "$OUT" \
        || die "${PM} 安装失败，请把上方报错反馈到 ${SITE}" \
               "${PM} install failed; please report the error above at ${SITE}" ;;
      zypper)  $SUDO zypper --non-interactive install "$OUT" \
        || die "zypper 安装失败，请把上方报错反馈到 ${SITE}" \
               "zypper install failed; please report the error above at ${SITE}" ;;
    esac
    ;;
  tgz)
    say "解压安装到 /usr/local/bin ..." "Extracting into /usr/local/bin ..."
    tar -xzf "$OUT" -C "$TMP" || die "解压失败" "extraction failed"
    [ -f "${TMP}/genepad" ] \
      || die "压缩包内容与预期不符（未找到 genepad 可执行文件）" \
             "archive layout unexpected (genepad executable not found)"
    $SUDO install -m 0755 "${TMP}/genepad" /usr/local/bin/genepad \
      || die "安装到 /usr/local/bin 失败" "failed to install into /usr/local/bin"
    ;;
esac

ok "GenePad v${VERSION} 已安装（${ARCH} / ${PKG_TYPE}）" \
   "GenePad v${VERSION} installed (${ARCH} / ${PKG_TYPE})"
echo
echo "  启动: 终端运行 ${B}genepad${N}，或在应用菜单中找到 GenePad"
echo "  Launch: run ${B}genepad${N} in a terminal, or find GenePad in your app menu"
