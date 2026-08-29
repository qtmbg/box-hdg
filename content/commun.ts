import { fr } from "@/lib/fr";

/** §5.5. Le module de processus, réutilisé sur l'accueil et les deux offres. */
export const PROCESSUS = fr({
  titre: "Comment ça se passe",
  etapes: [
    {
      titre: "Un appel de dix minutes",
      texte:
        "Votre activité, vos prestations, votre zone. Pas de questionnaire de quarante questions, pas de réunion de cadrage.",
    },
    {
      titre: "On construit",
      texte:
        "Quarante-huit heures. On utilise vos informations existantes. Vous n'avez rien à préparer.",
    },
    {
      titre: "Vous validez",
      texte:
        "Vous recevez un lien vers le site terminé. Vous demandez vos corrections, on les fait dans la journée.",
    },
    {
      titre: "Mise en ligne",
      texte:
        "Nom de domaine, hébergement, mentions légales, formulaire de contact, fiche Google reliée. Tout est en place le jour de la livraison.",
    },
  ],
  // Deux champs plutôt qu'une phrase découpée à l'exécution : la chaîne rendue
  // reste identique au mot près, et la mise en gras ne dépend plus d'un split
  // sur « : », que la typographie française transforme justement en espace
  // insécable.
  engagementLabel: "Engagement de délai",
  engagementTexte:
    "livré sous cinq jours ouvrés à compter de la validation du contenu. Au-delà, le premier mois d'abonnement n'est pas facturé.",
});

/** §5.9. Le bloc d'appel final, réutilisé sur quatre pages. */
export const APPEL_FINAL = fr({
  titre:
    "Un appel de dix minutes suffit pour savoir si on peut travailler ensemble.",
  lienEcrire: "Nous écrire",
});

export const ACTIONS = fr({
  appeler: "Appeler",
  voirLesTarifs: "Voir les tarifs",
  voirTousLesTarifs: "Voir tous les tarifs",
  voirLeDetail: "Voir le détail",
  appelerPourDemarrer: "Appeler pour démarrer",
  menu: "Menu",
  fermer: "Fermer",
});

export const MENTION_HT = "Prix en euros hors taxes.";

/**
 * Textes d'interface.
 *
 * §2. « Tout le contenu vit dans des objets typés sous /content ». Les
 * libellés de chrome comptent : ce sont eux qui traversent la typographie
 * française et qui se traduisent le jour où il faudra les traduire.
 */
export const UI = fr({
  allerAuContenu: "Aller au contenu",
  accueil: "Accueil",
  filDAriane: "Fil d'Ariane",
  contact: "Contact",
  tarifs: "Tarifs",
  logoAria: "Box-HDG, accueil",
  navigationPrincipale: "Navigation principale",
  echelle: "Échelle",
  chiffresCles: "Chiffres clés",
  exempleLegende:
    "Exemple : une fiche Google existante et le site construit à partir de ses informations.",
  telephoneLabel: "Téléphone",
  emailLabel: "Email",
  nousContacter: "Nous contacter",
  droitsReserves: "Tous droits réservés.",
});

export const PIED = fr({
  colonnes: {
    offres: {
      titre: "Offres",
      liens: [
        { libelle: "Création de site", href: "/offres/creation-site-internet" },
        { libelle: "Refonte de site", href: "/offres/refonte-site-internet" },
        { libelle: "Tarifs", href: "/tarifs" },
      ],
    },
    agence: {
      titre: "L'agence",
      liens: [
        { libelle: "Réalisations", href: "/realisations", drapeau: true },
        { libelle: "L'équipe", href: "/equipe" },
        { libelle: "Contact", href: "/contact" },
      ],
    },
    contact: { titre: "Contact" },
  },
  legal: [
    { libelle: "Mentions légales", href: "/mentions-legales" },
    { libelle: "Politique de confidentialité", href: "/confidentialite" },
    { libelle: "CGV", href: "/cgv" },
  ],
});

export const PAGE_404 = fr({
  sourcil: "Erreur 404",
  titre: "Cette page n'existe pas.",
  texte:
    "Elle a peut-être changé d'adresse. Les tarifs sont ici, et le téléphone reste le plus rapide.",
});
