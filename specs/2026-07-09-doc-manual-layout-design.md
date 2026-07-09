# 设计文档：技术支持页改说明书布局（左目录 + 右正文）

**日期：** 2026-07-09
**范围：** `docs/tech-*.html`（5 个技术文档页）+ `docs/styles.css`
**目标：** 把技术支持区从"hero + 卡片网格"营销风格改成层次清晰的"说明书/文档站"风格：持久左侧目录 + 右侧限宽正文 + 面包屑。

**前置工作：** 本仓库已完成的"配色令牌化 + footer/meta 修复 + 文档内容补全"全部保留，本设计只改布局，不动已补全的内容与配色令牌。

---

## 一、布局结构

```
┌─ 顶栏（品牌 + 移动端汉堡）──────────────────────────────┐
├───────────┬────────────────────────────────────────────┤
│ 左侧目录   │ 面包屑：文件格式 › .gen 定义                │
│ (sticky)  │                                           │
│           │ # .gen 文件定义                             │
│ 首页       │ lead + 标签                                 │
│ ─文件格式─ │ ─────────────                              │
│  .gen ●    │ 正文（表 / 折叠项 / code-block 全保留）      │
│  .gjson    │                                           │
│  .dna      │                                           │
│ ─代码示例─ │                                           │
│  Rust      │                                           │
├───────────┴────────────────────────────────────────────┤
│ 页脚                                                    │
└────────────────────────────────────────────────────────┘
```

桌面两栏：左目录 240px + 右正文 flex。正文区限宽居中（max-width ~760px）保证可读。

## 二、去掉的元素

5 个技术页全部移除：
- `section.hero.tech-hero`（大图 hero + lead + hero-actions + hero-stats）
- `div.hero-card-stack`（浮动旋转卡片）
- `tech-support.html` 的 `overview-grid` 卡片网格（改目录首屏）
- 内容页的 `overview-grid`（.gen 的"读取原则"、.dna 的"流程"卡片网格）→ 这些信息转成正文段落或保留为简化卡片，不再是大网格

顶栏 `<nav class="nav">` 的页内锚点链接（表结构/字段映射等）移入左侧目录或正文小标题；左侧目录承担主导航职责。

## 三、左侧目录组件（每页内嵌同一份 HTML）

```html
<aside class="doc-toc" id="doc-toc">
  <a class="doc-toc-home" href="tech-support.html">文档首页</a>
  <p class="doc-toc-group">文件格式</p>
  <a href="tech-gen-format.html">.gen 定义</a>
  <a href="tech-gjson-format.html">.gjson 定义</a>
  <a href="tech-dna-conversion.html">.dna 转换</a>
  <p class="doc-toc-group">代码示例</p>
  <a href="tech-rust-readers.html">Rust 读取</a>
</aside>
```

每页在自己链接上加 `class="current"`。Hub 页（tech-support.html）的"文档首页"自身标 current 或不标。

## 四、正文区

- 顶部面包屑 `<nav class="doc-breadcrumb">文件格式 › .gen 定义</nav>`
- 文档头：`<h1>` + 一句 `lead` + 小标签（version/坐标系等，用 pill）
- 正文内容：原有的 `<details class="schema-item">`、`table`、`pre.code-block`、`p.schema-note` **全部保留**，只是包进 `.doc-content` 容器
- `.schema-band`（深色背景数据表区）保留，作为正文里的深色卡片（像代码块/数据表），形成层次

## 五、Hub 页（tech-support.html）

也用左目录布局：右侧正文首屏显示"欢迎语 + 直接是目录"（与左侧目录呼应），不再用 overview-grid 卡片。保持整个文档区风格统一。

## 六、响应式

- `>1020px`：左目录 240px 固定 sticky + 右正文
- `≤1020px`：目录收成顶部抽屉，点汉堡（复用现有 nav-toggle 机制）展开/收起；正文全宽
- 移动端正文 padding 收紧

## 七、不动

- `docs/index.html`（首页营销页原样）
- `docs/update.json`、`docs/release/`
- 已补全的技术内容（字段/坐标/sqlite3 示例等）
- 已修复的 footer、theme-color、配色令牌

## 八、涉及文件

**修改：**
- `docs/styles.css` — 新增 `.doc-layout`/`.doc-toc`/`.doc-content`/`.doc-breadcrumb` 等布局类
- `docs/tech-support.html` — 改文档布局 + 目录首屏
- `docs/tech-gen-format.html` — 改文档布局
- `docs/tech-gjson-format.html` — 改文档布局
- `docs/tech-rust-readers.html` — 改文档布局
- `docs/tech-dna-conversion.html` — 改文档布局

**不修改：** index.html、update.json、release/。
