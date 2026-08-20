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
    "tb.more": "详细介绍",

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
    "ft.library": "基因文件库",
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

    // Library page（基因文件库宣传页）
    "lib.eyebrow": "Gene File Library · 基因文件库",
    "lib.title": (
      <>
        找质粒这件事，
        <br />
        不该靠记性
      </>
    ),
    "lib.lead":
      "课题做久了，质粒越攒越多：这个载体存哪了？那个带 xx 基因的质粒叫什么来着？基因文件库就是为终结这种日常抓狂而生——把散落各处的质粒文件收进一个可检索的库，按项目、按路径、按 AI 生成的标签三种方式管理。你不需要记住任何质粒的具体名字和路径，只要记得它的一两点模糊属性，就能让 AI 帮你把它从浩如烟海的文件库里翻出来。",
    "lib.hero.shot": "LIBRARY — 331 份质粒入库，右侧是整个文库的标签云",

    "lib.pain.head": "先说痛点",
    "lib.pain.headEn": "PAIN POINTS",
    "lib.pain.title": "这些场景，做克隆的人都懂",
    "lib.pain.1.name": "越攒越多",
    "lib.pain.1.desc":
      "课题一个接一个，质粒从几十份涨到几百份，文件夹套着文件夹，找起来全靠缘分。",
    "lib.pain.2.name": "记不得放哪",
    "lib.pain.2.desc":
      "“这个质粒我明明存过”——可在哪个文件夹、哪块磁盘、哪台电脑上？完全想不起来。",
    "lib.pain.3.name": "记不得名字",
    "lib.pain.3.desc":
      "只想找“带 xx 基因的那个载体”，可它叫 pLH-sgRNA1-Muc4-11 还是 pLH-psp-Muc4-54？名字和性质从来对不上号。",

    "lib.ways.head": "三种管理方式",
    "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
    "lib.ways.title": "项目、路径、标签——总有一把钥匙能开门",
    "lib.ways.1.name": "按项目分类",
    "lib.ways.1.desc":
      "新建项目，把质粒拖进去归类。一个课题一个项目——打开项目，这个课题的家当都在。",
    "lib.ways.2.name": "按存储路径",
    "lib.ways.2.desc":
      "不移动、不复制你的任何文件，按它们实际存放的文件夹原样浏览。库只是索引，绝不动你的原始文件。",
    "lib.ways.3.name": "按质粒标签",
    "lib.ways.3.desc":
      "让 AI 读取每个质粒的序列与标注，自动总结出 lentiviral、sgRNA、ampicillin 这类性质标签。点一个标签，相关质粒全部列队——按性质定位，而不是按名字。",

    "lib.tags.head": "AI 标签",
    "lib.tags.headEn": "AI TAGS",
    "lib.tags.title": "让 AI 替你记住每个质粒是什么",
    "lib.tags.desc":
      "配置好 AI 后，扫描或打开质粒时，程序会自动读取序列与元件，为每个文件生成一串性质标签；也可以在表头一键批量刷新——只补没标签的，或者全部重新生成。右侧的标签云就是整个文库的“成分表”：凭一两点模糊的印象点几下，目标就筛出来了。",
    "lib.tags.shot": "表头批量刷新 — 只补无标签的，或全部重新生成",

    "lib.ai.head": "AI 助手",
    "lib.ai.headEn": "AI ASSISTANT",
    "lib.ai.title": "甚至，连找都可以不动手",
    "lib.ai.desc":
      "标签都懒得翻？直接吩咐 AI 助手：“帮我找个 Type I CRISPR 质粒。”它会翻遍整个文库，列出候选、写明每个质粒的性质，连推荐组合都替你想好。你也可以说“帮我整理我的质粒文库”——它会先摸清现状，再给出整理方案。",
    "lib.ai.shot1": "AI ASSISTANT — “帮我整理我的质粒文库”，先摸底再给方案",
    "lib.ai.shot2": "AI ASSISTANT — “帮我找个 Type I CRISPR 质粒”，候选与性质一并列出",

    "lib.setup.head": "上手",
    "lib.setup.headEn": "GETTING STARTED",
    "lib.setup.title": "从零到入库，只要几分钟",
    "lib.setup.lead":
      "基因文件库就在 GenePad 的工具箱里。打开它之后，按下面几步走：",
    "lib.setup.1.name": "打开配置入口",
    "lib.setup.1.desc":
      "首次打开基因文件库，在顶部横幅点「配置 AI」；以后也可以随时从右上角 AI 图标进入设置。",
    "lib.setup.1.shot": "首次打开 — 点顶部横幅里的「配置 AI」",
    "lib.setup.2.name": "新建 DeepSeek 配置",
    "lib.setup.2.desc":
      "点「新建配置」，起个名字；提供商选 DeepSeek、模型选 deepseek-v4-flash，然后点 API Key 旁边的「获取」。",
    "lib.setup.2.shot": "AI 设置 — 新建配置，选 DeepSeek，点「获取」",
    "lib.setup.3.name": "去 DeepSeek 官网拿密钥",
    "lib.setup.3.desc":
      "浏览器会打开 DeepSeek 开放平台：注册账号、充值一点额度，然后「创建 API key」——起个名字，创建后立刻复制（它只显示这一次）。",
    "lib.setup.3.shot": "DEEPSEEK 开放平台 — 创建并立刻复制 API key",
    "lib.setup.4.name": "粘贴密钥并保存",
    "lib.setup.4.desc":
      "回到软件粘贴密钥，点「测试连接」，看到“连接成功”后点「保存当前配置」。AI 就绪。",
    "lib.setup.4.shot": "测试连接成功 — 保存当前配置",
    "lib.setup.5.name": "监视你的质粒文件夹",
    "lib.setup.5.desc":
      "点「监视文件夹」，把你存质粒的文件夹加进来。以后每次启动都会自动扫描：新增的质粒自动入库，消失的自动移除——什么都不用管。",
    "lib.setup.5.shot": "监视文件夹 — 新增入库、消失移除，自动同步",
    "lib.setup.note":
      "配置好 AI 之后，扫描入库的质粒会自动生成标签；暂时不配置也不影响入库，只是少了标签和 AI 助手。",

    "lib.daily.head": "融入日常",
    "lib.daily.headEn": "DAILY WORKFLOW",
    "lib.daily.title": "找到之后，顺手就打开了",
    "lib.daily.1.name": "用你顺手的工具打开",
    "lib.daily.1.desc":
      "右键任意质粒 →「使用其它打开方式」：SnapGene 看图谱、VS Code 看序列，一键交过去，配合你已有的工作流。",
    "lib.daily.2.name": "标签由你做主",
    "lib.daily.2.desc":
      "详情面板里随时可以编辑标签：删掉 AI 贴错的，加上你自己的自定义标签——比如“已验证”“送人过”。",
    "lib.daily.shot":
      "右键菜单 — 打开、打开所在目录、交给 SnapGene / VS Code；右侧详情面板可直接增删标签",

    "lib.final.title": "它不是独立软件——它是 GenePad 的一部分",
    "lib.final.desc":
      "基因文件库内置在 GenePad 基因图谱编辑器里：下载安装 GenePad，打开工具箱就能用它。免费公测中，全平台可用。",
    "lib.final.cta": "去下载 GenePad",
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
    "tb.more": "Learn more",

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
    "ft.library": "Gene File Library",
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

    // Library page
    "lib.eyebrow": "Gene File Library",
    "lib.title": (
      <>
        Finding a plasmid
        <br />
        shouldn't rely on memory
      </>
    ),
    "lib.lead":
      "After a few projects, plasmids pile up: where did this vector go? What was the one with gene xx called again? The Gene File Library exists to end that daily frustration — it gathers plasmid files scattered across your disks into one searchable library, organized three ways: by project, by storage path, and by AI-generated tags. You never need to remember a plasmid's exact name or path — one or two fuzzy attributes are enough for the AI to pull it out of the haystack.",
    "lib.hero.shot": "LIBRARY — 331 plasmids indexed, tag cloud of the whole library on the right",

    "lib.pain.head": "The pain",
    "lib.pain.headEn": "PAIN POINTS",
    "lib.pain.title": "If you do cloning, you know these moments",
    "lib.pain.1.name": "They pile up",
    "lib.pain.1.desc":
      "Project after project, a few dozen plasmids turn into a few hundred, folders inside folders — finding one becomes pure luck.",
    "lib.pain.2.name": "Where did it go",
    "lib.pain.2.desc":
      "\u201cI definitely saved that plasmid\u201d — but in which folder, on which disk, on which machine? No idea.",
    "lib.pain.3.name": "What's it called",
    "lib.pain.3.desc":
      "You just want \u201cthe vector with gene xx\u201d — but is it pLH-sgRNA1-Muc4-11 or pLH-psp-Muc4-54? Names never match properties.",

    "lib.ways.head": "Three ways to organize",
    "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
    "lib.ways.title": "Projects, paths, tags — one of the keys always fits",
    "lib.ways.1.name": "By project",
    "lib.ways.1.desc":
      "Create a project and drag plasmids in. One project per study — open it and everything for that study is there.",
    "lib.ways.2.name": "By storage path",
    "lib.ways.2.desc":
      "Nothing is moved or copied. Browse files exactly where they actually live — the library is only an index and never touches your originals.",
    "lib.ways.3.name": "By plasmid tags",
    "lib.ways.3.desc":
      "Let the AI read each plasmid's sequence and features, then summarize property tags like lentiviral, sgRNA, ampicillin. Click a tag and every matching plasmid lines up — located by properties, not by name.",

    "lib.tags.head": "AI Tags",
    "lib.tags.headEn": "AI TAGS",
    "lib.tags.title": "Let the AI remember what each plasmid is",
    "lib.tags.desc":
      "Once AI is configured, scanning or opening a plasmid makes the program read its sequence and features and generate a set of property tags; you can also batch-refresh from the table header — fill only the untagged ones, or regenerate everything. The tag cloud on the right is the ingredient list of your whole library: a fuzzy impression or two and a few clicks are enough to narrow down the target.",
    "lib.tags.shot": "Batch refresh from the table header — fill untagged, or regenerate all",

    "lib.ai.head": "AI Assistant",
    "lib.ai.headEn": "AI ASSISTANT",
    "lib.ai.title": "Or don't even search yourself",
    "lib.ai.desc":
      "Can't be bothered with tags? Just tell the AI assistant: \u201cFind me a Type I CRISPR plasmid.\u201d It digs through the entire library, lists the candidates with a property summary for each, and even suggests the combination to use. Or say \u201chelp me organize my plasmid library\u201d — it surveys the current state first, then proposes a plan.",
    "lib.ai.shot1": "AI ASSISTANT — \u201cHelp me organize my plasmid library\u201d: survey first, then a plan",
    "lib.ai.shot2": "AI ASSISTANT — \u201cFind me a Type I CRISPR plasmid\u201d: candidates listed with properties",

    "lib.setup.head": "Getting started",
    "lib.setup.headEn": "GETTING STARTED",
    "lib.setup.title": "From zero to indexed in minutes",
    "lib.setup.lead":
      "The Gene File Library lives in GenePad's toolbox. Open it, then follow these steps:",
    "lib.setup.1.name": "Open the AI settings",
    "lib.setup.1.desc":
      "On first launch, click \u201cConfigure AI\u201d in the top banner; later you can always reopen the settings via the AI icon in the title bar.",
    "lib.setup.1.shot": "First launch — click \u201cConfigure AI\u201d in the banner",
    "lib.setup.2.name": "Create a DeepSeek profile",
    "lib.setup.2.desc":
      "Click \u201cNew profile\u201d and give it a name; pick DeepSeek as provider, deepseek-v4-flash as model, then click \u201cGet\u201d next to the API Key field.",
    "lib.setup.2.shot": "AI settings — new profile, pick DeepSeek, click \u201cGet\u201d",
    "lib.setup.3.name": "Grab a key from DeepSeek",
    "lib.setup.3.desc":
      "Your browser opens the DeepSeek platform: sign up, top up a little credit, then \u201cCreate API key\u201d — name it, create it, and copy it immediately (it is shown only once).",
    "lib.setup.3.shot": "DeepSeek platform — create an API key and copy it right away",
    "lib.setup.4.name": "Paste the key and save",
    "lib.setup.4.desc":
      "Back in the app, paste the key, click \u201cTest connection\u201d, and once you see \u201cConnected\u201d, hit \u201cSave current profile\u201d. The AI is ready.",
    "lib.setup.4.shot": "Connection OK — save the profile",
    "lib.setup.5.name": "Watch your plasmid folders",
    "lib.setup.5.desc":
      "Click \u201cWatch folders\u201d and add the folders where you keep plasmids. Every launch auto-scans them: new plasmids are indexed automatically, vanished ones removed — zero maintenance.",
    "lib.setup.5.shot": "Watched folders — new files indexed, missing ones removed, always in sync",
    "lib.setup.note":
      "With AI configured, plasmids scanned into the library get tags generated automatically. Skipping the AI setup doesn't stop indexing — you just lose tags and the AI assistant.",

    "lib.daily.head": "Daily workflow",
    "lib.daily.headEn": "DAILY WORKFLOW",
    "lib.daily.title": "Found it — now open it right away",
    "lib.daily.1.name": "Open with your favorite tools",
    "lib.daily.1.desc":
      "Right-click any plasmid \u2192 \u201cOpen with\u201d: SnapGene for the map, VS Code for the sequence — hand it off in one click, straight into your existing workflow.",
    "lib.daily.2.name": "Tags are yours",
    "lib.daily.2.desc":
      "Edit tags anytime in the details panel: drop the ones the AI got wrong, add your own — like \u201cverified\u201d or \u201calready shared\u201d.",
    "lib.daily.shot":
      "Context menu — open, reveal in folder, hand off to SnapGene / VS Code; edit tags in the details panel on the right",

    "lib.final.title": "It's not a standalone app — it's part of GenePad",
    "lib.final.desc":
      "The Gene File Library is built into the GenePad gene map editor: install GenePad and it's right there in the toolbox. Free in public beta, on every platform.",
    "lib.final.cta": "Download GenePad",
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
