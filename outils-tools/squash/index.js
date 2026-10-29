"use strict";

/* ==================================================
   1. CONFIGURATION DES MODULES
   ================================================== */

const modules = {
    ARBO: {
        tests: []
    },

    AUTH: {
        tests: [
            "AUTH-001",
            "AUTH-002",
            "AUTH-003",
            "AUTH-004",
            "AUTH-005"
        ]
    },

    CAT: {
        tests: [
            "CAT-001",
            "CAT-002",
            "CAT-003",
            "CAT-004"
        ]
    },

    PAN: {
        tests: []
    },

    CMD: {
        tests: []
    }
};


/* ==================================================
   2. CONFIGURATION DES CAPTURES
   ================================================== */

/*
   Les chemins sont relatifs à index.html,
   situé dans outils-tools/squash/.

   Les captures sont stockées dans assets/squash/.
*/

const captures = {
    ARBO: "../../assets/squash/Cas de test DemoBlaze01.png",

    "AUTH-001": "../../assets/squash/Auth-001 01.png",
    "AUTH-002": "../../assets/squash/Auth-002 01.png",
    "AUTH-003": "../../assets/squash/Auth-003 01.png",
    "AUTH-004": "../../assets/squash/Auth-004 01.png",
    "AUTH-005": "../../assets/squash/Auth-005 01.png"
};


/* ==================================================
   3. CONFIGURATION DES TESTS VALIDÉS
   ================================================== */

const testsValides = new Set([
    "AUTH-001",
    "AUTH-002",
    "AUTH-003",
    "AUTH-004",
    "AUTH-005"
]);


/* ==================================================
   4. ÉTAT DE LA DÉMONSTRATION
   ================================================== */

let langueActuelle = "fr";
let moduleActif = "ARBO";
let testActif = null;


/* ==================================================
   5. GESTION DES LANGUES
   ================================================== */

/* Récupération de la langue enregistrée */

function recupererLangue() {
    try {
        const langueEnregistree =
            localStorage.getItem("languePortfolio");

        if (langueEnregistree === "fr" ||
            langueEnregistree === "en") {
            return langueEnregistree;
        }
    } catch (erreur) {
        // Le français reste la langue par défaut.
    }

    return "fr";
}


/* Changement de langue */

function changerLangue(langue) {

    if (!traductionsSquash[langue]) {
        return;
    }

    langueActuelle = langue;

    // Mise à jour de la langue du document
    document.documentElement.lang = langue;

    // Mise à jour des boutons FR / EN
    document.querySelectorAll(".langues button").forEach(bouton => {
        const estActif = bouton.lang === langue;

        bouton.classList.toggle("actif", estActif);
        bouton.setAttribute("aria-pressed", String(estActif));
    });

    // Mise à jour des textes fixes
    traduireInterface();

    // Actualisation du contenu affiché
    afficherNavigationModules();
    afficherNavigationTests();
    afficherContenu();

    // Enregistrement du choix
    try {
        localStorage.setItem("languePortfolio", langue);
    } catch (erreur) {
        // Le site reste utilisable sans stockage.
    }
}


/* Traduction des éléments fixes */

function traduireInterface() {

    const textes = traductionsSquash[langueActuelle].interface;

    document.getElementById("titre-site").textContent =
        textes.titre;

    document.getElementById("sous-titre").textContent =
        textes.sousTitre;

    document.getElementById("pied-page").textContent =
        textes.piedPage;

    document.getElementById("navigation-modules")
        .setAttribute("aria-label", textes.navigationModules);

    document.getElementById("navigation-tests")
        .setAttribute("aria-label", textes.navigationTests);

    document.title = textes.titre;
}


/* ==================================================
   6. NAVIGATION DES MODULES
   ================================================== */

/* Sélection d'un module */

function choisirModule(module) {

    if (!modules[module]) {
        return;
    }

    moduleActif = module;
    testActif = null;

    afficherNavigationModules();
    afficherNavigationTests();
    afficherContenu();
}


/* Mise à jour des boutons de modules */

function afficherNavigationModules() {

    const textes = traductionsSquash[langueActuelle].interface;

    document.querySelectorAll(
        "#navigation-modules button"
    ).forEach(bouton => {

        const module = bouton.dataset.module;
        const estActif = module === moduleActif;

        bouton.textContent = textes.modules[module];

        bouton.classList.toggle("actif", estActif);
        bouton.setAttribute("aria-pressed", String(estActif));
    });
}


/* ==================================================
   7. NAVIGATION DES CAS DE TEST
   ================================================== */

/* Sélection d'un cas de test */

function choisirTest(reference) {

    if (!modules[moduleActif].tests.includes(reference)) {
        return;
    }

    testActif = reference;

    afficherNavigationTests();
    afficherContenu();
}


/* Génération des boutons de cas de test */

function afficherNavigationTests() {

    const navigation = document.getElementById(
        "navigation-tests"
    );

    const references = modules[moduleActif].tests;

    navigation.replaceChildren();

    if (references.length === 0) {
        navigation.hidden = true;
        return;
    }

    navigation.hidden = false;

    references.forEach(reference => {

        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.textContent = reference;

        const estActif = reference === testActif;

        bouton.classList.toggle("actif", estActif);
        bouton.setAttribute("aria-pressed", String(estActif));

        bouton.addEventListener("click", () => {
            choisirTest(reference);
        });

        navigation.appendChild(bouton);
    });
}


/* ==================================================
   8. AFFICHAGE DU CONTENU
   ================================================== */

/* Fonction principale d'affichage */

function afficherContenu() {

    const conteneur = document.getElementById("contenu");

    conteneur.replaceChildren();

    if (moduleActif === "ARBO") {
        afficherArborescence(conteneur);
        return;
    }

    if (testActif === null) {
        afficherPresentationModule(conteneur);
        return;
    }

    afficherFicheTest(conteneur, testActif);
}


/* Affichage de l'arborescence Squash TM */

function afficherArborescence(conteneur) {

    const textes = traductionsSquash[langueActuelle].interface;

    ajouterTitre(conteneur, textes.titreArbo, 2);
    ajouterParagraphe(conteneur, textes.descriptionArbo);

    ajouterCapture(
        conteneur,
        captures.ARBO,
        textes.arboAlt
    );
}


/* Affichage d'un module sans test sélectionné */

function afficherPresentationModule(conteneur) {

    const textes = traductionsSquash[langueActuelle].interface;
    const references = modules[moduleActif].tests;

    ajouterTitre(
        conteneur,
        textes.modules[moduleActif],
        2
    );

    if (references.length === 0) {
        ajouterParagraphe(conteneur, textes.moduleVide);
        return;
    }

    ajouterParagraphe(conteneur, textes.selectionTest);
}


/* Affichage d'une fiche de test */

function afficherFicheTest(conteneur, reference) {

    const traduction = traductionsSquash[langueActuelle];

    const fiche = traduction.fiches[reference];

    if (!fiche) {
        ajouterTitre(conteneur, reference, 2);
        ajouterParagraphe(
            conteneur,
            traduction.interface.attente
        );
        return;
    }

    const textes = traduction.interface;

    // Référence et intitulé du cas de test
    ajouterTitre(
        conteneur,
        reference + " — " + fiche.titre,
        2
    );

    // Statut de l'exécution
    if (testsValides.has(reference)) {

        const statut = document.createElement("span");

        statut.className = "statut";
        statut.textContent = textes.statut;

        conteneur.appendChild(statut);
    }

    // Objectif
    afficherChamp(
        conteneur,
        textes.objectif,
        fiche.objectif
    );

    // Préconditions
    afficherChamp(
        conteneur,
        textes.preconditions,
        fiche.preconditions
    );

    // Méthode
    afficherChamp(
        conteneur,
        textes.methode,
        fiche.methode
    );

    // Étapes et résultats attendus
    if (Array.isArray(fiche.etapes) &&
        fiche.etapes.length > 0) {

        ajouterTitre(conteneur, textes.etapes, 3);

        const liste = document.createElement("ol");

        fiche.etapes.forEach(etape => {

            const element = document.createElement("li");

            const action = document.createElement("p");
            const resultat = document.createElement("p");

            const libelleAction = document.createElement("strong");
            libelleAction.textContent = textes.action + " : ";

            const libelleResultat = document.createElement("strong");
            libelleResultat.textContent =
                textes.resultatAttendu + " : ";

            action.appendChild(libelleAction);
            action.appendChild(
                document.createTextNode(etape.action)
            );

            resultat.appendChild(libelleResultat);
            resultat.appendChild(
                document.createTextNode(etape.resultat)
            );

            element.appendChild(action);
            element.appendChild(resultat);

            liste.appendChild(element);
        });

        conteneur.appendChild(liste);
    }

    // Réutilisation des tests
    afficherChamp(
        conteneur,
        textes.reutilisation,
        fiche.reutilisation
    );

    // Résultat d'exécution
    afficherChamp(
        conteneur,
        textes.execution,
        fiche.execution
    );

    // Capture correspondante
    if (captures[reference]) {

        ajouterTitre(
            conteneur,
            textes.captureTitre,
            3
        );

        ajouterCapture(
            conteneur,
            captures[reference],
            textes.captureAlt + " — " + reference
        );
    }
}


/* ==================================================
   9. CRÉATION DES ÉLÉMENTS HTML
   ================================================== */

/* Création d'un titre */

function ajouterTitre(conteneur, texte, niveau) {

    const titre = document.createElement("h" + niveau);

    titre.textContent = texte;

    conteneur.appendChild(titre);
}


/* Création d'un paragraphe */

function ajouterParagraphe(conteneur, texte) {

    if (!texte) {
        return;
    }

    const paragraphe = document.createElement("p");

    paragraphe.textContent = texte;

    conteneur.appendChild(paragraphe);
}


/* Création d'un champ de fiche */

function afficherChamp(conteneur, libelle, valeur) {

    if (!valeur) {
        return;
    }

    ajouterTitre(conteneur, libelle, 3);
    ajouterParagraphe(conteneur, valeur);
}


/* Création d'une capture cliquable */

function ajouterCapture(conteneur, chemin, description) {

    const lien = document.createElement("a");

    lien.href = chemin;
    lien.target = "_blank";
    lien.rel = "noopener noreferrer";

    const image = document.createElement("img");

    image.src = chemin;
    image.alt = description;
    image.loading = "lazy";

    lien.appendChild(image);
    conteneur.appendChild(lien);
}


/* ==================================================
   10. SYNCHRONISATION AVEC LE PORTFOLIO
   ================================================== */

/*
   Lorsque la démonstration est affichée dans
   l'iframe, elle peut recevoir un changement
   de langue depuis le portfolio principal.

   Les messages sont acceptés uniquement
   lorsqu'ils proviennent de la même origine.
*/

window.addEventListener("message", evenement => {

    if (evenement.origin !== window.location.origin) {
        return;
    }

    if (evenement.source !== window.parent) {
        return;
    }

    if (evenement.data?.type === "CHANGER_LANGUE") {

        const nouvelleLangue = evenement.data.langue;

        if (nouvelleLangue === "fr" ||
            nouvelleLangue === "en") {

            changerLangue(nouvelleLangue);
        }
    }
});


/* ==================================================
   11. INITIALISATION
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Vérification du chargement des traductions
    if (typeof traductionsSquash === "undefined") {

        console.error(
            "Le fichier traductions.js est introuvable."
        );

        return;
    }

    // Langue initiale
    langueActuelle = recupererLangue();

    // Sélecteur FR / EN
    document.getElementById("bouton-fr")
        ?.addEventListener("click", () => {
            changerLangue("fr");
        });

    document.getElementById("bouton-en")
        ?.addEventListener("click", () => {
            changerLangue("en");
        });

    // Navigation des modules
    document.querySelectorAll(
        "#navigation-modules button"
    ).forEach(bouton => {

        bouton.addEventListener("click", () => {
            choisirModule(bouton.dataset.module);
        });
    });

    // Affichage initial
    changerLangue(langueActuelle);
});
