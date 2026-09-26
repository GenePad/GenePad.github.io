/* Métadonnées head des coquilles françaises (fr.genepad.cn) : scripts/gen-shells.mjs lit ce
   fichier pour réécrire les modèles app/en/*.html en app/fr/*.html. pages.*.title doit
   correspondre mot à mot à la traduction title.* de src/lang/fr.tsx ; description est la
   traduction française de la meta description de la page homonyme des coquilles en. */
export default {
  code: "fr",
  dir: "fr",
  host: "fr.genepad.cn",
  htmlLang: "fr-FR",
  ogLocale: "fr_FR",
  boot: {
    tagline: "ÉDITEUR DE CARTES GÉNIQUES", // court libellé <small> du grand titre #boot, en capitales
    desc: "Un éditeur de cartes géniques multiplateforme pensé pour le clonage moléculaire au quotidien : parcourez et modifiez les cartes de plasmides, gérez les annotations de séquences, analysez les sites de restriction et alignez les chromatogrammes Sanger — l’intégralité du flux de travail, de la conception du clonage à la vérification des résultats.",
    loading: "Chargement", // aria-label du spinner
  },
  // <title> et meta description des 11 pages build (og/twitter réutilisent description)
  pages: {
    "index": {
      title: "GenePad - Éditeur de cartes géniques léger et multiplateforme",
      description:
        "GenePad est un éditeur de cartes géniques léger et multiplateforme pour le clonage moléculaire au quotidien : parcourez et modifiez les cartes de plasmides, gérez les annotations de séquences, analysez les sites de restriction et comparez les chromatogrammes Sanger. Formats pris en charge : GEN, GenBank, FASTA, SnapGene DNA (.dna), AB1 et GJSON.",
    },
    "tech-support": {
      title: "Documentation développeur - GenePad",
      description:
        "Portail de documentation développeur GenePad : définitions des fichiers .gen et .gjson, exemples de lecteur Rust et guide de conversion du .dna SnapGene.",
    },
    "projects": {
      title: "Projets - GenePad | Bibliothèques d’éléments plasmidiques et cartes de codons",
      description:
        "Projets d’écosystème maintenus par GenePad : une bibliothèque de séquences d’éléments plasmidiques communs (266 éléments en 20 catégories, traçables jusqu’au NCBI, sous licence MIT) et un atlas humain de l’usage des codons spécifique aux tissus, construit à partir de GTEx/GENCODE (code source public) — des outils pour chercheurs et développeurs.",
    },
    "library": {
      title: "Bibliothèque de fichiers - GenePad | Recherche et gestion de fichiers plasmidiques",
      description:
        "La bibliothèque de fichiers plasmidiques intégrée à GenePad : rassemblez en un index unique et consultable les fichiers plasmidiques dispersés dans vos dossiers — organisez-les par projet, par chemin de stockage ou par étiquettes générées par IA ; configurez DeepSeek pour étiqueter automatiquement les plasmides et retrouvez-les par leurs attributs grâce à l’assistant IA, sans mémoriser ni noms ni emplacements.",
    },
    "ngs": {
      title: "Visualiseur NGS - GenePad | Consultation de données FASTQ et analyse d’abondance de banques",
      description:
        "Le visualiseur de données NGS intégré à GenePad : ouvrez directement les fichiers fastq.gz / fastq / fq.gz / fq par clic droit « Open With » ou glisser-déposer ; fichiers à extrémités appariées reconnus et fusionnés automatiquement, qualité de séquençage base à base, recherche par fragment d’acides aminés pour localiser les régions variables, ancres de rognage pour une capture en lot et rapports d’abondance de banque en un clic.",
    },
    "tutorial": {
      title: "Tutoriels - GenePad | Configuration IA · Bibliothèque de fichiers · Analyse NGS",
      description:
        "Le répertoire des tutoriels GenePad : des guides illustrés pas à pas — configurer l’IA DeepSeek, organiser la bibliothèque de fichiers géniques, mener des données NGS de fastq.gz au rapport d’abondance de banque, et plus encore. Une page par tutoriel, enrichi au fil du temps.",
    },
    "tutorial-ai": {
      title: "Tutoriel de configuration IA - GenePad | Obtenir et enregistrer une clé API DeepSeek",
      description:
        "Tutoriel GenePad pas à pas : connecter DeepSeek en cinq étapes — ouvrir les réglages, créer un profil, choisir le modèle, créer et copier une clé API sur la plateforme DeepSeek, puis coller, tester la connexion et enregistrer pour débloquer l’assistant IA et les étiquettes automatiques des plasmides. Chaque étape illustrée par de véritables captures d’écran.",
    },
    "tutorial-library": {
      title: "Tutoriel bibliothèque de fichiers - GenePad | Import, recherche et étiquettes IA des plasmides",
      description:
        "Tutoriel GenePad pas à pas : ajoutez des dossiers surveillés pour que les plasmides s’importent tout seuls, parcourez-les par projet, par chemin de stockage ou par étiquettes IA, localisez les plasmides via l’assistant IA et confiez les fichiers à SnapGene / VS Code en un clic. Chaque étape illustrée par de véritables captures d’écran.",
    },
    "tutorial-ngs": {
      title: "Tutoriel d’analyse NGS - GenePad | Consultation fastq.gz et rapport d’abondance",
      description:
        "Tutoriel GenePad pas à pas : ouvrez un fastq.gz par glisser-déposer, appariez automatiquement les fichiers à extrémités appariées, contrôlez la qualité base à base, cherchez par acides aminés, rognez avec des ancres et générez un rapport d’abondance de banque — avec une vidéo complète pas à pas. Chaque étape illustrée par de véritables captures d’écran.",
    },
    "tutorial-lang": {
      title: "Tutoriel toutes langues - GenePad | Traduire des paquets de langue avec l’IA",
      description:
        "Tutoriel GenePad pas à pas : ouvrez Réglages → Language → AI Translate, saisissez une langue cible (français, russe, et plus encore) et l’IA configurée génère le paquet de langue puis bascule toute l’interface — les textes longs sont traduits par segments avec relances automatiques, et les paquets s’exportent et se corrigent à la main. Chaque étape illustrée par de véritables captures d’écran.",
    },
        "tutorial-snapgene": {
      title: "Alternative à SnapGene - GenePad | Éditeur de cartes plasmidiques gratuit et multiplateforme",
      description:
        "Guide GenePad pour quitter SnapGene : vos fichiers .dna s’ouvrent et s’enregistrent directement ; cartes, sites de restriction, amorces et alignement Sanger fonctionnent comme attendu — plus la consultation NGS, la bibliothèque de fichiers, l’assistant IA et une interface en six langues. Bêta publique gratuite sur Windows, macOS, Linux et Android, avec « Ouvrir avec » pour rendre la main à SnapGene à tout moment.",
    },
"tutorial-langpack": {
      title: "Tutoriel langue de l’interface - GenePad | Langues intégrées et paquets officiels",
      description:
        "Tutoriel GenePad sur la langue de l’interface : ouvrez Réglages → Language pour basculer entre le chinois et l’anglais intégrés, ou importez via « Import Language File » un paquet officiel (allemand, russe, japonais, coréen, français) — toute l’interface bascule aussitôt, sans configuration. Pas à pas illustré, les cinq paquets officiels en téléchargement.",
    },
    "stats": {
      title: "Données en direct - GenePad | Statistiques d’utilisation publiques",
      description:
        "Statistiques d’utilisation en direct de GenePad : installations totales, utilisateurs actifs sur les 30 derniers jours, durée d’utilisation cumulée et tendances hebdomadaires des installations. Agrégées automatiquement par la télémétrie anonyme intégrée et ouvertes au public — sans aucune information personnelle.",
    },
  },
};
