/**
 * SOURCE UNIQUE DES PRIX.
 *
 * Aucun autre fichier du dépôt ne code un montant en dur. Si un prix change,
 * ce fichier change, et lui seul. Tous les montants sont hors taxes.
 */

export const PRICING = {
  essentiel: {
    nom: "Essentiel",
    achat: { setup: 890, mensuel: 29 },
    abonnement: { setup: 190, mensuel: 69, engagementMois: 24 },
  },
  complete: {
    nom: "Complète",
    achat: { setup: 1390, mensuel: 29 },
    abonnement: { setup: 290, mensuel: 99, engagementMois: 24 },
  },
  options: {
    assistant: { mensuel: 29 },
    contenu: { mensuel: 49 },
    ficheGoogle: { mensuel: 39 },
  },
  /**
   * Fourchettes de marché, France 2026, pour le module de comparaison (§5.6).
   *
   * Les clés `agence*` et `delai*` sont celles de la spécification. Les blocs
   * `freelance*` et `abonnement*` ont été ajoutés : le tableau de la §5.6
   * comporte quatre lignes, et la consigne « toutes les données proviennent de
   * PRICING.marche » ne pouvait pas être tenue avec les seules clés d'origine.
   */
  marche: {
    agenceSetupMin: 1500,
    agenceSetupMax: 3500,
    agenceMensuelMin: 80,
    agenceMensuelMax: 200,
    delaiSemainesMin: 4,
    delaiSemainesMax: 8,

    freelanceSetupMin: 500,
    freelanceSetupMax: 3000,
    freelanceDelaiSemainesMin: 3,
    freelanceDelaiSemainesMax: 6,

    abonnementSetupMin: 390,
    abonnementSetupMax: 1290,
    abonnementMensuelMin: 39,
    abonnementMensuelMax: 99,
    abonnementDelaiSemainesMin: 1,
    abonnementDelaiSemainesMax: 3,
  },
} as const;

/** Délai d'engagement Box-HDG, en jours ouvrés. */
export const DELAI_JOURS_OUVRES = 5;

/** Le point d'entrée affiché partout : le plus bas des prix d'achat. */
export const PRIX_PLANCHER = PRICING.essentiel.achat.setup;

/** Le mensuel d'achat, identique sur les deux formules. */
export const MENSUEL_PLANCHER = PRICING.essentiel.achat.mensuel;
