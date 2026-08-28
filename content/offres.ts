import { fr } from "@/lib/fr";

export const CREATION = fr({
  slug: "creation-site-internet",
  fil: "Création de site internet",
  meta: {
    titre: "Création de site internet pour entreprise — Box-HDG",
    description:
      "Vous avez une activité et une fiche Google mais pas de site. On le construit à partir de vos informations existantes, en ligne en cinq jours, à partir de 890 € HT.",
  },
  titre: "Vous avez une entreprise. Il vous manque un site.",
  chapo:
    "On part de ce que vous avez déjà : votre fiche Google, vos avis, vos photos, vos coordonnées. Vous n'avez rien à préparer et rien à rédiger.",

  besoins: {
    titre: "Ce dont on a besoin de votre part",
    items: [
      "Le nom exact de votre entreprise",
      "La liste de vos prestations",
      "Votre zone d'intervention",
    ],
    chute: "C'est tout. Le reste, on le récupère.",
  },

  recuperation: {
    titre: "Ce qu'on récupère sur votre fiche Google",
    texte:
      "Vos avis clients, vos photos, vos horaires, votre adresse, votre numéro. Ces informations sont publiques et vous appartiennent. On les remet en forme sur un site que vous contrôlez.",
  },

  photos: {
    titre: "Et si je n'ai pas de photos ?",
    texte:
      "On fournit des photos professionnelles adaptées à votre métier, ou on retravaille celles que vous avez, y compris celles prises au téléphone.",
  },
});

export const REFONTE = fr({
  slug: "refonte-site-internet",
  fil: "Refonte de site internet",
  meta: {
    titre: "Refonte de site internet — Box-HDG",
    description:
      "Votre site est lent, illisible sur téléphone ou impossible à modifier. On le remplace au prix d'un site neuf, en cinq jours, sans perdre votre référencement.",
  },
  titre: "Votre site date. On le remplace.",
  chapo:
    "Même prix qu'un site neuf. On garde votre nom de domaine, vos textes et votre référencement.",

  cas: {
    titre: "Les cas qu'on voit le plus souvent",
    items: [
      "Le site s'affiche mal sur téléphone.",
      "Il met plus de cinq secondes à charger.",
      "Les informations ne sont plus à jour et personne ne sait les modifier.",
      "La personne qui l'a fait n'est plus joignable.",
    ],
  },

  preservation: {
    titre: "Ce qu'on préserve",
    texte:
      "Votre nom de domaine, vos adresses de pages existantes par redirection, vos textes si vous voulez les garder, vos images. Vous ne repartez pas de zéro et vous ne perdez pas votre position sur Google.",
  },

  acces: {
    titre: "Vous n'avez plus accès à votre site ?",
    texte:
      "C'est fréquent. On identifie votre hébergeur et votre registrar et on fait les démarches de récupération à votre place. Si la récupération est impossible, on reconstruit et on transfère le nom de domaine.",
  },
});

/**
 * Page d'index des offres.
 *
 * La §4.1 place « Offres → /offres » dans la navigation sans décrire la page.
 * Un lien de navigation sans destination est un défaut : la page existe donc,
 * et se contente d'orienter vers les deux offres réelles.
 */
export const INDEX_OFFRES = fr({
  meta: {
    titre: "Offres — Box-HDG",
    description:
      "Deux situations, une méthode : création d'un premier site ou remplacement d'un site dépassé. Livré en cinq jours ouvrés.",
  },
  titre: "Deux situations, une méthode.",
  chapo:
    "Vous n'avez pas encore de site, ou celui que vous avez ne travaille plus pour vous. Le prix et le délai sont les mêmes dans les deux cas.",
});
