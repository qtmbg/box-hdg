import { fr } from "@/lib/fr";

/**
 * ⚠️ BLOQUANT, §12.
 *
 * Les mentions légales sont obligatoires en France (art. 6-III de la LCEN du
 * 21 juin 2004 et art. R123-237 du code de commerce). Elles ne peuvent pas
 * être rédigées sans les informations ci-dessous.
 *
 * Tant que LEGAL_COMPLET est à false :
 *  , /mentions-legales est en noindex,
 *  , un avertissement de rédaction, impossible à manquer, coiffe la page.
 * Le site ne doit pas être ouvert au public dans cet état.
 */
export const LEGAL_COMPLET = false;

export const IDENTITE = {
  raisonSociale: "À COMPLÉTER",
  formeJuridique: "À COMPLÉTER",
  capital: "À COMPLÉTER",
  siren: "À COMPLÉTER",
  siret: "À COMPLÉTER",
  rcsVille: "À COMPLÉTER",
  tvaIntracommunautaire: "À COMPLÉTER",
  siege: "À COMPLÉTER",
  directeurPublication: "À COMPLÉTER",
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    site: "vercel.com",
  },
} as const;

export const MENTIONS = fr({
  meta: { titre: "Mentions légales · Box-HDG" },
  titre: "Mentions légales",
  avertissement:
    "Page non publiable en l'état. L'identité légale de l'éditeur reste à compléter dans content/legal.ts avant toute ouverture du site au public.",
  sections: [
    {
      titre: "Éditeur du site",
      lignes: [
        ["Raison sociale", "raisonSociale"],
        ["Forme juridique", "formeJuridique"],
        ["Capital social", "capital"],
        ["Siège social", "siege"],
        ["SIREN", "siren"],
        ["SIRET", "siret"],
        ["Immatriculation", "rcsVille"],
        ["TVA intracommunautaire", "tvaIntracommunautaire"],
        ["Directeur de la publication", "directeurPublication"],
      ] as [string, keyof typeof IDENTITE][],
    },
  ],
  contactTitre: "Contact",
  hebergementTitre: "Hébergement",
  proprieteTitre: "Propriété intellectuelle",
  proprieteTexte:
    "L'ensemble des contenus de ce site, textes, structure, mise en page, identité visuelle, est la propriété de l'éditeur, à l'exception des marques et logos de tiers qui restent la propriété de leurs détenteurs respectifs. Toute reproduction sans autorisation écrite est interdite.",
  donneesTitre: "Données personnelles",
  donneesTexte:
    "Le traitement des données transmises par le formulaire de contact est décrit dans la politique de confidentialité.",
});

export const CONFIDENTIALITE = fr({
  meta: {
    titre: "Politique de confidentialité · Box-HDG",
    description:
      "Données collectées par le formulaire de contact, finalité, durée de conservation et exercice de vos droits.",
  },
  titre: "Politique de confidentialité",
  chapo:
    "Ce site ne collecte aucune donnée en dehors du formulaire de contact. Il ne dépose aucun cookie publicitaire et n'utilise aucun traceur nécessitant votre consentement.",
  sections: [
    {
      titre: "Responsable du traitement",
      paragraphes: [
        "Le responsable du traitement est l'éditeur du site, identifié sur la page des mentions légales.",
      ],
      liste: [],
    },
    {
      titre: "Données collectées",
      paragraphes: [
        "Seul le formulaire de contact collecte des données, et uniquement celles que vous saisissez :",
      ],
      liste: [
        "le nom de votre entreprise,",
        "votre nom,",
        "votre numéro de téléphone,",
        "votre adresse email,",
        "l'adresse de votre site ou de votre fiche Google, si vous la renseignez,",
        "votre message, si vous en rédigez un.",
      ],
    },
    {
      titre: "Finalité",
      paragraphes: [
        "Ces informations servent exclusivement à répondre à votre demande et à vous recontacter. Elles ne sont utilisées pour aucune autre finalité, ne font l'objet d'aucun profilage et d'aucune décision automatisée.",
      ],
      liste: [],
    },
    {
      titre: "Base légale",
      paragraphes: [
        "Le traitement repose sur votre démarche volontaire de prise de contact, qui relève de l'intérêt légitime du responsable du traitement à répondre aux sollicitations commerciales qui lui sont adressées (art. 6.1.f du RGPD).",
      ],
      liste: [],
    },
    {
      titre: "Destinataires",
      paragraphes: [
        "Vos données ne sont ni vendues, ni louées, ni transmises à des tiers à des fins commerciales. Elles sont accessibles aux seules personnes de l'agence chargées de traiter votre demande, et sont acheminées par notre prestataire d'envoi d'emails transactionnels, qui agit comme sous-traitant et ne les exploite pas pour son compte.",
      ],
      liste: [],
    },
    {
      titre: "Durée de conservation",
      paragraphes: [
        "Les demandes reçues par le formulaire sont conservées douze mois à compter du dernier échange, puis supprimées. Si un contrat est conclu, les données nécessaires à son exécution sont conservées selon les durées légales applicables aux documents commerciaux et comptables.",
      ],
      liste: [],
    },
    {
      titre: "Mesure d'audience",
      paragraphes: [
        "La fréquentation du site est mesurée sans cookie et sans identifiant persistant. Aucune donnée permettant de vous identifier n'est transmise à cet outil, ce qui dispense le site de bandeau de consentement. Si un outil déposant des cookies était ajouté par la suite, un bandeau de consentement deviendrait obligatoire et serait mis en place.",
      ],
      liste: [],
    },
    {
      titre: "Vos droits",
      paragraphes: [
        "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur les données vous concernant, ainsi que d'un droit à la portabilité. Pour les exercer, écrivez-nous à l'adresse email indiquée ci-dessous : la réponse est apportée dans un délai d'un mois.",
        "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.",
      ],
      liste: [],
    },
  ],
});

export const CGV = fr({
  meta: {
    titre: "Conditions générales de vente · Box-HDG",
    description:
      "Périmètre des formules, échéancier de paiement, engagement de délai, propriété du site et remise des fichiers.",
  },
  titre: "Conditions générales de vente",
  avertissement:
    "Document à faire relire une fois par un avocat avant la première vente. C'est lui qui porte l'engagement de délai et le transfert de propriété du site.",
  preambule:
    "Les présentes conditions régissent les prestations de création, de refonte et de maintenance de sites internet fournies par l'agence, ci-après « le Prestataire », à toute personne physique ou morale agissant à des fins professionnelles, ci-après « le Client ». Toute commande implique leur acceptation sans réserve.",
  articles: [
    {
      titre: "1. Objet et périmètre",
      paragraphes: [
        "Le Prestataire réalise un site internet vitrine selon l'une des deux formules décrites sur la page Tarifs, dont le contenu détaillé fait partie intégrante du contrat. La formule Essentiel comprend un site de quatre pages. La formule Complète y ajoute trois à cinq pages de prestations, une page par prestation et par ville de la zone d'intervention, la configuration de la fiche Google Business, un formulaire de demande de devis et le suivi des demandes reçues.",
        "Sont expressément exclues du périmètre : la boutique en ligne, la place de marché, l'application mobile et la plateforme de réservation complexe. Toute prestation hors périmètre fait l'objet d'un devis distinct, accepté par écrit avant exécution.",
      ],
    },
    {
      titre: "2. Prix",
      paragraphes: [
        "Les prix sont ceux affichés sur la page Tarifs au jour de la commande. Ils sont exprimés en euros hors taxes ; la taxe sur la valeur ajoutée au taux en vigueur s'y ajoute. Aucun frais ne s'ajoute au prix convenu : tout élément sortant du périmètre est chiffré et validé par écrit avant d'être réalisé.",
      ],
    },
    {
      titre: "3. Modalités de paiement",
      paragraphes: [
        "En mode Achat, le prix de création est réglé à la commande et l'abonnement technique mensuel court à compter de la mise en ligne.",
        "En mode Abonnement, un montant est réglé à la signature et l'abonnement mensuel est dû pendant vingt-quatre mois à compter de la mise en ligne. À l'issue de cette période, l'abonnement se poursuit sans engagement de durée et peut être résilié à tout moment avec un préavis d'un mois.",
        "Les factures sont payables à réception. Conformément à l'article L441-10 du code de commerce, tout retard de paiement entraîne de plein droit des intérêts au taux directeur de la Banque centrale européenne majoré de dix points, ainsi qu'une indemnité forfaitaire de quarante euros pour frais de recouvrement.",
      ],
    },
    {
      titre: "4. Obligations du Client",
      paragraphes: [
        "Le Client fournit le nom exact de son entreprise, la liste de ses prestations et sa zone d'intervention, et valide le contenu qui lui est soumis. Il garantit détenir les droits sur les textes, images et marques qu'il transmet et garantit le Prestataire contre toute réclamation de tiers à ce titre.",
      ],
    },
    {
      titre: "5. Délai de livraison et compensation",
      paragraphes: [
        "Le site est livré sous cinq jours ouvrés à compter de la validation du contenu par le Client. Ce délai est suspendu pendant toute période d'attente d'un élément ou d'une validation incombant au Client.",
        "Si le délai est dépassé du fait du Prestataire, le premier mois d'abonnement n'est pas facturé. Cette compensation est acquise de plein droit, sans réclamation à formuler.",
      ],
    },
    {
      titre: "6. Périmètre de la maintenance mensuelle",
      paragraphes: [
        "L'abonnement mensuel couvre l'hébergement, le nom de domaine, le certificat de sécurité, les sauvegardes, les mises à jour techniques, les modifications de contenu illimitées, textes, horaires, photos, coordonnées, tarifs, et l'assistance par téléphone et par email avec une réponse sous vingt-quatre heures ouvrées.",
        "Ne sont pas comprises : la création de nouvelles pages, la refonte du design et l'ajout de fonctionnalités. Ces demandes sont chiffrées à part.",
      ],
    },
    {
      titre: "7. Propriété du site et des noms de domaine",
      paragraphes: [
        "Le nom de domaine est déposé au nom du Client, qui en est le titulaire dès l'origine.",
        "En mode Achat, la propriété du site est transférée au Client au paiement intégral du prix de création. En mode Abonnement, elle lui est transférée au terme des vingt-quatre mois d'engagement, sous réserve du paiement de l'intégralité des échéances.",
      ],
    },
    {
      titre: "8. Résiliation et remise des fichiers",
      paragraphes: [
        "En cas de résiliation de l'abonnement, le Prestataire remet au Client l'intégralité des fichiers du site et l'accompagne dans son transfert vers l'hébergeur de son choix. Aucun contenu n'est retenu.",
      ],
    },
    {
      titre: "9. Référencement",
      paragraphes: [
        "Le Prestataire construit le site de manière à ce qu'il soit correctement indexé par les moteurs de recherche et optimise les pages de prestations. Aucune position dans les résultats de recherche n'est garantie, ces résultats dépendant d'algorithmes tiers sur lesquels le Prestataire n'a aucun pouvoir.",
      ],
    },
    {
      titre: "10. Droit de rétractation",
      paragraphes: [
        "Lorsque le Client emploie cinq salariés ou moins et que la prestation commandée n'entre pas dans le champ de son activité principale, il bénéficie du droit de rétractation de quatorze jours prévu à l'article L221-3 du code de la consommation. Ce délai court à compter de la conclusion du contrat.",
        "Si le Client demande expressément l'exécution de la prestation avant l'expiration de ce délai, il reste tenu du paiement du travail déjà réalisé en cas de rétractation.",
      ],
    },
    {
      titre: "11. Responsabilité",
      paragraphes: [
        "Le Prestataire est tenu d'une obligation de moyens. Sa responsabilité est limitée aux dommages directs et ne peut excéder le montant total des sommes réglées par le Client au titre du contrat. Les interruptions imputables à l'hébergeur, au registrar ou au réseau ne peuvent lui être imputées.",
      ],
    },
    {
      titre: "12. Médiation et droit applicable",
      paragraphes: [
        "Lorsque le Client relève de l'article L221-3 du code de la consommation, il peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu à l'amiable ; les coordonnées du médiateur retenu par le Prestataire figurent sur la facture.",
        "Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, le litige relève de la compétence des tribunaux du ressort du siège du Prestataire.",
      ],
    },
  ],
});
