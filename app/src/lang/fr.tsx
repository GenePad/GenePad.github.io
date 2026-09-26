/* Dictionnaire français : clés en correspondance un à un avec la base zh ; importé par i18n.tsx. */
import type { ReactNode } from "react";
import type { TKey } from "../i18n";

const fr: Record<TKey, ReactNode> = {
  // Nav
  "nav.workbench": "Atelier",
  "nav.daynight": "Clair & sombre",
  "nav.sanger": "Traces Sanger",
  "nav.toolbox": "Boîte à outils",
  "nav.download": "Téléchargement",
  "nav.library": "Bibliothèque de fichiers",
  "nav.ngs": "Visualiseur NGS",
  "nav.tutorial": "Tutoriels",
  "nav.docs": "Docs techniques",
  "nav.projects": "Projets",
  "nav.stats": "Données en direct",
  "nav.cta": "Téléchargement / mise à niveau gratuits",
  "nav.lang": "EN",

  // Titres de page (le titre d’exécution suit la langue de l’interface ; le <title> statique
  // des pages HTML correspond à la langue de la page, ici le français pour fr.genepad.cn)
  "title.home": "GenePad - Éditeur de cartes géniques léger et multiplateforme",
  "title.library":
    "Bibliothèque de fichiers - GenePad | Recherche et gestion de fichiers plasmidiques",
  "title.ngs":
    "Visualiseur NGS - GenePad | Consultation de données FASTQ et analyse d’abondance de banques",
  "title.tutorial":
    "Tutoriels - GenePad | Configuration IA · Bibliothèque de fichiers · Analyse NGS",
  "title.tutorial.ai":
    "Tutoriel de configuration IA - GenePad | Obtenir et enregistrer une clé API DeepSeek",
  "title.tutorial.library":
    "Tutoriel bibliothèque de fichiers - GenePad | Import, recherche et étiquettes IA des plasmides",
  "title.tutorial.ngs":
    "Tutoriel d’analyse NGS - GenePad | Consultation fastq.gz et rapport d’abondance",
  "title.tutorial.lang":
    "Tutoriel toutes langues - GenePad | Traduire des paquets de langue avec l’IA",
  "title.tutorial.langpack": "Tutoriel langue de l’interface - GenePad | Langues intégrées et paquets officiels",
  "title.projects":
    "Projets - GenePad | Bibliothèques d’éléments plasmidiques et cartes de codons",
  "title.tech": "Documentation développeur - GenePad",
  "title.stats": "Données en direct - GenePad | Statistiques d’utilisation publiques",

  // Hero
  "hero.badge": "BÊTA PUBLIQUE GRATUITE",
  "hero.badgeEn": "Free Beta · Cross-platform",
  "hero.titleCn": "Éditeur de cartes géniques",
  "hero.titleEn": "Multiplateforme",
  "hero.desc":
    "Un éditeur de cartes géniques multiplateforme pensé pour le clonage moléculaire au quotidien : parcourez et modifiez les cartes de plasmides, gérez les annotations de séquences, analysez les sites de restriction et alignez les chromatogrammes Sanger — l’intégralité du flux de travail, de la conception du clonage à la vérification des résultats.",
  "hero.download": "Télécharger / mettre à niveau gratuitement",
  "hero.tour": "Voir l’interface",
  "hero.features": "CARTE · ANNOTATION · ENZYME · AMORCE · TRACE",
  "hero.platforms": "Disponible sur",
  "hero.langBtn": "Définir la langue",

  // Workbench
  "wb.eyebrow": "Atelier",
  "wb.title": <>Un atelier unifié pour les cartes, les séquences et l’analyse</>,
  "wb.lead":
    "Consultation des cartes, édition de séquences, inspection des sites de restriction et calcul des propriétés protéiques sont intégrés dans une même interface, chaque vue étant liée à l’objet sélectionné.",
  "wb.1.name": "Carte globale du plasmide",
  "wb.1.desc":
    "Basculez en un clic entre les vues circulaire et linéaire ; promoteurs, CDS, origines de réplication et signaux poly(A) sont colorés par catégorie, avec évitement automatique du chevauchement des étiquettes : la carte reste lisible même pour les vecteurs très riches en éléments.",
  "wb.2.name": "Carte → Séquence",
  "wb.2.desc":
    "La sélection d’une entrée dans le tableau des annotations positionne la vue de séquence sur la plage de bases correspondante, en affichant la longueur de la sélection, la teneur en GC et la valeur Tm ; carte et séquence restent liées dans les deux sens.",
  "wb.3.name": "Sites de restriction",
  "wb.3.desc":
    "Les sites de restriction sont annotés directement sur la séquence double brin ; le survol révèle la séquence de reconnaissance, l’orientation du brin et les positions de coupure sur les deux brins, avec marquage explicite des extrémités cohésives 5′, pour vérifier en un instant un schéma de clonage.",
  "wb.4.name": "Propriétés protéiques",
  "wb.4.desc":
    "La sélection d’un CDS calcule en temps réel la masse moléculaire, le point isoélectrique, l’indice GRAVY, l’indice aliphatique et le coefficient d’extinction ; 19 algorithmes de pI sont intégrés pour comparaison, le résultat affiché par défaut suivant l’algorithme recommandé par la littérature.",

  // DayNight
  "dn.eyebrow": "Clair & sombre",
  "dn.title": (
    <>
      Des thèmes clair et sombre,
      <br />
      conçus pour les longues sessions de travail
    </>
  ),
  "dn.lead":
    "Une même interface de recherche déclinée en deux palettes complètes : le thème clair convient à la projection, aux présentations et aux environnements diurnes ; le thème sombre réduit la fatigue visuelle lors des longues sessions nocturnes.",
  "dn.day": "JOUR",
  "dn.night": "NUIT",
  "dn.state.day": "▸ THÈME CLAIR — thème clair actif",
  "dn.state.night": "▸ THÈME SOMBRE — thème sombre actif",
  "dn.caption.day": "DAY MODE — le même vecteur, vue complète en thème clair",
  "dn.caption.night":
    "NIGHT MODE — cartes, séquences et sites de restriction rendus en thème sombre",
  "dn.alt.day": "GenePad thème clair",
  "dn.alt.night": "GenePad thème sombre",

  // Sanger
  "sg.eyebrow": "Trace Sanger",
  "sg.title": (
    <>
      Résultats de séquençage Sanger alignés
      <br />
      base à base avec la séquence de référence
    </>
  ),
  "sg.lead":
    "Importez un fichier AB1 : chromatogramme, reads et séquence de référence s’alignent base à base, avec taux d’identité d’alignement et E-value indiqués dans les résultats — la qualité de chaque réaction de séquençage et la position des mésappariements se lisent directement.",
  "sg.badge.format": "Chromatogramme AB1",
  "sg.shot1": "2KB-RCA-F — chromatogramme aligné base à base avec la référence",
  "sg.shot2": "TOP STRAND — mésappariements surlignés en rouge",

  // Toolbox
  "tb.eyebrow": "Boîte à outils",
  "tb.title": <>Une boîte à outils complète</>,
  "tb.lead":
    "Une fois une séquence sélectionnée, la simulation d’électrophorèse et la conception de sgRNA se lancent directement depuis le menu contextuel ; la boîte à outils globale donne accès à l’assistant IA et à la bibliothèque de fichiers géniques ; l’interface multilingue et la fonction « Open with » facilitent l’intégration aux flux de travail existants.",
  "tb.groupA": "Menu contextuel",
  "tb.groupB": "Boîte à outils globale",
  "tb.groupC": "Ouverture",
  "tb.c1.name": "Simulation d’électrophorèse d’ADN",
  "tb.c1.desc":
    "Sélectionnez une séquence et lancez la simulation d’électrophorèse depuis le menu contextuel pour prévisualiser la position des bandes sur gel d’agarose ; les marqueurs de taille usuels tels que Trans2K® sont intégrés, si bien que le résultat peut être anticipé avant même la migration.",
  "tb.c2.name": "Simulation d’électrophorèse de protéines",
  "tb.c2.desc":
    "Simulation SDS-PAGE : sélectionnez un CDS ou un segment d’acides aminés pour déposer l’échantillon, avec les marqueurs précolorés du type PageRuler comme références de masse moléculaire ; la position des bandes est calculée en temps réel.",
  "tb.c3.name": "Conception de sgRNA CRISPR",
  "tb.c3.desc":
    "Douze profils de reconnaissance dont SpCas9, xCas9, Cas12a/b et TnpB, avec orientation du PAM, longueur de la région seed et filtrage des sites hors-cible configurables ; les séquences candidates peuvent être annotées sur la carte en un clic.",
  "tb.t1.name": "Assistant IA",
  "tb.t1.desc":
    "Il lit et écrit directement la séquence, les annotations et les amorces du fichier courant ; l’ajout de features, le calcul de Tm, la traduction des protéines ou la prédiction d’ORF s’effectuent en langage naturel.",
  "tb.t2.name": "Bibliothèque de fichiers géniques",
  "tb.t2.desc":
    "Les vecteurs ouverts sont indexés automatiquement, avec étiquettes générées en lot par l’IA et prise en charge des dossiers surveillés ; localisez les fichiers d’après les attributs du plasmide, sans avoir à mémoriser de noms, ou retrouvez-les via l’assistant IA. Indexation seule : les fichiers originaux ne sont jamais modifiés.",
  "tb.o1.name": "Multilingue",
  "tb.o1.desc":
    "Les interfaces chinoise, anglaise, japonaise, française, allemande et russe sont intégrées ; les paquets de langue peuvent être exportés et des langues personnalisées ajoutées grâce à la traduction assistée par IA.",
  "tb.o2.name": "« Open with »",
  "tb.o2.desc":
    "La fonction « Open with » intégrée confie les fichiers en un clic à SnapGene, VS Code ou tout autre outil désigné, en synergie avec vos flux de travail existants, sans restreindre l’usage des fichiers.",
  "tb.more": "En savoir plus",

  // Section bibliothèque de fichiers géniques de la page d’accueil
  "lp.lead":
    "La bibliothèque de fichiers géniques rassemble en un index unique et consultable les fichiers plasmidiques dispersés dans divers dossiers, organisés par projet, par chemin de stockage ou par étiquettes générées par IA ; inutile de retenir des noms ou des chemins : un ou deux attributs suffisent pour que l’IA localise le plasmide.",
  "lp.c1": "Projets · Chemins · Étiquettes",
  "lp.c2": "Étiquetage automatique par IA",
  "lp.c3": "Recherche en langage naturel",
  "lp.c4": "Indexation automatique des dossiers surveillés",
  "lp.safe": "Indexation seule — les fichiers originaux ne sont jamais modifiés",
  "lp.cta": "En savoir plus",

  // Download
  "dl.eyebrow": "Téléchargement · Installation / mise à niveau",
  "dl.title": (
    <>
      Des clients toutes plateformes,
      <br />
      du bureau au mobile
    </>
  ),
  "dl.lead":
    "Disponible sur ordinateur (Windows, macOS et Linux) comme sur mobile (Android), avec des fonctionnalités identiques sur toutes les plateformes. Pour une première installation, il suffit de télécharger le programme d’installation ; les utilisateurs existants téléchargent la dernière version et l’installent par-dessus l’ancienne pour mettre à niveau, sans désinstallation préalable.",
  "dl.note.desktop": "Bureau",
  "dl.note.linuxX64": "Bureau · x86_64",
  "dl.note.mobile": "Mobile",
  "dl.note.soon": "Bientôt disponible",
  "dl.upgradeNote":
    "GenePad déjà installé ? Téléchargez le dernier programme d’installation et installez-le par-dessus la version existante pour mettre à niveau, sans désinstallation ; les nouveaux utilisateurs n’ont qu’à suivre les instructions après le téléchargement.",
  "dl.cmdTitle.recommended": "Installation / mise à niveau en ligne de commande (recommandé)",
  "dl.cmdTitle.plain": "Installation / mise à niveau en ligne de commande",
  "dl.cmd.brewLabel": "macOS · Homebrew",
  "dl.cmd.npmLabel": "Linux · npm",
  "dl.cmd.npmLabelMac": "macOS · npm",
  "dl.cmd.note": "Copiez la commande ci-dessus, collez-la dans un terminal et exécutez-la.",
  "dl.cmd.scriptLabel": "Linux · Script d’installation / mise à niveau",
  "dl.cmd.scriptLabelMac": "macOS · Script d’installation / mise à niveau",
  "dl.cmdTab.script": "Script en un clic",
  "dl.cmdTab.npm": "npm",
  "dl.cmd.recommendedTag": "Recommandé",
  "dl.or.linux": "Ou téléchargez directement les programmes d’installation",
  "dl.ai.title": "Installation / mise à niveau assistée par IA",
  "dl.ai.desc":
    "Les paquets macOS ne sont pas signés et leur installation manuelle comporte plusieurs étapes. Copiez l’invite ci-dessous vers un assistant IA (Kimi, ChatGPT, etc.) et laissez-vous guider pas à pas jusqu’à l’installation.",
  "dl.ai.prompt": `Merci de m’aider à installer sur macOS une application nommée « GenePad ». Essayez les méthodes suivantes dans l’ordre et arrêtez-vous à la première qui réussit :
1. Recommandé : exécutez le script officiel d’installation en un clic (il détecte et installe Homebrew automatiquement, en basculant vers un miroir chinois selon l’état du réseau). Ajoutez impérativement l’option -q : par défaut, le script attend l’appui sur Entrée avant de se terminer ; avec -q, cette attente est sautée, ce qui permet une exécution sans surveillance :
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   Une fois l’installation terminée, exécutez : open -a GenePad.
2. Alternative : installez via Homebrew (l’application est ajoutée automatiquement au dossier Applications) :
   brew install genepad/tap/genepad
   Une fois l’installation terminée, exécutez : open -a GenePad. Si Homebrew n’est pas installé, installez-le d’abord :
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. Troisième option : installez via npm (lancement en ligne de commande). Si possible, copiez-le aussi dans ~/Applications afin qu’il apparaisse dans Applications et dans le Launchpad :
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   Ouvrez ensuite l’application avec : open -a GenePad (ou exécutez : genepad)
4. Solution de repli (manuelle) : l’application n’est pas signée et les fichiers téléchargés via un navigateur sont marqués « endommagé » par Gatekeeper ; téléchargez-la donc avec curl et signez-la localement. Lisez d’abord le numéro de la dernière version sur https://genepad.cn/update.json (appelez-le VERSION, p. ex. 0.7.1), puis téléchargez le .app.tar.gz de cette version et décompressez-le :
   curl -L -o /tmp/gene-pad-app.tar.gz "https://genepad.cn/release/mac/GenePad_\${VERSION}_Darwin_arm64.app.tar.gz"
   mkdir -p /tmp/gene-pad-extract && tar -xzf /tmp/gene-pad-app.tar.gz -C /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ Remarque : les méthodes ci-dessus peuvent échouer ou être périmées. Si une étape ne fonctionne pas, passez de votre propre chef à une autre solution viable (par exemple une autre manière de contourner Gatekeeper, ou d’autres outils de décompression et de signature). Ne consultez le site officiel https://genepad.cn que si les liens de téléchargement ci-dessus sont inaccessibles — ce site ne recense que d’autres liens de téléchargement et n’offre aucun support d’installation.`,
  "dl.mac.other":
    "Autres méthodes d’installation / mise à niveau (Homebrew / npm / IA / téléchargements directs)",
  "dl.mac.unsigned":
    "Avertissement : fichiers non signés : les fichiers .dmg / .app téléchargés directement via un navigateur sont marqués « endommagé » par Gatekeeper. Ouvrez-les par clic droit → Ouvrir, ou exécutez xattr -cr pour retirer l’attribut de quarantaine ; l’installation / mise à niveau en ligne de commande ci-dessus reste recommandée.",
  "dl.copy": "Copier",
  "dl.copied": "Copié ✓",
  "dl.filesTitle": "Télécharger directement les programmes d’installation",
  "lb.close": "Fermer",
  "lb.prev": "Précédente",
  "lb.next": "Suivante",
  "dl.source.direct": "Lien direct",
  "dl.source.gitee": "Gitee",
  "dl.source.github": "GitHub",
  "dl.giteeBadge": "Accélération Chine",
  "dl.arch.x64": "x86_64",
  "dl.arch.arm64": "ARM64",
  "dl.spark": "Spark Store",
  "dl.sparkNote":
    "Les utilisateurs des distributions Linux chinoises peuvent aussi installer ou mettre à niveau l’application depuis le Spark Store",
  "dl.releases": "Toutes les versions (GitHub Releases)",
  "dl.releasesGitee": "Toutes les versions (miroir Gitee)",
  "dl.licenseTag": "LICENCE",
  "dl.license":
    "GenePad Free est gratuit pour l’évaluation personnelle et l’apprentissage, et couvre la consultation, l’édition et l’enregistrement des cartes au quotidien. L’usage commercial sera couvert par la licence de la future version GenePad Pro.",
  "dl.license.academic":
    "Licence académique gratuite : de 2026 au 31 décembre 2027, les utilisateurs académiques — universités, équipes de recherche hospitalières, participants iGEM, chercheurs et étudiants — obtiennent automatiquement le droit d’usage gratuit dès le téléchargement, sans demande ni contact avec l’équipe GenePad. Ce droit est limité à l’usage académique et scientifique ; tout usage commercial est exclu.",

  // Footer
  "ft.blurb":
    "Un éditeur de cartes géniques léger et multiplateforme, au service du clonage moléculaire au quotidien. Merci à toutes celles et ceux qui signalent des anomalies et partagent leurs suggestions.",
  "ft.col.download": "Téléchargement",
  "ft.col.support": "Retours & assistance",
  "ft.col.more": "Plus",
  "ft.giteeMirror": "Miroir Gitee",
  "ft.changelog": "Journal des versions",
  "ft.docs": "Docs techniques",
  "ft.projects": "Projets",
  "ft.library": "Bibliothèque de fichiers géniques",
  "ft.ngs": "Visualiseur NGS",
  "ft.sponsor": "Soutenir le développeur",
  "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

  // Sous-pages communes
  "sub.back": "Retour à l’accueil",

  // Page support technique
  "ts.eyebrow": "Docs développeur",
  "ts.title": "Documentation des formats de fichiers",
  "ts.lead":
    "Pour les développeurs qui écrivent leurs propres lecteurs, convertisseurs ou importateurs : les formats .gen et .gjson utilisés par GenePad, ainsi que le schéma de conversion du .dna SnapGene, font l’objet de pages dédiées pour accéder rapidement aux détails d’implémentation.",
  "ts.group.formats": "Formats de fichiers",
  "ts.group.formatsEn": "FILE FORMATS",
  "ts.group.code": "Exemples de code",
  "ts.group.codeEn": "CODE SAMPLES",
  "ts.gen.title": "Définition du fichier .gen",
  "ts.gen.desc":
    "Le fichier projet SQLite 3 : les 14 définitions de tables, la sémantique des champs, les règles de coordonnées, l’arbre d’historique des modifications, le découpage en blocs et le mécanisme d’annulation. À l’issue de la lecture, vous saurez lire et écrire du .gen en toute autonomie.",
  "ts.gjson.title": "Définition du fichier .gjson",
  "ts.gjson.desc":
    "Le format d’échange JSON : champs de premier niveau, définition de chaque objet et écarts de fidélité par rapport au .gen. À l’issue de la lecture, vous saurez analyser du .gjson.",
  "ts.dna.title": "Schéma de conversion .dna",
  "ts.dna.desc":
    "La structure du paquet binaire .dna de SnapGene, les bits de flags, la correspondance des champs et la conversion des coordonnées 0-based↔1-based.",
  "ts.rust.title": "Exemples de lecteur Rust",
  "ts.rust.desc":
    "Une implémentation minimale exécutable lisant .gen avec rusqlite et .gjson avec serde_json, dépendances et sortie attendue comprises.",
  "ts.readDoc": "Lire la documentation",
  "ts.feedback":
    "Si un point dont vous avez besoin n’est pas couvert, ouvrez une issue sur GitHub ou Gitee ; nous la compléterons.",

  // Page projets
  "pr.eyebrow": "Projets de l’écosystème",
  "pr.title": "Projets de l’écosystème GenePad",
  "pr.lead":
    "Autour de la chaîne d’outils de clonage moléculaire, l’organisation GenePad maintient sur GitHub plusieurs projets indépendants — d’une bibliothèque d’éléments plasmidiques communs traçables à un pipeline de statistiques d’usage des codons spécifique aux tissus. Chaque projet se suffit à lui-même et peut être utilisé séparément, dans le but d’alléger le travail répétitif des chercheurs et des développeurs.",
  "pr.specs": "Spécifications",
  "pr.cf.head": "Éléments plasmidiques communs",
  "pr.cf.title": "Bibliothèque de séquences d’éléments communs pour la construction plasmidique",
  "pr.cf.desc":
    "Une bibliothèque d’éléments réutilisables, dressée et vérifiée entrée par entrée à partir de plasmides de référence NCBI. Chaque élément enregistre son numéro d’accession NCBI et son plasmide de référence, si bien que chaque séquence peut être retracée jusqu’à sa source. Une fois la bibliothèque importée dans un logiciel de plasmides, ces éléments courants sont reconnus automatiquement sur toute carte ouverte.",
  "pr.cf.catsTitle": "20 catégories couvertes",
  "pr.cf.usage":
    "Importez les fichiers .gb de genbank/ dans la bibliothèque « common features » de SnapGene ou Benchling : ces éléments sont annotés automatiquement sur toute carte de plasmide ouverte ; les fichiers .fa de fasta/ servent directement aux alignements BLAST.",
  "pr.ca.head": "Atlas des codons spécifique aux tissus",
  "pr.ca.title": "Atlas humain des codons spécifique aux tissus",
  "pr.ca.desc":
    "Un pipeline statistique implémenté de façon indépendante : à partir des données publiques d’expression génique GTEx et des annotations GENCODE, pondérées par l’expression tissulaire, il reconstruit une table d’usage des codons pour chaque tissu humain — une référence spécifique aux tissus reproductible et vérifiable pour l’optimisation des codons et la conception d’expression hétérologue, sans dépendre de tables tierces à la licence restrictive.",
  "pr.ca.metricsTitle": "Indicateurs de sortie",
  "pr.ca.usage":
    "python scripts/build_atlas.py reconstruit toutes les tables tissulaires à partir des entrées GTEx / GENCODE ; check_release.py et package_release.py assurent la validation avant publication et l’empaquetage.",
  "pr.org.text":
    "Ces projets sont incubés par le projet principal GenePad et maintenus selon le même standard. Pour le code source et l’avancement, consultez la page de l’organisation GitHub ; les issues et retours sont bienvenus.",

  // Page bibliothèque de fichiers géniques
  "lib.eyebrow": "Bibliothèque de fichiers géniques",
  "lib.title": (
    <>
      Recherche et gestion unifiées
      <br />
      des fichiers plasmidiques
    </>
  ),
  "lib.lead":
    "Au fil des projets, les fichiers plasmidiques se dispersent entre dossiers, disques et appareils, et leurs noms ne reflètent guère les propriétés du plasmide. La bibliothèque de fichiers géniques les réunit dans un index unique et consultable, organisé par projet, par chemin de stockage et par étiquettes générées par IA ; inutile de retenir des noms ou des chemins précis : un ou deux attributs suffisent pour que l’IA localise le plasmide visé.",
  "lib.hero.shot":
    "LIBRARY — 331 plasmides indexés ; le nuage d’étiquettes de la bibliothèque à droite",

  "lib.pain.head": "Problèmes courants",
  "lib.pain.headEn": "COMMON ISSUES",
  "lib.pain.title": "Les difficultés bien connues de la gestion des fichiers plasmidiques",
  "lib.pain.1.name": "Collections qui ne cessent de grossir",
  "lib.pain.1.desc":
    "Au fil des projets, les collections passent couramment de quelques dizaines à plusieurs centaines de fichiers, dans une imbrication de dossiers toujours plus profonde ; la seule arborescence ne suffit plus à localiser le fichier visé.",
  "lib.pain.2.name": "Emplacements difficiles à retrouver",
  "lib.pain.2.desc":
    "Un même plasmide peut résider dans des dossiers différents, sur des disques ou des appareils différents ; au moment de s’en servir, son emplacement exact échappe le plus souvent.",
  "lib.pain.3.name": "Noms de fichiers déconnectés des propriétés",
  "lib.pain.3.desc":
    "L’intention de recherche s’exprime d’ordinaire par un attribut — « le vecteur portant tel gène » — tandis que des noms tels que pLH-sgRNA1-Muc4-11 ne disent rien des propriétés du plasmide : rien ne relie l’un à l’autre.",

  "lib.ways.head": "Trois façons de s’organiser",
  "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
  "lib.ways.title": "Projets, chemins, étiquettes — trois dimensions d’organisation",
  "lib.ways.1.name": "Par projet",
  "lib.ways.1.desc":
    "Créez un projet et glissez-y les plasmides pour les classer, un projet par étude ; l’ouverture du projet montre d’un coup tous les plasmides qui s’y rattachent.",
  "lib.ways.2.name": "Par chemin de stockage",
  "lib.ways.2.desc":
    "Rien n’est déplacé ni copié ; les fichiers sont parcourus exactement là où ils se trouvent. La bibliothèque n’est qu’un index et ne modifie jamais les fichiers originaux.",
  "lib.ways.3.name": "Par étiquettes de plasmide",
  "lib.ways.3.desc":
    "L’IA lit la séquence et les annotations de chaque plasmide et génère des étiquettes de propriétés telles que lentiviral, sgRNA ou ampicillin ; cliquer sur une étiquette filtre tous les plasmides correspondants — une localisation par attribut plutôt que par nom.",

  "lib.tags.head": "Étiquettes IA",
  "lib.tags.headEn": "AI TAGS",
  "lib.tags.title": "Des étiquettes de propriétés générées automatiquement par l’IA",
  "lib.tags.desc":
    "Une fois l’IA configurée, l’analyse ou l’ouverture d’un plasmide lit automatiquement sa séquence et ses éléments et génère un jeu d’étiquettes de propriétés pour chaque fichier ; un rafraîchissement en lot est disponible depuis l’en-tête du tableau — pour compléter uniquement les entrées sans étiquette, ou tout régénérer. Le nuage d’étiquettes à droite restitue la distribution des attributs de toute la bibliothèque ; combiner quelques attributs suffit à atteindre le fichier visé.",
  "lib.tags.shot":
    "Rafraîchissement en lot depuis l’en-tête — compléter les entrées sans étiquette, ou tout régénérer",

  "lib.ai.head": "Assistant IA",
  "lib.ai.headEn": "AI ASSISTANT",
  "lib.ai.title": "Interroger directement l’assistant IA",
  "lib.ai.desc":
    "Adressez vos instructions directement à l’assistant IA — par exemple « trouve un plasmide CRISPR de type I » : il parcourt toute la bibliothèque et liste les candidats en exposant les propriétés et l’usage recommandé de chaque plasmide. Demandez-lui « range ma bibliothèque de plasmides » : il analyse d’abord l’état des lieux, puis propose un plan de rangement.",
  "lib.ai.shot1":
    "AI ASSISTANT — « Range ma bibliothèque de plasmides » : analyser d’abord, puis proposer un plan",
  "lib.ai.shot2":
    "AI ASSISTANT — « Trouve un plasmide CRISPR de type I » : candidats listés avec leurs propriétés",

  "lib.setup.head": "Premiers pas",
  "lib.setup.headEn": "GETTING STARTED",
  "lib.setup.title": "Une configuration initiale en quelques minutes",
  "lib.setup.lead":
    "La bibliothèque de fichiers géniques se trouve dans la boîte à outils de GenePad. Ouvrez-la puis suivez les étapes ci-dessous :",
  "lib.setup.1.name": "Ouvrir l’entrée de configuration",
  "lib.setup.1.desc":
    "Au premier lancement de la bibliothèque de fichiers géniques, cliquez sur « Configure AI » dans la bannière supérieure ; ensuite, les réglages restent accessibles à tout moment via l’icône IA en haut à droite.",
  "lib.setup.1.shot": "Premier lancement — cliquez sur « Configure AI » dans la bannière supérieure",
  "lib.setup.2.name": "Créer un profil DeepSeek",
  "lib.setup.2.desc":
    "Cliquez sur « New profile » et nommez-le ; choisissez DeepSeek comme fournisseur et deepseek-v4-flash comme modèle, puis cliquez sur « Get » à côté du champ API Key.",
  "lib.setup.2.shot": "Réglages IA — créer un profil, choisir DeepSeek, cliquer sur « Get »",
  "lib.setup.3.name": "Obtenir une clé API DeepSeek",
  "lib.setup.3.desc":
    "Votre navigateur ouvre la plateforme DeepSeek : inscrivez-vous, créditez votre compte, puis cliquez sur « Create API key » ; la clé n’est affichée qu’une seule fois — copiez-la immédiatement après sa création.",
  "lib.setup.3.shot": "Plateforme DEEPSEEK — créer une clé API et la copier immédiatement",
  "lib.setup.4.name": "Coller la clé et enregistrer",
  "lib.setup.4.desc":
    "De retour dans l’application, collez la clé et cliquez sur « Test connection » ; une fois « Connected » confirmé, cliquez sur « Save current profile » : l’IA est configurée.",
  "lib.setup.4.shot": "Test de connexion réussi — enregistrer le profil courant",
  "lib.setup.5.name": "Configurer les dossiers surveillés",
  "lib.setup.5.desc":
    "Cliquez sur « Watch folders » et ajoutez les dossiers où sont stockés vos plasmides. À chaque lancement, ils sont analysés automatiquement : les nouveaux plasmides entrent dans la bibliothèque, les supprimés en sortent, sans maintenance manuelle.",
  "lib.setup.5.shot":
    "Dossiers surveillés — ajouts intégrés, suppressions retirées, synchronisation automatique",
  "lib.setup.note":
    "L’IA configurée, les plasmides entrés dans la bibliothèque reçoivent leurs étiquettes automatiquement ; passer cette configuration n’empêche pas l’import, seules les étiquettes et l’assistant IA restent indisponibles.",

  "lib.daily.head": "Flux de travail quotidien",
  "lib.daily.headEn": "DAILY WORKFLOW",
  "lib.daily.title": "Les résultats de recherche s’ouvrent directement dans vos outils",
  "lib.daily.1.name": "Ouvrir avec vos outils habituels",
  "lib.daily.1.desc":
    "Clic droit sur un plasmide → « Open with » : confiez le fichier à SnapGene (carte) ou à VS Code (séquence) en un clic, dans le prolongement de votre flux de travail existant.",
  "lib.daily.2.name": "Des étiquettes personnalisables",
  "lib.daily.2.desc":
    "Les étiquettes se modifient à tout moment dans le panneau de détails : supprimez une étiquette erronée générée par l’IA, ajoutez vos propres étiquettes telles que « vérifié ».",
  "lib.daily.shot":
    "Menu contextuel — ouvrir, ouvrir le dossier, confier à SnapGene / VS Code ; le panneau de détails à droite permet d’ajouter ou retirer des étiquettes",

  "lib.final.title": "La bibliothèque de fichiers géniques est un module intégré de GenePad, et non un logiciel autonome",
  "lib.final.desc":
    "La bibliothèque de fichiers géniques est intégrée à l’éditeur de cartes géniques GenePad : installez ou mettez à niveau GenePad, puis retrouvez-la dans la boîte à outils. Actuellement en bêta publique gratuite, sur toutes les plateformes.",
  "lib.final.cta": "Retour à l’accueil",
  "lib.final.cta2": "Télécharger maintenant",
  "lib.top.hint": "Aller droit à la zone de téléchargement",

  // Section NGS de la page d’accueil
  "np.lead":
    "Ouvrez directement les fichiers de séquençage fastq.gz / fastq / fq.gz / fq : clic droit ou glisser-déposer, les fichiers à extrémités appariées étant reconnus et fusionnés automatiquement ; consultez la qualité de séquençage base à base, localisez les régions variables en recherchant un fragment d’acides aminés, posez des ancres de rognage pour rogner en lot, et générez le rapport d’abondance de banque en un clic.",
  "np.c1": "fastq.gz · fq.gz sans décompression",
  "np.c2": "Appariement et fusion automatiques des paires",
  "np.c3": "Qualité de séquençage base à base",
  "np.c4": "Ancres de rognage + rapport d’abondance",
  "np.cta": "En savoir plus",
  "np.safe": "Fonction intégrée à GenePad · Bêta publique gratuite · Toutes plateformes",

  // Page NGS
  "ngs.eyebrow": "Visualiseur de données NGS",
  "ngs.title": (
    <>
      Les données de séquençage deuxième génération (NGS) s’ouvrent directement,
      <br />
      à parcourir, rechercher et compter un à un
    </>
  ),
  "ngs.lead":
    "GenePad ouvre directement les fichiers de séquençage fastq.gz / fastq / fq.gz / fq : clic droit → « Open with » → GenePad dans l’explorateur de fichiers, ou glissement des fichiers directement dans la fenêtre du programme ; pour un séquençage à extrémités appariées, déposez ensemble les fichiers R1 et R2, l’appariement étant reconnu automatiquement. Une fois le fichier ouvert, parcourez les reads un à un, contrôlez la qualité de chaque base et la qualité de la fusion des paires ; localisez la région variable visée en recherchant un fragment d’acides aminés, posez des ancres de rognage pour rogner tout le fichier en lot, puis générez en un clic le rapport d’abondance de banque.",
  "ngs.hero.shot":
    "FASTQ VIEWER — reads à extrémités appariées fusionnés automatiquement, bases colorées selon la qualité, statistiques du fichier à droite",

  "ngs.open.head": "Ouvrir les fichiers de séquençage",
  "ngs.open.headEn": "OPENING FASTQ FILES",
  "ngs.open.title": "Clic droit ou glisser-déposer, sans ligne de commande",
  "ngs.open.lead":
    "Quatre extensions sont prises en charge — fastq.gz, fastq, fq.gz et fq — et les fichiers gzip s’ouvrent sans décompression préalable. Une fois GenePad installé ou mis à niveau, au choix entre deux méthodes :",
  "ngs.open.1.name": "Clic droit → « Open with »",
  "ngs.open.1.desc":
    "Dans l’explorateur de fichiers, clic droit sur le fichier de séquençage → « Open with » : choisissez GenePad directement dans le sous-menu, ou sélectionnez-le dans la liste « Choose another app » et définissez-le comme application par défaut — un double clic ouvrira dès lors directement vos fichiers de séquençage.",
  "ngs.open.2.name": "Glisser dans la fenêtre",
  "ngs.open.2.desc":
    "Glissez un ou plusieurs fichiers de séquençage directement dans la fenêtre GenePad ; la page d’accueil comme l’espace de travail acceptent le dépôt.",
  "ngs.open.1.shot": "Menu contextuel — « Open with » → GenePad",
  "ngs.open.1.shot2":
    "« Choose another app » — sélectionner GenePad dans la liste du système, éventuellement par défaut",
  "ngs.open.2.shot": "Glisser-déposer — plusieurs fichiers de séquençage déposés ensemble",

  "ngs.pair.head": "Séquençage à extrémités appariées",
  "ngs.pair.headEn": "PAIRED-END",
  "ngs.pair.title": "Reconnaissance et appariement automatiques des fichiers appariés",
  "ngs.pair.desc":
    "Déposez ensemble les fichiers R1 et R2 dans la fenêtre : le programme reconnaît l’appariement d’après l’identifiant du premier read ; si plusieurs paires arrivent d’un coup, une boîte de confirmation permet d’ajuster les groupes à la main ou de tout apparier d’un clic avec « Auto-pair ». Une fois confirmé, chaque paire s’ouvre comme un jeu de données à extrémités appariées — signalé « Paired-end » dans le panneau de propriétés, avec l’échange R1/R2 en un clic (« Swap R1/R2 ») dans la barre d’outils.",
  "ngs.pair.shot":
    "PAIR NGS FILES — appariement automatique d’après l’identifiant du premier read, ajustable à la main",

  "ngs.reads.head": "Parcours read par read",
  "ngs.reads.headEn": "READS & QUALITY",
  "ngs.reads.title": "Qualité et fusion de chaque read d’un coup d’œil",
  "ngs.reads.lead":
    "La vue principale liste de haut en bas chaque read obtenu par séquençage, le panneau de propriétés à droite résumant les statistiques de l’ensemble du fichier :",
  "ngs.reads.1.name": "Fusion automatique des paires",
  "ngs.reads.1.desc":
    "Les données à extrémités appariées sont fusionnées read par read, chaque read affichant la longueur de chevauchement et l’identité (p. ex. Overlap 135bp · 99% identity) : la qualité de la fusion se voit d’un coup d’œil.",
  "ngs.reads.2.name": "Qualité de séquençage base à base",
  "ngs.reads.2.desc":
    "Chaque base est colorée selon la qualité Phred : ≥ 30 en vert, 20–29 en orange, < 20 en rouge ; les régions de faible qualité sautent aux yeux dans les barres de qualité, sans avoir à lire chaque valeur.",
  "ngs.reads.3.name": "Statistiques du fichier",
  "ngs.reads.3.desc":
    "Le panneau de propriétés résume le nombre de reads, le nombre de bases, la longueur des reads, la qualité moyenne, la distribution des qualités, la teneur en GC et le format d’encodage, avec consultation groupée Overall / R1 / R2 ; les très gros fichiers ne chargent qu’un aperçu, tandis que les statistiques et analyses couvrent toujours l’intégralité du fichier.",
  "ngs.reads.shot":
    "READS & QUALITY — parcours read par read de haut en bas : fusion des paires, barres de qualité base à base et statistiques du fichier à droite",

  "ngs.aa.head": "Recherche par acides aminés",
  "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
  "ngs.aa.title": "Localiser la région variable visée par un fragment protéique",
  "ngs.aa.desc":
    "Basculez la zone de recherche en mode « AA » et saisissez un fragment d’acides aminés (p. ex. MATNNQ) : le programme traduit les reads fusionnés en protéines et les compare un à un, chaque peptide correspondant étant encadré directement dans la séquence. En séquençage de banque, les flancs sont conservés et le centre variable : en interrogeant avec une protéine conservée connue, on retrouve en quelques instants la région variable cible au milieu de milliers de reads.",
  "ngs.aa.shot":
    "AA SEARCH — saisissez un fragment d’acides aminés ; les peptides correspondants sont encadrés dans la traduction",

  "ngs.trim.head": "Rognage par ancres",
  "ngs.trim.headEn": "TRIM ANCHORS",
  "ngs.trim.title": "Poser des ancres de rognage et extraire précisément le segment visé",
  "ngs.trim.desc":
    "Définissez les séquences conservées qui encadrent le segment visé comme ancres gauche et droite (« Trim anchors »), cliquez sur « Trim » : tout le fichier de séquençage est rogné en lot et seules les séquences variables entre les deux ancres sont conservées. Le panneau de propriétés affiche en direct le taux de réussite, ainsi que le nombre de reads écartés (ancre manquée, fragment trop court…) ; les reads rognés s’exportent en un clic (« Export processed reads ») pour les analyses ou dépôts ultérieurs.",
  "ngs.trim.shot":
    "TRIM ANCHORS — les ancres gauche et droite cadrent la fenêtre visée, taux de réussite en direct",

  "ngs.report.head": "Analyse d’abondance de la banque",
  "ngs.report.headEn": "LIBRARY ANALYSIS",
  "ngs.report.title": "Le rapport d’abondance de tout le fichier en un clic",
  "ngs.report.desc":
    "Cliquez sur « Sequence analysis » pour traiter les données rognées : par défaut, tout le fichier est analysé (des dizaines de millions de reads n’ont pas besoin d’être chargés entièrement en mémoire), chaque séquence unique étant comptée avec son nombre d’occurrences et sa fréquence, avec possibilité de conserver ou de retirer les ancres aux extrémités. À l’issue de l’analyse, un rapport illustré est généré — histogramme des séquences les plus fréquentes (comptage ADN ou AA) et, pour chaque séquence, longueur, nombre d’occurrences, fréquence et traduction dans le cadre de lecture +1 — et la table complète est exportée en CSV, ouvrable directement dans Excel. Un rapport d’abondance de banque simple, voilà qui est fait.",
  "ngs.report.shot1":
    "SEQUENCE ANALYSIS — tout le fichier par défaut, ancres conservées ou retirées au choix",
  "ngs.report.shot2":
    "ANALYSIS REPORT — histogramme des séquences les plus fréquentes et table d’abondance complète (CSV)",

  "ngs.video.head": "Tutoriel vidéo",
  "ngs.video.headEn": "VIDEO TUTORIAL",
  "ngs.video.lead":
    "Les images ne suffisent pas ? Voici une démonstration complète : de l’ouverture des fichiers de séquençage et de l’appariement des paires au rognage par ancres et au rapport d’abondance, tout le flux est rejoué pas à pas sur des données réelles, la vidéo se jouant directement dans la page.",
  "ngs.video.caption":
    "VIDEO TUTORIAL — démonstration du flux complet : ouvrir → apparier → parcourir → chercher → rogner → rapport d’abondance",

  "ngs.final.title":
    "La consultation des données NGS est une fonction intégrée de GenePad, et non un logiciel autonome",
  "ngs.final.desc":
    "La consultation des données NGS est intégrée à l’éditeur de cartes géniques GenePad : installez ou mettez à niveau GenePad et les fichiers de séquençage s’ouvrent directement, en complément de l’édition de cartes, de l’alignement des chromatogrammes Sanger et des autres fonctions dans un même programme. Actuellement en bêta publique gratuite, sur toutes les plateformes.",
  "ngs.final.cta": "Retour à l’accueil",
  "ngs.final.cta2": "Télécharger maintenant",
  "ngs.top.hint": "Aller droit à la zone de téléchargement",

  // Page tutoriels (centre de tutoriels : guides enrichis au fil du temps)
  "tut.eyebrow": "Tutoriels",
  "tut.title": (
    <>
      De la configuration à l’analyse quotidienne,
      <br />
      pas à pas, en images
    </>
  ),
  "tut.lead":
    "Retrouvez ici les tutoriels illustrés de GenePad, enrichis de nouveaux guides au fil du temps : connecter DeepSeek pour débloquer les fonctions IA, gérer des centaines de plasmides dans la bibliothèque de fichiers géniques, ou mener une analyse NGS de fastq.gz jusqu’au rapport d’abondance de banque. Chaque étape est accompagnée d’une capture d’écran réelle : suivez-les simplement dans l’ordre.",
  "tut.toc.hint": "Cliquez sur une carte pour ouvrir le tutoriel correspondant",
  "tut.card.view": "Lire le tutoriel",
  "tut.prev": "Précédent",
  "tut.next": "Suivant",
  "tut.backTo": "Retour au sommaire des tutoriels",
  "tut.toc.ai.name": "Configurer l’IA (DeepSeek)",
  "tut.toc.ai.desc":
    "Ouvrez les réglages, créez un profil, obtenez et enregistrez une clé API — cinq étapes pour connecter DeepSeek et débloquer l’assistant IA et l’étiquetage automatique des plasmides.",
  "tut.toc.ai.en": "SET UP AI",
  "tut.toc.lib.name": "Bibliothèque de fichiers géniques",
  "tut.toc.lib.desc":
    "Les dossiers surveillés alimentent la bibliothèque automatiquement ; retrouvez vos plasmides par projet, par chemin ou par étiquette, ou en les décrivant à l’assistant IA.",
  "tut.toc.lib.en": "FILE LIBRARY",
  "tut.toc.ngs.name": "Analyse de fichiers NGS",
  "tut.toc.ngs.desc":
    "Glissez un fastq.gz pour commencer : appariement des paires, contrôle qualité base à base, recherche par acides aminés, rognage par ancres et rapport d’abondance.",
  "tut.toc.ngs.en": "NGS ANALYSIS",
  "tut.toc.lang.name": "Configurer n’importe quelle langue",
  "tut.toc.lang.desc":
    "Réglages → Language → AI Translate : saisissez la langue cible et un paquet de langue est généré automatiquement, basculant toute l’interface en français, en russe ou dans la langue de votre choix.",
  "tut.toc.lang.en": "ANY LANGUAGE",

  // Catégories de tutoriels (sections du sommaire + navigation latérale)
  "tut.toc.langpack.name": "Langue de l’interface",
  "tut.toc.langpack.desc":
    "Ouvrez Réglages → Language : basculez en un clic entre le chinois et l’anglais intégrés, ou importez un paquet officiel pour l’allemand, le russe, le japonais, le coréen ou le français.",
  "tut.toc.langpack.en": "UI LANGUAGE",
  "tut.cat.switch.name": "Migration",
  "tut.cat.switch.en": "SWITCHING GUIDES",
  "tut.cat.switch.desc": "Transférer votre flux de travail SnapGene vers GenePad : fichiers interopérables, quotidien repris — pas besoin de choisir",

  "tut.cat.gs.name": "Premiers pas",
  "tut.cat.gs.en": "GETTING STARTED",
  "tut.cat.gs.desc":
    "Pour bien débuter, suivez l’ordre : connectez d’abord l’IA, puis versez vos fichiers plasmidiques dans la bibliothèque.",
  "tut.cat.analysis.name": "Analyse de données",
  "tut.cat.analysis.en": "DATA ANALYSIS",
  "tut.cat.analysis.desc": "Consulter, rechercher et quantifier les données de séquençage.",

  // Tutoriel 2 : configurer l’IA
  "tut.ai.head": "Tutoriel 2 · Configurer l’IA",
  "tut.ai.headEn": "TUTORIAL 2 · SET UP DEEPSEEK",
  "tut.ai.title":
    "Connecter DeepSeek en cinq étapes pour débloquer l’assistant IA et l’étiquetage automatique",
  "tut.ai.lead":
    "L’assistant IA et l’étiquetage automatique des plasmides reposent sur un grand modèle de langage ; DeepSeek est recommandé. Une fois les cinq étapes ci-dessous franchies, vous pilotez séquences et annotations en langage naturel, et les plasmides reçoivent automatiquement leurs étiquettes de propriétés à l’import comme à l’ouverture.",
  "tut.ai.1.name": "Ouvrir les réglages",
  "tut.ai.1.desc":
    "Lancez GenePad, puis cliquez sur l’icône d’engrenage en haut à droite de la page d’accueil pour ouvrir la fenêtre des réglages.",
  "tut.ai.1.shot": "Page d’accueil — cliquez sur l’icône d’engrenage en haut à droite",
  "tut.ai.2.name": "Ouvrir les réglages IA et créer un profil",
  "tut.ai.2.desc":
    "Dans le panneau gauche de la fenêtre des réglages, choisissez « AI Settings », puis cliquez sur « New config » pour créer une configuration IA.",
  "tut.ai.2.shot": "Réglages IA — choisissez AI Settings, cliquez sur New config",
  "tut.ai.3.name": "Remplir la configuration",
  "tut.ai.3.desc":
    "Donnez un nom à la configuration, choisissez DeepSeek comme fournisseur et deepseek-v4-flash comme modèle, et laissez l’API URL par défaut ; cliquez ensuite sur « Get » à côté du champ API Key : votre navigateur ouvre la plateforme DeepSeek.",
  "tut.ai.3.shot": "Nom et modèle — cliquez sur « Get » à côté du champ API Key",
  "tut.ai.4.name": "Obtenir une clé API DeepSeek",
  "tut.ai.4.desc":
    "Sur la plateforme DeepSeek, créez un compte et créditez-le, cliquez sur « Create API key », nommez la clé puis confirmez ; la clé n’est affichée qu’une seule fois — copiez-la immédiatement.",
  "tut.ai.5.name": "Coller la clé et enregistrer",
  "tut.ai.5.desc":
    "Revenez dans GenePad et collez la clé, cliquez sur « Test connection » ; une fois la connexion confirmée, cliquez sur « Save current config » pour enregistrer. La configuration de l’IA est alors terminée.",
  "tut.ai.note":
    "Une seule configuration suffit, une fois pour toutes, la clé restant stockée sur votre machine. Dès lors, l’icône IA de la page d’accueil et de l’espace de travail ouvre directement la conversation, et les plasmides ouverts ou importés reçoivent automatiquement leurs étiquettes de propriétés.",

  // Tutoriel 3 : bibliothèque de fichiers géniques
  "tut.lib.head": "Tutoriel 3 · Bibliothèque de fichiers géniques",
  "tut.lib.headEn": "TUTORIAL 3 · GENE FILE LIBRARY",
  "tut.lib.title": "Gérer des centaines de plasmides en une bibliothèque consultable",
  "tut.lib.lead":
    "La bibliothèque de fichiers géniques se trouve dans la boîte à outils : sans déplacer ni copier le moindre fichier, elle dresse un index unifié des plasmides dispersés çà et là. Les étapes ci-dessous vont de l’import automatique jusqu’à la localisation d’un plasmide par ses attributs, en une phrase.",
  "tut.lib.1.name": "Régler les dossiers surveillés : les plasmides entrent tout seuls",
  "tut.lib.1.desc":
    "Ouvrez la bibliothèque de fichiers géniques → « Watch folders » → ajoutez les dossiers où sont stockés les plasmides. À chaque lancement, l’analyse est automatique : les nouveaux plasmides entrent dans la bibliothèque, les supprimés en sont retirés, sans maintenance manuelle.",
  "tut.lib.2.name": "Chercher par projet, chemin ou étiquette",
  "tut.lib.2.desc":
    "Créez un projet et glissez-y les plasmides pour les classer ; ou parcourez les fichiers tels quels par chemin de stockage ; l’IA configurée, chaque plasmide porte un jeu d’étiquettes de propriétés — cliquez sur une étiquette pour extraire tous les plasmides concernés.",
  "tut.lib.3.name": "Étiquettes de propriétés générées automatiquement par l’IA",
  "tut.lib.3.desc":
    "Une fois le tutoriel 1 terminé, l’analyse ou l’ouverture d’un plasmide génère automatiquement des étiquettes telles que lentiviral, sgRNA ou ampicillin ; un rafraîchissement en lot est possible depuis l’en-tête — pour compléter les étiquettes manquantes, ou tout régénérer.",
  "tut.lib.4.name": "Localiser par attributs grâce à l’assistant IA",
  "tut.lib.4.desc":
    "Exposez votre besoin directement à l’assistant IA, par exemple « trouve un plasmide CRISPR de type I » : l’assistant parcourt toute la bibliothèque et liste les candidats en exposant les propriétés et l’usage recommandé de chaque plasmide.",
  "tut.lib.5.name": "Mettre les résultats de recherche à profit",
  "tut.lib.5.desc":
    "Clic droit sur un plasmide → « Open with » pour le confier à SnapGene (carte), VS Code (séquence) et autres outils ; le panneau de détails permet aussi d’ajouter ou retirer des étiquettes, avec vos étiquettes personnalisées telles que « vérifié ».",
  "tut.lib.note":
    "La bibliothèque n’est qu’un index et ne modifie pas les fichiers originaux ; sans configuration de l’IA, l’import et la consultation continuent de fonctionner — seuls l’étiquetage automatique et la recherche par IA sont indisponibles.",

  // Tutoriel 4 : analyse de fichiers NGS
  "tut.ngs.head": "Tutoriel 4 · Analyse de fichiers NGS",
  "tut.ngs.headEn": "TUTORIAL 4 · NGS ANALYSIS",
  "tut.ngs.title": "De fastq.gz au rapport d’abondance de banque",
  "tut.ngs.lead":
    "Sans ligne de commande : glissez les fichiers de séquençage dans la fenêtre pour commencer. Les six étapes ci-dessous couvrent l’intégralité du flux — ouverture, appariement, contrôle qualité, recherche, rognage et analyse d’abondance —, avec la vidéo complète en fin de page.",
  "tut.ngs.1.name": "Ouvrir les fichiers de séquençage",
  "tut.ngs.1.desc":
    "Glissez un ou plusieurs fichiers de séquençage directement dans la fenêtre GenePad ; ou faites un clic droit sur le fichier dans l’explorateur et choisissez « Open with » → GenePad. Les formats fastq.gz, fastq, fq.gz et fq sont pris en charge, sans décompression des fichiers gzip.",
  "tut.ngs.2.name": "Appariement automatique des fichiers à extrémités appariées",
  "tut.ngs.2.desc":
    "Déposez ensemble les fichiers R1 et R2 : le programme reconnaît l’appariement d’après l’identifiant du premier read ; si plusieurs paires arrivent d’un coup, une boîte de confirmation apparaît, avec « Auto-pair » pour tout apparier d’un clic — chaque paire s’ouvre ensuite comme un jeu de données à extrémités appariées.",
  "tut.ngs.3.name": "Parcourir les reads et contrôler la qualité",
  "tut.ngs.3.desc":
    "La vue principale liste les reads un à un : chaque base est colorée selon la qualité Phred, les données à extrémités appariées sont fusionnées automatiquement avec affichage de la longueur de chevauchement et de l’identité ; le panneau de droite résume le nombre de reads, la teneur en GC et les autres statistiques du fichier.",
  "tut.ngs.4.name": "Localiser les régions variables par recherche d’acides aminés",
  "tut.ngs.4.desc":
    "Basculez la zone de recherche en bas en mode « AA » et saisissez une protéine conservée connue (p. ex. MATNNQ) : le programme traduit les reads fusionnés en protéines et les compare un à un, chaque peptide correspondant étant encadré — la région variable cible se retrouve au milieu de milliers de reads.",
  "tut.ngs.5.name": "Poser des ancres et rogner en lot",
  "tut.ngs.5.desc":
    "Définissez les séquences conservées de part et d’autre du segment visé comme ancres gauche et droite, cliquez sur « Trim » : tout le fichier est rogné en lot et seule la région variable entre les deux ancres est conservée ; le panneau de propriétés affiche en direct le taux de réussite, et les reads rognés s’exportent en un clic.",
  "tut.ngs.6.name": "Générer le rapport d’abondance de banque",
  "tut.ngs.6.desc":
    "Cliquez sur « Sequence analysis » : le programme compte, sur l’ensemble du fichier, les occurrences et la fréquence de chaque séquence unique, produit l’histogramme des séquences les plus fréquentes avec le détail séquence par séquence, et exporte la table complète en CSV, ouvrable directement dans Excel. Un rapport d’abondance de banque simple, voilà qui est fait.",

  // Tutoriel 5 : configurer n’importe quelle langue
  "tut.lang.head": "Tutoriel 5 · Configurer n’importe quelle langue",
  "tut.lang.headEn": "TUTORIAL 5 · ANY LANGUAGE",
  "tut.lang.title": "Traduire l’interface dans la langue de votre choix grâce à l’IA",
  "tut.lang.lead":
    "GenePad s’accompagne d’interfaces chinoise et anglaise ; pour les autres langues, nul besoin d’attendre une prise en charge officielle : ouvrez Réglages → Language, cliquez sur AI Translate et saisissez la langue cible — le paquet de langue est généré puis appliqué automatiquement. Terminez d’abord le tutoriel 1 pour que l’IA soit configurée.",
  "tut.lang.1.name": "Ouvrir les réglages",
  "tut.lang.1.desc":
    "Comme au tutoriel 1 : lancez GenePad, puis cliquez sur l’icône d’engrenage en haut à droite de la page d’accueil pour ouvrir la fenêtre des réglages.",
  "tut.lang.2.name": "Ouvrir les réglages « Language », cliquer sur « AI Translate »",
  "tut.lang.2.desc":
    "Dans le panneau gauche des réglages, choisissez « Language », puis cliquez sur « AI Translate ». Cette page permet aussi d’importer / exporter manuellement des fichiers de langue.",
  "tut.lang.2.shot": "Réglages de langue — choisissez Language, cliquez sur AI Translate",
  "tut.lang.3.name": "Saisir la langue cible et lancer la traduction",
  "tut.lang.3.desc":
    "Saisissez le nom et le code de la langue (p. ex. français et fr), puis cliquez sur « Translate » : l’IA configurée traduit le fichier de langue intégré — les textes longs sont traités par segments, les segments en échec réessayent automatiquement, et le tout est importé puis appliqué dès la fin.",
  "tut.lang.3.shot": "Nom et code de la langue — cliquez sur Translate",
  "tut.lang.4.name": "Toute l’interface bascule dans la langue cible",
  "tut.lang.4.desc":
    "La traduction terminée, l’interface bascule immédiatement dans son ensemble. Exemple du français : menus, réglages et messages sont entièrement localisés.",
  "tut.lang.4.shot": "L’interface basculée en français",
  "tut.lang.5.name": "Ajouter d’autres langues de la même façon",
  "tut.lang.5.desc":
    "Le même procédé génère le russe, l’espagnol et toute autre langue ; les paquets de langue importés se choisissent, se gèrent ou se suppriment dans la page Language.",
  "tut.lang.5.shot": "L’interface russe ajoutée de la même façon",
  "tut.lang.note":
    "La traduction par l’IA prend pour source le fichier de langue chinois intégré ; si quelques termes manquent de justesse, exportez le fichier de langue, corrigez-le à la main, puis importez-le de nouveau.",

  // Tutoriel 6 : langue de l’interface (langues intégrées + paquets officiels)
  "tut.langpack.head": "Tutoriel 6 · Langue de l’interface",
  "tut.langpack.headEn": "TUTORIAL 6 · UI LANGUAGE",
  "tut.langpack.title": "Votre langue en deux étapes",
  "tut.langpack.lead":
    "GenePad intègre les interfaces chinoise et anglaise ; l’allemand, le russe, le japonais, le coréen et le français sont fournis sous forme de paquets officiels — téléchargez le fichier, importez-le dans les paramètres, sans aucune configuration. La même procédure vaut pour les paquets personnalisés générés par traduction IA.",
  "tut.langpack.1.name": "Ouvrir les réglages",
  "tut.langpack.1.desc": "Lancez GenePad et cliquez sur l’icône d’engrenage en haut à droite de l’écran d’accueil.",
  "tut.langpack.1.shot": "Écran d’accueil — cliquez sur l’icône d’engrenage en haut à droite",
  "tut.langpack.2.name": "Ouvrir les réglages de langue",
  "tut.langpack.2.desc":
    "Choisissez « Language » dans la barre latérale gauche de la fenêtre des réglages : un clic sur English ou 中文 bascule la langue intégrée ; les paquets importés apparaissent dans la même liste.",
  "tut.langpack.2.shot": "Réglages de langue — un clic sur une langue bascule aussitôt ; les boutons dessous importent / exportent les fichiers de langue",
  "tut.langpack.3.name": "Télécharger un paquet et l’importer",
  "tut.langpack.3.desc":
    "Téléchargez ci-dessous le paquet .json de votre langue, cliquez sur « Import Language File » et sélectionnez le fichier téléchargé. Une fois importée, la langue apparaît dans la liste — un clic bascule toute l’interface ; l’icône de corbeille à droite supprime un paquet importé.",
  "tut.langpack.3.shot": "Importé — la nouvelle langue figure dans la liste ; un clic suffit",
  "tut.langpack.4.name": "Toute l’interface bascule",
  "tut.langpack.4.desc":
    "Le choix d’une langue bascule immédiatement toute l’interface : menus, réglages et messages sont localisés. Les cinq paquets officiels en action :",
  "tut.langpack.4.shot1": "Interface en français",
  "tut.langpack.4.shot2": "Interface en coréen",
  "tut.langpack.4.shot3": "Interface en russe",
  "tut.langpack.4.shot4": "Interface en allemand",
  "tut.langpack.4.shot5": "Interface en japonais",
  "tut.lang.dl.hint":
    "Pas envie de configurer l’IA ? Téléchargez simplement un paquet officiel (allemand, russe, japonais, coréen, français) et importez-le ; compatible avec GenePad 0.7.x.",
  "tut.langpack.dl.title": "Télécharger les paquets officiels (.json)",
  "tut.langpack.dl.hint": "Compatible avec GenePad 0.7.x ; pas de décompression — importez le fichier directement comme à l’étape 3.",
  "tut.langpack.dl.btn": "Télécharger",
  "tut.langpack.note":
    "Les paquets de langue ne contiennent que le texte de l’interface — jamais de séquences ni de données de fichiers. Les paquets officiels sont mis à jour à chaque version ; importez le nouveau fichier pour mettre à jour. Une autre langue ? Le tutoriel 4 génère des paquets pour n’importe quelle langue par traduction IA.",

  // Tutoriel 2 : quitter SnapGene (catégorie migration, en tête de la page tutoriels)
  "title.tutorial.snapgene": "Alternative à SnapGene - GenePad | Éditeur de cartes plasmidiques gratuit et multiplateforme",
  "tut.toc.snapgene.name": "Quitter SnapGene",
  "tut.toc.snapgene.desc":
    "Vos fichiers .dna existants s’ouvrent et s’enregistrent directement, le quotidien est couvert (cartes, sites de restriction, alignement Sanger) — plus NGS, la bibliothèque de fichiers et d’autres exclusivités",
  "tut.toc.snapgene.en": "SWITCH FROM SNAPGENE",
  "tut.snapgene.head": "Tutoriel 1 · Quitter SnapGene",
  "tut.snapgene.headEn": "TUTORIAL 1 · SNAPGENE ALTERNATIVE",
  "tut.snapgene.title": "De SnapGene à GenePad : guide de migration du flux de travail",
  "tut.snapgene.lead":
    "Vous utilisez déjà SnapGene ? Ce guide montre ce que GenePad reprend de votre quotidien : les fichiers .dna existants s’ouvrent et s’enregistrent directement, et les cartes, sites de restriction, amorces et alignements Sanger fonctionnent comme vous vous y attendez — plus des capacités que SnapGene n’a pas : consultation de données NGS, bibliothèque de fichiers géniques et assistant IA. Pas besoin de choisir : la fonction « Ouvrir avec » renvoie le fichier à SnapGene à tout moment.",
  "tut.snapgene.1.name": "Ouvrez directement vos fichiers .dna existants",
  "tut.snapgene.1.desc":
    "Glissez un plasmide .dna de SnapGene dans GenePad : séquence principale, topologie, features, amorces et notes sont lues telles quelles ; les modifications se réenregistrent en .dna — aucun obstacle de format pour vos collègues restés sous SnapGene.",
  "tut.snapgene.1.shot": "Un plasmide .dna téléchargé d’Addgene ouvert directement : bascule circulaire/linéaire, features colorées par catégorie",
  "tut.snapgene.2.name": "Cartes, séquences et sites de restriction",
  "tut.snapgene.2.desc":
    "Les vues carte et séquence sont liées dans les deux sens : sélectionnez une entrée dans la table des annotations et la vue séquence saute à la zone correspondante, avec longueur, teneur GC et Tm affichées. Les sites de restriction sont dessinés sur la séquence double brin — survolez pour voir la séquence de reconnaissance, le brin, les positions de coupure et les extrémités 5′ protrusantes.",
  "tut.snapgene.2.shot1": "Une sélection dans la table des annotations déplace la vue séquence et affiche longueur, GC et Tm",
  "tut.snapgene.2.shot2": "Détail au survol d’un site de restriction : séquence de reconnaissance, positions de coupure et extrémité 5′",
  "tut.snapgene.3.name": "Alignement de séquençage Sanger",
  "tut.snapgene.3.desc":
    "Importez un fichier AB1 : le chromatogramme, les reads et la séquence de référence s’alignent base à base, avec taux d’identité et E-value, et les mésappariements en rouge.",
  "tut.snapgene.3.shot": "Trace AB1 alignée base à base avec la référence, mésappariements en rouge",
  "tut.snapgene.4.name": "Éléments courants et design de sgRNA",
  "tut.snapgene.4.desc":
    "À l’ouverture d’une carte, promoteurs, gènes de résistance et origines sont annotés automatiquement — la bibliothèque intégrée couvre 20 catégories, chaque entrée renvoyant à son numéro d’accession NCBI. Sélectionnez une séquence, clic droit, et concevez vos sgRNA : 12 dispositions de reconnaissance dont SpCas9, xCas9, Cas12a/b et TnpB, avec direction du PAM, longueur de graine et filtre hors-cible configurables ; les candidates reviennent sur la carte en un clic.",
  "tut.snapgene.4.shot": "Design de sgRNA directement depuis le menu contextuel : 12 dispositions, annotation sur la carte en un clic",
  "tut.snapgene.5.name": "Simulation d’électrophorèse et propriétés protéiques",
  "tut.snapgene.5.desc":
    "Simulation des gels d’agarose et du SDS-PAGE : les échelles courantes comme Trans2K® sont intégrées, les bandes se prédisent avant la migration. La sélection d’un CDS calcule en temps réel la masse moléculaire, le point isoélectrique (19 algorithmes), le GRAVY, l’indice aliphatique et le coefficient d’extinction.",
  "tut.snapgene.5.shot1": "Simulation de gel d’ADN : échelle Trans2K®, produits de digestion ou de PCR chargés en puits",
  "tut.snapgene.5.shot2": "Propriétés protéiques : masse moléculaire, pI, GRAVY, indice aliphatique et coefficient d’extinction",
  "tut.snapgene.6.name": "Consultation de données NGS",
  "tut.snapgene.6.desc":
    "Ouvrez directement des fichiers fastq.gz / fastq / fq.gz / fq (sans décompression) : les R1/R2 paired-end sont appariés et fusionnés read par read, chaque base colorée selon sa qualité Phred ; recherche par fragment d’acides aminés, rognage par ancres et rapport d’abondance de banque (export CSV).",
  "tut.snapgene.6.shot": "Reads appariés fusionnés un à un, bases colorées par qualité, statistiques à droite",
  "tut.snapgene.7.name": "Bibliothèque de fichiers et assistant IA",
  "tut.snapgene.7.desc":
    "Les plasmides dispersés dans vos dossiers sont réunis dans un seul index (index seul — les fichiers d’origine ne sont jamais modifiés), l’IA génère automatiquement des étiquettes de propriétés, et les dossiers surveillés récupèrent les nouveaux fichiers. L’assistant IA retrouve un fichier à partir d’une phrase et répond aux questions sur les éléments courants.",
  "tut.snapgene.7.shot": "Bibliothèque de fichiers géniques : étiquettes générées par IA, recherche par étiquette ou projet",
  "tut.snapgene.8.name": "Langues et « Ouvrir avec »",
  "tut.snapgene.8.desc":
    "Six langues d’interface intégrées (chinois, anglais, japonais, français, allemand, russe) plus des paquets traduits par IA pour n’importe quelle langue ; un clic droit confie à tout moment le fichier à SnapGene, VS Code ou tout autre outil désigné — GenePad complète sans s’approprier votre flux.",
  "tut.snapgene.8.shot1": "Réglages de langue : six langues intégrées, import de paquets ou génération par IA",
  "tut.snapgene.8.shot2": "« Ouvrir avec » : confier les fichiers à SnapGene, VS Code et autres outils en un clic",
  "tut.snapgene.note":
    "Licence : GenePad est en bêta publique gratuite ; après la bêta, les fonctions existantes — consultation, édition et enregistrement des cartes — resteront gratuites. Les utilisateurs académiques (universités, équipes hospitalières, iGEM, étudiants) bénéficient automatiquement d’un accès gratuit jusqu’au 31 décembre 2027, sans demande ; l’usage commercial sera couvert par la future GenePad Pro. Le clonage moléculaire de la boîte à outils est déjà disponible partiellement, le flux complet est en développement.",

  "tut.final.title":
    "Toutes les fonctions des tutoriels sont intégrées à GenePad, et non des logiciels distincts",
  "tut.final.desc":
    "Installez ou mettez à niveau GenePad, puis suivez les tutoriels : l’assistant IA, la bibliothèque de fichiers géniques et la consultation des données NGS œuvrent de concert dans un même programme. Actuellement en bêta publique gratuite, sur toutes les plateformes.",
  "tut.final.cta": "Retour à l’accueil",
  "tut.final.cta2": "Télécharger maintenant",
  "tut.top.hint": "Aller droit à la zone de téléchargement",

  // Sous-page statistiques (données en direct)
  "st.eyebrow": "Données en direct",
  "st.title": (
    <>
      Statistiques d’installation en direct,
      <br />
      soyez le prochain
    </>
  ),
  "st.lead":
    "Les chiffres ci-dessous sont agrégés à partir des statistiques d’utilisation anonymes collectées au sein de l’application GenePad : chaque installation ne compte que comme un identifiant aléatoire, sans aucune séquence, fichier ni donnée personnelle. Les données s’actualisent automatiquement à chaque rapport, et GenePad s’utilise sans inscription.",
  "st.k.installs": "Installations totales",
  "st.k.active30": "Actifs · 30 jours",
  "st.k.active7": "Actifs · 7 jours",
  "st.k.hours": "Durée d’utilisation cumulée",
  "st.k.hoursUnit": "heures",
  "st.chart.title": "Nouvelles installations hebdomadaires",
  "st.chart.title.daily": "Nouvelles installations quotidiennes",
  "st.chart.caption":
    "NOUVELLES INSTALLATIONS HEBDOMADAIRES — d’après le premier lancement de chaque installation (lundi à dimanche, UTC)",
  "st.chart.caption.daily":
    "NOUVELLES INSTALLATIONS QUOTIDIENNES — d’après la date du premier lancement de chaque installation (jours calendaires UTC)",
  "st.chart.note.daily":
    "La dernière barre est celle du jour, encore incomplète : le chiffre continuera de monter.",
  "st.chart.note.byos":
    "Les couleurs de la barre distinguent les systèmes d’exploitation ; survolez un segment pour voir l’effectif exact de chaque système.",
  "st.chart.total": "Total",
  "st.chart.legend.aria": "Légende par système d’exploitation",
  "st.tab.aria": "Granularité statistique",
  "st.tab.weekly": "Hebdomadaire",
  "st.tab.daily": "Quotidien",
  "st.os.title": "Répartition des installations par système",
  "st.os.other": "Autres",
  "st.updated": "Données mises à jour",
  "st.note":
    "Méthode : agrégation par identifiant d’installation aléatoire ; le comptage cesse dès que les statistiques sont désactivées ou que l’application est désinstallée.",
  "st.error":
    "Les statistiques sont momentanément inaccessibles ; veuillez actualiser puis réessayer.",
  "st.cta": "Téléchargez gratuitement — soyez le prochain utilisateur",
};

export default fr;
