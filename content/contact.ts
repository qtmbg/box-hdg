import { fr } from "@/lib/fr";

export const CONTACT = fr({
  meta: {
    titre: "Contact · Box-HDG",
    description:
      "Le plus rapide, c'est le téléphone. Formulaire de contact, réponse sous 24 heures ouvrées.",
  },
  titre: "Parlons-en",
  chapo:
    "Le plus rapide, c'est le téléphone. Dix minutes suffisent pour savoir si on peut vous aider.",

  direct: {
    titre: "Par téléphone",
    titreEmail: "Par email",
    titreAdresse: "Adresse",
  },

  formulaire: {
    titre: "Par formulaire",
    champs: {
      entreprise: "Nom de l'entreprise",
      nom: "Votre nom",
      telephone: "Téléphone",
      email: "Email",
      siteExistant: "Vous avez déjà un site ?",
      siteExistantNon: "Non",
      siteExistantOui: "Oui, il est à refaire",
      adresseSite: "Adresse de votre site ou de votre fiche Google",
      adresseSiteAide: "Facultatif",
      message: "Votre message",
      messageAide: "Facultatif",
    },
    envoyer: "Envoyer",
    envoiEnCours: "Envoi…",
    mentionDonnees:
      "Vos informations servent uniquement à vous recontacter. Elles ne sont ni revendues ni transmises.",
    succes: "Message reçu. On vous rappelle sous 24 heures ouvrées.",
    erreurs: {
      obligatoire: "Ce champ est obligatoire.",
      email: "Cette adresse email n'est pas valide.",
      technique:
        "L'envoi a échoué. Appelez-nous, c'est plus rapide, ou réessayez dans un instant.",
    },
    resumeErreurs: "Le formulaire n'a pas été envoyé.",
  },
});
