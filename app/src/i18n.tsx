import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";

/* ── 文案词典：zh 为基准，en 逐条对照 ── */
const dict = {
  zh: {
    // Nav
    "nav.workbench": "图谱工作台",
    "nav.daynight": "昼夜模式",
    "nav.sanger": "测序比对",
    "nav.toolbox": "工具箱",
    "nav.download": "下载",
    "nav.docs": "技术文档",
    "nav.projects": "生态项目",
    "nav.cta": "免费下载",
    "nav.lang": "EN",

    // Hero
    "hero.badge": "免费公测中",
    "hero.badgeEn": "Free Beta · Cross-platform",
    "hero.titleCn": "基因工坊",
    "hero.titleEn": "Gene Map Editor",
    "hero.desc":
      "每天的质粒工作，一个顺手的编辑器——打开质粒图谱、编辑序列、管理标注、检查酶切位点、比对 Sanger 测序峰图。日常克隆的设计与核对，一个软件囊括所有。",
    "hero.download": "免费下载 GenePad",
    "hero.tour": "先看看界面",
    "hero.features": "图谱 · 标注 · 酶切 · 引物 · 峰图",

    // Workbench
    "wb.eyebrow": "Workbench · 图谱工作台",
    "wb.title": <>图谱不只是用来看的</>,
    "wb.lead":
      "看图谱、改序列、查位点、算蛋白——GenePad 把这些事放在同一页里，点哪里，就到哪里。",
    "wb.1.name": "整体图谱",
    "wb.1.desc":
      "环形与线性图谱一键切换。启动子、CDS、复制起点、poly(A) 信号分层着色，标签自动避让——几十个元件的载体，也能一眼收进一张图。",
    "wb.2.name": "图谱直达序列",
    "wb.2.desc":
      "在标注表里点一下，序列视图直接跳到对应碱基区间：选区长度、GC 含量、Tm 值同步给出。图谱和序列，从来不是两个世界。",
    "wb.3.name": "酶切位点",
    "wb.3.desc":
      "位点直接高亮在双链序列上，悬停即见识别序列、链方向与上下切口位置，连 5′ 突出末端都标得清清楚楚。克隆方案对不对，扫一眼就知道。",
    "wb.4.name": "蛋白属性",
    "wb.4.desc":
      "选中 CDS，分子量、等电点、GRAVY、脂肪族指数、消光系数随选随算。等电点内置 19 种算法对照，默认给出文献推荐的最优解。",

    // DayNight
    "dn.eyebrow": "Light & Dark · 昼夜模式",
    "dn.title": <>实验室的灯虽然能开到很晚，但是不要忘了你还有更重要的生活</>,
    "dn.lead": "同一套高密度研究界面，两套完整配色。",
    "dn.day": "白天 DAY",
    "dn.night": "夜间 NIGHT",
    "dn.state.day": "▸ LIGHT THEME — 标准实验台模式运行中",
    "dn.state.night": "▸ DARK THEME — 深夜实验台模式运行中",
    "dn.caption.day": "DAY MODE — 同一载体，明亮主题下的完整视图",
    "dn.caption.night": "NIGHT MODE — 图谱、序列、酶切位点全套深色渲染",
    "dn.alt.day": "GenePad 白天模式",
    "dn.alt.night": "GenePad 夜间模式",

    // Sanger
    "sg.eyebrow": "Sanger Trace · 测序比对",
    "sg.title": (
      <>
        测序结果，贴着
        <br />
        参考序列看
      </>
    ),
    "sg.lead":
      "直接拖入 AB1 文件：峰图、reads 与参考序列逐碱基排在一起，比对 identity 和 E-value 写在结果里。哪一针有效、哪里错配，不用猜。",
    "sg.badge.format": "AB1 峰图",
    "sg.shot1": "2KB-RCA-F — 峰图与参考序列逐碱基对齐",
    "sg.shot2": "TOP STRAND — 错配位点红底标出，一目了然",

    // Toolbox
    "tb.eyebrow": "Toolbox · 工具箱",
    "tb.title": (
      <>
        工具，长在
        <br />
        该出现的地方
      </>
    ),
    "tb.lead":
      "选中序列点右键，电泳模拟与 sgRNA 设计即刻就绪；全局工具箱里，AI 助手与文件库随时待命；多语言与开放协作，让它融进你已有的工作流。",
    "tb.groupA": "右键菜单",
    "tb.groupB": "全局工具箱",
    "tb.groupC": "开放性",
    "tb.c1.name": "DNA 电泳模拟",
    "tb.c1.desc":
      "选中序列，右键菜单直接选择电泳模拟，直接预览琼脂糖胶条带。内置 Trans2K® 等主流 ladder，跑胶之前，先看条带。",
    "tb.c2.name": "蛋白电泳模拟",
    "tb.c2.desc":
      "SDS-PAGE 模拟：选中 CDS 或者选中一段氨基酸，从右键菜单电泳模拟直接上样，PageRuler 等预染 ladder 对照分子量，条带位置即算即得。",
    "tb.c3.name": "CRISPR sgRNA 设计",
    "tb.c3.desc":
      "SpCas9、xCas9、Cas12a/b、TnpB 等 12 种识别布局，PAM 方向、种子区长度、脱靶过滤一应俱全，候选一键标回图谱。",
    "tb.t1.name": "AI 助手",
    "tb.t1.desc":
      "直接读写当前文件的序列、标注与引物：加 feature、算 Tm、翻译蛋白、预测 ORF，用一句话吩咐它去做。",
    "tb.t2.name": "基因文件库",
    "tb.t2.desc":
      "打开过的载体自动入库，AI 批量生成标签，支持文件夹监听。方便你根据质粒信息直接定位文件，不需要再记冗长的文件名，还能从 AI 助手里让 AI 帮忙查找文件。只存索引，绝不动你的原始文件。",
    "tb.o1.name": "多语言",
    "tb.o1.desc":
      "中、英、日、法、德、俄界面内置。导出语言包、AI 辅助翻译，自己的语言也能装进来。",
    "tb.o2.name": "开放协作",
    "tb.o2.desc":
      "内置「打开方式」：一键把文件交给 SnapGene、VS Code 或任何你顺手的工具，配合现有工作流，不绑架你的文件。",

    // Download
    "dl.eyebrow": "Download · 下载安装",
    "dl.title": (
      <>
        拿走，装在你的
        <br />
        每台设备上
      </>
    ),
    "dl.lead":
      "实验室的台式机、自己的笔记本、平板电脑、口袋里的手机——同一个 GenePad，随时打开载体文件看一眼。",
    "dl.note.desktop": "桌面端",
    "dl.note.linuxX64": "桌面端 · x86_64",
    "dl.note.linuxArm64": "桌面端 · ARM64",
    "dl.note.mobile": "移动端",
    "dl.note.soon": "敬请期待",
    "dl.cmdTitle.recommended": "命令行安装（推荐）",
    "dl.cmdTitle.plain": "命令行安装",
    "dl.cmd.brewLabel": "macOS · Homebrew",
    "dl.cmd.npmLabel": "Linux · npm",
    "dl.cmd.npmLabelMac": "macOS · npm",
    "dl.cmd.note": "复制这段命令，去终端里粘贴运行即可。",
    "dl.cmd.scriptLabel": "Linux · 一键安装脚本",
    "dl.cmd.scriptLabelMac": "macOS · 一键安装脚本",
    "dl.cmdTab.script": "一键脚本",
    "dl.cmdTab.npm": "npm",
    "dl.cmd.recommendedTag": "推荐",
    "dl.or.mac": "或者，使用下面的方式安装",
    "dl.or.linux": "或者，直接下载安装包",
    "dl.ai.title": "AI 辅助安装",
    "dl.ai.desc":
      "macOS 安装包未签名，手动安装步骤较多。可以复制这段提示词发给 AI 助手（Kimi、ChatGPT 等），让它带着你一步步完成安装。",
    "dl.ai.prompt": `请帮我在 macOS 上安装一款叫「GenePad」的应用。请按顺序尝试以下方法，任意一种成功即可：
1. 首选（最省事）：运行官方一键脚本——它会自动检测/安装 Homebrew（按网络自动切换国内镜像）：
   curl -fsSL https://genepad.cn/release/linux/install.sh | bash
   装好后运行 open -a GenePad 即可。
2. 次选：用 Homebrew 安装（会自动放入「应用程序」）：
   brew install genepad/tap/genepad
   装好后运行 open -a GenePad。若系统未安装 Homebrew，先装：
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. 再次：用 npm 安装（命令行启动）。如果可能，顺便把它复制到 ~/Applications，这样能在「应用程序」/启动台里找到：
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   然后用 open -a GenePad 打开（或命令行运行 genepad）
4. 兜底（手动）：该应用未签名，浏览器下载会被 Gatekeeper 标记成「已损坏」，所以用 curl 下载并本地签名：
   curl -L -o /tmp/gene-pad-app.zip "https://genepad.cn/release/mac/macos-app.zip"
   unzip -o /tmp/gene-pad-app.zip -d /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ 注意：上面的方法可能失效或已过时。如果某个步骤行不通，请自行尝试其它可行的解决办法（例如换一种绕过 Gatekeeper 的方式，或用其它工具来解压、签名）。只有当上面的下载链接本身打不开时，才访问官网 https://genepad.cn——官网只用来寻找其它的下载链接，不提供任何安装帮助。`,
    "dl.mac.other": "其他下载方式（DMG / APP 直链）",
    "dl.mac.unsigned":
      "未签名提示：浏览器直接下载的 .dmg / .app 会被 Gatekeeper 标记为「已损坏」。需要右键 →「打开」，或运行 xattr -cr 移除隔离属性。建议优先使用上面的命令行安装。",
    "dl.copy": "复制",
    "dl.copied": "已复制 ✓",
    "dl.filesTitle": "直接下载安装包",
    "lb.close": "关闭",
    "lb.prev": "上一张",
    "lb.next": "下一张",
    "dl.source.direct": "本站直链",
    "dl.source.gitee": "Gitee",
    "dl.source.github": "GitHub",
    "dl.giteeBadge": "国内加速",
    "dl.arch.x64": "x86_64",
    "dl.arch.arm64": "ARM64",
    "dl.spark": "星火应用商店",
    "dl.sparkNote": "国产 Linux 发行版可在星火商店搜索安装",
    "dl.releases": "全部版本（GitHub Releases）",
    "dl.releasesGitee": "全部版本（Gitee 镜像）",
    "dl.licenseTag": "LICENSE · 授权",
    "dl.license":
      "GenePad Free 面向个人评估与学习免费，覆盖日常的图谱查看、编辑与保存；商业、机构与长期科研使用，将由即将到来的 GenePad Pro 授权支持。",

    // Footer
    "ft.blurb":
      "轻量、跨平台的基因图谱编辑器。为每天都在做的分子克隆工作而做——感谢每一位反馈问题与建议的用户。",
    "ft.col.download": "下载",
    "ft.col.support": "反馈与支持",
    "ft.col.more": "更多",
    "ft.giteeMirror": "Gitee 镜像",
    "ft.changelog": "更新日志",
    "ft.docs": "技术文档",
    "ft.projects": "生态项目",
    "ft.sponsor": "赞助开发者",
    "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

    // 子页面共用
    "sub.back": "返回首页",

    // Tech support page
    "ts.eyebrow": "Developer Docs · 技术文档",
    "ts.title": "文件格式开发文档",
    "ts.lead":
      "面向需要自行开发读取、转换或导入程序的开发者。这里把 GenePad 当前使用的 .gen、.gjson、SnapGene .dna 相关格式拆成独立页面，便于快速定位实现细节。",
    "ts.group.formats": "文件格式",
    "ts.group.formatsEn": "FILE FORMATS",
    "ts.group.code": "代码示例",
    "ts.group.codeEn": "CODE SAMPLES",
    "ts.gen.title": ".gen 文件定义",
    "ts.gen.desc":
      "SQLite 3 项目文件：12 张表定义、字段语义、坐标规则、分块与撤销机制。读完后能独立读写 .gen。",
    "ts.gjson.title": ".gjson 文件定义",
    "ts.gjson.desc":
      "JSON 交换格式：顶层字段、各对象定义、与 .gen 的保真差异。读完后能解析 .gjson。",
    "ts.dna.title": ".dna 转换方案",
    "ts.dna.desc":
      "SnapGene .dna 二进制包结构、flags 位、字段映射、0-based↔1-based 坐标转换。",
    "ts.rust.title": "Rust 读取示例",
    "ts.rust.desc":
      "rusqlite 读 .gen + serde_json 读 .gjson 的最小可运行实现，含依赖与预期输出。",
    "ts.readDoc": "阅读文档",
    "ts.feedback":
      "文档没有覆盖到你需要的部分？到 GitHub 或 Gitee 提 Issue，我们会补充。",

    // Projects page
    "pr.eyebrow": "Ecosystem Projects · 生态项目",
    "pr.title": "GenePad 生态项目",
    "pr.lead":
      "围绕分子克隆工具链，GenePad 组织还在 GitHub 上维护着一些独立的小项目：从可溯源的质粒通用元件库，到组织特异性密码子统计管线。它们与主程序相互独立、随取随用，希望能为科研工作者和开发者省去一些重复劳动。",
    "pr.specs": "数据规格",
    "pr.cf.head": "质粒通用元件库",
    "pr.cf.title": "质粒构建通用元件序列库",
    "pr.cf.desc":
      "从 NCBI 源参考质粒中逐条整理、核对的可复用元件序列库。每条元件都记录 NCBI 登录号与参考质粒名——序列出处可逐条回溯，而不是“网上抄来的保守序列”。导入质粒软件后，打开图谱即可自动识别这些常见元件。",
    "pr.cf.catsTitle": "20 个覆盖分类",
    "pr.cf.usage":
      "将 genbank/ 下的 .gb 导入 SnapGene 或 Benchling 的 common features 库，打开任意质粒图即可自动识别这些元件；fasta/ 下的 .fa 可直接用于 BLAST 比对。",
    "pr.ca.head": "组织特异性密码子图谱",
    "pr.ca.title": "人类组织特异性密码子图谱",
    "pr.ca.desc":
      "一条独立实现的统计管线：以公开的 GTEx 基因表达与 GENCODE 注释为上游，按组织表达量加权，为人体每个组织重建密码子使用表。为密码子优化与异源表达设计提供可复现、可审查的组织特异性参考，而不必依赖授权受限的第三方成品表。",
    "pr.ca.metricsTitle": "输出指标",
    "pr.ca.usage":
      "python scripts/build_atlas.py 按 GTEx / GENCODE 输入重建全部组织表；check_release.py 与 package_release.py 负责发布前校验与打包。",
    "pr.org.text":
      "这些小项目由 GenePad 主项目孵化、按同一标准维护。更多源码与进展请移步 GitHub 组织主页，欢迎提 Issue 反馈。",
  },
  en: {
    // Nav
    "nav.workbench": "Workbench",
    "nav.daynight": "Light & Dark",
    "nav.sanger": "Sanger Trace",
    "nav.toolbox": "Toolbox",
    "nav.download": "Download",
    "nav.docs": "Dev Docs",
    "nav.projects": "Projects",
    "nav.cta": "Free Download",
    "nav.lang": "中",

    // Hero
    "hero.badge": "IN FREE BETA",
    "hero.badgeEn": "Free Beta · Cross-platform",
    "hero.titleCn": "Gene Map Editor",
    "hero.titleEn": "Cross-platform",
    "hero.desc":
      "An editor that feels right for everyday plasmid work — open plasmid maps, edit sequences, manage annotations, check restriction sites, and align Sanger traces. Design and verify routine cloning — one tool covers it all.",
    "hero.download": "Download GenePad Free",
    "hero.tour": "Take a Look First",
    "hero.features": "MAP · ANNOTATION · ENZYME · PRIMER · TRACE",

    // Workbench
    "wb.eyebrow": "Workbench",
    "wb.title": <>A map is more than something to look at</>,
    "wb.lead":
      "View maps, edit sequences, inspect sites, compute protein properties — GenePad keeps it all in one context. Click anywhere, and you're there.",
    "wb.1.name": "Plasmid Atlas",
    "wb.1.desc":
      "Switch between circular and linear maps in one click. Promoters, CDS, origins and poly(A) signals are color-coded in layers with collision-free labels — even a vector with dozens of features fits into one readable map.",
    "wb.2.name": "Map → Sequence",
    "wb.2.desc":
      "Click a feature in the table and the sequence view jumps straight to that base range, with selection length, GC content and Tm shown alongside. Map and sequence were never two separate worlds.",
    "wb.3.name": "Restriction Sites",
    "wb.3.desc":
      "Sites are highlighted directly on the double-stranded sequence; hover to see the recognition sequence, strand direction and cut positions — even 5′ overhangs are marked. One glance tells you whether a cloning plan works.",
    "wb.4.name": "Protein Properties",
    "wb.4.desc":
      "Select a CDS and get molecular weight, pI, GRAVY, aliphatic index and extinction coefficient on the fly. Nineteen pI algorithms are built in for cross-checking, with the literature-recommended one by default.",

    // DayNight
    "dn.eyebrow": "Light & Dark",
    "dn.title": <>The lab lights can stay on late — but don't forget you have a life that matters more</>,
    "dn.lead":
      "The same high-density research interface in two complete palettes. Present maps on a projector by day, edit sequences deep into the night — neither strains your eyes.",
    "dn.day": "DAY",
    "dn.night": "NIGHT",
    "dn.state.day": "▸ LIGHT THEME — standard bench mode running",
    "dn.state.night": "▸ DARK THEME — late-night bench mode running",
    "dn.caption.day": "DAY MODE — the same vector, full view in a bright theme",
    "dn.caption.night": "NIGHT MODE — maps, sequences and enzyme sites fully dark-rendered",
    "dn.alt.day": "GenePad day mode",
    "dn.alt.night": "GenePad night mode",

    // Sanger
    "sg.eyebrow": "Sanger Trace",
    "sg.title": (
      <>
        Read sequencing results
        <br />
        against the reference
      </>
    ),
    "sg.lead":
      "Drop in an AB1 file: trace, reads and reference line up base by base, with alignment identity and E-value right in the results. Which reaction worked and where the mismatches are — no guessing.",
    "sg.badge.format": "AB1 trace",
    "sg.shot1": "2KB-RCA-F — trace aligned base-by-base with the reference",
    "sg.shot2": "TOP STRAND — mismatches highlighted in red, clear at a glance",

    // Toolbox
    "tb.eyebrow": "Toolbox",
    "tb.title": (
      <>
        Tools, right where
        <br />
        they should appear
      </>
    ),
    "tb.lead":
      "Select a sequence and right-click: gel simulation and sgRNA design are instantly at hand. In the global toolbox, the AI assistant and file library stand by. i18n and open-with support let it blend into your existing workflow.",
    "tb.groupA": "Context Menu",
    "tb.groupB": "Global Toolbox",
    "tb.groupC": "Openness",
    "tb.c1.name": "DNA Gel Simulation",
    "tb.c1.desc":
      "Select a sequence, pick gel simulation straight from the right-click menu, and preview agarose gel bands right away. Mainstream ladders like Trans2K® are built in — see the bands before you run the gel.",
    "tb.c2.name": "Protein Gel Simulation",
    "tb.c2.desc":
      "SDS-PAGE simulation: select a CDS or a stretch of amino acids and load directly via gel simulation in the right-click menu, with prestained ladders like PageRuler as molecular-weight references. Band positions computed on the spot.",
    "tb.c3.name": "CRISPR sgRNA Design",
    "tb.c3.desc":
      "Twelve recognition layouts including SpCas9, xCas9, Cas12a/b and TnpB, with PAM orientation, seed-region length and off-target filtering. Send candidates back to the map in one click.",
    "tb.t1.name": "AI Assistant",
    "tb.t1.desc":
      "Reads and writes the current file's sequence, features and primers directly: add features, compute Tm, translate proteins, predict ORFs — just tell it what to do in one sentence.",
    "tb.t2.name": "Gene File Library",
    "tb.t2.desc":
      "Opened vectors are indexed automatically, with AI-generated batch tags and folder watching. Locate a file directly by its plasmid info — no more memorizing long filenames — and you can even ask the AI assistant to find files for you. It stores indexes only; your original files are never touched.",
    "tb.o1.name": "i18n",
    "tb.o1.desc":
      "Chinese, English, Japanese, French, German and Russian interfaces built in. Export language packs and translate with AI assistance — bring your own language too.",
    "tb.o2.name": "Open With",
    "tb.o2.desc":
      "Built-in \"Open with\": hand a file to SnapGene, VS Code or any tool you like in one click. Works with your existing workflow — it never holds your files hostage.",

    // Download
    "dl.eyebrow": "Download",
    "dl.title": (
      <>
        Take it. Install it on
        <br />
        every device you own
      </>
    ),
    "dl.lead":
      "The lab desktop, your own laptop, your tablet, the phone in your pocket — the same GenePad, ready to open a vector file whenever you are.",
    "dl.note.desktop": "Desktop",
    "dl.note.linuxX64": "Desktop · x86_64",
    "dl.note.linuxArm64": "Desktop · ARM64",
    "dl.note.mobile": "Mobile",
    "dl.note.soon": "Coming soon",
    "dl.cmdTitle.recommended": "Command-line install (recommended)",
    "dl.cmdTitle.plain": "Command-line install",
    "dl.cmd.brewLabel": "macOS · Homebrew",
    "dl.cmd.npmLabel": "Linux · npm",
    "dl.cmd.npmLabelMac": "macOS · npm",
    "dl.cmd.note": "Copy this command, paste it into your terminal, and run it.",
    "dl.cmd.scriptLabel": "Linux · Install script",
    "dl.cmd.scriptLabelMac": "macOS · Install script",
    "dl.cmdTab.script": "Install script",
    "dl.cmdTab.npm": "npm",
    "dl.cmd.recommendedTag": "Recommended",
    "dl.or.mac": "Or use one of the options below",
    "dl.or.linux": "Or download the installers directly",
    "dl.ai.title": "AI-assisted install",
    "dl.ai.desc":
      "The macOS packages are unsigned, so a manual install takes a few extra steps. You can copy this prompt to an AI assistant (Kimi, ChatGPT, etc.) and let it walk you through the installation.",
    "dl.ai.prompt": `Please install an app called "GenePad" on macOS for me. Try these methods in order — stop at the first one that works:
1. Preferred (easiest): run the official one-click script — it auto-detects/installs Homebrew (switching to a CN mirror when needed):
   curl -fsSL https://genepad.cn/release/linux/install.sh | bash
   Then run: open -a GenePad.
2. Alternative: install with Homebrew (puts it in Applications automatically):
   brew install genepad/tap/genepad
   Then run: open -a GenePad. If Homebrew isn't installed, install it first:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. Next: install with npm (command-line launcher). If possible, also copy it into ~/Applications so it shows up in Applications/Launchpad:
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   Then open it with: open -a GenePad (or run: genepad)
4. Fallback (manual): the app is unsigned and a browser download gets flagged "damaged" by Gatekeeper, so download with curl and re-sign locally:
   curl -L -o /tmp/gene-pad-app.zip "https://genepad.cn/release/mac/macos-app.zip"
   unzip -o /tmp/gene-pad-app.zip -d /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ Note: some steps may fail or be outdated; if one doesn't work, find another viable approach yourself (e.g. a different way to bypass Gatekeeper, or other tools to extract/sign the app). Only visit the official site https://genepad.cn if the download link itself is dead — it only lists alternative download links and provides no install help.`,
    "dl.mac.other": "Other download options (DMG / APP direct links)",
    "dl.mac.unsigned":
      "Unsigned warning: .dmg / .app files downloaded through a browser are flagged as \"damaged\" by Gatekeeper. You'll need to right-click → Open, or run xattr -cr to strip the quarantine attribute. Prefer the command-line install above.",
    "dl.copy": "Copy",
    "dl.copied": "Copied ✓",
    "dl.filesTitle": "Download installers directly",
    "lb.close": "Close",
    "lb.prev": "Previous",
    "lb.next": "Next",
    "dl.source.direct": "Direct",
    "dl.source.gitee": "Gitee",
    "dl.source.github": "GitHub",
    "dl.giteeBadge": "CN CDN",
    "dl.arch.x64": "x86_64",
    "dl.arch.arm64": "ARM64",
    "dl.spark": "Spark Store",
    "dl.sparkNote": "Users of Chinese Linux distros can also install from the Spark app store",
    "dl.releases": "All releases (GitHub Releases)",
    "dl.releasesGitee": "All releases (Gitee mirror)",
    "dl.licenseTag": "LICENSE",
    "dl.license":
      "GenePad Free is free for personal evaluation and learning, covering everyday map viewing, editing and saving. Commercial, institutional and long-term research use will be covered by the upcoming GenePad Pro license.",

    // Footer
    "ft.blurb":
      "A lightweight, cross-platform gene map editor, built for the molecular cloning work you do every day — thanks to everyone who reports issues and shares suggestions.",
    "ft.col.download": "Download",
    "ft.col.support": "Feedback & Support",
    "ft.col.more": "More",
    "ft.giteeMirror": "Gitee Mirror",
    "ft.changelog": "Changelog",
    "ft.docs": "Dev Docs",
    "ft.projects": "Projects",
    "ft.sponsor": "Sponsor the Developer",
    "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

    // 子页面共用
    "sub.back": "Back to Home",

    // Tech support page
    "ts.eyebrow": "Developer Docs",
    "ts.title": "File Format Documentation",
    "ts.lead":
      "For developers building their own readers, converters or importers. The .gen and .gjson formats used by GenePad, plus the SnapGene .dna conversion scheme, are split into dedicated pages so you can jump straight to the implementation details.",
    "ts.group.formats": "File Formats",
    "ts.group.formatsEn": "FILE FORMATS",
    "ts.group.code": "Code Samples",
    "ts.group.codeEn": "CODE SAMPLES",
    "ts.gen.title": ".gen File Definition",
    "ts.gen.desc":
      "The SQLite 3 project file: 12 table definitions, field semantics, coordinate rules, chunking and the undo mechanism. After reading you'll be able to read and write .gen on your own.",
    "ts.gjson.title": ".gjson File Definition",
    "ts.gjson.desc":
      "The JSON exchange format: top-level fields, every object definition, and fidelity differences versus .gen. After reading you'll be able to parse .gjson.",
    "ts.dna.title": ".dna Conversion Scheme",
    "ts.dna.desc":
      "The SnapGene .dna binary packet structure, flags bits, field mapping, and 0-based↔1-based coordinate conversion.",
    "ts.rust.title": "Rust Reader Examples",
    "ts.rust.desc":
      "A minimal runnable implementation reading .gen with rusqlite and .gjson with serde_json, including dependencies and expected output.",
    "ts.readDoc": "Read the doc",
    "ts.feedback":
      "Missing something you need? Open an issue on GitHub or Gitee and we'll fill the gap.",

    // Projects page
    "pr.eyebrow": "Ecosystem Projects",
    "pr.title": "GenePad Ecosystem Projects",
    "pr.lead":
      "Beyond the editor itself, the GenePad organization maintains a set of small independent projects on GitHub — from a traceable plasmid common-features library to a tissue-specific codon usage pipeline. Free to pick up and use, they aim to save researchers and developers some repeated work.",
    "pr.specs": "Specifications",
    "pr.cf.head": "Plasmid Common Features",
    "pr.cf.title": "Common feature sequence library for plasmid construction",
    "pr.cf.desc":
      "A reusable element library assembled and cross-checked entry by entry from NCBI source reference plasmids. Every element records its NCBI accession and reference plasmid, so each sequence can be traced back to its origin — not just another unattributed consensus. After importing it into your plasmid software, these common elements are recognized automatically on any map you open.",
    "pr.cf.catsTitle": "20 categories covered",
    "pr.cf.usage":
      "Import the .gb files under genbank/ into the common features library of SnapGene or Benchling, and these elements are auto-annotated on any plasmid map you open; the .fa files under fasta/ can be used directly for BLAST.",
    "pr.ca.head": "Tissue-specific Codon Atlas",
    "pr.ca.title": "Human Tissue-Specific Codon Atlas",
    "pr.ca.desc":
      "An independently implemented pipeline that rebuilds per-tissue codon usage tables from public GTEx expression and GENCODE annotations, weighted by tissue expression. It provides a reproducible, auditable tissue-specific reference for codon optimization and heterologous expression design — without depending on third-party tables under restrictive licensing.",
    "pr.ca.metricsTitle": "Output metrics",
    "pr.ca.usage":
      "python scripts/build_atlas.py rebuilds every tissue table from GTEx / GENCODE inputs; check_release.py and package_release.py handle pre-release validation and packaging.",
    "pr.org.text":
      "These small projects are incubated by GenePad and maintained to the same standard. For more source code and progress, visit our GitHub organization — issues and feedback are welcome.",
  },
} as const;

export type TKey = keyof (typeof dict)["zh"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => ReactNode;
}>({
  lang: "zh",
  setLang: () => {},
  t: (k) => k,
});

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("genepad-lang");
    if (saved === "zh" || saved === "en") return saved;
  } catch {
    /* localStorage 不可用时忽略 */
  }
  // 按系统/浏览器首选语言判断：首选是中文（zh-CN/zh-TW/zh-HK…）就用中文，否则一律英文
  const primary =
    typeof navigator !== "undefined"
      ? navigator.language || navigator.languages?.[0] || ""
      : "";
  return primary.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("genepad-lang", l);
    } catch {
      /* 忽略写入失败 */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const t = (key: TKey): ReactNode => dict[lang][key] ?? dict.zh[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
