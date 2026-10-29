
"use strict";

/* ==================================================
   1. CONFIGURATION DES BOUTONS
   true  = bouton activé
   false = bouton désactivé
   ================================================== */

/* ===== Langages ===== */

const langages = [
    { nom: "Python", actif: false, page: "langages-languages/python/index.html" },
    { nom: "SQL", actif: false, page: "langages-languages/sql/index.html" },
    { nom: "HTML", actif: false, page: "langages-languages/html/index.html" },
    { nom: "CSS", actif: false, page: "langages-languages/css/index.html" },
    { nom: "JavaScript", actif: false, page: "langages-languages/javascript/index.html" }
];

/* ===== Outils ===== */

const outils = [
    { nom: "Selenium", actif: false, page: "outils-tools/selenium/index.html" },
    { nom: "Robot Framework", actif: false, page: "outils-tools/robot-framework/index.html" },
    { nom: "Katalon", actif: false, page: "outils-tools/katalon/index.html" },
    { nom: "Cucumber / BDD", actif: false, page: "outils-tools/cucumber/index.html" },
    { nom: "Squash TM", actif: true, page: "outils-tools/squash/index.html" },
    { nom: "Mantis", actif: false, page: "outils-tools/mantis/index.html" },
    { nom: "Jira / Xray", actif: false, page: "outils-tools/jira-xray/index.html" },
    { nom: "Postman", actif: false, page: "outils-tools/postman/index.html" },
    { nom: "TestLink", actif: false, page: "outils-tools/testlink/index.html" }
];

/* ==================================================
   2. ÉTAT DU PORTFOLIO
   ================================================== */

let langueActuelle = "fr";
let boutonOrigine = null;
let demonstrationActuelle = null;

/* ==================================================
   3. GESTION DES TRADUCTIONS
   ================================================== */

function changerLangue(langue) {

    if (!traductions[langue]) {
        return;
    }

    langueActuelle = langue;

    // Traduction des textes de la page
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const cle = element.dataset.i18n;
        const texte = traductions[langue][cle];

        if (texte !== undefined) {
            element.textContent = texte;
        }
    });

    // Mise à jour de la langue du document
    document.documentElement.lang = langue;

    // Mise à jour du titre de l'onglet
    document.title = traductions[langue].titre;

    // Mise à jour des boutons du sélecteur
    document.querySelectorAll("[data-lang]").forEach(bouton => {
        const estActif = bouton.dataset.lang === langue;

        bouton.setAttribute("aria-pressed", String(estActif));
    });

    // Traduction des intitulés accessibles
    document.querySelector(".selecteur-langue")
        ?.setAttribute("aria-label", traductions[langue].choixLangue);

    document.getElementById("liste-langages")
        ?.setAttribute("aria-label", traductions[langue].listeLangages);

    document.getElementById("liste-outils")
        ?.setAttribute("aria-label", traductions[langue].listeOutils);

    // Mise à jour de l'iframe si elle est ouverte
    const iframe = document.getElementById("iframe-demonstration");

    if (iframe) {
        iframe.title = demonstrationActuelle
            ? traductions[langue].demonstration + " : " + demonstrationActuelle.nom
            : traductions[langue].iframeTitre;
    }

    // Mémorisation du choix
    try {
        localStorage.setItem("languePortfolio", langue);
    } catch (erreur) {
        // Le site reste utilisable si le stockage est indisponible.
    }
}

/* ==================================================
   4. GÉNÉRATION DES BOUTONS
   ================================================== */

function genererBoutons(elements, identifiantConteneur) {
    const conteneur = document.getElementById(identifiantConteneur);

    if (!conteneur) {
        return;
    }

    conteneur.replaceChildren();

    elements.forEach(element => {
        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.className = "bouton-demonstration";
        bouton.textContent = element.nom;
        bouton.disabled = !element.actif;

        if (element.actif) {
            bouton.addEventListener("click", () => {
                ouvrirDemonstration(element, bouton);
            });
        }

        conteneur.appendChild(bouton);
    });
}

/* ==================================================
   5. OUVERTURE DE LA DÉMONSTRATION
   ================================================== */

function ouvrirDemonstration(element, bouton) {
    const zone = document.getElementById("demonstration");
    const iframe = document.getElementById("iframe-demonstration");
    const titre = document.getElementById("titre-demonstration");

    if (!zone || !iframe || !titre) {
        console.error("La zone de démonstration est introuvable.");
        return;
    }

    boutonOrigine = bouton;
    demonstrationActuelle = element;

    titre.textContent = element.nom;
    iframe.title = traductions[langueActuelle].demonstration + " : " + element.nom;
    iframe.src = element.page;

    zone.hidden = false;

    zone.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ==================================================
   6. NAVIGATION DE LA DÉMONSTRATION
   ================================================== */

function retourEnHaut() {
    document.getElementById("accueil")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function fermerDemonstration() {
    const zone = document.getElementById("demonstration");
    const iframe = document.getElementById("iframe-demonstration");

    if (!zone || !iframe) {
        return;
    }

    zone.hidden = true;
    iframe.removeAttribute("src");

    if (boutonOrigine) {
        boutonOrigine.focus();

        boutonOrigine.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    boutonOrigine = null;
    demonstrationActuelle = null;
}

/* ==================================================
   7. INITIALISATION
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Génération des boutons
    genererBoutons(langages, "liste-langages");
    genererBoutons(outils, "liste-outils");

    // Sélecteur de langue
    document.querySelectorAll("[data-lang]").forEach(bouton => {
        bouton.addEventListener("click", () => {
            changerLangue(bouton.dataset.lang);
        });
    });

    // Restauration de la langue mémorisée
    let langueEnregistree = "fr";

    try {
        langueEnregistree = localStorage.getItem("languePortfolio") || "fr";
    } catch (erreur) {
        // Français par défaut.
    }

    changerLangue(langueEnregistree);

    // Navigation de l'iframe
    document.getElementById("retour-haut")
        ?.addEventListener("click", retourEnHaut);

    document.getElementById("fermer-demonstration")
        ?.addEventListener("click", fermerDemonstration);
});
