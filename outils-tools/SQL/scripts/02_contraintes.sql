/*
==========================================================
PROJET : QA_Ecommerce_Demo
FICHIER : 02_contraintes.sql
==========================================================

OBJECTIF :
Définir les contraintes d'intégrité afin de
garantir la cohérence des données et le respect
des règles métier.

REGLES METIER :
- Garantir l'unicité des identifiants.
- Rendre obligatoires les informations essentielles.
- Empêcher les valeurs numériques incohérentes.
- Garantir l'intégrité des relations entre tables.

CHOIX D'IMPLEMENTATION :
Les contraintes connues dès la conception sont
généralement définies lors de la création des tables.

Dans ce projet, leur implémentation est volontairement
séparée afin de démontrer l'utilisation de ALTER TABLE
et de vérifier l'application des contraintes sur
des structures existantes.

Cette séparation est réalisée à des fins pédagogiques
et ne représente pas l'approche privilégiée pour
la création initiale d'une base en production.

==========================================================
*/

USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- CONTRAINTES : NOT NULL - Table Clients
-- Règle métier : les informations d'un client sont obligatoires.
-- ==========================================================

ALTER TABLE dbo.Clients
ALTER COLUMN nom VARCHAR(50) NOT NULL;

ALTER TABLE dbo.Clients
ALTER COLUMN prenom VARCHAR(50) NOT NULL;

ALTER TABLE dbo.Clients
ALTER COLUMN email VARCHAR(100) NOT NULL;
GO

ALTER TABLE dbo.Clients
ALTER COLUMN id_client INT NOT NULL;

ALTER TABLE dbo.Clients
ADD CONSTRAINT PK_Clients PRIMARY KEY (id_client);
GO

-- Unicité de l'adresse e-mail
-- Règle métier : une adresse e-mail correspond à un seul client.

ALTER TABLE dbo.Clients
ADD CONSTRAINT UQ_Clients_Email UNIQUE (email);
GO

-- ==========================================================
-- ORGANISATION DES CONTRAINTES
--
-- À partir de cette étape, les contraintes sont regroupées
-- par table afin de faciliter la lecture, la maintenance
-- et la compréhension des règles métier.
--
-- Cette organisation se rapproche des pratiques
-- professionnelles de structuration des scripts SQL.
--
-- Les contraintes sont appliquées dans un ordre tenant
-- compte des dépendances entre les tables.
-- ==========================================================

-- ==========================================================
-- TABLE : Produits
-- Règle métier : garantir l'intégrité des données produits.
-- ==========================================================

-- Champs obligatoires

ALTER TABLE dbo.Produits
ALTER COLUMN id_produit INT NOT NULL;

ALTER TABLE dbo.Produits
ALTER COLUMN nom VARCHAR(100) NOT NULL;

ALTER TABLE dbo.Produits
ALTER COLUMN prix DECIMAL(10,2) NOT NULL;

ALTER TABLE dbo.Produits
ALTER COLUMN stock INT NOT NULL;
GO

-- Identifiant unique
ALTER TABLE dbo.Produits
ADD CONSTRAINT PK_Produits PRIMARY KEY (id_produit);
GO

-- Validation des valeurs métier
ALTER TABLE dbo.Produits
ADD CONSTRAINT CK_Produits_Prix CHECK (prix >= 0);

ALTER TABLE dbo.Produits
ADD CONSTRAINT CK_Produits_Stock CHECK (stock >= 0);
GO

-- ==========================================================
-- TABLE : Commandes
-- Règle métier : garantir l'intégrité des commandes
-- et leur association à un client existant.
-- ==========================================================

-- Champs obligatoires
ALTER TABLE dbo.Commandes
ALTER COLUMN id_commande INT NOT NULL;

ALTER TABLE dbo.Commandes
ALTER COLUMN id_client INT NOT NULL;

ALTER TABLE dbo.Commandes
ALTER COLUMN date_commande DATE NOT NULL;

ALTER TABLE dbo.Commandes
ALTER COLUMN statut VARCHAR(30) NOT NULL;
GO

-- Identifiant unique
ALTER TABLE dbo.Commandes
ADD CONSTRAINT PK_Commandes PRIMARY KEY (id_commande);
GO

-- Valeurs par défaut
ALTER TABLE dbo.Commandes
ADD CONSTRAINT DF_Commandes_Date
DEFAULT (CONVERT(DATE, GETDATE())) FOR date_commande;

ALTER TABLE dbo.Commandes
ADD CONSTRAINT DF_Commandes_Statut
DEFAULT ('En attente') FOR statut;
GO

-- Validation des statuts autorisés
ALTER TABLE dbo.Commandes
ADD CONSTRAINT CK_Commandes_Statut
CHECK (statut IN (
    'En attente',
    'Payée',
    'Expédiée',
    'Livrée',
    'Annulée'
));
GO

-- Relation entre les commandes et les clients
-- Règle métier : chaque commande doit être associée
-- à un client existant dans la base de données.

ALTER TABLE dbo.Commandes
ADD CONSTRAINT FK_Commandes_Clients
FOREIGN KEY (id_client)
REFERENCES dbo.Clients(id_client);
GO

-- ==========================================================
-- TABLE : Lignes_Commande
-- Rôle : associer les produits aux commandes et garantir
--        l'intégrité des informations de chaque ligne.
-- ==========================================================

-- Champs obligatoires
ALTER TABLE dbo.Lignes_Commande
ALTER COLUMN id_commande INT NOT NULL;

ALTER TABLE dbo.Lignes_Commande
ALTER COLUMN id_produit INT NOT NULL;

ALTER TABLE dbo.Lignes_Commande
ALTER COLUMN quantite INT NOT NULL;

ALTER TABLE dbo.Lignes_Commande
ALTER COLUMN prix_unitaire DECIMAL(10,2) NOT NULL;
GO

-- Identifiant unique composé
-- Règle métier : un produit ne peut apparaître
-- qu'une seule fois dans une même commande.

ALTER TABLE dbo.Lignes_Commande
ADD CONSTRAINT PK_Lignes_Commande
PRIMARY KEY (id_commande, id_produit);
GO

-- Validation des valeurs métier
-- Règle métier : une quantité doit être supérieure à zéro
-- et un prix unitaire ne peut pas être négatif.

ALTER TABLE dbo.Lignes_Commande
ADD CONSTRAINT CK_Lignes_Commande_Quantite
CHECK (quantite > 0);

ALTER TABLE dbo.Lignes_Commande
ADD CONSTRAINT CK_Lignes_Commande_Prix
CHECK (prix_unitaire >= 0);
GO

-- Relations avec les tables Commandes et Produits
-- Règle métier : chaque ligne doit référencer
-- une commande et un produit existants.

ALTER TABLE dbo.Lignes_Commande
ADD CONSTRAINT FK_Lignes_Commande_Commandes
FOREIGN KEY (id_commande)
REFERENCES dbo.Commandes(id_commande);

ALTER TABLE dbo.Lignes_Commande
ADD CONSTRAINT FK_Lignes_Commande_Produits
FOREIGN KEY (id_produit)
REFERENCES dbo.Produits(id_produit);
GO

-- ==========================================================
-- COLONNE CALCULEE : Montant d'une ligne de commande
-- Objectif : calculer automatiquement le montant total
-- à partir de la quantité et du prix unitaire.
-- ==========================================================

ALTER TABLE dbo.Lignes_Commande
ADD montant_ligne AS (quantite * prix_unitaire);
GO