#!/usr/bin/env bash
# =============================================================
#  GenePad Linux 一键安装脚本
#
#  用法:
#    curl -fsSL https://genepad.cn/release/linux/install.sh | bash
#
#  可选环境变量:
#    GENEPAD_VERSION=x.y.z   指定版本（默认自动读取最新版）
#    GENEPAD_DRY_RUN=1       只打印将执行的操作，不下载不安装
#    GENEPAD_SKIP_INSTALL=1  只下载到当前目录，不安装
# =============================================================
set -u

REPO_SLUG="GenePad/GenePad.github.io"
SITE="https://genepad.cn"
GITEE_DL="https://gitee.com/${REPO_SLUG}/releases/download"
GITHUB_DL="https://github.com/${REPO_SLUG}/releases/latest/download"

DRY_RUN="${GENEPAD_DRY_RUN:-0}"
SKIP_INSTALL="${GENEPAD_SKIP_INSTALL:-0}"

# ---------- 输出工具 ----------
if [ -t 1 ]; then
  B=$'\033[1m'; G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; N=$'\033[0m'
else
  B=''; G=''; Y=''; R=''; N=''
fi
say()  { printf '%s\n' "${B}==>${N} $*"; }
ok()   { printf '%s\n' "${G}完成:${N} $*"; }
warn() { printf '%s\n' "${Y}警告:${N} $*" >&2; }
die()  { printf '%s\n' "${R}错误:${N} $*" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || die "未找到 curl，请先安装 curl 再运行本脚本"
TMP="$(mktemp -d /tmp/genepad-install.XXXXXX)" || die "无法创建临时目录"
trap 'rm -rf "$TMP"' EXIT

# ---------- 1. 识别 CPU 架构 ----------
case "$(uname -m)" in
  x86_64|amd64)  ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) die "不支持的 CPU 架构: $(uname -m)（目前提供 x86_64 与 ARM64 安装包）" ;;
esac
say "检测到架构: ${ARCH}"

# ---------- 2. 识别包管理器 ----------
has() { command -v "$1" >/dev/null 2>&1; }

PKG_TYPE="" PM=""
if has apt-get;       then PKG_TYPE="deb"; PM="apt-get"
elif has apt;         then PKG_TYPE="deb"; PM="apt"
elif has dnf;         then PKG_TYPE="rpm"; PM="dnf"
elif has yum;         then PKG_TYPE="rpm"; PM="yum"
elif has zypper;      then PKG_TYPE="rpm"; PM="zypper"
else                        PKG_TYPE="tgz"; PM=""
fi

if [ "$PKG_TYPE" = "tgz" ]; then
  has tar || die "未检测到 deb/rpm 包管理器，且未找到 tar，无法安装"
  say "未检测到 deb/rpm 包管理器，将使用 tar.gz 解压安装到 /usr/local/bin"
else
  say "检测到包管理器: ${PM}（.${PKG_TYPE} 包）"
fi

# ---------- 3. 确定版本 ----------
VERSION="${GENEPAD_VERSION:-}"
if [ -z "$VERSION" ]; then
  say "获取最新版本号 ..."
  for ju in \
    "${SITE}/update.json" \
    "https://gitee.com/${REPO_SLUG}/raw/main/docs/update.json" \
    "https://raw.githubusercontent.com/${REPO_SLUG}/main/docs/update.json"; do
    VERSION="$(curl -fsSL --connect-timeout 10 "$ju" 2>/dev/null \
      | grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' | head -n 1 \
      | sed 's/.*"\([0-9][0-9.]*\)"$/\1/')" || true
    [ -n "$VERSION" ] && break
  done
  [ -n "$VERSION" ] || die "无法获取最新版本号。可先设置 GENEPAD_VERSION=x.y.z 再运行本脚本"
fi
say "安装版本: v${VERSION}"

# ---------- 4. 组装文件名与下载地址 ----------
FILE="GenePad_${VERSION}_Linux_${ARCH}.${PKG_TYPE}"
urls=(
  "${SITE}/release/linux/${FILE}"
  "${GITEE_DL}/v${VERSION}/${FILE}"
  "${GITHUB_DL}/${FILE}"
)

if [ "$DRY_RUN" = "1" ]; then
  echo
  say "DRY RUN — 将执行以下操作:"
  echo "    文件: ${FILE}"
  for u in "${urls[@]}"; do echo "    下载: $u"; done
  if [ "$PKG_TYPE" = "tgz" ]; then
    echo "    安装: 解压 ${FILE} -> /usr/local/bin/genepad"
  else
    echo "    安装: sudo ${PM} install ${FILE}"
  fi
  exit 0
fi

# ---------- 5. 下载（进度条 + 失败换源重试） ----------
OUT="${TMP}/${FILE}"
attempt=1; mi=0; MAX_TRY=6
while :; do
  url="${urls[$(( mi % ${#urls[@]} ))]}"
  say "下载 ${FILE}"
  echo "    ${url}"
  if curl -fL --progress-bar --connect-timeout 15 --speed-time 30 --speed-limit 1024 -o "$OUT" "$url"; then
    break
  fi
  rc=$?
  [ "$attempt" -ge "$MAX_TRY" ] && die "下载失败（curl 退出码 ${rc}）。请检查网络，或到 ${SITE} 手动下载"
  warn "下载失败（curl 退出码 ${rc}），第 ${attempt}/${MAX_TRY} 次尝试，换源重试 ..."
  attempt=$((attempt + 1)); mi=$((mi + 1)); sleep 2
done
[ -s "$OUT" ] || die "下载产物为空，安装中止"
say "下载完成: ${OUT}"

if [ "$SKIP_INSTALL" = "1" ]; then
  cp -f "$OUT" "${PWD}/${FILE}" || die "复制到当前目录失败"
  ok "GENEPAD_SKIP_INSTALL=1，已跳过安装。文件已保存: ${PWD}/${FILE}"
  exit 0
fi

# ---------- 6. 安装 ----------
if [ "$(id -u)" = "0" ]; then
  SUDO=""
else
  has sudo || die "当前不是 root 且未安装 sudo，无法提权安装"
  SUDO="sudo"
fi

case "$PKG_TYPE" in
  deb)
    say "使用 ${PM} 安装 ..."
    if [ "$PM" = "apt-get" ] || [ "$PM" = "apt" ]; then
      $SUDO "$PM" install -y "$OUT" || die "${PM} 安装失败，请把上方报错反馈到 ${SITE}"
    else
      $SUDO dpkg -i "$OUT" || die "dpkg 安装失败，请把上方报错反馈到 ${SITE}"
    fi
    ;;
  rpm)
    say "使用 ${PM} 安装 ..."
    case "$PM" in
      dnf|yum) $SUDO "$PM" install -y "$OUT" || die "${PM} 安装失败，请把上方报错反馈到 ${SITE}" ;;
      zypper)  $SUDO zypper --non-interactive install "$OUT" || die "zypper 安装失败，请把上方报错反馈到 ${SITE}" ;;
    esac
    ;;
  tgz)
    say "解压安装到 /usr/local/bin ..."
    tar -xzf "$OUT" -C "$TMP" || die "解压失败"
    [ -f "${TMP}/genepad" ] || die "压缩包内容与预期不符（未找到 genepad 可执行文件）"
    $SUDO install -m 0755 "${TMP}/genepad" /usr/local/bin/genepad \
      || die "安装到 /usr/local/bin 失败"
    ;;
esac

ok "GenePad v${VERSION} 已安装（${ARCH} / ${PKG_TYPE}）"
echo
echo "  启动: 终端运行 ${B}genepad${N}，或在应用菜单中找到 GenePad"
