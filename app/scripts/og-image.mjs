/* 生成社交分享卡 docs/og.png（1200×630），被所有页面的 og:image / twitter:image 引用。
   手动运行：npm run og（改了品牌文案或主截图后重新生成并提交）。
   用无头浏览器渲染而非图像库：中文字形、字体、圆角与站点视觉一致，且不引入额外依赖。 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, "../../docs");
const SHOT = path.join(DOCS_DIR, "shots/light-mode.webp");
const OUT = path.join(DOCS_DIR, "og.png");

const shotDataUri = `data:image/webp;base64,${fs.readFileSync(SHOT).toString("base64")}`;

const HTML = `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #f6f6f4; color: #1c3a13;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
      "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
    display: flex; flex-direction: column;
  }
  .top { flex: 1; display: grid; grid-template-columns: 1fr 520px; gap: 48px; padding: 56px 64px 0; }
  .brand { display: flex; align-items: center; gap: 14px; }
  .ring {
    width: 40px; height: 40px; border-radius: 50%;
    border: 4px solid #2f9a10; border-right-color: rgba(47,154,16,0.28);
    border-bottom-color: rgba(47,154,16,0.55);
  }
  .brand b { font-size: 30px; letter-spacing: -0.02em; }
  .brand span {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 15px; letter-spacing: 0.22em; color: rgba(28,58,19,0.55); margin-left: 4px;
  }
  h1 { margin-top: 34px; font-size: 62px; line-height: 1.12; letter-spacing: -0.03em; }
  h1 em { font-style: normal; color: #2f9a10; }
  .lead { margin-top: 22px; font-size: 21px; line-height: 1.7; color: rgba(28,58,19,0.72); max-width: 560px; }
  .chips { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; }
  .chips span {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 14px; letter-spacing: 0.06em; padding: 7px 12px;
    border: 1px solid rgba(28,58,19,0.28); color: rgba(28,58,19,0.8);
  }
  .shot { align-self: end; }
  .shot img {
    display: block; width: 520px; height: 372px; object-fit: cover; object-position: top left;
    border: 8px solid #fff; box-shadow: 0 26px 60px -26px rgba(28,58,19,0.5);
  }
  .bar {
    height: 84px; background: #1c3a13; color: #f6f6f4;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 64px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 16px; letter-spacing: 0.12em;
  }
  .bar b { color: #58d92f; font-weight: 600; }
</style></head>
<body>
  <div class="top">
    <div>
      <div class="brand"><div class="ring"></div><b>GenePad</b><span>基因工坊</span></div>
      <h1>轻量跨平台的<br>基因图谱<em>编辑器</em></h1>
      <p class="lead">质粒图谱编辑 · 序列标注 · 酶切分析 · Sanger 峰图比对，面向日常分子克隆。</p>
      <div class="chips"><span>GEN</span><span>GenBank</span><span>FASTA</span><span>.dna</span><span>AB1</span><span>GJSON</span></div>
    </div>
    <div class="shot"><img src="${shotDataUri}" alt=""></div>
  </div>
  <div class="bar"><span><b>genepad.cn</b> · en.genepad.cn</span><span>WINDOWS · MACOS · LINUX · ANDROID</span></div>
</body></html>`;

const headless = await launchBrowser({ width: 1200, height: 630 });
try {
  const page = await headless.browser.newPage();
  await page.setContent(HTML, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const img = document.querySelector("img");
    if (img && !img.complete) await img.decode();
  });
  await page.screenshot({ path: OUT, type: "png" });
} finally {
  await headless.close();
}

const { size } = fs.statSync(OUT);
console.log(`已生成 docs/og.png（1200×630，${Math.round(size / 1024)} KB）`);
