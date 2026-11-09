-- ==========================================================
-- PROJET : QA_Ecommerce_Demo
-- FICHIER : 06_extraction_donnees.sql
-- MODULE 5 : Extraction et analyse des données
--
-- CONTEXTE :
-- Base de données fictive d'une boutique e-commerce.
--
-- OBJECTIF QA :
-- Vérifier la cohérence des données métier à l'aide
-- de requêtes SELECT, de calculs, d'agrégations
-- et de jointures entre plusieurs tables.
--
-- Les requêtes de ce fichier sont en lecture seule.
-- Elles ne modifient pas les données de référence.
-- ==========================================================

USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- SCENARIO 01 : Vérification du montant total d'une commande
--
-- Contexte métier :
-- Une commande contient plusieurs lignes de produits.
--
-- Objectif QA :
-- Recalculer le montant total à partir des quantités
-- et des prix unitaires pour contrôler sa cohérence.
--
-- Commande testée : 1
-- Résultat attendu : 139.70
-- ==========================================================

SELECT
    id_commande,
    SUM(quantite * prix_unitaire) AS montant_total
FROM dbo.Lignes_Commande
WHERE id_commande = 1
GROUP BY id_commande;

-- ==========================================================
-- SCENARIO 02 : Vérification du détail d'une commande
--
-- Contexte métier :
-- Un client consulte les produits de sa commande.
--
-- Objectif QA :
-- Vérifier la correspondance entre les lignes
-- de commande et les produits enregistrés.
--
-- Alias utilisés : 
-- LC = dbo.Lignes_Commandes
-- P = dbo.Produits
--
-- Commande testée : 1
-- Résultat attendu : 2 lignes (clavier et souris).
-- ==========================================================

SELECT
    LC.id_commande,
    P.nom AS produit,
    LC.quantite,
    LC.prix_unitaire
FROM dbo.Lignes_Commande AS LC
INNER JOIN dbo.Produits AS P
    ON LC.id_produit = P.id_produit
WHERE LC.id_commande = 1;

-- ==========================================================
-- SCENARIO 03 : Identification des clients sans commande
--
-- Contexte métier :
-- Identifier les clients inscrits n'ayant jamais commandé.
--
-- Objectif QA :
-- Vérifier la présence des clients sans commande
-- grâce à une jointure externe LEFT JOIN.
--
-- Alias utilisés :
-- C  = dbo.Clients
-- CO = dbo.Commandes
--
-- Résultat attendu :
-- 1 client sans commande : Petit (id_client = 3).
-- La colonne id_commande doit contenir NULL.
-- ==========================================================

SELECT
    C.id_client,
    C.nom,
    CO.id_commande
FROM dbo.Clients AS C
LEFT JOIN dbo.Commandes AS CO
    ON C.id_client = CO.id_client
WHERE CO.id_commande IS NULL;

-- ==========================================================
-- SCENARIO 04 : Identification des clients multi-commandes
--
-- Contexte métier :
-- Identifier les clients ayant passé au moins 2 commandes.
--
-- Objectif QA :
-- Vérifier le nombre de commandes par client et
-- contrôler le filtrage des résultats regroupés.
--
-- Alias utilisés :
-- C  = dbo.Clients
-- CO = dbo.Commandes
--
-- Résultat attendu :
-- 1 client : Martin (id_client = 1), avec 2 commandes.
-- ==========================================================

SELECT
    C.id_client,
    C.nom,
    COUNT(CO.id_commande) AS nombre_commandes
FROM dbo.Clients AS C
INNER JOIN dbo.Commandes AS CO
    ON C.id_client = CO.id_client
GROUP BY
    C.id_client,
    C.nom
HAVING COUNT(CO.id_commande) >= 2;

-- ==========================================================
-- SCENARIO 05 : Classement des produits les plus vendus
--
-- Contexte métier :
-- Identifier les produits les plus vendus de la boutique.
--
-- Objectif QA :
-- Vérifier le cumul des quantités vendues par produit
-- et leur classement par ordre décroissant.
--
-- Alias utilisés :
-- LC = dbo.Lignes_Commande
-- P  = dbo.Produits
--
-- Résultat attendu :
-- Souris sans fil    : 3 unités
-- Clavier mécanique  : 1 unité
-- Écran 24 pouces    : 1 unité
-- ==========================================================

SELECT
    P.id_produit,
    P.nom AS produit,
    SUM(LC.quantite) AS quantite_vendue
FROM dbo.Lignes_Commande AS LC
INNER JOIN dbo.Produits AS P
    ON LC.id_produit = P.id_produit
GROUP BY
    P.id_produit,
    P.nom
ORDER BY
    quantite_vendue DESC,
    P.id_produit ASC;

    -- ==========================================================
-- SCENARIO 06 : Identification des produits déjà commandés
--
-- Contexte métier :
-- Identifier les produits ayant fait l'objet d'au moins
-- une commande.
--
-- Objectif QA :
-- Vérifier que chaque produit apparaît une seule fois,
-- même lorsqu'il est présent dans plusieurs commandes.
--
-- Alias utilisés :
-- LC = dbo.Lignes_Commande
-- P  = dbo.Produits
--
-- Résultat attendu :
-- 3 produits distincts : clavier, souris et écran.
-- La souris doit apparaître une seule fois.
-- ==========================================================

SELECT DISTINCT
    P.id_produit,
    P.nom AS produit
FROM dbo.Lignes_Commande AS LC
INNER JOIN dbo.Produits AS P
    ON LC.id_produit = P.id_produit
ORDER BY P.id_produit;

-- ==========================================================
-- SCENARIO 07 : Vérification des filtres du catalogue
--
-- Contexte métier :
-- Un utilisateur recherche un produit dans le catalogue.
--
-- Objectif QA :
-- Vérifier que la recherche par nom retourne uniquement
-- les produits correspondant au texte recherché.
--
-- Notion testée :
-- LIKE : recherche par correspondance de texte.
--
-- Résultat attendu :
-- 1 produit : Souris sans fil.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE nom LIKE '%Souris%';

-- ==========================================================
-- Test négatif : recherche d'un produit absent du catalogue
-- Résultat attendu : aucune ligne retournée.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE nom LIKE '%tapis%';

-- ==========================================================
-- SCENARIO 07 - TEST 02 : Filtrage par tranche de prix
--
-- Contexte métier :
-- Un utilisateur filtre le catalogue par prix.
--
-- Objectif QA :
-- Vérifier que seuls les produits dont le prix est
-- compris entre 20 et 100 euros sont affichés.
--
-- Notion testée :
-- BETWEEN : filtre une plage de valeurs, bornes incluses.
--
-- Résultat attendu :
-- Souris sans fil   : 29.90
-- Clavier mécanique : 79.90
-- L'écran à 149.90 doit être exclu.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE prix BETWEEN 20 AND 100
ORDER BY prix ASC;

-- ==========================================================
-- SCENARIO 07 - TEST 03 : Combinaison de filtres
--
-- Contexte métier :
-- Rechercher des claviers ou des souris à 50 euros maximum.
--
-- Objectif QA :
-- Vérifier la combinaison de conditions AND et OR.
--
-- Résultat attendu :
-- Souris sans fil : 29.90
-- Le clavier à 79.90 doit être exclu.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE (nom LIKE '%Clavier%' OR nom LIKE '%Souris%')
  AND prix <= 50
ORDER BY prix ASC;

-- ==========================================================
-- SCENARIO 07 - TEST 04 : Combinaison de filtres
--
-- Contexte métier :
-- Rechercher des claviers ou des souris à plus 50 euros minimum.
--
-- Objectif QA :
-- Vérifier la combinaison de conditions AND et OR.
--
-- Résultat attendu :
-- Le clavier : 79.90
-- Souris à 29.90 doit être exclu.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE (nom LIKE '%Clavier%' OR nom LIKE '%Souris%')
  AND prix >= 50
ORDER BY prix ASC;

-- ==========================================================
-- SCENARIO 07 - TEST 05 : Sélection de produits avec IN
--
-- Contexte métier :
-- Le responsable du catalogue souhaite consulter
-- plusieurs références de produits spécifiques.
--
-- Objectif QA :
-- Vérifier que seuls les produits dont les identifiants
-- figurent dans la liste sont retournés.
--
-- Notion testée :
-- IN : recherche parmi plusieurs valeurs exactes.
--
-- Résultat attendu :
-- Produit 1 : Clavier mécanique (79.90)
-- Produit 3 : Écran 24 pouces (149.90)
-- La souris (produit 2) doit être exclue.
-- ==========================================================

SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
WHERE id_produit IN (1, 3)
ORDER BY id_produit ASC;

-- ==========================================================
-- SCENARIO 08 : Contrôle des prix du catalogue
--
-- Contexte métier :
-- Le responsable commercial souhaite consulter
-- les statistiques de prix du catalogue.
--
-- Objectif QA :
-- Vérifier le calcul du prix minimum, maximum
-- et moyen des produits enregistrés.
--
-- Notions testées :
-- MIN : retourne la plus petite valeur.
-- MAX : retourne la plus grande valeur.
-- AVG : calcule la moyenne des valeurs.
--
-- Résultat attendu :
-- Prix minimum : 29.90
-- Prix maximum : 149.90
-- Prix moyen   : 86.57 (arrondi à 2 décimales).
-- ==========================================================

SELECT
    MIN(prix) AS prix_minimum,
    MAX(prix) AS prix_maximum,
    CAST(AVG(prix) AS DECIMAL(10,2)) AS prix_moyen
FROM dbo.Produits;

-- ============================================================
-- SCENARIO 08 - TEST 02 : Statistiques et détail du catalogue
--
-- Contexte métier :
-- Le responsable commercial souhaite consulter les
-- statistiques globales et le détail des produits.
--
-- Objectif QA :
-- Comparer les statistiques du catalogue avec les
-- prix individuels des produits.
--
-- Résultats attendus :
-- Tableau 1 : minimum 29.90, maximum 149.90, moyenne 86.57.
-- Tableau 2 : produits classés par prix croissant.
-- ============================================================

-- Tableau 1 : statistiques globales
SELECT
    MIN(prix) AS prix_minimum,
    MAX(prix) AS prix_maximum,
    CAST(AVG(prix) AS DECIMAL(10,2)) AS prix_moyen
FROM dbo.Produits;

-- Tableau 2 : détail des produits
SELECT
    id_produit,
    nom,
    prix,
    stock
FROM dbo.Produits
ORDER BY prix ASC, id_produit ASC;

-- ============================================================
-- SCENARIO 09 : Generation des combinaisons clients / produits
--
-- Objectif QA :
-- Generer toutes les combinaisons possibles entre
-- les clients et les produits du catalogue.
--
-- C = dbo.Clients
-- P = dbo.Produits
--
-- Resultat attendu :
-- 3 clients x 3 produits = 9 lignes.
-- ============================================================

SELECT
    C.id_client,
    C.nom AS client,
    P.id_produit,
    P.nom AS produit
FROM dbo.Clients AS C
CROSS JOIN dbo.Produits AS P
ORDER BY C.id_client ASC, P.id_produit ASC;