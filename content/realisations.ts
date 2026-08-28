import { fr } from "@/lib/fr";

export type Realisation = {
  slug: string;
  client: string; // raison sociale réelle
  secteur: string; // « Plomberie », « Restaurant », …
  ville: string;
  type: "creation" | "refonte";
  delaiJours: number;
  url?: string; // site en ligne, lien externe
  resume: string; // une phrase, FR
  image: string; // capture, 16:10
  citation?: { texte: string; auteur: string; role: string };
};

/**
 * §9 — Vide, volontairement.
 *
 * Le drapeau REALISATIONS_ENABLED (content/site.ts) reste à false tant que
 * cette liste est vide : le lien disparaît de la navigation et le teaser de
 * l'accueil n'est pas rendu. Pas de faux clients, pas de logos d'illustration,
 * pas de « bientôt disponible ».
 */
export const REALISATIONS: Realisation[] = [];

export const PAGE_REALISATIONS = fr({
  meta: {
    titre: "Réalisations — Box-HDG",
    description:
      "Les sites que nous avons construits pour des entreprises françaises.",
  },
  titre: "Nos réalisations",
  chapo:
    "Les sites que nous avons livrés, avec le nom de l'entreprise, son secteur et le délai de livraison.",
  filtres: { tout: "Tout", creation: "Création", refonte: "Refonte" },
  etiquettes: { creation: "Création", refonte: "Refonte" },
  delai: (jours: number) => `Livré en ${jours} jours`,
  voirLeSite: "Voir le site →",
  legendeFiltres: "Filtrer les réalisations",
});

export function secteurs(liste: Realisation[]): string[] {
  return [...new Set(liste.map((r) => r.secteur))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}
