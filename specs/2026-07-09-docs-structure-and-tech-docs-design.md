# 设计文档：网页结构优化、配色统一与技术文档补全

**日期：** 2026-07-09
**范围：** GenePad 下载/支持站（`docs/`，Cloudflare Pages 静态站）
**目标：** 优化网页结构与配色系统，并把 `.gen` / `.gjson` / `.dna` 技术文档补全到"能据此复刻格式读写"的程度。

---

## 背景与问题

当前 `docs/` 有 6 个 HTML 页面：1 个营销首页（`index.html`，1446 行）+ 5 个技术支持页（最近由单页拆分而来）。单一 `styles.css` 共 2442 行。

经交叉核对 4 个技术文档页与 Gene Editor 源码（`C:\Users\moqiq\PycharmProjects\Gene_Editor-master`），发现三类问题：

1. **配色散乱**：约 50 个 hex 值散落各处，仅 16 个被令牌化；下载区硬编码绿 `#2f855a`/`#22543d` 与令牌 `--green` 语义重复但色值不同；轮播 7 个特征色硬编码在 `index.html` JS 里，脱离设计系统；深色色带亮色文字无令牌。
2. **结构/导航 bug**：5 个技术页用 `<footer class="footer">`，但 CSS 无此规则 → 页脚无样式；4 个内容页缺 `theme-color` meta；内容页缺回首页路径、术语不统一（"首页" vs "文档首页"）；技术页 footer 混入英文；`docs/superpowers/specs/` 误发布到公开目录。
3. **技术文档不完整**：`.gen`/`.gjson`/`.dna` 三页有字段缺失、坐标规则模糊、缺最小示例，不足以照此复刻格式读写。

**范围边界（明确不做）：**
- 不写功能教程（酶切/引物/CRISPR/比对/AI 等）—— 用户已确认暂不需要。
- 不改下载逻辑、版本号、release 文件。
- 不动 `update.json`。
- 不引入新依赖或构建工具（保持纯静态站）。
- 不提 `.dna` 私有包 `0x7f` —— 源码已移除该部分，文档不涉及。

---

## 一、整体结构（两版块）

```
首页 index.html（营销 + 下载，保留并优化）
  └─ 技术支持 tech-support.html（开发者文档 Hub）
       ├─ .gen 格式      tech-gen-format.html
       ├─ .gjson 格式    tech-gjson-format.html
       ├─ Rust 读取示例  tech-rust-readers.html
       └─ .dna 转换      tech-dna-conversion.html
```

不做功能教程，故不设空的"用户指南"版块。

### 导航统一化

- **首页**顶栏：品牌 / 锚点 / 赞助 / 下载 / 语言 / 技术支持（已有，保留）。
- **技术支持 Hub**：品牌(→首页) / 文档首页 / .gen / .gjson / Rust / .dna。
- **4 个内容页**：品牌(→首页) / 文档首页(→tech-support) / 同级锚点 / 兄弟页链接 —— 全部补上回首页路径，术语统一为"文档首页"。

### 待删除

`docs/superpowers/specs/2026-06-01-i18n-language-switcher-design.md` —— 误发布到公开 `docs/` 的设计稿，移出公开目录（移到仓库根 `specs/` 或删除）。

---

## 二、配色与设计系统（提炼现有蓝绿青）

不换调性，把散落的 ~50 个硬编码色收敛成一套 CSS 变量（令牌），全部从令牌取色。

### 令牌化（在 `:root` 扩展，深色模式对应覆盖）

| 令牌 | 值 | 用途 |
|---|---|---|
| `--ink` / `--muted` / `--lead` | `#142033`/`#607087`/`#405067` | 正文/次要/引导文字 |
| `--page` / `--panel` / `--panel-2` | `#f4f7fb`/`#fff`/`#eef3f8` | 页底/卡片/次面板 |
| `--line` / `--soft` | `#d9e1ea`/`#f4f7fb` | 分割线/柔底 |
| `--blue`(主) | `#2f6fed` | 主操作、链接、品牌 |
| `--green` / `--cyan` / `--violet` / `--orange` | `#38a16f`/`#4fb7c4`/`#6b5cff`/`#f29a45` | 辅助语义色 |
| `--dark` / `--dark-2` | `#0f1724`/`#172233` | 深色色带 |
| **新增语义令牌** | | |
| `--accent` | `=var(--blue)` | 当前主题强调色（为将来换主色留口） |
| `--success` / `--warn` | `var(--green)` / `#f29a45` | 语义色别名 |
| `--radius-sm` / `--radius-md` / `--radius-lg` | `8px`/`12px`/`18px` | 圆角令牌（当前按钮8/卡片8-12/弹窗14/hero18混乱） |
| `--space-card` | `24px` | 统一卡片内边距 |

### 具体清理

- 下载区硬编码绿 `#2f855a`/`#22543d` → 统一用 `--green`/`--green-dark`（新增深绿令牌）。
- 赞助区粉色 `#ff6a9a`/`#c44cd6` → 保留为 `--sponsor-*` 令牌（品牌色，单独命名）。
- 平台渐变对（`#244b8f/#2f6fed` 等）→ 每平台一对令牌 `--platform-win/mac/linux/android`。
- `index.html` L1254 轮播硬编码的 7 个特征色（`#FFC344 #F06767 #3F62EB …`）→ 提到 `styles.css` 作 `--feature-1..7` 令牌。
- 深色色带的 `#86d7c0`/`#a8b4ff` 等亮色文字 → 令牌化为 `--dark-accent-green/violet/cyan`。

### 深色模式

当前只有一段 `@media (prefers-color-scheme: dark)`（L2353-2383）覆盖部分令牌。补全所有新增令牌的深色值，确保无一处靠硬编码色。

### 字体修复

`Inter` 在 `font-family` 栈里声明但从未 `@import`/`@font-face` 加载，静默落回 Segoe UI/YaHei。**决定：从栈里去掉 Inter**（避免外网字体请求拖慢、契合静态站轻量），保留 `Segoe UI` / `Microsoft YaHei` / `PingFang SC`。

### 排版尺度统一

修复 h3 一会儿 20px 一会儿 18px、正文 14/17/18/20 混用：定义清晰的 `--fs-*` 令牌，所有卡片标题、正文走同一套。

---

## 三、技术文档补全

交叉对比 4 个文档页与源码，补全到"能据此复刻格式读写"。原则：只补技术细节，不写功能教程。

### A. `.gen` 格式页（tech-gen-format.html）

查源码 `src-tauri/gene-core`、`src/utils/schema.ts`、`useDNASequence.ts`、DAL 层。

| 问题 | 现状 | 补全方案 |
|---|---|---|
| 缺总览头信息 | 无 | 补：SQLite 3、`SCHEMA_VERSION = 5`、`BLOCK_SIZE = 10000`、坐标系 1-based inclusive、环形可 start>end |
| `project_meta` 字段不全 | 列了部分 | 补全所有列（含 `is_circular`/`is_dam_methylated`/`is_dcm_methylated`/`topology`/`organism` 等），每列标注类型+含义 |
| 序列分块机制模糊 | 只说"分块" | 写清：`sequence_blocks` 按 10000bp 分块、`block_index`/`start_pos`/`bases` 结构、为什么分块（避免大字符串） |
| undo 历史细节缺失 | 提了表名 | 补：`undo_entries` 上限 200 条、`edit_history` 的关系 |
| 缺 `attachments`/`base_color_ranges` 字段定义 | 模糊 | 补全列结构与示例值 |
| 没有最小可读示例 | 无 | 加一段"用 sqlite3 打开看一眼"的命令 + 一行示例 SELECT |

> **实施时核对源码取准确常量**：`SCHEMA_VERSION`、`BLOCK_SIZE`、`project_meta` 列名、undo 上限 200 等，以源码为准，不沿用文档现有不确定表述。

### B. `.gjson` 格式页（tech-gjson-format.html）

查源码 `src/utils/gjsonParser.ts`、`formats/gjson.ts`、仓库内 `GJSON_FORMAT.md`。

| 问题 | 补全方案 |
|---|---|
| 顶层 version 值 | 明确写 `1.9` |
| 缺"不存储什么"清单 | 明确列：不存 undo 历史、attachments、chromatogram、Dam/Dcm 甲基化 → 这是 `.gjson` 与 `.gen` 的关键差异 |
| 对象字段不全 | 补全 GjsonFeature（含 `segments` 多段/剪接基因）、GjsonPrimer、BaseColorRange、GjsonAlignmentEntry 每个字段 |
| 坐标约定 | 明确 1-based inclusive，环形 start>end |
| 缺完整 JSON 骨架示例 | 加一个最小但结构完整的 `.gjson` 示例 |

### C. `.dna` 转换页（tech-dna-conversion.html）

查源码 `src-tauri/src/snapgene_parser.rs`、`src/utils/snapgeneParser.ts`、`formats/snapgene.ts`。

| 问题 | 补全方案 |
|---|---|
| DNA 包 flags 位含义模糊 | 补全 `0x00` 包 flags：`0x01=circular`、`0x04=double-stranded`、`0x08=Dam`、`0x10=Dcm` |
| primer 坐标转换缺失 | 明确：SnapGene primer `location` 是 0-based，GenePad 内部 1-based，读写时 ±1 转换 |
| StrandColors 范围坐标缺失 | 明确 0-based 转换 |
| cookie 校验细节 | 明确首包必须 `0x09` 且 payload = `SnapGene` |
| ~~私有包 `0x7f`~~ | **不提**（源码已移除私有包，文档不涉及） |

### D. Rust 读取页（tech-rust-readers.html）

- 核对两个代码块（`read_gen`/`read_gjson`）正确性，补一句依赖版本说明（`rusqlite` 用 `features=["bundled"]` 避免系统 SQLite、`serde_json` 版本）。
- 加一个"运行后预期输出"示例，让读者确认代码能跑通。

### E. 技术支持 Hub（tech-support.html）

- 4 张卡片补一句"本页覆盖什么 / 读完后能做什么"的引导语。
- 修复 footer 英文混入（"GenePad developer documentation." → 中文）。

---

## 四、Bug 修复清单 + 验证

### Bug 修复

| # | 问题 | 修复 |
|---|---|---|
| 1 | 5 个技术页 `<footer class="footer">`，CSS 无此规则 → 页脚无样式 | 统一为 `class="site-footer"`（与首页用同一个类，复用现有样式，不新增 `.footer` 规则） |
| 2 | 4 个内容页缺 `theme-color` meta | 补全 light/dark 两个 meta（与首页一致） |
| 3 | 内容页缺回首页路径 / 术语不统一 | 统一：Hub 叫"首页"→index，内容页叫"文档首页"→tech-support；内容页导航补首页入口 |
| 4 | 技术页 footer 英文混入 | 统一中文 |
| 5 | `docs/superpowers/specs/` 误发布 | 移出公开 docs/ |
| 6 | 圆角/间距/标题尺度混乱 | 走令牌（见第二节） |
| 7 | 两种折叠组件（`.schema-item`/`.source-item`）重复 | 合并为一套，颜色走令牌 |

### 验证方式

- 每页本地浏览器打开看渲染（footer/导航/配色/响应式）。
- `.gen`/`.gjson`/`.dna` 文档：核对源码确认每个字段、常量、坐标规则准确。
- `update.json` 未动，无需重新验证。
- `index.html` 的 `downloadData`/下载逻辑未动。

### 明确不做

- 不写功能教程。
- 不改下载逻辑、版本号、release 文件。
- 不动 `update.json`。
- 不引入新依赖或构建工具（保持纯静态站）。
- 不提 `.dna` 私有包 `0x7f`。

---

## 涉及文件

**会修改：**
- `docs/styles.css` —— 令牌化、圆角/间距/排版令牌、深色模式补全、折叠组件合并、字体栈去 Inter
- `docs/index.html` —— 轮播特征色提令牌、可能微调导航术语
- `docs/tech-support.html` —— 卡片引导语、footer 修复、导航统一
- `docs/tech-gen-format.html` —— 补全（A）
- `docs/tech-gjson-format.html` —— 补全（B）
- `docs/tech-rust-readers.html` —— 补全（D）
- `docs/tech-dna-conversion.html` —— 补全（C）、删 `0x7f` 相关

**会删除/移动：**
- `docs/superpowers/specs/2026-06-01-i18n-language-switcher-design.md`（移出公开 docs/）

**不修改：**
- `docs/update.json`、`docs/release/*`、下载逻辑、版本号
