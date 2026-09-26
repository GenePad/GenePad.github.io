/* 日本語辞書：key は zh ベースと一対一対応；i18n.tsx から読み込む。 */
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
  "nav.ngs": "NGS データビューア",
  "nav.tutorial": "チュートリアル",
  "nav.docs": "開発者ドキュメント",
  "nav.projects": "エコシステムプロジェクト",
  "nav.stats": "リアルタイム統計",
  "nav.cta": "無料ダウンロード／アップグレード",
  "nav.lang": "EN",

  // Page titles（実行時タイトルは UI 言語に追従。静的 HTML の <title> はページ言語と一致：jp.genepad.cn は日本語）
  "title.home": "GenePad - 軽量クロスプラットフォームのゲンマップエディタ",
  "title.library": "遺伝子ファイルライブラリ - GenePad | プラスミドファイルの検索と管理",
  "title.ngs": "NGS データビューア - GenePad | FASTQ シークエンスデータの閲覧とライブラリ豊度解析",
  "title.tutorial": "チュートリアル - GenePad | AI 設定 · 遺伝子ファイルライブラリ · NGS 解析",
  "title.tutorial.ai": "AI 設定チュートリアル - GenePad | DeepSeek API キーの取得と保存",
  "title.tutorial.library": "遺伝子ファイルライブラリチュートリアル - GenePad | プラスミドの取り込み・検索・AI タグ",
  "title.tutorial.ngs": "NGS 解析チュートリアル - GenePad | fastq.gz の閲覧とライブラリ豊度レポート",
  "title.tutorial.lang": "多言語設定チュートリアル - GenePad | AI 翻訳で言語パックを生成",
  "title.tutorial.langpack": "UI言語の設定チュートリアル - GenePad | 内蔵言語と公式言語パック",
  "title.projects": "エコシステムプロジェクト - GenePad | プラスミドパーツライブラリとコドンアトラス",
  "title.tech": "開発者向け技術ドキュメント - GenePad",
  "title.stats": "リアルタイム統計 - GenePad | 公開利用統計",

  // Hero
  "hero.badge": "無料パブリックベータ",
  "hero.badgeEn": "Free Beta · Cross-platform",
  "hero.titleCn": "ゲンマップエディタ",
  "hero.titleEn": "クロスプラットフォーム",
  "hero.desc":
    "日常の分子クローンングのためのクロスプラットフォーム・ゲンマップエディタ。プラスミドマップの閲覧・編集、シークエンスアノテーションの管理、制限酵素部位の解析、Sanger トレースの比較など、クローン設計から結果検証までのワークフロー全体をカバーします。",
  "hero.download": "無料ダウンロード／アップグレード",
  "hero.tour": "画面を見る",
  "hero.features": "MAP · ANNOTATION · ENZYME · PRIMER · TRACE",
  "hero.platforms": "対応プラットフォーム",

  // Workbench
  "wb.eyebrow": "Workbench",
  "wb.title": <>マップ・シークエンス・解析をひとつにしたワークベンチ</>,
  "wb.lead":
    "マップの閲覧、シークエンス編集、制限酵素部位の確認、タンパク質物性の計算をひとつの画面に統合。各ビューは選択中の対象に連動して位置合わせされます。",
  "wb.1.name": "プラスミドマップ全体",
  "wb.1.desc":
    "環状マップと線形マップをワンクリックで切り替え。プロモーター、CDS、複製起点、poly(A) 信号などの要素をカテゴリ別に色分けし、ラベルの自動避讓により、要素の多いベクターでも読み取りやすいマップを保ちます。",
  "wb.2.name": "マップ → シークエンス",
  "wb.2.desc":
    "アノテーションテーブルで項目を選択すると、シークエンスビューが対応する塩基区間にジャンプし、選択範囲の長さ・GC 含量・Tm 値も同時に表示。マップとシークエンスが双方向に連動します。",
  "wb.3.name": "制限酵素部位",
  "wb.3.desc":
    "制限酵素部位は二本鎖シークエンス上に直接表示され、マウスオーバーで認識配列・鎖の方向・上下の切断位置を確認できます。5′ オーバーハングも明示され、クローン設計の検証を素早く行えます。",
  "wb.4.name": "タンパク質物性",
  "wb.4.desc":
    "CDS を選択すると、分子量・等電点・GRAVY・脂肪族指数・モル吸光係数をリアルタイム計算。等電点には 19 種類のアルゴリズムを内蔵して比較でき、既定では文献で推奨されるアルゴリズムの結果を出力します。",

  // DayNight
  "dn.eyebrow": "Light & Dark",
  "dn.title": (
    <>
      明暗 2 テーマ、
      <br />
      長時間の作業のために設計
    </>
  ),
  "dn.lead":
    "同じ研究画面に 2 種類の完全なカラースキームを用意。ライトテーマは投影・プレゼンテーション・日中の環境に適し、ダークテーマは夜間の長時間使用による視覚負荷を軽減します。",
  "dn.day": "DAY",
  "dn.night": "NIGHT",
  "dn.state.day": "▸ LIGHT THEME — ライトテーマ実行中",
  "dn.state.night": "▸ DARK THEME — ダークテーマ実行中",
  "dn.caption.day": "DAY MODE — 同じベクターのライトテーマでの全体ビュー",
  "dn.caption.night": "NIGHT MODE — マップ・シークエンス・制限酵素部位のダークテーマ描画",
  "dn.alt.day": "GenePad ライトテーマ",
  "dn.alt.night": "GenePad ダークテーマ",

  // Sanger
  "sg.eyebrow": "Sanger Trace",
  "sg.title": (
    <>
      Sanger シークエンス結果を参照配列と
      <br />
      塩基ごとにアラインメント
    </>
  ),
  "sg.lead":
    "AB1 クロマトグラムファイルを読み込むと、クロマトグラム・reads・参照配列が塩基単位で整列し、一致率と E-value を結果に直接表示。各シークエンス反応の品質とミスマッチ位置を判断できます。",
  "sg.badge.format": "AB1 トレース",
  "sg.shot1": "2KB-RCA-F — クロマトグラムを参照配列と塩基ごとに整列",
  "sg.shot2": "TOP STRAND — ミスマッチ部位を赤で表示",

  // Toolbox
  "tb.eyebrow": "Toolbox",
  "tb.title": <>豊富なツールボックス</>,
  "tb.lead":
    "シークエンスを選択すれば、ゲル電気泳動シミュレーションや sgRNA デザインを右クリックメニューから直接呼び出せます。グローバルなツールボックスには AI アシスタントと遺伝子ファイルライブラリを提供。多言語 UI と「Open with」対応により、既存のワークフローとも容易に連携します。",
  "tb.groupA": "右クリックメニュー",
  "tb.groupB": "グローバルツールボックス",
  "tb.groupC": "オープン性",
  "tb.c1.name": "DNA ゲル電気泳動シミュレーション",
  "tb.c1.desc":
    "シークエンスを選択して右クリックメニューからゲル電気泳動シミュレーションを起動し、アガロースゲルのバンド位置をプレビュー。Trans2K® など主流の分子量マーカーを内蔵しており、実験前に泳動結果を見積もれます。",
  "tb.c2.name": "タンパク質ゲル電気泳動シミュレーション",
  "tb.c2.desc":
    "SDS-PAGE シミュレーション：CDS またはアミノ酸区間を選択してサンプルをロードし、PageRuler などのプレステインド分子量マーカーを参照に、バンド位置をリアルタイム計算します。",
  "tb.c3.name": "CRISPR sgRNA デザイン",
  "tb.c3.desc":
    "SpCas9、xCas9、Cas12a/b、TnpB など 12 種類の認識配置に対応。PAM の向き、シード領域長、オフターゲットフィルタを設定でき、候補配列はワンクリックでマップにアノテーションし戻せます。",
  "tb.t1.name": "AI アシスタント",
  "tb.t1.desc":
    "現在のファイルのシークエンス・アノテーション・プライマーを直接読み書きできます。feature の追加、Tm の計算、タンパク質の翻訳、ORF の予測などの操作を、自然言語の指示で行えます。",
  "tb.t2.name": "遺伝子ファイルライブラリ",
  "tb.t2.desc":
    "開いたベクターファイルは自動でインデックス化され、AI が一括で性質タグを生成。監視フォルダにも対応し、プラスミドの属性からファイルを検索・特定できるため、ファイル名を覚える必要がありません。AI アシスタントからの検索にも対応します。インデックスの作成のみで、元のファイルは変更しません。",
  "tb.o1.name": "多言語",
  "tb.o1.desc":
    "中国語・英語・日本語・フランス語・ドイツ語・ロシア語の 6 つの UI 言語を内蔵。言語パックのエクスポートに対応し、AI 翻訳支援によるカスタム言語の追加も可能です。",
  "tb.o2.name": "Open with 連携",
  "tb.o2.desc":
    "内蔵の「Open with」機能で、ファイルをワンクリックで SnapGene、VS Code など指定のツールに渡せます。既存のワークフローと協働し、ファイルの使い方を制限しません。",
  "tb.more": "詳しく見る",

  // ホームページの遺伝子ファイルライブラリ紹介セクション
  "lp.lead":
    "遺伝子ファイルライブラリは、各所に散在するプラスミドファイルを検索可能なインデックスに一元化します。プロジェクト別・保存パス別・AI 生成タグ別の 3 つの管理方法に対応し、ファイル名やパスを覚えなくても、1〜2 個の属性特徴だけで AI が検索・特定します。",
  "lp.c1": "プロジェクト · パス · タグ",
  "lp.c2": "AI 自動タグ付け",
  "lp.c3": "自然言語検索",
  "lp.c4": "監視フォルダの自動インデックス",
  "lp.safe": "インデックスの作成のみ。元のファイルは変更しません",
  "lp.cta": "詳しく見る",

  // Download
  "dl.eyebrow": "Download · インストール / アップグレード",
  "dl.title": (
    <>
      デスクトップからモバイルまで、
      <br />
      全プラットフォーム対応クライアント
    </>
  ),
  "dl.lead":
    "Windows、macOS、Linux のデスクトップと Android モバイルに対応し、各プラットフォームで機能は同一です。初回はインストーラをダウンロードしてインストールするだけで完了。インストール済みの方は、最新版をダウンロードして上書きインストールするだけでアップグレードでき、旧バージョンのアンインストールは不要です。",
  "dl.note.desktop": "デスクトップ",
  "dl.note.linuxX64": "デスクトップ · x86_64",
  "dl.note.mobile": "モバイル",
  "dl.note.soon": "近日公開",
  "dl.upgradeNote":
    "GenePad をインストール済みですか？最新のインストーラをダウンロードして上書きインストールするだけでアップグレードでき、旧バージョンのアンインストールは不要です。新規の方はダウンロード後、画面の案内に従ってインストールしてください。",
  "dl.cmdTitle.recommended": "コマンドラインでのインストール／アップグレード（推奨）",
  "dl.cmdTitle.plain": "コマンドラインでのインストール／アップグレード",
  "dl.cmd.brewLabel": "macOS · Homebrew",
  "dl.cmd.npmLabel": "Linux · npm",
  "dl.cmd.npmLabelMac": "macOS · npm",
  "dl.cmd.note": "上記のコマンドをコピーし、ターミナルに貼り付けて実行してください。",
  "dl.cmd.scriptLabel": "Linux · ワンクリック インストール／アップグレードスクリプト",
  "dl.cmd.scriptLabelMac": "macOS · ワンクリック インストール／アップグレードスクリプト",
  "dl.cmdTab.script": "ワンクリック",
  "dl.cmdTab.npm": "npm",
  "dl.cmd.recommendedTag": "推奨",
  "dl.or.linux": "またはインストーラを直接ダウンロード",
  "dl.ai.title": "AI 支援インストール／アップグレード",
  "dl.ai.desc":
    "macOS 版のインストーラは未署名のため、手動での手順が多くなります。以下のプロンプトを AI アシスタント（Kimi、ChatGPT など）にコピーし、案内に従ってインストールを進めてください。",
  "dl.ai.prompt": `macOS に「GenePad」というアプリをインストールしてください。以下の順に試し、いずれかの方法が成功したらそこで止まってください：
1. 第一候補：公式のワンクリック インストールスクリプトを実行（Homebrew を自動検出・インストールし、ネットワーク状況に応じて中国国内ミラーに切り替えます）。必ず -q 引数を付けてください。スクリプトは既定では終了時に Enter キー入力を待つため、-q を付けるとその待ちをスキップでき、無人実行に便利です：
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   インストール完了後、open -a GenePad を実行してください。
2. 第二候補：Homebrew でインストール（自動的に「アプリケーション」に追加されます）：
   brew install genepad/tap/genepad
   インストール完了後、open -a GenePad を実行してください。Homebrew が未インストールの場合は、先に次のコマンドでインストールしてください：
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. 第三の方法：npm でインストール（コマンドラインから起動）。可能であれば ~/Applications にもコピーし、「アプリケーション」と Launchpad に表示されるようにしてください：
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   その後、open -a GenePad を実行（またはコマンドラインで genepad を実行）
4. 手動（最終手段）：本アプリは未署名のため、ブラウザでダウンロードしたファイルは Gatekeeper により「破損している」と判定されます。そこで curl でダウンロードし、ローカルで署名します。まず https://genepad.cn/update.json から最新のバージョン番号を読み取り（VERSION と呼びます、例：0.7.1）、次にそのバージョンの .app.tar.gz をダウンロードして展開・インストールしてください：
   curl -L -o /tmp/gene-pad-app.tar.gz "https://genepad.cn/release/mac/GenePad_\${VERSION}_Darwin_arm64.app.tar.gz"
   mkdir -p /tmp/gene-pad-extract && tar -xzf /tmp/gene-pad-app.tar.gz -C /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ 注意：上記の方法は失効している、または古くなっている可能性があります。ある手順が完了できない場合は、自分で別の実行可能な方法（例：別の Gatekeeper 回避方法、または他の展開・署名ツールの使用）に切り替えてください。上記のダウンロードリンクにアクセスできない場合にのみ、公式サイト https://genepad.cn を訪れてください——公式サイトは他のダウンロードリンクを提供するだけで、インストール支援は行っていません。`,
  "dl.mac.other": "その他のインストール／アップグレード方法（Homebrew / npm / AI 支援 / インストーラ直リンク）",
  "dl.mac.unsigned":
    "未署名に関する説明：ブラウザで直接ダウンロードした .dmg / .app ファイルは、Gatekeeper により「破損している」と判定されます。右クリック →「開く」で実行するか、xattr -cr を実行して隔離属性を削除してください。上記のコマンドラインによるインストール／アップグレードを推奨します。",
  "dl.copy": "コピー",
  "dl.copied": "コピーしました ✓",
  "dl.filesTitle": "インストーラの直接ダウンロード",
  "lb.close": "閉じる",
  "lb.prev": "前の画像",
  "lb.next": "次の画像",
  "dl.source.direct": "当サイト直リンク",
  "dl.source.gitee": "Gitee",
  "dl.source.github": "GitHub",
  "dl.giteeBadge": "中国国内 CDN",
  "dl.arch.x64": "x86_64",
  "dl.arch.arm64": "ARM64",
  "dl.spark": "Spark Store",
  "dl.sparkNote": "中国国産 Linux ディストリビューションをお使いの方は、Spark Store からもインストール／アップグレードできます",
  "dl.releases": "全バージョン（GitHub Releases）",
  "dl.releasesGitee": "全バージョン（Gitee ミラー）",
  "dl.licenseTag": "LICENSE",
  "dl.license":
    "GenePad Free は個人での評価・学習目的に無料で、日常的なマップの閲覧・編集・保存をカバーします。商用利用は、今後リリースされる GenePad Pro のライセンスで支援される予定です。",
  "dl.license.academic":
    "アカデミック無償ライセンス：2026 年から 2027 年 12 月 31 日までの期間、大学・病院の研究グループ・iGEM 参加者・研究者・学生などのアカデミックユーザーは、本プログラムをダウンロードするだけで無償利用権を自動的に取得できます。申請や GenePad チームへの連絡は不要です。この権限はアカデミック・研究用途に限られ、いかなる商用利用にも使用できません。",

  // Footer
  "ft.blurb":
    "日常の分子クローンングを支える、軽量・クロスプラットフォームのゲンマップエディタ。問題やご提案を送ってくださったすべてのユーザーに感謝します。",
  "ft.col.download": "ダウンロード",
  "ft.col.support": "フィードバックとサポート",
  "ft.col.more": "その他",
  "ft.giteeMirror": "Gitee ミラー",
  "ft.changelog": "更新履歴",
  "ft.docs": "開発者ドキュメント",
  "ft.projects": "エコシステムプロジェクト",
  "ft.library": "遺伝子ファイルライブラリ",
  "ft.ngs": "NGS データビューア",
  "ft.sponsor": "開発者をスポンサーする",
  "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

  // サブページ共通
  "sub.back": "ホームへ戻る",

  // 技術サポートページ
  "ts.eyebrow": "Developer Docs",
  "ts.title": "ファイル形式開発ドキュメント",
  "ts.lead":
    "読み込み・変換・インポート用のプログラムを自前で開発する方向け：GenePad が使用する .gen・.gjson 形式、および SnapGene .dna 変換スキームは、実装の詳細を素早く確認できるよう独立したページに分割しています。",
  "ts.group.formats": "ファイル形式",
  "ts.group.formatsEn": "FILE FORMATS",
  "ts.group.code": "コードサンプル",
  "ts.group.codeEn": "CODE SAMPLES",
  "ts.gen.title": ".gen ファイル定義",
  "ts.gen.desc":
    "SQLite 3 プロジェクトファイル：全 14 テーブル定義、フィールドの意味、座標ルール、編集履歴ツリー、チャンク分割と undo 機構。読み終えれば .gen を自力で読み書きできるようになります。",
  "ts.gjson.title": ".gjson ファイル定義",
  "ts.gjson.desc":
    "JSON 交換フォーマット：トップレベルフィールド、各オブジェクト定義、.gen との忠実度の差異。読み終えれば .gjson を解析できるようになります。",
  "ts.dna.title": ".dna 変換スキーム",
  "ts.dna.desc":
    "SnapGene .dna バイナリパケットの構造、flags ビット、フィールドマッピング、0-based↔1-based 座標変換。",
  "ts.rust.title": "Rust 読み込みサンプル",
  "ts.rust.desc":
    "rusqlite で .gen を、serde_json で .gjson を読む最小限の実行可能な実装。依存関係と期待される出力を含みます。",
  "ts.readDoc": "ドキュメントを読む",
  "ts.feedback":
    "ドキュメントに必要な内容が見当たらない場合は、GitHub または Gitee で Issue を提出してください。補完していきます。",

  // Projects ページ
  "pr.eyebrow": "Ecosystem Projects",
  "pr.title": "GenePad エコシステムプロジェクト",
  "pr.lead":
    "分子クローンンツールチェーンをめぐり、GenePad 組織は GitHub 上でいくつかの独立したプロジェクトを保守しています：トレーサビリティのあるプラスミド汎用エレメントライブラリから、組織特異的コドン統計パイプラインまで。各プロジェクトはメインプログラムから独立しており、単独で取り出して利用できます。研究者・開発者の重複作業を減らすことを目指しています。",
  "pr.specs": "データ仕様",
  "pr.cf.head": "プラスミド汎用エレメントライブラリ",
  "pr.cf.title": "プラスミド構築用汎用エレメント配列ライブラリ",
  "pr.cf.desc":
    "NCBI のソース参照プラスミドから 1 件ずつ整理・照合した、再利用可能なエレメント配列ライブラリ。各エレメントには NCBI アクセッション番号と参照プラスミド名を記録しており、配列の由来を 1 件ずつ遡れます。プラスミドソフトにインポートすれば、マップを開くだけでこれらの一般的なエレメントを自動認識します。",
  "pr.cf.catsTitle": "20 カテゴリをカバー",
  "pr.cf.usage":
    "genbank/ 以下の .gb を SnapGene や Benchling の common features ライブラリにインポートすれば、任意のプラスミドマップを開いたときにこれらのエレメントが自動認識されます。fasta/ 以下の .fa は BLAST 比較にそのまま使えます。",
  "pr.ca.head": "組織特異的コドンアトラス",
  "pr.ca.title": "ヒト組織特異的コドンアトラス",
  "pr.ca.desc":
    "独立実装の統計パイプライン：公開されている GTEx 遺伝子発現と GENCODE アノテーションを上流に、組織の発現量で重み付けし、ヒトの各組織のコドン使用表を再構築します。コドン最適化と異種発現設計のための、再現可能で検証可能な組織特異的リファレンスを提供し、ライセンス制約のあるサードパーティ製テーブルへの依存を回避します。",
  "pr.ca.metricsTitle": "出力指標",
  "pr.ca.usage":
    "python scripts/build_atlas.py が GTEx / GENCODE の入力から全組織テーブルを再構築し、check_release.py と package_release.py がリリース前の検証とパッケージングを担当します。",
  "pr.org.text":
    "上記のプロジェクトは GenePad メインプロジェクトから孵化し、同じ基準で保守されています。ソースコードと進捗は GitHub 組織のページをご覧ください。Issue でのフィードバックを歓迎します。",

  // Library ページ（遺伝子ファイルライブラリ紹介ページ）
  "lib.eyebrow": "Gene File Library",
  "lib.title": (
    <>
      プラスミドファイルの
      <br />
      統一検索と管理
    </>
  ),
  "lib.lead":
    "研究が積み重なるにつれ、プラスミドファイルは複数のフォルダ・ディスク・デバイスに散在しがちで、ファイル名とプラスミドの属性の間に対応関係がありません。遺伝子ファイルライブラリは、散在するプラスミドファイルを検索可能な統一インデックスに取り込み、プロジェクト別・保存パス別・AI 生成タグ別の 3 つの管理方法に対応。具体的な名前やパスを覚えなくても、1〜2 個の属性特徴だけで AI が検索・特定します。",
  "lib.hero.shot": "LIBRARY — 331 件のプラスミドをインデックス済み、右側はライブラリ全体のタグクラウド",

  "lib.pain.head": "よくある課題",
  "lib.pain.headEn": "COMMON ISSUES",
  "lib.pain.title": "プラスミドファイル管理でよくある困りごと",
  "lib.pain.1.name": "規模の継続的な増加",
  "lib.pain.1.desc":
    "研究の進行とともに、プラスミドは数十件から数百件へと積み重なり、フォルダの階層は日ごとに深くなります。ディレクトリ構造だけでは目的のファイルを特定できません。",
  "lib.pain.2.name": "保存場所を思い出せない",
  "lib.pain.2.desc":
    "同じプラスミドが異なるフォルダ・ディスク・デバイスに保存されていることがあります。必要なときに、その正確な場所を特定できないことが少なくありません。",
  "lib.pain.3.name": "ファイル名と属性の脱節",
  "lib.pain.3.desc":
    "検索の意図は通常、属性の記述（「ある遺伝子を持つベクター」など）で表されますが、pLH-sgRNA1-Muc4-11 のようなファイル名はプラスミドの性質を反映せず、両者の間に対応関係がありません。",

  "lib.ways.head": "3 つの管理方法",
  "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
  "lib.ways.title": "プロジェクト・パス・タグ——3 つの整理の軸",
  "lib.ways.1.name": "プロジェクトで分類",
  "lib.ways.1.desc":
    "新規プロジェクトを作成し、プラスミドをドラッグして分類。1 つの研究に 1 つのプロジェクトが対応します。プロジェクトを開けば、その研究の全プラスミドを確認できます。",
  "lib.ways.2.name": "保存パスで閲覧",
  "lib.ways.2.desc":
    "ファイルを移動・コピーせず、実際の保存場所のままで閲覧。ファイルライブラリはインデックスに過ぎず、元のファイルを変更しません。",
  "lib.ways.3.name": "プラスミドタグで絞り込み",
  "lib.ways.3.desc":
    "AI が各プラスミドのシークエンスとアノテーションを読み取り、lentiviral、sgRNA、ampicillin などの性質タグを自動生成。タグをクリックするだけで関連する全プラスミドを絞り込め、名前ではなく属性で位置付けられます。",

  "lib.tags.head": "AI タグ",
  "lib.tags.headEn": "AI TAGS",
  "lib.tags.title": "AI が性質タグを自動生成",
  "lib.tags.desc":
    "AI を設定すると、プラスミドのスキャン時やオープン時に、プログラムが自動でシークエンスとエレメントを読み取り、各ファイルに性質タグのセットを生成します。テーブルヘッダーからの一括更新にも対応——欠けているタグだけを補完するか、全部を再生成するかを選べます。右側のタグクラウドはライブラリ全体の属性分布を示し、いくつかの属性を組み合わせた絞り込みで目的のファイルを特定できます。",
  "lib.tags.shot": "テーブルヘッダーから一括更新 — タグなし項目だけ補完、または全部を再生成",

  "lib.ai.head": "AI アシスタント",
  "lib.ai.headEn": "AI ASSISTANT",
  "lib.ai.title": "AI アシスタントに直接検索させる",
  "lib.ai.desc":
    "AI アシスタントに直接指示できます。たとえば「Type I CRISPR プラスミドを探して」と頼むと、アシスタントはライブラリ全体を検索し、候補を挙げながら各プラスミドの性質と推奨用途を説明します。「プラスミドライブラリを整理して」と頼めば、アシスタントはまずライブラリの現状を分析してから、整理案を提示します。",
  "lib.ai.shot1": "AI ASSISTANT —「プラスミドライブラリを整理して」：まず現状を分析し、次に整理案を提示",
  "lib.ai.shot2": "AI ASSISTANT —「Type I CRISPR プラスミドを探して」：候補と性質を一覧で提示",

  "lib.setup.head": "はじめに",
  "lib.setup.headEn": "GETTING STARTED",
  "lib.setup.title": "初期設定は数分で完了",
  "lib.setup.lead":
    "遺伝子ファイルライブラリは GenePad のツールボックスにあります。開いたら、以下の手順で設定を進めてください：",
  "lib.setup.1.name": "設定の入口を開く",
  "lib.setup.1.desc":
    "遺伝子ファイルライブラリを初めて開いたときは、上部バナーの「Configure AI」をクリック。以降はいつでも右上の AI アイコンから設定に入れます。",
  "lib.setup.1.shot": "初回起動 — 上部バナーの「Configure AI」をクリック",
  "lib.setup.2.name": "DeepSeek プロファイルを新規作成",
  "lib.setup.2.desc":
    "「New profile」をクリックして名前を付けます。プロバイダーで DeepSeek を、モデルで deepseek-v4-flash を選択し、次に API Key の横の「Get」をクリックします。",
  "lib.setup.2.shot": "AI Settings — プロファイルを新規作成し、DeepSeek を選択して「Get」をクリック",
  "lib.setup.3.name": "DeepSeek API キーを取得",
  "lib.setup.3.desc":
    "ブラウザで DeepSeek オープンプラットフォームが開きます。アカウント登録と残高チャージの後、「Create API key」をクリック。キーは 1 度しか表示されないため、作成後すぐにコピーしてください。",
  "lib.setup.3.shot": "DEEPSEEK オープンプラットフォーム — API キーを作成してすぐにコピー",
  "lib.setup.4.name": "キーを貼り付けて保存",
  "lib.setup.4.desc":
    "ソフトに戻ってキーを貼り付け、「Test connection」をクリック。「接続成功」と表示されることを確認したら「Save current profile」をクリック。これで AI 機能の設定は完了です。",
  "lib.setup.4.shot": "接続テスト成功 — Save current profile をクリック",
  "lib.setup.5.name": "監視フォルダを設定",
  "lib.setup.5.desc":
    "「Watch folders」をクリックし、プラスミドを保存しているフォルダを追加します。以降、起動のたびに自動スキャン：新規プラスミドは自動でライブラリに入り、削除されたものは自動で取り除かれます。手動のメンテナンスは不要です。",
  "lib.setup.5.shot": "監視フォルダ — 追加は自動取り込み、削除は自動除去、自動で同期",
  "lib.setup.note":
    "AI を設定すると、ライブラリに入ったプラスミドには自動でタグが生成されます。設定しなくてもライブラリへの取り込みには影響せず、タグと AI アシスタントだけが使用できません。",

  "lib.daily.head": "日常のワークフロー",
  "lib.daily.headEn": "DAILY WORKFLOW",
  "lib.daily.title": "検索結果をそのまま開いて使える",
  "lib.daily.1.name": "いつものツールで開く",
  "lib.daily.1.desc":
    "任意のプラスミドを右クリック →「Open with」で、ファイルを SnapGene（マップ）や VS Code（シークエンス）などのツールに渡せます。既存のワークフローと統合できます。",
  "lib.daily.2.name": "タグはカスタマイズ可能",
  "lib.daily.2.desc":
    "詳細パネルでタグはいつでも編集できます：AI が生成した誤ったタグを削除し、「検証済み」などのカスタムタグを追加できます。",
  "lib.daily.shot":
    "右クリックメニュー — 開く、所在フォルダを開く、SnapGene / VS Code に渡す。右側の詳細パネルでタグの追加・削除",

  "lib.final.title": "遺伝子ファイルライブラリは GenePad の内蔵モジュールであり、独立したソフトではありません",
  "lib.final.desc":
    "遺伝子ファイルライブラリは GenePad ゲンマップエディタに内蔵されています。GenePad をダウンロード・インストール／アップグレードすれば、ツールボックスから利用できます。現在は無料パブリックベータ中で、全プラットフォームをカバーしています。",
  "lib.final.cta": "ホームへ戻る",
  "lib.final.cta2": "今すぐダウンロード",
  "lib.top.hint": "下部のダウンロード欄へジャンプ",

  // ホームページの NGS データビュー紹介セクション
  "np.lead":
    "fastq.gz / fastq / fq.gz / fq シークエンスファイルを直接開けます。右クリックまたはドラッグ＆ドロップで、ペアエンドファイルは自動でペアリング・結合。塩基ごとのシークエンス品質の確認、アミノ酸検索で可変領域を位置付け、アンカーを設定して一括トリミングし、ワンクリックでライブラリ豊度レポートを生成します。",
  "np.c1": "fastq.gz · fq.gz 解凍不要",
  "np.c2": "ペアエンド自動ペアリング・結合",
  "np.c3": "塩基ごとのシークエンス品質",
  "np.c4": "アンカートリミング + 豊度レポート",
  "np.cta": "詳しく見る",
  "np.safe": "GenePad 内蔵機能 · 無料パブリックベータ · 全プラットフォーム対応",

  // NGS データビューページ
  "ngs.eyebrow": "NGS Data Viewer",
  "ngs.title": (
    <>
      次世代シークエンス（NGS）データを直接開き、
      <br />
      リード単位で閲覧・検索・集計
    </>
  ),
  "ngs.lead":
    "GenePad は fastq.gz / fastq / fq.gz / fq シークエンスファイルを直接開けます。エクスプローラーで右クリックから「Open with」で GenePad を選ぶか、ファイルをプログラムのウィンドウに直接ドラッグします。ペアエンドシークエンスは R1・R2 の 2 ファイルを一緒にドラッグすれば、ペア関係を自動認識します。開いた後は reads を 1 件ずつ閲覧し、各塩基のシークエンス品質とペア結合の結果を確認できます。アミノ酸フラグメントで検索して目的の可変領域を位置付け、トリミングアンカーを設定すればファイル全体を一括トリミングし、最後にワンクリックでライブラリ豊度レポートを生成します。",
  "ngs.hero.shot":
    "FASTQ VIEWER — ペアエンド reads を自動結合、塩基ごとに品質で着色、右側はファイル統計",

  "ngs.open.head": "シークエンスファイルを開く",
  "ngs.open.headEn": "OPENING FASTQ FILES",
  "ngs.open.title": "右クリック・ドラッグで開ける。コマンドライン不要",
  "ngs.open.lead":
    "fastq.gz、fastq、fq.gz、fq の 4 つの拡張子に対応し、gzip 圧縮ファイルは事前解凍なしで開けます。GenePad をインストール／アップグレードしたら、2 つの方法のどちらでも：",
  "ngs.open.1.name": "右クリック「Open with」",
  "ngs.open.1.desc":
    "エクスプローラーでシークエンスファイルを右クリック →「Open with」：サブメニューから直接 GenePad を選ぶか、「別のアプリを選択」の一覧で GenePad を選んで既定に設定——以後、シークエンスファイルをダブルクリックするだけで直接開けます。",
  "ngs.open.2.name": "ウィンドウへドラッグ",
  "ngs.open.2.desc":
    "1 つまたは複数のシークエンスファイルを GenePad ウィンドウに直接ドラッグします。ウェルカムページとワーク画面のどちらでもドラッグ＆ドロップでのオープンに対応しています。",
  "ngs.open.1.shot": "右クリックメニュー —「Open with」→ GenePad",
  "ngs.open.1.shot2": "別のアプリを選択 — システムの一覧で GenePad を選び、既定に設定できます",
  "ngs.open.2.shot": "ウィンドウへドラッグ — 複数のシークエンスファイルをまとめてドラッグすれば開けます",

  "ngs.pair.head": "ペアエンド",
  "ngs.pair.headEn": "PAIRED-END",
  "ngs.pair.title": "ペアファイルを自動認識・自動ペアリング",
  "ngs.pair.desc":
    "R1・R2 の 2 ファイルを一緒にウィンドウへドラッグすると、先頭 read の ID に基づいてペア関係を自動認識します。複数ペアを一度にドラッグすると確認ダイアログが表示され、グループを手動で調整するか「Auto-pair」をクリックしてワンクリックでペアリングできます。確認後、各ペアは 1 つのペアエンドデータとして開かれます——属性パネルには Paired-end と表示され、ツールバーの Swap R1/R2 でワンクリック交換できます。",
  "ngs.pair.shot": "PAIR NGS FILES — 先頭 read の ID で自動ペアリング、手動調整も可能",

  "ngs.reads.head": "リード単位の閲覧",
  "ngs.reads.headEn": "READS & QUALITY",
  "ngs.reads.title": "各 read の品質と結合結果がひと目でわかる",
  "ngs.reads.lead":
    "メイン画面はシークエンスで得られた各 read を上から下へ一覧表示し、右側の属性パネルにファイル全体のシークエンス統計をまとめます：",
  "ngs.reads.1.name": "ペアエンド自動結合",
  "ngs.reads.1.desc":
    "ペアエンドデータは 1 件ずつ自動で結合（merge）され、各 read にオーバーラップ長と一致率（例：Overlap 135bp · 99% identity）を表示。結合結果がひと目で判断できます。",
  "ngs.reads.2.name": "塩基ごとのシークエンス品質",
  "ngs.reads.2.desc":
    "各塩基は Phred 品質で着色：≥30 は緑、20–29 はオレンジ、<20 は赤。低品質領域が品質バーの中で直感的に見え、数値を 1 つずつ確認する必要がありません。",
  "ngs.reads.3.name": "ファイル統計",
  "ngs.reads.3.desc":
    "属性パネルには reads 数、塩基数、read 長、平均品質、品質分布、GC 含量、エンコーディング形式をまとめ、Overall / R1 / R2 のグループ表示に対応。超大容量ファイルでもプレビュー部分だけをロードし、統計と解析はファイル全体をカバーします。",
  "ngs.reads.shot":
    "READS & QUALITY — 上から下へリード単位で閲覧：ペア結合、塩基ごとの品質バー、右側のファイル統計",

  "ngs.aa.head": "アミノ酸検索",
  "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
  "ngs.aa.title": "タンパク質フラグメントで関心のある可変領域を位置付け",
  "ngs.aa.desc":
    "下部の検索ボックスを AA モードに切り替え、アミノ酸配列（例：MATNNQ）を入力すると、プログラムは結合後の read をタンパク質に翻訳して 1 件ずつ比較し、ヒットしたペプチドを配列中に直接枠表示します。ライブラリシークエンスは両側の配列が保存的で中央が多変：既知の保存的タンパク質断片をクエリにすれば、数千件の reads からそれぞれの目的の可変領域を素早く位置付けられます。",
  "ngs.aa.shot": "AA SEARCH — アミノ酸フラグメントを入力すると、ヒットしたペプチドが翻訳結果の中でハイライト枠表示される",

  "ngs.trim.head": "アンカートリミング",
  "ngs.trim.headEn": "TRIM ANCHORS",
  "ngs.trim.title": "トリミングアンカーを設定し、目的区間を精密に切り出し",
  "ngs.trim.desc":
    "目的区間の両側の保存的配列を左右のトリミングアンカーに設定し、Trim をクリックすればシークエンスファイル全体を一括トリミングし、2 つのアンカー間の可変領域配列だけを残します。属性パネルは通過率、およびアンカー未命中・断片が短すぎるなど除外された件数をリアルタイムに表示します。トリミング後の reads はワンクリックでエクスポートでき（Export processed reads）、後続の解析やデータ提出に使えます。",
  "ngs.trim.shot": "TRIM ANCHORS — 左右のアンカーが目的ウィンドウを枠取り、通過率をリアルタイム表示",

  "ngs.report.head": "ライブラリ豊度解析",
  "ngs.report.headEn": "LIBRARY ANALYSIS",
  "ngs.report.title": "ファイル全体をワンクリックで豊度レポート化",
  "ngs.report.desc":
    "Sequence analysis をクリックするとトリミング結果の統計を実行：既定ではファイル全体を直接解析し（数千万件の reads をすべてメモリにロードする必要はありません）、各ユニーク配列の出現回数と頻度を集計し、両端のアンカーを保持するか除去するかを選択できます。解析完了後、図入りのレポートが生成されます——Top 配列のヒストグラム（DNA / AA の 2 種類の集計）と各配列の長さ・カウント・頻度・+1 読み枠翻訳に加え、完全なテーブルは CSV としてエクスポートされ、Excel でそのまま開けます。簡単なライブラリ豊度レポートはこれで完成です。",
  "ngs.report.shot1": "SEQUENCE ANALYSIS — 既定でファイル全体を解析、アンカーの保持 / 除去を選択可",
  "ngs.report.shot2": "ANALYSIS REPORT — Top 配列ヒストグラムと完全な豊度テーブル（CSV）",

  "ngs.video.head": "動画チュートリアル",
  "ngs.video.headEn": "VIDEO TUTORIAL",
  "ngs.video.lead":
    "文章と画像だけでは足りない方へ。ここには完全な操作デモがあります：シークエンスファイルのオープン、ペアエンドのペアリングから、アンカートリミングと豊度レポートの生成まで、全工程を実際のデータで順を追ってたどるもので、ページ内で直接再生できます。",
  "ngs.video.caption": "VIDEO TUTORIAL — フル手順デモ：開く → ペアリング → 閲覧 → 検索 → トリミング → 豊度レポート",

  "ngs.final.title": "NGS データビューは GenePad の内蔵機能であり、独立したソフトではありません",
  "ngs.final.desc":
    "NGS データビューは GenePad ゲンマップエディタに内蔵されています。ダウンロード・インストール／アップグレード後、すぐにシークエンスファイルを直接開け、マップ編集や Sanger トレース比較などの機能と同じプログラム内で連携して使えます。現在は無料パブリックベータ中で、全プラットフォームをカバーしています。",
  "ngs.final.cta": "ホームへ戻る",
  "ngs.final.cta2": "今すぐダウンロード",
  "ngs.top.hint": "下部のダウンロード欄へジャンプ",

  // Tutorial ページ（チュートリアルセンター：各機能の使い方を随時収録）
  "tut.eyebrow": "Tutorials",
  "tut.title": (
    <>
      設定から日常の解析まで、
      <br />
      図解でステップごとに解説
    </>
  ),
  "tut.lead":
    "ここには GenePad の図解チュートリアルを集めており、新しい篇を順次追加していきます：DeepSeek を接続して AI 機能を解放する方法、遺伝子ファイルライブラリで数百件のプラスミドを管理する方法、fastq.gz からライブラリ豊度レポートまでの NGS 解析など。各ステップには実際の画面のスクリーンショットが付き、順番に操作するだけで進められます。",
  "tut.toc.hint": "カードをクリックして対応するチュートリアルへ",
  "tut.card.view": "チュートリアルを見る",
  "tut.prev": "前のチュートリアル",
  "tut.next": "次のチュートリアル",
  "tut.backTo": "チュートリアル目次へ戻る",
  "tut.toc.ai.name": "AI を設定する（DeepSeek）",
  "tut.toc.ai.desc":
    "設定を開き、プロファイルを新規作成し、API キーを取得・保存——5 ステップで DeepSeek を接続し、AI アシスタントとプラスミド自動タグを解放します。",
  "tut.toc.ai.en": "SET UP AI",
  "tut.toc.lib.name": "遺伝子ファイルライブラリ",
  "tut.toc.lib.desc":
    "監視フォルダで自動取り込み、プロジェクト・パス・タグの 3 つの方法で検索し、AI アシスタントが属性でプラスミドを特定します。",
  "tut.toc.lib.en": "FILE LIBRARY",
  "tut.toc.ngs.name": "NGS ファイル解析",
  "tut.toc.ngs.desc":
    "fastq.gz をドラッグするだけで開始：ペアエンドのペアリング、塩基ごとの品質検査、アミノ酸検索、アンカートリミングと豊度レポート。",
  "tut.toc.ngs.en": "NGS ANALYSIS",
  "tut.toc.lang.name": "任意の言語を設定",
  "tut.toc.lang.desc":
    "Settings → Language → AI Translate：目的の言語を入力すると自動で言語パックを生成し、UI 全体をフランス語・ロシア語などの任意の言語に切り替えます。",
  "tut.toc.lang.en": "ANY LANGUAGE",

  // チュートリアルカテゴリ（目次ページの区分 + サイドナビ）
  "tut.toc.langpack.name": "UI 言語の設定",
  "tut.toc.langpack.desc":
    "設定 → Language を開く：内蔵の中国語・英語はワンクリックで切り替え、公式言語パックをインポートすればドイツ語・ロシア語・日本語・韓国語・フランス語の画面になります。",
  "tut.toc.langpack.en": "UI LANGUAGE",
  "tut.cat.gs.name": "はじめに",
  "tut.cat.gs.en": "GETTING STARTED",
  "tut.cat.gs.desc": "初心者は順番に進めるのがおすすめ：まず AI を接続し、次にプラスミドファイルを管理します。",
  "tut.cat.analysis.name": "データ解析",
  "tut.cat.analysis.en": "DATA ANALYSIS",
  "tut.cat.analysis.desc": "シークエンスデータの閲覧・検索・定量解析。",

  // チュートリアル 1：AI を設定
  "tut.ai.head": "チュートリアル 1 · AI を設定する",
  "tut.ai.headEn": "TUTORIAL 1 · SET UP DEEPSEEK",
  "tut.ai.title": "5 ステップで DeepSeek を接続し、AI アシスタントと自動タグを解放",
  "tut.ai.lead":
    "AI アシスタントとプラスミド自動タグは大規模言語モデルによって駆動され、DeepSeek の使用をおすすめします。以下の 5 ステップを完了すれば、自然言語でシークエンスやアノテーションを操作でき、プラスミドも取り込み時やオープン時に自動で性質タグが生成されます。",
  "tut.ai.1.name": "設定を開く",
  "tut.ai.1.desc": "GenePad を起動し、ウェルカムページ右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.ai.1.shot": "ウェルカムページ — 右上の歯車アイコンをクリック",
  "tut.ai.2.name": "AI Settings に入り、設定を新規作成",
  "tut.ai.2.desc": "設定ウィンドウの左側で「AI Settings」を選び、「New config」をクリックして新しい AI 設定を作成します。",
  "tut.ai.2.shot": "AI Settings — AI Settings を選び、New config をクリック",
  "tut.ai.3.name": "設定を入力",
  "tut.ai.3.desc":
    "設定に名前を付け、プロバイダーで DeepSeek を、モデルで deepseek-v4-flash を選択し、API URL はデフォルトのままにします。次に API Key の横の「Get」をクリックすると、ブラウザで DeepSeek オープンプラットフォームが開きます。",
  "tut.ai.3.shot": "名前とモデルを入力 — API Key の横の「Get」をクリック",
  "tut.ai.4.name": "DeepSeek API キーを取得",
  "tut.ai.4.desc":
    "DeepSeek オープンプラットフォームでアカウント登録し、残高をチャージして「Create API key」をクリック、名前を付けて確認します。キーは 1 度しか表示されないため、すぐにコピーしてください。",
  "tut.ai.5.name": "キーを貼り付けて保存",
  "tut.ai.5.desc":
    "GenePad に戻ってキーを貼り付け、「Test connection」をクリック。接続成功の表示を確認したら、「Save current config」をクリックして保存します。これで AI 設定は完了です。",
  "tut.ai.note":
    "1 回設定すれば長く使え、キーはローカルにのみ保存されます。以後、ウェルカムページとワーク画面の AI アイコンから直接対話でき、開いたり取り込んだりしたプラスミドにも自動で性質タグが生成されます。",

  // チュートリアル 2：遺伝子ファイルライブラリ
  "tut.lib.head": "チュートリアル 2 · 遺伝子ファイルライブラリ",
  "tut.lib.headEn": "TUTORIAL 2 · GENE FILE LIBRARY",
  "tut.lib.title": "数百件のプラスミドを、検索可能なライブラリとして管理する",
  "tut.lib.lead":
    "遺伝子ファイルライブラリはツールボックスにあります：ファイルを移動・コピーすることなく、各所に散在するプラスミドの統一インデックスを作るだけです。以下のステップは、自動取り込みから始まり、属性の一文で目的のプラスミドを特定するところまでをカバーします。",
  "tut.lib.1.name": "監視フォルダを設定し、プラスミドを自動取り込み",
  "tut.lib.1.desc":
    "遺伝子ファイルライブラリを開く →「Watch folders」→ プラスミドを保存しているフォルダを追加。以後、起動のたびに自動スキャン：新規プラスミドは自動でライブラリに入り、削除されたものは自動で取り除かれます。手動のメンテナンスは不要です。",
  "tut.lib.2.name": "プロジェクト・パス・タグで検索",
  "tut.lib.2.desc":
    "新規プロジェクトを作成してプラスミドをドラッグすれば分類完了。または保存パスのままで閲覧。AI を設定すると、各プラスミドに性質タグのセットが付き、タグをクリックするだけで関連する全プラスミドを絞り込めます。",
  "tut.lib.3.name": "AI が性質タグを自動生成",
  "tut.lib.3.desc":
    "チュートリアル 1 の設定を完了していれば、プラスミドのスキャン時やオープン時に lentiviral、sgRNA、ampicillin などのタグが自動生成されます。テーブルヘッダーからの一括更新も可能——欠けているタグだけを補完するか、全部を再生成します。",
  "tut.lib.4.name": "AI アシスタントが属性で特定",
  "tut.lib.4.desc":
    "AI アシスタントに直接ニーズを伝えます。たとえば「Type I CRISPR プラスミドを探して」：アシスタントはライブラリ全体を検索し、候補を挙げながら各プラスミドの性質と推奨用途を説明します。",
  "tut.lib.5.name": "検索結果をそのまま使用",
  "tut.lib.5.desc":
    "任意のプラスミドを右クリック →「Open with」で、SnapGene（マップ）や VS Code（シークエンス）などのツールに渡せます。詳細パネルではタグの追加・削除や、「検証済み」などのカスタムタグの追加もできます。",
  "tut.lib.note":
    "ファイルライブラリはインデックスに過ぎず、元のファイルは変更しません。AI を設定しなくても取り込みと閲覧には影響せず、自動タグと AI 検索だけが使えません。",

  // チュートリアル 3：NGS ファイル解析
  "tut.ngs.head": "チュートリアル 3 · NGS ファイル解析",
  "tut.ngs.headEn": "TUTORIAL 3 · NGS ANALYSIS",
  "tut.ngs.title": "fastq.gz からライブラリ豊度レポートまで",
  "tut.ngs.lead":
    "コマンドライン不要。シークエンスファイルをウィンドウにドラッグするだけで開始できます。以下の 6 ステップで、オープン・ペアリング・品質検査・検索・トリミング・豊度解析の完全なフローをカバーし、文末には完全な操作動画を付けています。",
  "tut.ngs.1.name": "シークエンスファイルを開く",
  "tut.ngs.1.desc":
    "1 つまたは複数のシークエンスファイルを GenePad ウィンドウに直接ドラッグ。またはエクスプローラーで右クリックから「Open with」で GenePad を選びます。fastq.gz、fastq、fq.gz、fq に対応し、gzip 圧縮は解凍不要です。",
  "tut.ngs.2.name": "ペアエンドファイルを自動ペアリング",
  "tut.ngs.2.desc":
    "R1・R2 の 2 ファイルを一緒にドラッグすると、先頭 read の ID に基づいてペアを自動認識。複数ペアを一度にドラッグすると確認ダイアログが表示され、「Auto-pair」でワンクリックペアリングできます。確認後、各ペアは 1 つのペアエンドデータとして開かれます。",
  "tut.ngs.3.name": "リード単位の閲覧と品質検査",
  "tut.ngs.3.desc":
    "メイン画面は reads を 1 件ずつ一覧表示：各塩基は Phred 品質で着色され、ペアエンドデータは自動で結合され、オーバーラップ長と一致率を表示します。右側の属性パネルには reads 数や GC 含量などのファイル統計をまとめます。",
  "tut.ngs.4.name": "アミノ酸検索で可変領域を特定",
  "tut.ngs.4.desc":
    "下部の検索ボックスを AA モードに切り替え、既知の保存的タンパク質断片（例：MATNNQ）を入力：プログラムは結合後の read をタンパク質に翻訳して 1 件ずつ比較し、ヒットしたペプチドを直接枠表示。数千件の reads から目的の可変領域を素早く特定できます。",
  "tut.ngs.5.name": "アンカーを設定して一括トリミング",
  "tut.ngs.5.desc":
    "目的区間の両側の保存的配列を左右のトリミングアンカーに設定し、Trim をクリックすればファイル全体を一括トリミングし、2 つのアンカー間の可変領域だけを残します。属性パネルは通過率をリアルタイムに表示し、トリミング結果はワンクリックでエクスポートできます。",
  "tut.ngs.6.name": "ライブラリ豊度レポートを生成",
  "tut.ngs.6.desc":
    "Sequence analysis をクリック：ファイル全体に含まれる各ユニーク配列の出現回数と頻度を集計し、Top 配列のヒストグラムと各配列の明細を生成、完全なテーブルは CSV としてエクスポートされ、Excel でそのまま開けます。簡単なライブラリ豊度レポートはこれで完成です。",

  // チュートリアル 4：任意の言語を設定
  "tut.lang.head": "チュートリアル 4 · 任意の言語を設定",
  "tut.lang.headEn": "TUTORIAL 4 · ANY LANGUAGE",
  "tut.lang.title": "AI 翻訳で UI を任意の言語に切り替える",
  "tut.lang.lead":
    "GenePad は中国語と英語の UI を内蔵していますが、他の言語は公式サポートを待つ必要がありません：設定 → Language を開き、「AI Translate」をクリックし、目的の言語を入力するだけで自動で言語パックを生成して適用します。先にチュートリアル 1 で AI 設定を完了してください。",
  "tut.lang.1.name": "設定を開く",
  "tut.lang.1.desc": "チュートリアル 1 と同じ：GenePad を起動し、ウェルカムページ右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.lang.2.name": "Language 設定に入り、AI Translate をクリック",
  "tut.lang.2.desc":
    "設定の左側で「Language」を選び、「AI Translate」をクリックします。このページでは言語ファイルの手動インポート／エクスポートも可能です。",
  "tut.lang.2.shot": "言語設定 — Language を選び、AI Translate をクリック",
  "tut.lang.3.name": "目的の言語を入力して翻訳を開始",
  "tut.lang.3.desc":
    "言語の名前とコード（例：français と fr）を入力し、「Translate」をクリック：プログラムは設定済みの AI で内蔵言語ファイルを翻訳します——長文は自動で分割し、失敗したセグメントは自動で再試行し、完了後に自動でインポートして適用します。",
  "tut.lang.3.shot": "言語の名前とコードを入力 — Translate をクリック",
  "tut.lang.4.name": "UI 全体が目的の言語に切り替わる",
  "tut.lang.4.desc":
    "翻訳が完了すると、UI は即座に全体が切り替わります。フランス語の例：すべてのメニュー・設定・メッセージがローカライズされています。",
  "tut.lang.4.shot": "UI 全体がフランス語に切り替わった様子",
  "tut.lang.5.name": "同じ方法でさらに言語を追加",
  "tut.lang.5.desc":
    "同じ方法でロシア語、スペイン語など任意の言語をさらに生成できます。インポートした言語パックは Language ページで選択・管理・削除できます。",
  "tut.lang.5.shot": "同じ方法で追加したロシア語 UI",
  "tut.lang.note":
    "AI 翻訳は内蔵の中国語言語ファイルをソースにします。個々の語句が不正確な場合は、言語ファイルをエクスポートして手動で修正してから再インポートしてください。",

  // チュートリアル 5：UI 言語の設定（内蔵言語の切り替え + 公式言語パックのインポート）
  "tut.langpack.head": "チュートリアル 5 · UI 言語の設定",
  "tut.langpack.headEn": "TUTORIAL 5 · UI LANGUAGE",
  "tut.langpack.title": "2 ステップで使い慣れた言語へ",
  "tut.langpack.lead":
    "GenePad には中国語と英語の画面が内蔵されています。ドイツ語・ロシア語・日本語・韓国語・フランス語は公式言語パックで提供 — ダウンロードして設定でインポートするだけで、追加設定は不要です。AI 翻訳で作成したカスタム言語パックも同じ手順で使えます。",
  "tut.langpack.1.name": "設定を開く",
  "tut.langpack.1.desc": "GenePad を起動し、ウェルカム画面右上の歯車アイコンをクリックして設定ウィンドウを開きます。",
  "tut.langpack.1.shot": "ウェルカム画面 — 右上の歯車アイコンをクリック",
  "tut.langpack.2.name": "Language 設定を開く",
  "tut.langpack.2.desc":
    "設定ウィンドウの左サイドバーで「Language」を選択：English または 中文 をクリックすると内蔵言語を切り替えられます。インポートした言語パックも同じリストに表示されます。",
  "tut.langpack.2.shot": "Language 設定 — 言語をクリックすると即切り替え。下部のボタンで言語ファイルのインポート / エクスポート",
  "tut.langpack.3.name": "言語パックをダウンロードしてインポート",
  "tut.langpack.3.desc":
    "このページの下から必要な言語の .json パックをダウンロードし、「Import Language File」をクリックしてダウンロードしたファイルを選択します。インポートが完了するとリストに言語が追加され — クリックすれば画面全体が切り替わり、右側のゴミ箱アイコンで削除できます。",
  "tut.langpack.3.shot": "インポート完了 — リストに言語が追加され、クリックで切り替え",
  "tut.langpack.4.name": "画面全体が切り替わる",
  "tut.langpack.4.desc":
    "言語を選ぶと画面全体が即座に切り替わります：すべてのメニュー・設定・メッセージがローカライズされます。公式 5 言語パックの実際の画面：",
  "tut.langpack.4.shot1": "フランス語画面",
  "tut.langpack.4.shot2": "韓国語画面",
  "tut.langpack.4.shot3": "ロシア語画面",
  "tut.langpack.4.shot4": "ドイツ語画面",
  "tut.langpack.4.shot5": "日本語画面",
  "tut.langpack.dl.title": "公式言語パックのダウンロード（.json）",
  "tut.langpack.dl.hint": "GenePad 0.7.x に対応。解凍は不要 — ステップ 3 の要領でそのままインポートしてください。",
  "tut.langpack.dl.btn": "ダウンロード",
  "tut.langpack.note":
    "言語パックは画面テキストのみを含み、配列やファイルデータは含みません。公式パックはバージョンごとに更新されるため、新しいファイルを再インポートすれば最新になります。他の言語が必要な場合は、チュートリアル 4 で AI 翻訳により任意の言語パックを生成できます。",

  "tut.final.title": "チュートリアルで扱う機能はすべて GenePad に内蔵されており、独立したソフトではありません",
  "tut.final.desc":
    "GenePad をダウンロード・インストール／アップグレードすれば、チュートリアルの通りに操作できます：AI アシスタント、遺伝子ファイルライブラリ、NGS データビューが同じプログラム内で連携します。現在は無料パブリックベータ中で、全プラットフォームをカバーしています。",
  "tut.final.cta": "ホームへ戻る",
  "tut.final.cta2": "今すぐダウンロード",
  "tut.top.hint": "下部のダウンロード欄へジャンプ",

  // Stats サブページ（リアルタイム統計）
  "st.eyebrow": "Live Stats",
  "st.title": (
    <>
      リアルタイム インストール統計、
      <br />
      次の 1 台はあなたです
    </>
  ),
  "st.lead":
    "以下の数字は、GenePad アプリ内の匿名利用統計から集計されています：各インストールは 1 つのランダム識別子としてのみカウントされ、シークエンス・ファイル・個人情報は一切含まれません。データは報告のたびに自動更新され、GenePad の利用に登録は不要です。",
  "st.k.installs": "累計インストール数",
  "st.k.active30": "直近 30 日のアクティブ",
  "st.k.active7": "直近 7 日のアクティブ",
  "st.k.hours": "累計使用時間",
  "st.k.hoursUnit": "時間",
  "st.chart.title": "週次新規インストール",
  "st.chart.title.daily": "日次新規インストール",
  "st.chart.caption": "WEEKLY NEW INSTALLS — 各インストールの初回起動時刻で集計（月曜〜日曜、UTC）",
  "st.chart.caption.daily": "DAILY NEW INSTALLS — 各インストールの初回起動日で集計（UTC の自然日）",
  "st.chart.note.daily": "最後のバーは本日の集計途中のもので、数値はさらに増えていきます。",
  "st.chart.note.byos": "バー内の色は OS で区分されます。バーのセグメントにホバーすると、各 OS の具体的な数値を確認できます。",
  "st.chart.total": "合計",
  "st.chart.legend.aria": "OS 別の凡例",
  "st.tab.aria": "統計の粒度",
  "st.tab.weekly": "週次",
  "st.tab.daily": "日次",
  "st.os.title": "インストール OS 分布",
  "st.os.other": "その他",
  "st.updated": "データ更新日時",
  "st.note": "集計方法：ランダムなインストール識別子で集約。統計をオフにした場合やアンインストール後はカウントされません。",
  "st.error": "統計データが一時的に取得できません。しばらくしてから再読み込みしてください。",
  "st.cta": "無料ダウンロードで、次のユーザーになりましょう",
};

export default ja;
