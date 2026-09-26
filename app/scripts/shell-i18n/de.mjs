/* 德语（de.genepad.cn）壳页头部元数据：scripts/gen-shells.mjs 读取本文件，
   把 app/en/*.html 模板改写为 app/de/*.html。pages.*.title 必须与
   src/lang/de.tsx 的 title.* 译文一致；description 为 en 壳页同名页
   meta description 的德语译文。 */
export default {
  code: "de",
  dir: "de",
  host: "de.genepad.cn",
  htmlLang: "de-DE",
  ogLocale: "de_DE",
  boot: {
    tagline: "GENKARTEN-EDITOR", // #boot 大标题 <small> 短标签，全大写
    desc: "Ein plattformübergreifender Genkarten-Editor für die tägliche molekulare Klonierung: Plasmidkarten betrachten und bearbeiten, Sequenzannotationen verwalten, Restriktionsstellen analysieren und Sanger-Chromatogramme abgleichen — so deckt GenePad den kompletten Workflow vom Klonierungsdesign bis zur Ergebnisprüfung ab.",
    loading: "Wird geladen", // 加载圈 aria-label
  },
  // 11 个构建页的 <title> 与 meta description（og/twitter 描述复用 description）
  pages: {
    "index": {
      title: "GenePad - Leichtgewichtiger plattformübergreifender Genkarten-Editor",
      description:
        "GenePad ist ein leichtgewichtiger, plattformübergreifender Genkarten-Editor für die tägliche molekulare Klonierung: Plasmidkarten ansehen und bearbeiten, Sequenzannotationen verwalten, Restriktionsstellen analysieren und Sanger-Sequenzierchromatogramme vergleichen. Unterstützt GEN, GenBank, FASTA, SnapGene DNA (.dna), AB1 und GJSON.",
    },
    "tech-support": {
      title: "Entwicklerdokumentation - GenePad",
      description:
        "GenePad-Entwicklerdokumentation: Aufbau der Formate .gen und .gjson, Rust-Lesebeispiele und die Anleitung zur .dna-Konvertierung von SnapGene.",
    },
    "projects": {
      title: "Projekte - GenePad | Plasmid-Element-Bibliotheken & Codon-Karten",
      description:
        "Von GenePad gepflegte Ökosystem-Projekte: eine Sequenzbibliothek verbreiteter Plasmid-Elemente (266 Elemente in 20 Kategorien, bis zu NCBI zurückverfolgbar, MIT-lizenziert) und ein menschlicher gewebespezifischer Codon-Usage-Atlas auf Basis von GTEx/GENCODE (Quellcode öffentlich) — Werkzeuge für Forschende und Entwickler.",
    },
    "library": {
      title: "Dateibibliothek - GenePad | Plasmid-Dateien suchen & verwalten",
      description:
        "GenePads integrierte Plasmid-Dateibibliothek: verstreute Plasmid-Dateien in einem durchsuchbaren Index sammeln — organisiert nach Projekt, Speicherpfad oder KI-generierten Tags; DeepSeek konfigurieren, um Plasmide automatisch zu taggen, und über den KI-Assistenten per Merkmal finden — ganz ohne Dateinamen oder Ablageorte merken zu müssen.",
    },
    "ngs": {
      title: "NGS-Viewer - GenePad | FASTQ-Daten ansehen & Bibliotheks-Häufigkeitsanalyse",
      description:
        "GenePads integrierter NGS-Daten-Viewer: fastq.gz / fastq / fq.gz / fq direkt per Rechtsklick („Open with“) oder Drag-and-drop öffnen; Paired-end-Dateien werden automatisch zugeordnet und zusammengeführt, basenweise Sequenzierqualität, Aminosäure-Fragment-Suche für variable Regionen, Trim-Anker für die Stapelverarbeitung und Bibliotheks-Häufigkeitsberichte per Klick.",
    },
    "tutorial": {
      title: "Tutorials - GenePad | KI einrichten · Dateibibliothek · NGS-Analyse",
      description:
        "Das GenePad-Tutorialverzeichnis: illustrierte Schritt-für-Schritt-Anleitungen — DeepSeek-KI einrichten, die Dateibibliothek organisieren, NGS-Daten von fastq.gz bis zum Bibliotheks-Häufigkeitsbericht führen und mehr. Eine Seite pro Tutorial, laufend ergänzt.",
    },
    "tutorial-ai": {
      title: "KI-Setup-Tutorial - GenePad | DeepSeek-API-Schlüssel holen & speichern",
      description:
        "GenePad-Tutorial Schritt für Schritt: DeepSeek in fünf Schritten anbinden — Einstellungen öffnen, Profil anlegen, Modell wählen, auf der DeepSeek-Plattform einen API-Key anlegen und kopieren, dann einfügen, Verbindung testen und speichern — für KI-Assistenten und automatische Plasmid-Tags. Jeder Schritt mit echten Screenshots illustriert.",
    },
    "tutorial-library": {
      title: "Dateibibliothek-Tutorial - GenePad | Plasmide importieren, suchen & mit KI-Tags versehen",
      description:
        "GenePad-Tutorial Schritt für Schritt: überwachte Ordner einrichten, damit sich Plasmide selbst aufnehmen, nach Projekt, Speicherpfad oder KI-Tags stöbern, Plasmide über den KI-Assistenten finden und Dateien per Klick an SnapGene / VS Code übergeben. Jeder Schritt mit echten Screenshots illustriert.",
    },
    "tutorial-ngs": {
      title: "NGS-Analyse-Tutorial - GenePad | fastq.gz ansehen & Häufigkeitsbericht",
      description:
        "GenePad-Tutorial Schritt für Schritt: fastq.gz per Drag-and-drop öffnen, Paired-end-Partner automatisch paaren, basenweise Qualität prüfen, per Aminosäuren suchen, mit Ankern trimmen und einen Bibliotheks-Häufigkeitsbericht erzeugen — inklusive komplettem Video. Jeder Schritt mit echten Screenshots illustriert.",
    },
    "tutorial-lang": {
      title: "Sprach-Tutorial - GenePad | Sprachpakete mit KI übersetzen",
      description:
        "GenePad-Tutorial Schritt für Schritt: Einstellungen → Language → AI Translate öffnen, eine Zielsprache eingeben (Französisch, Russisch und mehr), und die konfigurierte KI erzeugt das Sprachpaket und stellt die gesamte Oberfläche um — lange Texte werden abschnittsweise mit automatischen Wiederholungen übersetzt, Pakete lassen sich exportieren und von Hand bearbeiten. Jeder Schritt mit echten Screenshots illustriert.",
    },
    "tutorial-langpack": {
      title: "Sprache der Oberfläche einstellen - GenePad | Eingebaute Sprachen & offizielle Sprachpakete",
      description:
        "GenePad-Tutorial zur Sprache der Oberfläche: Öffnen Sie Einstellungen → Language, um zwischen den eingebauten Sprachen Chinesisch/Englisch zu wechseln, oder importieren Sie über „Import Language File“ ein offizielles Sprachpaket (Deutsch, Russisch, Japanisch, Koreanisch, Französisch) — die gesamte Oberfläche wechselt sofort, ohne Konfiguration. Schritt für Schritt mit Screenshots; alle fünf offiziellen Pakete stehen zum Download bereit.",
    },
    "stats": {
      title: "Live-Statistiken - GenePad | Öffentliche Nutzungsstatistiken",
      description:
        "GenePad-Live-Nutzungsstatistiken: Installationen gesamt, aktive Nutzer der letzten 30 Tage, kumulierte Nutzungszeit und wöchentliche Installationstrends. Automatisch über die anonyme Telemetrie in der App zusammengefasst und öffentlich einsehbar — ohne persönliche Informationen.",
    },
  },
};
