import { fr } from "@/lib/fr";

/**
 * Identité et coordonnées.
 *
 * ⚠️ Les valeurs marquées PROVISOIRE bloquent la mise en ligne (§15 de la
 * spécification). Le numéro de téléphone provisoire appartient à la plage
 * 06 39 98 XX XX, réservée par l'ARCEP à la fiction : il ne peut sonner chez
 * personne. Ne pas le remplacer par un numéro « au hasard ».
 */

export const SITE = fr({
  nom: "Box-HDG",
  baseline: "Sites internet pour entreprises. Livrés en une semaine.",

  /** PROVISOIRE — §15.1 */
  telephone: {
    affichage: "06 39 98 76 54",
    lien: "tel:+33639987654",
    international: "+33 6 39 98 76 54",
  },

  /** PROVISOIRE — §15.1 */
  email: "contact@box-hdg.fr",

  /** PROVISOIRE — §15.3 */
  adresse: {
    ligne1: "Adresse du siège à compléter",
    codePostal: "00000",
    ville: "Ville",
    pays: "France",
  },

  horaires: "Du lundi au vendredi, de 9 h à 18 h.",
  horairesCourts: "Lun – ven, 9 h – 18 h",
});

/** PROVISOIRE — §15.2. Sans slash final. */
export const ORIGINE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.box-hdg.fr";

/**
 * §9 — Drapeau de fonctionnalité. Tant qu'il est à false :
 * le lien « Réalisations » disparaît de la navigation et le teaser de la page
 * d'accueil n'est pas rendu. Un portfolio vide sur un site de vente fait plus
 * de mal que pas de portfolio du tout.
 */
export const REALISATIONS_ENABLED = false;

export const NAVIGATION = fr([
  { libelle: "Offres", href: "/offres" },
  { libelle: "Tarifs", href: "/tarifs" },
  { libelle: "Réalisations", href: "/realisations", drapeau: "realisations" },
  { libelle: "L'équipe", href: "/equipe" },
]);

/** §15 — Ce qui manque encore pour passer en production. */
export const ENTREES_MANQUANTES = [
  "Numéro de téléphone et email professionnels (content/site.ts)",
  "Nom de domaine définitif (NEXT_PUBLIC_SITE_URL)",
  "Bloc d'identité légale pour les mentions légales (content/legal.ts)",
  "Données réalisations : clients, secteurs, villes, captures, URL, délais",
  "Mouncef : nom, rôle, phrase de présentation, photo",
  "Photo de Nizzar",
  "Fichier de logo, ou validation du logotype BOX-HDG en Archivo",
] as const;
