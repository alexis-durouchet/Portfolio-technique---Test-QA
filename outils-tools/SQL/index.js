"use strict";

/* ==================================================
   1. CONFIGURATION DE LA DÉMONSTRATION SQL
   ================================================== */

/*
   Organisation actuelle :

   outils-tools/
        SQL/
            index.html
            index.css
            traductions.js
            index.js

   assets/
        SQL/
            Arbo-diag.png
            EXT-01.png à EXT-05.png
            INT-01.png à INT-04.png

   Les chemins des images sont relatifs à index.html.
*/

const configurationSQL = {

    // Dossier contenant les captures et le diagramme.
    dossierImages: "../../assets/SQL/",

    // Nom exact du diagramme dans le dépôt.
    diagramme: "Arbo-diag.png",

    // Dépôt principal du portfolio.
    depotPortfolio:
        "https://github.com/alexis-durouchet/Portfolio-technique---Test-QA",

    /*
       À compléter lorsque les huit scripts SQL
       seront disponibles sur GitHub.

       Exemple de format :
       https://github.com/UTILISATEUR/DEPOT/blob/main/sql/

       Ne pas renseigner une adresse approximative.
    */
    dossierScripts: "",

    // Langue utilisée si aucune préférence n'existe.
    langueDefaut: "fr"

};


/* ==================================================
   2. DÉFINITION DES MODULES ET DES SCÉNARIOS
   ================================================== */

const modulesSQL = [
    "STRUCTURE",
    "EXTRACTION",
    "INTEGRITE"
];

const scenariosSQL = {

    EXTRACTION: [
        "EXT-01",
        "EXT-02",
        "EXT-03",
        "EXT-04",
        "EXT-05"
    ],

    INTEGRITE: [
        "INT-01",
        "INT-02",
        "INT-03",
        "INT-04"
    ]

};


/* ==================================================
   3. LISTE DES HUIT SCRIPTS SQL
   ================================================== */

/*
   Les noms des fichiers sont conservés ici
   pour faciliter leur liaison avec GitHub.

   Les clés correspondent à celles définies
   dans traductions.js.
*/

const fichiersSQL = [
    {
        cle: "creation",
        nom: "01_creation_tables.sql"
    },
    {
        cle: "contraintes",
        nom: "02_contraintes.sql"
    },
    {
        cle: "donnees",
        nom: "03_jeu_donnees.sql"
    },
    {
        cle: "index",
        nom: "04_index.sql"
    },
    {
        cle: "gestion",
        nom: "05_gestion_donnees.sql"
    },
    {
        cle: "extraction",
        nom: "06_extraction_donnees.sql"
    },
    {
        cle: "complementaires",
        nom: "07_notions_complementaires.sql"
    },
    {
        cle: "tests",
        nom: "08_tests_qa.sql"
    }
];


/* ==================================================
   4. ÉTAT DE LA DÉMONSTRATION
   ================================================== */

let langueActiveSQL = configurationSQL.langueDefaut;

let moduleActifSQL = "STRUCTURE";

const scenarioActifSQL = {
    EXTRACTION: "EXT-01",
    INTEGRITE: "INT-01"
};


/* ==================================================
   5. RÉCUPÉRATION DES ÉLÉMENTS HTML
   ================================================== */

const elementsSQL = {

    boutonFR:
        document.getElementById("bouton-fr"),

    boutonEN:
        document.getElementById("bouton-en"),

    titreSite:
        document.getElementById("titre-site"),

    sousTitre:
        document.getElementById("sous-titre"),

    navigationModules:
        document.getElementById("navigation-modules"),

    navigationTests:
        document.getElementById("navigation-tests"),

    contenu:
        document.getElementById("contenu"),

    piedPage:
        document.getElementById("pied-page")

};


/* ==================================================
   6. FONCTIONS UTILITAIRES
   ================================================== */

/*
   Retourne les traductions de la langue active.

   L'objet traductionsSQL est déclaré dans
   le fichier traductions.js.
*/

function obtenirTraductionsSQL() {

    return traductionsSQL[langueActiveSQL];

}


/*
   Crée un élément HTML avec une classe
   et un texte facultatifs.
*/

function creerElementSQL(balise, classe = "", texte = null) {

    const element = document.createElement(balise);

    if (classe) {
        element.className = classe;
    }

    if (texte !== null) {
        element.textContent = texte;
    }

    return element;

}


/*
   Ajoute un titre à un conteneur.
*/

function ajouterTitreSQL(conteneur, niveau, texte) {

    const titre = creerElementSQL(
        "h" + niveau,
        "",
        texte
    );

    conteneur.appendChild(titre);

    return titre;

}


/*
   Ajoute un paragraphe à un conteneur.
*/

function ajouterParagrapheSQL(
    conteneur,
    texte,
    classe = ""
) {

    const paragraphe = creerElementSQL(
        "p",
        classe,
        texte
    );

    conteneur.appendChild(paragraphe);

    return paragraphe;

}


/*
   Crée un lien ouvrant une nouvelle page.
*/

function creerLienSQL(adresse, classe = "") {

    const lien = creerElementSQL("a", classe);

    lien.href = adresse;
    lien.target = "_blank";
    lien.rel = "noopener noreferrer";

    return lien;

}


/*
   Construit le chemin d'une image.
*/

function obtenirCheminImageSQL(nomFichier) {

    return configurationSQL.dossierImages + nomFichier;

}


/*
   Vérifie si le dossier GitHub contenant
   les scripts SQL a été configuré.
*/

function scriptsDisponiblesSQL() {

    return configurationSQL.dossierScripts.trim() !== "";

}


/*
   Construit le lien vers un script SQL.

   Cette fonction n'est utilisée que si
   dossierScripts a été renseigné.
*/

function obtenirLienScriptSQL(nomFichier) {

    const dossier =
        configurationSQL.dossierScripts.replace(/\/+$/, "");

    return dossier + "/" + encodeURIComponent(nomFichier);

}


/* ==================================================
   7. GESTION DE LA LANGUE
   ================================================== */

/*
   Récupère la langue enregistrée
   par le portfolio principal.
*/

function lireLangueSQL() {

    try {

        const langueEnregistree =
            localStorage.getItem("languePortfolio");

        if (
            langueEnregistree === "fr" ||
            langueEnregistree === "en"
        ) {
            return langueEnregistree;
        }

    } catch (erreur) {

        // Le stockage local peut être indisponible.
        // La langue par défaut sera alors utilisée.

    }

    return configurationSQL.langueDefaut;

}


/*
   Enregistre la langue sélectionnée.
*/

function enregistrerLangueSQL(langue) {

    try {

        localStorage.setItem("languePortfolio", langue);

    } catch (erreur) {

        // L'interface continue de fonctionner
        // même sans stockage local.

    }

}


/*
   Change la langue de la démonstration.
*/

function changerLangueSQL(langue) {

    if (langue !== "fr" && langue !== "en") {
        return;
    }

    langueActiveSQL = langue;

    enregistrerLangueSQL(langue);

    document.documentElement.lang = langue;

    afficherDemonstrationSQL();

}


/* ==================================================
   8. MISE À JOUR DES TEXTES GÉNÉRAUX
   ================================================== */

function afficherTextesGenerauxSQL() {

    const t = obtenirTraductionsSQL();

    document.title = t.titreSite;

    elementsSQL.titreSite.textContent = t.titreSite;

    elementsSQL.sousTitre.textContent = t.sousTitre;

    elementsSQL.piedPage.textContent =
        t.commun.piedPage;

    // État des boutons FR / EN.

    elementsSQL.boutonFR.classList.toggle(
        "actif",
        langueActiveSQL === "fr"
    );

    elementsSQL.boutonFR.setAttribute(
        "aria-pressed",
        String(langueActiveSQL === "fr")
    );

    elementsSQL.boutonEN.classList.toggle(
        "actif",
        langueActiveSQL === "en"
    );

    elementsSQL.boutonEN.setAttribute(
        "aria-pressed",
        String(langueActiveSQL === "en")
    );

    // Libellés des trois modules.

    const boutonsModules =
        elementsSQL.navigationModules.querySelectorAll(
            "[data-module]"
        );

    boutonsModules.forEach((bouton) => {

        const module = bouton.dataset.module;

        const numero =
            String(modulesSQL.indexOf(module) + 1)
                .padStart(2, "0");

        bouton.textContent =
            numero + " — " + t.modules[module];

    });

    // Libellés d'accessibilité des navigations.

    elementsSQL.navigationModules.setAttribute(
        "aria-label",
        t.navigationModules
    );

    elementsSQL.navigationTests.setAttribute(
        "aria-label",
        t.navigationTests
    );

}


/* ==================================================
   9. NAVIGATION ENTRE LES MODULES
   ================================================== */

/*
   Actualise les boutons de navigation.
*/

function actualiserNavigationModulesSQL() {

    const boutons =
        elementsSQL.navigationModules.querySelectorAll(
            "[data-module]"
        );

    boutons.forEach((bouton) => {

        const actif =
            bouton.dataset.module === moduleActifSQL;

        bouton.classList.toggle("actif", actif);

        bouton.setAttribute(
            "aria-pressed",
            String(actif)
        );

    });

}


/*
   Sélectionne un module.
*/

function changerModuleSQL(module) {

    if (!modulesSQL.includes(module)) {
        return;
    }

    moduleActifSQL = module;

    afficherDemonstrationSQL();

}


/* ==================================================
   10. NAVIGATION DES SCÉNARIOS QA
   ================================================== */

/*
   Affiche les boutons EXT ou INT.

   Le module STRUCTURE ne possède pas
   de navigation secondaire.
*/

function afficherNavigationScenariosSQL() {

    const navigation = elementsSQL.navigationTests;

    navigation.replaceChildren();

    if (moduleActifSQL === "STRUCTURE") {

        navigation.hidden = true;

        return;
    }

    navigation.hidden = false;

    const identifiants = scenariosSQL[moduleActifSQL];

    const selection =
        scenarioActifSQL[moduleActifSQL];

    identifiants.forEach((identifiant) => {

        const bouton = creerElementSQL(
            "button",
            "",
            identifiant
        );

        bouton.type = "button";

        const actif = identifiant === selection;

        bouton.classList.toggle("actif", actif);

        bouton.setAttribute(
            "aria-pressed",
            String(actif)
        );

        bouton.addEventListener("click", () => {

            scenarioActifSQL[moduleActifSQL] =
                identifiant;

            afficherDemonstrationSQL();

        });

        navigation.appendChild(bouton);

    });

}


/* ==================================================
   11. MODULE STRUCTURE : PRÉSENTATION DU PROJET
   ================================================== */

/*
   Affiche l'introduction et l'objectif QA.
*/

function creerIntroductionStructureSQL(conteneur, t) {

    ajouterTitreSQL(
        conteneur,
        2,
        t.structure.titre
    );

    ajouterParagrapheSQL(
        conteneur,
        t.structure.introduction
    );

    const presentation = creerElementSQL(
        "div",
        "presentation-base"
    );

    // Bloc de présentation.

    const blocPresentation = creerElementSQL(
        "div",
        "bloc-presentation"
    );

    ajouterTitreSQL(
        blocPresentation,
        3,
        t.structure.titrePresentation
    );

    ajouterParagrapheSQL(
        blocPresentation,
        t.structure.presentation
    );

    ajouterTitreSQL(
        blocPresentation,
        3,
        t.structure.titreObjectif
    );

    ajouterParagrapheSQL(
        blocPresentation,
        t.structure.objectif
    );

    // Bloc de légende.

    const blocLegende = creerElementSQL(
        "div",
        "bloc-legende"
    );

    ajouterTitreSQL(
        blocLegende,
        3,
        t.structure.titreLegende
    );

    const listeLegende =
        creerElementSQL("ul");

    t.structure.legende.forEach((texte) => {

        const ligne = creerElementSQL(
            "li",
            "",
            texte
        );

        listeLegende.appendChild(ligne);

    });

    blocLegende.appendChild(listeLegende);

    presentation.appendChild(blocPresentation);
    presentation.appendChild(blocLegende);

    conteneur.appendChild(presentation);

}


/* ==================================================
   12. MODULE STRUCTURE : LES CINQ TABLES
   ================================================== */

function creerListeTablesSQL(conteneur, t) {

    ajouterTitreSQL(
        conteneur,
        3,
        t.structure.titreTables
    );

    const grille = creerElementSQL(
        "div",
        "liste-tables"
    );

    const tables = [
        "Clients",
        "Produits",
        "Commandes",
        "Lignes_Commande",
        "Avis_Clients"
    ];

    tables.forEach((nomTable) => {

        const informations =
            t.structure.tables[nomTable];

        const carteTable = creerElementSQL(
            "div",
            "table-sql"
        );

        const nom = creerElementSQL(
            "strong",
            "",
            informations.titre
        );

        const description = creerElementSQL(
            "p",
            "",
            informations.description
        );

        carteTable.appendChild(nom);
        carteTable.appendChild(description);

        grille.appendChild(carteTable);

    });

    conteneur.appendChild(grille);

}


/* ==================================================
   13. MODULE STRUCTURE : DIAGRAMME RELATIONNEL
   ================================================== */

function creerDiagrammeSQL(conteneur, t) {

    const bloc = creerElementSQL(
        "div",
        "bloc-diagramme"
    );

    ajouterTitreSQL(
        bloc,
        3,
        t.structure.titreDiagramme
    );

    ajouterParagrapheSQL(
        bloc,
        t.structure.descriptionDiagramme
    );

    const chemin = obtenirCheminImageSQL(
        configurationSQL.diagramme
    );

    const lien = creerLienSQL(chemin);

    lien.setAttribute(
        "aria-label",
        t.structure.ouvrirDiagramme
    );

    const image = creerElementSQL("img");

    image.src = chemin;
    image.alt = t.structure.texteAlternatifDiagramme;

    image.loading = "lazy";
    image.decoding = "async";

    lien.appendChild(image);
    bloc.appendChild(lien);

    ajouterParagrapheSQL(
        bloc,
        t.structure.ouvrirDiagramme,
        "legende-diagramme"
    );

    conteneur.appendChild(bloc);

}


/* ==================================================
   14. MODULE STRUCTURE : SCRIPTS SQL
   ================================================== */

/*
   Les huit scripts sont présentés avec
   leur intitulé dans la langue active.

   Tant que dossierScripts est vide,
   les intitulés ne sont pas des liens.
*/

function creerListeScriptsSQL(conteneur, t) {

    ajouterTitreSQL(
        conteneur,
        3,
        t.structure.titreScripts
    );

    ajouterParagrapheSQL(
        conteneur,
        t.structure.descriptionScripts
    );

    const grille = creerElementSQL(
        "div",
        "liste-scripts"
    );

    fichiersSQL.forEach((fichier) => {

        const disponible = scriptsDisponiblesSQL();

        let element;

        if (disponible) {

            element = creerLienSQL(
                obtenirLienScriptSQL(fichier.nom),
                "lien-script"
            );

        } else {

            element = creerElementSQL(
                "div",
                "lien-script"
            );

        }

        element.textContent =
            t.structure.scripts[fichier.cle];

        grille.appendChild(element);

    });

    conteneur.appendChild(grille);

}


/* ==================================================
   15. AFFICHAGE COMPLET DU MODULE STRUCTURE
   ================================================== */

function afficherStructureSQL() {

    const t = obtenirTraductionsSQL();

    const fragment =
        document.createDocumentFragment();

    creerIntroductionStructureSQL(fragment, t);

    creerListeTablesSQL(fragment, t);

    creerDiagrammeSQL(fragment, t);

    const separateur = creerElementSQL("hr");

    fragment.appendChild(separateur);

    creerListeScriptsSQL(fragment, t);

    elementsSQL.contenu.replaceChildren(fragment);

}


/* ==================================================
   16. RÉCUPÉRATION D'UN SCÉNARIO QA
   ================================================== */

function obtenirScenarioActifSQL() {

    const t = obtenirTraductionsSQL();

    const identifiant =
        scenarioActifSQL[moduleActifSQL];

    const module =
        moduleActifSQL === "EXTRACTION"
            ? t.extraction
            : t.integrite;

    return {

        identifiant: identifiant,

        module: module,

        donnees: module.scenarios[identifiant],

        traductions: t

    };

}


/* ==================================================
   17. EN-TÊTE ET DESCRIPTION D'UN SCÉNARIO
   ================================================== */

function creerEnteteScenarioSQL(conteneur, scenario) {

    ajouterTitreSQL(
        conteneur,
        2,
        scenario.module.titre
    );

    ajouterParagrapheSQL(
        conteneur,
        scenario.module.introduction
    );

    ajouterParagrapheSQL(
        conteneur,
        scenario.module.consigne
    );

    const separateur = creerElementSQL("hr");

    conteneur.appendChild(separateur);

    const reference = creerElementSQL(
        "span",
        "reference-scenario",
        scenario.identifiant
    );

    conteneur.appendChild(reference);

    ajouterTitreSQL(
        conteneur,
        3,
        scenario.donnees.titre
    );

}


/* ==================================================
   18. INFORMATIONS DU SCÉNARIO QA
   ================================================== */

/*
   Présente le contexte métier, l'objectif QA
   et la contrainte testée lorsqu'elle existe.
*/

function creerInformationsScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const grille = creerElementSQL(
        "div",
        "informations-scenario"
    );

    const informations = [
        {
            titre: t.commun.contexte,
            texte: scenario.donnees.contexte
        },
        {
            titre: t.commun.objectif,
            texte: scenario.donnees.objectif
        }
    ];

    if (scenario.donnees.contrainte) {

        informations.push({
            titre: t.commun.contrainte,
            texte: scenario.donnees.contrainte
        });

    }

    informations.forEach((information) => {

        const bloc = creerElementSQL(
            "div",
            "information-qa"
        );

        ajouterTitreSQL(
            bloc,
            3,
            information.titre
        );

        ajouterParagrapheSQL(
            bloc,
            information.texte
        );

        grille.appendChild(bloc);

    });

    conteneur.appendChild(grille);

}


/* ==================================================
   19. CAPTURE D'ÉCRAN D'UN SCÉNARIO
   ================================================== */

function creerCaptureScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const bloc = creerElementSQL(
        "div",
        "capture-scenario"
    );

    const chemin = obtenirCheminImageSQL(
        scenario.identifiant + ".png"
    );

    const lien = creerLienSQL(chemin);

    lien.setAttribute(
        "aria-label",
        t.commun.ouvrirCapture
    );

    const image = creerElementSQL("img");

    image.src = chemin;

    image.alt =
        t.commun.capture +
        " — " +
        scenario.identifiant +
        " : " +
        scenario.donnees.titre;

    image.loading = "lazy";
    image.decoding = "async";

    lien.appendChild(image);
    bloc.appendChild(lien);

    ajouterParagrapheSQL(
        bloc,
        t.commun.ouvrirCapture,
        "legende-capture"
    );

    conteneur.appendChild(bloc);

}


/* ==================================================
   20. RÉSULTATS ET CONCLUSION DU SCÉNARIO
   ================================================== */

function creerResultatsScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const grille = creerElementSQL(
        "div",
        "informations-scenario"
    );

    const resultats = [
        {
            titre: t.commun.resultatAttendu,
            texte: scenario.donnees.resultatAttendu
        },
        {
            titre: t.commun.resultatObtenu,
            texte: scenario.donnees.resultatObtenu
        }
    ];

    resultats.forEach((resultat) => {

        const bloc = creerElementSQL(
            "div",
            "information-qa"
        );

        ajouterTitreSQL(
            bloc,
            3,
            resultat.titre
        );

        ajouterParagrapheSQL(
            bloc,
            resultat.texte
        );

        grille.appendChild(bloc);

    });

    conteneur.appendChild(grille);

    const conclusion = creerElementSQL(
        "div",
        "acces-projet"
    );

    ajouterTitreSQL(
        conclusion,
        3,
        t.commun.conclusion
    );

    const texteConclusion = ajouterParagrapheSQL(
        conclusion,
        scenario.donnees.conclusion
    );

    texteConclusion.classList.add(
        "resultat-valide"
    );

    conteneur.appendChild(conclusion);

}


/* ==================================================
   21. ACCÈS AU SCRIPT SQL COMPLET
   ================================================== */

/*
   Les captures présentent uniquement une sélection
   de requêtes et de tests QA.

   Les scripts complets pourront être consultés
   depuis GitHub lorsque leurs liens seront définis.
*/

function creerAccesScriptScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const bloc = creerElementSQL(
        "div",
        "acces-projet"
    );

    ajouterTitreSQL(
        bloc,
        3,
        t.commun.projetComplet
    );

    ajouterParagrapheSQL(
        bloc,
        t.commun.descriptionProjetComplet
    );

    /*
       Le lien individuel vers le script sera activé
       uniquement lorsque dossierScripts sera renseigné.
    */

    if (scriptsDisponiblesSQL()) {

        const nomFichier =
            moduleActifSQL === "EXTRACTION"
                ? "06_extraction_donnees.sql"
                : "08_tests_qa.sql";

        const lien = creerLienSQL(
            obtenirLienScriptSQL(nomFichier),
            "lien-script"
        );

        lien.textContent =
            t.commun.consulterScript;

        bloc.appendChild(lien);

    }

    /*
       Le dépôt principal est déjà connu.
       Ce lien reste disponible en permanence.
    */

    const lienDepot = creerLienSQL(
        configurationSQL.depotPortfolio
    );

    lienDepot.textContent =
        t.commun.consulterGitHub;

    bloc.appendChild(lienDepot);

    conteneur.appendChild(bloc);

}


/* ==================================================
   22. AFFICHAGE COMPLET D'UN SCÉNARIO
   ================================================== */

function afficherScenarioSQL() {

    const scenario = obtenirScenarioActifSQL();

    const fiche = creerElementSQL(
        "article",
        "fiche-scenario"
    );

    creerEnteteScenarioSQL(fiche, scenario);

    creerInformationsScenarioSQL(fiche, scenario);

    creerCaptureScenarioSQL(fiche, scenario);

    creerResultatsScenarioSQL(fiche, scenario);

    creerAccesScriptScenarioSQL(fiche, scenario);

    elementsSQL.contenu.replaceChildren(fiche);

}


/* ==================================================
   23. AFFICHAGE GÉNÉRAL DE LA DÉMONSTRATION
   ================================================== */

function afficherDemonstrationSQL() {

    afficherTextesGenerauxSQL();

    actualiserNavigationModulesSQL();

    afficherNavigationScenariosSQL();

    if (moduleActifSQL === "STRUCTURE") {

        afficherStructureSQL();

    } else {

        afficherScenarioSQL();

    }

}


/* ==================================================
   24. ÉVÉNEMENTS DES BOUTONS
   ================================================== */

function initialiserBoutonsSQL() {

    // Bouton français.

    elementsSQL.boutonFR.addEventListener(
        "click",
        () => changerLangueSQL("fr")
    );

    // Bouton anglais.

    elementsSQL.boutonEN.addEventListener(
        "click",
        () => changerLangueSQL("en")
    );

    // Navigation entre les trois modules.

    elementsSQL.navigationModules.addEventListener(
        "click",
        (evenement) => {

            const bouton =
                evenement.target.closest("[data-module]");

            if (!bouton) {
                return;
            }

            changerModuleSQL(
                bouton.dataset.module
            );

        }
    );

}


/* ==================================================
   25. COMMUNICATION AVEC LE PORTFOLIO PRINCIPAL
   ================================================== */

/*
   Lorsque la démonstration est affichée
   dans l'iframe du portfolio, elle peut
   recevoir un changement de langue.

   Le message attendu est :

   {
        type: "CHANGER_LANGUE",
        langue: "fr" ou "en"
   }
*/

function initialiserCommunicationSQL() {

    window.addEventListener(
        "message",
        (evenement) => {

            if (evenement.origin !== window.location.origin) {
                return;
            }

            if (
                evenement.data &&
                evenement.data.type === "CHANGER_LANGUE"
            ) {

                changerLangueSQL(
                    evenement.data.langue
                );

            }

        }
    );

}


/* ==================================================
   26. INITIALISATION DE LA DÉMONSTRATION
   ================================================== */

function initialiserSQL() {

    /*
       Vérification de la présence des traductions.

       Si traductions.js n'a pas été chargé,
       un message explicite apparaît dans la console.
    */

    if (typeof traductionsSQL === "undefined") {

        console.error(
            "SQL : traductions.js est absent ou n'a pas été chargé."
        );

        return;
    }

    /*
       Vérification des éléments HTML indispensables.
    */

    const elementsManquants = Object.entries(elementsSQL)
        .filter(([, element]) => element === null)
        .map(([nom]) => nom);

    if (elementsManquants.length > 0) {

        console.error(
            "SQL : éléments HTML introuvables :",
            elementsManquants
        );

        return;
    }

    /*
       Chargement de la langue enregistrée.
    */

    langueActiveSQL = lireLangueSQL();

    document.documentElement.lang =
        langueActiveSQL;

    /*
       Activation des interactions et
       premier affichage du module STRUCTURE.
    */

    initialiserBoutonsSQL();

    initialiserCommunicationSQL();

    afficherDemonstrationSQL();

}


/*
   Les fichiers JavaScript sont chargés avec defer.

   Le document HTML est donc disponible au moment
   où cette fonction est exécutée.
*/

initialiserSQL();
