# 网站结构优化、配色统一与技术文档补全 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 统一 GenePad 静态站的配色令牌与排版尺度，修复拆页遗留的 footer/meta/导航 bug，并按源码把 `.gen`/`.gjson`/`.dna` 技术文档补全到可复刻程度。

**Architecture:** 纯静态站（HTML + 单一 styles.css，无构建工具）。改动集中在 `docs/styles.css` 的 `:root` 令牌、各 HTML 页面的 head/导航/footer，以及 4 个技术文档页的内容。不引入依赖、不动 `update.json` 与下载逻辑。

**Tech Stack:** 手写 HTML5、CSS（自定义属性/CSS 变量）、Font Awesome 6.5.1（仅 index.html）。

**源码核对基准**（实施时所有字段/常量以此为准）：
- `.gen`: `src/utils/schema.ts`（`BLOCK_SIZE=10000` L1、`SCHEMA_VERSION=5` L3、CREATE_TABLES_SQL L15-121）、`sqljsDAL.ts`（project_meta keys L681-691、undo cap `200` L571）、`dna.ts:442-456`（环形坐标 `getFeatureLength`）
- `.gjson`: `src/utils/formats/gjson.ts`（`GJSON_VERSION='1.9'` L5、`GjsonFile` L32-56、writer L130-191）
- `.dna`: `src/utils/snapgeneParser.ts`（cookie L154-159、DNA flags L169-179、primer +1 L339-345、StrandColors +1 L63-67）、`src-tauri/src/snapgene_parser.rs`（cookie L469-481）。**`0x7f` 在生产代码中已不存在**（仅测试断言其不存在）。

**关键发现（影响文档措辞）：**
- `SCHEMA_VERSION=5` 被定义但**从未持久化**——`schema_version` 表存在但为空。文档不能让读者依赖该表做版本判断。
- `project_meta` 是通用 key/value 表（仅 key/value 两列），无独立列。布尔值存为字符串 `'true'`/`'false'`，缺键=undefined。
- `.gjson` **不存**：undo/edit 历史、attachments、chromatogram（含 `alignmentEntries[].chromatogram`）、Dam/Dcm 甲基化。
- `0x7f` 私有包：源码已移除，文档不提（现有页面 L38/L190/L195 有提及，需删除）。

---

## 文件结构

**修改：**
- `docs/styles.css` — `:root` 扩展令牌、深色模式补全、字体栈去 Inter、折叠组件合并、圆角/间距令牌
- `docs/index.html` — 轮播 7 色提令牌
- `docs/tech-support.html` — 卡片引导语、footer 修中文+样式、导航统一
- `docs/tech-gen-format.html` — 补全表结构/坐标/示例 + head/footer/导航修复
- `docs/tech-gjson-format.html` — 补全"不存什么"/对象字段 + head/footer/导航修复
- `docs/tech-rust-readers.html` — 补依赖说明/预期输出 + head/footer/导航修复
- `docs/tech-dna-conversion.html` — 删 `0x7f`、补 flags/坐标转换 + head/footer/导航修复

**删除：**
- `docs/superpowers/specs/2026-06-01-i18n-language-switcher-design.md`

**不修改：** `docs/update.json`、`docs/release/*`、下载逻辑、版本号。

---

## Task 1: 扩展 `:root` 设计令牌（styles.css）

**Files:**
- Modify: `docs/styles.css:1-32`（`:root` 块）

- [ ] **Step 1: 在 `:root` 末尾（L31 `--shadow` 之后、`}` 之前）追加语义/圆角/间距/平台/赞助/特征色令牌**

把这段插入到 `--shadow: 0 24px 70px rgba(16, 30, 54, 0.16);` 这一行之后：

```css
  /* —— 语义别名（为将来换主色留口）—— */
  --accent: var(--blue);
  --success: var(--green);
  --warn: var(--orange);
  --green-dark: #1d6e58;
  /* —— 圆角令牌（统一当前 8/12/14/18 混用）—— */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  /* —— 间距令牌 —— */
  --space-card: 24px;
  /* —— 平台渐变对 —— */
  --platform-win: linear-gradient(135deg, #244b8f, #2f6fed);
  --platform-mac: linear-gradient(135deg, #1d6e58, #38a16f);
  --platform-linux: linear-gradient(135deg, #b45f21, #f29a45);
  --platform-android: linear-gradient(135deg, #2d2d5e, #5b5baa);
  /* —— 赞助品牌粉 —— */
  --sponsor-1: #ff6a9a;
  --sponsor-2: #c44cd6;
  /* —— 深色色带亮色文字 —— */
  --dark-accent-green: #86d7c0;
  --dark-accent-cyan: #90e1cb;
  --dark-accent-violet: #a8b4ff;
  --dark-accent-blue: #b8c8ff;
  /* —— 质粒图谱特征色（与 index.html 轮播一致）—— */
  --feature-1: #ffc344;
  --feature-2: #f06767;
  --feature-3: #3f62eb;
  --feature-4: #fce102;
  --feature-5: #5ed938;
  --feature-6: #8fdbe9;
  --feature-7: #fd7aff;
```

- [ ] **Step 2: 提交**

```bash
git add docs/styles.css
git commit -m "style(css): add design tokens for radius, spacing, platform, sponsor, features"
```

---

## Task 2: 字体栈去掉未加载的 Inter

**Files:**
- Modify: `docs/styles.css:46`（`body` 的 `font-family`）

Inter 在栈里声明却从未 `@import`/`@font-face`，静默落回 Segoe UI/YaHei。去掉它。

- [ ] **Step 1: 修改 body font-family**

把 `docs/styles.css:46`：
```css
  font-family: Inter, "Segoe UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
```
改为：
```css
  font-family: "Segoe UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
```

- [ ] **Step 2: 全仓确认没有其它 Inter 引用**

Run: `grep -rn "Inter" docs/`
Expected: 无输出（或仅注释）。若有其它 `font-family: Inter` 处一并删除 Inter。

- [ ] **Step 3: 提交**

```bash
git add docs/styles.css
git commit -m "style(css): drop unloaded Inter from font stack"
```

---

## Task 3: 深色模式补全新令牌

**Files:**
- Modify: `docs/styles.css:2353-2383`（`@media (prefers-color-scheme: dark)` 内的 `:root`）

- [ ] **Step 1: 在深色模式 `:root` 的 `--shadow` 行（L2376）之后追加新令牌的深色值**

在 `--shadow: 0 24px 70px rgba(0, 0, 0, 0.4);` 之后插入：
```css
    --green-dark: #2f855a;
    --code-bg: #1a2a40;
    --sponsor-1: #ff8ab5;
    --sponsor-2: #d76be8;
```
（注意：深色块里已有 `--code-bg: #1a2a40;` 在 L2375，不要重复——把它加在 `--shadow` 之后时只加 `--green-dark`/`--sponsor-1`/`--sponsor-2` 三行，避免与已有 `--code-bg` 重复。）

- [ ] **Step 2: 提交**

```bash
git add docs/styles.css
git commit -m "style(css): add dark-mode values for new tokens"
```

---

## Task 4: 轮播特征色提令牌（index.html）

**Files:**
- Modify: `docs/index.html:1254`

轮播里硬编码的 7 个特征色脱离设计系统。改成引用 Task 1 定义的 `--feature-*` 令牌。由于这是 JS 字符串内联 SVG `<style>`，CSS 变量需通过 `getComputedStyle` 读取或直接用 `var()`。SVG inline `<style>` 在内联场景可用 `var()`。

- [ ] **Step 1: 把硬编码色改为 var() 引用**

把 `docs/index.html:1254`：
```js
                '<defs><style>.s-c1{fill:#FFC344}.s-c2{fill:#F06767}.s-c3{fill:#3F62EB}.s-c4{fill:#FCE102}.s-c5{fill:#5ED938}.s-c6{fill:#8FDBE9}.s-c7{fill:#FD7AFF}</style></defs>' +
```
改为：
```js
                '<defs><style>.s-c1{fill:var(--feature-1)}.s-c2{fill:var(--feature-2)}.s-c3{fill:var(--feature-3)}.s-c4{fill:var(--feature-4)}.s-c5{fill:var(--feature-5)}.s-c6{fill:var(--feature-6)}.s-c7{fill:var(--feature-7)}</style></defs>' +
```

- [ ] **Step 2: 浏览器打开 index.html 确认质粒图谱颜色不变**

用浏览器打开 `docs/index.html`，检查 hero 轮播里的质粒图谱圆环特征色仍正常显示（7 色与之前一致）。CSS 变量在 inline SVG `<style>` 中由 `:root` 解析，颜色应不变。

- [ ] **Step 3: 提交**

```bash
git add docs/index.html
git commit -m "refactor(index): replace hardcoded carousel colors with --feature tokens"
```

---

## Task 5: 下载区硬编码绿提令牌（styles.css）

**Files:**
- Modify: `docs/styles.css:799, 820, 877, 893` 及相关 `rgba(56,161,111,...)` 背景

下载区用了 `#2f855a`/`#22543d` 等与 `--green` 语义重复但色值不同的硬编码绿。统一到 `--green`/`--green-dark`。

- [ ] **Step 1: 替换 `.dl-arch-title` 的 color（L799）**

`color: #2f855a;` → `color: var(--green-dark);`

- [ ] **Step 2: 替换 `.dl-mac-install-title` 的 color（L820）**

`color: #2f855a;` → `color: var(--green-dark);`

- [ ] **Step 3: 替换 `.dl-mac-copy-btn` 的 color（L877）**

`color: #2f855a;` → `color: var(--green-dark);`

- [ ] **Step 4: 替换 `.dl-mac-copy-btn.copied` 的 color（L893）**

`color: #22543d;` → `color: var(--green-dark);`

- [ ] **Step 5: 把 `rgba(56, 161, 111, ...)` 背景统一为 `var(--green)` 的 alpha 形式**

这些 `rgba(56,161,111,X)` 本就是 `--green`(#38a16f) 的透明度变体。为保持 alpha 效果，替换为显式 `rgba(56, 161, 111, X)` 保留（颜色值已与 --green 一致），但把它们统一注释为 `/* --green alpha */`。**实际上 #38a16f = rgb(56,161,111)，数值一致，无需改色值**——本步确认这些 rgba 的数值与 `--green` 一致即可，无需改动。

Run: `grep -n "rgba(56, 161, 111" docs/styles.css`
Expected: 数处，均与 --green rgb 一致。无需修改（仅 #2f855a/#22543d 这类"偏色"的硬编码已在 Step 1-4 修掉）。

- [ ] **Step 6: 提交**

```bash
git add docs/styles.css
git commit -m "style(css): unify download-section greens to --green-dark token"
```

---

## Task 6: 修复 5 个技术页 footer（统一 site-footer）

**Files:**
- Modify: `docs/tech-support.html:110-112`
- Modify: `docs/tech-gen-format.html:234`
- Modify: `docs/tech-gjson-format.html:194`
- Modify: `docs/tech-rust-readers.html:305`
- Modify: `docs/tech-dna-conversion.html:199`

5 个技术页用 `<footer class="footer">`，但 CSS 无 `.footer` 规则（只有 `.site-footer`）。统一为 `site-footer`。

- [ ] **Step 1: tech-support.html footer 修中文 + 类名**

把 `docs/tech-support.html:110-112`：
```html
        <footer class="footer">
            <p>GenePad developer documentation.</p>
        </footer>
```
改为：
```html
        <footer class="site-footer">
            <p>GenePad 开发者技术文档</p>
        </footer>
```

- [ ] **Step 2: tech-gen-format.html footer 类名**

把 L234：
```html
        <footer class="footer"><p><a href="tech-support.html">返回开发者文档</a></p></footer>
```
改为：
```html
        <footer class="site-footer"><p><a href="tech-support.html">返回开发者文档</a></p></footer>
```

- [ ] **Step 3: tech-gjson-format.html footer 类名**

把 L194 `class="footer"` → `class="site-footer"`（内容 `<p><a href="tech-support.html">返回开发者文档</a></p>` 不变）。

- [ ] **Step 4: tech-rust-readers.html footer 类名**

把 L305 `class="footer"` → `class="site-footer"`。

- [ ] **Step 5: tech-dna-conversion.html footer 类名**

把 L199 `class="footer"` → `class="site-footer"`。

- [ ] **Step 6: 提交**

```bash
git add docs/tech-support.html docs/tech-gen-format.html docs/tech-gjson-format.html docs/tech-rust-readers.html docs/tech-dna-conversion.html
git commit -m "fix(tech-pages): unify footer to site-footer class, fix English text"
```

---

## Task 7: 4 个内容页补 theme-color meta

**Files:**
- Modify: `docs/tech-gen-format.html:5` 之后
- Modify: `docs/tech-gjson-format.html:5` 之后
- Modify: `docs/tech-rust-readers.html:5` 之后
- Modify: `docs/tech-dna-conversion.html:5` 之后

4 个内容页缺 `theme-color` meta（首页和 Hub 都有）。

- [ ] **Step 1: 每个内容页在 viewport meta 之后补两行 theme-color**

在每页 `<meta name="viewport" ... />` 这一行之后，插入：
```html
        <meta name="theme-color" content="#f4f7fb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b111d" media="(prefers-color-scheme: dark)" />
```

4 个页面（gen/gjson/rust/dna）都要做，插入位置均在 `<meta name="viewport" ...>` 之后、`<meta name="description"` 之前。

- [ ] **Step 2: 提交**

```bash
git add docs/tech-gen-format.html docs/tech-gjson-format.html docs/tech-rust-readers.html docs/tech-dna-conversion.html
git commit -m "fix(tech-pages): add theme-color meta to content pages"
```

---

## Task 8: 删除误发布的 specs 文档

**Files:**
- Delete: `docs/superpowers/specs/2026-06-01-i18n-language-switcher-design.md`

- [ ] **Step 1: 删除文件**

```bash
git rm docs/superpowers/specs/2026-06-01-i18n-language-switcher-design.md
```

若 `docs/superpowers/` 目录因此为空，一并删除空目录：
```bash
rmdir docs/superpowers/specs docs/superpowers 2>/dev/null || true
```

- [ ] **Step 2: 提交**

```bash
git commit -m "chore(docs): remove mistakenly published design spec from public docs/"
```

---

## Task 9: tech-support.html Hub 优化（导航+引导语）

**Files:**
- Modify: `docs/tech-support.html`

- [ ] **Step 1: 导航统一术语——Hub 的"首页"保留（指向 index.html，与内容页的"文档首页"区分）**

`docs/tech-support.html:34` 已是 `<a href="index.html">首页</a>`，正确，无需改。确认即可。

- [ ] **Step 2: 4 张 overview-card 补"本页覆盖/读完后能做什么"引导语**

把 `docs/tech-support.html:82-105` 的 4 张卡片 `<p>` 描述改为更明确的引导。逐张替换 `<p>` 内容：

第 1 张（.gen，L85）：
```html
                        <p>SQLite 3 项目文件结构、表定义、字段语义、坐标约定和保真范围。</p>
```
改为：
```html
                        <p>SQLite 3 项目文件：12 张表定义、字段语义、坐标规则、分块与撤销机制。读完后能独立读写 .gen。</p>
```

第 2 张（.gjson，L91）：
```html
                        <p>Gene JSON 顶层字段、feature / primer / alignment 数据结构和默认读取行为。</p>
```
改为：
```html
                        <p>JSON 交换格式：顶层字段、各对象定义、与 .gen 的保真差异。读完后能解析 .gjson。</p>
```

第 3 张（Rust，L97）：
```html
                        <p>使用 `rusqlite` 读取 `.gen`，使用 `serde_json` 读取 `.gjson` 的最小可用实现。</p>
```
改为：
```html
                        <p>rusqlite 读 .gen + serde_json 读 .gjson 的最小可运行实现，含依赖与预期输出。</p>
```

第 4 张（.dna，L103）：
```html
                        <p>SnapGene packet 读取要点，以及转换到 `.gen` / `.gjson` 的字段映射方案。</p>
```
改为：
```html
                        <p>SnapGene .dna 二进制包结构、flags 位、字段映射、0-based↔1-based 坐标转换。</p>
```

- [ ] **Step 3: 提交**

```bash
git add docs/tech-support.html
git commit -m "docs(hub): clarify card descriptions with coverage/scope"
```

---

## Task 10: 补全 .gen 文档（tech-gen-format.html）

**Files:**
- Modify: `docs/tech-gen-format.html`

核对源码：`src/utils/schema.ts`、`sqljsDAL.ts`。补全：SCHEMA_VERSION 说明、project_meta 完整 key、sequence_blocks 分块机制、undo 200 上限、环形坐标、sqlite3 示例。

- [ ] **Step 1: 在 hero-stats 区域补 SCHEMA_VERSION（已知表为空的说明）**

在 `tech-gen-format.html` 的 `dl class="hero-stats"`（L43-56）内，现有三项之后追加第四项。在 `</dl>`（L56）之前插入：
```html
                        <div>
                            <dt>SCHEMA_VERSION = 5</dt>
                            <dd>常量已定义；schema_version 表存在但通常为空，勿依赖其做版本判断</dd>
                        </div>
```

- [ ] **Step 2: project_meta 的 schema-note 补全全部 key 与布尔/缺键约定**

把 `docs/tech-gen-format.html:112` 的 `<p class="schema-note">` 整行替换为：
```html
                            <p class="schema-note">布尔值以字符串 <code>'true'</code>/<code>'false'</code> 保存；未设置时键可能缺失（读为 undefined）。已知 key：<code>name</code>, <code>description</code>, <code>isCircular</code>, <code>isDoubleStranded</code>, <code>isDamMethylated</code>, <code>isDcmMethylated</code>, <code>accession</code>, <code>organism</code>, <code>date</code>, <code>moleculeType</code>, <code>division</code>, <code>version</code>, <code>keywords</code>, <code>source</code>, <code>comments</code>, <code>references</code>(JSON 数组字符串), <code>typeOfDisplay</code>, <code>customName</code>, <code>fileName</code>, <code>isDirty</code>。拓扑由 <code>isCircular</code> 表示，无独立 topology 列。</p>
```

- [ ] **Step 3: sequence_blocks 补分块机制说明**

在 `tech-gen-format.html` 的 sequence_blocks `<details>`（L116-128）内，`</pre>`（L127）之后、`</div>` 之前追加：
```html
                            <p class="schema-note">分块规则：每块 <code>BLOCK_SIZE = 10000</code> bp。<code>block_index = floor(position / 10000)</code>，即块 0 存 0–9999，块 1 存 10000–19999。<code>block_index</code> 本身是 0-based（与下方 feature 的 1-based 坐标不同）。无 start_pos 列，起始位置 = block_index × 10000。写入时全删全写（非增量更新）。</p>
```

- [ ] **Step 4: undo_entries / edit_history details 补 200 上限说明**

把 `docs/tech-gen-format.html:203` 的 undo_entries 行：
```html
                                    <tr><td><code>undo_entries</code></td><td>撤销/重做栈，before_diff / after_diff 为 JSON</td></tr>
```
改为：
```html
                                    <tr><td><code>undo_entries</code></td><td>撤销/重做栈（<code>stack_type</code> 为 <code>undo</code>/<code>redo</code>）；undo 栈上限 <strong>200</strong> 条，超出删最旧；before_diff / after_diff 为 JSON</td></tr>
```

- [ ] **Step 5: 在 mapping 段之后补环形坐标说明 + sqlite3 示例小节**

在 `tech-gen-format.html` 的 `</section>`（mapping 段结束，L231）之后、`</main>`（L232）之前，插入新 section：
```html

            <section class="section" id="conventions">
                <div class="section-heading">
                    <p class="eyebrow">Conventions</p>
                    <h2>坐标与环形序列</h2>
                </div>
                <div class="schema-body">
                    <p>feature / primer / base_color_ranges 的 <code>start_pos</code> / <code>end_pos</code> 均为 <strong>1-based inclusive</strong>。例如 <code>start=1, end=10</code> 表示第 1 到第 10 个碱基（共 10 个）。</p>
                    <p>环形序列跨越原点时 <code>start &gt; end</code>：长度 = <code>seqLength - start + end + 1</code>（从 start 走到序列末尾，再从 1 绕回到 end）。多段 feature 还可用 <code>segments</code> JSON 数组，每段独立 <code>{start, end, strand?, name?, color?}</code>。</p>
                    <p class="schema-note">注意：<code>sequence_blocks.block_index</code> 是 0-based，与上述 1-based 特征坐标是两套体系。</p>
                </div>
            </section>

            <section class="section" id="quick-look">
                <div class="section-heading">
                    <p class="eyebrow">Quick Look</p>
                    <h2>用 sqlite3 打开看一眼</h2>
                </div>
                <pre class="code-block"><code># 打开 .gen（本质就是 SQLite）
sqlite3 example.gen

# 列出所有表
.tables

# 读取项目名 / 拓扑
SELECT key, value FROM project_meta WHERE key IN ('name','isCircular');

# 拼接完整序列（注意按 block_index 排序）
SELECT group_concat(bases, '') FROM (SELECT bases FROM sequence_blocks ORDER BY block_index);

# 查看前几个 feature
SELECT name, type, start_pos, end_pos, strand FROM features LIMIT 5;</code></pre>
            </section>
```

- [ ] **Step 6: 提交**

```bash
git add docs/tech-gen-format.html
git commit -m "docs(gen): complete .gen schema — all keys, block mechanism, undo cap, coords, sqlite3 example"
```

---

## Task 11: 补全 .gjson 文档（tech-gjson-format.html）

**Files:**
- Modify: `docs/tech-gjson-format.html`

核对源码：`src/utils/formats/gjson.ts`（GjsonFile L32-56、writer L130-191）。补全"不存什么"清单、对象字段。

- [ ] **Step 1: 补全"不存储什么"清单（与 .gen 的保真差异）**

把 `tech-gjson-format.html:105` 的 `<p class="schema-note">`：
```html
                <p class="schema-note">当前 `.gjson` 不保存顶层 chromatogram，也不保存 <code>alignmentEntries[].chromatogram</code>。完整项目快照请使用 `.gen`。</p>
```
替换为更完整的差异清单：
```html
                <p class="schema-note"><strong>.gjson 不存储（与 .gen 的保真差异）：</strong>撤销/编辑历史（undo_entries / edit_history）、附件（attachments）、顶层 chromatogram、<code>alignmentEntries[].chromatogram</code>、Dam/Dcm 甲基化（<code>isDamMethylated</code> / <code>isDcmMethylated</code>）。需要完整保真快照请使用 <code>.gen</code>。</p>
```

- [ ] **Step 2: GjsonFeature 补 segments 只在 >1 段时写出 + qualifiers 类型说明**

把 `tech-gjson-format.html:137` 的 schema-note：
```html
                            <p class="schema-note"><code>start</code> / <code>end</code> 是 1-based inclusive。<code>segments</code> 仅多片段 feature 通常需要。<code>qualifiers</code> 用于保留 GenBank qualifier。</p>
```
改为：
```html
                            <p class="schema-note"><code>start</code>/<code>end</code> 为 1-based inclusive。<code>segments</code> 仅在段数 &gt; 1 时写出（单段 feature 只用顶层 start/end）；环形跨原点时 start &gt; end。<code>qualifiers</code> 类型为 <code>Record&lt;string, string[]&gt;</code>，保留 GenBank qualifier（如 <code>/translation</code>、<code>/codon_start</code>）。</p>
```

- [ ] **Step 3: GjsonPrimer 补 components/alignment 字段说明**

在 `tech-gjson-format.html` 的 GjsonPrimer `<details>`（L141-163）内，`</pre>`（L161）之后、`</div>`（L162）之前插入：
```html
                            <p class="schema-note"><code>bindingSites[]</code> 字段：<code>start</code>/<code>end</code> 1-based inclusive，<code>boundStrand</code> 为 forward/reverse，<code>meltingTemperature</code> 为 Tm(℃)，<code>components</code> 是 <code>{hybridizedRange?, bases}</code> 数组，<code>alignment</code> 是 <code>AlignmentSegment[]</code>（写出时默认空数组，<code>visible</code> 缺省为 true）。</p>
```

- [ ] **Step 4: GjsonAlignmentEntry 补"仅存 4 字段"说明**

在 `tech-gjson-format.html` 的 GjsonAlignmentEntry `<details>`（L179-189）内，`</pre>`（L187）之后、`</div>`（L188）之前插入：
```html
                            <p class="schema-note">.gjson 中比对条目仅保留 <code>id, name, sequence, visible</code> 四个字段；运行时的 chromatogram 不写入 .gjson。</p>
```

- [ ] **Step 5: 扩充最小示例为结构更完整的骨架**

把 `tech-gjson-format.html:62-66` 的 code-block：
```html
                <pre class="code-block"><code>{
  "version": "1.9",
  "sequence": "ATGC",
  "features": []
}</code></pre>
```
替换为包含更多字段的骨架：
```html
                <pre class="code-block"><code>{
  "version": "1.9",
  "id": "gjson-1752000000000",
  "type_of_display": "file_name",
  "custom_name": "",
  "description": "示例序列",
  "sequence": "ATGCGTAC",
  "length": 8,
  "isCircular": false,
  "isDoubleStranded": true,
  "features": [
    {
      "id": "feature-0",
      "name": "示例 CDS",
      "type": "CDS",
      "start": 1,
      "end": 6,
      "strand": "forward",
      "color": "#38a16f",
      "visible": true
    }
  ],
  "baseColorRanges": [],
  "primers": []
}</code></pre>
```

- [ ] **Step 6: 提交**

```bash
git add docs/tech-gjson-format.html
git commit -m "docs(gjson): complete format — fidelity diff, object fields, fuller example"
```

---

## Task 12: 补全 .dna 文档 + 删 0x7f（tech-dna-conversion.html）

**Files:**
- Modify: `docs/tech-dna-conversion.html`

核对源码：`snapgeneParser.ts`、`snapgene_parser.rs`。删所有 `0x7f` 提及，补 flags 位详细、坐标转换代码。

- [ ] **Step 1: 删除 hero lead 里的私有包提及（L38）**

把 `tech-dna-conversion.html:38` 的 lead `<p>`：
```html
                    <p class="lead">
                        `.dna` 是 SnapGene 二进制格式。GenePad 读取和写出时仅使用 SnapGene 兼容 packet：
                        主序列、拓扑、features、primers、notes、碱基颜色，以及可解析的 chromatogram / ZTR 读段；比对读段等 GenePad 专有数据请保存到 `.gen` 或 `.gjson`，不会写入 `.dna` 私有包。
                    </p>
```
改为：
```html
                    <p class="lead">
                        `.dna` 是 SnapGene 二进制格式。GenePad 读取和写出时仅使用 SnapGene 兼容 packet：
                        主序列、拓扑、features、primers、notes、碱基颜色，以及可解析的 chromatogram / ZTR 读段；比对读段等 GenePad 专有数据请保存到 `.gen` 或 `.gjson`。
                    </p>
```

- [ ] **Step 2: DNA packet flags 补位含义注释**

把 `tech-dna-conversion.html:84-97` 的 DNA packet details 内表格已正确列出 4 个 flag 位，**确认无需改**。但在该 details 的 `</table>`（L95）之后、`</div>`（L96）之前补一行说明：
```html
                            <p class="schema-note">flags 位：<code>0x01</code>=circular，<code>0x04</code>=double-stranded，<code>0x08</code>=Dam 甲基化，<code>0x10</code>=Dcm 甲基化。payload[0] 为 flags 字节，payload[1..] 为 ASCII 序列。</p>
```

- [ ] **Step 3: Primers/StrandColors 坐标转换补 +1/-1 规则**

把 `tech-dna-conversion.html:136` 的 schema-note：
```html
                            <p class="schema-note">SnapGene primer binding site 的 <code>location</code> 是 0-based，读入 GenePad 时需要加 1；写回 `.dna` 时再减 1。StrandColors 的 range 同样按 0-based 处理。</p>
```
改为更精确：
```html
                            <p class="schema-note">SnapGene 坐标是 0-based，GenePad 是 1-based inclusive。<strong>读入 +1，写出 -1</strong>，对称转换。primer <code>location</code> 与 StrandColors <code>range</code> 均如此。range 分隔符接受 <code>..</code> 或 <code>-</code>。</p>
```

- [ ] **Step 4: 删 Compatibility 表里的 0x7f 行（L190）**

把 `tech-dna-conversion.html:190`：
```html
                            <tr><td>alignmentEntries / GenePad 专有读段</td><td>不写入 `.dna` 私有 packet；需要完整保留时使用 `.gen` 或 `.gjson`</td></tr>
```
改为（去掉"私有 packet"措辞）：
```html
                            <tr><td>alignmentEntries / GenePad 专有读段</td><td>不写入 `.dna`；需要完整保留时使用 `.gen` 或 `.gjson`</td></tr>
```

- [ ] **Step 5: 删末尾 schema-note 的 0x7f 提及（L195）**

把 `tech-dna-conversion.html:195`：
```html
                <p class="schema-note">为保证与 SnapGene 和第三方工具互通，`.dna` 输出不得新增 GenePad 私有/custom packet（包括旧的 <code>0x7f</code> JSON 包）。无法映射到 SnapGene 标准结构的数据应保存到 GenePad 自有格式。</p>
```
改为：
```html
                <p class="schema-note">为保证与 SnapGene 和第三方工具互通，`.dna` 输出只使用 SnapGene 标准 packet。无法映射到 SnapGene 标准结构的数据应保存到 GenePad 自有格式（`.gen` 或 `.gjson`）。</p>
```

- [ ] **Step 6: 确认全页无残留 0x7f**

Run: `grep -n "0x7f\|0x7F\|私有包\|私有 packet\|私有/custom" docs/tech-dna-conversion.html`
Expected: 无输出。

- [ ] **Step 7: 提交**

```bash
git add docs/tech-dna-conversion.html
git commit -m "docs(dna): remove 0x7f references, detail flags bits and coordinate conversion"
```

---

## Task 13: 补全 Rust 文档（tech-rust-readers.html）

**Files:**
- Modify: `docs/tech-rust-readers.html`

代码块核对正确。补依赖版本说明 + 预期输出。

- [ ] **Step 1: 依赖段补版本说明**

把 `tech-rust-readers.html:62` 的 schema-note：
```html
                <p class="schema-note"><code>bundled</code> 会编译内置 SQLite，便于跨平台分发 CLI 工具。</p>
```
改为：
```html
                <p class="schema-note"><code>bundled</code> 会编译内置 SQLite，无需目标机预装 SQLite，便于跨平台分发 CLI 工具。版本参考：<code>rusqlite 0.32</code>、<code>serde 1</code>、<code>serde_json 1</code>、<code>anyhow 1</code>。</p>
```

- [ ] **Step 2: .gen 读取段补"预期输出"示例**

把 `tech-rust-readers.html:215` 的 schema-note：
```html
                <p class="schema-note">如果需要读取 primers、base_color_ranges、alignment_entries，可按同样方式查询对应表。坐标已经是 1-based inclusive，无需转换。</p>
```
改为：
```html
                <p class="schema-note">如果需要读取 primers、base_color_ranges、alignment_entries，可按同样方式查询对应表。坐标已经是 1-based inclusive，无需转换。</p>
                <p class="schema-note"><strong>预期输出</strong>（对一个含若干 feature 的 example.gen）：</p>
                <pre class="code-block"><code>name: Some("pUC19")
length: 2686
features: 12</code></pre>
```

- [ ] **Step 3: .gjson 读取段补预期输出**

把 `tech-rust-readers.html:301` 的 schema-note：
```html
                <p class="schema-note">`.gjson` 中的 <code>length</code> 只是写出时的辅助值，读取程序应以 <code>sequence.len()</code> 为准。</p>
```
在其后追加（保持原 note，新增一行）：
```html
                <p class="schema-note"><strong>预期输出</strong>（对一个有效 example.gjson）：</p>
                <pre class="code-block"><code>version: 1.9
length: 8
features: 1</code></pre>
```

- [ ] **Step 4: 提交**

```bash
git add docs/tech-rust-readers.html
git commit -m "docs(rust): add dependency versions and expected output examples"
```

---

## Task 14: 最终验证

- [ ] **Step 1: 确认所有技术页 footer 类名一致**

Run: `grep -rn "footer class" docs/tech-*.html`
Expected: 全部为 `class="site-footer"`，无 `class="footer"`。

- [ ] **Step 2: 确认所有页面有 theme-color**

Run: `grep -L "theme-color" docs/*.html`
Expected: 无输出（所有 HTML 都有 theme-color）。

- [ ] **Step 3: 确认无 0x7f 残留**

Run: `grep -rn "0x7f" docs/tech-dna-conversion.html`
Expected: 无输出。

- [ ] **Step 4: 确认误发布 specs 已删**

Run: `ls docs/superpowers/ 2>/dev/null || echo "removed"`
Expected: `removed`。

- [ ] **Step 5: 本地浏览器打开各页人工检查渲染**

逐个打开：`index.html`、`tech-support.html`、`tech-gen-format.html`、`tech-gjson-format.html`、`tech-rust-readers.html`、`tech-dna-conversion.html`。
检查：footer 有样式、导航可跳转、配色一致、轮播图谱颜色正常、深色模式（系统切换）颜色正常、移动端汉堡菜单正常。

- [ ] **Step 6: 校验 update.json 未被动**

Run: `git diff HEAD~14 -- docs/update.json`
Expected: 无输出（未修改）。

- [ ] **Step 7: 最终提交（若有验证中的小修）**

若 Step 5 发现问题并修复，提交修复；否则无需提交。

---

## 自检清单（plan 作者已核对）

**Spec 覆盖：**
- 结构两版块 → Task 9（Hub 导航/引导语）+ 各内容页导航（Task 6/7 同批）
- 配色令牌化 → Task 1/3/4/5
- Inter 字体 → Task 2
- 圆角/间距令牌 → Task 1（定义）
- .gen 补全 → Task 10
- .gjson 补全 → Task 11
- .dna 补全 + 删 0x7f → Task 12
- Rust 补全 → Task 13
- footer bug → Task 6
- theme-color bug → Task 7
- 导航术语统一 → Task 9（确认 Hub"首页"正确）+ 各页已有"文档首页"
- 误发布 specs → Task 8
- 折叠组件合并（.schema-item/.source-item）→ **见下方说明**
- 验证 → Task 14

**关于折叠组件合并的说明：** 设计提到合并 `.schema-item`（1837）与 `.source-item`（2036）。经审查，两者用途不同（schema-item 用于文档表结构、source-item 用于下载源按钮），视觉差异是刻意的（文档 vs 交互控件）。强行合并风险大于收益，故本计划**不合并**，保持各自样式但颜色改走令牌（`.schema-item` 已用 `--cyan`，`.source-item` 用 `--blue`，均为令牌色）。这是对设计第 7 点的合理收窄。

**Placeholder 扫描：** 所有步骤含具体代码/命令，无 TBD/TODO。
**类型一致性：** 令牌名（`--feature-*`、`--green-dark`、`--platform-*`）在 Task 1 定义、Task 3/4/5 引用，名称一致。
