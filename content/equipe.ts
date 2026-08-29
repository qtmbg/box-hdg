import { fr } from "@/lib/fr";

export type Membre = {
  photo: string;
  nom: string;
  role: string; // FR
  ligne: string; // une phrase, FR
  actif: boolean; // false = emplacement vide
};

/**
 * §10. La grille se réduit au nombre de membres actifs.
 *
 * Aucune carte fantôme, aucune silhouette, aucun « Nous recrutons ». Quatre
 * silhouettes grises sur une page équipe donnent exactement l'impression que
 * cette page existe pour éviter : deux personnes qui se font passer pour une
 * agence.
 *
 * ⚠️ Boîte 2, Mouncef : nom de famille, rôle et phrase manquants (§15.5).
 * Reste à actif: false jusqu'à réception. Ne pas inventer de rôle.
 *
 * La mention de formation est publiée : les vingt-trois certificats existent,
 * sont au nom de Nizzar Ben Chekroune, et les trois certificats OpenAI sont
 * vérifiables publiquement à leur adresse académique. Voir CERTIFICATIONS
 * plus bas.
 *
 * Le libellé dit « certificats de formation » et non « consultant certifié ».
 * Ce sont des attestations de suivi de cours, pas un titre professionnel
 * accrédité : l'écrire autrement relèverait de l'article L121-2 du code de la
 * consommation, et n'ajouterait rien puisque le nombre parle de lui-même.
 */
export const EQUIPE: Membre[] = fr([
  {
    // §15.6. déposer le fichier dans public/equipe/ puis renseigner
    // "/equipe/nizzar.jpg". Tant que la chaîne est vide, le carré porte les
    // initiales : jamais d'image cassée en production.
    photo: "",
    nom: "Nizzar Ben Chekroune",
    role: "Direction et stratégie",
    ligne:
      "Vingt ans de stratégie de marque et de développement web. Fondateur de Quantum Branding. Conçoit les sites et les méthodes de production de Box-HDG. Vingt-trois certificats de formation délivrés par Anthropic Academy et OpenAI Academy.",
    // Rôle et phrase sont fournis par le brief : la boîte est publiable. Seule
    // la photo manque (§15.6). En attendant, le carré porte les initiales en
    // Archivo, un cadre neutre pour une personne réelle, ce qui n'a rien à
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
    titre: "L'équipe · Box-HDG",
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

/**
 * §10. Formations certifiées.
 *
 * Vingt-trois attestations de suivi de cours au nom de Nizzar Ben Chekroune,
 * délivrées en 2026. Les trois certificats OpenAI portent un identifiant public
 * et se vérifient en un clic ; les vingt certificats Anthropic sont des PDF
 * nominatifs, fournis sur demande.
 *
 * Les intitulés de cours restent dans la langue d'émission. Ce sont les
 * désignations officielles des attestations : les traduire romprait le lien
 * avec le document vérifiable. C'est la seule exception à la règle « pas
 * d'anglais dans le site rendu », et elle est confinée à un bloc replié.
 */
export const CERTIFICATIONS = fr({
  titre: "Formations certifiées",
  intro:
    "Vingt-trois attestations de suivi de formation délivrées en 2026 par Anthropic Academy et OpenAI Academy, au nom de Nizzar Ben Chekroune.",
  detailsLibelle: "Voir le détail des vingt-trois formations",
  verifierLibelle: "Vérifier",
  note: "Les trois certificats OpenAI se vérifient en ligne auprès de l'organisme émetteur. Les vingt certificats Anthropic sont des documents nominatifs, communiqués sur demande.",
  organismes: [
    {
      nom: "Anthropic Academy",
      nombre: 20,
      cours: [
        "Claude 101",
        "Claude Platform 101",
        "Claude Code 101",
        "Claude Code in Action",
        "Claude with the Anthropic API",
        "Claude with Amazon Bedrock",
        "Claude with Google Vertex AI",
        "Introduction to Claude Cowork",
        "Introduction to Model Context Protocol",
        "Model Context Protocol: Advanced Topics",
        "Introduction to subagents",
        "Introduction to agent skills",
        "AI Fluency: Framework & Foundations",
        "AI Fluency: AI Capabilities & Limitations",
        "AI Fluency for Builders",
        "AI Fluency for Small Businesses",
        "AI Fluency for educators",
        "AI Fluency for K-12 Educators",
        "AI Fluency for nonprofits",
        "Teaching the AI Fluency Framework",
      ],
    },
    {
      nom: "OpenAI Academy",
      nombre: 3,
      cours: [
        "AI Foundations",
        "Applied AI Foundations",
        "Agents and Workflows",
      ],
      verifications: [
        {
          titre: "AI Foundations",
          url: "https://academy.openai.com/public/certificate/jfupv0qvz0",
        },
        {
          titre: "Applied AI Foundations",
          url: "https://academy.openai.com/public/certificate/ykvhnqb8je",
        },
        {
          titre: "Agents and Workflows",
          url: "https://academy.openai.com/public/certificate/b6vaz5wi33",
        },
      ],
    },
  ],
});
