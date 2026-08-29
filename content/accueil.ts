import { fr } from "@/lib/fr";

export const ACCUEIL = fr({
  meta: {
    titre:
      "Box-HDG, création de site internet pour entreprises. Livré en une semaine",
    description:
      "Site vitrine professionnel à partir de 890 € HT, en ligne en 5 jours ouvrés. Pour les entreprises qui n'ont pas de site ou dont le site est dépassé.",
  },

  hero: {
    sourcil: "Agence web en France",
    titre: "Votre site en ligne en une semaine.",
    chapo:
      "Vous avez déjà une activité, des clients et une fiche Google. Il vous manque un site. On le construit à partir de ce que vous avez déjà et on le met en ligne en cinq jours ouvrés.",
    prix: "À partir de 890 € HT. Le site vous appartient.",
  },

  /** §5.1. module avant / après. Aucune donnée client : entreprise d'exemple. */
  avantApres: {
    etiquette: "Exemple",
    avant: "Avant",
    apres: "Après",
    connecteur: "5 jours",
    lienGrise: "Site web",
    fiche: {
      nom: "Menuiserie Delorme",
      note: "4,8",
      avis: "62 avis",
      categorie: "Menuisier · Vitrolles",
      horaireJour: "Aujourd'hui",
      horaire: "8 h à 18 h",
      adresse: "14 rue des Cèdres, 13127 Vitrolles",
      telephone: "04 42 00 00 00",
    },
    site: {
      domaine: "menuiserie-delorme.fr",
      titre: "Menuiserie sur mesure à Vitrolles",
      accroche: "Agencement, escaliers, fermetures. Devis sous 48 h.",
      bouton: "Appeler",
      nav: ["Accueil", "Prestations", "Contact"],
      prestations: ["Agencement", "Escaliers", "Fermetures"],
      preuve: "4,8 sur 62 avis Google",
    },
  },

  /** §5.2. bandeau chiffres. Les valeurs viennent de PRICING. */
  bandeau: [
    { legende: "délai de livraison moyen" },
    { legende: "prix de départ, HT" },
    { legende: "par mois, tout compris" },
    { legende: "engagement de longue durée" },
  ],

  constat: {
    titre: "Un site de quatre pages ne devrait pas coûter 3 000 €.",
    texte:
      "En France, un site vitrine réalisé par une agence coûte en moyenne entre 1 500 et 3 500 € HT, auxquels s'ajoutent 80 à 200 € par mois. Le délai courant est de quatre à huit semaines. Pour une entreprise qui a besoin d'une adresse claire sur internet, d'un numéro de téléphone et de ses prestations, c'est trop cher et trop long.",
    chute: "On fait le même travail, plus vite, pour un quart du prix.",
  },

  situations: [
    {
      titre: "Vous n'avez pas de site",
      texte:
        "Votre entreprise tourne, vous avez des avis Google et des photos, mais rien à envoyer quand un client vous demande votre site. On part de votre fiche Google : vos avis, vos horaires, vos coordonnées, vos photos. Vous n'avez rien à rédiger. Si vous n'avez pas de photos exploitables, on en fournit.",
      href: "/offres/creation-site-internet",
    },
    {
      titre: "Votre site est dépassé",
      texte:
        "Site lent, illisible sur téléphone, impossible à modifier, plus personne pour s'en occuper. On le remplace au même prix qu'un site neuf. On récupère vos textes et vos images, on garde votre nom de domaine et on redirige vos anciennes pages pour ne pas perdre votre référencement.",
      href: "/offres/refonte-site-internet",
    },
  ],

  /** §5.6. module signature. */
  comparaison: {
    titre: "Ce que coûte un site vitrine en France",
    chapo:
      "Fourchettes constatées sur le marché français en 2026, pour un site vitrine de quatre à six pages.",
    colonnes: {
      initial: "Coût initial",
      mensuel: "Coût mensuel",
      delai: "Délai",
    },
    lignes: {
      agence: "Agence web",
      freelance: "Freelance",
      abonnement: "Solution en abonnement",
      boxhdg: "Box-HDG",
    },
    variable: "variable",
    note: "Fourchettes publiques relevées auprès d'agences et de prestataires français, 2026. Prix HT.",
    legende: {
      fourchette: "Fourchette constatée sur le marché",
      nous: "Box-HDG",
    },
  },

  ia: {
    titre: "Ce que l'intelligence artificielle change chez nous",
    intro:
      "On l'utilise là où elle fait gagner du temps à vos clients, pas comme argument de vente.",
    modules: [
      {
        titre: "Un assistant sur votre site",
        texte:
          "Il répond aux questions courantes à partir de vos informations : horaires, zone d'intervention, prestations, délais. Ce qu'il ne sait pas, il vous l'envoie par email. Il n'invente rien.",
      },
      {
        titre: "La rédaction de vos pages",
        texte:
          "On produit un premier texte pour chacune de vos prestations à partir de votre métier et de votre zone. Vous corrigez, on publie. Rien n'est mis en ligne sans votre relecture.",
      },
      {
        titre: "Les réponses à vos avis Google",
        texte:
          "À chaque nouvel avis, vous recevez un brouillon de réponse. Vous validez ou vous modifiez.",
      },
    ],
    chute:
      "Ces trois modules sont optionnels et facturés au mois. Ils ne sont pas nécessaires au fonctionnement du site.",
  },

  realisations: {
    titre: "Nos réalisations",
    lien: "Voir toutes les réalisations",
  },
});
