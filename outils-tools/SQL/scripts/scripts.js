
"use strict";

// Configuration des huit scripts SQL.
const scripts = [
    "01_creation_tables.sql",
    "02_contraintes.sql",
    "03_jeu_donnees.sql",
    "04_index.sql",
    "05_gestion_donnees.sql",
    "06_extraction_donnees.sql",
    "07_notions_complementaires.sql",
    "08_tests_qa.sql"
];

const liste = document.getElementById("liste-scripts");
const titre = document.getElementById("titre-script");
const nomFichier = document.getElementById("nom-fichier");
const contenu = document.getElementById("contenu-script");

let langueActuelle = "fr";
let scriptActuel = -1;
let chargementActuel = 0;

// Applique les traductions sans modifier le code SQL affiché.
function changerLangue(langue) {
    if (!traductionsScripts[langue]) return;

    langueActuelle = langue;
    document.documentElement.lang = langue;
    document.title = traductionsScripts[langue].titre;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        if (element.id === "titre-script" && scriptActuel !== -1) return;
        if (element.id === "contenu-script" && scriptActuel !== -1) return;

        const cle = element.dataset.i18n;
        const texte = traductionsScripts[langue][cle];

        if (texte !== undefined) {
            element.textContent = texte;
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        const cle = element.dataset.i18nAriaLabel;
        element.setAttribute("aria-label", traductionsScripts[langue][cle]);
    });

    document.querySelectorAll("[data-lang]").forEach(bouton => {
        bouton.setAttribute(
            "aria-pressed",
            String(bouton.dataset.lang === langue)
        );
    });

    // Met à jour les intitulés du menu.
    Array.from(liste.children).forEach((bouton, index) => {
        bouton.textContent = traductionsScripts[langue].scripts[index];
    });

    if (scriptActuel !== -1) {
        titre.textContent = traductionsScripts[langue].scripts[scriptActuel];
    }

    try {
        localStorage.setItem("languePortfolio", langue);
    } catch (erreur) {
        // Le stockage est facultatif.
    }
}

// Charge le fichier SQL sélectionné.
async function afficherScript(index) {
    const chargement = ++chargementActuel;
    scriptActuel = index;

    Array.from(liste.children).forEach((bouton, position) => {
        bouton.setAttribute("aria-pressed", String(position === index));
    });

    titre.textContent = traductionsScripts[langueActuelle].scripts[index];
    nomFichier.textContent = scripts[index];
    contenu.textContent = traductionsScripts[langueActuelle].chargement;

    try {
        const reponse = await fetch(scripts[index]);

        if (!reponse.ok) {
            throw new Error(`HTTP ${reponse.status}`);
        }

        const texte = await reponse.text();

        if (chargement === chargementActuel) {
            contenu.textContent = texte;
        }
    } catch (erreur) {
        if (chargement === chargementActuel) {
            contenu.textContent = traductionsScripts[langueActuelle].erreurChargement;
            console.error("Erreur de chargement SQL :", erreur);
        }
    }
}

// Génère les boutons de navigation.
scripts.forEach((fichier, index) => {
    const bouton = document.createElement("button");

    bouton.type = "button";
    bouton.className = "bouton-script";
    bouton.setAttribute("aria-pressed", "false");

    bouton.addEventListener("click", () => afficherScript(index));
    liste.appendChild(bouton);
});

// Active le sélecteur FR/EN.
document.querySelectorAll("[data-lang]").forEach(bouton => {
    bouton.addEventListener("click", () => changerLangue(bouton.dataset.lang));
});

// Récupère la langue du portfolio.
let langueEnregistree = "fr";

try {
    langueEnregistree = localStorage.getItem("languePortfolio") || "fr";
} catch (erreur) {
    // Français par défaut.
}

changerLangue(langueEnregistree);
afficherScript(0);
