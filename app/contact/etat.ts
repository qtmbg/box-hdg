/**
 * Types et état initial du formulaire.
 *
 * Séparés de actions.ts : un module « use server » ne peut exporter que des
 * fonctions asynchrones. Y laisser une constante la fait disparaître à la
 * compilation, et `useActionState` démarre alors sur `undefined`.
 */

export type Champ =
  | "entreprise"
  | "nom"
  | "telephone"
  | "email"
  | "siteExistant"
  | "adresseSite"
  | "message";

export type EtatFormulaire = {
  statut: "initial" | "succes" | "erreur";
  erreurs: Partial<Record<Champ | "global", string>>;
  valeurs: Partial<Record<Champ, string>>;
};

export const ETAT_INITIAL: EtatFormulaire = {
  statut: "initial",
  erreurs: {},
  valeurs: {},
};
