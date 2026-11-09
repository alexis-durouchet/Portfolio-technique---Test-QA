-- ==========================================================
-- CONTROLE QA : Vérification de l'existence d'une table
-- ==========================================================
-- Contexte :
-- Après l'exécution d'une instruction DROP TABLE,
-- la table dbo.Clients reste visible dans SSMS.
--
-- Objectif :
-- Vérifier directement dans SQL Server si la table
-- existe toujours, indépendamment de l'affichage SSMS.
--
-- Résultat attendu :
-- La requête retourne NULL si la table est absente.
--
-- Résultat obtenu :
-- NULL - Suppression de la table confirmée.
--
-- Conclusion :
-- L'Explorateur d'objets affichait un état non actualisé.
-- Aucune anomalie de suppression constatée.
-- ==========================================================


SELECT OBJECT_ID('dbo.Clients', 'U') AS id_table;

-- ==========================================================
-- TEST QA : Vérification du jeu de données de référence
-- Objectif : vérifier que les clients ont bien été insérés
-- dans la base de données avant l'exécution des tests.
-- Résultat attendu : les clients du jeu de données
-- apparaissent avec des informations conformes.
-- ==========================================================

SELECT * FROM dbo.Clients;

-- ==========================================================
-- TEST QA : Vérification du jeu de données Produits
-- Objectif : vérifier que les produits de référence
-- ont bien été insérés dans la base de données.
-- Résultat attendu : les produits attendus sont présents
-- avec un prix et un stock conformes au jeu de données.
-- ==========================================================

SELECT * FROM dbo.Produits;

-- ==========================================================
-- TEST QA : Vérification du jeu de données Commandes
-- Objectif : vérifier que les commandes de référence
-- ont bien été insérées dans la base de données.
-- Résultat attendu : trois commandes sont présentes,
-- associées aux clients attendus, avec des dates
-- et des statuts conformes au jeu de données.
-- ==========================================================

SELECT * FROM dbo.Commandes;

-- ==========================================================
-- TEST QA : Vérification du jeu de données Lignes_Commande
-- Objectif : vérifier que les produits sont correctement
-- associés aux commandes de référence.
-- Résultat attendu : quatre lignes sont présentes,
-- avec les identifiants, quantités et prix attendus.
-- ==========================================================

SELECT * FROM dbo.Lignes_Commande;

-- ==========================================================
-- TEST QA 01 : Unicité de l'adresse e-mail
-- Objectif : vérifier qu'un client ne peut pas utiliser
-- une adresse e-mail déjà enregistrée.
-- Résultat attendu : insertion refusée par SQL Server.
-- Contrainte testée : UQ_Clients_Email
-- ==========================================================

INSERT INTO dbo.Clients (id_client, nom, prenom, email)
VALUES (4, 'Dupont', 'Thomas', 'alice.martin@example.com');

-- ==========================================================
-- TEST QA 02 : Intégrité référentielle Commandes / Clients
-- Objectif : vérifier qu'une commande ne peut pas être
-- associée à un client inexistant.
-- Résultat attendu : insertion refusée par SQL Server.
-- Contrainte testée : FK_Commandes_Clients
-- ==========================================================

INSERT INTO dbo.Commandes (id_commande, id_client, date_commande, statut)
VALUES (4, 999, '2026-11-04', 'En attente');

-- ==========================================================
-- TEST QA 03 : Validation du stock des produits
-- Objectif : vérifier qu'un produit ne peut pas avoir
-- un stock négatif.
-- Résultat attendu : modification refusée par SQL Server.
-- Contrainte testée : CK_Produits_Stock
-- ==========================================================

UPDATE dbo.Produits
SET stock = -5
WHERE id_produit = 1;

SELECT id_produit, nom, stock
FROM dbo.Produits
WHERE id_produit = 1;

-- ==========================================================
-- TEST QA 04 : Validation de la quantité commandée
-- Objectif : vérifier qu'une quantité égale à zéro
-- ne peut pas être enregistrée dans une commande.
-- Résultat attendu : modification refusée par SQL Server.
-- Contrainte testée : CK_Lignes_Commande_Quantite
-- ==========================================================

UPDATE dbo.Lignes_Commande
SET quantite = 0
WHERE id_commande = 1 AND id_produit = 1;

-- ==========================================================
-- TEST QA 05 : Vérification de l'intégrité après rejet
-- Objectif : confirmer que la quantité initiale
-- n'a pas été modifiée après le refus de SQL Server.
-- Résultat attendu : quantite = 1.
-- ==========================================================

SELECT id_commande, id_produit, quantite
FROM dbo.Lignes_Commande
WHERE id_commande = 1 AND id_produit = 1;

-- ==========================================================
-- TEST QA 06 : Vérification de l'auto-incrémentation
-- Objectif : vérifier que SQL Server attribue
-- automatiquement un identifiant à chaque avis.
-- Résultat attendu : trois avis avec des identifiants
-- distincts générés automatiquement.
-- ==========================================================

SELECT id_avis, id_client, id_produit, note, commentaire
FROM dbo.Avis_Clients
ORDER BY id_avis;

-- ==========================================================
-- TEST QA 07 : Vérification de la colonne calculée
-- Objectif : vérifier le calcul automatique du montant
-- d'une ligne de commande.
-- Résultat attendu : montant_ligne = quantite * prix_unitaire.
-- ==========================================================

SELECT
    id_commande,
    id_produit,
    quantite,
    prix_unitaire,
    montant_ligne
FROM dbo.Lignes_Commande
ORDER BY id_commande, id_produit;