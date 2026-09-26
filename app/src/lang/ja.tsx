/* 日本語辞書：key は zh ベースと一対一対応；i18n.tsx から読み込む。
   方針：自然な日本語を最優先しつつ、漢字で書ける語はできるだけ漢字に直す
  （例：アノテーション→注釈、インポート→読み込み、カテゴリ→分類）。
   プラスミッド・プライマー・ベクター・クローニングなどの定着した外来語と
   Open with / Trim など UI ボタン英語はそのまま残す。 */
import type { ReactNode } from "react";
import type { TKey } from "../i18n";

const ja: Record<TKey, ReactNode> = {
  // Nav
  "nav.workbench": "ワークベンチ",
  "nav.daynight": "ライト＆ダーク",
  "nav.sanger": "Sanger トレース",
  "nav.toolbox": "ツールボックス",
  "nav.download": "ダウンロード",
  "nav.library": "遺伝子ファイルライブラリ",
  "nav.ngs": "NGS データ閲覧",
  "nav.tutorial": "チュートリアル",
  "nav.docs": "技術文書",
  "nav.projects": "関連プロジェクト",
  "nav.stats": "リアルタイム統計",
  "nav.cta": "無料ダウンロード／更新",
  "nav.lang": "EN",

  // Page titles（実行時タイトルは UI 言語に追従。静的 HTML の <title> はページ言語と一致：jp.genepad.cn は日本語）
  "title.home": "GenePad - 軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール",
  "title.library": "遺伝子ファイルライブラリ - GenePad | プラスミッドファイルの検索と管理",
  "title.ngs": "NGS データ閲覧 - GenePad | FASTQ シークエンスデータの表示とライブラリ豊度解析",
  "title.tutorial": "チュートリアル - GenePad | AI 設定 · 遺伝子ファイルライブラリ · NGS 解析",
  "title.tutorial.ai": "AI 設定チュートリアル - GenePad | DeepSeek API キーの取得と保存",
  "title.tutorial.library": "遺伝子ファイルライブラリチュートリアル - GenePad | プラスミッドの取り込み・検索・AI タグ",
  "title.tutorial.ngs": "NGS 解析チュートリアル - GenePad | fastq.gz の閲覧とライブラリ豊度レポート",
  "title.tutorial.lang": "任意の言語を設定するチュートリアル - GenePad | AI 翻訳で言語パックを生成",
  "title.tutorial.langpack": "UI 言語を設定するチュートリアル - GenePad | 内蔵言語と公式言語パック",
  "title.projects": "関連プロジェクト - GenePad | プラスミッド汎用要素ライブラリとコドンアトラス",
  "title.tech": "開発者向け技術文書 - GenePad",
  "title.stats": "リアルタイム統計 - GenePad | 公開利用統計",

  // Hero
  "hero.badge": "無料公開ベータ",
  "hero.badgeEn": "Free Beta · Cross-platform",
  "hero.titleCn": "遺伝子マップ編集",
  "hero.titleEn": "クロスプラットフォーム",
  "hero.desc":
    "日常の分子クローニングのための、軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール。プラスミッドマップの閲覧・編集、配列注釈の管理、制限酵素部位の解析、Sanger トレースとの照合まで、クローニング設計から結果検証までの一連の流れを支えます。",
  "hero.download": "無料ダウンロード／更新",
  "hero.tour": "画面を見る",
  "hero.features": "MAP · ANNOTATION · ENZYME · PRIMER · TRACE",
  "hero.platforms": "対応プラットフォーム",
  "hero.langBtn": "言語の設定方法",

  // Workbench
  "wb.eyebrow": "Workbench",
  "wb.title": <>マップ・配列・解析をひとつにまとめたワークベンチ</>,
  "wb.lead":
    "マップの閲覧、配列編集、制限酵素部位の確認、タンパク質の物性計算をひとつの画面に統合。各表示は選択中の対象に連動して位置が合います。",
  "wb.1.name": "プラスミッドマップ全体",
  "wb.1.desc":
    "環状マップと線状マップをワンクリックで切り替え。プロモーター、CDS、複製起点、poly(A) 信号などの要素が分類ごとに色分けされ、ラベルの重なりは自動的に避けられるため、要素の多いベクターでも読みやすいマップが保たれます。",
  "wb.2.name": "マップから配列へ",
  "wb.2.desc":
    "注釈一覧で項目を選ぶと、配列ビューが対応する塩基区間に移動し、選択範囲の長さ・GC 含量・Tm 値も同時に表示されます。マップと配列は双方向に連動します。",
  "wb.3.name": "制限酵素部位",
  "wb.3.desc":
    "制限酵素部位は二本鎖配列上に直接表示され、カーソルを合わせると認識配列・鎖の向き・上下の鎖の切断位置を確認できます。5′ 突出末端も明示され、クローニング設計の確認を素早く行えます。",
  "wb.4.name": "タンパク質の物性",
  "wb.4.desc":
    "CDS を選ぶと、分子量・等電点・GRAVY・脂肪族指数・モル吸光係数をリアルタイムに計算。等電点は 19 種類の計算法を内蔵して比較でき、既定では文献で推奨される結果を表示します。",

  // DayNight
  "dn.eyebrow": "Light & Dark",
  "dn.title": (
    <>
      明暗 2 つのテーマ、
      <br />
      長時間の作業のために設計
    </>
  ),
  "dn.lead":
    "同じ研究画面に、完全にそろった 2 種類の配色を用意。明るいテーマは投影・発表・日中の環境に適し、暗いテーマは夜間の長時間使用による目の負担を軽減します。",
  "dn.day": "DAY",
  "dn.night": "NIGHT",
  "dn.state.day": "▸ LIGHT THEME — 明るいテーマ適用中",
  "dn.state.night": "▸ DARK THEME — 暗いテーマ適用中",
  "dn.caption.day": "DAY MODE — 同じベクターを明るいテーマで表示した全体図",
  "dn.caption.night": "NIGHT MODE — マップ・配列・制限酵素部位を暗いテーマで描画した例",
  "dn.alt.day": "GenePad 明るいテーマ",
  "dn.alt.night": "GenePad 暗いテーマ",

  // Sanger
  "sg.eyebrow": "Sanger Trace",
  "sg.title": (
    <>
      Sanger シークエンシングの結果を参照配列と
      <br />
      塩基単位で整列表示
    </>
  ),
  "sg.lead":
    "AB1 クロマトグラムファイルを読み込むと、クロマトグラム・reads・参照配列が塩基単位で整列し、一致率と E-value が結果にそのまま表示されます。各シークエンシング反応の品質とミスマッチ位置を判断できます。",
  "sg.badge.format": "AB1 トレース",
  "sg.shot1": "2KB-RCA-F — クロマトグラムを参照配列と塩基ごとに整列",
  "sg.shot2": "TOP STRAND — ミスマッチ部位を赤で表示",

  // Toolbox
  "tb.eyebrow": "Toolbox",
  "tb.title": <>豊富なツールボックス</>,
  "tb.lead":
    "配列を選択していれば、電気泳動シミュレーションや sgRNA 設計を右クリックメニューから直接呼び出せます。共通のツールボックスには AI アシスタントと遺伝子ファイルライブラリが用意され、多言語 UI と「Open with」対応によって、既存の作業の流れにも組み込みやすくなっています。",
  "tb.groupA": "右クリックメニュー",
  "tb.groupB": "共通ツールボックス",
  "tb.groupC": "開放性",
  "tb.c1.name": "DNA 電気泳動シミュレーション",
  "tb.c1.desc":
    "配列を選択して右クリックメニューから電気泳動シミュレーションを起動すると、アガロースゲルのバンド位置をプレビューできます。Trans2K® など主要な分子量マーカーを内蔵しており、実験前に泳動結果を予測できます。",
  "tb.c2.name": "タンパク質電気泳動シミュレーション",
  "tb.c2.desc":
    "SDS-PAGE シミュレーション：CDS かアミノ酸区間を選んでサンプルを読み込み、PageRuler などの染色済み分子量マーカーを基準に、バンド位置をリアルタイム計算します。",
  "tb.c3.name": "CRISPR sgRNA 設計",
  "tb.c3.desc":
    "SpCas9、xCas9、Cas12a/b、TnpB など 12 種類の認識様式に対応。PAM の向き、シード領域の長さ、オフターゲットの除外条件を設定でき、候補配列はワンクリックでマップ上に注釈として書き戻せます。",
  "tb.t1.name": "AI アシスタント",
  "tb.t1.desc":
    "開いているファイルの配列・注釈・プライマーを直接読み書きできます。feature の追加、Tm の計算、タンパク質への翻訳、ORF の予測といった操作を、自然言語の指示で行えます。",
  "tb.t2.name": "遺伝子ファイルライブラリ",
  "tb.t2.desc":
    "開いたことのあるベクターファイルは自動で索引化され、AI が性質タグを一括生成します。監視フォルダにも対応し、プラスミッドの属性からファイルを探せるため、ファイル名を覚える必要はありません。AI アシスタントからの検索にも対応します。索引を作るだけで、元のファイルは変更しません。",
  "tb.o1.name": "多言語対応",
  "tb.o1.desc":
    "中国語・英語・日本語・フランス語・ドイツ語・ロシア語の 6 つの UI 言語を内蔵。言語パックの書き出しに対応し、AI 翻訳で独自の言語を追加することもできます。",
  "tb.o2.name": "「Open with」連携",
  "tb.o2.desc":
    "内蔵の「Open with」機能で、ファイルをワンクリックで SnapGene、VS Code など指定したツールに渡せます。既存の作業の流れと組み合わせられ、ファイルの使い方を制限しません。",
  "tb.more": "詳しく見る",

  // ホームページの遺伝子ファイルライブラリ紹介セクション
  "lp.lead":
    "遺伝子ファイルライブラリは、あちこちに散らばったプラスミッドファイルを、検索できる 1 つの索引にまとめます。プロジェクト別・保存先別・AI 生成タグ別の 3 つの管理方法に対応。ファイル名や場所を覚えていなくても、属性の手がかり 1〜2 個で AI が探し当てます。",
  "lp.c1": "プロジェクト · 保存先 · タグ",
  "lp.c2": "AI 自動タグ付け",
  "lp.c3": "自然言語検索",
  "lp.c4": "監視フォルダの自動索引付け",
  "lp.safe": "索引を作るだけ。元のファイルは変更しません",
  "lp.cta": "詳しく見る",

  // Download
  "dl.eyebrow": "Download · ダウンロード / 更新",
  "dl.title": (
    <>
      デスクトップからモバイルまで、
      <br />
      全プラットフォームで使えるアプリ
    </>
  ),
  "dl.lead":
    "Windows、macOS、Linux のデスクトップと Android モバイルに対応し、機能はすべてのプラットフォームで共通です。初回はインストーラをダウンロードしてインストールするだけです。インストール済みの方は、最新版をダウンロードして上書きインストールするだけで更新でき、旧バージョンをアンインストールする必要はありません。",
  "dl.note.desktop": "デスクトップ",
  "dl.note.linuxX64": "デスクトップ · x86_64",
  "dl.note.mobile": "モバイル",
  "dl.note.soon": "近日公開",
  "dl.upgradeNote":
    "GenePad をインストール済みですか？最新のインストーラをダウンロードして上書きインストールするだけで更新でき、旧バージョンを削除する必要はありません。初めての方は、ダウンロード後の案内に従ってインストールしてください。",
  "dl.cmdTitle.recommended": "コマンドラインでのインストール／更新（推奨）",
  "dl.cmdTitle.plain": "コマンドラインでのインストール／更新",
  "dl.cmd.brewLabel": "macOS · Homebrew",
  "dl.cmd.npmLabel": "Linux · npm",
  "dl.cmd.npmLabelMac": "macOS · npm",
  "dl.cmd.note": "上のコマンドをコピーして、ターミナルに貼り付けて実行してください。",
  "dl.cmd.scriptLabel": "Linux · ワンクリックインストール／更新スクリプト",
  "dl.cmd.scriptLabelMac": "macOS · ワンクリックインストール／更新スクリプト",
  "dl.cmdTab.script": "ワンクリック",
  "dl.cmdTab.npm": "npm",
  "dl.cmd.recommendedTag": "推奨",
  "dl.or.linux": "またはインストーラを直接ダウンロード",
  "dl.ai.title": "AI 支援のインストール／更新",
  "dl.ai.desc":
    "macOS 版のインストーラは未署名のため、手作業の手順が多くなります。以下のプロンプトを AI アシスタント（Kimi、ChatGPT など）にコピーし、案内に従ってインストールを進めてください。",
  "dl.ai.prompt": `macOS へ「GenePad」というアプリをインストールするのを手伝ってください。次の順に試し、どれかの方法が成功したらそこで止まってください：
1. 第一候補：公式のワンクリックインストールスクリプトを実行します（Homebrew を自動検出してインストールし、ネットワーク状況に応じて中国国内のミラーに切り替えます）。必ず -q を付けてください。スクリプトは既定では終了時に Enter キーの入力を待つため、-q を付けるとその待ちを飛ばせ、無人実行に便利です：
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   インストール完了後、open -a GenePad を実行してください。
2. 第二候補：Homebrew でインストール（自動的に「アプリケーション」に追加されます）：
   brew install genepad/tap/genepad
   インストール完了後、open -a GenePad を実行してください。Homebrew が未インストールの場合は、先に次のコマンドでインストールしてください：
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. 第三の方法：npm でインストール（コマンドラインから起動）。可能なら ~/Applications にもコピーして、「アプリケーション」と Launchpad に表示されるようにしてください：
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   その後、open -a GenePad を実行（またはコマンドラインで genepad を実行）
4. 手動（最終手段）：本アプリは未署名のため、ブラウザからダウンロードしたファイルは Gatekeeper に「破損している」と判定されます。そのため curl でダウンロードし、ローカルで署名します。まず https://genepad.cn/update.json から最新のバージョン番号を読み取り（VERSION とします。例：0.7.1）、対応するバージョンの .app.tar.gz をダウンロードして展開・インストールしてください：
   curl -L -o /tmp/gene-pad-app.tar.gz "https://genepad.cn/release/mac/GenePad_\${VERSION}_Darwin_arm64.app.tar.gz"
   mkdir -p /tmp/gene-pad-extract && tar -xzf /tmp/gene-pad-app.tar.gz -C /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ 注意：上記の方法は機能しなくなっていたり、古くなっていたりする可能性があります。どこかの手順が進まない場合は、別の実行可能な方法（例：別の方法での Gatekeeper 回避、他の展開・署名ツールの使用）に自分で切り替えてください。上記のダウンロードリンクにアクセスできない場合に限り、公式サイト https://genepad.cn を開いてください——公式サイトは他のダウンロードリンクを掲載しているだけで、インストールの支援は行っていません。`,
  "dl.mac.other": "その他のインストール／更新方法（Homebrew / npm / AI 支援 / インストーラ直リンク）",
  "dl.mac.unsigned":
    "未署名について：ブラウザから直接ダウンロードした .dmg / .app ファイルは、Gatekeeper に「破損している」と判定されます。右クリック →「開く」で実行するか、xattr -cr を実行して隔離属性を取り除いてください。上記のコマンドラインによるインストール／更新を推奨します。",
  "dl.copy": "コピー",
  "dl.copied": "コピーしました ✓",
  "dl.filesTitle": "インストーラの直接ダウンロード",
  "lb.close": "閉じる",
  "lb.prev": "前の画像",
  "lb.next": "次の画像",
  "dl.source.direct": "当サイトの直リンク",
  "dl.source.gitee": "Gitee",
  "dl.source.github": "GitHub",
  "dl.giteeBadge": "中国国内 CDN",
  "dl.arch.x64": "x86_64",
  "dl.arch.arm64": "ARM64",
  "dl.spark": "Spark Store",
  "dl.sparkNote": "中国製 Linux ディストリビューションをお使いの方は、Spark Store からもインストール／更新できます",
  "dl.releases": "全バージョン（GitHub Releases）",
  "dl.releasesGitee": "全バージョン（Gitee ミラー）",
  "dl.licenseTag": "LICENSE",
  "dl.license":
    "GenePad Free は個人の評価・学習目的で無料で、日常のマップ閲覧・編集・保存が含まれます。商用利用は、今後リリースされる GenePad Pro のライセンスで対応する予定です。",
  "dl.license.academic":
    "学術無償ライセンス：2026 年から 2027 年 12 月 31 日までの期間、大学・病院の研究グループ・iGEM 参加者・研究者・学生などの学術ユーザーは、本プログラムをダウンロードするだけで無償利用権を自動的に取得できます。申請や GenePad チームへの連絡は不要です。この権利は学術研究の用途に限られ、いかなる商用目的にも使用できません。",

  // Footer
  "ft.blurb":
    "日常の分子クローニングを支える、軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール。問題やご意見を送ってくださったすべてのユーザーに感謝します。",
  "ft.col.download": "ダウンロード",
  "ft.col.support": "フィードバックとサポート",
  "ft.col.more": "その他",
  "ft.giteeMirror": "Gitee ミラー",
  "ft.changelog": "更新履歴",
  "ft.docs": "技術文書",
  "ft.projects": "関連プロジェクト",
  "ft.library": "遺伝子ファイルライブラリ",
  "ft.ngs": "NGS データ閲覧",
  "ft.sponsor": "開発者を支援する",
  "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

  // サブページ共通
  "sub.back": "ホームへ戻る",

  // 技術サポートページ
  "ts.eyebrow": "Developer Docs",
  "ts.title": "ファイル形式開発文書",
  "ts.lead":
    "読み込み・変換・取り込み用のプログラムを自前で開発する方向け：GenePad が使用する .gen・.gjson 形式、および SnapGene .dna 変換方式は、実装の詳細をすぐ確認できるよう独立したページに分けてあります。",
  "ts.group.formats": "ファイル形式",
  "ts.group.formatsEn": "FILE FORMATS",
  "ts.group.code": "コードサンプル",
  "ts.group.codeEn": "CODE SAMPLES",
  "ts.gen.title": ".gen ファイル定義",
  "ts.gen.desc":
    "SQLite 3 プロジェクトファイル：全 14 テーブルの定義、フィールドの意味、座標の規則、編集履歴ツリー、チャンク分割と undo の仕組み。読み終えれば .gen を自力で読み書きできるようになります。",
  "ts.gjson.title": ".gjson ファイル定義",
  "ts.gjson.desc":
    "JSON 交換形式：最上位のフィールド、各オブジェクトの定義、.gen との忠実度の差異。読み終えれば .gjson を解析できるようになります。",
  "ts.dna.title": ".dna 変換方式",
  "ts.dna.desc":
    "SnapGene .dna のバイナリパッケージ構造、flags ビット、フィールドの対応、0-based↔1-based 座標変換。",
  "ts.rust.title": "Rust 読み込みサンプル",
  "ts.rust.desc":
    "rusqlite で .gen を、serde_json で .gjson を読む最小限の動作する実装。依存関係と期待される出力を含みます。",
  "ts.readDoc": "文書を読む",
  "ts.feedback":
    "文書に必要な内容が見当たらない場合は、GitHub または Gitee で Issue を投稿してください。順次追加していきます。",

  // Projects ページ
  "pr.eyebrow": "Ecosystem Projects",
  "pr.title": "GenePad 関連プロジェクト",
  "pr.lead":
    "分子クローニングのためのツールチェーンをめぐり、GenePad 組織は GitHub 上でいくつかの独立したプロジェクトを保守しています：配列の出典をすべてたどれるプラスミッド汎用要素ライブラリから、組織特異的なコドン統計パイプラインまで。各プロジェクトは本プログラムから独立しており、単独で取り出して利用できます。研究者や開発者の重複作業を減らすことを目指しています。",
  "pr.specs": "データ仕様",
  "pr.cf.head": "プラスミッド汎用要素ライブラリ",
  "pr.cf.title": "プラスミッド構築用の汎用要素配列ライブラリ",
  "pr.cf.desc":
    "NCBI の参照元プラスミッドから 1 件ずつ整理・照合した、再利用できる要素配列ライブラリ。各要素には NCBI アクセッション番号と参照プラスミッド名が記録されており、配列の由来を 1 件ずつたどれます。プラスミッド解析ソフトに読み込めば、マップを開くだけでこれらの定番要素が自動認識されます。",
  "pr.cf.catsTitle": "20 の分類を網羅",
  "pr.cf.usage":
    "genbank/ 以下の .gb を SnapGene や Benchling の common features ライブラリに読み込めば、任意のプラスミッドマップを開いたときにこれらの要素が自動認識されます。fasta/ 以下の .fa は BLAST 検索にそのまま使えます。",
  "pr.ca.head": "組織特異的コドンアトラス",
  "pr.ca.title": "ヒト組織特異的コドンアトラス",
  "pr.ca.desc":
    "独立に実装した統計パイプライン：公開されている GTEx 遺伝子発現と GENCODE 注釈を入力とし、組織の発現量で重み付けして、ヒトの各組織のコドン使用表を再構築します。コドン最適化と異種発現の設計に使える、再現可能で検証できる組織特異的参照データを提供し、ライセンス制約のある他社製の完成表への依存を避けられます。",
  "pr.ca.metricsTitle": "出力される指標",
  "pr.ca.usage":
    "python scripts/build_atlas.py が GTEx / GENCODE の入力から全組織の表を再構築し、check_release.py と package_release.py がリリース前の検証とパッケージ化を担います。",
  "pr.org.text":
    "上記のプロジェクトは GenePad 本体のプロジェクトから生まれ、同じ基準で保守されています。ソースコードと進捗は GitHub 組織のページをご覧ください。Issue でのフィードバックを歓迎します。",

  // Library ページ（遺伝子ファイルライブラリ紹介ページ）
  "lib.eyebrow": "Gene File Library",
  "lib.title": (
    <>
      プラスミッドファイルの
      <br />
      統一検索と管理
    </>
  ),
  "lib.lead":
    "研究が進むにつれてプラスミッドファイルは複数のフォルダ・ディスク・端末に散らばりがちで、ファイル名からはプラスミッドの性質が分かりません。遺伝子ファイルライブラリはこうしたファイルを検索できる統一索引に取り込み、プロジェクト別・保存先別・AI 生成タグ別の 3 つの管理方法に対応。名前も場所も覚えていなくても、属性の手がかり 1〜2 個で AI が探し当てます。",
  "lib.hero.shot": "LIBRARY — 331 件のプラスミッドを索引化、右側はライブラリ全体のタグクラウド",

  "lib.pain.head": "よくある課題",
  "lib.pain.headEn": "COMMON ISSUES",
  "lib.pain.title": "プラスミッドファイル管理でよくある悩み",
  "lib.pain.1.name": "規模が増え続ける",
  "lib.pain.1.desc":
    "研究が進むにつれてプラスミッドは数十件から数百件へと増え、フォルダの階層は深くなる一方です。フォルダ構造だけでは目的のファイルを見つけられません。",
  "lib.pain.2.name": "保存場所が分からない",
  "lib.pain.2.desc":
    "同じプラスミッドが別のフォルダ、別のディスク、別の端末に保存されていることがあり、必要になったときにどこにあるか分からないことが少なくありません。",
  "lib.pain.3.name": "ファイル名と属性が結びつかない",
  "lib.pain.3.desc":
    "探すときの頭の中は「ある遺伝子を持つベクター」のような属性の説明ですが、pLH-sgRNA1-Muc4-11 のようなファイル名はプラスミッドの性質を表しておらず、両者は一致しません。",

  "lib.ways.head": "3 つの管理方法",
  "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
  "lib.ways.title": "プロジェクト・保存先・タグ——3 つの整理方法",
  "lib.ways.1.name": "プロジェクトで整理",
  "lib.ways.1.desc":
    "新しいプロジェクトを作ってプラスミッドをドラッグすれば整理完了。1 つの研究に 1 つのプロジェクトが対応し、プロジェクトを開けばその研究の全プラスミッドが一目で分かります。",
  "lib.ways.2.name": "保存場所で閲覧",
  "lib.ways.2.desc":
    "ファイルを移動もコピーもせず、保存された場所のまま閲覧します。ファイルライブラリは索引に過ぎず、元のファイルは変更しません。",
  "lib.ways.3.name": "タグで絞り込み",
  "lib.ways.3.desc":
    "AI が各プラスミッドの配列と注釈を読み取り、lentiviral、sgRNA、ampicillin などの性質タグを自動生成。タグをクリックするだけで関連するプラスミッドがすべて絞り込め、名前ではなく属性で探せます。",

  "lib.tags.head": "AI タグ",
  "lib.tags.headEn": "AI TAGS",
  "lib.tags.title": "AI が性質タグを自動生成",
  "lib.tags.desc":
    "AI を設定すると、プラスミッドのスキャン時や開いたときに、プログラムが自動で配列と要素を読み取り、各ファイルに一連の性質タグを生成します。列見出しからの一括更新にも対応——欠けているタグだけを補うか、すべて再生成するかを選べます。右側のタグクラウドはライブラリ全体の属性分布を示し、いくつかの属性を組み合わせた絞り込みで目的のファイルを特定できます。",
  "lib.tags.shot": "列見出しから一括更新 — タグのない項目だけ補う、またはすべて再生成",

  "lib.ai.head": "AI アシスタント",
  "lib.ai.headEn": "AI ASSISTANT",
  "lib.ai.title": "AI アシスタントに直接検索させる",
  "lib.ai.desc":
    "AI アシスタントに直接指示できます。たとえば「Type I CRISPR プラスミッドを探して」と頼むと、ライブラリ全体を検索し、候補を挙げながら各プラスミッドの性質と推奨用途を説明します。「プラスミッドライブラリを整理して」と頼めば、まず現状を分析し、それから整理案を提示します。",
  "lib.ai.shot1": "AI ASSISTANT —「プラスミッドライブラリを整理して」：まず現状を分析し、次に整理案を提示",
  "lib.ai.shot2": "AI ASSISTANT —「Type I CRISPR プラスミッドを探して」：候補と性質を一覧で提示",

  "lib.setup.head": "はじめに",
  "lib.setup.headEn": "GETTING STARTED",
  "lib.setup.title": "初期設定は数分で完了",
  "lib.setup.lead":
    "遺伝子ファイルライブラリは GenePad のツールボックスにあります。開いたら、次の手順で設定を進めてください：",
  "lib.setup.1.name": "設定の入り口を開く",
  "lib.setup.1.desc":
    "初めて遺伝子ファイルライブラリを開いたときは、上部バナーの「Configure AI」をクリック。以降はいつでも右上の AI アイコンから設定に入れます。",
  "lib.setup.1.shot": "初回起動 — 上部バナーの「Configure AI」をクリック",
  "lib.setup.2.name": "DeepSeek の設定を新規作成",
  "lib.setup.2.desc":
    "「New profile」をクリックして名前を付けます。プロバイダーで DeepSeek を、モデルで deepseek-v4-flash を選び、次に API Key の横の「Get」をクリックします。",
  "lib.setup.2.shot": "AI Settings — 設定を新規作成し、DeepSeek を選んで「Get」をクリック",
  "lib.setup.3.name": "DeepSeek API キーを取得",
  "lib.setup.3.desc":
    "ブラウザで DeepSeek のプラットフォームが開きます。アカウント登録と入金の後、「Create API key」をクリック。キーは 1 度しか表示されないため、作成後すぐにコピーしてください。",
  "lib.setup.3.shot": "DEEPSEEK プラットフォーム — API キーを作成したらすぐにコピー",
  "lib.setup.4.name": "キーを貼り付けて保存",
  "lib.setup.4.desc":
    "GenePad に戻ってキーを貼り付け、「Test connection」をクリック。接続の成功を確認したら「Save current profile」をクリックして保存します。これで AI 機能の設定は完了です。",
  "lib.setup.4.shot": "接続テスト成功 — Save current profile をクリック",
  "lib.setup.5.name": "監視フォルダを設定",
  "lib.setup.5.desc":
    "「Watch folders」をクリックし、プラスミッドを保存しているフォルダを追加します。以降、起動のたびに自動スキャン：新しいプラスミッドは自動で取り込まれ、削除されたものは自動で除外されます。手動の維持は不要です。",
  "lib.setup.5.shot": "監視フォルダ — 追加は自動取り込み、削除は自動除外、自動で同期",
  "lib.setup.note":
    "AI を設定すると、ライブラリに取り込まれたプラスミッドには自動でタグが生成されます。設定しなくても取り込みには影響せず、タグと AI アシスタントだけが使えなくなります。",

  "lib.daily.head": "日々の作業の流れ",
  "lib.daily.headEn": "DAILY WORKFLOW",
  "lib.daily.title": "検索結果をそのまま開いて使える",
  "lib.daily.1.name": "いつものツールで開く",
  "lib.daily.1.desc":
    "任意のプラスミッドを右クリック →「Open with」で、ファイルを SnapGene（マップ）や VS Code（配列）などのツールに渡せます。既存の作業の流れと組み合わせられます。",
  "lib.daily.2.name": "タグは自由に編集できます",
  "lib.daily.2.desc":
    "詳細欄でタグはいつでも編集できます：AI が生成した誤ったタグを削除し、「検証済み」などの独自タグを追加できます。",
  "lib.daily.shot":
    "右クリックメニュー — 開く、保存先フォルダを開く、SnapGene / VS Code に渡す。右側の詳細欄でタグの追加・削除",

  "lib.final.title": "遺伝子ファイルライブラリは GenePad の内蔵機能で、単体のソフトウェアではありません",
  "lib.final.desc":
    "遺伝子ファイルライブラリは GenePad プラスミッドマップ編集ツールに内蔵されています。GenePad をダウンロード・インストール／更新すれば、ツールボックスから利用できます。現在は無料の公開ベータで、全プラットフォームに対応しています。",
  "lib.final.cta": "ホームへ戻る",
  "lib.final.cta2": "今すぐダウンロード",
  "lib.top.hint": "下部のダウンロード欄へ移動",

  // ホームページの NGS データ閲覧紹介セクション
  "np.lead":
    "fastq.gz / fastq / fq.gz / fq のシークエンスファイルをそのまま開けます。右クリックかドラッグ＆ドロップで開き、ペアエンドファイルは自動でペアリング・結合。塩基ごとの品質確認、アミノ酸検索による可変領域の特定、アンカーを設定した一括トリミングを経て、ワンクリックでライブラリ豊度レポートを生成します。",
  "np.c1": "fastq.gz · fq.gz 解凍不要",
  "np.c2": "ペアエンド自動ペアリング・結合",
  "np.c3": "塩基ごとの品質",
  "np.c4": "アンカートリミング + 豊度レポート",
  "np.cta": "詳しく見る",
  "np.safe": "GenePad 内蔵機能 · 無料公開ベータ · 全プラットフォーム対応",

  // NGS データ閲覧ページ
  "ngs.eyebrow": "NGS Data Viewer",
  "ngs.title": (
    <>
      次世代シークエンス（NGS）のデータをそのまま開き、
      <br />
      read ごとに閲覧・検索・集計
    </>
  ),
  "ngs.lead":
    "GenePad は fastq.gz / fastq / fq.gz / fq のシークエンスファイルをそのまま開けます。エクスプローラーで右クリックし、メニューの「Open with」から GenePad を選ぶか、ファイルをウィンドウに直接ドラッグしてください。ペアエンドの場合は R1・R2 の 2 ファイルを一緒にドラッグすれば、ペア関係を自動認識します。開いた後は reads を 1 本ずつ閲覧し、各塩基の品質とペア結合の成否を確認できます。アミノ酸断片での検索で目的の可変領域を見つけ、トリミングアンカーを設定してファイル全体を一括トリミングし、最後はワンクリックでライブラリ豊度レポートを生成します。",
  "ngs.hero.shot":
    "FASTQ VIEWER — ペアエンドの reads を自動結合、塩基ごとに品質で色分け、右側はファイル統計",

  "ngs.open.head": "シークエンスファイルを開く",
  "ngs.open.headEn": "OPENING FASTQ FILES",
  "ngs.open.title": "右クリックやドラッグで開けます。コマンドライン不要",
  "ngs.open.lead":
    "fastq.gz、fastq、fq.gz、fq の 4 種類の拡張子に対応し、gzip 圧縮ファイルは解凍せずに開けます。GenePad をインストール／更新したら、次の 2 つの方法のどちらでも開けます：",
  "ngs.open.1.name": "右クリック「Open with」",
  "ngs.open.1.desc":
    "エクスプローラーでシークエンスファイルを右クリック →「Open with」：サブメニューから直接 GenePad を選ぶか、「別のアプリを選択」の一覧で GenePad を選んで既定に設定——以後、ファイルをダブルクリックするだけで直接開けます。",
  "ngs.open.2.name": "ウィンドウへドラッグ",
  "ngs.open.2.desc":
    "1 つまたは複数のシークエンスファイルを GenePad ウィンドウに直接ドラッグします。ようこそ画面と作業画面のどちらでも、ドラッグ＆ドロップで開けます。",
  "ngs.open.1.shot": "右クリックメニュー —「Open with」→ GenePad",
  "ngs.open.1.shot2": "別のアプリを選択 — システムの一覧で GenePad を選び、既定に設定できます",
  "ngs.open.2.shot": "ウィンドウへドラッグ — 複数のシークエンスファイルをまとめてドラッグすれば開けます",

  "ngs.pair.head": "ペアエンド",
  "ngs.pair.headEn": "PAIRED-END",
  "ngs.pair.title": "ペアファイルを自動認識・自動ペアリング",
  "ngs.pair.desc":
    "R1・R2 の 2 ファイルを一緒にウィンドウへドラッグすると、先頭 read の ID に基づいてペア関係を自動認識します。複数ペアを一度にドラッグすると確認画面が表示され、グループを手動で調整するか「Auto-pair」でワンクリックペアリングできます。確認後、各ペアは 1 つのペアエンドデータとして開かれます——属性欄には Paired-end と表示され、ツールバーの Swap R1/R2 でワンクリックで入れ替えられます。",
  "ngs.pair.shot": "PAIR NGS FILES — 先頭 read の ID で自動ペアリング、手動調整も可能",

  "ngs.reads.head": "read ごとに閲覧",
  "ngs.reads.headEn": "READS & QUALITY",
  "ngs.reads.title": "各 read の品質と結合結果がひと目で分かる",
  "ngs.reads.lead":
    "メイン画面にはシークエンスで得られた各 read が上から下へ一覧表示され、右側の属性欄にファイル全体の統計がまとめられます：",
  "ngs.reads.1.name": "ペアエンド自動結合",
  "ngs.reads.1.desc":
    "ペアエンドデータは 1 本ずつ自動で結合（merge）され、各 read にオーバーラップ長と一致率（例：Overlap 135bp · 99% identity）が表示されます。結合の成否はひと目で判断できます。",
  "ngs.reads.2.name": "塩基ごとの品質",
  "ngs.reads.2.desc":
    "各塩基は Phred 品質で色分け：≥30 は緑、20–29 はオレンジ、<20 は赤。低品質領域が品質バーでひと目で分かり、数値を 1 つずつ確認する必要がありません。",
  "ngs.reads.3.name": "ファイル統計",
  "ngs.reads.3.desc":
    "属性欄には read 数、塩基数、read 長、平均品質、品質分布、GC 含量、品質スコアの符号化形式がまとめられ、Overall / R1 / R2 別の表示にも対応します。超大容量ファイルではプレビュー部分だけを読み込みますが、統計と解析はファイル全体が対象です。",
  "ngs.reads.shot":
    "READS & QUALITY — 上から下へ read ごとに閲覧：ペア結合、塩基ごとの品質バー、右側のファイル統計",

  "ngs.aa.head": "アミノ酸検索",
  "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
  "ngs.aa.title": "タンパク質断片で目的の可変領域を見つける",
  "ngs.aa.desc":
    "下部の検索ボックスを AA モードに切り替え、アミノ酸配列（例：MATNNQ）を入力すると、結合後の read をタンパク質に翻訳して 1 本ずつ照合し、一致したペプチドを配列中に枠で囲んで表示します。ライブラリシークエンスは両側の配列が保存的で中央が可変——既知の保存タンパク質断片を問い合わせにすれば、数千本の read からそれぞれの目的の可変領域を素早く見つけられます。",
  "ngs.aa.shot": "AA SEARCH — アミノ酸断片を入力すると、一致したペプチドが翻訳結果の中で枠表示されます",

  "ngs.trim.head": "アンカートリミング",
  "ngs.trim.headEn": "TRIM ANCHORS",
  "ngs.trim.title": "トリミングアンカーを設定して目的区間を正確に切り出す",
  "ngs.trim.desc":
    "目的区間の両側にある保存配列を左右のトリミングアンカーに設定し、Trim をクリックすればシークエンスファイル全体を一括トリミングし、2 つのアンカー間の可変領域配列だけを残します。属性欄には通過率と、アンカー非ヒットや断片が短すぎるなどで除外された件数がリアルタイムに表示されます。トリミング後の read は「Export processed reads」でワンクリックで書き出せ、後続の解析やデータ提出に使えます。",
  "ngs.trim.shot": "TRIM ANCHORS — 左右のアンカーで対象範囲を挟み込み、通過率をリアルタイム表示",

  "ngs.report.head": "ライブラリ豊度解析",
  "ngs.report.headEn": "LIBRARY ANALYSIS",
  "ngs.report.title": "ファイル全体からワンクリックで豊度レポートを作成",
  "ngs.report.desc":
    "Sequence analysis をクリックすると、トリミング結果に対して統計を実行します：既定ではファイル全体をそのまま解析し（数千万本の read をすべてメモリへ読み込む必要はありません）、各ユニーク配列の出現回数と頻度を集計し、両端アンカーの保持・除去を選べます。解析が完了すると図入りレポートが生成されます——上位配列のヒストグラム（DNA / AA の 2 種類の集計）と各配列の長さ・件数・頻度・+1 読み枠の翻訳に加え、完全な表は CSV として書き出され、Excel でそのまま開けます。これで簡単なライブラリ豊度レポートが完成です。",
  "ngs.report.shot1": "SEQUENCE ANALYSIS — 既定ではファイル全体を解析、アンカーの保持 / 除去を選択可",
  "ngs.report.shot2": "ANALYSIS REPORT — 上位配列のヒストグラムと完全な豊度表（CSV）",

  "ngs.video.head": "動画チュートリアル",
  "ngs.video.headEn": "VIDEO TUTORIAL",
  "ngs.video.lead":
    "文章と画像だけでは足りない方へ、完全な操作実演を用意しました：シークエンスファイルを開くところから、ペアエンドのペアリング、アンカートリミング、豊度レポートの生成まで、全工程を実際のデータで順を追って進めます。ページ内で直接再生できます。",
  "ngs.video.caption": "VIDEO TUTORIAL — 全工程の実演：開く → ペアリング → 閲覧 → 検索 → トリミング → 豊度レポート",

  "ngs.final.title": "NGS データ閲覧は GenePad の内蔵機能で、単体のソフトウェアではありません",
  "ngs.final.desc":
    "NGS データ閲覧は GenePad プラスミッドマップ編集ツールに内蔵されています。ダウンロード・インストール／更新後はすぐにシークエンスファイルを直接開け、マップ編集や Sanger トレースとの照合などの機能と同じアプリで連携して使えます。現在は無料の公開ベータで、全プラットフォームに対応しています。",
  "ngs.final.cta": "ホームへ戻る",
  "ngs.final.cta2": "今すぐダウンロード",
  "ngs.top.hint": "下部のダウンロード欄へ移動",

  // Tutorial ページ（チュートリアルセンター：各機能の使い方を随時収録）
  "tut.eyebrow": "Tutorials",
  "tut.title": (
    <>
      設定から日常の解析まで、
      <br />
      図を交えて手順ごとに解説
    </>
  ),
  "tut.lead":
    "ここには GenePad の図解チュートリアルを集めており、新しい記事を順次追加していきます：DeepSeek を接続して AI 機能を使えるようにする方法、遺伝子ファイルライブラリで数百件のプラスミッドを管理する方法、fastq.gz からライブラリ豊度レポートまでの NGS 解析など。各手順には実際の画面のスクリーンショットが付き、順番に操作するだけで進められます。",
  "tut.toc.hint": "カードをクリックすると対応するチュートリアルに移動します",
  "tut.card.view": "チュートリアルを読む",
  "tut.prev": "前のチュートリアル",
  "tut.next": "次のチュートリアル",
  "tut.backTo": "チュートリアル目次へ戻る",
  "tut.toc.ai.name": "AI を設定する（DeepSeek）",
  "tut.toc.ai.desc":
    "設定を開き、新しい設定を作成し、API キーを取得・保存——5 つの手順で DeepSeek に接続し、AI アシスタントとプラスミッド自動タグを使えるようになります。",
  "tut.toc.ai.en": "SET UP AI",
  "tut.toc.lib.name": "遺伝子ファイルライブラリ",
  "tut.toc.lib.desc":
    "監視フォルダで自動取り込み、プロジェクト・保存先・タグの 3 つの方法で検索し、AI アシスタントが属性でプラスミッドを特定します。",
  "tut.toc.lib.en": "FILE LIBRARY",
  "tut.toc.ngs.name": "NGS ファイル解析",
  "tut.toc.ngs.desc":
    "fastq.gz をドラッグするだけで開始：ペアエンドのペアリング、塩基ごとの品質確認、アミノ酸検索、アンカートリミングと豊度レポート。",
  "tut.toc.ngs.en": "NGS ANALYSIS",
  "tut.toc.lang.name": "任意の言語を設定",
  "tut.toc.lang.desc":
    "Settings → Language → AI Translate：目的の言語を入力すると自動で言語パックを生成し、UI 全体をフランス語・ロシア語など好きな言語に切り替えます。",
  "tut.toc.lang.en": "ANY LANGUAGE",

  // チュートリアルカテゴリ（目次ページの区分 + サイドナビ）
  "tut.toc.langpack.name": "UI 言語の設定",
  "tut.toc.langpack.desc":
    "設定 → Language を開く：内蔵の中国語・英語はワンクリックで切り替え、公式言語パックを読み込めばドイツ語・ロシア語・日本語・韓国語・フランス語の画面になります。",
  "tut.toc.langpack.en": "UI LANGUAGE",
  "tut.cat.switch.name": "移行ガイド",
  "tut.cat.switch.en": "SWITCHING GUIDES",
  "tut.cat.switch.desc": "SnapGene などからの移行を解説：ファイルは相互運用、日々の作業もそのまま。どちらか一方だけを選ぶ必要はありません",

  "tut.cat.gs.name": "はじめに",
  "tut.cat.gs.en": "GETTING STARTED",
  "tut.cat.gs.desc": "初心者は順番に進めるのがおすすめ：まず AI に接続し、次にプラスミッドファイルを管理します。",
  "tut.cat.analysis.name": "データ解析",
  "tut.cat.analysis.en": "DATA ANALYSIS",
  "tut.cat.analysis.desc": "配列データの閲覧・検索・定量解析。",

  // チュートリアル 2：AI を設定
  "tut.ai.head": "チュートリアル 2 · AI を設定する",
  "tut.ai.headEn": "TUTORIAL 2 · SET UP DEEPSEEK",
  "tut.ai.title": "5 つの手順で DeepSeek に接続し、AI アシスタントと自動タグを使えるようにする",
  "tut.ai.lead":
    "AI アシスタントとプラスミッド自動タグは大規模言語モデルによって動いており、DeepSeek の利用をおすすめします。以下の 5 つの手順を終えれば、自然言語で配列や注釈を操作でき、プラスミッドも取り込み時や開いたときに自動で性質タグが付けられます。",
  "tut.ai.1.name": "設定を開く",
  "tut.ai.1.desc": "GenePad を起動し、ようこそ画面右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.ai.1.shot": "ようこそ画面 — 右上の歯車アイコンをクリック",
  "tut.ai.2.name": "AI Settings を開いて設定を新規作成",
  "tut.ai.2.desc": "設定ウィンドウの左側で「AI Settings」を選び、「New config」をクリックして新しい AI 設定を作成します。",
  "tut.ai.2.shot": "AI Settings — 左側で AI Settings を選び、New config をクリック",
  "tut.ai.3.name": "設定内容を入力",
  "tut.ai.3.desc":
    "設定に名前を付け、プロバイダーで DeepSeek を、モデルで deepseek-v4-flash を選び、API URL は既定のままにします。次に API Key の横の「Get」をクリックすると、ブラウザで DeepSeek のプラットフォームが開きます。",
  "tut.ai.3.shot": "名前とモデルを入力 — API Key の横の「Get」をクリック",
  "tut.ai.4.name": "DeepSeek API キーを取得",
  "tut.ai.4.desc":
    "DeepSeek のプラットフォームでアカウントを登録して入金し、「Create API key」をクリック、名前を付けて確認します。キーは 1 度しか表示されないため、すぐにコピーしてください。",
  "tut.ai.5.name": "キーを貼り付けて保存",
  "tut.ai.5.desc":
    "GenePad に戻ってキーを貼り付け、「Test connection」をクリック。接続の成功を確認したら「Save current config」をクリックして保存します。これで AI 設定は完了です。",
  "tut.ai.note":
    "1 回設定すれば長く使え、キーはローカルにのみ保存されます。以後、ようこそ画面と作業画面の AI アイコンから直接対話でき、開いたり取り込んだりしたプラスミッドにも自動で性質タグが付けられます。",

  // チュートリアル 3：遺伝子ファイルライブラリ
  "tut.lib.head": "チュートリアル 3 · 遺伝子ファイルライブラリ",
  "tut.lib.headEn": "TUTORIAL 3 · GENE FILE LIBRARY",
  "tut.lib.title": "数百件のプラスミッドを、検索可能なライブラリとして管理する",
  "tut.lib.lead":
    "遺伝子ファイルライブラリはツールボックスにあります：ファイルを移動もコピーもせず、各所に散在するプラスミッドの統一索引を作るだけです。以下の手順は、自動取り込みから、属性を一言で伝えて目的のプラスミッドを特定するところまでを扱います。",
  "tut.lib.1.name": "監視フォルダを設定し、プラスミッドを自動取り込み",
  "tut.lib.1.desc":
    "遺伝子ファイルライブラリを開く →「Watch folders」→ プラスミッドを保存しているフォルダを追加。以後、起動のたびに自動スキャン：新しいプラスミッドは自動で取り込まれ、削除されたものは自動で除外されます。手動の維持は不要です。",
  "tut.lib.2.name": "プロジェクト・保存先・タグで検索",
  "tut.lib.2.desc":
    "新しいプロジェクトを作成してプラスミッドをドラッグすれば整理完了。あるいは保存された場所のまま閲覧します。AI を設定すると各プラスミッドに性質タグが付き、タグをクリックするだけで関連する全プラスミッドを絞り込めます。",
  "tut.lib.3.name": "AI が性質タグを自動生成",
  "tut.lib.3.desc":
    "チュートリアル 1 の設定を終えていれば、プラスミッドのスキャン時や開いたときに lentiviral、sgRNA、ampicillin などのタグが自動生成されます。列見出しからの一括更新も可能——欠けているタグだけを補うか、すべて再生成します。",
  "tut.lib.4.name": "AI アシスタントが属性で特定",
  "tut.lib.4.desc":
    "AI アシスタントに直接要件を伝えます。たとえば「Type I CRISPR プラスミッドを探して」：アシスタントはライブラリ全体を検索し、候補を挙げながら各プラスミッドの性質と推奨用途を説明します。",
  "tut.lib.5.name": "検索結果をそのまま使用",
  "tut.lib.5.desc":
    "任意のプラスミッドを右クリック →「Open with」で、SnapGene（マップ）や VS Code（配列）などのツールに渡せます。詳細欄ではタグの追加・削除や、「検証済み」などの独自タグの追加もできます。",
  "tut.lib.note":
    "ファイルライブラリは索引に過ぎず、元のファイルは変更しません。AI を設定しなくても取り込みと閲覧には影響せず、自動タグと AI 検索だけが使えなくなります。",

  // チュートリアル 4：NGS ファイル解析
  "tut.ngs.head": "チュートリアル 4 · NGS ファイル解析",
  "tut.ngs.headEn": "TUTORIAL 4 · NGS ANALYSIS",
  "tut.ngs.title": "fastq.gz からライブラリ豊度レポートまで",
  "tut.ngs.lead":
    "コマンドライン不要。シークエンスファイルをウィンドウにドラッグするだけで開始できます。以下の 6 つの手順で、開く・ペアリング・品質確認・検索・トリミング・豊度解析の完全な流れを扱い、ページ末尾に完全な操作動画を付けています。",
  "tut.ngs.1.name": "シークエンスファイルを開く",
  "tut.ngs.1.desc":
    "1 つまたは複数のシークエンスファイルを GenePad ウィンドウに直接ドラッグ。あるいはエクスプローラーで右クリックし、「Open with」で GenePad を選びます。fastq.gz、fastq、fq.gz、fq に対応し、gzip 圧縮は解凍不要です。",
  "tut.ngs.2.name": "ペアエンドファイルを自動ペアリング",
  "tut.ngs.2.desc":
    "R1・R2 の 2 ファイルを一緒にドラッグすると、先頭 read の ID でペアを自動認識。複数ペアを一度にドラッグすると確認画面が表示され、「Auto-pair」でワンクリックペアリングできます。確認後、各ペアは 1 つのペアエンドデータとして開かれます。",
  "tut.ngs.3.name": "read ごとに閲覧して品質確認",
  "tut.ngs.3.desc":
    "メイン画面には read が 1 本ずつ一覧表示されます：各塩基は Phred 品質で色分けされ、ペアエンドデータは自動結合されてオーバーラップ長と一致率が表示されます。右側の属性欄には read 数や GC 含量などのファイル統計がまとめられます。",
  "tut.ngs.4.name": "アミノ酸検索で可変領域を特定",
  "tut.ngs.4.desc":
    "下部の検索ボックスを AA モードに切り替え、既知の保存タンパク質断片（例：MATNNQ）を入力：結合後の read をタンパク質に翻訳して 1 本ずつ照合し、一致したペプチドを枠表示。数千本の read から目的の可変領域を素早く特定できます。",
  "tut.ngs.5.name": "アンカーを設定して一括トリミング",
  "tut.ngs.5.desc":
    "目的区間の両側にある保存配列を左右のトリミングアンカーに設定し、Trim をクリックすればファイル全体を一括トリミングし、2 つのアンカー間の可変領域だけを残します。属性欄には通過率がリアルタイム表示され、トリミング結果はワンクリックで書き出せます。",
  "tut.ngs.6.name": "ライブラリ豊度レポートを生成",
  "tut.ngs.6.desc":
    "Sequence analysis をクリック：ファイル全体で各ユニーク配列の出現回数と頻度を集計し、上位配列のヒストグラムと各配列の明細を生成、完全な表は CSV として書き出され、Excel でそのまま開けます。これで簡単なライブラリ豊度レポートが完成です。",

  // チュートリアル 5：任意の言語を設定
  "tut.lang.head": "チュートリアル 5 · 任意の言語を設定",
  "tut.lang.headEn": "TUTORIAL 5 · ANY LANGUAGE",
  "tut.lang.title": "AI 翻訳で UI を任意の言語に切り替える",
  "tut.lang.lead":
    "GenePad には中国語と英語の UI が内蔵されていますが、他の言語は公式対応を待つ必要がありません：設定 → Language を開き、「AI Translate」をクリックし、目的の言語を入力するだけで、言語パックを自動生成して適用します。先にチュートリアル 1 で AI の設定を終えてください。",
  "tut.lang.1.name": "設定を開く",
  "tut.lang.1.desc": "チュートリアル 1 と同じ：GenePad を起動し、ようこそ画面右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.lang.2.name": "Language 設定を開き、AI Translate をクリック",
  "tut.lang.2.desc":
    "設定の左側で「Language」を選び、「AI Translate」をクリックします。この画面では言語ファイルの手動読み込み／書き出しもできます。",
  "tut.lang.2.shot": "言語設定 — Language を選び、AI Translate をクリック",
  "tut.lang.3.name": "目的の言語を入力して翻訳を開始",
  "tut.lang.3.desc":
    "言語の名前とコード（例：français と fr）を入力し、「Translate」をクリック：設定済みの AI が内蔵言語ファイルを翻訳します——長い文は自動分割、失敗した部分は自動再試行、完了後は自動で読み込んで適用されます。",
  "tut.lang.3.shot": "言語の名前とコードを入力 — Translate をクリック",
  "tut.lang.4.name": "UI 全体が目的の言語に切り替わる",
  "tut.lang.4.desc":
    "翻訳が完了すると、UI が即座に丸ごと切り替わります。フランス語の例：すべてのメニュー・設定・メッセージが翻訳されています。",
  "tut.lang.4.shot": "UI 全体がフランス語に切り替わった様子",
  "tut.lang.5.name": "同じ方法で言語をさらに追加",
  "tut.lang.5.desc":
    "同じ方法でロシア語、スペイン語など好きな言語を追加できます。読み込んだ言語パックは Language 画面で選択・管理・削除できます。",
  "tut.lang.5.shot": "同じ方法で追加したロシア語 UI",
  "tut.lang.note":
    "AI 翻訳は内蔵の中国語言語ファイルを原文とします。個々の語句が正確でない場合は、言語ファイルを書き出して手元で修正し、再度読み込んでください。",

  // チュートリアル 6：UI 言語の設定（内蔵言語の切り替え + 公式言語パックの読み込み）
  "tut.langpack.head": "チュートリアル 6 · UI 言語を設定",
  "tut.langpack.headEn": "TUTORIAL 6 · UI LANGUAGE",
  "tut.langpack.title": "2 つの手順で UI をあなたの言語に",
  "tut.langpack.lead":
    "GenePad には中国語と英語の画面が内蔵されています。ドイツ語・ロシア語・日本語・韓国語・フランス語は公式言語パックで提供 — ダウンロードして設定から読み込むだけで、追加の設定は不要です。AI 翻訳で作った独自の言語パックも同じ手順で使えます。",
  "tut.langpack.1.name": "設定を開く",
  "tut.langpack.1.desc": "GenePad を起動し、ようこそ画面右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.langpack.1.shot": "ようこそ画面 — 右上の歯車アイコンをクリック",
  "tut.langpack.2.name": "Language 設定を開く",
  "tut.langpack.2.desc":
    "設定ウィンドウの左側で「Language」を選択：English か 中文 をクリックすると内蔵言語が切り替わります。読み込んだ言語パックも同じ一覧に表示されます。",
  "tut.langpack.2.shot": "Language 設定 — 言語をクリックすると即座に切り替わります。下部のボタンで言語ファイルの読み込み / 書き出し",
  "tut.langpack.3.name": "言語パックをダウンロードして読み込む",
  "tut.langpack.3.desc":
    "このページの下部から必要な言語の .json パックをダウンロードし、「Import Language File」をクリックしてダウンロードしたファイルを選びます。読み込みが完了すると一覧に言語が追加され — クリックすれば画面全体が切り替わり、右側のゴミ箱アイコンで削除できます。",
  "tut.langpack.3.shot": "読み込み完了 — 一覧に言語が追加され、クリックで切り替わります",
  "tut.langpack.4.name": "画面全体が切り替わる",
  "tut.langpack.4.desc":
    "言語を選ぶと画面全体が即座に切り替わります：すべてのメニュー・設定・メッセージが翻訳されます。公式 5 言語パックの実際の画面：",
  "tut.langpack.4.shot1": "フランス語画面",
  "tut.langpack.4.shot2": "韓国語画面",
  "tut.langpack.4.shot3": "ロシア語画面",
  "tut.langpack.4.shot4": "ドイツ語画面",
  "tut.langpack.4.shot5": "日本語画面",
  "tut.langpack.dl.title": "公式言語パックのダウンロード（.json）",
  "tut.lang.dl.hint":
    "AI 設定は不要です。公式言語パック（ドイツ語・ロシア語・日本語・韓国語・フランス語）をダウンロードして、そのまま読み込めます。GenePad 0.7.x 対応。",
  "tut.langpack.dl.hint": "GenePad 0.7.x 対応。解凍は不要 — 手順 3 と同じ要領でそのまま読み込んでください。",
  "tut.langpack.dl.btn": "ダウンロード",
  "tut.langpack.note":
    "言語パックには画面の文字列のみが含まれ、配列やファイルのデータは含まれません。公式パックはバージョンごとに更新されるため、新しいファイルを読み込み直せば最新になります。他の言語が必要ですか？チュートリアル 4 で AI 翻訳により任意の言語パックを生成できます。",

  // チュートリアル 2：SnapGene からの移行（移行カテゴリー、ハブページの先頭）
  "title.tutorial.snapgene": "SnapGene 代替ガイド - GenePad | 無料のクロスプラットフォーム プラスミッドマップ編集ツール",
  "tut.toc.snapgene.name": "SnapGene から乗り換える",
  "tut.toc.snapgene.desc":
    "既存の .dna ファイルを直接読み書きし、マップ・制限酵素部位・Sanger 比較まで日々の作業をカバー。さらに NGS や遺伝子ファイルライブラリなど独自機能も",
  "tut.toc.snapgene.en": "SWITCH FROM SNAPGENE",
  "tut.snapgene.head": "チュートリアル 1 · SnapGene 代替ガイド",
  "tut.snapgene.headEn": "TUTORIAL 1 · SNAPGENE ALTERNATIVE",
  "tut.snapgene.title": "SnapGene から GenePad へ：作業の流れの移行ガイド",
  "tut.snapgene.lead":
    "SnapGene を使っていますか？このガイドでは、GenePad が日々の作業のどこまで引き受けられるかを解説します：既存の .dna ファイルはそのまま読み書きでき、マップ・制限酵素部位・プライマー・Sanger 比較も直感的に操作できます。さらに NGS データ閲覧・遺伝子ファイルライブラリ・AI アシスタントなど、SnapGene にない機能も。両者は排他的ではありません — GenePad の「Open with」から、いつでもファイルを SnapGene に渡せます。",
  "tut.snapgene.1.name": "既存の .dna ファイルをそのまま開く",
  "tut.snapgene.1.desc":
    "SnapGene の .dna プラスミドファイルを GenePad にドラッグするだけで開けます：主配列・トポロジー・注釈・プライマー・notes をそのまま読み込み、編集後も .dna として保存できるため、SnapGene を使い続ける先生や同僚に渡しても形式の問題はありません。",
  "tut.snapgene.1.shot": "Addgene から入手した .dna プラスミドを直接開いた画面：環状/線状の切り替え、注釈は分類ごとに色分け",
  "tut.snapgene.2.name": "マップ・配列・制限酵素サイト",
  "tut.snapgene.2.desc":
    "マップと配列は双方向に連動：注釈表で項目を選ぶと配列ビューが該当塩基へ移動し、選択範囲の長さ・GC 含量・Tm を表示します。制限酵素部位は二本鎖配列上に直接表示され、カーソルを合わせると認識配列・鎖の向き・上下の鎖の切断位置・5′ 突出末端を確認できます。",
  "tut.snapgene.2.shot1": "注釈表で選択すると配列ビューが移動し、長さ・GC 含量・Tm を表示",
  "tut.snapgene.2.shot2": "制限酵素部位にカーソルを合わせたときの情報：認識配列・切断位置・5′ 突出末端",
  "tut.snapgene.3.name": "Sanger シークエンシングの比較",
  "tut.snapgene.3.desc":
    "AB1 トレースファイルを読み込むと、クロマトグラム・reads・参照配列を塩基ごとに整列。一致率と E-value を表示し、ミスマッチ部位は赤で強調します。",
  "tut.snapgene.3.shot": "AB1 トレースを参照配列と塩基ごとに整列、ミスマッチは赤表示",
  "tut.snapgene.4.name": "共通要素の認識と sgRNA 設計",
  "tut.snapgene.4.desc":
    "マップを開くとプロモーター・耐性遺伝子・複製起点などが自動で注釈されます（内蔵要素ライブラリは 20 分類、全エントリーに NCBI アクセッション番号を記録）。配列を選んで右クリックするだけで sgRNA を設計：SpCas9・xCas9・Cas12a/b・TnpB など 12 種類の認識様式に対応し、PAM の向き・シード領域の長さ・オフターゲットの除外条件を設定でき、候補はワンクリックでマップに注釈として書き戻せます。",
  "tut.snapgene.4.shot": "右クリックメニューから直接 sgRNA 設計：12 種類の認識様式、候補はワンクリックでマップへ",
  "tut.snapgene.5.name": "電気泳動シミュレーションとタンパク質の物性",
  "tut.snapgene.5.desc":
    "アガロースゲルと SDS-PAGE の両方に対応：Trans2K® などの分子量マーカーを内蔵し、泳動前にバンド位置を予測できます。CDS を選ぶと分子量・等電点（19 種類の計算法）・GRAVY・脂肪族指数・モル吸光係数をリアルタイムに計算します。",
  "tut.snapgene.5.shot1": "DNA 電気泳動シミュレーション：Trans2K® マーカー、制限消化や PCR 産物をレーンに追加",
  "tut.snapgene.5.shot2": "タンパク質の物性欄：分子量・等電点・GRAVY・脂肪族指数・モル吸光係数",
  "tut.snapgene.6.name": "NGS データの閲覧",
  "tut.snapgene.6.desc":
    "fastq.gz / fastq / fq.gz / fq を直接開けます（gzip 展開不要）。ペアエンドの R1/R2 を自動ペアリングして 1 read ずつ結合し、各塩基を Phred 品質で色分け。アミノ酸配列での検索・アンカーによる一括トリミング・ライブラリ豊度レポート（CSV 出力）にも対応します。",
  "tut.snapgene.6.shot": "ペア read を 1 本ずつ結合、塩基ごとに品質で色分け、右側はファイル統計",
  "tut.snapgene.7.name": "遺伝子ファイルライブラリと AI アシスタント",
  "tut.snapgene.7.desc":
    "フォルダに散らばったプラスミドファイルを一つの索引にまとめます（索引を作るだけで元のファイルは変更しません）。AI が配列と注釈から性質タグを自動生成し、監視フォルダは新しいファイルを自動で取り込みます。AI アシスタントは一文でファイルを検索し、共通要素についての質問にも答えます。",
  "tut.snapgene.7.shot": "遺伝子ファイルライブラリ：AI がタグを一括生成、タグやプロジェクトでプラスミドを検索",
  "tut.snapgene.8.name": "多言語と「別のプログラムで開く」",
  "tut.snapgene.8.desc":
    "中国語・英語・日本語・フランス語・ドイツ語・ロシア語の 6 か国語を内蔵し、AI 翻訳で任意の言語を追加可能。右クリックからいつでもファイルを SnapGene・VS Code など指定したアプリに渡せます — GenePad は奪うのではなく補完します。",
  "tut.snapgene.8.shot1": "言語設定：6 か国語を内蔵、言語パックの読み込みと AI 生成に対応",
  "tut.snapgene.8.shot2": "「別のプログラムで開く」：SnapGene・VS Code などへワンクリックで受け渡し",
  "tut.snapgene.note":
    "ライセンス：GenePad は現在無料の公開ベータです。ベータ終了後も、マップの閲覧・編集・保存など既存機能は引き続き無料でご利用いただけます。学術ユーザー（大学・病院の研究室・iGEM・学生）は 2027 年 12 月 31 日まで自動的に無料で利用でき、申請は不要です。商用利用は今後提供予定の GenePad Pro が対象になります。ツールボックスの「Molecular Cloning」は一部機能を先行提供中で、作業の流れ全体は開発中です。",

  "tut.final.title": "チュートリアルで扱う機能はすべて GenePad に内蔵されており、単体のソフトウェアではありません",
  "tut.final.desc":
    "GenePad をダウンロード・インストール／更新すれば、チュートリアルのとおりに操作できます：AI アシスタント、遺伝子ファイルライブラリ、NGS データ閲覧が同じアプリで連携します。現在は無料の公開ベータで、全プラットフォームに対応しています。",
  "tut.final.cta": "ホームへ戻る",
  "tut.final.cta2": "今すぐダウンロード",
  "tut.top.hint": "下部のダウンロード欄へ移動",

  // Stats サブページ（リアルタイム統計）
  "st.eyebrow": "Live Stats",
  "st.title": (
    <>
      リアルタイムのインストール統計、
      <br />
      次の 1 台はあなたです
    </>
  ),
  "st.lead":
    "以下の数値は、GenePad アプリ内の匿名利用統計から集計されたものです：各インストールは 1 つのランダム識別子としてのみ数えられ、シークエンス・ファイル・個人情報は一切含まれません。データは報告のたびに自動更新され、GenePad の利用に登録は不要です。",
  "st.k.installs": "累計インストール数",
  "st.k.active30": "直近 30 日の稼働",
  "st.k.active7": "直近 7 日の稼働",
  "st.k.hours": "累計使用時間",
  "st.k.hoursUnit": "時間",
  "st.chart.title": "週次の新規インストール",
  "st.chart.title.daily": "日次の新規インストール",
  "st.chart.caption": "WEEKLY NEW INSTALLS — 各インストールの初回起動時刻で集計（月曜〜日曜、UTC）",
  "st.chart.caption.daily": "DAILY NEW INSTALLS — 各インストールの初回起動日で集計（UTC の自然日）",
  "st.chart.note.daily": "最後のバーは本日の集計途中の値で、数はまだ増えていきます。",
  "st.chart.note.byos": "バーの色は OS ごとに分かれています。バーの各部分にカーソルを合わせると、OS ごとの数値を確認できます。",
  "st.chart.total": "合計",
  "st.chart.legend.aria": "OS 別の凡例",
  "st.tab.aria": "統計の粒度",
  "st.tab.weekly": "週次",
  "st.tab.daily": "日次",
  "st.os.title": "インストール OS の分布",
  "st.os.other": "その他",
  "st.updated": "データ更新日時",
  "st.note": "集計方法：ランダムなインストール識別子で集約。統計をオフにした場合やアンインストール後は数えられません。",
  "st.error": "統計データを一時的に取得できません。しばらくしてから画面を再読み込みしてお試しください。",
  "st.cta": "無料でダウンロードして、次のユーザーになりましょう",
};

export default ja;
