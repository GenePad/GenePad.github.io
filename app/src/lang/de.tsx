/* 德语词典：key 与 zh 基准一一对应；由 i18n.tsx 引入。 */
import type { ReactNode } from "react";
import type { TKey } from "../i18n";

const de: Record<TKey, ReactNode> = {
  // Nav
  "nav.workbench": "Workbench",
  "nav.daynight": "Hell & Dunkel",
  "nav.sanger": "Sanger-Chromatogramm",
  "nav.toolbox": "Toolbox",
  "nav.download": "Download",
  "nav.library": "Dateibibliothek",
  "nav.ngs": "NGS-Viewer",
  "nav.tutorial": "Tutorials",
  "nav.docs": "Dev-Doku",
  "nav.projects": "Projekte",
  "nav.stats": "Live-Statistiken",
  "nav.cta": "Kostenlos herunterladen / aktualisieren",
  "nav.lang": "EN",

  // Page titles（运行时标题随语言切换；de.genepad.cn 壳页 <title> 与此一致）
  "title.home": "GenePad - Leichtgewichtiger plattformübergreifender Genkarten-Editor",
  "title.library": "Dateibibliothek - GenePad | Plasmid-Dateien suchen & verwalten",
  "title.ngs": "NGS-Viewer - GenePad | FASTQ-Daten ansehen & Bibliotheks-Häufigkeitsanalyse",
  "title.tutorial": "Tutorials - GenePad | KI einrichten · Dateibibliothek · NGS-Analyse",
  "title.tutorial.ai": "KI-Setup-Tutorial - GenePad | DeepSeek-API-Schlüssel holen & speichern",
  "title.tutorial.library": "Dateibibliothek-Tutorial - GenePad | Plasmide importieren, suchen & mit KI-Tags versehen",
  "title.tutorial.ngs": "NGS-Analyse-Tutorial - GenePad | fastq.gz ansehen & Häufigkeitsbericht",
  "title.tutorial.lang": "Sprach-Tutorial - GenePad | Sprachpakete mit KI übersetzen",
  "title.tutorial.langpack": "Sprache der Oberfläche einstellen - GenePad | Eingebaute Sprachen & offizielle Sprachpakete",
  "title.projects": "Projekte - GenePad | Plasmid-Element-Bibliotheken & Codon-Karten",
  "title.tech": "Entwicklerdokumentation - GenePad",
  "title.stats": "Live-Statistiken - GenePad | Öffentliche Nutzungsstatistiken",

  // Hero
  "hero.badge": "Kostenlose Beta",
  "hero.badgeEn": "Kostenlose Beta · Plattformübergreifend",
  "hero.titleCn": "Genkarten-Editor",
  "hero.titleEn": "Plattformübergreifend",
  "hero.desc":
    "Ein plattformübergreifender Genkarten-Editor für die tägliche molekulare Klonierung: Plasmidkarten betrachten und bearbeiten, Sequenzannotationen verwalten, Restriktionsstellen analysieren und Sanger-Chromatogramme abgleichen — so deckt GenePad den kompletten Workflow vom Klonierungsdesign bis zur Ergebnisprüfung ab.",
  "hero.download": "Kostenlos herunterladen / aktualisieren",
  "hero.tour": "Oberfläche ansehen",
  "hero.features": "KARTE · ANNOTATION · RESTRIKTION · PRIMER · CHROMATOGRAMM",
  "hero.platforms": "Verfügbar für",
  "hero.langBtn": "Sprache einstellen",

  // Workbench
  "wb.eyebrow": "Workbench",
  "wb.title": (
    <>Karten, Sequenzen und Analyse — vereint in einer Oberfläche</>
  ),
  "wb.lead":
    "Kartenansicht, Sequenzbearbeitung, Abfrage von Restriktionsstellen und Berechnung von Proteineigenschaften sind in einer Oberfläche vereint; beim Auswählen eines Objekts stellen sich alle Ansichten automatisch darauf ein.",
  "wb.1.name": "Plasmidkarte",
  "wb.1.desc":
    "Umschalten zwischen ringförmiger und linearer Ansicht mit einem Klick; Promotoren, CDS, Replikationsursprünge, poly(A)-Signale und weitere Elemente werden nach Kategorie farbig in Ebenen gegliedert, Beschriftungen weichen automatisch aus — selbst elementreiche Vektoren bleiben klar lesbar.",
  "wb.2.name": "Karte → Sequenz",
  "wb.2.desc":
    "Wählt man einen Eintrag in der Annotationstabelle, springt die Sequenzansicht zum entsprechenden Basenbereich und zeigt zugleich die Länge der Auswahl, den GC-Gehalt und den Tm-Wert; Karte und Sequenz sind in beide Richtungen verknüpft.",
  "wb.3.name": "Restriktionsstellen",
  "wb.3.desc":
    "Restriktionsstellen werden direkt an der doppelsträngigen Sequenz annotiert; ein Überfahren mit der Maus zeigt Erkennungssequenz, Strangrichtung und die Schnittpositionen auf beiden Strängen, 5′-Überhänge sind eindeutig markiert — so lassen sich Klonierungspläne schnell überprüfen.",
  "wb.4.name": "Proteineigenschaften",
  "wb.4.desc":
    "Bei ausgewählter CDS werden Molekülmasse, isoelektrischer Punkt, GRAVY, aliphatischer Index und Extinktionskoeffizient in Echtzeit berechnet; für den isoelektrischen Punkt sind 19 Algorithmen zum Vergleich eingebaut, standardmäßig wird das in der Literatur empfohlene Verfahren ausgegeben.",

  // DayNight
  "dn.eyebrow": "Hell & Dunkel",
  "dn.title": (
    <>
      Helle und dunkle Themen,
      <br />
      konzipiert für lange Arbeitssitzungen
    </>
  ),
  "dn.lead":
    "Eine Forschungsoberfläche mit zwei vollständigen Farbwelten: Das helle Thema eignet sich für Projektion, Präsentation und Tageslicht; das dunkle Thema entlastet die Augen bei langer Arbeit in der Nacht.",
  "dn.day": "TAG",
  "dn.night": "NACHT",
  "dn.state.day": "▸ HELLES THEMA — helles Thema aktiv",
  "dn.state.night": "▸ DUNKLES THEMA — dunkles Thema aktiv",
  "dn.caption.day": "TAG-MODUS — derselbe Vektor, Gesamtansicht im hellen Thema",
  "dn.caption.night": "NACHT-MODUS — Karten, Sequenzen und Enzymschnitte im dunklen Thema gerendert",
  "dn.alt.day": "GenePad helles Thema",
  "dn.alt.night": "GenePad dunkles Thema",

  // Sanger
  "sg.eyebrow": "Sanger-Chromatogramm",
  "sg.title": (
    <>
      Sanger-Sequenzierungsergebnisse,
      <br />
      basenweise mit der Referenz abgeglichen
    </>
  ),
  "sg.lead":
    "AB1-Chromatogrammdateien importieren: Chromatogramm, Reads und Referenzsequenz werden basenweise ausgerichtet; Übereinstimmungsrate und E-Wert erscheinen direkt im Ergebnis — Qualität und Mismatch-Positionen jeder Sequenzierreaktion sind sofort ablesbar.",
  "sg.badge.format": "AB1-Chromatogramm",
  "sg.shot1": "2KB-RCA-F — Chromatogramm basenweise mit der Referenz ausgerichtet",
  "sg.shot2": "TOP STRAND — Mismatch-Stellen rot markiert",

  // Toolbox
  "tb.eyebrow": "Toolbox",
  "tb.title": <>Eine umfassende Toolbox</>,
  "tb.lead":
    "Bei ausgewählter Sequenz starten Gelelektrophorese-Simulation und sgRNA-Design direkt aus dem Kontextmenü; die globale Toolbox bietet KI-Assistent und Dateibibliothek; mehrsprachige Oberfläche und „Open with“-Unterstützung erleichtern die Einbindung in bestehende Workflows.",
  "tb.groupA": "Kontextmenü",
  "tb.groupB": "Globale Toolbox",
  "tb.groupC": "Offenheit",
  "tb.c1.name": "DNA-Gelelektrophorese-Simulation",
  "tb.c1.desc":
    "Sequenz auswählen und die Gelelektrophorese-Simulation über das Kontextmenü starten, um die Bandenlagen im Agarosegel vorab zu prüfen; gängige Größenstandards wie Trans2K® sind integriert, sodass sich die Ergebnisse schon vor dem Experiment abschätzen lassen.",
  "tb.c2.name": "Protein-Gelelektrophorese-Simulation",
  "tb.c2.desc":
    "SDS-PAGE-Simulation: CDS oder Aminosäureabschnitt auswählen und auftragen; mit vorgefärbten Größenstandards wie PageRuler als Referenz werden die Bandenlagen in Echtzeit berechnet.",
  "tb.c3.name": "CRISPR-sgRNA-Design",
  "tb.c3.desc":
    "Zwölf Erkennungslayouts, darunter SpCas9, xCas9, Cas12a/b und TnpB; PAM-Ausrichtung, Länge der Seed-Region und Off-Target-Filterung sind konfigurierbar, Kandidaten lassen sich mit einem Klick zurück auf die Karte annotieren.",
  "tb.t1.name": "KI-Assistent",
  "tb.t1.desc":
    "Liest und schreibt direkt Sequenzen, Annotationen und Primer der aktuellen Datei; Features hinzufügen, Tm berechnen, Proteine übersetzen, ORFs vorhersagen und mehr — alles per Anweisung in natürlicher Sprache.",
  "tb.t2.name": "Dateibibliothek",
  "tb.t2.desc":
    "Geöffnete Vektoren werden automatisch indiziert, mit von der KI im Stapel generierten Tags und überwachten Ordnern; Dateien lassen sich anhand von Plasmid-Eigenschaften auffinden, ganz ohne Dateinamen merken zu müssen, und auch über den KI-Assistenten abrufen. Es entstehen nur Indizes — Originaldateien werden nie verändert.",
  "tb.o1.name": "Mehrsprachig",
  "tb.o1.desc":
    "Chinesische, englische, japanische, französische, deutsche und russische Oberflächen sind eingebaut; Sprachpakete lassen sich exportieren, und eigene Sprachen lassen sich per KI-gestützter Übersetzung ergänzen.",
  "tb.o2.name": "„Open with“",
  "tb.o2.desc":
    "Die integrierte Funktion „Open with“ übergibt Dateien mit einem Klick an SnapGene, VS Code oder ein anderes bestimmtes Werkzeug — im Einklang mit bestehenden Workflows, ohne einzuschränken, wie die Dateien genutzt werden.",
  "tb.more": "Mehr erfahren",

  // 首页基因文件库推荐节
  "lp.lead":
    "Die Dateibibliothek führt verstreut gespeicherte Plasmid-Dateien in einem durchsuchbaren Gesamtindex zusammen — organisiert nach Projekten, Speicherpfaden oder KI-generierten Tags; ein bis zwei Eigenschaftsmerkmale genügen, damit die KI das Plasmid ausfindig macht, ganz ohne Dateinamen und Pfade merken zu müssen.",
  "lp.c1": "Projekte · Pfade · Tags",
  "lp.c2": "Automatische KI-Tags",
  "lp.c3": "Suche in natürlicher Sprache",
  "lp.c4": "Automatische Indizierung überwachter Ordner",
  "lp.safe": "Nur Indizes — Originaldateien werden nie verändert",
  "lp.cta": "Mehr erfahren",

  // Download
  "dl.eyebrow": "Download · Installation / Aktualisierung",
  "dl.title": (
    <>
      Plattformübergreifende Clients
      <br />
      für Desktop und Mobilgeräte
    </>
  ),
  "dl.lead":
    "Verfügbar für Windows, macOS und Linux auf dem Desktop sowie Android auf dem Mobilgerät, mit gleichem Funktionsumfang auf allen Plattformen. Erstanwender installieren direkt aus dem heruntergeladenen Paket; bereits Installierte laden einfach die neueste Version und installieren darüber — ein Deinstallieren ist nicht nötig.",
  "dl.note.desktop": "Desktop",
  "dl.note.linuxX64": "Desktop · x86_64",
  "dl.note.mobile": "Mobilgerät",
  "dl.note.soon": "Demnächst",
  "dl.upgradeNote":
    "GenePad bereits installiert? Einfach das neueste Installationspaket herunterladen und über die bestehende Version installieren — kein Deinstallieren nötig. Neuanwender installieren nach dem Download wie gewohnt.",
  "dl.cmdTitle.recommended": "Installation / Aktualisierung per Kommandozeile (empfohlen)",
  "dl.cmdTitle.plain": "Installation / Aktualisierung per Kommandozeile",
  "dl.cmd.brewLabel": "macOS · Homebrew",
  "dl.cmd.npmLabel": "Linux · npm",
  "dl.cmd.npmLabelMac": "macOS · npm",
  "dl.cmd.note": "Den obigen Befehl kopieren, ins Terminal einfügen und ausführen.",
  "dl.cmd.scriptLabel": "Linux · Installations-/Aktualisierungsskript",
  "dl.cmd.scriptLabelMac": "macOS · Installations-/Aktualisierungsskript",
  "dl.cmdTab.script": "Installieren / Aktualisieren",
  "dl.cmdTab.npm": "npm",
  "dl.cmd.recommendedTag": "Empfohlen",
  "dl.or.linux": "Oder die Installationspakete direkt herunterladen",
  "dl.ai.title": "KI-gestützte Installation / Aktualisierung",
  "dl.ai.desc":
    "Die macOS-Pakete sind nicht signiert und erfordern mehrere manuelle Schritte. Kopieren Sie den folgenden Prompt und fügen Sie ihn bei einem KI-Assistenten (Kimi, ChatGPT usw.) ein, und führen Sie die Installation unter dessen Schritt-für-Schritt-Anleitung durch.",
  "dl.ai.prompt": `Bitte helfen Sie mir, eine Anwendung namens „GenePad“ auf macOS zu installieren. Probieren Sie die folgenden Wege der Reihe nach und stoppen Sie, sobald einer erfolgreich ist:
1. Bevorzugt: Das offizielle Ein-Klick-Installationsskript ausführen (es erkennt und installiert Homebrew automatisch und wechselt je nach Netzlage auf einen China-Spiegel). Hängen Sie unbedingt den Parameter -q an: Standardmäßig wartet das Skript am Ende auf ein Drücken der Eingabetaste, bevor es sich beendet; mit -q entfällt diese Wartezeit, was die unbeaufsichtigte Ausführung erleichtert:
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   Führen Sie danach open -a GenePad aus.
2. Alternativ: Über Homebrew installieren (erscheint automatisch unter „Programme“):
   brew install genepad/tap/genepad
   Führen Sie danach open -a GenePad aus. Falls Homebrew noch nicht installiert ist, zuerst:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. Dritte Möglichkeit: Über npm installieren (Start über die Kommandozeile). Wenn möglich, zusätzlich nach ~/Applications kopieren, damit es unter „Programme“ und im Launchpad auftaucht:
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   Danach mit open -a GenePad öffnen (oder in der Kommandozeile: genepad)
4. Manueller Fallback: Die Anwendung ist nicht signiert; im Browser heruntergeladene Dateien markiert Gatekeeper als „beschädigt“ (damaged). Laden Sie daher mit curl herunter und signieren Sie lokal. Lesen Sie zunächst die neueste Versionsnummer aus https://genepad.cn/update.json (nennen wir sie VERSION, z. B. 0.7.1), laden Sie dann die .app.tar.gz dieser Version herunter und entpacken Sie sie:
   curl -L -o /tmp/gene-pad-app.tar.gz "https://genepad.cn/release/mac/GenePad_\${VERSION}_Darwin_arm64.app.tar.gz"
   mkdir -p /tmp/gene-pad-extract && tar -xzf /tmp/gene-pad-app.tar.gz -C /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ Hinweis: Die genannten Wege können fehlschlagen oder veraltet sein. Klappt ein Schritt nicht, weichen Sie selbst auf eine andere gangbare Methode aus (etwa ein anderer Weg, Gatekeeper zu umgehen, oder andere Werkzeuge zum Entpacken und Signieren). Besuchen Sie die offizielle Website https://genepad.cn nur, falls die obigen Download-Links nicht erreichbar sind — die Website listet lediglich alternative Download-Links und bietet keinen Installations-Support.`,
  "dl.mac.other": "Weitere Installations-/Aktualisierungsoptionen (Homebrew / npm / KI-gestützt / direkte Downloads)",
  "dl.mac.unsigned":
    "Hinweis zur Signatur: Über den Browser heruntergeladene .dmg-/.app-Dateien werden von Gatekeeper als „beschädigt“ (damaged) markiert. Öffnen Sie sie per Rechtsklick → „Öffnen“, oder entfernen Sie das Quarantäne-Attribut mit xattr -cr; empfohlen wird die oben beschriebene Installation per Kommandozeile.",
  "dl.copy": "Kopieren",
  "dl.copied": "Kopiert ✓",
  "dl.filesTitle": "Installationspakete direkt herunterladen",
  "lb.close": "Schließen",
  "lb.prev": "Zurück",
  "lb.next": "Weiter",
  "dl.source.direct": "Direkt",
  "dl.source.gitee": "Gitee",
  "dl.source.github": "GitHub",
  "dl.giteeBadge": "China-CDN",
  "dl.arch.x64": "x86_64",
  "dl.arch.arm64": "ARM64",
  "dl.spark": "Spark Store",
  "dl.sparkNote": "Nutzer chinesischer Linux-Distributionen können die Anwendung auch über den Spark Store installieren bzw. aktualisieren",
  "dl.releases": "Alle Versionen (GitHub Releases)",
  "dl.releasesGitee": "Alle Versionen (Gitee-Spiegel)",
  "dl.licenseTag": "LIZENZ",
  "dl.license":
    "GenePad Free ist für die persönliche Evaluation und zum Lernen kostenlos und deckt das alltägliche Betrachten, Bearbeiten und Speichern von Karten ab; die kommerzielle Nutzung wird durch die später erscheinende GenePad-Pro-Lizenz abgedeckt.",
  "dl.license.academic":
    "Kostenlose akademische Lizenz: Von 2026 bis zum 31. Dezember 2027 erhalten akademische Nutzer — Hochschulen, Forschungsgruppen an Krankenhäusern, iGEM-Teilnehmende, Wissenschaftler und Studierende — die kostenlose Nutzungsberechtigung automatisch mit dem Download, ohne Antrag und ohne Kontaktaufnahme mit dem GenePad-Team. Diese Berechtigung gilt ausschließlich für akademische Forschung und darf nicht kommerziell genutzt werden.",

  // Footer
  "ft.blurb":
    "Ein leichtgewichtiger, plattformübergreifender Genkarten-Editor für die tägliche molekulare Klonierung. Dank an alle Nutzer, die Probleme melden und Vorschläge einreichen.",
  "ft.col.download": "Download",
  "ft.col.support": "Feedback & Support",
  "ft.col.more": "Mehr",
  "ft.giteeMirror": "Gitee-Spiegel",
  "ft.changelog": "Changelog",
  "ft.docs": "Dev-Doku",
  "ft.projects": "Projekte",
  "ft.library": "Dateibibliothek",
  "ft.ngs": "NGS-Daten-Viewer",
  "ft.sponsor": "Entwickler unterstützen",
  "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

  // 子页面共用
  "sub.back": "Zurück zur Startseite",

  // Tech support page
  "ts.eyebrow": "Entwicklerdokumentation",
  "ts.title": "Dateiformat-Dokumentation",
  "ts.lead":
    "Für Entwickler, die eigene Lese-, Konvertierungs- oder Importprogramme erstellen: Die von GenePad verwendeten Formate .gen und .gjson sowie das Umsetzungsverfahren für SnapGene .dna sind auf eigenen Seiten dokumentiert, damit sich Implementierungsdetails schnell finden lassen.",
  "ts.group.formats": "Dateiformate",
  "ts.group.formatsEn": "DATEIFORMATE",
  "ts.group.code": "Codebeispiele",
  "ts.group.codeEn": "CODEBEISPIELE",
  "ts.gen.title": "Aufbau des .gen-Formats",
  "ts.gen.desc":
    "Die SQLite-3-Projektdatei: alle 14 Tabellendefinitionen, Feldbedeutungen, Koordinatenregeln, der Verlaufsbaum der Bearbeitungen, Blockspeicherung und der Undo-Mechanismus. Nach der Lektüre können Sie .gen eigenständig lesen und schreiben.",
  "ts.gjson.title": "Aufbau des .gjson-Formats",
  "ts.gjson.desc":
    "Das JSON-Austauschformat: Felder der obersten Ebene, jede Objektdefinition und die Unterschiede in der Datentreue gegenüber .gen. Nach der Lektüre können Sie .gjson parsen.",
  "ts.dna.title": "Umsetzungsverfahren für .dna",
  "ts.dna.desc":
    "Aufbau des binären SnapGene-.dna-Pakets, Flag-Bits, Feldzuordnung und Umrechnung zwischen 0-basierten und 1-basierten Koordinaten.",
  "ts.rust.title": "Rust-Lesebeispiele",
  "ts.rust.desc":
    "Eine minimal lauffähige Implementierung, die .gen mit rusqlite und .gjson mit serde_json liest — inklusive Abhängigkeiten und erwarteter Ausgabe.",
  "ts.readDoc": "Dokument lesen",
  "ts.feedback":
    "Falls etwas fehlt, das Sie benötigen, eröffnen Sie ein Issue auf GitHub oder Gitee — wir ergänzen die Dokumentation.",

  // Projects page
  "pr.eyebrow": "Ökosystem-Projekte",
  "pr.title": "GenePad-Ökosystem-Projekte",
  "pr.lead":
    "Rund um die Werkzeugkette der molekularen Klonierung unterhält die GenePad-Organisation auf GitHub mehrere eigenständige Projekte — von einer nachvollziehbaren Bibliothek allgemeiner Plasmid-Elemente bis zu einer Pipeline für gewebespezifische Codon-Statistiken. Jedes Projekt steht für sich und lässt sich separat nutzen, um Forschenden und Entwicklern wiederkehrende Arbeit abzunehmen.",
  "pr.specs": "Datenspezifikationen",
  "pr.cf.head": "Allgemeine Plasmid-Elemente",
  "pr.cf.title": "Sequenzbibliothek allgemeiner Elemente für die Plasmidkonstruktion",
  "pr.cf.desc":
    "Eine wiederverwendbare Elementbibliothek, Eintrag für Eintrag aus NCBI-Referenzplasmiden zusammengestellt und geprüft. Jedes Element hält seine NCBI-Akzession und das Referenzplasmid fest, sodass sich jede Sequenz bis zur Quelle zurückverfolgen lässt. Einmal in Plasmid-Software importiert, werden diese verbreiteten Elemente auf jeder geöffneten Karte automatisch erkannt.",
  "pr.cf.catsTitle": "20 abgedeckte Kategorien",
  "pr.cf.usage":
    "Die .gb-Dateien unter genbank/ in die Common-Features-Bibliothek von SnapGene oder Benchling importieren — ab dann werden diese Elemente auf jeder geöffneten Plasmidkarte automatisch annotiert; die .fa-Dateien unter fasta/ eignen sich direkt für BLAST-Vergleiche.",
  "pr.ca.head": "Gewebespezifischer Codon-Atlas",
  "pr.ca.title": "Gewebespezifischer Codon-Atlas des Menschen",
  "pr.ca.desc":
    "Eine eigenständig implementierte statistische Pipeline: Mit öffentlichen GTEx-Genexpressionsdaten und GENCODE-Annotationen als Input, gewichtet nach Gewebeexpression, erstellt sie für jedes menschliche Gewebe eine Codon-Usage-Tabelle — eine reproduzierbare, überprüfbare, gewebespezifische Referenz für Codon-Optimierung und das Design heterologer Expression, ohne Abhängigkeit von Tabellen Dritter mit restriktiver Lizenzierung.",
  "pr.ca.metricsTitle": "Ausgabe-Metriken",
  "pr.ca.usage":
    "python scripts/build_atlas.py erstellt alle Gewebetabellen aus den GTEx-/GENCODE-Eingaben neu; check_release.py und package_release.py übernehmen Validierung und Paketierung vor der Veröffentlichung.",
  "pr.org.text":
    "Diese Projekte sind aus dem GenePad-Hauptprojekt hervorgegangen und werden nach demselben Standard gepflegt. Quellcode und Fortschritt finden Sie auf der GitHub-Organisationsseite; Issues und Feedback sind willkommen.",

  // Library page（基因文件库宣传页）
  "lib.eyebrow": "Dateibibliothek",
  "lib.title": (
    <>
      Einheitliche Suche und Verwaltung
      <br />
      für Plasmid-Dateien
    </>
  ),
  "lib.lead":
    "Mit wachsender Projektzahl verstreuen sich Plasmid-Dateien über Ordner, Festplatten und Geräte, und die Dateinamen sagen wenig über die Eigenschaften der Plasmide. Die Dateibibliothek führt sie in einem durchsuchbaren Gesamtindex zusammen — organisiert nach Projekten, Speicherpfaden und KI-generierten Tags; ein bis zwei Eigenschaftsmerkmale genügen, damit die KI das Zielplasmid ausfindig macht, ganz ohne Namen und Pfade merken zu müssen.",
  "lib.hero.shot": "LIBRARY — 331 Plasmide indiziert; rechts die Tag-Wolke der gesamten Bibliothek",

  "lib.pain.head": "Häufige Probleme",
  "lib.pain.headEn": "HÄUFIGE PROBLEME",
  "lib.pain.title": "Bekannte Schwierigkeiten bei der Verwaltung von Plasmid-Dateien",
  "lib.pain.1.name": "Stetig wachsende Sammlungen",
  "lib.pain.1.desc":
    "Im Lauf der Projekte wachsen Plasmidsammlungen von Dutzenden auf Hunderte Dateien an, und die Ordnerhierarchien werden immer tiefer — die Verzeichnisstruktur allein führt nicht mehr zum Ziel.",
  "lib.pain.2.name": "Unklarer Aufbewahrungsort",
  "lib.pain.2.desc":
    "Dasselbe Plasmid kann in verschiedenen Ordnern, auf verschiedenen Festplatten oder Geräten liegen; wenn man es braucht, weiß man oft nicht, wo genau es sich befindet.",
  "lib.pain.3.name": "Aussagelose Dateinamen",
  "lib.pain.3.desc":
    "Die Suchabsicht formuliert man meist als Eigenschaft — „der Vektor mit Gen xx“ —, während Dateinamen wie pLH-sgRNA1-Muc4-11 nichts über die Eigenschaften des Plasmids verraten.",

  "lib.ways.head": "Drei Organisationswege",
  "lib.ways.headEn": "DREI WEGE ZUM ORDNEN",
  "lib.ways.title": "Projekte, Pfade, Tags — drei Ordnungsdimensionen",
  "lib.ways.1.name": "Nach Projekten",
  "lib.ways.1.desc":
    "Projekt anlegen und Plasmide hineinziehen — eine Studie, ein Projekt; öffnet man das Projekt, sieht man alle Plasmide dieser Studie.",
  "lib.ways.2.name": "Nach Speicherpfaden",
  "lib.ways.2.desc":
    "Nichts wird verschoben oder kopiert; die Dateien werden genau dort durchstöbert, wo sie liegen. Die Bibliothek ist nur ein Index und verändert die Originale nie.",
  "lib.ways.3.name": "Nach Plasmid-Tags",
  "lib.ways.3.desc":
    "Die KI liest Sequenz und Annotationen jedes Plasmids und erzeugt Eigenschafts-Tags wie lentiviral, sgRNA und ampicillin; ein Klick auf ein Tag filtert alle passenden Plasmide heraus — Auffinden nach Eigenschaft statt nach Name.",

  "lib.tags.head": "KI-Tags",
  "lib.tags.headEn": "KI-TAGS",
  "lib.tags.title": "Automatisch generierte Eigenschafts-Tags per KI",
  "lib.tags.desc":
    "Nach der KI-Konfiguration liest das Programm beim Scannen oder Öffnen eines Plasmids automatisch Sequenz und Elemente und erzeugt für jede Datei einen Satz Eigenschafts-Tags; über den Tabellenkopf lässt sich im Stapel aktualisieren — entweder nur Fehlendes ergänzen oder alles neu generieren. Die Tag-Wolke rechts zeigt die Eigenschaftsverteilung der gesamten Bibliothek; die Kombination weniger Tags führt schnell zur Zieldatei.",
  "lib.tags.shot": "Stapelaktualisierung über den Tabellenkopf — nur Einträge ohne Tags ergänzen oder alles neu generieren",

  "lib.ai.head": "KI-Assistent",
  "lib.ai.headEn": "KI-ASSISTENT",
  "lib.ai.title": "Direkt über den KI-Assistenten suchen",
  "lib.ai.desc":
    "Geben Sie dem KI-Assistenten direkt eine Anweisung — etwa „finde ein Typ-I-CRISPR-Plasmid“: Er durchsucht die gesamte Bibliothek und listet die Kandidaten mit Eigenschaften und empfohlener Verwendung auf. Fordert man ihn auf, „meine Plasmidbibliothek aufzuräumen“, analysiert er zuerst den Ist-Zustand und schlägt dann ein konkretes Vorgehen vor.",
  "lib.ai.shot1": "AI ASSISTANT — „Meine Plasmidbibliothek aufräumen“: erst Analyse, dann Vorschlag",
  "lib.ai.shot2": "AI ASSISTANT — „Typ-I-CRISPR-Plasmid finden“: Kandidaten samt Eigenschaften",

  "lib.setup.head": "Erste Schritte",
  "lib.setup.headEn": "ERSTE SCHRITTE",
  "lib.setup.title": "Erstkonfiguration in wenigen Minuten",
  "lib.setup.lead":
    "Die Dateibibliothek steckt in der Toolbox von GenePad. Öffnen Sie sie und folgen Sie diesen Schritten:",
  "lib.setup.1.name": "Konfigurationseinstieg öffnen",
  "lib.setup.1.desc":
    "Beim ersten Öffnen der Dateibibliothek im oberen Banner auf „Configure AI“ klicken; danach sind die Einstellungen jederzeit über das KI-Symbol in der Titelleiste erreichbar.",
  "lib.setup.1.shot": "Erstes Öffnen — im Banner auf „Configure AI“ klicken",
  "lib.setup.2.name": "DeepSeek-Profil anlegen",
  "lib.setup.2.desc":
    "Auf „New profile“ klicken und einen Namen vergeben; als Anbieter DeepSeek und als Modell deepseek-v4-flash wählen, dann neben dem API-Key-Feld auf „Get“ klicken.",
  "lib.setup.2.shot": "KI-Einstellungen — neues Profil anlegen, DeepSeek wählen, auf „Get“ klicken",
  "lib.setup.3.name": "DeepSeek-API-Schlüssel besorgen",
  "lib.setup.3.desc":
    "Der Browser öffnet die DeepSeek-Plattform: Konto registrieren, Guthaben aufladen, dann auf „Create API key“ klicken; der Schlüssel wird nur einmal angezeigt — sofort nach dem Anlegen kopieren.",
  "lib.setup.3.shot": "DEEPSEEK-Plattform — API-Key anlegen und sofort kopieren",
  "lib.setup.4.name": "Schlüssel einfügen und speichern",
  "lib.setup.4.desc":
    "Zurück in der Anwendung den Schlüssel einfügen und auf „Test connection“ klicken; sobald „Connected“ bestätigt wird, auf „Save current profile“ klicken — die KI ist damit eingerichtet.",
  "lib.setup.4.shot": "Verbindungstest bestanden — aktuelles Profil speichern",
  "lib.setup.5.name": "Überwachte Ordner einrichten",
  "lib.setup.5.desc":
    "Auf „Watch folders“ klicken und die Ordner hinzufügen, in denen Plasmide liegen. Bei jedem Start wird automatisch gescannt: neue Plasmide werden aufgenommen, gelöschte entfernt — ganz ohne manuelle Pflege.",
  "lib.setup.5.shot": "Überwachte Ordner — Neuzugänge werden aufgenommen, Gelöschtes entfernt, alles bleibt synchron",
  "lib.setup.note":
    "Mit konfigurierter KI erhalten neu aufgenommene Plasmide automatisch Tags. Ohne KI-Einrichtung funktionieren Aufnahme und Stöbern trotzdem; nur die Tags und der KI-Assistent sind dann nicht verfügbar.",

  "lib.daily.head": "Täglicher Workflow",
  "lib.daily.headEn": "TÄGLICHER WORKFLOW",
  "lib.daily.title": "Suchergebnisse direkt in Ihren Werkzeugen öffnen",
  "lib.daily.1.name": "Mit den bevorzugten Werkzeugen öffnen",
  "lib.daily.1.desc":
    "Rechtsklick auf ein beliebiges Plasmid → „Open with“: die Datei mit einem Klick an SnapGene (Karte) oder VS Code (Sequenz) übergeben und so in den bestehenden Workflow integrieren.",
  "lib.daily.2.name": "Tags selbst anpassen",
  "lib.daily.2.desc":
    "Tags lassen sich im Detailbereich jederzeit bearbeiten: fehlerhafte KI-Tags löschen und eigene ergänzen, etwa „verifiziert“.",
  "lib.daily.shot":
    "Kontextmenü — öffnen, Ordner anzeigen, an SnapGene / VS Code übergeben; Tags im Detailbereich rechts hinzufügen und entfernen",

  "lib.final.title": "Ein eingebautes Modul von GenePad, keine eigenständige Anwendung",
  "lib.final.desc":
    "Die Dateibibliothek ist im GenePad-Genkarten-Editor eingebaut: GenePad installieren oder aktualisieren, und sie steht in der Toolbox bereit. Während der öffentlichen Beta kostenlos, auf allen Plattformen.",
  "lib.final.cta": "Zurück zur Startseite",
  "lib.final.cta2": "Jetzt herunterladen",
  "lib.top.hint": "Direkt zu den Downloads",

  // 首页 NGS 数据查看推荐节
  "np.lead":
    "fastq.gz / fastq / fq.gz / fq-Dateien direkt öffnen — per Rechtsklick oder Drag-and-drop; Paired-end-Dateien werden automatisch zusammengeführt. Basenweise Qualität prüfen, variable Regionen per Aminosäure-Suche lokalisieren, mit Trim-Ankern trimmen und zum Abschluss einen Bibliotheks-Häufigkeitsbericht mit einem Klick erzeugen.",
  "np.c1": "fastq.gz · fq.gz ohne Entpacken",
  "np.c2": "Automatisches Paired-end-Zusammenführen",
  "np.c3": "Basenweise Qualität",
  "np.c4": "Trim-Anker + Häufigkeitsbericht",
  "np.cta": "Mehr erfahren",
  "np.safe": "In GenePad integriert · Kostenlose Beta · Alle Plattformen",

  // NGS 数据查看页
  "ngs.eyebrow": "NGS-Daten-Viewer",
  "ngs.title": (
    <>
      Sequenzierdaten der zweiten Generation (NGS)
      <br />
      direkt öffnen — durchsehen, suchen, zählen
    </>
  ),
  "ngs.lead":
    "GenePad öffnet fastq.gz / fastq / fq.gz / fq-Dateien direkt: im Datei-Explorer per Rechtsklick über „Open with“ GenePad wählen oder die Dateien einfach ins Programmfenster ziehen; bei Paired-end-Läufen R1- und R2-Datei gemeinsam hineinziehen, die Paarzuordnung wird automatisch erkannt. Anschließend die Reads einzeln durchsehen, basenweise Qualität und Zusammenführung prüfen; mit einem Aminosäure-Fragment die variable Zielregion lokalisieren, Trim-Anker setzen und die gesamte Datei im Stapel trimmen — am Ende entsteht mit einem Klick der Häufigkeitsbericht der Bibliothek.",
  "ngs.hero.shot":
    "FASTQ VIEWER — Paired-end-Reads automatisch zusammengeführt, Basen nach Qualität eingefärbt, rechts die Dateistatistik",

  "ngs.open.head": "Sequenzierdateien öffnen",
  "ngs.open.headEn": "FASTQ-DATEIEN ÖFFNEN",
  "ngs.open.title": "Rechtsklick oder Drag-and-drop — keine Kommandozeile nötig",
  "ngs.open.lead":
    "Vier Endungen werden unterstützt — fastq.gz, fastq, fq.gz und fq —, und gzip-komprimierte Dateien öffnen ohne vorheriges Entpacken. Nach der Installation bzw. Aktualisierung von GenePad wählen Sie einen der beiden Wege:",
  "ngs.open.1.name": "Rechtsklick → „Open with“",
  "ngs.open.1.desc":
    "Im Datei-Explorer die Sequenzierdatei rechtsklicken → „Open with“: GenePad direkt im Untermenü wählen oder in „Choose another app“ aus der Systemliste auswählen und als Standard eintragen — ab dann öffnet ein Doppelklick die Datei direkt.",
  "ngs.open.2.name": "Ins Fenster ziehen",
  "ngs.open.2.desc":
    "Eine oder mehrere Sequenzierdateien direkt ins GenePad-Fenster ziehen; sowohl die Willkommensseite als auch der Arbeitsbereich akzeptieren Drag-and-drop.",
  "ngs.open.1.shot": "Kontextmenü — „Open with“ → GenePad",
  "ngs.open.1.shot2": "„Choose another app“ — GenePad in der Systemliste wählen, optional als Standard",
  "ngs.open.2.shot": "Drag-and-drop — mehrere Sequenzierdateien gemeinsam hineinziehen",

  "ngs.pair.head": "Paired-end",
  "ngs.pair.headEn": "PAIRED-END",
  "ngs.pair.title": "Partnerdateien werden automatisch erkannt und gepaart",
  "ngs.pair.desc":
    "R1- und R2-Datei gemeinsam ins Fenster ziehen — GenePad paart sie anhand der ID des ersten Reads; landen mehrere Paare gleichzeitig im Fenster, listet ein Bestätigungsdialog sie zur manuellen Anpassung auf, oder ein Klick auf „Auto-pair“ erledigt alles. Jedes Paar öffnet dann als ein Paired-end-Datensatz, in der Oberfläche als „Paired-end“ gekennzeichnet, mit einem Klick über „Swap R1/R2“ in der Symbolleiste.",
  "ngs.pair.shot": "PAIR NGS FILES — Paarbildung anhand der ersten Read-ID, von Hand anpassbar",

  "ngs.reads.head": "Read für Read durchsehen",
  "ngs.reads.headEn": "READS & QUALITÄT",
  "ngs.reads.title": "Qualität und Zusammenführung jedes Reads auf einen Blick",
  "ngs.reads.lead":
    "Die Hauptansicht listet jeden sequenzierten Read von oben nach unten auf, während das Eigenschaften-Panel die Statistik der gesamten Datei zusammenfasst:",
  "ngs.reads.1.name": "Automatisches Zusammenführen der Partnerreads",
  "ngs.reads.1.desc":
    "Paired-end-Reads werden einzeln automatisch zusammengeführt (Merge); jeder Read zeigt Überlappungslänge und Übereinstimmung (z. B. Overlap 135bp · 99% identity) — das Merge-Ergebnis ist auf einen Blick erkennbar.",
  "ngs.reads.2.name": "Basenweise Sequenzierqualität",
  "ngs.reads.2.desc":
    "Jede Base wird nach Phred-Qualität eingefärbt — Grün ab 30, Orange 20–29, Rot unter 20 —, sodass sich Bereiche niedriger Qualität in den Qualitätsbalken direkt ablesen lassen, ganz ohne einzelne Zahlen.",
  "ngs.reads.3.name": "Dateistatistik",
  "ngs.reads.3.desc":
    "Das Eigenschaften-Panel fasst Read-Anzahl, Basen gesamt, Read-Länge, mittlere Qualität, Qualitätsverteilung, GC-Gehalt und Kodierung zusammen, gruppiert nach Overall / R1 / R2; sehr große Dateien laden nur einen Vorschauausschnitt, während Statistik und Analyse weiterhin die gesamte Datei abdecken.",
  "ngs.reads.shot":
    "READS & QUALITY — Reads von oben nach unten durchsehen: Partner-Merge, basenweise Qualitätsbalken und rechts die Dateistatistik",

  "ngs.aa.head": "Aminosäure-Suche",
  "ngs.aa.headEn": "SUCHE ÜBER AMINOSÄUREN",
  "ngs.aa.title": "Die variable Zielregion über ein Proteinfragment lokalisieren",
  "ngs.aa.desc":
    "Das Suchfeld unten in den AA-Modus schalten und ein Aminosäurefragment eingeben (z. B. MATNNQ): Die zusammengeführten Reads werden ins Protein übersetzt und Peptid für Peptid verglichen, jeder Treffer wird direkt in der Sequenz eingerahmt. Bei Bibliothekssequenzierungen sind die Flanken konserviert, die Mitte variabel — mit einem bekannten konservierten Peptid als Abfrage findet sich die jeweilige variable Zielregion unter Tausenden von Reads.",
  "ngs.aa.shot": "AA SEARCH — Aminosäurefragment eingeben; Treffer-Peptide sind in der Übersetzung farbig umrahmt",

  "ngs.trim.head": "Trim-Anker",
  "ngs.trim.headEn": "TRIM-ANKER",
  "ngs.trim.title": "Anker setzen und die gesamte Datei präzise auf den Zielabschnitt trimmen",
  "ngs.trim.desc":
    "Die konservierten Flanken als linken und rechten Trim-Anker setzen und auf „Trim“ klicken — die gesamte Sequenzierdatei wird daraufhin im Stapel getrimmt, sodass nur die variable Region zwischen den Ankern übrig bleibt. Das Eigenschaften-Panel meldet live die Erfolgsquote sowie, wie viele Reads aussortiert wurden — wegen verfehlter Anker oder zu kurzer Fragmente; die getrimmten Reads lassen sich mit einem Klick exportieren („Export processed reads“) — für nachgelagerte Analysen oder zur Einreichung.",
  "ngs.trim.shot": "TRIM ANCHORS — linker und rechter Anker rahmen das Zielfenster; die Erfolgsquote wird live angezeigt",

  "ngs.report.head": "Häufigkeitsanalyse der Bibliothek",
  "ngs.report.headEn": "BIBLIOTHEKSANALYSE",
  "ngs.report.title": "Häufigkeitsbericht für die gesamte Datei mit einem Klick",
  "ngs.report.desc":
    "Auf „Sequence analysis“ klicken und die getrimmten Daten auswerten lassen: Standardmäßig wird die gesamte Datei analysiert — Dutzende Millionen Reads müssen nie vollständig in den Speicher geladen werden —, dabei werden für jede eindeutige Sequenz Vorkommen und Häufigkeit gezählt, wahlweise mit oder ohne die Anker an den Enden. Das Ergebnis ist ein grafischer Bericht — ein Histogramm der Top-Sequenzen (DNA oder AA) plus einer Tabelle mit Länge, Anzahl, Häufigkeit und +1-Leserahmen-Übersetzung jeder Sequenz —, daneben ein vollständiger CSV-Export, der sich direkt in Excel öffnen lässt. Ein einfacher Häufigkeitsbericht der Bibliothek, fertig.",
  "ngs.report.shot1": "SEQUENCE ANALYSIS — standardmäßig die gesamte Datei; Anker behalten oder entfernen",
  "ngs.report.shot2": "ANALYSIS REPORT — Histogramm der Top-Sequenzen und vollständige Häufigkeitstabelle (CSV)",

  "ngs.video.head": "Video-Tutorial",
  "ngs.video.headEn": "VIDEO-TUTORIAL",
  "ngs.video.lead":
    "Lieber zuschauen? Diese komplette Vorführung läuft direkt auf der Seite — vom Öffnen der Sequenzierdateien und Paaren der Partnerreads bis zum Trimmen der Anker und dem Häufigkeitsbericht, Schritt für Schritt an echten Daten.",
  "ngs.video.caption": "VIDEO TUTORIAL — kompletter Ablauf: öffnen → paaren → durchsehen → suchen → trimmen → Bericht",

  "ngs.final.title": "In GenePad integriert — keine eigenständige Anwendung",
  "ngs.final.desc":
    "Die NGS-Datenansicht steckt im GenePad-Genkarten-Editor: GenePad installieren oder aktualisieren, und Sequenzierdateien öffnen sich direkt — neben Kartenbearbeitung, Sanger-Chromatogramm-Abgleich und mehr in derselben Anwendung. Während der öffentlichen Beta kostenlos, auf allen Plattformen.",
  "ngs.final.cta": "Zurück zur Startseite",
  "ngs.final.cta2": "Jetzt herunterladen",
  "ngs.top.hint": "Direkt zu den Downloads",

  // Tutorial 页（教程中心：持续收录各功能的使用教程）
  "tut.eyebrow": "Tutorials",
  "tut.title": (
    <>
      Von der Konfiguration bis zur Alltagsanalyse,
      <br />
      Schritt für Schritt illustriert
    </>
  ),
  "tut.lead":
    "Hier versammeln sich die illustrierten GenePad-Tutorials, und nach und nach kommen neue hinzu: DeepSeek anbinden, um die KI-Funktionen freizuschalten; Hunderte Plasmide in der Dateibibliothek ordnen; einen NGS-Datensatz von fastq.gz bis zum Häufigkeitsbericht führen — und mehr. Jeder Schritt zeigt die echte Oberfläche; einfach der Reihe nach folgen.",
  "tut.toc.hint": "Auf eine Kachel klicken, um das Tutorial zu öffnen",
  "tut.card.view": "Tutorial lesen",
  "tut.prev": "Zurück",
  "tut.next": "Weiter",
  "tut.backTo": "Alle Tutorials",
  "tut.toc.ai.name": "KI einrichten (DeepSeek)",
  "tut.toc.ai.desc":
    "Einstellungen öffnen, Profil anlegen, API-Schlüssel holen und speichern — fünf Schritte zum KI-Assistenten und zu automatischen Plasmid-Tags.",
  "tut.toc.ai.en": "KI EINRICHTEN",
  "tut.toc.lib.name": "Dateibibliothek",
  "tut.toc.lib.desc":
    "Überwachte Ordner nehmen Plasmide automatisch auf; nach Projekt, Pfad oder Tag stöbern und Plasmide über den KI-Assistenten per Beschreibung finden.",
  "tut.toc.lib.en": "DATEIBIBLIOTHEK",
  "tut.toc.ngs.name": "NGS-Datenanalyse",
  "tut.toc.ngs.desc":
    "fastq.gz hineinziehen und loslegen: automatisches Paired-end-Matching, basenweise Qualität, Aminosäure-Suche, Anker-Trimming und Häufigkeitsbericht.",
  "tut.toc.ngs.en": "NGS-ANALYSE",
  "tut.toc.lang.name": "Beliebige Sprache nutzen",
  "tut.toc.lang.desc":
    "Einstellungen → Language → AI Translate: Zielsprache eingeben, und GenePad erzeugt das Sprachpaket und stellt die gesamte Oberfläche um — Französisch, Russisch und mehr.",
  "tut.toc.lang.en": "BELIEBIGE SPRACHE",

  // 教程分类（目录页分区 + 侧边导航）
  "tut.toc.langpack.name": "Sprache der Oberfläche einstellen",
  "tut.toc.langpack.desc":
    "Einstellungen → Language öffnen: zwischen den eingebauten Sprachen Chinesisch/Englisch per Klick wechseln oder ein offizielles Sprachpaket für Deutsch, Russisch, Japanisch, Koreanisch oder Französisch importieren.",
  "tut.toc.langpack.en": "UI LANGUAGE",
  "tut.cat.switch.name": "Umstieg",
  "tut.cat.switch.en": "SWITCHING GUIDES",
  "tut.cat.switch.desc": "Bestehende SnapGene-Workflows zu GenePad übertragen: Dateien interoperabel, Alltag übernommen, kein Entweder-oder",

  "tut.cat.gs.name": "Erste Schritte",
  "tut.cat.gs.en": "ERSTE SCHRITTE",
  "tut.cat.gs.desc": "Der Reihe nach starten: erst die KI anbinden, dann die Plasmid-Dateien in die Bibliothek bringen.",
  "tut.cat.analysis.name": "Datenanalyse",
  "tut.cat.analysis.en": "DATENANALYSE",
  "tut.cat.analysis.desc": "Sequenzdaten ansehen, durchsuchen und quantifizieren.",

  // 教程二：配置 AI
  "tut.ai.head": "Tutorial 2 · KI einrichten",
  "tut.ai.headEn": "TUTORIAL 2 · DEEPSEEK EINRICHTEN",
  "tut.ai.title": "DeepSeek in fünf Schritten anbinden — für KI-Assistenten und automatische Tags",
  "tut.ai.lead":
    "KI-Assistent und automatische Plasmid-Tags werden von einem großen Sprachmodell angetrieben; empfohlen ist DeepSeek. Nach den fünf Schritten unten steuern Sie Sequenzen und Annotationen in natürlicher Sprache, und Plasmide erhalten beim Öffnen oder Aufnehmen automatisch ihre Eigenschafts-Tags.",
  "tut.ai.1.name": "Einstellungen öffnen",
  "tut.ai.1.desc": "GenePad starten und oben rechts auf dem Willkommensbildschirm auf das Zahnrad-Symbol klicken — das Einstellungsfenster öffnet sich.",
  "tut.ai.1.shot": "Willkommensbildschirm — oben rechts auf das Zahnrad-Symbol klicken",
  "tut.ai.2.name": "AI Settings öffnen, Profil anlegen",
  "tut.ai.2.desc": "Im linken Bereich des Einstellungsfensters „AI Settings“ wählen und dann auf „New config“ klicken, um ein KI-Profil anzulegen.",
  "tut.ai.2.shot": "KI-Einstellungen — „AI Settings“ wählen, dann auf „New config“ klicken",
  "tut.ai.3.name": "Profil ausfüllen",
  "tut.ai.3.desc":
    "Dem Profil einen Namen geben, als Anbieter DeepSeek und als Modell deepseek-v4-flash einstellen und die API-URL unverändert lassen. Dann neben dem API-Key-Feld auf „Get“ klicken — der Browser öffnet die DeepSeek-Plattform.",
  "tut.ai.3.shot": "Namen und Modell eintragen — neben dem API-Key auf „Get“ klicken",
  "tut.ai.4.name": "DeepSeek-API-Schlüssel holen",
  "tut.ai.4.desc":
    "Auf der DeepSeek-Plattform ein Konto registrieren und Guthaben aufladen, auf „Create API key“ klicken, benennen und bestätigen; der Schlüssel wird nur einmal angezeigt — bitte sofort kopieren.",
  "tut.ai.5.name": "Schlüssel einfügen und speichern",
  "tut.ai.5.desc":
    "Zurück in GenePad den Schlüssel einfügen und auf „Test connection“ klicken. Sobald die Verbindung erfolgreich ist, auf „Save current config“ klicken — damit ist die KI eingerichtet.",
  "tut.ai.note":
    "Einmal konfiguriert, dauerhaft einsatzbereit — der Schlüssel bleibt ausschließlich auf dem eigenen Rechner. Das KI-Symbol auf der Willkommensseite und im Arbeitsbereich öffnet den Assistenten, und geöffnete oder aufgenommene Plasmide erhalten automatisch ihre Eigenschafts-Tags.",

  // 教程三：基因文件库
  "tut.lib.head": "Tutorial 3 · Dateibibliothek",
  "tut.lib.headEn": "TUTORIAL 3 · DATEIBIBLIOTHEK",
  "tut.lib.title": "Hunderte Plasmide in einer durchsuchbaren Bibliothek ordnen",
  "tut.lib.lead":
    "Die Dateibibliothek steckt in der Toolbox: Sie verschiebt und kopiert nie etwas, sondern legt über die verstreuten Plasmide einen einzigen Index. Die Schritte unten führen von der automatischen Aufnahme bis zum Auffinden des Zielplasmids mit einem einzigen Satz.",
  "tut.lib.1.name": "Überwachte Ordner einrichten — Plasmide nehmen sich selbst auf",
  "tut.lib.1.desc":
    "Dateibibliothek öffnen → „Watch folders“ → die Ordner hinzufügen, in denen Plasmide liegen. Bei jedem Start wird neu gescannt: neue Plasmide wandern automatisch in die Bibliothek, gelöschte fallen heraus — ganz ohne manuelle Pflege.",
  "tut.lib.2.name": "Nach Projekt, Pfad oder Tag suchen",
  "tut.lib.2.desc":
    "Projekt anlegen und Plasmide hineinziehen — damit ist alles sortiert; oder Dateien nach Speicherpfad durchstöbern, ohne etwas zu verschieben; und mit konfigurierter KI trägt jedes Plasmid seine Eigenschafts-Tags — ein Klick darauf filtert alle passenden Plasmide heraus.",
  "tut.lib.3.name": "Die KI erzeugt Eigenschafts-Tags automatisch",
  "tut.lib.3.desc":
    "Nach dem Abschluss von Tutorial 1 entstehen beim Scannen oder Öffnen eines Plasmids automatisch Tags wie lentiviral, sgRNA oder ampicillin; über den Tabellenkopf im Stapel aktualisieren — nur fehlende Tags ergänzen oder alles neu generieren.",
  "tut.lib.4.name": "Plasmide über den KI-Assistenten finden",
  "tut.lib.4.desc":
    "Den Bedarf einfach beschreiben, etwa „finde ein Typ-I-CRISPR-Plasmid“: Der Assistent durchsucht die gesamte Bibliothek und listet Kandidaten mit deren Eigenschaften und empfohlener Verwendung auf.",
  "tut.lib.5.name": "Suchergebnisse sofort einsetzen",
  "tut.lib.5.desc":
    "Rechtsklick auf ein beliebiges Plasmid → „Open with“ übergibt es an SnapGene (Karten) oder VS Code (Sequenzen); im Detailbereich lassen sich Tags bearbeiten — fehlerhafte löschen, eigene wie „verifiziert“ ergänzen.",
  "tut.lib.note":
    "Die Bibliothek ist nur ein Index — Ihre Dateien bleiben unangetastet. Die KI ist optional: Auch ohne sie funktionieren Aufnahme und Stöbern; nur automatische Tags und KI-Suche entfallen.",

  // 教程四：NGS 文件分析
  "tut.ngs.head": "Tutorial 4 · NGS-Datenanalyse",
  "tut.ngs.headEn": "TUTORIAL 4 · NGS-ANALYSE",
  "tut.ngs.title": "Von fastq.gz zum Häufigkeitsbericht der Bibliothek",
  "tut.ngs.lead":
    "Keine Kommandozeile nötig — Sequenzierdateien ins Fenster ziehen und loslegen. Die sechs Schritte unten decken den kompletten Ablauf ab: Öffnen, Paaren, Qualitätsprüfung, Suchen, Trimmen und Häufigkeitsanalyse; am Ende folgt ein vollständiges Video.",
  "tut.ngs.1.name": "Sequenzierdateien öffnen",
  "tut.ngs.1.desc":
    "Eine oder mehrere Sequenzierdateien direkt ins GenePad-Fenster ziehen; oder die Datei im Datei-Explorer rechtsklicken und „Open with“ → GenePad wählen. fastq.gz, fastq, fq.gz und fq werden unterstützt — gzip-Archive müssen nicht entpackt werden.",
  "tut.ngs.2.name": "Paired-end-Dateien finden automatisch zusammen",
  "tut.ngs.2.desc":
    "R1- und R2-Datei gemeinsam hineinziehen — GenePad ordnet sie anhand der ID des ersten Reads zu; bei mehreren Paaren auf einmal erscheint ein Bestätigungsdialog, „Auto-pair“ sortiert mit einem Klick, danach öffnet jedes Paar als ein Paired-end-Datensatz.",
  "tut.ngs.3.name": "Reads durchsehen und Qualität prüfen",
  "tut.ngs.3.desc":
    "Die Hauptansicht listet jeden Read auf: Basen werden nach Phred-Qualität eingefärbt, Partnerreads automatisch zusammengeführt — mit angezeigter Überlappungslänge und Übereinstimmung; das rechte Panel fasst Read-Anzahl, GC-Gehalt und mehr zusammen.",
  "tut.ngs.4.name": "Variable Regionen per Aminosäure-Suche finden",
  "tut.ngs.4.desc":
    "Das Suchfeld unten in den AA-Modus schalten und ein bekanntes konserviertes Peptid eingeben (z. B. MATNNQ): Die zusammengeführten Reads werden ins Protein übersetzt und Zeile für Zeile abgeglichen, Treffer werden an Ort und Stelle eingerahmt — die gesuchte variable Region taucht aus Tausenden von Reads heraus.",
  "tut.ngs.5.name": "Anker setzen und im Stapel trimmen",
  "tut.ngs.5.desc":
    "Die konservierten Sequenzen links und rechts des Zielabschnitts als Trim-Anker setzen, dann auf „Trim“ klicken — die gesamte Datei wird auf einmal bearbeitet und behält nur die variable Region zwischen den Ankern; das Panel meldet die Erfolgsquote live, und die getrimmten Reads lassen sich mit einem Klick exportieren.",
  "tut.ngs.6.name": "Häufigkeitsbericht erzeugen",
  "tut.ngs.6.desc":
    "Auf „Sequence analysis“ klicken: GenePad zählt Vorkommen und Häufigkeit jeder eindeutigen Sequenz über die gesamte Datei, erzeugt ein Histogramm der Top-Sequenzen samt Einzeldetails und exportiert die vollständige Tabelle als CSV, die sich direkt in Excel öffnen lässt. Ein einfacher Häufigkeitsbericht der Bibliothek, fertig.",

  // 教程五：配置任意语言
  "tut.lang.head": "Tutorial 5 · Beliebige Sprache nutzen",
  "tut.lang.headEn": "TUTORIAL 5 · BELIEBIGE SPRACHE",
  "tut.lang.title": "Die Oberfläche per KI in jede Sprache übersetzen",
  "tut.lang.lead":
    "GenePad bringt chinesische und englische Oberflächen mit — jede weitere Sprache beginnt hier: Einstellungen → Language öffnen, auf „AI Translate“ klicken und die Zielsprache eingeben; das Sprachpaket wird automatisch erzeugt und angewendet. Bitte zuerst Tutorial 1 abschließen, damit die KI konfiguriert ist.",
  "tut.lang.1.name": "Einstellungen öffnen",
  "tut.lang.1.desc": "Wie in Tutorial 1: GenePad starten und oben rechts auf dem Willkommensbildschirm auf das Zahnrad-Symbol klicken — das Einstellungsfenster öffnet sich.",
  "tut.lang.2.name": "Language-Einstellungen öffnen, auf „AI Translate“ klicken",
  "tut.lang.2.desc":
    "Im linken Bereich „Language“ wählen und auf „AI Translate“ klicken. Auf dieser Seite lassen sich Sprachdateien auch von Hand importieren / exportieren.",
  "tut.lang.2.shot": "Spracheinstellungen — „Language“ wählen, dann auf „AI Translate“ klicken",
  "tut.lang.3.name": "Zielsprache eingeben und übersetzen",
  "tut.lang.3.desc":
    "Sprachname und Code eingeben (z. B. français und fr), dann auf „Translate“ klicken: Die konfigurierte KI übersetzt die eingebaute Sprachdatei — lange Texte werden abschnittsweise bearbeitet, fehlgeschlagene Abschnitte automatisch erneut versucht, und am Ende wird das Paket importiert und angewendet.",
  "tut.lang.3.shot": "Sprachname und Code eingeben — auf „Translate“ klicken",
  "tut.lang.4.name": "Die gesamte Oberfläche wechselt",
  "tut.lang.4.desc":
    "Sobald die Übersetzung fertig ist, wechselt die komplette Oberfläche sofort. Hier am Beispiel Französisch: Jedes Menü, jede Einstellung und jede Meldung ist lokalisiert.",
  "tut.lang.4.shot": "Die gesamte Oberfläche auf Französisch umgestellt",
  "tut.lang.5.name": "Weitere Sprachen auf dieselbe Weise ergänzen",
  "tut.lang.5.desc":
    "Russisch, Spanisch oder jede andere Sprache funktioniert genauso; importierte Sprachpakete lassen sich auf der Language-Seite wählen, verwalten oder löschen.",
  "tut.lang.5.shot": "Russisch, auf dieselbe Weise ergänzt",
  "tut.lang.note":
    "Die KI-Übersetzung nimmt die eingebaute chinesische Sprachdatei als Quelle; liest sich ein Begriff seltsam, exportieren Sie die Sprachdatei, korrigieren Sie ihn von Hand und importieren Sie sie erneut.",

  // Tutorial 1: Oberflächensprache einstellen (eingebaute Sprachen + offizielle Sprachpakete)
  "tut.langpack.head": "Tutorial 6 · Sprache der Oberfläche einstellen",
  "tut.langpack.headEn": "TUTORIAL 6 · UI LANGUAGE",
  "tut.langpack.title": "In zwei Schritten zur eigenen Sprache",
  "tut.langpack.lead":
    "GenePad bringt chinesische und englische Oberflächen mit; Deutsch, Russisch, Japanisch, Koreanisch und Französisch werden über offizielle Sprachpakete bereitgestellt — herunterladen, in den Einstellungen importieren, fertig. Dieselben Schritte gelten für eigene, per KI-Übersetzung erzeugte Sprachpakete.",
  "tut.langpack.1.name": "Einstellungen öffnen",
  "tut.langpack.1.desc": "Starten Sie GenePad und klicken Sie auf das Zahnradsymbol oben rechts im Willkommensbildschirm.",
  "tut.langpack.1.shot": "Willkommensbildschirm — Zahnradsymbol oben rechts anklicken",
  "tut.langpack.2.name": "Spracheinstellungen öffnen",
  "tut.langpack.2.desc":
    "Wählen Sie in der linken Seitenleiste des Einstellungsfensters „Language“: ein Klick auf English oder 中文 wechselt zwischen den eingebauten Sprachen; importierte Sprachpakete erscheinen in derselben Liste.",
  "tut.langpack.2.shot": "Spracheinstellungen — ein Klick auf eine Sprache wechselt sofort; die Schaltflächen darunter importieren / exportieren Sprachdateien",
  "tut.langpack.3.name": "Sprachpaket herunterladen und importieren",
  "tut.langpack.3.desc":
    "Laden Sie unten das .json-Sprachpaket Ihrer Sprache herunter, klicken Sie auf „Import Language File“ und wählen Sie die heruntergeladene Datei aus. Nach dem Import erscheint die Sprache in der Liste — ein Klick schaltet die gesamte Oberfläche um; das Papierkorb-Symbol rechts entfernt ein importiertes Paket.",
  "tut.langpack.3.shot": "Importiert — die neue Sprache erscheint in der Liste; ein Klick genügt",
  "tut.langpack.4.name": "Die gesamte Oberfläche wechselt",
  "tut.langpack.4.desc":
    "Nach der Auswahl wechselt die gesamte Oberfläche sofort — jedes Menü, jede Einstellung und jede Meldung ist lokalisiert. Die fünf offiziellen Sprachpakete in Aktion:",
  "tut.langpack.4.shot1": "Französische Oberfläche",
  "tut.langpack.4.shot2": "Koreanische Oberfläche",
  "tut.langpack.4.shot3": "Russische Oberfläche",
  "tut.langpack.4.shot4": "Deutsche Oberfläche",
  "tut.langpack.4.shot5": "Japanische Oberfläche",
  "tut.lang.dl.hint":
    "Keine Lust, die KI einzurichten? Laden Sie einfach ein offizielles Sprachpaket (Deutsch, Russisch, Japanisch, Koreanisch, Französisch) herunter und importieren Sie es direkt — kompatibel mit GenePad 0.7.x.",
  "tut.langpack.dl.title": "Offizielle Sprachpakete herunterladen (.json)",
  "tut.langpack.dl.hint": "Kompatibel mit GenePad 0.7.x; kein Entpacken nötig — die Datei direkt wie in Schritt 3 importieren.",
  "tut.langpack.dl.btn": "Herunterladen",
  "tut.langpack.note":
    "Sprachpakete enthalten nur Oberflächentexte — niemals Sequenzen oder Dateidaten. Offizielle Pakete werden mit jeder Version aktualisiert; zum Aktualisieren einfach die neue Datei importieren. Weitere Sprache gewünscht? Tutorial 4 erzeugt Sprachpakete für beliebige Sprachen per KI-Übersetzung.",

  // Tutorial 1: Von SnapGene wechseln (Migrationskategorie, auf der Hub-Seite zuerst)
  "title.tutorial.snapgene": "SnapGene-Alternative - GenePad | Kostenloser Plasmidkarten-Editor für alle Plattformen",
  "tut.toc.snapgene.name": "Von SnapGene wechseln",
  "tut.toc.snapgene.desc":
    "Vorhandene .dna-Dateien direkt öffnen und speichern, den Klonierungs-Alltag vollständig abdecken — dazu NGS, Dateibibliothek und mehr",
  "tut.toc.snapgene.en": "SWITCH FROM SNAPGENE",
  "tut.snapgene.head": "Tutorial 1 · Von SnapGene wechseln",
  "tut.snapgene.headEn": "TUTORIAL 1 · SNAPGENE ALTERNATIVE",
  "tut.snapgene.title": "Von SnapGene zu GenePad: Leitfaden für den Workflow-Wechsel",
  "tut.snapgene.lead":
    "Schon mit SnapGene unterwegs? Dieser Leitfaden zeigt, wie viel Alltag GenePad übernimmt: vorhandene .dna-Dateien lassen sich direkt öffnen und speichern, Karten, Restriktionsschnitte, Primer und Sanger-Alignment verhalten sich wie gewohnt — dazu Fähigkeiten, die SnapGene nicht hat: NGS-Datenansicht, Gen-Dateibibliothek und KI-Assistent. Beide Tools schließen sich nicht aus: Mit „Öffnen mit“ gibt GenePad Dateien jederzeit an SnapGene zurück.",
  "tut.snapgene.1.name": "Vorhandene .dna-Dateien direkt öffnen",
  "tut.snapgene.1.desc":
    "SnapGene-.dna-Plasmiddateien einfach in GenePad ziehen: Hauptsequenz, Topologie, Features, Primer und Notizen werden unverändert eingelesen; bearbeitete Dateien lassen sich wieder als .dna speichern — für Kollegen, die weiter mit SnapGene arbeiten, gibt es kein Formatproblem.",
  "tut.snapgene.1.shot": "Eine .dna-Plasmiddatei von Addgene direkt geöffnet: Ring/linear per Klick, Features nach Kategorie gefärbt",
  "tut.snapgene.2.name": "Karte, Sequenz und Restriktionsstellen",
  "tut.snapgene.2.desc":
    "Karte und Sequenz sind bidirektional verknüpft: Eintrag in der Annotationstabelle wählen, und die Sequenzansicht springt zum Abschnitt — Länge, GC-Gehalt und Tm werden angezeigt. Schnittstellen liegen direkt auf der Doppelstrang-Sequenz; per Hover erkennt man Erkennungssequenz, Strang, Schnittpositionen und 5′-Überhang.",
  "tut.snapgene.2.shot1": "Eintrag in der Annotationstabelle gewählt — die Sequenzansicht springt und zeigt Länge, GC-Gehalt und Tm",
  "tut.snapgene.2.shot2": "Schnitt-Hover-Details: Erkennungssequenz, Schnittpositionen und 5′-Überhang",
  "tut.snapgene.3.name": "Sanger-Sequenzierung vergleichen",
  "tut.snapgene.3.desc":
    "AB1-Chromatogrammdateien importieren: Chromatogramm, Reads und Referenzsequenz werden basenweise ausgerichtet; Übereinstimmungsrate und E-Wert werden angezeigt, Mismatchstellen rot markiert.",
  "tut.snapgene.3.shot": "AB1-Chromatogramm basenweise mit der Referenz ausgerichtet, Mismatches rot markiert",
  "tut.snapgene.4.name": "Gängige Elemente und sgRNA-Design",
  "tut.snapgene.4.desc":
    "Beim Öffnen der Karte werden Promotoren, Resistenzgene und Origins automatisch markiert — die integrierte Elementbibliothek umfasst 20 Kategorien, jeder Eintrag mit NCBI-Zugangsnummer nachvollziehbar. Sequenz markieren, Rechtsklick, sgRNA entwerfen: 12 Erkennungslayouts inklusive SpCas9, xCas9, Cas12a/b und TnpB; PAM-Richtung, Seed-Länge und Off-Target-Filter sind konfigurierbar, Kandidaten gelangen mit einem Klick zurück auf die Karte.",
  "tut.snapgene.4.shot": "sgRNA-Design direkt aus dem Kontextmenü: 12 Erkennungslayouts, Kandidaten per Klick auf die Karte",
  "tut.snapgene.5.name": "Gelelektrophorese-Simulation und Proteineigenschaften",
  "tut.snapgene.5.desc":
    "Simulation für Agarosegele und SDS-PAGE: gängige Größenstandards wie Trans2K® sind integriert, Banden lassen sich vor dem Lauf abschätzen. Mit gewählter CDS werden Molekulargewicht, isoelektrischer Punkt (19 Algorithmen), GRAVY, aliphatischer Index und Extinktionskoeffizient in Echtzeit berechnet.",
  "tut.snapgene.5.shot1": "DNA-Gel-Simulation: Trans2K®-Standard, Verdau- oder PCR-Produkte als Spur",
  "tut.snapgene.5.shot2": "Proteineigenschaften: Molekulargewicht, pI, GRAVY, aliphatischer Index und Extinktionskoeffizient",
  "tut.snapgene.6.name": "NGS-Daten ansehen",
  "tut.snapgene.6.desc":
    "fastq.gz / fastq / fq.gz / fq direkt öffnen (ohne vorheriges Entpacken): Paired-end R1/R2 werden automatisch gepaart und Read für Read zusammengefügt, jede Base nach Phred-Qualität gefärbt; Suche über Aminosäurefragmente, Trimmen mit Ankern und Bibliotheks-Anreicherungsbericht (CSV-Export).",
  "tut.snapgene.6.shot": "Paired Reads werden einzeln zusammengefügt, Basen nach Qualität gefärbt, Statistiken rechts",
  "tut.snapgene.7.name": "Gen-Dateibibliothek und KI-Assistent",
  "tut.snapgene.7.desc":
    "Überall verstreute Plasmiddateien in einem Index bündeln (nur Index — Originaldateien bleiben unberührt), die KI erzeugt Eigenschafts-Tags, überwachte Ordner nehmen neue Dateien automatisch auf. Der KI-Assistent findet Dateien nach einem Satz und beantwortet Fragen zu gängigen Elementen.",
  "tut.snapgene.7.shot": "Gen-Dateibibliothek: KI-Tags, Plasmide nach Tag oder Projekt suchen",
  "tut.snapgene.8.name": "Sprachen und „Öffnen mit“",
  "tut.snapgene.8.desc":
    "Sechs Sprachen bereits integriert (Chinesisch, Englisch, Japanisch, Französisch, Deutsch, Russisch) plus KI-übersetzte Pakete für jede weitere Sprache; per Rechtsklick lassen sich Dateien jederzeit an SnapGene, VS Code oder andere Programme übergeben — GenePad ergänzt, statt zu ersetzen.",
  "tut.snapgene.8.shot1": "Spracheinstellungen: sechs integrierte Sprachen, Sprachpakete importieren oder per KI erzeugen",
  "tut.snapgene.8.shot2": "„Öffnen mit“: Dateien per Klick an SnapGene, VS Code und andere Tools übergeben",
  "tut.snapgene.note":
    "Lizenz: GenePad befindet sich in der kostenlosen öffentlichen Beta; nach der Beta bleiben bestehende Funktionen wie Ansehen, Bearbeiten und Speichern von Karten kostenlos. Akademische Nutzer (Hochschulen, Krankenhausgruppen, iGEM, Studierende) haben bis zum 31. Dezember 2027 automatisch freien Zugang — keine Anmeldung nötig; die kommerzielle Nutzung wird durch das kommende GenePad Pro abgedeckt. Molekulares Klonen im Werkzeugkasten ist bereits mit Teilen der Funktionalität verfügbar, der komplette Workflow befindet sich noch in Entwicklung.",

  "tut.final.title": "Alles aus diesen Tutorials steckt in GenePad — keine Zusatzsoftware",
  "tut.final.desc":
    "GenePad installieren oder aktualisieren und einfach mitmachen: KI-Assistent, Dateibibliothek und NGS-Datenansicht arbeiten in derselben Anwendung zusammen. Während der öffentlichen Beta kostenlos, auf allen Plattformen.",
  "tut.final.cta": "Zurück zur Startseite",
  "tut.final.cta2": "Jetzt herunterladen",
  "tut.top.hint": "Direkt zu den Downloads",

  // Stats 子页（实时数据）
  "st.eyebrow": "Live-Statistiken",
  "st.title": (
    <>
      Live-Installationsstatistik,
      <br />
      werden Sie der nächste Nutzer
    </>
  ),
  "st.lead":
    "Diese Zahlen stammen aus den anonymen Nutzungsstatistiken innerhalb der GenePad-Anwendung: Jede Installation zählt als ein einziger zufälliger Bezeichner — ohne Sequenzen, Dateien oder persönliche Informationen jeglicher Art. Die Daten aktualisieren sich automatisch mit jedem Bericht; für die Nutzung von GenePad ist keine Registrierung nötig.",
  "st.k.installs": "Installationen gesamt",
  "st.k.active30": "Aktiv · 30 Tage",
  "st.k.active7": "Aktiv · 7 Tage",
  "st.k.hours": "Nutzungszeit gesamt",
  "st.k.hoursUnit": "Stunden",
  "st.chart.title": "Neuinstallationen pro Woche",
  "st.chart.title.daily": "Neuinstallationen pro Tag",
  "st.chart.caption": "WÖCHENTLICHE NEUINSTALLATIONEN — nach dem Erststart jeder Installation (Mo–So, UTC)",
  "st.chart.caption.daily": "TÄGLICHE NEUINSTALLATIONEN — nach dem Erststartdatum jeder Installation (UTC-Kalendertage)",
  "st.chart.note.daily": "Der letzte Balken ist der laufende, noch unvollständige Tag — die Zahl wächst weiter.",
  "st.chart.note.byos": "Die Balkenfarben unterscheiden die Betriebssysteme — mit der Maus über ein Segment fahren, um die genauen Werte je System zu sehen.",
  "st.chart.total": "Gesamt",
  "st.chart.legend.aria": "Legende nach Betriebssystem",
  "st.tab.aria": "Zeitliche Auflösung",
  "st.tab.weekly": "Wöchentlich",
  "st.tab.daily": "Täglich",
  "st.os.title": "Installationen nach Betriebssystem",
  "st.os.other": "Andere",
  "st.updated": "Daten aktualisiert:",
  "st.note": "Methodik: zusammengefasst über zufällige Installations-Bezeichner. Wird die Statistik deaktiviert oder die Anwendung deinstalliert, endet die Zählung.",
  "st.error": "Die Statistiken sind momentan nicht erreichbar — bitte später neu laden und erneut versuchen.",
  "st.cta": "Kostenlos herunterladen — werden Sie der nächste Nutzer",
};

export default de;
