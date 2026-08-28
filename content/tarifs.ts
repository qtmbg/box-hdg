import { fr } from "@/lib/fr";

export const TARIFS = fr({
  meta: {
    titre: "Tarifs — Box-HDG",
    description:
      "Deux formules, deux modes de paiement, aucun coût caché. Site vitrine à partir de 890 € HT ou 69 € HT par mois.",
  },

  titre: "Tarifs",
  chapo:
    "Deux formules. Deux façons de payer. Tous les prix sont sur cette page, il n'y a rien d'autre.",

  /** §6.2 — sélecteur de mode de paiement. */
  modes: {
    legende: "Mode de paiement",
    achat: {
      libelle: "Achat",
      aide: "Vous payez le site une fois. Il vous appartient.",
    },
    abonnement: {
      libelle: "Abonnement",
      aide: "Vous étalez le coût. Engagement de 24 mois, puis sans engagement.",
    },
  },

  /** §6.3 — grille. Les montants viennent exclusivement de PRICING. */
  formules: [
    {
      cle: "essentiel",
      accroche: "Pour exister proprement sur internet.",
      inclus: [
        "Site sur mesure, quatre pages : accueil, présentation, contact, mentions légales",
        "Logo créé ou retravaillé",
        "Vos avis Google affichés sur le site",
        "Formulaire de contact et bouton d'appel direct",
        "Nom de domaine et hébergement inclus",
        "Lisible et rapide sur téléphone",
        "Conformité RGPD et mentions légales rédigées",
      ],
      introInclus: null,
      marque: null,
    },
    {
      cle: "complete",
      accroche: "Pour être trouvé sur chacune de vos prestations.",
      introInclus: "Tout ce qui est inclus dans la formule Essentiel, plus :",
      inclus: [
        "Trois à cinq pages dédiées à vos prestations",
        "Une page optimisée par prestation et par ville de votre zone",
        "Fiche Google Business configurée et reliée au site",
        "Formulaire de demande de devis",
        "Suivi des appels et des demandes reçues depuis le site",
      ],
      marque: "Le plus demandé",
    },
  ],

  labels: {
    aLaSignature: "à la signature",
    puis: "puis",
    pendant: "pendant 24 mois",
    parMois: "/ mois",
  },

  /** §6.4 — périmètre borné. Ne pas retirer. */
  abonnement: {
    titre: "Ce que couvre l'abonnement mensuel",
    inclus: [
      "Hébergement, nom de domaine, certificat de sécurité",
      "Sauvegardes et mises à jour techniques",
      "Modifications de contenu illimitées : textes, horaires, photos, coordonnées, tarifs",
      "Assistance par téléphone et par email, réponse sous 24 heures ouvrées",
    ],
    limite:
      "Ne sont pas comprises : la création de nouvelles pages, la refonte du design et l'ajout de fonctionnalités. Ces demandes sont chiffrées à part.",
  },

  /** §6.5 — options. Montants dans PRICING.options. */
  options: {
    titre: "Options",
    liste: [
      { cle: "assistant", titre: "Assistant sur le site", precision: null },
      {
        cle: "contenu",
        titre: "Une nouvelle page ou un article par mois",
        precision: null,
      },
      {
        cle: "ficheGoogle",
        titre: "Gestion de votre fiche Google",
        precision: "photos, publications, réponses aux avis",
      },
    ],
  },

  /** §6.6 — dire non par écrit. Filtre les appels et installe la confiance. */
  refus: {
    titre: "Ce qu'on ne fait pas",
    texte:
      "Boutique en ligne, place de marché, application mobile, plateforme de réservation complexe. Si c'est votre besoin, on vous le dit au téléphone et on ne vous fait pas perdre de temps.",
  },

  faq: {
    titre: "Questions fréquentes",
    items: [
      {
        question: "À qui appartient le site ?",
        reponse:
          "À vous, dans les deux formules. Le nom de domaine est déposé à votre nom. En formule abonnement, la propriété du site vous est transférée à la fin des 24 mois.",
      },
      {
        question: "Que se passe-t-il si j'arrête l'abonnement ?",
        reponse:
          "On vous remet l'intégralité des fichiers et on vous accompagne pour transférer le site chez l'hébergeur de votre choix. Vous ne perdez rien.",
      },
      {
        question: "Est-ce que je peux modifier le site moi-même ?",
        reponse:
          "Vous pouvez, mais ce n'est pas prévu pour. Vous nous envoyez la modification par email ou par message, on la fait dans la journée. C'est compris dans l'abonnement.",
      },
      {
        question: "Cinq jours, c'est réaliste ?",
        reponse:
          "Oui, à condition que vous validiez le contenu rapidement. Le délai court à partir du moment où on a vos informations. Si on dépasse, le premier mois d'abonnement n'est pas facturé.",
      },
      {
        question: "Vous faites du référencement Google ?",
        reponse:
          "On construit le site pour qu'il soit correctement indexé et on optimise vos pages prestations. On ne vend pas de prestation de référencement mensuelle avec des promesses de position.",
      },
      {
        question: "Je garde mon nom de domaine actuel ?",
        reponse:
          "Oui. On le récupère et on redirige vos anciennes adresses pour ne pas perdre votre référencement.",
      },
      {
        question: "Y a-t-il des frais cachés ?",
        reponse:
          "Non. Les prix de cette page sont les prix. Tout ce qui sort du cadre est chiffré et validé par écrit avant d'être fait.",
      },
    ],
  },
});
