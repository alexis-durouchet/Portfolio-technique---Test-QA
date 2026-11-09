
"use strict";

// Liste des fichiers SQL présents dans ce dossier.
const scripts = [
    { titre: "01 — Création des tables", fichier: "01_creation_tables.sql" },
    { titre: "02 — Contraintes", fichier: "02_contraintes.sql" },
    { titre: "03 — Jeu de données", fichier: "03_jeu_donnees.sql" },
    { titre: "04 — Index", fichier: "04_index.sql" },
    { titre: "05 — Gestion des données", fichier: "05_gestion_donnees.sql" },
    { titre: "06 — Extraction des données", fichier: "06_extraction_donnees.sql" },
    { titre: "07 — Notions complémentaires", fichier: "07_notions_complementaires.sql" },
    { titre: "08 — Tests QA", fichier: "08_tests_qa.sql" }
];

const liste = document.getElementById("liste-scripts");
const titre = document.getElementById("titre-script");
const nomFichier = document.getElementById("nom-fichier");
const contenu = document.getElementById("contenu-script");
let chargementActuel = 0;

async function afficherScript(script, bouton) {
    const chargement = ++chargementActuel;

    document.querySelectorAll(".bouton-script").forEach(element => {
        element.setAttribute("aria-pressed", String(element === bouton));
    });

    titre.textContent = script.titre;
    nomFichier.textContent = script.fichier;
    contenu.textContent = "Chargement du script…";

    try {
        const reponse = await fetch(encodeURIComponent(script.fichier));

        if (!reponse.ok) {
            throw new Error(`HTTP ${reponse.status}`);
        }

        const texte = await reponse.text();

        if (chargement === chargementActuel) {
            contenu.textContent = texte;
        }
    } catch (erreur) {
        if (chargement === chargementActuel) {
            contenu.textContent = "Impossible de charger ce fichier SQL. Vérifiez sa présence sur GitHub Pages.";
            console.error("Erreur de chargement SQL :", erreur);
        }
    }
}

scripts.forEach(script => {
    const bouton = document.createElement("button");

    bouton.type = "button";
    bouton.className = "bouton-script";
    bouton.textContent = script.titre;
    bouton.setAttribute("aria-pressed", "false");

    bouton.addEventListener("click", () => {
        afficherScript(script, bouton);
    });

    liste.appendChild(bouton);
});

// Affiche le premier script dès l'ouverture.
afficherScript(scripts[0], liste.firstElementChild);

