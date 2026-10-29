
"use strict";

/* ==================================================
   1. TRADUCTIONS DE LA DÉMONSTRATION SQUASH TM
   ================================================== */

const traductionsSquash = {

    /* ==================================================
       2. VERSION FRANÇAISE
       ================================================== */

    fr: {

        /* ===== Interface générale ===== */

        interface: {
            titre: "Squash TM — Tests fonctionnels",
            sousTitre: "Projet de tests fonctionnels sur le site DemoBlaze",
            piedPage: "Portfolio QA — Tests fonctionnels avec Squash TM",

            navigationModules: "Modules de test",
            navigationTests: "Cas de test du module sélectionné",

            modules: {
                ARBO: "🏠 Arborescence",
                AUTH: "Authentification",
                CAT: "Catalogue",
                PAN: "Panier",
                CMD: "Commande"
            },

            titreArbo: "Organisation des tests dans Squash TM",

            descriptionArbo:
                "Vue générale de l'organisation du projet DemoBlaze " +
                "dans Squash TM, avec les différents modules " +
                "fonctionnels et leurs cas de test.",

            arboAlt:
                "Capture de l'arborescence des tests DemoBlaze dans Squash TM",

            selectionTest:
                "Sélectionnez un cas de test ci-dessus pour consulter sa fiche.",

            moduleVide:
                "La documentation des cas de test de ce module " +
                "sera ajoutée prochainement.",

            attente:
                "La fiche détaillée de ce cas de test " +
                "sera ajoutée prochainement.",

            statut: "Exécuté et validé",

            objectif: "Objectif",
            preconditions: "Préconditions",
            methode: "Méthode de conception",
            etapes: "Étapes du test",
            action: "Action",
            resultatAttendu: "Résultat attendu",
            reutilisation: "Réutilisation des cas de test",
            execution: "Résultat de l'exécution",

            captureTitre: "Capture du cas de test dans Squash TM",

            captureAlt:
                "Capture du cas de test dans Squash TM"
        },

        /* ==================================================
           3. FICHES FRANÇAISES
           ================================================== */

        fiches: {

            /* ===== AUTH-001 ===== */

            "AUTH-001": {
                titre: "Connexion avec identifiants valides",

                objectif:
                    "Vérifier qu'un utilisateur disposant d'identifiants " +
                    "valides peut se connecter à DemoBlaze et que son " +
                    "authentification est confirmée dans l'interface.",

                preconditions:
                    "Un compte utilisateur enregistré avec des " +
                    "identifiants valides est disponible. " +
                    "Aucune session utilisateur n'est active.",

                methode:
                    "Le scénario comporte trois étapes associées " +
                    "à leurs résultats attendus. Les paramètres " +
                    "LOGIN et PASSWORD sont alimentés par le jeu " +
                    "de données JD_Connexion_Valide.",

                etapes: [
                    {
                        action:
                            "Cliquer sur Log in dans l'en-tête du site.",

                        resultat:
                            "La fenêtre de connexion s'ouvre avec " +
                            "les champs Username et Password."
                    },
                    {
                        action:
                            "Saisir ${LOGIN} dans Username et " +
                            "${PASSWORD} dans Password.",

                        resultat:
                            "Les champs contiennent les valeurs " +
                            "du jeu de données et le mot de passe " +
                            "est masqué."
                    },
                    {
                        action:
                            "Valider le formulaire de connexion.",

                        resultat:
                            "La fenêtre se ferme. Un message de " +
                            "bienvenue et le lien Log out apparaissent " +
                            "dans l'en-tête."
                    }
                ],

                reutilisation:
                    "Ce cas de test est réutilisé par AUTH-005 " +
                    "(déconnexion) et CAT-003 (affichage du catalogue " +
                    "avec authentification), afin d'éviter de " +
                    "dupliquer la procédure de connexion.",

                execution:
                    "Le scénario a été exécuté dans une campagne " +
                    "de tests fonctionnels. L'exécution enregistrée " +
                    "dans Squash TM présente le statut Succès."
            },

            /* ===== AUTH-002 ===== */

            "AUTH-002": {
                titre: "Connexion avec un mot de passe incorrect",

                objectif:
                    "Vérifier que DemoBlaze refuse la connexion " +
                    "lorsqu'un utilisateur saisit un identifiant " +
                    "existant avec un mot de passe incorrect.",

                preconditions:
                    "Un compte utilisateur existant est disponible. " +
                    "Le mot de passe utilisé pour le test est incorrect. " +
                    "Aucune session utilisateur n'est active.",

                methode:
                    "Le scénario comporte trois étapes avec leurs " +
                    "résultats attendus. Les paramètres LOGIN et " +
                    "PASSWORD utilisent le jeu de données " +
                    "JD_Connexion_Invalide.",

                etapes: [
                    {
                        action:
                            "Cliquer sur Log in dans l'en-tête du site.",

                        resultat:
                            "La fenêtre de connexion apparaît."
                    },
                    {
                        action:
                            "Saisir ${LOGIN} et ${PASSWORD} " +
                            "dans les champs correspondants.",

                        resultat:
                            "Les champs contiennent les valeurs " +
                            "du jeu de données."
                    },
                    {
                        action:
                            "Cliquer sur Log in pour valider.",

                        resultat:
                            "Une alerte indique Wrong password. " +
                            "La connexion est refusée et aucune " +
                            "session utilisateur n'est créée."
                    }
                ],

                execution:
                    "L'exécution est enregistrée avec le statut " +
                    "Succès dans Squash TM. Le refus de connexion " +
                    "correspond au résultat attendu."
            },

            /* ===== AUTH-003 ===== */

            "AUTH-003": {
                titre: "Connexion avec identifiant et mot de passe vides",

                objectif:
                    "Vérifier que DemoBlaze refuse une tentative " +
                    "de connexion lorsque les champs Username " +
                    "et Password sont laissés vides.",

                preconditions:
                    "La page d'accueil de DemoBlaze est affichée. " +
                    "Aucune session utilisateur n'est active.",

                methode:
                    "Ce test négatif ne nécessite pas de jeu " +
                    "de données. Il vérifie le comportement de " +
                    "l'application lorsqu'un formulaire de " +
                    "connexion vide est soumis.",

                etapes: [
                    {
                        action:
                            "Cliquer sur Log in dans l'en-tête du site.",

                        resultat:
                            "La fenêtre de connexion s'ouvre."
                    },
                    {
                        action:
                            "Laisser Username et Password vides, " +
                            "puis cliquer sur Log in.",

                        resultat:
                            "Une alerte demande de renseigner " +
                            "les champs Username et Password. " +
                            "Aucune session utilisateur n'est créée."
                    }
                ],

                execution:
                    "Le test est enregistré avec le statut Succès " +
                    "dans Squash TM. Le résultat attendu est le " +
                    "refus de la connexion avec des champs vides."
            },

            /* ===== AUTH-004 ===== */

            "AUTH-004": {
                titre: "Connexion avec un utilisateur inexistant",

                objectif:
                    "Vérifier que DemoBlaze refuse la connexion " +
                    "lorsqu'un identifiant non enregistré dans " +
                    "l'application est utilisé.",

                preconditions:
                    "Aucune session utilisateur n'est active. " +
                    "L'identifiant utilisé ne correspond à aucun " +
                    "compte enregistré.",

                methode:
                    "Le scénario comporte trois étapes. " +
                    "Les paramètres LOGIN et PASSWORD proviennent " +
                    "du jeu de données JD_Utilisateur_Inexistant.",

                etapes: [
                    {
                        action:
                            "Cliquer sur Log in dans l'en-tête du site.",

                        resultat:
                            "La fenêtre de connexion apparaît."
                    },
                    {
                        action:
                            "Saisir ${LOGIN} et ${PASSWORD} " +
                            "dans les champs correspondants.",

                        resultat:
                            "Les valeurs du jeu de données " +
                            "sont présentes dans les champs."
                    },
                    {
                        action:
                            "Valider le formulaire de connexion.",

                        resultat:
                            "La tentative de connexion est refusée. " +
                            "Un message indique l'échec de " +
                            "l'authentification et aucune session " +
                            "n'est créée."
                    }
                ],

                execution:
                    "L'exécution est enregistrée avec le statut " +
                    "Succès dans Squash TM, confirmant le refus " +
                    "attendu d'un utilisateur inexistant."
            },

            /* ===== AUTH-005 ===== */

            "AUTH-005": {
                titre: "Déconnexion d'un utilisateur authentifié",

                objectif:
                    "Vérifier qu'un utilisateur authentifié peut " +
                    "se déconnecter de DemoBlaze et que la " +
                    "déconnexion persiste après actualisation " +
                    "de la page.",

                preconditions:
                    "Un utilisateur enregistré dispose " +
                    "d'identifiants valides permettant " +
                    "d'ouvrir une session.",

                methode:
                    "Le scénario appelle AUTH-001 avec le jeu " +
                    "de données JD_Connexion_Valide pour établir " +
                    "la connexion. Il vérifie ensuite la " +
                    "déconnexion et le maintien de cet état " +
                    "après actualisation.",

                etapes: [
                    {
                        action:
                            "Appeler AUTH-001 avec le jeu " +
                            "de données JD_Connexion_Valide.",

                        resultat:
                            "L'utilisateur est connecté. " +
                            "Le message Welcome et le lien " +
                            "Log out sont visibles."
                    },
                    {
                        action:
                            "Cliquer sur Log out dans l'en-tête.",

                        resultat:
                            "Le message de bienvenue et le lien " +
                            "Log out disparaissent. Les liens " +
                            "Log in et Sign up réapparaissent."
                    },
                    {
                        action:
                            "Actualiser la page d'accueil.",

                        resultat:
                            "L'utilisateur reste déconnecté. " +
                            "Le message de bienvenue et le lien " +
                            "Log out ne réapparaissent pas."
                    }
                ],

                reutilisation:
                    "AUTH-005 réutilise AUTH-001 comme étape " +
                    "de test appelée, sans dupliquer la " +
                    "procédure d'authentification.",

                execution:
                    "L'exécution est enregistrée avec le statut " +
                    "Succès dans Squash TM, y compris après " +
                    "vérification de l'état de la session " +
                    "suite à l'actualisation."
            }
        }
    },


    /* ==================================================
       4. VERSION ANGLAISE
       ================================================== */

    en: {

        /* ===== General interface ===== */

        interface: {
            titre: "Squash TM — Functional Testing",
            sousTitre: "Functional testing project using the DemoBlaze website",
            piedPage: "QA Portfolio — Functional Testing with Squash TM",

            navigationModules: "Test modules",
            navigationTests: "Test cases for the selected module",

            modules: {
                ARBO: "🏠 Test tree",
                AUTH: "Authentication",
                CAT: "Catalog",
                PAN: "Cart",
                CMD: "Checkout"
            },

            titreArbo: "Test organization in Squash TM",

            descriptionArbo:
                "Overview of the DemoBlaze test project structure " +
                "in Squash TM, including functional modules " +
                "and their associated test cases.",

            arboAlt:
                "Original French screenshot of the DemoBlaze test tree in Squash TM",

            selectionTest:
                "Select a test case above to view its documentation.",

            moduleVide:
                "Test case documentation for this module " +
                "will be added soon.",

            attente:
                "Detailed documentation for this test case " +
                "will be added soon.",

            statut: "Executed and passed",

            objectif: "Objective",
            preconditions: "Preconditions",
            methode: "Test design approach",
            etapes: "Test steps",
            action: "Action",
            resultatAttendu: "Expected result",
            reutilisation: "Test case reuse",
            execution: "Execution result",

            captureTitre: "Test case screenshot from Squash TM",

            captureAlt:
                "Original French test case screenshot in Squash TM"
        },

        /* ==================================================
           5. ENGLISH TEST CASES
           ================================================== */

        fiches: {

            /* ===== AUTH-001 ===== */

            "AUTH-001": {
                titre: "Login with valid credentials",

                objectif:
                    "Verify that a registered user can successfully " +
                    "log in to DemoBlaze with valid credentials " +
                    "and that the interface confirms authentication.",

                preconditions:
                    "A registered user account with valid credentials " +
                    "is available. No user session is active.",

                methode:
                    "The test consists of three steps with expected " +
                    "results. LOGIN and PASSWORD are supplied " +
                    "by the JD_Connexion_Valide dataset.",

                etapes: [
                    {
                        action:
                            "Click Log in in the site header.",

                        resultat:
                            "The login dialog opens with Username " +
                            "and Password fields."
                    },
                    {
                        action:
                            "Enter ${LOGIN} in Username and " +
                            "${PASSWORD} in Password.",

                        resultat:
                            "The fields contain the dataset values " +
                            "and the password is masked."
                    },
                    {
                        action:
                            "Submit the login form.",

                        resultat:
                            "The dialog closes. A welcome message " +
                            "and the Log out link appear in the header."
                    }
                ],

                reutilisation:
                    "AUTH-001 is reused by AUTH-005 (logout) " +
                    "and CAT-003 (authenticated catalog display), " +
                    "avoiding duplication of the login procedure.",

                execution:
                    "The test was executed in a Squash TM " +
                    "functional test campaign and recorded as Passed."
            },

            /* ===== AUTH-002 ===== */

            "AUTH-002": {
                titre: "Login with an incorrect password",

                objectif:
                    "Verify that DemoBlaze rejects a login attempt " +
                    "when a registered username is paired with " +
                    "an incorrect password.",

                preconditions:
                    "An existing user account is available. " +
                    "The password used for the test is incorrect. " +
                    "No user session is active.",

                methode:
                    "The test uses LOGIN and PASSWORD parameters " +
                    "from the JD_Connexion_Invalide dataset. " +
                    "It checks the error message and the absence " +
                    "of an authenticated session.",

                etapes: [
                    {
                        action:
                            "Click Log in in the site header.",

                        resultat:
                            "The login dialog appears."
                    },
                    {
                        action:
                            "Enter ${LOGIN} and ${PASSWORD} " +
                            "in the corresponding fields.",

                        resultat:
                            "The fields contain the dataset values."
                    },
                    {
                        action:
                            "Click Log in to submit the credentials.",

                        resultat:
                            "An alert displays Wrong password. " +
                            "The login attempt is rejected and " +
                            "no authenticated session is created."
                    }
                ],

                execution:
                    "The execution was recorded as Passed " +
                    "in Squash TM. The expected result is " +
                    "the rejection of the incorrect password."
            },

            /* ===== AUTH-003 ===== */

            "AUTH-003": {
                titre: "Login with empty username and password",

                objectif:
                    "Verify that DemoBlaze prevents authentication " +
                    "when both Username and Password are empty.",

                preconditions:
                    "The DemoBlaze homepage is displayed " +
                    "and no user session is active.",

                methode:
                    "This negative test does not require a dataset. " +
                    "It checks the application's response " +
                    "to an empty login form.",

                etapes: [
                    {
                        action:
                            "Click Log in in the site header.",

                        resultat:
                            "The login dialog opens."
                    },
                    {
                        action:
                            "Leave Username and Password empty, " +
                            "then click Log in.",

                        resultat:
                            "An alert requests the Username and " +
                            "Password fields to be completed. " +
                            "No user session is created."
                    }
                ],

                execution:
                    "The test was recorded as Passed in Squash TM. " +
                    "The expected behavior is the rejection " +
                    "of the empty login form."
            },

            /* ===== AUTH-004 ===== */

            "AUTH-004": {
                titre: "Login with a non-existent user",

                objectif:
                    "Verify that DemoBlaze rejects a login attempt " +
                    "using a username that does not correspond " +
                    "to any registered account.",

                preconditions:
                    "No user is logged in. The username selected " +
                    "for the test is not associated with " +
                    "an existing account.",

                methode:
                    "LOGIN and PASSWORD are supplied by the " +
                    "JD_Utilisateur_Inexistant dataset. " +
                    "The scenario checks rejection of an unknown user.",

                etapes: [
                    {
                        action:
                            "Click Log in in the site header.",

                        resultat:
                            "The login dialog appears."
                    },
                    {
                        action:
                            "Enter ${LOGIN} and ${PASSWORD} " +
                            "in their respective fields.",

                        resultat:
                            "The fields contain the dataset values."
                    },
                    {
                        action:
                            "Click Log in to submit the credentials.",

                        resultat:
                            "The login attempt is rejected. " +
                            "An authentication failure message " +
                            "is displayed and no session is created."
                    }
                ],

                execution:
                    "The execution was recorded as Passed " +
                    "in Squash TM, confirming the expected " +
                    "rejection of an unregistered username."
            },

            /* ===== AUTH-005 ===== */

            "AUTH-005": {
                titre: "Logout of an authenticated user",

                objectif:
                    "Verify that an authenticated DemoBlaze user " +
                    "can log out and that refreshing the homepage " +
                    "does not restore the session.",

                preconditions:
                    "A registered user with valid credentials " +
                    "is available for authentication.",

                methode:
                    "The scenario calls the reusable AUTH-001 " +
                    "test with the JD_Connexion_Valide dataset. " +
                    "It then verifies logout and session persistence " +
                    "after a page refresh.",

                etapes: [
                    {
                        action:
                            "Call AUTH-001 using the " +
                            "JD_Connexion_Valide dataset.",

                        resultat:
                            "The user is authenticated. " +
                            "The Welcome message and Log out " +
                            "link appear in the header."
                    },
                    {
                        action:
                            "Click Log out in the site header.",

                        resultat:
                            "The welcome message and Log out " +
                            "link disappear. Log in and Sign up " +
                            "are visible again."
                    },
                    {
                        action:
                            "Refresh the DemoBlaze homepage.",

                        resultat:
                            "The user remains logged out. " +
                            "The welcome message and Log out " +
                            "link do not reappear."
                    }
                ],

                reutilisation:
                    "AUTH-005 calls AUTH-001 as a reusable test " +
                    "step instead of duplicating the login procedure.",

                execution:
                    "The functional test campaign in Squash TM " +
                    "records this execution as Passed, including " +
                    "the session-state verification after refreshing."
            }
        }
    }
};
