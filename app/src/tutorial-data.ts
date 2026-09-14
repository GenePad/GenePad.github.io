import type { TKey } from "./i18n";

/* 使用教程数据（教程中心，持续扩充）。
   新增一篇教程：在 TUTORIALS 末尾追加一个条目，并在 i18n.tsx 中补齐
   tut.toc.<id>.* 与 tut.<prefix>.*（head/headEn/title/lead/N.name/N.desc/N.shot[/note]）
   的 zh + en 文案即可——目录卡片、章节编号（10-A、10-B…）、锚点与底部
   下载区编号均由本数组自动推导，无需改动 Tutorial.tsx。 */

export type TutorialShot = { src: string; shot: TKey };

export type TutorialStep = { name: TKey; desc: TKey; shots: TutorialShot[] };

export type TutorialEntry = {
  /** 页内锚点（#tut-ai），同时用作 i18n 目录键名 tut.toc.<id>.* */
  id: string;
  /** 目录卡片文案 */
  toc: { name: TKey; desc: TKey; en: TKey };
  /** 章节眉题（GroupLabel） */
  head: TKey;
  headEn: TKey;
  /** 章节内大标题与引言 */
  title: TKey;
  lead: TKey;
  steps: TutorialStep[];
  /** 步骤后的补充说明（可选） */
  note?: TKey;
  /** 章节末尾内嵌视频（可选，目前支持 B 站播放器） */
  video?: { head: TKey; lead: TKey; caption: TKey; embed: string };
};

export const TUTORIALS: TutorialEntry[] = [
  {
    id: "tut-ai",
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
    id: "tut-lib",
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
    id: "tut-ngs",
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
];
