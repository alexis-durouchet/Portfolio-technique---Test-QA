/*
==========================================================
PROJET : QA_Ecommerce_Demo
FICHIER : 03_jeu_donnees.sql
==========================================================

OBJECTIF :
Initialiser un jeu de données de référence pour
permettre l'exécution des scénarios de tests QA.

STRATEGIE :
- Utiliser exclusivement des données fictives.
- Respecter les contraintes d'intégrité.
- Garantir la cohérence des relations entre tables.
- Permettre la réexécution contrôlée du script.

ORDRE D'INSERTION :
1. Clients
2. Produits
3. Commandes
4. Lignes_Commande

==========================================================
*/

USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- TABLE : Clients
-- Objectif : initialiser les clients de référence.
-- ==========================================================

INSERT INTO dbo.Clients (id_client, nom, prenom, email)
VALUES
    (1, 'Martin', 'Alice', 'alice.martin@example.com'),
    (2, 'Bernard', 'Lucas', 'lucas.bernard@example.com'),
    (3, 'Petit', 'Emma', 'emma.petit@example.com');
GO

-- ==========================================================
-- JEU DE DONNEES : Produits
-- Objectif : initialiser un catalogue fictif de produits
-- destiné aux scénarios de tests fonctionnels et QA.
-- ==========================================================

INSERT INTO dbo.Produits (id_produit, nom, prix, stock)
VALUES
    (1, 'Clavier mécanique', 79.90, 15),
    (2, 'Souris sans fil', 29.90, 30),
    (3, 'Écran 24 pouces', 149.90, 8);
GO

-- ==========================================================
-- JEU DE DONNEES : Commandes
-- Objectif : créer des commandes fictives associées
-- à des clients existants pour les futurs tests QA.
-- ==========================================================

INSERT INTO dbo.Commandes (id_commande, id_client, date_commande, statut)
VALUES
    (1, 1, '2026-11-02', 'En attente'),
    (2, 2, '2026-11-03', 'Payée'),
    (3, 1, '2026-11-04', 'Expédiée');
GO

-- ==========================================================
-- JEU DE DONNEES : Lignes_Commande
-- Objectif : associer les produits aux commandes existantes
-- et conserver les quantités et les prix de vente.
-- ==========================================================

INSERT INTO dbo.Lignes_Commande
    (id_commande, id_produit, quantite, prix_unitaire)
VALUES
    (1, 1, 1, 79.90),
    (1, 2, 2, 29.90),
    (2, 3, 1, 149.90),
    (3, 2, 1, 29.90);
GO

-- ==========================================================
-- JEU DE DONNEES : Avis_Clients
-- Objectif : enregistrer des avis fictifs sur les produits
-- et vérifier la génération automatique des identifiants.
-- ==========================================================

INSERT INTO dbo.Avis_Clients
    (id_client, id_produit, note, commentaire)
VALUES
    (1, 1, 5, 'Très bon clavier'),
    (2, 3, 4, 'Écran de bonne qualité'),
    (3, 2, 5, 'Souris pratique');
GO