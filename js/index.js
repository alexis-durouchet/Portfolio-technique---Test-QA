"use strict";

/* ==================================================
   CONFIGURATION DES BOUTONS
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
    { nom: "Squash TM", actif: false, page: "outils-tools/squash/index.html" },
    { nom: "Mantis", actif: false, page: "outils-tools/mantis/index.html" },
    { nom: "Jira / Xray", actif: false, page: "outils-tools/jira-xray/index.html" },
    { nom: "Postman", actif: false, page: "outils-tools/postman/index.html" },
    { nom: "TestLink", actif: false, page: "outils-tools/testlink/index.html" }
];

/* ==================================================
   FONCTIONNEMENT DES BOUTONS
   ================================================== */

/* ===== Création des boutons ===== */

function genererBoutons(elements, identifiantConteneur) {
    const conteneur = document.getElementById(identifiantConteneur);

    if (!conteneur) {
        return;
    }

    // Nettoyage du conteneur avant génération
    conteneur.replaceChildren();

    elements.forEach(element => {
        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.className = "bouton-demonstration";
        bouton.textContent = element.nom;

        // Activation selon la configuration
        bouton.disabled = !element.actif;

        if (element.actif) {
            bouton.addEventListener("click", () => {
                ouvrirDemonstration(element.page);
            });
        }

        conteneur.appendChild(bouton);
    });
}

/* ===== Ouverture des démonstrations ===== */

function ouvrirDemonstration(page) {
    // Fonctionnement temporaire :
    // ouverture directe de la page de démonstration.
    // Sera remplacé par l'iframe commune du portfolio.

    window.location.href = page;
}

/* ===== Initialisation ===== */

document.addEventListener("DOMContentLoaded", () => {
    genererBoutons(langages, "liste-langages");
    genererBoutons(outils, "liste-outils");
});
