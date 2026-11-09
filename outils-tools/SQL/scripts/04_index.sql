/*
==========================================================
PROJET : QA_Ecommerce_Demo
FICHIER : 04_index.sql
==========================================================

OBJECTIF :
Optimiser les recherches de commandes par date
à l'aide d'un index NONCLUSTERED.

==========================================================
*/

USE QA_Ecommerce_Demo;
GO

-- ==========================================================
-- INDEX : Date des commandes
-- Objectif : faciliter les recherches par date.
-- ==========================================================

CREATE NONCLUSTERED INDEX IX_Commandes_Date
ON dbo.Commandes (date_commande);
GO

-- ==========================================================
-- GESTION DES INDEX : Suppression d'un index
-- Démonstration de la syntaxe DROP INDEX.
-- Ne pas exécuter dans la configuration finale.
-- ==========================================================

-- DROP INDEX IX_Commandes_Date ON dbo.Commandes;