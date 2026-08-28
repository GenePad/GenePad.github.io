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
    "nav.library": "基因文件库",
    "nav.ngs": "NGS 数据查看",
    "nav.docs": "技术文档",
    "nav.projects": "生态项目",
    "nav.stats": "实时数据",
    "nav.cta": "免费下载/升级",
    "nav.lang": "EN",

    // Hero
    "hero.badge": "免费公测中",
    "hero.badgeEn": "Free Beta · Cross-platform",
    "hero.titleCn": "基因工坊",
    "hero.titleEn": "Gene Map Editor",
    "hero.desc":
      "面向日常分子克隆的跨平台基因图谱编辑器：浏览与编辑质粒图谱、管理序列标注、分析酶切位点、比对 Sanger 测序峰图，覆盖克隆设计与结果核验的完整流程。",
    "hero.download": "免费下载/升级",
    "hero.tour": "查看界面",
    "hero.features": "图谱 · 标注 · 酶切 · 引物 · 峰图",
    "hero.platforms": "支持平台",

    // Workbench
    "wb.eyebrow": "Workbench · 图谱工作台",
    "wb.title": <>图谱、序列与分析的一体化工作台</>,
    "wb.lead":
      "图谱浏览、序列编辑、酶切位点查询与蛋白属性计算集成于同一界面，各视图按所选对象联动定位。",
    "wb.1.name": "整体图谱",
    "wb.1.desc":
      "支持环形与线性视图一键切换；启动子、CDS、复制起点、poly(A) 信号等元件按类别分层着色，标签自动避让，元件众多的载体仍可保持图谱清晰可读。",
    "wb.2.name": "图谱直达序列",
    "wb.2.desc":
      "在标注表中选定条目，序列视图即定位至对应碱基区间，并同步显示选区长度、GC 含量与 Tm 值；图谱与序列双向联动。",
    "wb.3.name": "酶切位点",
    "wb.3.desc":
      "酶切位点直接标注于双链序列，悬停即可查看识别序列、链方向与上下切口位置，5′ 突出末端明确标示，便于快速核验克隆方案。",
    "wb.4.name": "蛋白属性",
    "wb.4.desc":
      "选中 CDS 即可实时计算分子量、等电点、GRAVY、脂肪族指数与消光系数；等电点内置 19 种算法供对照，默认输出文献推荐的算法结果。",

    // DayNight
    "dn.eyebrow": "Light & Dark · 昼夜模式",
    "dn.title": (
      <>
        明暗双主题，
        <br />
        为长时间工作而设计
      </>
    ),
    "dn.lead":
      "同一研究界面提供两套完整配色：明亮主题适用于投影、演示与日间环境；深色主题降低夜间长时间使用的视觉负担。",
    "dn.day": "白天 DAY",
    "dn.night": "夜间 NIGHT",
    "dn.state.day": "▸ LIGHT THEME — 明亮主题运行中",
    "dn.state.night": "▸ DARK THEME — 深色主题运行中",
    "dn.caption.day": "DAY MODE — 同一载体在明亮主题下的完整视图",
    "dn.caption.night": "NIGHT MODE — 图谱、序列与酶切位点的深色主题渲染",
    "dn.alt.day": "GenePad 明亮主题",
    "dn.alt.night": "GenePad 深色主题",

    // Sanger
    "sg.eyebrow": "Sanger Trace · 测序比对",
    "sg.title": (
      <>
        Sanger 测序结果与参考序列
        <br />
        逐碱基比对
      </>
    ),
    "sg.lead":
      "导入 AB1 峰图文件，色谱、reads 与参考序列按碱基逐一对齐，结果中直接给出比对一致率与 E-value，可据此判断各测序反应的质量及错配位置。",
    "sg.badge.format": "AB1 峰图",
    "sg.shot1": "2KB-RCA-F — 峰图与参考序列逐碱基对齐",
    "sg.shot2": "TOP STRAND — 错配位点以红色标出",

    // Toolbox
    "tb.eyebrow": "Toolbox · 工具箱",
    "tb.title": <>丰富的工具箱</>,
    "tb.lead":
      "选中序列后，电泳模拟与 sgRNA 设计可直接自右键菜单调用；全局工具箱提供 AI 助手与基因文件库；多语言界面与「打开方式」支持，便于与既有工作流整合。",
    "tb.groupA": "右键菜单",
    "tb.groupB": "全局工具箱",
    "tb.groupC": "开放性",
    "tb.c1.name": "DNA 电泳模拟",
    "tb.c1.desc":
      "选中序列后经右键菜单启动电泳模拟，预览琼脂糖凝胶条带位置；内置 Trans2K® 等主流分子量标准，可在实验前预估电泳结果。",
    "tb.c2.name": "蛋白电泳模拟",
    "tb.c2.desc":
      "SDS-PAGE 模拟：选中 CDS 或氨基酸区段即可上样，以 PageRuler 等预染分子量标准为参照，实时计算条带位置。",
    "tb.c3.name": "CRISPR sgRNA 设计",
    "tb.c3.desc":
      "支持 SpCas9、xCas9、Cas12a/b、TnpB 等 12 种识别布局，PAM 方向、种子区长度与脱靶过滤均可配置，候选序列可一键标注回图谱。",
    "tb.t1.name": "AI 助手",
    "tb.t1.desc":
      "可直接读写当前文件的序列、标注与引物；添加 feature、计算 Tm、翻译蛋白、预测 ORF 等操作均可以自然语言指令完成。",
    "tb.t2.name": "基因文件库",
    "tb.t2.desc":
      "打开过的载体文件自动建立索引，AI 批量生成性质标签，支持监视文件夹；可依据质粒属性检索定位文件，无需记忆文件名，也可通过 AI 助手检索。仅建立索引，不改动原始文件。",
    "tb.o1.name": "多语言",
    "tb.o1.desc":
      "内置中、英、日、法、德、俄六种界面语言；支持导出语言包，并可通过 AI 辅助翻译接入自定义语言。",
    "tb.o2.name": "开放协作",
    "tb.o2.desc":
      "内置「打开方式」：可将文件一键交给 SnapGene、VS Code 或其他指定工具处理，与既有工作流协同，不限制文件的使用方式。",
    "tb.more": "详细介绍",

    // 首页基因文件库推荐节
    "lp.lead":
      "基因文件库将分散存储的质粒文件统一纳入可检索索引，支持按项目、按存储路径、按 AI 生成标签三种方式管理；无需记忆文件名与路径，凭一至两项属性特征即可由 AI 完成检索定位。",
    "lp.c1": "项目 · 路径 · 标签",
    "lp.c2": "AI 自动打标签",
    "lp.c3": "自然语言检索",
    "lp.c4": "监视文件夹自动索引",
    "lp.safe": "仅建立索引，不改动原始文件",
    "lp.cta": "了解更多",

    // Download
    "dl.eyebrow": "Download · 下载 / 覆盖升级",
    "dl.title": (
      <>
        覆盖桌面与移动端的
        <br />
        全平台客户端
      </>
    ),
    "dl.lead":
      "支持 Windows、macOS、Linux 桌面端与 Android 移动端，各平台功能一致。首次使用下载安装包即可完成安装；已安装的用户直接下载最新版覆盖安装即可升级，无需卸载旧版本。",
    "dl.note.desktop": "桌面端",
    "dl.note.linuxX64": "桌面端 · x86_64",
    "dl.note.linuxArm64": "桌面端 · ARM64",
    "dl.note.mobile": "移动端",
    "dl.note.soon": "敬请期待",
    "dl.upgradeNote":
      "已安装 GenePad？直接下载最新安装包覆盖安装即可完成升级，无需卸载旧版本；新用户下载后按提示安装即可。",
    "dl.cmdTitle.recommended": "命令行安装/升级（推荐）",
    "dl.cmdTitle.plain": "命令行安装/升级",
    "dl.cmd.brewLabel": "macOS · Homebrew",
    "dl.cmd.npmLabel": "Linux · npm",
    "dl.cmd.npmLabelMac": "macOS · npm",
    "dl.cmd.note": "复制以上命令，在终端中粘贴并执行。",
    "dl.cmd.scriptLabel": "Linux · 一键安装/升级脚本",
    "dl.cmd.scriptLabelMac": "macOS · 一键安装/升级脚本",
    "dl.cmdTab.script": "一键脚本",
    "dl.cmdTab.npm": "npm",
    "dl.cmd.recommendedTag": "推荐",
    "dl.or.linux": "或直接下载安装包",
    "dl.ai.title": "AI 辅助安装/升级",
    "dl.ai.desc":
      "macOS 安装包未签名，手动安装步骤较多。可将以下提示词复制给 AI 助手（Kimi、ChatGPT 等），在其引导下逐步完成安装。",
    "dl.ai.prompt": `请协助我在 macOS 上安装名为「GenePad」的应用。请按以下顺序尝试，任一方法成功即可停止：
1. 首选：运行官方一键安装脚本（自动检测并安装 Homebrew，按网络情况切换国内镜像）。请务必带上 -q 参数：脚本结束时默认需按回车才会退出，加 -q 可跳过等待，便于无人值守执行：
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   安装完成后运行 open -a GenePad。
2. 备选：通过 Homebrew 安装（自动加入「应用程序」）：
   brew install genepad/tap/genepad
   安装完成后运行 open -a GenePad。若系统未安装 Homebrew，请先安装：
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. 第三种方式：通过 npm 安装（命令行启动）。如可行，同时复制到 ~/Applications，使其出现在「应用程序」与启动台中：
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   之后运行 open -a GenePad（或命令行运行 genepad）
4. 手动方式（兜底）：该应用未签名，浏览器下载的文件会被 Gatekeeper 标记为「已损坏」，因此使用 curl 下载并本地签名：
   curl -L -o /tmp/gene-pad-app.zip "https://genepad.cn/release/mac/macos-app.zip"
   unzip -o /tmp/gene-pad-app.zip -d /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ 注意：以上方法可能失效或已过时。若某一步无法完成，请自行改用其他可行方案（例如换一种绕过 Gatekeeper 的方式，或使用其他解压、签名工具）。仅当上述下载链接无法访问时，再访问官网 https://genepad.cn——官网仅提供其他下载链接，不提供安装支持。`,
    "dl.mac.other": "其他安装/升级方式（Homebrew / npm / AI 辅助 / 安装包直链）",
    "dl.mac.unsigned":
      "未签名说明：浏览器直接下载的 .dmg / .app 文件会被 Gatekeeper 标记为「已损坏」。请通过右键 →「打开」运行，或执行 xattr -cr 移除隔离属性；建议优先采用上述命令行安装/升级方式。",
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
    "dl.sparkNote": "使用国产 Linux 发行版的用户，也可通过星火应用商店安装/升级",
    "dl.releases": "全部版本（GitHub Releases）",
    "dl.releasesGitee": "全部版本（Gitee 镜像）",
    "dl.licenseTag": "LICENSE · 授权",
    "dl.license":
      "GenePad Free 面向个人评估与学习免费，涵盖日常的图谱查看、编辑与保存；商业、机构及长期科研使用，将由后续发布的 GenePad Pro 授权支持。",

    // Footer
    "ft.blurb":
      "轻量、跨平台的基因图谱编辑器，服务于日常分子克隆工作。感谢所有提交问题与建议的用户。",
    "ft.col.download": "下载",
    "ft.col.support": "反馈与支持",
    "ft.col.more": "更多",
    "ft.giteeMirror": "Gitee 镜像",
    "ft.changelog": "更新日志",
    "ft.docs": "技术文档",
    "ft.projects": "生态项目",
    "ft.library": "基因文件库",
    "ft.ngs": "NGS 数据查看",
    "ft.sponsor": "赞助开发者",
    "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

    // 子页面共用
    "sub.back": "返回首页",

    // Tech support page
    "ts.eyebrow": "Developer Docs · 技术文档",
    "ts.title": "文件格式开发文档",
    "ts.lead":
      "面向需要自行开发读取、转换或导入程序的开发者：GenePad 使用的 .gen、.gjson 格式及 SnapGene .dna 转换方案已拆分为独立页面，便于快速定位实现细节。",
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
      "如文档未覆盖所需内容，可在 GitHub 或 Gitee 提交 Issue，我们将补充完善。",

    // Projects page
    "pr.eyebrow": "Ecosystem Projects · 生态项目",
    "pr.title": "GenePad 生态项目",
    "pr.lead":
      "围绕分子克隆工具链，GenePad 组织在 GitHub 上维护若干独立项目：从可溯源的质粒通用元件库，到组织特异性密码子统计管线。各项目与主程序相互独立，可单独取用，旨在为科研工作者与开发者减少重复性工作。",
    "pr.specs": "数据规格",
    "pr.cf.head": "质粒通用元件库",
    "pr.cf.title": "质粒构建通用元件序列库",
    "pr.cf.desc":
      "从 NCBI 源参考质粒中逐条整理与核对的可复用元件序列库。每条元件均记录 NCBI 登录号与参考质粒名，序列来源可逐条回溯。导入质粒软件后，打开图谱即可自动识别这些常见元件。",
    "pr.cf.catsTitle": "20 个覆盖分类",
    "pr.cf.usage":
      "将 genbank/ 下的 .gb 导入 SnapGene 或 Benchling 的 common features 库，打开任意质粒图即可自动识别这些元件；fasta/ 下的 .fa 可直接用于 BLAST 比对。",
    "pr.ca.head": "组织特异性密码子图谱",
    "pr.ca.title": "人类组织特异性密码子图谱",
    "pr.ca.desc":
      "独立实现的统计管线：以公开的 GTEx 基因表达与 GENCODE 注释为上游，按组织表达量加权，为人体每个组织重建密码子使用表，为密码子优化与异源表达设计提供可复现、可审查的组织特异性参考，避免依赖授权受限的第三方成品表。",
    "pr.ca.metricsTitle": "输出指标",
    "pr.ca.usage":
      "python scripts/build_atlas.py 按 GTEx / GENCODE 输入重建全部组织表；check_release.py 与 package_release.py 负责发布前校验与打包。",
    "pr.org.text":
      "上述项目由 GenePad 主项目孵化，并按同一标准维护。源码与进展请访问 GitHub 组织主页，欢迎提交 Issue 反馈。",

    // Library page（基因文件库宣传页）
    "lib.eyebrow": "Gene File Library · 基因文件库",
    "lib.title": (
      <>
        质粒文件的
        <br />
        统一检索与管理
      </>
    ),
    "lib.lead":
      "随着课题积累，质粒文件往往分散于多个文件夹、磁盘与设备，文件名与质粒属性之间缺乏对应关系。基因文件库将分散的质粒文件纳入统一的可检索索引，支持按项目、按存储路径、按 AI 生成标签三种管理方式；无需记忆具体名称与路径，凭一至两项属性特征即可由 AI 完成检索定位。",
    "lib.hero.shot": "LIBRARY — 331 份质粒已建立索引，右侧为文库标签云",

    "lib.pain.head": "常见问题",
    "lib.pain.headEn": "COMMON ISSUES",
    "lib.pain.title": "质粒文件管理中的常见困境",
    "lib.pain.1.name": "规模持续增长",
    "lib.pain.1.desc":
      "随着课题推进，质粒常由数十份积累至数百份，文件夹层级嵌套日深，仅凭目录结构难以定位目标文件。",
    "lib.pain.2.name": "存放位置难以回忆",
    "lib.pain.2.desc":
      "同一质粒可能存于不同文件夹、磁盘或设备；需要使用时，往往无法确定其具体位置。",
    "lib.pain.3.name": "文件名与属性脱节",
    "lib.pain.3.desc":
      "检索意图通常以属性描述（如「携带某基因的载体」），而 pLH-sgRNA1-Muc4-11 一类的文件名并不反映质粒性质，二者缺乏对应关系。",

    "lib.ways.head": "三种管理方式",
    "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
    "lib.ways.title": "项目、路径、标签——三种组织维度",
    "lib.ways.1.name": "按项目分类",
    "lib.ways.1.desc":
      "新建项目并拖入质粒完成归类，一个课题对应一个项目；打开项目即可查看该课题的全部质粒。",
    "lib.ways.2.name": "按存储路径",
    "lib.ways.2.desc":
      "不移动、不复制任何文件，按实际存放位置原样浏览；文件库仅为索引，不改动原始文件。",
    "lib.ways.3.name": "按质粒标签",
    "lib.ways.3.desc":
      "由 AI 读取每个质粒的序列与标注，自动生成 lentiviral、sgRNA、ampicillin 等性质标签；点击标签即可筛选出全部相关质粒，实现按属性而非按名称定位。",

    "lib.tags.head": "AI 标签",
    "lib.tags.headEn": "AI TAGS",
    "lib.tags.title": "AI 自动生成性质标签",
    "lib.tags.desc":
      "配置 AI 后，扫描或打开质粒时，程序自动读取序列与元件，为每个文件生成一组性质标签；也可在表头批量刷新——仅补充缺失标签，或全部重新生成。右侧标签云呈现整个文库的属性分布，通过若干属性的组合筛选即可定位目标文件。",
    "lib.tags.shot": "表头批量刷新 — 仅补充无标签项，或全部重新生成",

    "lib.ai.head": "AI 助手",
    "lib.ai.headEn": "AI ASSISTANT",
    "lib.ai.title": "通过 AI 助手直接检索",
    "lib.ai.desc":
      "可直接向 AI 助手发出指令，例如「查找一个 Type I CRISPR 质粒」：助手将检索整个文库，列出候选并说明各质粒的性质与推荐用途；也可要求「整理我的质粒文库」，助手会先分析文库现状，再给出整理方案。",
    "lib.ai.shot1": "AI ASSISTANT — 「整理我的质粒文库」：先分析现状，再给出方案",
    "lib.ai.shot2": "AI ASSISTANT — 「查找 Type I CRISPR 质粒」：候选与性质一并列出",

    "lib.setup.head": "快速开始",
    "lib.setup.headEn": "GETTING STARTED",
    "lib.setup.title": "完成初始配置仅需数分钟",
    "lib.setup.lead":
      "基因文件库位于 GenePad 的工具箱中，打开后按以下步骤配置：",
    "lib.setup.1.name": "打开配置入口",
    "lib.setup.1.desc":
      "首次打开基因文件库时，点击顶部横幅中的「配置 AI」；此后可随时通过右上角 AI 图标进入设置。",
    "lib.setup.1.shot": "首次打开 — 点击顶部横幅中的「配置 AI」",
    "lib.setup.2.name": "新建 DeepSeek 配置",
    "lib.setup.2.desc":
      "点击「新建配置」并命名；提供商选择 DeepSeek，模型选择 deepseek-v4-flash，然后点击 API Key 旁的「获取」。",
    "lib.setup.2.shot": "AI 设置 — 新建配置，选择 DeepSeek，点击「获取」",
    "lib.setup.3.name": "获取 DeepSeek API 密钥",
    "lib.setup.3.desc":
      "浏览器将打开 DeepSeek 开放平台：注册账号并充值少量额度后，点击「创建 API key」；密钥仅显示一次，创建后请立即复制。",
    "lib.setup.3.shot": "DEEPSEEK 开放平台 — 创建并立即复制 API key",
    "lib.setup.4.name": "粘贴密钥并保存",
    "lib.setup.4.desc":
      "返回软件粘贴密钥，点击「测试连接」，确认显示「连接成功」后点击「保存当前配置」，AI 功能即配置完成。",
    "lib.setup.4.shot": "连接测试成功 — 保存当前配置",
    "lib.setup.5.name": "设置监视文件夹",
    "lib.setup.5.desc":
      "点击「监视文件夹」，添加存放质粒的文件夹。此后每次启动均自动扫描：新增质粒自动入库，已删除的自动移除，无需手动维护。",
    "lib.setup.5.shot": "监视文件夹 — 新增入库、删除移除，自动同步",
    "lib.setup.note":
      "配置 AI 后，入库质粒将自动生成标签；暂不配置不影响入库功能，仅无法使用标签与 AI 助手。",

    "lib.daily.head": "日常工作流",
    "lib.daily.headEn": "DAILY WORKFLOW",
    "lib.daily.title": "检索结果可直接打开使用",
    "lib.daily.1.name": "以常用工具打开",
    "lib.daily.1.desc":
      "右键任意质粒 →「使用其它打开方式」，可将文件交给 SnapGene（图谱）、VS Code（序列）等工具处理，与既有工作流整合。",
    "lib.daily.2.name": "标签支持自定义",
    "lib.daily.2.desc":
      "可在详情面板中随时编辑标签：删除 AI 生成的错误标签，添加「已验证」等自定义标签。",
    "lib.daily.shot":
      "右键菜单 — 打开、打开所在目录、交给 SnapGene / VS Code；右侧详情面板可增删标签",

    "lib.final.title": "基因文件库为 GenePad 的内置模块，并非独立软件",
    "lib.final.desc":
      "基因文件库内置于 GenePad 基因图谱编辑器：下载安装/升级 GenePad 后，在工具箱中即可使用。当前为免费公测阶段，覆盖全部平台。",
    "lib.final.cta": "返回主页",
    "lib.final.cta2": "立即下载",
    "lib.top.hint": "直达底部下载区",

    // 首页 NGS 数据查看推荐节
    "np.lead":
      "直接打开 fastq.gz / fastq / fq.gz / fq 测序文件：右键或拖入即可，双端文件自动配对拼接；逐碱基查看测序质量，按氨基酸搜索定位多变区，设置锚点批量裁切，一键生成文库丰度报告。",
    "np.c1": "fastq.gz · fq.gz 免解压",
    "np.c2": "双端自动配对拼接",
    "np.c3": "逐碱基测序质量",
    "np.c4": "锚点裁切 + 丰度报告",
    "np.cta": "了解更多",
    "np.safe": "GenePad 内置功能 · 免费公测 · 覆盖全平台",

    // NGS 数据查看页
    "ngs.eyebrow": "NGS Data Viewer · NGS 数据查看",
    "ngs.title": (
      <>
        二代测序（NGS）数据直接打开，
        <br />
        逐条查看、检索与统计
      </>
    ),
    "ngs.lead":
      "GenePad 可直接打开 fastq.gz / fastq / fq.gz / fq 测序文件：在资源管理器中右键「打开方式」选择 GenePad，或将文件直接拖入程序窗口；双端测序把 R1、R2 两个文件一起拖入，配对关系自动识别。打开后可逐条浏览 reads、检查每个碱基的测序质量与双端拼接效果；以氨基酸片段搜索定位目标多变区，设置裁切锚点后对整个文件批量裁切，最终一键生成文库丰度报告。",
    "ngs.hero.shot":
      "FASTQ VIEWER — 双端 reads 自动拼接，逐碱基按质量着色，右侧为文件统计",

    "ngs.open.head": "打开测序文件",
    "ngs.open.headEn": "OPENING FASTQ FILES",
    "ngs.open.title": "右键、拖入即可打开，无需命令行",
    "ngs.open.lead":
      "支持 fastq.gz、fastq、fq.gz、fq 四种扩展名，gzip 压缩文件无需预先解压。安装/升级 GenePad 后，两种方式任选其一：",
    "ngs.open.1.name": "右键「打开方式」",
    "ngs.open.1.desc":
      "在资源管理器中右键测序文件 →「打开方式」：子菜单中直接选择 GenePad，或在「选择其他应用」列表中选中 GenePad 并设为默认——此后双击测序文件即可直接打开。",
    "ngs.open.2.name": "拖入窗口",
    "ngs.open.2.desc":
      "将一个或多个测序文件直接拖入 GenePad 窗口，欢迎页与工作界面均支持拖放打开。",
    "ngs.open.1.shot": "右键菜单 — 「打开方式」→ GenePad",
    "ngs.open.1.shot2": "选择其他应用 — 在系统列表中选中 GenePad，可设为默认",
    "ngs.open.2.shot": "拖入窗口 — 多个测序文件一起拖入即可打开",

    "ngs.pair.head": "双端测序",
    "ngs.pair.headEn": "PAIRED-END",
    "ngs.pair.title": "双端文件自动识别、自动配对",
    "ngs.pair.desc":
      "把 R1、R2 两个文件一起拖入窗口，程序按首条 read 的 ID 自动识别配对关系；一次拖入多对文件时弹出配对确认框，可手动调整分组或点击 Auto-pair 一键配对。确认后每一对作为一份双端数据打开——属性面板标注 Paired-end，工具栏提供 Swap R1/R2 一键交换。",
    "ngs.pair.shot": "PAIR NGS FILES — 按首条 read ID 自动配对，也可手动调整",

    "ngs.reads.head": "逐条浏览",
    "ngs.reads.headEn": "READS & QUALITY",
    "ngs.reads.title": "每条 read 的质量与拼接效果一目了然",
    "ngs.reads.lead":
      "主界面自上而下列出测序得到的每一条 read，右侧属性面板汇总整个文件的测序统计：",
    "ngs.reads.1.name": "双端自动拼接",
    "ngs.reads.1.desc":
      "双端数据逐条自动拼接（merge），每条 read 显示重叠长度与一致性（如 Overlap 135bp · 99% identity），拼接效果一眼可辨。",
    "ngs.reads.2.name": "逐碱基测序质量",
    "ngs.reads.2.desc":
      "每个碱基按 Phred 质量着色：≥30 绿、20–29 橙、<20 红，低质量区域在质量条中直观可见，无需逐个查看数值。",
    "ngs.reads.3.name": "文件统计",
    "ngs.reads.3.desc":
      "属性面板汇总 reads 数、碱基数、read 长度、平均质量、质量分布、GC 含量与编码格式，支持 Overall / R1 / R2 分组查看；超大文件仅加载预览部分，统计与分析仍覆盖整个文件。",
    "ngs.reads.shot":
      "READS & QUALITY — 自上而下逐条浏览：双端拼接、逐碱基质量条与右侧文件统计",

    "ngs.aa.head": "氨基酸搜索",
    "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
    "ngs.aa.title": "按蛋白片段定位感兴趣的多变区",
    "ngs.aa.desc":
      "将底部搜索框切换到 AA 模式，输入一段氨基酸序列（如 MATNNQ），程序把拼接后的 read 翻译为蛋白并逐条比对，命中的肽段直接在序列中框出。文库测序的两侧序列保守、中间多变：用一段已知的保守蛋白作查询，即可在数千条 reads 中快速定位各自的目标多变区。",
    "ngs.aa.shot": "AA SEARCH — 输入氨基酸片段，命中肽段在翻译结果中高亮框出",

    "ngs.trim.head": "锚点裁切",
    "ngs.trim.headEn": "TRIM ANCHORS",
    "ngs.trim.title": "设置裁切锚点，精准截取目标区段",
    "ngs.trim.desc":
      "把目标区段两侧的保守序列设为左右裁切锚点（Trim anchors），点击 Trim 即对整个测序文件批量裁切，仅保留两锚点之间的多变区序列。属性面板实时反馈通过比例，以及锚点未命中、片段过短等被剔除的数量；裁切后的 reads 可一键导出（Export processed reads），用于后续分析或提交。",
    "ngs.trim.shot": "TRIM ANCHORS — 左右锚点框出目标窗口，实时显示通过比例",

    "ngs.report.head": "文库丰度分析",
    "ngs.report.headEn": "LIBRARY ANALYSIS",
    "ngs.report.title": "对整个文件一键生成丰度报告",
    "ngs.report.desc":
      "点击 Sequence analysis 对裁切结果执行统计：默认直接分析整个文件（数千万条 reads 无需全部载入内存），统计每个唯一序列的出现次数与频率，并可选择保留或去除两端锚点。分析完成后生成图文报告——Top 序列直方图（DNA / AA 两种口径）与逐条序列的长度、计数、频率与 +1 阅读框翻译，完整表格同时导出为 CSV，可直接用 Excel 打开。一份简单的文库丰度报告就此完成。",
    "ngs.report.shot1": "SEQUENCE ANALYSIS — 默认分析整个文件，可选保留 / 去除锚点",
    "ngs.report.shot2": "ANALYSIS REPORT — Top 序列直方图与完整丰度表（CSV）",

    "ngs.video.head": "视频教程",
    "ngs.video.headEn": "VIDEO TUTORIAL",
    "ngs.video.lead":
      "图文看不够？这里有一段完整操作演示：从打开测序文件、双端配对，到锚点裁切与生成丰度报告，全流程在真实数据上逐步走一遍，可直接在页面内播放。",
    "ngs.video.caption": "VIDEO TUTORIAL — 完整流程演示：打开 → 配对 → 浏览 → 搜索 → 裁切 → 丰度报告",

    "ngs.final.title": "NGS 数据查看是 GenePad 的内置功能，并非独立软件",
    "ngs.final.desc":
      "NGS 数据查看内置于 GenePad 基因图谱编辑器：下载安装/升级后即可直接打开测序文件，与图谱编辑、Sanger 峰图比对等功能在同一程序内配合使用。当前为免费公测阶段，覆盖全部平台。",
    "ngs.final.cta": "返回主页",
    "ngs.final.cta2": "立即下载",
    "ngs.top.hint": "直达底部下载区",

    // Stats 子页（实时数据）
    "st.eyebrow": "Live Stats · 实时数据",
    "st.title": (
      <>
        真实使用数据，
        <br />
        公开可查
      </>
    ),
    "st.lead":
      "以下数字由 GenePad 应用内的匿名使用统计汇总而来：每个安装实例仅以一个随机标识计数，不包含任何序列、文件或个人信息。数据随每次上报自动更新，无需注册即可使用 GenePad。",
    "st.k.installs": "总装机数",
    "st.k.active30": "近 30 天活跃",
    "st.k.active7": "近 7 天活跃",
    "st.k.hours": "累计使用时长",
    "st.k.hoursUnit": "小时",
    "st.chart.title": "每周新增装机",
    "st.chart.caption": "WEEKLY NEW INSTALLS — 按安装实例首次运行时间统计",
    "st.os.title": "装机系统分布",
    "st.os.other": "其他",
    "st.updated": "数据更新于",
    "st.note": "统计口径：以随机安装标识聚合，关闭统计或卸载后不再计数。",
    "st.error": "统计数据暂时取不到，请稍后刷新重试。",
    "st.cta": "免费下载，成为下一位用户",
  },
  en: {
    // Nav
    "nav.workbench": "Workbench",
    "nav.daynight": "Light & Dark",
    "nav.sanger": "Sanger Trace",
    "nav.toolbox": "Toolbox",
    "nav.download": "Download",
    "nav.library": "File Library",
    "nav.ngs": "NGS Viewer",
    "nav.docs": "Dev Docs",
    "nav.projects": "Projects",
    "nav.stats": "Live Stats",
    "nav.cta": "Free Download / Upgrade",
    "nav.lang": "中",

    // Hero
    "hero.badge": "IN FREE BETA",
    "hero.badgeEn": "Free Beta · Cross-platform",
    "hero.titleCn": "Gene Map Editor",
    "hero.titleEn": "Cross-platform",
    "hero.desc":
      "A cross-platform gene map editor for everyday molecular cloning: browse and edit plasmid maps, manage sequence annotations, analyze restriction sites, and align Sanger traces — covering the full workflow from cloning design to result verification.",
    "hero.download": "Download / Upgrade Free",
    "hero.tour": "View the interface",
    "hero.features": "MAP · ANNOTATION · ENZYME · PRIMER · TRACE",
    "hero.platforms": "Available on",

    // Workbench
    "wb.eyebrow": "Workbench",
    "wb.title": <>A unified workbench for maps, sequences, and analysis</>,
    "wb.lead":
      "Map viewing, sequence editing, restriction-site inspection and protein property computation are integrated in a single interface, with views linked to the selected object.",
    "wb.1.name": "Plasmid Atlas",
    "wb.1.desc":
      "Switch between circular and linear maps in one click. Promoters, CDS, origins and poly(A) signals are color-coded by category with automatic label collision avoidance, keeping even feature-dense vectors clearly readable.",
    "wb.2.name": "Map → Sequence",
    "wb.2.desc":
      "Selecting an entry in the feature table positions the sequence view on the corresponding base range, with selection length, GC content and Tm displayed alongside; map and sequence remain linked in both directions.",
    "wb.3.name": "Restriction Sites",
    "wb.3.desc":
      "Restriction sites are annotated directly on the double-stranded sequence; hovering reveals the recognition sequence, strand direction and cut positions, including 5′ overhangs, so cloning schemes can be verified at a glance.",
    "wb.4.name": "Protein Properties",
    "wb.4.desc":
      "Selecting a CDS computes molecular weight, pI, GRAVY, aliphatic index and extinction coefficient in real time; 19 pI algorithms are built in for cross-checking, with the literature-recommended result shown by default.",

    // DayNight
    "dn.eyebrow": "Light & Dark",
    "dn.title": (
      <>
        Light and dark themes,
        <br />
        designed for long working sessions
      </>
    ),
    "dn.lead":
      "One research interface in two complete palettes: the light theme suits projection, presentation and daytime environments; the dark theme reduces visual fatigue during prolonged night-time use.",
    "dn.day": "DAY",
    "dn.night": "NIGHT",
    "dn.state.day": "▸ LIGHT THEME — light theme active",
    "dn.state.night": "▸ DARK THEME — dark theme active",
    "dn.caption.day": "DAY MODE — the same vector, full view in the light theme",
    "dn.caption.night": "NIGHT MODE — maps, sequences and enzyme sites rendered in the dark theme",
    "dn.alt.day": "GenePad light theme",
    "dn.alt.night": "GenePad dark theme",

    // Sanger
    "sg.eyebrow": "Sanger Trace",
    "sg.title": (
      <>
        Sanger sequencing results aligned
        <br />
        base by base with the reference
      </>
    ),
    "sg.lead":
      "Import an AB1 file: chromatogram, reads and reference sequence align base by base, with alignment identity and E-value reported in the results — reaction quality and mismatch positions can be read directly.",
    "sg.badge.format": "AB1 trace",
    "sg.shot1": "2KB-RCA-F — trace aligned base-by-base with the reference",
    "sg.shot2": "TOP STRAND — mismatch positions highlighted in red",

    // Toolbox
    "tb.eyebrow": "Toolbox",
    "tb.title": <>A comprehensive toolbox</>,
    "tb.lead":
      "With a sequence selected, gel simulation and sgRNA design are available directly from the context menu; the global toolbox provides the AI assistant and the Gene File Library; multilingual interface and open-with support ease integration with existing workflows.",
    "tb.groupA": "Context Menu",
    "tb.groupB": "Global Toolbox",
    "tb.groupC": "Openness",
    "tb.c1.name": "DNA Gel Simulation",
    "tb.c1.desc":
      "Select a sequence and launch gel simulation from the context menu to preview agarose band positions; mainstream ladders such as Trans2K® are built in, so expected results can be reviewed before running the gel.",
    "tb.c2.name": "Protein Gel Simulation",
    "tb.c2.desc":
      "SDS-PAGE simulation: select a CDS or an amino-acid segment to load the sample, with prestained ladders such as PageRuler as molecular-weight references; band positions are computed in real time.",
    "tb.c3.name": "CRISPR sgRNA Design",
    "tb.c3.desc":
      "Twelve recognition layouts including SpCas9, xCas9, Cas12a/b and TnpB, with configurable PAM orientation, seed-region length and off-target filtering; candidates can be annotated back onto the map in one click.",
    "tb.t1.name": "AI Assistant",
    "tb.t1.desc":
      "Reads and writes the current file's sequence, features and primers directly; adding features, computing Tm, translating proteins and predicting ORFs can all be requested in natural language.",
    "tb.t2.name": "Gene File Library",
    "tb.t2.desc":
      "Opened vectors are indexed automatically, with AI-generated batch tags and watched folders; files can be located by plasmid attributes without memorizing filenames, and retrieved through the AI assistant. Indexes only — original files are never modified.",
    "tb.o1.name": "Multilingual",
    "tb.o1.desc":
      "Chinese, English, Japanese, French, German and Russian interfaces are built in; language packs can be exported and custom languages added through AI-assisted translation.",
    "tb.o2.name": "Open With",
    "tb.o2.desc":
      "A built-in \"Open with\" function hands files to SnapGene, VS Code or any other designated tool in one click, working alongside existing workflows without restricting how files are used.",
    "tb.more": "Learn more",

    // Homepage library promo section
    "lp.lead":
      "The Gene File Library brings plasmid files stored across folders into a single searchable index, organized by project, by storage path, or by AI-generated tags; one or two attribute cues are enough for the AI to locate a plasmid, with no need to remember filenames or paths.",
    "lp.c1": "Projects · Paths · Tags",
    "lp.c2": "AI auto-tagging",
    "lp.c3": "Natural-language retrieval",
    "lp.c4": "Automatic indexing of watched folders",
    "lp.safe": "Indexes only — original files are never modified",
    "lp.cta": "Learn more",

    // Download
    "dl.eyebrow": "Download · Install / Upgrade",
    "dl.title": (
      <>
        Full-platform clients
        <br />
        for desktop and mobile
      </>
    ),
    "dl.lead":
      "Available on Windows, macOS and Linux desktops as well as Android, with consistent functionality across platforms. First-time users can install directly from a downloaded package; existing users can upgrade by downloading the latest version and installing over the old one — no uninstall needed.",
    "dl.note.desktop": "Desktop",
    "dl.note.linuxX64": "Desktop · x86_64",
    "dl.note.linuxArm64": "Desktop · ARM64",
    "dl.note.mobile": "Mobile",
    "dl.note.soon": "Coming soon",
    "dl.upgradeNote":
      "Already installed? Just download the latest installer and install over the existing version to upgrade — no uninstall needed. New users can install as usual after downloading.",
    "dl.cmdTitle.recommended": "Command-line install / upgrade (recommended)",
    "dl.cmdTitle.plain": "Command-line install / upgrade",
    "dl.cmd.brewLabel": "macOS · Homebrew",
    "dl.cmd.npmLabel": "Linux · npm",
    "dl.cmd.npmLabelMac": "macOS · npm",
      "dl.cmd.note": "Copy the command above, paste it into a terminal, and run it.",
    "dl.cmd.scriptLabel": "Linux · Install / upgrade script",
    "dl.cmd.scriptLabelMac": "macOS · Install / upgrade script",
    "dl.cmdTab.script": "Install / upgrade",
    "dl.cmdTab.npm": "npm",
    "dl.cmd.recommendedTag": "Recommended",
    "dl.or.linux": "Or download the installers directly",
    "dl.ai.title": "AI-assisted install / upgrade",
    "dl.ai.desc":
      "The macOS packages are unsigned and involve several manual steps. Copy the prompt below to an AI assistant (Kimi, ChatGPT, etc.) and complete the installation under its step-by-step guidance.",
    "dl.ai.prompt": `Please help me install an application called "GenePad" on macOS. Try the following methods in order and stop at the first one that succeeds:
1. Preferred: run the official one-click install script (it detects and installs Homebrew automatically, switching to a CN mirror as network conditions require). Always append the -q flag: by default the script waits for Enter before exiting, and -q skips that wait so it runs unattended:
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   Then run: open -a GenePad.
2. Alternative: install with Homebrew (adds it to Applications automatically):
   brew install genepad/tap/genepad
   Then run: open -a GenePad. If Homebrew is not installed, install it first:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. Third option: install with npm (command-line launcher). If possible, also copy it into ~/Applications so it appears in Applications/Launchpad:
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   Then open it with: open -a GenePad (or run: genepad)
4. Fallback (manual): the application is unsigned and browser downloads are flagged "damaged" by Gatekeeper, so download with curl and re-sign locally:
   curl -L -o /tmp/gene-pad-app.zip "https://genepad.cn/release/mac/macos-app.zip"
   unzip -o /tmp/gene-pad-app.zip -d /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ Note: the methods above may fail or be outdated. If a step does not work, switch to another viable approach on your own (e.g. a different way to bypass Gatekeeper, or other tools to extract and sign the app). Visit the official site https://genepad.cn only if the download links above are unreachable — the site lists alternative download links only and provides no installation support.`,
    "dl.mac.other": "Other install / upgrade options (Homebrew / npm / AI-assisted / direct downloads)",
    "dl.mac.unsigned":
      "Unsigned notice: .dmg / .app files downloaded through a browser are flagged as \"damaged\" by Gatekeeper. Open them via right-click → Open, or run xattr -cr to remove the quarantine attribute; the command-line install / upgrade above is recommended.",
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
    "dl.sparkNote": "Users of Chinese Linux distributions can also install or upgrade the application from the Spark app store",
    "dl.releases": "All releases (GitHub Releases)",
    "dl.releasesGitee": "All releases (Gitee mirror)",
    "dl.licenseTag": "LICENSE",
    "dl.license":
      "GenePad Free is free for personal evaluation and learning, covering everyday map viewing, editing and saving. Commercial, institutional and long-term research use will be covered by the upcoming GenePad Pro license.",

    // Footer
    "ft.blurb":
      "A lightweight, cross-platform gene map editor built for everyday molecular cloning. Thanks to everyone who reports issues and shares suggestions.",
    "ft.col.download": "Download",
    "ft.col.support": "Feedback & Support",
    "ft.col.more": "More",
    "ft.giteeMirror": "Gitee Mirror",
    "ft.changelog": "Changelog",
    "ft.docs": "Dev Docs",
    "ft.projects": "Projects",
    "ft.library": "Gene File Library",
    "ft.ngs": "NGS Data Viewer",
    "ft.sponsor": "Sponsor the Developer",
    "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

    // 子页面共用
    "sub.back": "Back to Home",

    // Tech support page
    "ts.eyebrow": "Developer Docs",
    "ts.title": "File Format Documentation",
    "ts.lead":
      "For developers building their own readers, converters or importers: the .gen and .gjson formats used by GenePad, together with the SnapGene .dna conversion scheme, are documented on dedicated pages for quick access to implementation details.",
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
      "If anything you need is not covered, open an issue on GitHub or Gitee and we will follow up.",

    // Projects page
    "pr.eyebrow": "Ecosystem Projects",
    "pr.title": "GenePad Ecosystem Projects",
    "pr.lead":
      "Around the molecular cloning toolchain, the GenePad organization maintains a number of independent projects on GitHub — from a traceable plasmid common-features library to a tissue-specific codon usage pipeline. Each project stands alone and can be used separately, aiming to reduce repeated work for researchers and developers.",
    "pr.specs": "Specifications",
    "pr.cf.head": "Plasmid Common Features",
    "pr.cf.title": "Common feature sequence library for plasmid construction",
    "pr.cf.desc":
      "A reusable element library assembled and cross-checked entry by entry from NCBI source reference plasmids. Every element records its NCBI accession and reference plasmid, so each sequence can be traced to its origin. Once imported into plasmid software, these common elements are recognized automatically on any map you open.",
    "pr.cf.catsTitle": "20 categories covered",
    "pr.cf.usage":
      "Import the .gb files under genbank/ into the common features library of SnapGene or Benchling, and these elements are auto-annotated on any plasmid map you open; the .fa files under fasta/ can be used directly for BLAST.",
    "pr.ca.head": "Tissue-specific Codon Atlas",
    "pr.ca.title": "Human Tissue-Specific Codon Atlas",
    "pr.ca.desc":
      "An independently implemented statistical pipeline: using public GTEx gene expression and GENCODE annotations as inputs, weighted by tissue expression, it rebuilds a codon usage table for every human tissue — a reproducible, auditable tissue-specific reference for codon optimization and heterologous expression design, without depending on third-party tables under restrictive licensing.",
    "pr.ca.metricsTitle": "Output metrics",
    "pr.ca.usage":
      "python scripts/build_atlas.py rebuilds every tissue table from GTEx / GENCODE inputs; check_release.py and package_release.py handle pre-release validation and packaging.",
    "pr.org.text":
      "These projects are incubated by the main GenePad project and maintained to the same standard. For source code and progress, visit the GitHub organization; issues and feedback are welcome.",

    // Library page
    "lib.eyebrow": "Gene File Library",
    "lib.title": (
      <>
        Unified search and management
        <br />
        for plasmid files
      </>
    ),
    "lib.lead":
      "As projects accumulate, plasmid files scatter across folders, disks and devices, and filenames rarely reflect plasmid properties. The Gene File Library brings them into one searchable index, organized by project, by storage path and by AI-generated tags; one or two attribute cues are enough for the AI to locate the target plasmid, without remembering names or paths.",
    "lib.hero.shot": "LIBRARY — 331 plasmids indexed; the library-wide tag cloud on the right",

    "lib.pain.head": "Common issues",
    "lib.pain.headEn": "COMMON ISSUES",
    "lib.pain.title": "Familiar difficulties in plasmid file management",
    "lib.pain.1.name": "Growing collections",
    "lib.pain.1.desc":
      "As projects proceed, plasmid collections commonly grow from dozens to hundreds of files with ever-deeper folder nesting; directory structure alone no longer locates them.",
    "lib.pain.2.name": "Uncertain locations",
    "lib.pain.2.desc":
      "The same plasmid may live in different folders, on different disks or devices; when it is needed, its exact location is often unknown.",
    "lib.pain.3.name": "Uninformative names",
    "lib.pain.3.desc":
      "Search intent is usually expressed as an attribute — \"the vector carrying gene xx\" — while filenames such as pLH-sgRNA1-Muc4-11 say nothing about the plasmid's properties.",

    "lib.ways.head": "Three ways to organize",
    "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
    "lib.ways.title": "Projects, paths, tags — three organizational dimensions",
    "lib.ways.1.name": "By project",
    "lib.ways.1.desc":
      "Create a project and drag plasmids into it, one project per study; opening the project shows every plasmid belonging to that study.",
    "lib.ways.2.name": "By storage path",
    "lib.ways.2.desc":
      "Nothing is moved or copied; files are browsed exactly where they are stored. The library is an index only and never modifies the originals.",
    "lib.ways.3.name": "By plasmid tags",
    "lib.ways.3.desc":
      "The AI reads each plasmid's sequence and features and generates property tags such as lentiviral, sgRNA and ampicillin; clicking a tag filters all matching plasmids — locating by attribute rather than by name.",

    "lib.tags.head": "AI Tags",
    "lib.tags.headEn": "AI TAGS",
    "lib.tags.title": "Automatic AI-generated property tags",
    "lib.tags.desc":
      "Once AI is configured, scanning or opening a plasmid automatically reads its sequence and features and generates a set of property tags; a batch refresh is available from the table header — filling only untagged entries, or regenerating all. The tag cloud summarizes the attribute distribution of the whole library; combining a few tags narrows down the target file.",
    "lib.tags.shot": "Batch refresh from the table header — fill untagged entries, or regenerate all",

    "lib.ai.head": "AI Assistant",
    "lib.ai.headEn": "AI ASSISTANT",
    "lib.ai.title": "Retrieve directly through the AI assistant",
    "lib.ai.desc":
      "Instruct the AI assistant directly — for example, \"find a Type I CRISPR plasmid\" — and it searches the entire library, listing candidates with each plasmid's properties and recommended use. Asking it to \"organize my plasmid library\" yields an analysis of the current state followed by a concrete plan.",
    "lib.ai.shot1": "AI ASSISTANT — \"Organize my plasmid library\": analyze first, then propose a plan",
    "lib.ai.shot2": "AI ASSISTANT — \"Find a Type I CRISPR plasmid\": candidates listed with properties",

    "lib.setup.head": "Getting started",
    "lib.setup.headEn": "GETTING STARTED",
    "lib.setup.title": "Initial setup in a few minutes",
    "lib.setup.lead":
      "The Gene File Library is located in GenePad's toolbox. Open it and follow these steps:",
    "lib.setup.1.name": "Open the configuration entry",
    "lib.setup.1.desc":
      "On first launch, click \"Configure AI\" in the top banner; afterwards, the settings are always reachable via the AI icon in the title bar.",
    "lib.setup.1.shot": "First launch — click \"Configure AI\" in the banner",
    "lib.setup.2.name": "Create a DeepSeek profile",
    "lib.setup.2.desc":
      "Click \"New profile\" and name it; select DeepSeek as the provider and deepseek-v4-flash as the model, then click \"Get\" next to the API Key field.",
    "lib.setup.2.shot": "AI settings — new profile, select DeepSeek, click \"Get\"",
    "lib.setup.3.name": "Obtain a DeepSeek API key",
    "lib.setup.3.desc":
      "Your browser opens the DeepSeek platform: sign up, top up a small amount of credit, then click \"Create API key\"; the key is shown only once — copy it immediately after creation.",
    "lib.setup.3.shot": "DeepSeek platform — create an API key and copy it immediately",
    "lib.setup.4.name": "Paste the key and save",
    "lib.setup.4.desc":
      "Back in the application, paste the key and click \"Test connection\"; once \"Connected\" is confirmed, click \"Save current profile\" and the AI is ready.",
    "lib.setup.4.shot": "Connection test passed — save the current profile",
    "lib.setup.5.name": "Set up watched folders",
    "lib.setup.5.desc":
      "Click \"Watch folders\" and add the folders where plasmids are stored. Every launch scans them automatically: new plasmids are indexed and deleted ones removed, with no manual maintenance.",
    "lib.setup.5.shot": "Watched folders — additions indexed, removals dropped, kept in sync",
    "lib.setup.note":
      "With AI configured, plasmids scanned into the library receive tags automatically. Skipping the AI setup does not affect indexing; it only disables tags and the AI assistant.",

    "lib.daily.head": "Daily workflow",
    "lib.daily.headEn": "DAILY WORKFLOW",
    "lib.daily.title": "Search results open directly in your tools",
    "lib.daily.1.name": "Open with your preferred tools",
    "lib.daily.1.desc":
      "Right-click any plasmid → \"Open with\": hand the file to SnapGene for the map or VS Code for the sequence in one click, integrating with your existing workflow.",
    "lib.daily.2.name": "Editable tags",
    "lib.daily.2.desc":
      "Tags can be edited at any time in the details panel: remove incorrect AI-generated tags and add your own, such as \"verified\" or \"shared\".",
    "lib.daily.shot":
      "Context menu — open, reveal in folder, hand off to SnapGene / VS Code; edit tags in the details panel on the right",

    "lib.final.title": "A built-in module of GenePad, not a standalone application",
    "lib.final.desc":
      "The Gene File Library is built into the GenePad gene map editor: install or upgrade GenePad and it is available in the toolbox. Free during the public beta, on every platform.",
    "lib.final.cta": "Back to Home",
    "lib.final.cta2": "Download Now",
    "lib.top.hint": "Jump straight to downloads",

    // Homepage NGS promo section
    "np.lead":
      "Open fastq.gz / fastq / fq.gz / fq sequencing files directly — right-click or drag-and-drop, with paired-end files merged automatically. Inspect per-base quality, locate variable regions by amino-acid search, clip with trim anchors and finish with a one-click library abundance report.",
    "np.c1": "fastq.gz · fq.gz without decompressing",
    "np.c2": "Paired-end auto-merge",
    "np.c3": "Per-base quality",
    "np.c4": "Trim anchors + abundance report",
    "np.cta": "Learn more",
    "np.safe": "Built into GenePad · Free beta · All platforms",

    // NGS page
    "ngs.eyebrow": "NGS Data Viewer",
    "ngs.title": (
      <>
        Second-generation (NGS) sequencing data,
        <br />
        open directly — browse, search and count
      </>
    ),
    "ngs.lead":
      "GenePad opens fastq.gz / fastq / fq.gz / fq sequencing files directly: right-click → Open with → GenePad in File Explorer, or drag the files into the window. For paired-end runs, drop the R1 and R2 files together and the pairing is recognized automatically. Browse reads one by one, inspect per-base quality and the merged consensus, locate the variable region of interest by searching an amino-acid fragment, set trim anchors to clip the whole file down to the target segment, and finish with a one-click library abundance report.",
    "ngs.hero.shot":
      "FASTQ VIEWER — paired reads merged automatically, bases color-coded by quality, file statistics on the right",

    "ngs.open.head": "Opening sequencing files",
    "ngs.open.headEn": "OPENING FASTQ FILES",
    "ngs.open.title": "Right-click or drag-and-drop — no command line needed",
    "ngs.open.lead":
      "Four extensions are supported — fastq.gz, fastq, fq.gz and fq — and gzip-compressed files open without decompressing first. Once GenePad is installed or upgraded, either of the two:",
    "ngs.open.1.name": "Right-click → Open with",
    "ngs.open.1.desc":
      "In File Explorer, right-click the sequencing file → \"Open with\": pick GenePad straight from the submenu, or select it in \"Choose another app\" and set it as the default — from then on, double-clicking a sequencing file opens it directly.",
    "ngs.open.2.name": "Drag into the window",
    "ngs.open.2.desc":
      "Drag one or more sequencing files straight into the GenePad window; both the welcome page and the workspace accept drops.",
    "ngs.open.1.shot": "Right-click menu — \"Open with\" → GenePad",
    "ngs.open.1.shot2": "\"Choose another app\" — pick GenePad in the system list, optionally as default",
    "ngs.open.2.shot": "Drag and drop — bring several sequencing files in together",

    "ngs.pair.head": "Paired-end",
    "ngs.pair.headEn": "PAIRED-END",
    "ngs.pair.title": "Mate files recognized and paired automatically",
    "ngs.pair.desc":
      "Drop the R1 and R2 files into the window together and GenePad pairs them by the first read ID; when several pairs arrive at once, a confirmation dialog lists them for manual adjustment — or one click on Auto-pair settles it. Each pair then opens as one paired-end dataset, flagged Paired-end in the interface, with a one-click R1/R2 swap on the toolbar.",
    "ngs.pair.shot": "PAIR NGS FILES — pairs are formed by first read ID, adjustable by hand",

    "ngs.reads.head": "Read-by-read browsing",
    "ngs.reads.headEn": "READS & QUALITY",
    "ngs.reads.title": "Quality and merging of every read at a glance",
    "ngs.reads.lead":
      "The main view lists every sequenced read from top to bottom, with whole-file statistics summarized in the properties panel:",
    "ngs.reads.1.name": "Automatic mate merging",
    "ngs.reads.1.desc":
      "Paired reads are merged one by one, each showing the overlap length and identity (e.g. Overlap 135bp · 99% identity), so the merge result is visible at a glance.",
    "ngs.reads.2.name": "Per-base quality",
    "ngs.reads.2.desc":
      "Every base is colored by Phred quality — green ≥30, orange 20–29, red <20 — making low-quality regions obvious in the quality bars without reading a single number.",
    "ngs.reads.3.name": "File statistics",
    "ngs.reads.3.desc":
      "The properties panel summarizes read count, total bases, read length, mean quality, quality distribution, GC content and encoding, grouped as Overall / R1 / R2; very large files load a preview only, while statistics and analysis still cover the entire file.",
    "ngs.reads.shot":
      "READS & QUALITY — browse reads top to bottom: mate merging, per-base quality bars and file statistics on the right",

    "ngs.aa.head": "Amino-acid search",
    "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
    "ngs.aa.title": "Locate the variable region by protein fragment",
    "ngs.aa.desc":
      "Switch the search box to AA mode and type an amino-acid fragment (e.g. MATNNQ): merged reads are translated and compared peptide by peptide, and each hit is boxed right in the sequence. In library sequencing the flanks stay conserved while the middle varies — querying a known conserved peptide locates the target variable region within thousands of reads.",
    "ngs.aa.shot":
      "AA SEARCH — type an amino-acid fragment; matched peptides are highlighted in the translation",

    "ngs.trim.head": "Trim anchors",
    "ngs.trim.headEn": "TRIM ANCHORS",
    "ngs.trim.title": "Set anchors and clip the whole file to the target",
    "ngs.trim.desc":
      "Set the conserved flanks as left and right trim anchors, click Trim, and the entire sequencing file is clipped in batch to keep only the variable region between them. The properties panel reports the pass rate live, along with the reads rejected for missed anchors or short inserts; processed reads can be exported in one click (Export processed reads) for downstream analysis or submission.",
    "ngs.trim.shot": "TRIM ANCHORS — left and right anchors frame the target window; pass rate shown live",

    "ngs.report.head": "Library abundance analysis",
    "ngs.report.headEn": "LIBRARY ANALYSIS",
    "ngs.report.title": "One-click abundance report for the whole file",
    "ngs.report.desc":
      "Run Sequence analysis on the trimmed data: by default the entire file is analyzed — tens of millions of reads never need to be fully loaded into memory — counting every unique sequence with its count and frequency, keeping or stripping the anchors as chosen. The result is a graphical report — a Top-sequences histogram (DNA or AA) plus a table of each sequence's length, count, frequency and +1-frame translation — alongside a full CSV export that opens directly in Excel. A simple library abundance report, done.",
    "ngs.report.shot1": "SEQUENCE ANALYSIS — the whole file by default; anchors kept or stripped",
    "ngs.report.shot2": "ANALYSIS REPORT — Top-sequences histogram and the full abundance table (CSV)",

    "ngs.video.head": "Video tutorial",
    "ngs.video.headEn": "VIDEO TUTORIAL",
    "ngs.video.lead":
      "Prefer watching? This full walkthrough plays right on the page — from opening FASTQ files and pairing mates to trimming anchors and generating the abundance report, step by step on real data.",
    "ngs.video.caption": "VIDEO TUTORIAL — full walkthrough: open → pair → browse → search → trim → report",

    "ngs.final.title": "Built into GenePad — not a standalone application",
    "ngs.final.desc":
      "NGS data viewing ships inside the GenePad gene map editor: install or upgrade GenePad and sequencing files open directly, working alongside map editing, Sanger trace alignment and more in the same application. Free during the public beta, on every platform.",
    "ngs.final.cta": "Back to Home",
    "ngs.final.cta2": "Download Now",
    "ngs.top.hint": "Jump straight to downloads",

    // Stats subpage (live stats)
    "st.eyebrow": "Live Stats",
    "st.title": (
      <>
        Real usage data,
        <br />
        in the open
      </>
    ),
    "st.lead":
      "These numbers are aggregated from the anonymous usage statistics inside the GenePad app: each installation counts as a single random identifier, with no sequences, files or personal information of any kind. The data refreshes automatically with each report — GenePad itself needs no registration.",
    "st.k.installs": "Total installs",
    "st.k.active30": "Active · 30 days",
    "st.k.active7": "Active · 7 days",
    "st.k.hours": "Total usage time",
    "st.k.hoursUnit": "hours",
    "st.chart.title": "Weekly new installs",
    "st.chart.caption": "WEEKLY NEW INSTALLS — by first launch of each installation",
    "st.os.title": "Installs by operating system",
    "st.os.other": "Other",
    "st.updated": "Data updated",
    "st.note": "Method: aggregated by random install identifier. Statistics stop when turned off or the app is uninstalled.",
    "st.error": "Stats are temporarily unavailable — please refresh and try again later.",
    "st.cta": "Download free — become the next user",
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
