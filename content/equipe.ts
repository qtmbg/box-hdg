import { fr } from "@/lib/fr";

export type Membre = {
  photo: string;
  nom: string;
  role: string; // FR
  ligne: string; // une phrase, FR
  actif: boolean; // false = emplacement vide
};

/**
 * §10 — La grille se réduit au nombre de membres actifs.
 *
 * Aucune carte fantôme, aucune silhouette, aucun « Nous recrutons ». Quatre
 * silhouettes grises sur une page équipe donnent exactement l'impression que
 * cette page existe pour éviter : deux personnes qui se font passer pour une
 * agence.
 *
 * ⚠️ Boîte 2 — Mouncef : nom de famille, rôle et phrase manquants (§15.5).
 * Reste à actif: false jusqu'à réception. Ne pas inventer de rôle.
 *
 * ⚠️ La mention « consultant certifié Anthropic/OpenAI » du brief n'est pas
 * publiée : en France, un titre professionnel invérifiable sur un site
 * commercial relève des pratiques commerciales trompeuses (art. L121-2 du code
 * de la consommation). À réintroduire uniquement contre une référence de
 * certificat vérifiable, et en une seule proposition.
 */
export const EQUIPE: Membre[] = fr([
  {
    // §15.6 — déposer le fichier dans public/equipe/ puis renseigner
    // "/equipe/nizzar.jpg". Tant que la chaîne est vide, le carré porte les
    // initiales : jamais d'image cassée en production.
    photo: "",
    nom: "Nizzar Ben Chekroune",
    role: "Direction et stratégie",
    ligne:
      "Vingt ans de stratégie de marque et de développement web. Fondateur de Quantum Branding. Conçoit les sites et les méthodes de production de Box-HDG.",
    // Rôle et phrase sont fournis par le brief : la boîte est publiable. Seule
    // la photo manque (§15.6). En attendant, le carré porte les initiales en
    // Archivo — un cadre neutre pour une personne réelle, ce qui n'a rien à
    // voir avec les silhouettes interdites pour les emplacements vides.
    actif: true,
  },
  {
    photo: "",
    nom: "Mouncef",
    role: "",
    ligne: "",
    actif: false, // §15.5
  },
  { photo: "", nom: "", role: "", ligne: "", actif: false },
  { photo: "", nom: "", role: "", ligne: "", actif: false },
  { photo: "", nom: "", role: "", ligne: "", actif: false },
  { photo: "", nom: "", role: "", ligne: "", actif: false },
]);

export const PAGE_EQUIPE = fr({
  meta: {
    titre: "L'équipe — Box-HDG",
    description: "Les personnes qui construisent et suivent votre site.",
  },
  titre: "L'équipe",
  chapo: "Vous savez qui construit votre site et qui vous répond au téléphone.",
  methode: {
    titre: "Comment on travaille",
    texte:
      "Un interlocuteur unique du premier appel à la mise en ligne. Réponse à toute demande sous 24 heures ouvrées. Toute modification de contenu est traitée dans la journée.",
  },
});
