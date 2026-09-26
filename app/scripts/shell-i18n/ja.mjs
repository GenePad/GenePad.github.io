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
    desc: "日常の分子クローニングのための、軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール。プラスミッドマップの閲覧・編集、配列注釈の管理、制限酵素部位の解析、Sanger トレースとの照合まで、クローニング設計から結果検証までの一連の流れを支えます。",
    loading: "読み込み中", // ローディング aria-label
  },
  // 11 构建ページの <title> と meta description（og/twitter 描述は description を流用）
  pages: {
    index: {
      title: "GenePad - 軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール",
      description:
        "GenePad は日常の分子クローニングのための軽量・クロスプラットフォーム対応のプラスミッドマップ編集ツール：プラスミッドマップの閲覧・編集、配列注釈の管理、制限酵素部位の解析、Sanger トレースとの照合に対応。GEN、GenBank、FASTA、SnapGene DNA（.dna）、AB1、GJSON をサポートします。",
    },
    "tech-support": {
      title: "開発者向け技術文書 - GenePad",
      description:
        "GenePad 開発者向け技術文書：.gen と .gjson のファイル定義、Rust 読み込みサンプル、SnapGene .dna 変換ガイド。",
    },
    projects: {
      title: "関連プロジェクト - GenePad | プラスミッド汎用要素ライブラリとコドンアトラス",
      description:
        "GenePad が保守する関連プロジェクト：プラスミッド汎用要素の配列ライブラリ（20 分類 266 要素、NCBI まで出典をたどれる、MIT ライセンス）と、GTEx/GENCODE から構築したヒト組織特異的コドン使用アトラス（ソースコード公開）——研究者と開発者のためのツール。",
    },
    library: {
      title: "遺伝子ファイルライブラリ - GenePad | プラスミッドファイルの検索と管理",
      description:
        "GenePad 内蔵のプラスミッドファイルライブラリ：フォルダに散在するプラスミッドファイルを検索可能な 1 つの索引に集約——プロジェクト別・保存先別・AI 生成タグ別に整理。DeepSeek を設定すればプラスミッドに自動タグ付けされ、AI アシスタントが属性からプラスミッドを探します。ファイル名や場所を覚える必要はありません。",
    },
    ngs: {
      title: "NGS データ閲覧 - GenePad | FASTQ シークエンスデータの表示とライブラリ豊度解析",
      description:
        "GenePad 内蔵の NGS データ閲覧：右クリックの「Open with」やドラッグ＆ドロップで fastq.gz / fastq / fq.gz / fq ファイルを直接開けます。ペアエンドは自動ペアリング・自動結合、塩基ごとの品質確認、アミノ酸断片の検索で可変領域を特定、トリミングアンカーで一括切り出し、ワンクリックでライブラリ豊度レポートを作成します。",
    },
    tutorial: {
      title: "チュートリアル - GenePad | AI 設定 · 遺伝子ファイルライブラリ · NGS 解析",
      description:
        "GenePad チュートリアル目次：図解入りの手順ガイド——DeepSeek AI の設定、遺伝子ファイルライブラリの整理、NGS データを fastq.gz からライブラリ豊度レポートまで、など。1 チュートリアル 1 ページ、随時更新。",
    },
    "tutorial-ai": {
      title: "AI 設定チュートリアル - GenePad | DeepSeek API キーの取得と保存",
      description:
        "GenePad の手順解説チュートリアル：5 つの手順で DeepSeek に接続——Settings を開き、設定を作成し、モデルを選び、DeepSeek のプラットフォームで API キーを作成・コピーして、貼り付け・接続テスト・保存すれば、AI アシスタントとプラスミッド自動タグが使えるようになります。全手順を実際のスクリーンショットで図解。",
    },
    "tutorial-library": {
      title: "遺伝子ファイルライブラリチュートリアル - GenePad | プラスミッドの取り込み・検索・AI タグ",
      description:
        "GenePad の手順解説チュートリアル：監視フォルダを追加すればプラスミッドが自動で取り込まれ、プロジェクト・保存先・AI タグで閲覧し、AI アシスタントでプラスミッドを特定、ワンクリックで SnapGene / VS Code にファイルを渡せます。全手順を実際のスクリーンショットで図解。",
    },
    "tutorial-ngs": {
      title: "NGS 解析チュートリアル - GenePad | fastq.gz の閲覧とライブラリ豊度レポート",
      description:
        "GenePad の手順解説チュートリアル：ドラッグ＆ドロップで fastq.gz を開き、ペアエンドを自動ペアリング、塩基ごとの品質を確認、アミノ酸で検索、アンカーでトリミング、ライブラリ豊度レポートを生成——完全な操作動画付き。全手順を実際のスクリーンショットで図解。",
    },
    "tutorial-lang": {
      title: "任意の言語を設定するチュートリアル - GenePad | AI 翻訳で言語パックを生成",
      description:
        "GenePad の手順解説チュートリアル：Settings → Language → AI Translate を開き、目的の言語（フランス語、ロシア語など）を入力すれば、設定済みの AI が言語パックを生成して UI 全体を切り替えます——長文は分割して翻訳し、失敗した部分は自動で再試行。言語パックは書き出して手動編集もできます。全手順を実際のスクリーンショットで図解。",
    },
        "tutorial-snapgene": {
      title: "SnapGene 代替ガイド - GenePad | 無料のクロスプラットフォーム プラスミッドマップ編集ツール",
      description:
        "GenePad の SnapGene 移行ガイド：SnapGene の .dna プラスミドファイルをそのまま読み書きでき、マップ・制限酵素部位・プライマー・Sanger 比較も直感的に操作できます。さらに NGS データ閲覧・遺伝子ファイルライブラリ・AI アシスタント・6 か国語 UI を搭載し、Windows / macOS / Linux / Android で無料の公開ベータ中。「Open with」でいつでも SnapGene にファイルを渡せます。",
    },
"tutorial-langpack": {
      title: "UI 言語を設定するチュートリアル - GenePad | 内蔵言語と公式言語パック",
      description:
        "GenePad の UI 言語設定チュートリアル：設定 → Language を開いて内蔵の中国語・英語を切り替え、「Import Language File」から公式言語パック（ドイツ語・ロシア語・日本語・韓国語・フランス語）を読み込めば画面全体が即座に切り替わります。追加設定は不要。実際のスクリーンショット付きの手順解説、5 つの公式パックすべてをダウンロード可能。",
    },
    stats: {
      title: "リアルタイム統計 - GenePad | 公開利用統計",
      description:
        "GenePad のリアルタイム利用統計：累計インストール数、直近 30 日の稼働、累計使用時間、週次のインストール傾向。アプリ内の匿名利用統計で自動集計され、一般に公開——個人情報は一切含まれません。",
    },
  },
};
