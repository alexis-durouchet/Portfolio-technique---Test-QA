/*
==========================================================
PROJET : QA_Ecommerce_Demo
FICHIER : 05_gestion_donnees.sql
==========================================================

CONTEXTE FONCTIONNEL :
Gestion des données d'une boutique e-commerce fictive.

OBJECTIF QA :
Démontrer la maîtrise des opérations de manipulation
des données et le contrôle de leurs conséquences.

PERIMETRE :
- Suppression ciblée de données métier.
- Gestion des transactions SQL.
- Vérification des résultats avant validation.
- Préservation du jeu de données de référence.

BONNES PRATIQUES :
Les opérations sont réalisées sur des données fictives.
Les modifications sont contrôlées et les scénarios
de démonstration privilégient ROLLBACK afin de
préserver l'état initial de la base.

==========================================================
*/

USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- SCENARIO 01 : Suppression contrôlée d'un avis client
--
-- Contexte métier :
-- Un client demande la suppression de son avis.
--
-- Objectif QA :
-- Identifier précisément l'enregistrement concerné
-- avant toute opération de suppression.
-- ==========================================================

-- Vérification préalable de l'avis ciblé.
SELECT
    id_avis,
    id_client,
    id_produit,
    note,
    commentaire
FROM dbo.Avis_Clients
WHERE id_avis = 2;

-- ==========================================================
-- Suppression contrôlée dans une transaction
-- Objectif QA : vérifier la suppression de l'avis ciblé
-- sans modifier définitivement les données de référence.
-- ==========================================================

BEGIN TRANSACTION;

DELETE FROM dbo.Avis_Clients
WHERE id_avis = 2;

-- Vérification après suppression :
-- Résultat attendu : aucune ligne retournée.
SELECT
    id_avis,
    id_client,
    id_produit,
    note,
    commentaire
FROM dbo.Avis_Clients
WHERE id_avis = 2;

-- ==========================================================
-- Annulation de la transaction et contrôle d'intégrité
--
-- Objectif QA :
-- Vérifier que ROLLBACK restaure l'avis supprimé
-- et préserve le jeu de données de référence.
--
-- Résultat attendu : l'avis n°2 est de nouveau présent.
-- ==========================================================

ROLLBACK TRANSACTION;

SELECT
    id_avis,
    id_client,
    id_produit,
    note,
    commentaire
FROM dbo.Avis_Clients
WHERE id_avis = 2;

-- ==========================================================
-- SCENARIO 02 : Modification contrôlée du prix d'un produit
--
-- Contexte métier :
-- Le service commercial souhaite modifier le prix
-- du clavier mécanique de 79,90 à 69,90 euros.
--
-- Objectif QA :
-- Vérifier la modification ciblée du prix
-- et préserver les données de référence.
-- ==========================================================

-- Vérification du produit avant modification

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE id_produit = 1;

-- ==========================================================
-- Modification contrôlée du prix dans une transaction
-- Objectif QA : vérifier que seul le produit ciblé
-- est modifié, sans altérer les données de référence.
-- ==========================================================

BEGIN TRANSACTION;

UPDATE dbo.Produits
SET prix = 69.90
WHERE id_produit = 1;

-- Vérification après modification
SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
ORDER BY id_produit;

-- ==========================================================
-- Annulation de la modification et contrôle d'intégrité
--
-- Objectif QA :
-- Vérifier que ROLLBACK restaure le prix initial
-- sans altérer les autres données produits.
-- ==========================================================

ROLLBACK TRANSACTION;

-- Vérification après annulation
SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
ORDER BY id_produit;

-- ==========================================================
-- SCENARIO 03 : Validation d'une transaction avec COMMIT
--
-- Contexte métier :
-- Un client publie un nouvel avis sur un produit.
--
-- Objectif QA :
-- Vérifier que l'insertion est validée par COMMIT
-- et que l'avis reste enregistré après la transaction.
--
-- Résultat attendu :
-- Un nouvel avis est créé et conservé dans la base.
-- ==========================================================

BEGIN TRANSACTION;

INSERT INTO dbo.Avis_Clients
    (id_client, id_produit, note, commentaire)
VALUES
    (1, 2, 4, 'Produit conforme aux attentes');

COMMIT TRANSACTION;