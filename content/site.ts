import { fr } from "@/lib/fr";
import { LEGAL_COMPLET } from "./legal";

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

  /** PROVISOIRE, §15.1 */
  telephone: {
    affichage: "06 39 98 76 54",
    lien: "tel:+33639987654",
    international: "+33 6 39 98 76 54",
  },

  /** PROVISOIRE, §15.1 */
  email: "contact@box-hdg.fr",

  /** PROVISOIRE, §15.3 */
  adresse: {
    ligne1: "Adresse du siège à compléter",
    codePostal: "00000",
    ville: "Ville",
    pays: "France",
  },

  horaires: "Du lundi au vendredi, de 9 h à 18 h.",
  horairesCourts: "Du lundi au vendredi, 9 h à 18 h",
});


/** PROVISOIRE, §15.2. Sans slash final. */
export const ORIGINE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.box-hdg.fr";

/**
 * Le site n'est indexable qu'à deux conditions.
 *
 * L'identité légale doit être renseignée : présenter au public un site
 * commercial sans mentions légales complètes n'est pas défendable, et Google
 * n'a pas à en garder une copie.
 *
 * Et l'adresse ne doit pas être une adresse de recette. Un déploiement
 * *.vercel.app sert à faire relire le site avant l'achat du domaine ; s'il est
 * indexé, il devient un doublon qui concurrencera le vrai domaine le jour où
 * celui-ci sera mis en ligne.
 *
 * Quand ce drapeau est baissé : robots.txt interdit tout, chaque page passe en
 * noindex, et le sitemap est vide.
 */
export const INDEXABLE =
  LEGAL_COMPLET && !/\.vercel\.app$/i.test(new URL(ORIGINE).hostname);

/**
 * §9. Drapeau de fonctionnalité. Tant qu'il est à false :
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

/** §15. Ce qui manque encore pour passer en production. */
export const ENTREES_MANQUANTES = [
  "Numéro de téléphone et email professionnels (content/site.ts)",
  "Nom de domaine définitif (NEXT_PUBLIC_SITE_URL)",
  "Bloc d'identité légale pour les mentions légales (content/legal.ts)",
  "Données réalisations : clients, secteurs, villes, captures, URL, délais",
  "Mouncef : nom, rôle, phrase de présentation, photo",
  "Photo de Nizzar",
  "Fichier de logo, ou validation du logotype BOX-HDG en Archivo",
] as const;
