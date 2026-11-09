/*
==========================================================
PROJET : QA_Ecommerce_Demo
FICHIER : 01_creation_tables.sql
==========================================================

CONTEXTE FONCTIONNEL :
Base de données fictive de commerce en ligne
simulant la gestion des clients, des produits
et des commandes.

OBJECTIF QA :
Concevoir un environnement de test permettant
de vérifier la structure des données, leur
intégrité et le respect des règles métier.

ROLE DU SCRIPT :
Créer les tables et définir leurs attributs
ainsi que les types de données associés.

CHOIX PEDAGOGIQUE :
Les tables sont volontairement créées sans
contraintes d'intégrité afin d'étudier leur
ajout et leur modification avec ALTER TABLE
dans un script distinct.

Dans un environnement professionnel, les
contraintes identifiées dès la conception
sont généralement définies directement
lors de la création des tables.

Cette séparation répond uniquement aux
objectifs pédagogiques du module et ne
constitue pas une recommandation de
conception pour un environnement de production.

==========================================================
*/

-- Sélection de la base de données du projet.
USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- TABLE : Clients
-- Rôle : stocker les informations des clients de la boutique.
-- ==========================================================

CREATE TABLE dbo.Clients (
    id_client INT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100)
);
GO

-- ==========================================================
-- TABLE : Produits
-- Rôle : stocker les produits disponibles dans la boutique.
-- ==========================================================

CREATE TABLE dbo.Produits (
    id_produit INT,
    nom VARCHAR(100),
    prix DECIMAL(10,2),
    stock INT
);
GO

-- ==========================================================
-- TABLE : Commandes
-- Rôle : enregistrer les commandes passées par les clients.
-- ==========================================================

CREATE TABLE dbo.Commandes (
    id_commande INT,
    id_client INT,
    date_commande DATE,
    statut VARCHAR(30)
);
GO

-- ==========================================================
-- TABLE : Lignes_Commande
-- Rôle : associer les produits aux commandes
--        et enregistrer les quantités commandées.
-- ==========================================================

CREATE TABLE dbo.Lignes_Commande (
    id_commande INT,
    id_produit INT,
    quantite INT,
    prix_unitaire DECIMAL(10,2)
);
GO

-- ==========================================================
-- TABLE : Avis_Clients
-- Rôle : enregistrer les avis des clients sur les produits.
--
-- Règles métier :
-- - Chaque avis possède un identifiant automatique.
-- - Chaque avis appartient à un client existant.
-- - Chaque avis concerne un produit existant.
-- - La note doit être comprise entre 1 et 5.
-- ==========================================================

CREATE TABLE dbo.Avis_Clients (
    id_avis INT IDENTITY(1,1) NOT NULL,
    id_client INT NOT NULL,
    id_produit INT NOT NULL,
    note INT NOT NULL,
    commentaire VARCHAR(500) NULL,

    CONSTRAINT PK_Avis_Clients
        PRIMARY KEY (id_avis),

    CONSTRAINT FK_Avis_Clients_Clients
        FOREIGN KEY (id_client)
        REFERENCES dbo.Clients(id_client),

    CONSTRAINT FK_Avis_Clients_Produits
        FOREIGN KEY (id_produit)
        REFERENCES dbo.Produits(id_produit),

    CONSTRAINT CK_Avis_Clients_Note
        CHECK (note BETWEEN 1 AND 5)
);
GO

-- ==========================================================
-- GESTION DES TABLES : Suppression
-- Objectif : documenter la syntaxe DROP TABLE.
--
-- Commandes volontairement désactivées.
-- À utiliser uniquement si une suppression est nécessaire.
-- ==========================================================

-- DROP TABLE IF EXISTS dbo.Avis_Clients;
-- DROP TABLE IF EXISTS dbo.Lignes_Commande;
-- DROP TABLE IF EXISTS dbo.Commandes;
-- DROP TABLE IF EXISTS dbo.Produits;
-- DROP TABLE IF EXISTS dbo.Clients;