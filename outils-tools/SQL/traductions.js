/* ==================================================
   1. TRADUCTIONS DE LA DÉMONSTRATION SQL
   ==================================================

   Projet : QA_Ecommerce_Demo
   Technologie : Microsoft SQL Server

   Ce fichier centralise les textes français et anglais.

   ================================================== */

const traductionsSQL = {

    /* ==================================================
       2. VERSION FRANÇAISE
       ================================================== */

    fr: {

        /* ----------------------------------------------
           2.1. EN-TÊTE ET NAVIGATION
           ---------------------------------------------- */

        titreSite: "SQL — Démonstration QA",

        sousTitre:
            "Projet pédagogique · QA_Ecommerce_Demo · SQL Server",

        modules: {
            STRUCTURE: "Structure de la base",
            EXTRACTION: "Extraction et contrôle",
            INTEGRITE: "Tests d'intégrité"
        },

        navigationModules: "Modules de la démonstration SQL",
        navigationTests: "Scénarios QA du module sélectionné",

        /* ----------------------------------------------
           2.2. MODULE 01 : STRUCTURE DE LA BASE
           ---------------------------------------------- */

        structure: {

            titre: "Structure de la base de données",

            introduction:
                "Cette démonstration repose sur une base de données fictive représentant une activité de commerce en ligne. Elle permet de mettre en pratique des contrôles SQL dans un contexte de test logiciel.",

            titrePresentation: "Présentation du projet",

            presentation:
                "Le projet QA_Ecommerce_Demo a été réalisé avec Microsoft SQL Server et SQL Server Management Studio (SSMS). Il comprend cinq tables reliées entre elles, un jeu de données de référence et plusieurs contraintes destinées à garantir la cohérence des informations.",

            titreObjectif: "Objectif QA",

            objectif:
                "Utiliser SQL pour consulter les données, vérifier leur cohérence avec les règles métier et contrôler le comportement des contraintes d'intégrité.",

            titreTables: "Les cinq tables de la base",

            tables: {

                Clients: {
                    titre: "Clients",
                    description:
                        "Informations des clients : identité et adresse e-mail."
                },

                Produits: {
                    titre: "Produits",
                    description:
                        "Catalogue des produits : désignation, prix et stock."
                },

                Commandes: {
                    titre: "Commandes",
                    description:
                        "Commandes passées par les clients, avec leur date et leur statut."
                },

                Lignes_Commande: {
                    titre: "Lignes_Commande",
                    description:
                        "Détail des produits commandés, quantités et prix unitaires."
                },

                Avis_Clients: {
                    titre: "Avis_Clients",
                    description:
                        "Avis déposés par les clients sur les produits."
                }
            },

            titreLegende: "Lecture du diagramme",

            legende: [
                "Les clés primaires identifient les enregistrements.",
                "Les clés étrangères relient les tables.",
                "Les relations permettent de contrôler la cohérence des données."
            ],

            titreDiagramme: "Diagramme relationnel",

            descriptionDiagramme:
                "Vue des cinq tables et de leurs relations dans SQL Server.",

            ouvrirDiagramme:
                "Cliquer sur le diagramme pour afficher l'image complète.",

            texteAlternatifDiagramme:
                "Diagramme relationnel de la base QA_Ecommerce_Demo présentant les cinq tables et leurs relations.",

            titreScripts: "Scripts SQL du projet",

            descriptionScripts:
                "Les huit scripts du projet sont consultables sur GitHub. Ils documentent la création de la base, ses contraintes, son jeu de données et les contrôles réalisés.",

            scripts: {
                creation: "01 — Création des tables",
                contraintes: "02 — Contraintes d'intégrité",
                donnees: "03 — Jeu de données",
                index: "04 — Index",
                gestion: "05 — Gestion des données",
                extraction: "06 — Extraction des données",
                complementaires: "07 — Notions complémentaires",
                tests: "08 — Tests QA"
            }
        },

        /* ----------------------------------------------
           2.3. MODULE 02 : EXTRACTION ET CONTRÔLE
           ---------------------------------------------- */

        extraction: {

            titre: "Extraction et contrôle des données",

            introduction:
                "Ces scénarios montrent comment exploiter des requêtes SELECT pour vérifier les informations enregistrées dans la base et leur cohérence avec les besoins métier.",

            consigne:
                "Sélectionnez un scénario pour consulter sa requête SQL, son résultat et son objectif de contrôle.",

            scenarios: {

                "EXT-01": {
                    titre: "Montant total d'une commande",

                    contexte:
                        "Une commande contient plusieurs lignes de produits.",

                    objectif:
                        "Recalculer le montant total à partir des quantités et des prix unitaires pour vérifier sa cohérence.",

                    resultatAttendu:
                        "La commande 1 doit présenter un montant total de 139,70 €.",

                    resultatObtenu:
                        "La requête retourne 139,70 pour la commande 1.",

                    conclusion:
                        "Le montant calculé correspond au résultat attendu."
                },

                "EXT-02": {
                    titre: "Détail d'une commande",

                    contexte:
                        "Un client consulte les produits associés à sa commande.",

                    objectif:
                        "Vérifier la correspondance entre les lignes de commande et les produits enregistrés à l'aide d'une jointure INNER JOIN.",

                    resultatAttendu:
                        "La commande 1 doit contenir deux lignes : un clavier mécanique et deux souris sans fil.",

                    resultatObtenu:
                        "Les deux produits et leurs quantités sont correctement retrouvés.",

                    conclusion:
                        "Les lignes de commande correspondent aux produits enregistrés."
                },

                "EXT-03": {
                    titre: "Clients sans commande",

                    contexte:
                        "Identifier les clients inscrits n'ayant encore effectué aucun achat.",

                    objectif:
                        "Vérifier l'identification des clients sans commande à l'aide d'une jointure LEFT JOIN et d'une condition IS NULL.",

                    resultatAttendu:
                        "Le client Petit, identifiant 3, doit apparaître sans commande associée.",

                    resultatObtenu:
                        "Le client Petit est retourné avec une valeur NULL dans la colonne id_commande.",

                    conclusion:
                        "La requête identifie correctement le client sans commande."
                },

                "EXT-04": {
                    titre: "Clients ayant plusieurs commandes",

                    contexte:
                        "Identifier les clients ayant passé au moins deux commandes.",

                    objectif:
                        "Vérifier le regroupement et le filtrage des résultats à l'aide de COUNT, GROUP BY et HAVING.",

                    resultatAttendu:
                        "Le client Martin, identifiant 1, doit apparaître avec deux commandes.",

                    resultatObtenu:
                        "La requête retourne le client Martin avec un total de deux commandes.",

                    conclusion:
                        "Le regroupement et le filtre sur le nombre de commandes fonctionnent comme attendu."
                },

                "EXT-05": {
                    titre: "Combinaison de filtres du catalogue",

                    contexte:
                        "Rechercher des claviers ou des souris dont le prix ne dépasse pas 50 €.",

                    objectif:
                        "Vérifier la combinaison de conditions AND et OR, avec un filtrage sur le nom et le prix des produits.",

                    resultatAttendu:
                        "Seule la souris sans fil à 29,90 € doit apparaître. Le clavier à 79,90 € doit être exclu.",

                    resultatObtenu:
                        "La requête retourne uniquement la souris sans fil, au prix de 29,90 €.",

                    conclusion:
                        "Les conditions de filtrage sélectionnent correctement le produit attendu."
                }
            }
        },

        /* ----------------------------------------------
           2.4. MODULE 03 : TESTS D'INTÉGRITÉ
           ---------------------------------------------- */

        integrite: {

            titre: "Tests d'intégrité des données",

            introduction:
                "Ces tests négatifs vérifient que SQL Server refuse les opérations contraires aux contraintes définies dans la base. Un message d'erreur peut donc constituer le résultat attendu d'un test réussi.",

            consigne:
                "Sélectionnez un test pour consulter l'opération effectuée, le refus de SQL Server et, lorsque cela s'applique, la vérification des données après rejet.",

            scenarios: {

                "INT-01": {
                    titre: "Unicité de l'adresse e-mail",

                    contexte:
                        "Un nouveau client tente de s'inscrire avec une adresse e-mail déjà enregistrée.",

                    objectif:
                        "Vérifier qu'une adresse e-mail ne peut pas être utilisée par plusieurs clients.",

                    contrainte:
                        "UQ_Clients_Email",

                    resultatAttendu:
                        "L'insertion doit être refusée par SQL Server.",

                    resultatObtenu:
                        "SQL Server retourne une erreur de violation de contrainte UNIQUE KEY (2627).",

                    conclusion:
                        "La contrainte d'unicité empêche l'enregistrement d'un doublon."
                },

                "INT-02": {
                    titre: "Intégrité référentielle des commandes",

                    contexte:
                        "Une commande est créée avec un identifiant client inexistant.",

                    objectif:
                        "Vérifier qu'une commande ne peut pas être associée à un client absent de la base.",

                    contrainte:
                        "FK_Commandes_Clients",

                    resultatAttendu:
                        "L'insertion de la commande associée au client 999 doit être refusée.",

                    resultatObtenu:
                        "SQL Server retourne une erreur de violation de clé étrangère (547).",

                    conclusion:
                        "La contrainte de clé étrangère protège la relation entre les commandes et les clients."
                },

                "INT-03": {
                    titre: "Refus d'un stock négatif",

                    contexte:
                        "Une modification tente d'attribuer un stock négatif à un produit.",

                    objectif:
                        "Vérifier que SQL Server refuse une valeur de stock inférieure à zéro.",

                    contrainte:
                        "CK_Produits_Stock",

                    resultatAttendu:
                        "La modification du stock à -5 doit être refusée.",

                    resultatObtenu:
                        "SQL Server retourne une erreur de violation de contrainte CHECK (547).",

                    conclusion:
                        "La contrainte empêche l'enregistrement d'un stock négatif."
                },

                "INT-04": {
                    titre: "Quantité nulle et intégrité après rejet",

                    contexte:
                        "Une modification tente de remplacer la quantité commandée par zéro.",

                    objectif:
                        "Vérifier que la modification est refusée et que la quantité initiale reste inchangée.",

                    contrainte:
                        "CK_Lignes_Commande_Quantite",

                    resultatAttendu:
                        "La modification à zéro doit être refusée et la quantité doit rester égale à 1.",

                    resultatObtenu:
                        "SQL Server retourne une erreur de contrainte CHECK (547). Une requête SELECT confirme ensuite que la quantité vaut toujours 1.",

                    conclusion:
                        "La modification invalide est rejetée et la donnée initiale est conservée."
                }
            }
        },

        /* ----------------------------------------------
           2.5. TEXTES COMMUNS
           ---------------------------------------------- */

        commun: {

            contexte: "Contexte métier",
            objectif: "Objectif QA",
            contrainte: "Contrainte testée",

            resultatAttendu: "Résultat attendu",
            resultatObtenu: "Résultat obtenu",
            conclusion: "Conclusion du contrôle",

            capture: "Capture SQL Server Management Studio",

            ouvrirCapture:
                "Cliquer sur la capture pour l'afficher en taille réelle.",

            consulterScript: "Consulter le script SQL complet",

            projetComplet: "Accéder au projet complet",

            descriptionProjetComplet:
                "Les captures présentent une sélection de scénarios représentatifs. L'ensemble des requêtes et des tests est disponible dans les scripts du projet sur GitHub.",

            consulterGitHub: "Consulter le projet sur GitHub",

            piedPage:
                "Portfolio QA — Démonstration SQL Server · Projet pédagogique"
        }
    },


    /* ==================================================
       3. ENGLISH VERSION
       ================================================== */

    en: {

        /* ----------------------------------------------
           3.1. HEADER AND NAVIGATION
           ---------------------------------------------- */

        titreSite: "SQL — QA Demonstration",

        sousTitre:
            "Educational project · QA_Ecommerce_Demo · SQL Server",

        modules: {
            STRUCTURE: "Database structure",
            EXTRACTION: "Data extraction and verification",
            INTEGRITE: "Data integrity tests"
        },

        navigationModules: "SQL demonstration modules",
        navigationTests: "QA scenarios for the selected module",

        /* ----------------------------------------------
           3.2. MODULE 01: DATABASE STRUCTURE
           ---------------------------------------------- */

        structure: {

            titre: "Database structure",

            introduction:
                "This demonstration uses a fictional database representing an e-commerce business. It provides a practical environment for SQL verification in software testing.",

            titrePresentation: "Project overview",

            presentation:
                "The QA_Ecommerce_Demo project was created using Microsoft SQL Server and SQL Server Management Studio (SSMS). It includes five related tables, a reference dataset and several constraints designed to maintain data consistency.",

            titreObjectif: "QA objective",

            objectif:
                "Use SQL to retrieve data, verify its consistency with business rules and check the behavior of database integrity constraints.",

            titreTables: "The five database tables",

            tables: {

                Clients: {
                    titre: "Clients",
                    description:
                        "Customer information: identity and email address."
                },

                Produits: {
                    titre: "Products",
                    description:
                        "Product catalog: name, price and stock."
                },

                Commandes: {
                    titre: "Orders",
                    description:
                        "Customer orders, including their dates and statuses."
                },

                Lignes_Commande: {
                    titre: "Order lines",
                    description:
                        "Ordered products, quantities and unit prices."
                },

                Avis_Clients: {
                    titre: "Customer reviews",
                    description:
                        "Reviews submitted by customers about products."
                }
            },

            titreLegende: "Understanding the diagram",

            legende: [
                "Primary keys identify individual records.",
                "Foreign keys connect related tables.",
                "Relationships help maintain data consistency."
            ],

            titreDiagramme: "Relational diagram",

            descriptionDiagramme:
                "Overview of the five tables and their relationships in SQL Server.",

            ouvrirDiagramme:
                "Click the diagram to view the full-size image.",

            texteAlternatifDiagramme:
                "Relational diagram of the QA_Ecommerce_Demo database showing five tables and their relationships.",

            titreScripts: "Project SQL scripts",

            descriptionScripts:
                "The project's eight SQL scripts are available on GitHub. They document database creation, constraints, reference data and verification procedures.",

            scripts: {
                creation: "01 — Table creation",
                contraintes: "02 — Integrity constraints",
                donnees: "03 — Reference dataset",
                index: "04 — Indexes",
                gestion: "05 — Data management",
                extraction: "06 — Data extraction",
                complementaires: "07 — Additional SQL concepts",
                tests: "08 — QA tests"
            }
        },

        /* ----------------------------------------------
           3.3. MODULE 02: DATA EXTRACTION
           ---------------------------------------------- */

        extraction: {

            titre: "Data extraction and verification",

            introduction:
                "These scenarios demonstrate how SELECT queries can be used to verify stored information and check its consistency with business requirements.",

            consigne:
                "Select a scenario to view its SQL query, result and verification objective.",

            scenarios: {

                "EXT-01": {
                    titre: "Order total verification",

                    contexte:
                        "An order contains several product lines.",

                    objectif:
                        "Recalculate the order total using quantities and unit prices to verify its consistency.",

                    resultatAttendu:
                        "Order 1 should have a total amount of €139.70.",

                    resultatObtenu:
                        "The query returns 139.70 for order 1.",

                    conclusion:
                        "The calculated amount matches the expected result."
                },

                "EXT-02": {
                    titre: "Order details verification",

                    contexte:
                        "A customer views the products included in an order.",

                    objectif:
                        "Verify the relationship between order lines and registered products using an INNER JOIN.",

                    resultatAttendu:
                        "Order 1 should contain two lines: one mechanical keyboard and two wireless mice.",

                    resultatObtenu:
                        "Both products and their quantities are correctly retrieved.",

                    conclusion:
                        "The order lines match the registered products."
                },

                "EXT-03": {
                    titre: "Customers without orders",

                    contexte:
                        "Identify registered customers who have never placed an order.",

                    objectif:
                        "Verify that customers without orders can be identified using LEFT JOIN and IS NULL.",

                    resultatAttendu:
                        "Customer Petit, ID 3, should appear without an associated order.",

                    resultatObtenu:
                        "Customer Petit is returned with NULL in the id_commande column.",

                    conclusion:
                        "The query correctly identifies the customer without orders."
                },

                "EXT-04": {
                    titre: "Customers with multiple orders",

                    contexte:
                        "Identify customers who have placed at least two orders.",

                    objectif:
                        "Verify aggregation and filtering using COUNT, GROUP BY and HAVING.",

                    resultatAttendu:
                        "Customer Martin, ID 1, should appear with two orders.",

                    resultatObtenu:
                        "The query returns customer Martin with a total of two orders.",

                    conclusion:
                        "Aggregation and filtering produce the expected result."
                },

                "EXT-05": {
                    titre: "Combined product catalog filters",

                    contexte:
                        "Search for keyboards or mice priced at €50 or less.",

                    objectif:
                        "Verify the combination of AND and OR conditions when filtering products by name and price.",

                    resultatAttendu:
                        "Only the wireless mouse priced at €29.90 should appear. The €79.90 keyboard should be excluded.",

                    resultatObtenu:
                        "The query returns only the wireless mouse priced at €29.90.",

                    conclusion:
                        "The filtering conditions correctly select the expected product."
                }
            }
        },

        /* ----------------------------------------------
           3.4. MODULE 03: DATA INTEGRITY TESTS
           ---------------------------------------------- */

        integrite: {

            titre: "Data integrity tests",

            introduction:
                "These negative tests verify that SQL Server rejects operations that violate database constraints. An error message can therefore be the expected outcome of a successful test.",

            consigne:
                "Select a test to view the attempted operation, the SQL Server rejection and, where applicable, the verification performed afterward.",

            scenarios: {

                "INT-01": {
                    titre: "Email address uniqueness",

                    contexte:
                        "A new customer attempts to register using an existing email address.",

                    objectif:
                        "Verify that the same email address cannot be assigned to multiple customers.",

                    contrainte:
                        "UQ_Clients_Email",

                    resultatAttendu:
                        "SQL Server must reject the insertion.",

                    resultatObtenu:
                        "SQL Server returns a UNIQUE KEY constraint violation (2627).",

                    conclusion:
                        "The uniqueness constraint prevents duplicate email addresses."
                },

                "INT-02": {
                    titre: "Order referential integrity",

                    contexte:
                        "An order is created using a customer ID that does not exist.",

                    objectif:
                        "Verify that an order cannot reference a customer who is absent from the database.",

                    contrainte:
                        "FK_Commandes_Clients",

                    resultatAttendu:
                        "The insertion referencing customer 999 must be rejected.",

                    resultatObtenu:
                        "SQL Server returns a foreign key constraint violation (547).",

                    conclusion:
                        "The foreign key constraint protects the relationship between orders and customers."
                },

                "INT-03": {
                    titre: "Negative stock rejection",

                    contexte:
                        "An update attempts to assign a negative stock value to a product.",

                    objectif:
                        "Verify that SQL Server rejects stock values below zero.",

                    contrainte:
                        "CK_Produits_Stock",

                    resultatAttendu:
                        "The update setting stock to -5 must be rejected.",

                    resultatObtenu:
                        "SQL Server returns a CHECK constraint violation (547).",

                    conclusion:
                        "The constraint prevents negative stock values from being stored."
                },

                "INT-04": {
                    titre: "Zero quantity and data preservation",

                    contexte:
                        "An update attempts to change an ordered quantity to zero.",

                    objectif:
                        "Verify that the update is rejected and that the original quantity remains unchanged.",

                    contrainte:
                        "CK_Lignes_Commande_Quantite",

                    resultatAttendu:
                        "The update must be rejected, and the quantity must remain equal to 1.",

                    resultatObtenu:
                        "SQL Server returns a CHECK constraint violation (547). A subsequent SELECT query confirms that the quantity is still 1.",

                    conclusion:
                        "The invalid update is rejected and the original data is preserved."
                }
            }
        },

        /* ----------------------------------------------
           3.5. SHARED TEXTS
           ---------------------------------------------- */

        commun: {

            contexte: "Business context",
            objectif: "QA objective",
            contrainte: "Tested constraint",

            resultatAttendu: "Expected result",
            resultatObtenu: "Actual result",
            conclusion: "Verification conclusion",

            capture: "SQL Server Management Studio screenshot",

            ouvrirCapture:
                "Click the screenshot to view it at full size.",

            consulterScript: "View the complete SQL script",

            projetComplet: "Explore the complete project",

            descriptionProjetComplet:
                "The screenshots showcase a selection of representative scenarios. All queries and tests are available in the project's SQL scripts on GitHub.",

            consulterGitHub: "View project on GitHub",

            piedPage:
                "QA Portfolio — SQL Server Demonstration · Educational project"
        }
    }
};


/* ==================================================
   4. DISPONIBILITÉ DES TRADUCTIONS
   ==================================================

   La constante traductionsSQL est déclarée dans
   le contexte global du script classique.

   index.html doit charger les fichiers dans cet ordre :

   1. traductions.js
   2. index.js

   Les deux scripts doivent utiliser defer.

   Exemple :
   <script src="traductions.js" defer></script>
   <script src="index.js" defer></script>

   ================================================== */
