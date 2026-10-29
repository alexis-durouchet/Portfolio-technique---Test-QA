
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
   2. ÉTAT DE LA DÉMONSTRATION
   ================================================== */

// Bouton ayant ouvert la démonstration
let boutonOrigine = null;

/* ==================================================
   3. GÉNÉRATION DES BOUTONS
   ================================================== */

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
                ouvrirDemonstration(element, bouton);
            });
        }

        conteneur.appendChild(bouton);
    });
}

/* ==================================================
   4. OUVERTURE DE LA DÉMONSTRATION
   ================================================== */

function ouvrirDemonstration(element, bouton) {
    const zone = document.getElementById("demonstration");
    const iframe = document.getElementById("iframe-demonstration");
    const titre = document.getElementById("titre-demonstration");

    if (!zone || !iframe || !titre) {
        console.error("La zone de démonstration est introuvable.");
        return;
    }

    // Mémorisation du bouton d'origine
    boutonOrigine = bouton;

    // Mise à jour du contenu
    titre.textContent = element.nom;
    iframe.title = "Démonstration : " + element.nom;
    iframe.src = element.page;

    // Affichage de la zone
    zone.hidden = false;

    // Défilement vers la démonstration
    zone.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ==================================================
   5. NAVIGATION DE LA DÉMONSTRATION
   ================================================== */

/* ===== Retour en haut ===== */

function retourEnHaut() {
    document.getElementById("accueil")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ===== Fermeture de la démonstration ===== */

function fermerDemonstration() {
    const zone = document.getElementById("demonstration");
    const iframe = document.getElementById("iframe-demonstration");

    if (!zone || !iframe) {
        return;
    }

    // Masquage de la zone
    zone.hidden = true;

    // Arrêt du contenu de l'iframe
    iframe.removeAttribute("src");

    // Retour au bouton ayant ouvert la démonstration
    if (boutonOrigine) {
        boutonOrigine.focus();

        boutonOrigine.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    boutonOrigine = null;
}

/* ==================================================
   6. INITIALISATION
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Génération des boutons Langages et Outils
    genererBoutons(langages, "liste-langages");
    genererBoutons(outils, "liste-outils");

    // Navigation de la démonstration
    document.getElementById("retour-haut")
        ?.addEventListener("click", retourEnHaut);

    document.getElementById("fermer-demonstration")
        ?.addEventListener("click", fermerDemonstration);

});
