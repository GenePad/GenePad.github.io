/* 安装包下载数据：三个来源 = 本站直链 / Gitee / GitHub
   发新版本时只需更新 VERSION 与各文件的 name/size（size 单位 MB） */

export const VERSION = "0.7.1";

const GITHUB_LATEST =
  "https://github.com/GenePad/GenePad.github.io/releases/latest/download/";
const GITEE_TAG = `https://gitee.com/GenePad/GenePad.github.io/releases/download/v${VERSION}/`;

export interface DownloadFile {
  name: string;
  size: string;
}

export type PlatformId =
  | "windows"
  | "mac"
  | "linux-x64"
  | "android";

export interface PlatformDownloads {
  id: PlatformId;
  files: DownloadFile[];
  sparkStore?: boolean;
}

function withSources(f: DownloadFile) {
  return {
    ...f,
    sources: {
      /* 根相对路径：en.genepad.cn 镜像页与本地 dev 的 /en/ 路径下也不会 404（解析结果与原相对写法一致） */
      direct: `/release/${f.name.endsWith(".apk") ? "android" : f.name.includes("Windows") ? "windows" : f.name.includes("Darwin") ? "mac" : "linux"}/${f.name}`,
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
      { name: `GenePad_${VERSION}_Windows_amd64.zip`, size: "9.2 MB" },
    ].map(withSources),
  },
  {
    id: "mac",
    files: [
      { name: `GenePad_${VERSION}_Darwin_arm64.dmg`, size: "11.5 MB" },
    ].map(withSources),
  },
  {
    id: "linux-x64",
    files: [
      { name: `GenePad_${VERSION}_Linux_amd64.deb`, size: "12.3 MB" },
    ].map(withSources),
    sparkStore: true,
  },
  {
    id: "android",
    files: [
      { name: `GenePad-v${VERSION}-android-universal-release.apk`, size: "24.3 MB" },
    ].map(withSources),
  },
];

export const RELEASES_URL =
  "https://github.com/GenePad/GenePad.github.io/releases/latest";
export const GITEE_RELEASES_URL =
  "https://gitee.com/GenePad/GenePad.github.io/releases/latest";
