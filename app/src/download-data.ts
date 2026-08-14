/* 安装包下载数据：三个来源 = 本站直链 / Gitee / GitHub
   发新版本时只需更新 VERSION 与各文件的 name/size（size 单位 MB） */

export const VERSION = "0.6.2";

const GITHUB_LATEST =
  "https://github.com/GenePad/GenePad.github.io/releases/latest/download/";
const GITEE_TAG = `https://gitee.com/GenePad/GenePad.github.io/releases/download/v${VERSION}/`;

export interface DownloadFile {
  name: string;
  size: string;
  arch?: "x86_64" | "arm64";
}

export interface PlatformDownloads {
  id: "windows" | "mac" | "linux" | "android";
  files: DownloadFile[];
  sparkStore?: boolean;
}

function withSources(f: DownloadFile) {
  return {
    ...f,
    sources: {
      direct: `release/${f.name.startsWith("macos") ? "mac" : f.name.endsWith(".apk") ? "android" : f.name.includes("Windows") ? "windows" : "linux"}/${f.name}`,
      github: `${GITHUB_LATEST}${f.name}`,
      gitee: `${GITEE_TAG}${f.name}`,
    },
  };
}

export const PLATFORMS: (Omit<PlatformDownloads, "files"> & {
  files: ReturnType<typeof withSources>[];
})[] = [
  {
    id: "windows",
    files: [
      { name: `GenePad_${VERSION}_Windows_amd64.zip`, size: "7.0 MB" },
    ].map(withSources),
  },
  {
    id: "mac",
    files: [
      { name: "macos-dmg.zip", size: "9.5 MB" },
      { name: "macos-app.zip", size: "8.4 MB" },
    ].map(withSources),
  },
  {
    id: "linux",
    files: (
      [
        { name: `GenePad_${VERSION}_Linux_amd64.deb`, size: "9.2 MB", arch: "x86_64" },
        { name: `GenePad_${VERSION}_Linux_amd64.rpm`, size: "9.2 MB", arch: "x86_64" },
        { name: `GenePad_${VERSION}_Linux_amd64.tar.gz`, size: "8.7 MB", arch: "x86_64" },
        { name: `GenePad_${VERSION}_Linux_arm64.deb`, size: "8.9 MB", arch: "arm64" },
        { name: `GenePad_${VERSION}_Linux_arm64.rpm`, size: "8.9 MB", arch: "arm64" },
        { name: `GenePad_${VERSION}_Linux_arm64.tar.gz`, size: "8.4 MB", arch: "arm64" },
      ] as DownloadFile[]
    ).map(withSources),
    sparkStore: true,
  },
  {
    id: "android",
    files: [{ name: "app-universal-release.apk", size: "18.0 MB" }].map(withSources),
  },
];

export const RELEASES_URL =
  "https://github.com/GenePad/GenePad.github.io/releases/latest";
export const GITEE_RELEASES_URL =
  "https://gitee.com/GenePad/GenePad.github.io/releases/latest";
