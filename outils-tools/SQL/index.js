
"use strict";

/* ==========================================================
   01 — CONFIGURATION GÉNÉRALE DE LA DÉMONSTRATION
   ========================================================== */

const CONFIG_SQL = {

    // Dépôt principal du portfolio.
    depotPortfolio:
        "https://github.com/alexis-durouchet/Portfolio-technique---Test-QA",

    // Chemin des captures depuis outils-tools/SQL/index.html.
    dossierImages: "../../assets/SQL/",

    // À compléter lorsque le dossier des scripts sera publié.
    // Exemple : "https://github.com/.../tree/main/sql"
    dossierScripts: "",

    // Image de présentation de la structure SQL Server.
    diagramme: "Arbo-diag.png",

    // Langue utilisée en l'absence de préférence enregistrée.
    langueDefaut: "fr"

};


/* ==========================================================
   02 — DÉFINITION DES MODULES ET DES CAS D'USAGE
   ========================================================== */

const MODULES_SQL = ["STRUCTURE", "EXTRACTION", "INTEGRITE"];

const SCENARIOS_SQL = {

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

const SCRIPTS_SQL = [
    "01_creation_tables.sql",
    "02_contraintes.sql",
    "03_jeu_donnees.sql",
    "04_index.sql",
    "05_gestion_donnees.sql",
    "06_extraction_donnees.sql",
    "07_notions_complementaires.sql",
    "08_tests_qa.sql"
];


/* ==========================================================
   03 — ÉTAT ACTUEL DE L'INTERFACE
   ========================================================== */

let langueSQL = CONFIG_SQL.langueDefaut;

let moduleActifSQL = "STRUCTURE";

const scenarioActifSQL = {
    EXTRACTION: "EXT-01",
    INTEGRITE: "INT-01"
};


/* ==========================================================
   04 — RÉCUPÉRATION DES ÉLÉMENTS HTML
   ========================================================== */

const elementsSQL = {

    titreSite: document.getElementById("titre-site"),
    sousTitre: document.getElementById("sous-titre"),

    boutonFR: document.getElementById("bouton-fr"),
    boutonEN: document.getElementById("bouton-en"),

    navigationModules:
        document.getElementById("navigation-modules"),

    ongletStructure:
        document.getElementById("onglet-structure"),

    ongletExtraction:
        document.getElementById("onglet-extraction"),

    ongletIntegrite:
        document.getElementById("onglet-integrite"),

    numeroModule:
        document.getElementById("numero-module-actif"),

    titreModule:
        document.getElementById("titre-module"),

    descriptionModule:
        document.getElementById("description-module"),

    navigationTests:
        document.getElementById("navigation-tests"),

    contenu:
        document.getElementById("contenu"),

    textePiedPage:
        document.getElementById("texte-pied-page"),

    texteLienDepot:
        document.getElementById("texte-lien-depot"),

    lienDepot:
        document.getElementById("lien-depot")

};


/* ==========================================================
   05 — FONCTIONS UTILITAIRES
   ========================================================== */

/**
 * Retourne les traductions correspondant à la langue active.
 */
function obtenirTraductionsSQL() {
    return traductionsSQL[langueSQL];
}


/**
 * Construit le chemin vers une image du projet.
 */
function cheminImageSQL(nomFichier) {
    return CONFIG_SQL.dossierImages + nomFichier;
}


/**
 * Crée un élément HTML avec une classe CSS facultative.
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


/**
 * Ajoute un paragraphe dans un conteneur.
 */
function ajouterParagrapheSQL(conteneur, texte, classe = "") {

    const paragraphe = creerElementSQL("p", classe, texte);

    conteneur.appendChild(paragraphe);

    return paragraphe;
}


/**
 * Ajoute un titre dans un conteneur.
 */
function ajouterTitreSQL(conteneur, niveau, texte) {

    const titre = creerElementSQL("h" + niveau, "", texte);

    conteneur.appendChild(titre);

    return titre;
}


/**
 * Construit un lien sécurisé ouvrant une nouvelle page.
 */
function creerLienSQL(url, classe = "") {

    const lien = creerElementSQL("a", classe);

    lien.href = url;
    lien.target = "_blank";
    lien.rel = "noopener noreferrer";

    return lien;
}


/**
 * Vérifie que le chemin GitHub des scripts est configuré.
 */
function scriptsDisponiblesSQL() {

    return (
        typeof CONFIG_SQL.dossierScripts === "string" &&
        CONFIG_SQL.dossierScripts.trim() !== ""
    );

}


/**
 * Construit l'adresse d'un script dans le dépôt GitHub.
 */
function urlScriptSQL(nomFichier) {

    const dossier = CONFIG_SQL.dossierScripts.replace(/\/+$/, "");

    return dossier + "/" + encodeURIComponent(nomFichier);

}


/* ==========================================================
   06 — GESTION DE LA LANGUE
   ========================================================== */

/**
 * Lit la préférence linguistique enregistrée par le portfolio.
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

        // La démonstration reste utilisable si le stockage
        // local n'est pas disponible.

    }

    return CONFIG_SQL.langueDefaut;

}


/**
 * Enregistre la langue sélectionnée.
 */
function enregistrerLangueSQL(langue) {

    try {
        localStorage.setItem("languePortfolio", langue);
    } catch (erreur) {

        // L'enregistrement n'est pas indispensable
        // au fonctionnement de la démonstration.

    }

}


/**
 * Met à jour la langue et réaffiche le contenu actif.
 */
function changerLangueSQL(langue) {

    if (langue !== "fr" && langue !== "en") {
        return;
    }

    langueSQL = langue;

    enregistrerLangueSQL(langue);

    document.documentElement.lang = langue;

    afficherInterfaceSQL();

}


/* ==========================================================
   07 — MISE À JOUR DE L'EN-TÊTE ET DU PIED DE PAGE
   ========================================================== */

function afficherTextesGenerauxSQL() {

    const t = obtenirTraductionsSQL();

    document.title = t.titreSite;

    elementsSQL.titreSite.textContent = t.titreSite;
    elementsSQL.sousTitre.textContent = t.sousTitre;

    elementsSQL.ongletStructure.textContent =
        t.onglets.STRUCTURE;

    elementsSQL.ongletExtraction.textContent =
        t.onglets.EXTRACTION;

    elementsSQL.ongletIntegrite.textContent =
        t.onglets.INTEGRITE;

    elementsSQL.textePiedPage.textContent =
        t.piedPage;

    elementsSQL.texteLienDepot.textContent =
        t.lienDepot;

    elementsSQL.lienDepot.href =
        CONFIG_SQL.depotPortfolio;

    elementsSQL.boutonFR.setAttribute(
        "aria-pressed",
        String(langueSQL === "fr")
    );

    elementsSQL.boutonEN.setAttribute(
        "aria-pressed",
        String(langueSQL === "en")
    );

}


/* ==========================================================
   08 — NAVIGATION ENTRE LES TROIS MODULES
   ========================================================== */

/**
 * Met à jour l'état visuel des boutons de module.
 */
function actualiserBoutonsModulesSQL() {

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


/**
 * Affiche le titre et la description du module actif.
 */
function afficherPresentationModuleSQL() {

    const t = obtenirTraductionsSQL();

    const indexModule =
        MODULES_SQL.indexOf(moduleActifSQL) + 1;

    const numero =
        String(indexModule).padStart(2, "0");

    const module =
        t.modules[moduleActifSQL];

    elementsSQL.numeroModule.textContent =
        t.module + " " + numero;

    elementsSQL.titreModule.textContent =
        module.titre;

    elementsSQL.descriptionModule.textContent =
        module.description;

}


/**
 * Change de module tout en conservant le scénario
 * sélectionné précédemment dans chaque catégorie.
 */
function changerModuleSQL(module) {

    if (!MODULES_SQL.includes(module)) {
        return;
    }

    moduleActifSQL = module;

    afficherInterfaceSQL();

}


/* ==========================================================
   09 — NAVIGATION ENTRE LES SCÉNARIOS QA
   ========================================================== */

/**
 * Construit les boutons EXT-01 à EXT-05
 * ou INT-01 à INT-04 selon le module actif.
 */
function afficherNavigationTestsSQL() {

    const navigation = elementsSQL.navigationTests;

    navigation.replaceChildren();

    if (moduleActifSQL === "STRUCTURE") {

        navigation.hidden = true;

        return;
    }

    navigation.hidden = false;

    const scenarios = SCENARIOS_SQL[moduleActifSQL];

    const selection =
        scenarioActifSQL[moduleActifSQL];

    const t = obtenirTraductionsSQL();

    navigation.setAttribute(
        "aria-label",
        moduleActifSQL === "EXTRACTION"
            ? t.tests.navigationExtraction
            : t.tests.navigationIntegrite
    );

    scenarios.forEach((identifiant) => {

        const bouton =
            creerElementSQL(
                "button",
                "bouton-test",
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

            afficherInterfaceSQL();

        });

        navigation.appendChild(bouton);

    });

}


/* ==========================================================
   10 — PRÉSENTATION DE LA STRUCTURE DE LA BASE
   ========================================================== */

/**
 * Construit la présentation des cinq tables et
 * la légende du diagramme relationnel.
 */
function creerPresentationBaseSQL(conteneur, t) {

    const grille =
        creerElementSQL("div", "grille-presentation");

    // Bloc gauche : présentation générale.

    const presentation =
        creerElementSQL("section", "bloc-presentation");

    ajouterTitreSQL(
        presentation,
        3,
        t.structure.titrePresentation
    );

    ajouterParagrapheSQL(
        presentation,
        t.structure.descriptionPresentation
    );

    ajouterTitreSQL(
        presentation,
        4,
        t.structure.titreTables
    );

    const listeTables =
        creerElementSQL("ul", "liste-tables");

    const nomsTables = [
        "Clients",
        "Produits",
        "Commandes",
        "Lignes_Commande",
        "Avis_Clients"
    ];

    nomsTables.forEach((nomTable) => {

        const ligne = creerElementSQL("li");

        const nom =
            creerElementSQL("strong", "", nomTable + " : ");

        const description =
            document.createTextNode(
                t.structure.tables[nomTable]
            );

        ligne.appendChild(nom);
        ligne.appendChild(description);

        listeTables.appendChild(ligne);

    });

    presentation.appendChild(listeTables);

    // Bloc droit : légende.

    const legende =
        creerElementSQL("aside", "bloc-legende");

    ajouterTitreSQL(
        legende,
        3,
        t.structure.titreLegende
    );

    const listeLegende =
        creerElementSQL("ul", "liste-legende");

    t.structure.legende.forEach((texte) => {

        const ligne =
            creerElementSQL("li", "", "• " + texte);

        listeLegende.appendChild(ligne);

    });

    legende.appendChild(listeLegende);

    grille.appendChild(presentation);
    grille.appendChild(legende);

    conteneur.appendChild(grille);

}


/**
 * Affiche le diagramme et son lien d'agrandissement.
 */
function creerDiagrammeSQL(conteneur, t) {

    const section =
        creerElementSQL("section", "section-diagramme");

    const entete =
        creerElementSQL("div", "entete-section");

    ajouterTitreSQL(
        entete,
        3,
        t.structure.titreDiagramme
    );

    ajouterParagrapheSQL(
        entete,
        t.structure.descriptionDiagramme
    );

    section.appendChild(entete);

    const chemin =
        cheminImageSQL(CONFIG_SQL.diagramme);

    const lien =
        creerLienSQL(chemin, "lien-diagramme");

    lien.setAttribute(
        "aria-label",
        t.structure.texteAgrandir
    );

    const image =
        creerElementSQL("img", "image-diagramme");

    image.src = chemin;
    image.alt = t.structure.altDiagramme;
    image.loading = "lazy";
    image.decoding = "async";

    lien.appendChild(image);

    section.appendChild(lien);

    ajouterParagrapheSQL(
        section,
        t.structure.texteAgrandir,
        "legende-image"
    );

    conteneur.appendChild(section);

}


/* ==========================================================
   11 — PRÉSENTATION DES HUIT SCRIPTS SQL
   ========================================================== */

/**
 * Construit la section d'accès au code SQL complet.
 *
 * Tant que le dossier GitHub des scripts n'est pas
 * configuré, les noms restent visibles sans faux lien.
 */
function creerSectionScriptsSQL(conteneur, t) {

    const section =
        creerElementSQL("section", "section-scripts");

    ajouterTitreSQL(
        section,
        3,
        t.structure.titreScripts
    );

    ajouterParagrapheSQL(
        section,
        t.structure.descriptionScripts
    );

    const grille =
        creerElementSQL("div", "grille-scripts");

    SCRIPTS_SQL.forEach((nomFichier) => {

        const disponible = scriptsDisponiblesSQL();

        const element = disponible
            ? creerLienSQL(
                urlScriptSQL(nomFichier),
                "lien-script"
            )
            : creerElementSQL(
                "div",
                "lien-script"
            );

        if (!disponible) {
            element.setAttribute(
                "aria-disabled",
                "true"
            );
        } else {
            element.title = t.structure.texteLienScript;
        }

        const texte =
            creerElementSQL("span", "nom-script");

        const nom =
            creerElementSQL(
                "strong",
                "",
                nomFichier
            );

        const description =
            creerElementSQL(
                "span",
                "",
                t.structure.scripts[nomFichier]
            );

        description.style.display = "block";
        description.style.fontSize = "12px";
        description.style.fontWeight = "400";
        description.style.color =
            "var(--texte-secondaire)";

        texte.appendChild(nom);
        texte.appendChild(description);

        element.appendChild(texte);

        if (disponible) {

            const icone =
                creerElementSQL(
                    "span",
                    "icone-lien",
                    "↗"
                );

            icone.setAttribute("aria-hidden", "true");

            element.appendChild(icone);

        }

        grille.appendChild(element);

    });

    section.appendChild(grille);

    conteneur.appendChild(section);

}


/**
 * Assemble le premier module :
 * présentation, légende, diagramme et scripts.
 */
function afficherStructureSQL() {

    const t = obtenirTraductionsSQL();

    const fragment =
        document.createDocumentFragment();

    creerPresentationBaseSQL(fragment, t);

    creerDiagrammeSQL(fragment, t);

    creerSectionScriptsSQL(fragment, t);

    elementsSQL.contenu.replaceChildren(fragment);

}


/* ==========================================================
   12 — AFFICHAGE DES CAS D'USAGE SQL
   ========================================================== */

/**
 * Retourne les données traduites d'un scénario.
 */
function obtenirScenarioSQL() {

    const t = obtenirTraductionsSQL();

    const identifiant =
        scenarioActifSQL[moduleActifSQL];

    const donnees = moduleActifSQL === "EXTRACTION"
        ? t.extraction[identifiant]
        : t.integrite[identifiant];

    return {
        identifiant,
        donnees,
        traductions: t
    };

}


/**
 * Construit le titre, l'identifiant et la description
 * d'un scénario QA.
 */
function creerEnteteScenarioSQL(conteneur, scenario) {

    const entete =
        creerElementSQL("div", "entete-test");

    const groupe =
        creerElementSQL("div");

    const identifiant =
        creerElementSQL(
            "span",
            "identifiant-test",
            scenario.identifiant
        );

    const titre =
        creerElementSQL(
            "h3",
            "titre-test",
            scenario.donnees.titre
        );

    groupe.appendChild(identifiant);
    groupe.appendChild(titre);

    entete.appendChild(groupe);

    conteneur.appendChild(entete);

    ajouterParagrapheSQL(
        conteneur,
        scenario.donnees.description,
        "description-test"
    );

}


/**
 * Affiche une capture SSMS correspondant à un scénario.
 */
function creerCaptureScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const bloc =
        creerElementSQL("div", "bloc-capture");

    const nomFichier =
        scenario.identifiant + ".png";

    const chemin =
        cheminImageSQL(nomFichier);

    const lien =
        creerLienSQL(chemin, "lien-capture");

    lien.setAttribute(
        "aria-label",
        t.tests.agrandirCapture
    );

    const image =
        creerElementSQL("img", "image-capture");

    image.src = chemin;

    image.alt =
        t.tests.titreCapture +
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
        t.tests.agrandirCapture,
        "legende-capture"
    );

    conteneur.appendChild(bloc);

}


/**
 * Présente le résultat attendu et le résultat observé.
 *
 * Pour les tests négatifs, le rejet est un comportement
 * attendu et non un échec du scénario QA.
 */
function creerResultatScenarioSQL(conteneur, scenario) {

    const t = scenario.traductions;

    const resultat =
        creerElementSQL("div", "resultat-test");

    const contenu =
        creerElementSQL("div");

    const attendu =
        creerElementSQL("p");

    const titreAttendu =
        creerElementSQL(
            "strong",
            "",
            t.tests.resultatAttendu + " : "
        );

    attendu.appendChild(titreAttendu);

    attendu.appendChild(
        document.createTextNode(
            scenario.donnees.attendu
        )
    );

    const observe =
        creerElementSQL("p");

    const titreObserve =
        creerElementSQL(
            "strong",
            "",
            t.tests.resultatObserve + " : "
        );

    observe.appendChild(titreObserve);

    observe.appendChild(
        document.createTextNode(
            scenario.donnees.observe
        )
    );

    contenu.appendChild(attendu);
    contenu.appendChild(observe);

    resultat.appendChild(contenu);

    conteneur.appendChild(resultat);

}


/**
 * Affiche le cas d'usage sélectionné.
 */
function afficherScenarioSQL() {

    const scenario =
        obtenirScenarioSQL();

    const fiche =
        creerElementSQL("article", "fiche-test");

    creerEnteteScenarioSQL(fiche, scenario);

    creerCaptureScenarioSQL(fiche, scenario);

    creerResultatScenarioSQL(fiche, scenario);

    elementsSQL.contenu.replaceChildren(fiche);

}


/* ==========================================================
   13 — AFFICHAGE GLOBAL DE L'INTERFACE
   ========================================================== */

/**
 * Actualise l'ensemble des zones dépendantes
 * du module et de la langue sélectionnés.
 */
function afficherInterfaceSQL() {

    afficherTextesGenerauxSQL();

    actualiserBoutonsModulesSQL();

    afficherPresentationModuleSQL();

    afficherNavigationTestsSQL();

    if (moduleActifSQL === "STRUCTURE") {

        afficherStructureSQL();

    } else {

        afficherScenarioSQL();

    }

}


/* ==========================================================
   14 — GESTION DES ÉVÉNEMENTS
   ========================================================== */

/**
 * Initialise les événements des boutons de langue.
 */
function initialiserLanguesSQL() {

    elementsSQL.boutonFR.addEventListener(
        "click",
        () => changerLangueSQL("fr")
    );

    elementsSQL.boutonEN.addEventListener(
        "click",
        () => changerLangueSQL("en")
    );

}


/**
 * Initialise la navigation entre les trois modules.
 */
function initialiserModulesSQL() {

    elementsSQL.navigationModules.addEventListener(
        "click",
        (evenement) => {

            const bouton =
                evenement.target.closest("[data-module]");

            if (!bouton) {
                return;
            }

            changerModuleSQL(bouton.dataset.module);

        }
    );

}


/**
 * Écoute les changements de langue envoyés par
 * le portfolio parent à travers l'iframe.
 */
function initialiserCommunicationPortfolioSQL() {

    window.addEventListener(
        "message",
        (evenement) => {

            // La démonstration accepte uniquement les
            // messages provenant de la même origine.
            if (evenement.origin !== window.location.origin) {
                return;
            }

            if (
                evenement.data &&
                evenement.data.type === "CHANGER_LANGUE"
            ) {

                changerLangueSQL(evenement.data.langue);

            }

        }
    );

}


/* ==========================================================
   15 — INITIALISATION DE LA PAGE
   ========================================================== */

function initialiserDemonstrationSQL() {

    langueSQL = lireLangueSQL();

    document.documentElement.lang = langueSQL;

    initialiserLanguesSQL();

    initialiserModulesSQL();

    initialiserCommunicationPortfolioSQL();

    afficherInterfaceSQL();

}


// Les scripts sont chargés avec defer dans index.html.
// Le DOM est donc disponible au moment de l'initialisation.

initialiserDemonstrationSQL();

