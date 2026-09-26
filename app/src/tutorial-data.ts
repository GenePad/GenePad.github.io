import type { TKey } from "./i18n";

/* 使用教程数据（教程中心，持续扩充，每篇教程独立成页）。
   新增一篇教程的完整步骤：
   1. 在 TUTORIALS 末尾追加一个条目（id 即页址后缀，如 "crispr" → /tutorial-crispr），
      并把 id 加入 TUTORIAL_CATEGORIES 中对应分类的 tutorials 数组（决定侧边导航与
      目录页分区归属）；
   2. 在 i18n.tsx 补齐 zh + en 文案：title.tutorial.<id>、tut.toc.<id>.*、
      tut.<id>.*（head/headEn/title/lead/N.name/N.desc/N.shot[/note/video.*]）；
   3. 新建壳页 app/tutorial-<id>.html 与 app/en/tutorial-<id>.html
      （body 上带 data-tutorial="<id>"，script 引 /src/tutorial-detail-main.tsx）；
   4. app/vite.config.ts 增加两个 input；docs/sitemap.xml 增加一条 URL。
   目录卡片、分类分区、侧边导航、面包屑、上一篇/下一篇、下载区编号均自动推导，
   无需改动页面组件。 */

export type TutorialShot = { src: string; shot: TKey };

export type TutorialStep = { name: TKey; desc: TKey; shots: TutorialShot[] };

/** 教程内嵌下载块（语言包等随教程分发的附件）：label 用语言本名，不随界面语言翻译 */
export type TutorialDownload = {
  label: string;
  /** 相对 /release/ 的文件名 */
  file: string;
  size: string;
};

export type TutorialEntry = {
  /** 页址后缀与 i18n 键名前缀：id "ai" → /tutorial-ai、tut.ai.*、tut.toc.ai.* */
  id: string;
  /** 详情页运行时 <title>（随语言切换，与静态壳页一致） */
  pageTitle: TKey;
  /** 目录卡片文案 */
  toc: { name: TKey; desc: TKey; en: TKey };
  /** 章节眉题（面包屑与引言上方，如「教程一 · 配置 AI」） */
  head: TKey;
  headEn: TKey;
  /** 页内大标题与引言 */
  title: TKey;
  lead: TKey;
  steps: TutorialStep[];
  /** 步骤后的附件下载块（可选，如官方语言包） */
  downloads?: { heading: TKey; hint: TKey; files: TutorialDownload[] };
  /** 步骤后的补充说明（可选） */
  note?: TKey;
  /** 章节末尾内嵌视频（可选，目前支持 B 站播放器） */
  video?: { head: TKey; lead: TKey; caption: TKey; embed: string };
};

export const TUTORIALS: TutorialEntry[] = [
  {
    id: "ai",
    pageTitle: "title.tutorial.ai",
    toc: { name: "tut.toc.ai.name", desc: "tut.toc.ai.desc", en: "tut.toc.ai.en" },
    head: "tut.ai.head",
    headEn: "tut.ai.headEn",
    title: "tut.ai.title",
    lead: "tut.ai.lead",
    steps: [
      {
        name: "tut.ai.1.name",
        desc: "tut.ai.1.desc",
        shots: [{ src: "shots/tutorial-01.webp", shot: "tut.ai.1.shot" }],
      },
      {
        name: "tut.ai.2.name",
        desc: "tut.ai.2.desc",
        shots: [{ src: "shots/tutorial-02.webp", shot: "tut.ai.2.shot" }],
      },
      {
        name: "tut.ai.3.name",
        desc: "tut.ai.3.desc",
        shots: [{ src: "shots/tutorial-03.webp", shot: "tut.ai.3.shot" }],
      },
      {
        name: "tut.ai.4.name",
        desc: "tut.ai.4.desc",
        shots: [{ src: "shots/library-03.webp", shot: "lib.setup.3.shot" }],
      },
      {
        name: "tut.ai.5.name",
        desc: "tut.ai.5.desc",
        shots: [{ src: "shots/library-04.webp", shot: "lib.setup.4.shot" }],
      },
    ],
    note: "tut.ai.note",
  },
  {
    id: "library",
    pageTitle: "title.tutorial.library",
    toc: { name: "tut.toc.lib.name", desc: "tut.toc.lib.desc", en: "tut.toc.lib.en" },
    head: "tut.lib.head",
    headEn: "tut.lib.headEn",
    title: "tut.lib.title",
    lead: "tut.lib.lead",
    steps: [
      {
        name: "tut.lib.1.name",
        desc: "tut.lib.1.desc",
        shots: [{ src: "shots/library-05.webp", shot: "lib.setup.5.shot" }],
      },
      {
        name: "tut.lib.2.name",
        desc: "tut.lib.2.desc",
        shots: [{ src: "shots/library-06.webp", shot: "lib.hero.shot" }],
      },
      {
        name: "tut.lib.3.name",
        desc: "tut.lib.3.desc",
        shots: [{ src: "shots/library-08.webp", shot: "lib.tags.shot" }],
      },
      {
        name: "tut.lib.4.name",
        desc: "tut.lib.4.desc",
        shots: [{ src: "shots/library-10.webp", shot: "lib.ai.shot2" }],
      },
      {
        name: "tut.lib.5.name",
        desc: "tut.lib.5.desc",
        shots: [{ src: "shots/library-07.webp", shot: "lib.daily.shot" }],
      },
    ],
    note: "tut.lib.note",
  },
  {
    id: "ngs",
    pageTitle: "title.tutorial.ngs",
    toc: { name: "tut.toc.ngs.name", desc: "tut.toc.ngs.desc", en: "tut.toc.ngs.en" },
    head: "tut.ngs.head",
    headEn: "tut.ngs.headEn",
    title: "tut.ngs.title",
    lead: "tut.ngs.lead",
    steps: [
      {
        name: "tut.ngs.1.name",
        desc: "tut.ngs.1.desc",
        shots: [{ src: "shots/ngs-04.webp", shot: "ngs.open.2.shot" }],
      },
      {
        name: "tut.ngs.2.name",
        desc: "tut.ngs.2.desc",
        shots: [{ src: "shots/ngs-05.webp", shot: "ngs.pair.shot" }],
      },
      {
        name: "tut.ngs.3.name",
        desc: "tut.ngs.3.desc",
        shots: [{ src: "shots/ngs-01.webp", shot: "ngs.reads.shot" }],
      },
      {
        name: "tut.ngs.4.name",
        desc: "tut.ngs.4.desc",
        shots: [{ src: "shots/ngs-06.webp", shot: "ngs.aa.shot" }],
      },
      {
        name: "tut.ngs.5.name",
        desc: "tut.ngs.5.desc",
        shots: [{ src: "shots/ngs-07.webp", shot: "ngs.trim.shot" }],
      },
      {
        name: "tut.ngs.6.name",
        desc: "tut.ngs.6.desc",
        shots: [
          { src: "shots/ngs-08.webp", shot: "ngs.report.shot1" },
          { src: "shots/ngs-09.webp", shot: "ngs.report.shot2" },
        ],
      },
    ],
    video: {
      head: "ngs.video.head",
      lead: "ngs.video.lead",
      caption: "ngs.video.caption",
      embed:
        "https://player.bilibili.com/player.html?isOutside=true&aid=117166909163477&bvid=BV1bS4R6rEyF&cid=41324707953&p=1",
    },
  },
  {
    id: "lang",
    pageTitle: "title.tutorial.lang",
    toc: { name: "tut.toc.lang.name", desc: "tut.toc.lang.desc", en: "tut.toc.lang.en" },
    head: "tut.lang.head",
    headEn: "tut.lang.headEn",
    title: "tut.lang.title",
    lead: "tut.lang.lead",
    steps: [
      {
        name: "tut.lang.1.name",
        desc: "tut.lang.1.desc",
        shots: [{ src: "shots/tutorial-01.webp", shot: "tut.ai.1.shot" }],
      },
      {
        name: "tut.lang.2.name",
        desc: "tut.lang.2.desc",
        shots: [{ src: "shots/tutorial-lang-01.webp", shot: "tut.lang.2.shot" }],
      },
      {
        name: "tut.lang.3.name",
        desc: "tut.lang.3.desc",
        shots: [{ src: "shots/tutorial-lang-02.webp", shot: "tut.lang.3.shot" }],
      },
      {
        name: "tut.lang.4.name",
        desc: "tut.lang.4.desc",
        shots: [{ src: "shots/tutorial-lang-03.webp", shot: "tut.lang.4.shot" }],
      },
      {
        name: "tut.lang.5.name",
        desc: "tut.lang.5.desc",
        shots: [{ src: "shots/tutorial-lang-04.webp", shot: "tut.lang.5.shot" }],
      },
    ],
    note: "tut.lang.note",
  },
  {
    id: "langpack",
    pageTitle: "title.tutorial.langpack",
    toc: { name: "tut.toc.langpack.name", desc: "tut.toc.langpack.desc", en: "tut.toc.langpack.en" },
    head: "tut.langpack.head",
    headEn: "tut.langpack.headEn",
    title: "tut.langpack.title",
    lead: "tut.langpack.lead",
    steps: [
      {
        name: "tut.langpack.1.name",
        desc: "tut.langpack.1.desc",
        shots: [{ src: "shots/tutorial-setup-01.webp", shot: "tut.langpack.1.shot" }],
      },
      {
        name: "tut.langpack.2.name",
        desc: "tut.langpack.2.desc",
        shots: [{ src: "shots/tutorial-setup-02.webp", shot: "tut.langpack.2.shot" }],
      },
      {
        name: "tut.langpack.3.name",
        desc: "tut.langpack.3.desc",
        shots: [{ src: "shots/tutorial-setup-03.webp", shot: "tut.langpack.3.shot" }],
      },
      {
        name: "tut.langpack.4.name",
        desc: "tut.langpack.4.desc",
        shots: [
          { src: "shots/tutorial-setup-fr.webp", shot: "tut.langpack.4.shot1" },
          { src: "shots/tutorial-setup-ko.webp", shot: "tut.langpack.4.shot2" },
          { src: "shots/tutorial-setup-ru.webp", shot: "tut.langpack.4.shot3" },
          { src: "shots/tutorial-setup-de.webp", shot: "tut.langpack.4.shot4" },
          { src: "shots/tutorial-setup-ja.webp", shot: "tut.langpack.4.shot5" },
        ],
      },
    ],
    downloads: {
      heading: "tut.langpack.dl.title",
      hint: "tut.langpack.dl.hint",
      files: [
        { label: "Deutsch", file: "GenePad-langpack-de.json", size: "148 KB" },
        { label: "Français", file: "GenePad-langpack-fr.json", size: "149 KB" },
        { label: "日本語", file: "GenePad-langpack-ja.json", size: "155 KB" },
        { label: "한국어", file: "GenePad-langpack-ko.json", size: "144 KB" },
        { label: "Русский", file: "GenePad-langpack-ru.json", size: "207 KB" },
      ],
    },
    note: "tut.langpack.note",
  },
];

/** 教程详情页地址（相对链接，中文主机 / en 镜像 / GitHub Pages 均适用；
    无扩展名——.html 在 Cloudflare Pages 上会 308 跳一次，见站点 SEO 约定） */
export function tutorialHref(tut: TutorialEntry): string {
  return `tutorial-${tut.id}`;
}

/* ── 教程分类：目录页分区与侧边导航的骨架 ── */
export type TutorialCategory = {
  id: string;
  /** 分类名（如「快速上手」）与等宽英文标注（如 GETTING STARTED） */
  name: TKey;
  en: TKey;
  /** 分类一句话说明（目录页分区展示） */
  desc: TKey;
  /** 本分类下的教程 id，按展示顺序 */
  tutorials: string[];
};

export const TUTORIAL_CATEGORIES: TutorialCategory[] = [
  {
    id: "getting-started",
    name: "tut.cat.gs.name",
    en: "tut.cat.gs.en",
    desc: "tut.cat.gs.desc",
    tutorials: ["ai", "library", "lang", "langpack"],
  },
  {
    id: "analysis",
    name: "tut.cat.analysis.name",
    en: "tut.cat.analysis.en",
    desc: "tut.cat.analysis.desc",
    tutorials: ["ngs"],
  },
];

/** 按分类取教程条目（按分类内声明顺序返回） */
export function tutorialsInCategory(cat: TutorialCategory): TutorialEntry[] {
  return cat.tutorials
    .map((id) => TUTORIALS.find((x) => x.id === id))
    .filter((x): x is TutorialEntry => Boolean(x));
}

/** 教程在全集中的序号（0 起）：目录卡片与侧边导航的全局编号 */
export function tutorialNo(tut: TutorialEntry): number {
  return TUTORIALS.findIndex((x) => x.id === tut.id);
}
