"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { CONTACT } from "@/content/contact";
import { envoyerDemande } from "@/app/contact/actions";
import { ETAT_INITIAL, type Champ } from "@/app/contact/etat";

const F = CONTACT.formulaire;

/**
 * §11. Formulaire de contact.
 *
 * Action serveur : le formulaire fonctionne sans JavaScript, la couche client
 * n'ajoute que l'état d'envoi et le déplacement du focus sur le résultat.
 * Les messages d'erreur disent quoi corriger et ne s'excusent pas.
 */
export function FormulaireContact() {
  const [etat, action, enCours] = useActionState(envoyerDemande, ETAT_INITIAL);
  const resultat = useRef<HTMLDivElement>(null);
  const idPiege = useId();

  useEffect(() => {
    if (etat.statut !== "initial") resultat.current?.focus();
  }, [etat]);

  if (etat.statut === "succes") {
    return (
      <div
        ref={resultat}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--rayon-petit)] bg-ocre px-6 py-8"
      >
        <p className="chapo">{F.succes}</p>
      </div>
    );
  }

  const erreurs = etat.erreurs;
  const valeurs = etat.valeurs;

  return (
    <form action={action} noValidate className="grid gap-6">
      <div
        ref={resultat}
        tabIndex={-1}
        aria-live="polite"
        className={erreurs.global ? "" : "sr-only"}
      >
        {erreurs.global ? (
          <p
            className="rounded-[var(--rayon-petit)] bg-ocre px-5 py-4"
            role="alert"
          >
            {erreurs.global}
          </p>
        ) : null}
      </div>

      <Champ_
        nom="entreprise"
        libelle={F.champs.entreprise}
        obligatoire
        autoComplete="organization"
        erreur={erreurs.entreprise}
        defaut={valeurs.entreprise}
      />
      <Champ_
        nom="nom"
        libelle={F.champs.nom}
        obligatoire
        autoComplete="name"
        erreur={erreurs.nom}
        defaut={valeurs.nom}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Champ_
          nom="telephone"
          libelle={F.champs.telephone}
          type="tel"
          inputMode="tel"
          obligatoire
          autoComplete="tel"
          erreur={erreurs.telephone}
          defaut={valeurs.telephone}
        />
        <Champ_
          nom="email"
          libelle={F.champs.email}
          type="email"
          inputMode="email"
          obligatoire
          autoComplete="email"
          erreur={erreurs.email}
          defaut={valeurs.email}
        />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-2.5 font-medium">
          {F.champs.siteExistant}
        </legend>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-6">
          <Radio
            valeur="non"
            libelle={F.champs.siteExistantNon}
            defaut={valeurs.siteExistant}
          />
          <Radio
            valeur="a-refaire"
            libelle={F.champs.siteExistantOui}
            defaut={valeurs.siteExistant}
          />
        </div>
      </fieldset>

      <Champ_
        nom="adresseSite"
        libelle={F.champs.adresseSite}
        type="url"
        inputMode="url"
        aide={F.champs.adresseSiteAide}
        placeholder="https://"
        defaut={valeurs.adresseSite}
      />

      <Champ_
        nom="message"
        libelle={F.champs.message}
        aide={F.champs.messageAide}
        zone
        defaut={valeurs.message}
      />

      {/* Piège à robots. Hors flux, hors tabulation, hors lecteur d'écran. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={idPiege}>Ne pas remplir</label>
        <input
          id={idPiege}
          type="text"
          name="societe_web"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <button
          type="submit"
          className="pilule pilule-pleine w-full sm:w-auto sm:min-w-[12rem]"
          disabled={enCours}
        >
          {enCours ? F.envoiEnCours : F.envoyer}
        </button>
        <p className="discret mt-4 max-w-[30rem] text-[0.8125rem] leading-relaxed">
          {F.mentionDonnees}
        </p>
      </div>
    </form>
  );
}

function Champ_({
  nom,
  libelle,
  type = "text",
  inputMode,
  obligatoire = false,
  zone = false,
  aide,
  erreur,
  defaut,
  autoComplete,
  placeholder,
}: {
  nom: Champ;
  libelle: string;
  type?: string;
  inputMode?: "tel" | "email" | "url";
  obligatoire?: boolean;
  zone?: boolean;
  aide?: string;
  erreur?: string;
  defaut?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const idErreur = `${nom}-erreur`;
  const idAide = `${nom}-aide`;
  const decrit = [erreur ? idErreur : null, aide ? idAide : null]
    .filter(Boolean)
    .join(" ");

  const classe = [
    "w-full rounded-[var(--rayon-petit)] bg-craie px-4 py-3",
    "min-h-[2.875rem] placeholder:text-ardoise/35 outline-offset-2",
    erreur ? "ring-2 ring-brique" : "ring-1 ring-ardoise/12",
  ].join(" ");

  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2">
        <label htmlFor={nom} className="font-medium">
          {libelle}
        </label>
        {aide ? (
          <span id={idAide} className="discret text-[0.875rem]">
            {aide}
          </span>
        ) : null}
      </div>

      {zone ? (
        <textarea
          id={nom}
          name={nom}
          rows={5}
          defaultValue={defaut}
          aria-describedby={decrit || undefined}
          className={classe}
        />
      ) : (
        <input
          id={nom}
          name={nom}
          type={type}
          inputMode={inputMode}
          required={obligatoire}
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={defaut}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={decrit || undefined}
          className={classe}
        />
      )}

      {erreur ? (
        <p id={idErreur} className="mt-2 font-medium text-brique">
          {erreur}
        </p>
      ) : null}
    </div>
  );
}

function Radio({
  valeur,
  libelle,
  defaut,
}: {
  valeur: string;
  libelle: string;
  defaut?: string;
}) {
  const id = `site-${valeur}`;
  return (
    <span className="flex min-h-11 items-center gap-2.5">
      <input
        id={id}
        type="radio"
        name="siteExistant"
        value={valeur}
        defaultChecked={defaut === valeur}
        className="h-[18px] w-[18px] shrink-0 accent-[var(--color-brique)]"
      />
      <label htmlFor={id} className="min-h-[2.75rem] content-center">
        {libelle}
      </label>
    </span>
  );
}
