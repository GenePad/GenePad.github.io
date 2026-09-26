/* 日本語（jp.genepad.cn）殻ページ head メタデータ：scripts/gen-shells.mjs が本ファイルを
   読み込み、app/en/*.html テンプレートを app/jp/*.html に書き換える。
   pages.*.title は src/lang/ja.tsx の title.* 訳と完全一致させること；
   description は en 殻ページ同名ページの meta description 訳。 */
export default {
  code: "ja",
  dir: "jp",
  host: "jp.genepad.cn",
  htmlLang: "ja-JP",
  ogLocale: "ja_JP",
  boot: {
    tagline: "GENE MAP EDITOR", // #boot 大見出し <small> の短いラベル（大文字英字）
    desc: "日常の分子クローンングのためのクロスプラットフォーム・ゲンマップエディタ。プラスミドマップの閲覧・編集、シークエンスアノテーションの管理、制限酵素部位の解析、Sanger トレースの比較など、クローン設計から結果検証までのワークフロー全体をカバーします。",
    loading: "読み込み中", // ローディング aria-label
  },
  // 11 构建ページの <title> と meta description（og/twitter 描述は description を流用）
  pages: {
    index: {
      title: "GenePad - 軽量クロスプラットフォームのゲンマップエディタ",
      description:
        "GenePad は日常の分子クローンングのための軽量・クロスプラットフォームのゲンマップエディタ：プラスミドマップの閲覧・編集、シークエンスアノテーションの管理、制限酵素部位の解析、Sanger シークエンストレースの比較に対応。GEN、GenBank、FASTA、SnapGene DNA（.dna）、AB1、GJSON をサポートします。",
    },
    "tech-support": {
      title: "開発者向け技術ドキュメント - GenePad",
      description:
        "GenePad 開発者ドキュメントハブ：.gen と .gjson のファイル定義、Rust 読み込みサンプル、SnapGene .dna 変換ガイド。",
    },
    projects: {
      title: "エコシステムプロジェクト - GenePad | プラスミドパーツライブラリとコドンアトラス",
      description:
        "GenePad が保守するエコシステムプロジェクト：一般的なプラスミドパーツの配列ライブラリ（20 カテゴリ 266 パーツ、NCBI に遡可能、MIT ライセンス）と、GTEx/GENCODE から構築したヒト組織特異的コドン使用アトラス（ソースコード公開）——研究者と開発者のためのツール。",
    },
    library: {
      title: "遺伝子ファイルライブラリ - GenePad | プラスミドファイルの検索と管理",
      description:
        "GenePad 内蔵のプラスミドファイルライブラリ：フォルダに散在するプラスミドファイルを検索可能な 1 つのインデックスに集約——プロジェクト別・保存パス別・AI 生成タグ別に整理。DeepSeek を設定すればプラスミドに自動タグ付けされ、AI アシスタントが特徴からプラスミドを探します。ファイル名や場所を覚える必要はありません。",
    },
    ngs: {
      title: "NGS データビューア - GenePad | FASTQ シークエンスデータの閲覧とライブラリ豊度解析",
      description:
        "GenePad 内蔵の NGS データビューア：右クリックの「Open with」やドラッグ＆ドロップで fastq.gz / fastq / fq.gz / fq ファイルを直接オープン。ペアエンドファイルは自動マッチング・自動結合、塩基ごとのシークエンス品質、アミノ酸フラグメント検索で可変領域を特定、トリミングアンカーで一括取得、ワンクリックでライブラリ豊度レポートを作成します。",
    },
    tutorial: {
      title: "チュートリアル - GenePad | AI 設定 · 遺伝子ファイルライブラリ · NGS 解析",
      description:
        "GenePad チュートリアル目次：図解入りステップバイステップガイド——DeepSeek AI の設定、遺伝子ファイルライブラリの整理、NGS データを fastq.gz からライブラリ豊度レポートまで、など。1 チュートリアル 1 ページ、随時更新。",
    },
    "tutorial-ai": {
      title: "AI 設定チュートリアル - GenePad | DeepSeek API キーの取得と保存",
      description:
        "GenePad のステップバイステップチュートリアル：5 ステップで DeepSeek を接続——Settings を開き、プロファイルを作成し、モデルを選び、DeepSeek プラットフォームで API キーを作成・コピーして、貼り付け・接続テスト・保存すれば、AI アシスタントとプラスミド自動タグが解放されます。全ステップを実際のスクリーンショットで図解。",
    },
    "tutorial-library": {
      title: "遺伝子ファイルライブラリチュートリアル - GenePad | プラスミドの取り込み・検索・AI タグ",
      description:
        "GenePad のステップバイステップチュートリアル：監視フォルダを追加すればプラスミドが自動で取り込まれ、プロジェクト・保存パス・AI タグで閲覧し、AI アシスタントでプラスミドを特定、ワンクリックで SnapGene / VS Code にファイルを渡せます。全ステップを実際のスクリーンショットで図解。",
    },
    "tutorial-ngs": {
      title: "NGS 解析チュートリアル - GenePad | fastq.gz の閲覧とライブラリ豊度レポート",
      description:
        "GenePad のステップバイステップチュートリアル：ドラッグ＆ドロップで fastq.gz を開き、ペアエンドを自動ペアリング、塩基ごとの品質を確認、アミノ酸で検索、アンカーでトリミング、ライブラリ豊度レポートを生成——完全な動画ウォークスルー付き。全ステップを実際のスクリーンショットで図解。",
    },
    "tutorial-lang": {
      title: "多言語設定チュートリアル - GenePad | AI 翻訳で言語パックを生成",
      description:
        "GenePad のステップバイステップチュートリアル：Settings → Language → AI Translate を開き、目的の言語（フランス語、ロシア語など）を入力すれば、設定済みの AI が言語パックを生成して UI 全体を切り替えます——長文はセグメントごとに翻訳して自動再試行し、言語パックはエクスポートして手動編集も可能。全ステップを実際のスクリーンショットで図解。",
    },
    "tutorial-langpack": {
      title: "UI言語の設定チュートリアル - GenePad | 内蔵言語と公式言語パック",
      description:
        "GenePad の UI 言語設定チュートリアル：設定 → Language を開いて内蔵の中国語・英語を切り替え、「Import Language File」から公式言語パック（ドイツ語・ロシア語・日本語・韓国語・フランス語）をインポートすれば画面全体が即座に切り替わります。追加設定は不要。実際のスクリーンショット付きのステップ解説、5 つの公式パックをすべてダウンロード可能。",
    },
    stats: {
      title: "リアルタイム統計 - GenePad | 公開利用統計",
      description:
        "GenePad のリアルタイム利用統計：累計インストール数、直近 30 日のアクティブユーザー、累計使用時間、週次インストール傾向。アプリ内の匿名テレメトリーで自動集計され、一般に公開——個人情報は一切含まれません。",
    },
  },
};
