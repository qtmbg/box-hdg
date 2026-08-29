"use server";

import { Resend } from "resend";
import { CONTACT } from "@/content/contact";
import { SITE } from "@/content/site";
import type { Champ, EtatFormulaire } from "./etat";

const E = CONTACT.formulaire.erreurs;

/**
 * Validation d'email volontairement permissive : sur un formulaire de rappel,
 * refuser une adresse valide coûte plus cher qu'accepter une adresse douteuse.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const OBLIGATOIRES: Champ[] = ["entreprise", "nom", "telephone", "email"];

export async function envoyerDemande(
  _precedent: EtatFormulaire,
  donnees: FormData,
): Promise<EtatFormulaire> {
  const lire = (cle: string) =>
    (donnees.get(cle) as string | null)?.trim() ?? "";

  const valeurs: Partial<Record<Champ, string>> = {
    entreprise: lire("entreprise"),
    nom: lire("nom"),
    telephone: lire("telephone"),
    email: lire("email"),
    siteExistant: lire("siteExistant"),
    adresseSite: lire("adresseSite"),
    message: lire("message"),
  };

  // Piège à robots : champ invisible. Rempli = on répond « reçu » et on jette.
  if (lire("societe_web")) {
    return { statut: "succes", erreurs: {}, valeurs: {} };
  }

  const erreurs: Partial<Record<Champ | "global", string>> = {};
  for (const champ of OBLIGATOIRES) {
    if (!valeurs[champ]) erreurs[champ] = E.obligatoire;
  }
  if (valeurs.email && !EMAIL.test(valeurs.email)) {
    erreurs.email = E.email;
  }

  if (Object.keys(erreurs).length) {
    return { statut: "erreur", erreurs, valeurs };
  }

  try {
    await transmettre(valeurs);
  } catch (erreur) {
    console.error("[contact] envoi impossible", erreur);
    return { statut: "erreur", erreurs: { global: E.technique }, valeurs };
  }

  return { statut: "succes", erreurs: {}, valeurs: {} };
}

async function transmettre(valeurs: Partial<Record<Champ, string>>) {
  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_TO_EMAIL || SITE.email;
  const expediteur = process.env.CONTACT_FROM_EMAIL;

  const corps = [
    `Entreprise : ${valeurs.entreprise}`,
    `Nom : ${valeurs.nom}`,
    `Téléphone : ${valeurs.telephone}`,
    `Email : ${valeurs.email}`,
    `Site existant : ${valeurs.siteExistant || "non précisé"}`,
    `Adresse indiquée : ${valeurs.adresseSite || "non renseignée"}`,
    "",
    "Message :",
    valeurs.message || "aucun message",
  ].join("\n");

  if (!cle || !expediteur) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "RESEND_API_KEY ou CONTACT_FROM_EMAIL absent : le formulaire ne peut pas envoyer.",
      );
    }
    console.info(`[contact] hors production, message non envoyé :\n${corps}`);
    return;
  }

  const resend = new Resend(cle);
  const { error } = await resend.emails.send({
    from: expediteur,
    to: destinataire,
    replyTo: valeurs.email,
    subject: `Demande de site : ${valeurs.entreprise}`,
    text: corps,
  });

  if (error) throw new Error(error.message);
}
