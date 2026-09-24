#!/usr/bin/env bash
# =============================================================
#  GenePad 一键安装脚本（Linux / macOS 通用）
#  GenePad one-click installer (Linux / macOS)
#
#  用法 / Usage:
#    curl -fsSL https://genepad.cn/release/install.sh | bash
#
#  脚本结束前（无论成功或失败）会等待按回车再退出，方便查看结果；
#  无人值守 / 自动化运行请加 -q：
#    curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
#  The script waits for Enter before exiting (success or failure) so the
#  result stays visible; add -q / --quiet (or GENEPAD_QUIET=1) to skip the
#  wait for unattended runs.
#
#  Linux:  自动识别架构（仅 x86_64）。有 apt / dpkg 时用包管理器安装
#          deb；其他发行版（Fedora / Arch / openSUSE 等）自动解包 deb，
#          把二进制释放到用户目录并登记桌面入口与文件关联
#          （自 0.7.1 起不再提供 rpm / tar.gz / ARM64 安装包）
#  macOS:  检测 Homebrew——已安装则直接用 brew 安装；未安装则先
#          自动安装 Homebrew（按网络环境自动选择官方源或国内
#          USTC 镜像）再安装；任一步失败则报错退出，不做兜底。
#
#  可选环境变量 / Optional env vars:
#    GENEPAD_VERSION=x.y.z    指定版本（默认自动读取最新版，仅 Linux）
#                             / Pin a version (latest by default, Linux only)
#    GENEPAD_PREFIX=<dir>     解包安装的目标前缀（默认：root 为 /usr/local，
#                             普通用户为 ~/.local；仅 Linux 走解包安装时生效）
#                             / Install prefix for the unpacked layout
#                             (default: /usr/local as root, ~/.local
#                             otherwise; used by the Linux unpacked install)
#    GENEPAD_EXTRACT=1        检测到 apt/dpkg 也强制走解包安装（调试用）
#                             / Force the unpacked install even when
#                             apt/dpkg exists (debugging)
#    GENEPAD_BREW_MIRROR=1|0  强制开启/关闭 Homebrew 国内镜像（默认自动探测）
#                             / Force the Homebrew CN mirror on/off (auto)
#    GENEPAD_DRY_RUN=1        只打印将执行的操作，不下载不安装
#                             / Print planned actions only, no download
#    GENEPAD_SKIP_INSTALL=1   只下载到当前目录，不安装
#                             （macOS 即下载 .app.tar.gz）
#                             / Download only, skip installation
#    GENEPAD_QUIET=1          等价于 -q（管道方式运行时不便传参时更顺手）
#                             / same as -q (handy when piping)
# =============================================================
set -u

REPO_SLUG="GenePad/GenePad.github.io"
SITE="https://genepad.cn"
GITEE_DL="https://gitee.com/${REPO_SLUG}/releases/download"
GITHUB_DL="https://github.com/${REPO_SLUG}/releases/latest/download"

DRY_RUN="${GENEPAD_DRY_RUN:-0}"
SKIP_INSTALL="${GENEPAD_SKIP_INSTALL:-0}"
QUIET="${GENEPAD_QUIET:-0}"
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

# ---------- 参数 / arguments ----------
# -q | --quiet：结束后不等回车直接退出（无人值守 / 自动化）
# -q | --quiet: do not wait for Enter before exiting (unattended runs)
# 注：`${1+"$@"}` 兼容 macOS 自带 bash 3.2 在 set -u 下对空 "$@" 的报错
# note: `${1+"$@"}` works around bash 3.2's set -u error on empty "$@"
for _arg in ${1+"$@"}; do
  case "$_arg" in
    -q|--quiet) QUIET=1 ;;
    *) die "未知参数: ${_arg}（本脚本仅支持 -q / --quiet）" \
           "unknown argument: ${_arg} (only -q / --quiet is supported)" ;;
  esac
done

# pause —— 结束前等待用户按回车 / wait for Enter before the script exits.
# 从 /dev/tty 读取（`curl | bash` 时 stdin 是脚本管道，不能直接 read）；
# 无终端（CI / 无人值守）或指定 -q 时自动跳过。
# Reads /dev/tty (stdin is the piped script under `curl | bash`); skipped
# automatically when there is no tty or -q / --quiet was given.
pause() {
  [ "$QUIET" = "1" ] && return 0
  { : </dev/tty; } 2>/dev/null || return 0
  printf '%s' "${D}$(bi "按回车键退出 ..." "Press Enter to exit ...")${N} "
  IFS= read -r _pause_reply </dev/tty 2>/dev/null || true
}

TMP=""
on_exit() {
  [ -n "$TMP" ] && rm -rf "$TMP"
  pause
}
trap on_exit EXIT

command -v curl >/dev/null 2>&1 \
  || die "未找到 curl，请先安装 curl 再运行本脚本" "curl not found; install curl first, then rerun this script"
TMP="$(mktemp -d /tmp/genepad-install.XXXXXX)" \
  || die "无法创建临时目录" "failed to create a temp directory"

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
    resolve_version \
      || die "无法获取最新版本号。可先设置 GENEPAD_VERSION=x.y.z 再运行本脚本" \
             "failed to resolve the latest version; set GENEPAD_VERSION=x.y.z and rerun"
    MAC_FILE="GenePad_${VERSION}_Darwin_arm64.app.tar.gz"
    fetch "${TMP}/${MAC_FILE}" \
      "${SITE}/release/mac/${MAC_FILE}" \
      "${GITEE_DL}/v${VERSION}/${MAC_FILE}" \
      "${GITHUB_DL}/${MAC_FILE}"
    cp -f "${TMP}/${MAC_FILE}" "${PWD}/${MAC_FILE}" \
      || die "复制到当前目录失败" "failed to copy the file into the current directory"
    ok "GENEPAD_SKIP_INSTALL=1，已跳过安装。文件已保存: ${PWD}/${MAC_FILE}" \
       "GENEPAD_SKIP_INSTALL=1, installation skipped. File saved: ${PWD}/${MAC_FILE}"
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
  aarch64|arm64) die "自 0.7.1 起不再提供 ARM64 Linux 安装包（仅 x86_64 deb）。旧版 0.6.9 的 ARM64 包仍可在 ${SITE} 下载页获取" \
                    "ARM64 Linux builds were discontinued in 0.7.1 (x86_64 deb only). The last ARM64 packages (0.6.9) remain available on the download page at ${SITE}" ;;
  *) die "不支持的 CPU 架构: $(uname -m)（目前仅提供 x86_64 安装包）" \
        "unsupported CPU architecture: $(uname -m) (only x86_64 builds are provided)" ;;
esac
say "检测到架构: ${ARCH}" "Detected architecture: ${ARCH}"

# ---------- 2. 识别安装方式 / pick install mode ----------
# 有 apt / dpkg 时用包管理器安装（依赖自动解决）；其他发行版（Fedora /
# Arch / openSUSE 等）自动解包 deb，释放到标准前缀并登记桌面入口。
# GENEPAD_EXTRACT=1 可在 apt 系统上强制走解包路径（调试用）。
# Debian-family installs via the package manager (deps handled for us);
# every other distro gets the deb unpacked into a standard prefix.
# GENEPAD_EXTRACT=1 forces the unpacked path even when apt/dpkg exists.
PM=""
INSTALL_MODE="extract"
if [ "${GENEPAD_EXTRACT:-0}" != "1" ]; then
  if     has apt-get; then PM="apt-get"
  elif   has apt;     then PM="apt"
  elif   has dpkg;    then PM="dpkg"
  fi
  [ -n "$PM" ] && INSTALL_MODE="apt"
fi
if [ "$INSTALL_MODE" = "apt" ]; then
  say "检测到包管理器: ${PM}（deb 包）" \
      "Detected package manager: ${PM} (deb package)"
else
  say "未检测到 apt/dpkg，将解包 deb 安装（二进制 + 桌面入口）" \
      "no apt/dpkg found; the deb will be unpacked (binary + desktop entries)"
fi

# 解包安装的目标前缀 / target prefix for the unpacked layout
if [ -n "${GENEPAD_PREFIX:-}" ]; then
  PREFIX="$GENEPAD_PREFIX"
elif [ "$(id -u)" = "0" ]; then
  PREFIX="/usr/local"
else
  PREFIX="${HOME}/.local"
fi

# ---------- 2b. 解包安装辅助 / unpacked-install helpers ----------
# deb = ar 归档，data 成员是 tar 包（现为 gzip）。按能力逐级回退：
# dpkg-deb → ar + tar → python3（纯标准库）。临时变量统一 x_ 前缀，
# 不污染全局。A deb is an ar archive whose data member is a tarball
# (gzip today); try, in order: dpkg-deb → ar + tar → python3 (stdlib).
extract_deb() {  # extract_deb <deb> <目标目录/dest dir>
  x_deb="$1"; x_dest="$2"
  x_name="$(basename "$x_deb")"
  rm -rf "$x_dest"
  mkdir -p "$x_dest" \
    || die "无法创建解包目录 ${x_dest}" "cannot create the extraction dir ${x_dest}"

  # ① dpkg-deb（最忠实 / most faithful）
  if has dpkg-deb; then
    say "使用 dpkg-deb 解包 ${x_name} ..." "Unpacking ${x_name} with dpkg-deb ..."
    if dpkg-deb -x "$x_deb" "$x_dest"; then return 0; fi
    warn "dpkg-deb 解包失败，改用 ar + tar ..." "dpkg-deb failed; falling back to ar + tar ..."
  fi

  # ② ar + tar（ar 来自 binutils；tar 自动识别 gzip / xz 压缩）
  #    ar from binutils; tar auto-detects the gzip / xz compression
  if has ar; then
    say "使用 ar + tar 解包 ${x_name} ..." "Unpacking ${x_name} with ar + tar ..."
    x_work="${TMP}/deb-ar"
    rm -rf "$x_work"; mkdir -p "$x_work"
    ( cd "$x_work" && ar x "$x_deb" ) \
      || warn "ar 解档失败" "ar extraction failed"
    x_data="$(cd "$x_work" 2>/dev/null && ls data.tar.* 2>/dev/null | head -n 1)"
    if [ -n "$x_data" ] && tar -xf "${x_work}/${x_data}" -C "$x_dest"; then
      return 0
    fi
    warn "ar + tar 解包失败，改用 python3 ..." "ar + tar failed; falling back to python3 ..."
  fi

  # ③ python3 纯标准库：手写 ar 头解析 + tarfile
  #    python3 with stdlib only: hand-rolled ar member scan + tarfile
  if has python3; then
    say "使用 python3 解包 ${x_name} ..." "Unpacking ${x_name} with python3 ..."
    if python3 - "$x_deb" "$x_dest" <<'PYEOF'
import io, sys, tarfile

deb, dest = sys.argv[1], sys.argv[2]
with open(deb, "rb") as f:
    if f.read(8) != b"!<arch>\n":
        sys.exit("not an ar archive: " + deb)
    data = None
    while True:
        hdr = f.read(60)
        if len(hdr) < 60:
            break
        name = hdr[0:16].decode("ascii", "replace").strip().rstrip("/")
        size = int(hdr[48:58].decode("ascii").strip())
        body = f.read(size)
        if size % 2:
            f.read(1)  # ar 成员按 2 字节对齐 / members are 2-byte aligned
        if name == "data.tar" or name.startswith("data.tar."):
            data = body
            break
if data is None:
    sys.exit("data.tar member not found in " + deb)
with tarfile.open(fileobj=io.BytesIO(data)) as tf:
    try:
        tf.extractall(dest, filter="data")
    except TypeError:  # python < 3.12 没有 filter 参数 / no filter kwarg
        tf.extractall(dest)
PYEOF
    then return 0; fi
    warn "python3 解包失败" "python3 extraction failed"
  fi

  die "本机缺少可用的解包工具（dpkg-deb / ar / python3 均不可用）。请先安装 binutils 或 python3 再重试，或到 ${SITE} 下载页手动获取 deb 包" \
      "no usable unpacker found (dpkg-deb / ar / python3 all missing); install binutils or python3 and retry, or grab the deb from the download page at ${SITE}"
}

# 解包安装主体：释放到 PREFIX + 桌面入口指向实际路径 + 刷新缓存 + 依赖体检
# unpacked-install main line: unpack into PREFIX, point the desktop entries
# at the installed binary, refresh caches, then check the runtime libraries
install_extract() {
  say "解包安装到 ${PREFIX} ..." "Installing (unpacked) into ${PREFIX} ..."
  x_root="${TMP}/deb-root"
  extract_deb "$OUT" "$x_root"
  [ -f "${x_root}/usr/bin/genepad" ] \
    || die "解包结果缺少 usr/bin/genepad，安装中止" "extraction is missing usr/bin/genepad; aborting"
  # 归档内本就是 0755，这里显式兜底（个别文件系统会丢权限位）
  # the archive already says 0755; enforce it (some filesystems drop modes)
  chmod 755 "${x_root}/usr/bin/genepad" 2>/dev/null || true

  mkdir -p "$PREFIX" \
    || die "无法创建安装目录 ${PREFIX}。可用 GENEPAD_PREFIX=<可写目录> 指定其他位置" \
           "cannot create ${PREFIX}; set GENEPAD_PREFIX=<writable dir> to install elsewhere"
  cp -a "${x_root}/usr/." "$PREFIX/" \
    || die "向 ${PREFIX} 释放文件失败" "failed to copy files into ${PREFIX}"

  # .desktop 的 Exec 改写为绝对路径——前缀的 bin 不在 PATH 里也能从菜单启动
  # rewrite Exec= to the absolute binary path so the menu launcher works
  # even when the prefix's bin directory is not on PATH
  x_bin="${PREFIX}/bin/genepad"
  x_sed_bin="$(printf '%s' "$x_bin" | sed 's/[&|]/\\&/g')"
  for x_d in "$PREFIX/share/applications"/*.desktop; do
    [ -f "$x_d" ] || continue
    if grep -q '^Exec=genepad' "$x_d" 2>/dev/null; then
      sed -i "s|^Exec=genepad|Exec=${x_sed_bin}|" "$x_d" \
        || warn "桌面入口 Exec 改写失败: ${x_d}" "failed to rewrite Exec in ${x_d}"
    fi
  done

  # 刷新桌面 / 图标 / MIME 缓存——工具存在才调用，失败不致命
  # best-effort desktop / icon / mime cache refresh (failures are harmless)
  if has update-desktop-database; then
    update-desktop-database "$PREFIX/share/applications" 2>/dev/null || true
  fi
  if [ -d "$PREFIX/share/mime" ] && has update-mime-database; then
    update-mime-database "$PREFIX/share/mime" 2>/dev/null || true
  fi
  if has gtk-update-icon-cache; then
    gtk-update-icon-cache -qtf "$PREFIX/share/icons/hicolor" 2>/dev/null || true
  fi

  # 依赖体检：解包不会自动安装 libwebkit2gtk / gtk3，也不校验 glibc 版本；
  # 用 ldd 列出缺失项并按发行版给出安装提示。只警告，不回滚——文件已就位，
  # 装齐依赖后即可启动。The unpacked install brings no libwebkit2gtk / gtk3
  # and no glibc guarantee — list what ldd misses and hint per distro.
  # Warn only; the files stay in place.
  if has ldd; then
    x_missing="$(ldd "$x_bin" 2>/dev/null | grep 'not found' || true)"
    if [ -n "$x_missing" ]; then
      warn "检测到缺失的运行库，应用可能无法启动（解包安装不处理依赖）:" \
           "missing runtime libraries detected; the app may not start (an unpacked install handles no dependencies):"
      printf '%s\n' "$x_missing" | sed 's/^/    /'
      if has pacman; then
        warn "Arch / Manjaro 可先执行: sudo pacman -S --needed webkit2gtk-4.1 gtk3" \
             "on Arch / Manjaro run first: sudo pacman -S --needed webkit2gtk-4.1 gtk3"
      elif has dnf; then
        warn "Fedora / RHEL 可先执行: sudo dnf install webkit2gtk4.1 gtk3" \
             "on Fedora / RHEL run first: sudo dnf install webkit2gtk4.1 gtk3"
      elif has zypper; then
        warn "openSUSE 可先执行: sudo zypper install libwebkit2gtk-4_1-0 gtk3" \
             "on openSUSE run first: sudo zypper install libwebkit2gtk-4_1-0 gtk3"
      else
        warn "请用所用发行版的包管理器安装 libwebkit2gtk-4.1 与 gtk3 后再启动" \
             "install libwebkit2gtk-4.1 and gtk3 with your distro's package manager, then start the app"
      fi
    fi
  fi
}

# ---------- 3. 确定版本 / resolve version ----------
resolve_version \
  || die "无法获取最新版本号。可先设置 GENEPAD_VERSION=x.y.z 再运行本脚本" \
         "failed to resolve the latest version; set GENEPAD_VERSION=x.y.z and rerun"
say "安装版本: v${VERSION}" "Installing version: v${VERSION}"

# ---------- 4. 组装文件名与下载地址 / build file name and URLs ----------
FILE="GenePad_${VERSION}_Linux_${ARCH}.deb"
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
  if [ "$INSTALL_MODE" = "apt" ]; then
    echo "    $(bi "安装" "Install"): sudo ${PM} install ${FILE}"
  else
    echo "    $(bi "解包安装" "Unpacked install"): ${PREFIX}"
    echo "    $(bi "登记桌面入口（Exec 指向 ${PREFIX}/bin/genepad），并检查 libwebkit2gtk / gtk3 依赖" \
           "register desktop entries (Exec -> ${PREFIX}/bin/genepad) and check the libwebkit2gtk / gtk3 runtime deps")"
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
case "$INSTALL_MODE" in
  extract)
    # 无需提权：默认装到用户目录（~/.local），root 自动落到 /usr/local
    # no elevation needed: the user prefix by default; /usr/local when root
    install_extract
    ;;
  apt)
    if [ "$(id -u)" = "0" ]; then
      SUDO=""
    else
      has sudo || die "当前不是 root 且未安装 sudo，无法提权安装" \
                      "not running as root and sudo is missing; cannot elevate to install"
      SUDO="sudo"
    fi
    say "使用 ${PM} 安装 ..." "Installing with ${PM} ..."
    if [ "$PM" = "apt-get" ] || [ "$PM" = "apt" ]; then
      if $SUDO "$PM" install -y "$OUT"; then
        :
      else
        # 本地 deb 安装不依赖包索引，平时不跑 update（快）；失败多因索引
        # 陈旧补不出依赖，此时先 update 一次再重试。
        # A local deb needs no package index (fast); a failure usually means
        # a stale index can't resolve deps — refresh once and retry.
        warn "安装失败，尝试刷新包索引（${PM} update）后重试一次 ..." \
             "install failed; refreshing the package index (${PM} update) and retrying once ..."
        $SUDO "$PM" update \
          || warn "${PM} update 也失败了，仍尝试重试安装 ..." \
                  "${PM} update failed too; retrying the install anyway ..."
        $SUDO "$PM" install -y "$OUT" \
          || die "${PM} 安装失败（已尝试 ${PM} update 后重试），请把上方报错反馈到 ${SITE}" \
                 "${PM} install failed (after a ${PM} update retry); please report the error above at ${SITE}"
      fi
    else
      $SUDO dpkg -i "$OUT" \
        || die "dpkg 安装失败，请把上方报错反馈到 ${SITE}" \
               "dpkg install failed; please report the error above at ${SITE}"
    fi
    ;;
esac

if [ "$INSTALL_MODE" = "apt" ]; then
  ok "GenePad v${VERSION} 已安装（${ARCH} · ${PM}）" \
     "GenePad v${VERSION} installed (${ARCH} via ${PM})"
  echo
  echo "  启动: 终端运行 ${B}genepad${N}，或在应用菜单中找到 GenePad"
  echo "  Launch: run ${B}genepad${N} in a terminal, or find GenePad in your app menu"
else
  ok "GenePad v${VERSION} 已解包安装到 ${PREFIX}（${ARCH}）" \
     "GenePad v${VERSION} unpacked into ${PREFIX} (${ARCH})"
  echo
  echo "  启动: 在应用菜单中找到 GenePad，或运行 ${B}${PREFIX}/bin/genepad${N}"
  echo "  Launch: find GenePad in your app menu, or run ${B}${PREFIX}/bin/genepad${N}"
  case ":${PATH}:" in
    *":${PREFIX}/bin:"*) ;;
    *)
      warn "命令行入口不在 PATH 中: 把 ${B}${PREFIX}/bin${N} 加入 PATH 后才能直接运行 ${B}genepad${N}（菜单启动不受影响）" \
           "the command-line entry is not on PATH; add ${PREFIX}/bin to PATH to run ${B}genepad${N} directly (the menu launcher works regardless)"
      ;;
  esac
  echo
  echo "  卸载: 删除以下文件即可 / to uninstall, remove:"
  echo "    rm -f '${PREFIX}/bin/genepad'"
  echo "    rm -f '${PREFIX}/share/applications/GenePad.desktop' '${PREFIX}/share/applications/genepad-plasmid-library.desktop'"
  echo "    rm -f '${PREFIX}/share/mime/packages/genepad.xml'"
  echo "    find '${PREFIX}/share/icons/hicolor' -name 'genepad*' -delete"
fi
