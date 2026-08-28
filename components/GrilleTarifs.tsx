import Link from "next/link";
import { PRICING } from "@/content/pricing";
import { TARIFS } from "@/content/tarifs";
import { ACTIONS, MENTION_HT } from "@/content/commun";
import { SITE } from "@/content/site";
import { parMois, eurosHT } from "@/lib/format";
import { NBSP } from "@/lib/fr";
import { Prix } from "./Prix";

type Cle = "essentiel" | "complete";

/**
 * §6.3 — La grille de tarifs.
 *
 * Le sélecteur de mode de paiement pilote les deux cartes à la fois, sans
 * JavaScript : deux boutons radio et `:has()`. Voir app/globals.css.
 *
 * Les montants ne viennent que de content/pricing.ts. Aucun nombre n'est
 * écrit dans ce fichier.
 */
export function GrilleTarifs({ condense = false }: { condense?: boolean }) {
  return (
    <div className="tarifs">
      <Selecteur />

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-6">
        {TARIFS.formules.map((formule) => (
          <CarteFormule
            key={formule.cle}
            cle={formule.cle as Cle}
            accroche={formule.accroche}
            introInclus={formule.introInclus}
            inclus={formule.inclus}
            marque={formule.marque}
            condense={condense}
          />
        ))}
      </div>

      {condense ? (
        <p className="mt-7">
          <Link href="/tarifs" className="lien">
            {ACTIONS.voirTousLesTarifs}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function Selecteur() {
  const m = TARIFS.modes;
  return (
    <div data-apparition>
      <fieldset className="selecteur">
        <legend className="lecteur-seul">{m.legende}</legend>
        <input
          type="radio"
          name="mode-paiement"
          id="mode-achat"
          defaultChecked
          aria-describedby="aide-achat"
        />
        <label htmlFor="mode-achat">{m.achat.libelle}</label>
        <input
          type="radio"
          name="mode-paiement"
          id="mode-abonnement"
          aria-describedby="aide-abonnement"
        />
        <label htmlFor="mode-abonnement">{m.abonnement.libelle}</label>
      </fieldset>

      <p
        id="aide-achat"
        data-mode="achat"
        className="mt-3.5 text-base text-gris"
      >
        {m.achat.aide}
      </p>
      <p
        id="aide-abonnement"
        data-mode="abonnement"
        className="mt-3.5 text-base text-gris"
      >
        {m.abonnement.aide}
      </p>
    </div>
  );
}

function CarteFormule({
  cle,
  accroche,
  introInclus,
  inclus,
  marque,
  condense,
}: {
  cle: Cle;
  accroche: string;
  introInclus: string | null;
  inclus: readonly string[];
  marque: string | null;
  condense: boolean;
}) {
  const p = PRICING[cle];
  const l = TARIFS.labels;

  return (
    <article
      className="carte flex flex-col p-6 md:p-8"
      style={
        marque
          ? { borderColor: "var(--color-ambre)", borderWidth: "2px" }
          : undefined
      }
      data-apparition
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="titre-3">{p.nom}</h2>
        {marque ? <span className="etiquette etiquette-ambre">{marque}</span> : null}
      </div>

      <p className="mt-2 text-base text-gris">{accroche}</p>

      <div className="mt-7 border-t border-filet pt-7">
        <div data-mode="achat">
          <Prix
            montant={p.achat.setup}
            suffixe="HT"
            note={`${l.puis} ${parMois(p.achat.mensuel)}`}
          />
        </div>
        <div data-mode="abonnement">
          <Prix
            montant={p.abonnement.setup}
            suffixe={`HT ${l.aLaSignature}`}
            note={`${l.puis} ${parMois(p.abonnement.mensuel)} ${l.pendant}`}
          />
        </div>
        <p className="mt-4 text-sm text-gris">{MENTION_HT}</p>
      </div>

      {!condense ? (
        <div className="mt-7 border-t border-filet pt-6">
          {introInclus ? (
            <p className="mb-2 text-base font-medium">{introInclus}</p>
          ) : null}
          <ul className="liste-coche">
            {inclus.map((ligne) => (
              <li key={ligne}>{ligne}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 pt-1 md:mt-auto">
        <a
          href={SITE.telephone.lien}
          className="bouton bouton-principal w-full"
        >
          {ACTIONS.appelerPourDemarrer}
        </a>
      </div>
    </article>
  );
}

/** §6.4 — Le périmètre borné de l'abonnement. Ne pas retirer. */
export function PerimetreAbonnement() {
  return (
    <div className="encadre mt-10 md:mt-12" data-apparition>
      <h3 className="titre-3">{TARIFS.abonnement.titre}</h3>
      <ul className="liste-coche mt-4 max-w-[46rem]">
        {TARIFS.abonnement.inclus.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className="mt-5 max-w-[46rem] border-t border-filet pt-5 text-base text-gris">
        {TARIFS.abonnement.limite}
      </p>
    </div>
  );
}

/** §6.5 — Options mensuelles. */
export function Options() {
  return (
    <div>
      <h2 className="titre-2" data-apparition>
        {TARIFS.options.titre}
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
        {TARIFS.options.liste.map((o) => {
          const montant =
            PRICING.options[o.cle as keyof typeof PRICING.options].mensuel;
          return (
            <li key={o.cle} className="carte flex flex-col p-5" data-apparition>
              <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.012em]">
                {o.titre}
              </h3>
              {o.precision ? (
                <p className="mt-1.5 text-base text-gris">{o.precision}</p>
              ) : null}
              <p
                data-prix
                className="mt-auto pt-5 text-[1.375rem] font-semibold leading-none"
              >
                {eurosHT(montant)}
                <span className="text-base font-medium text-gris">
                  {NBSP}/ mois
                </span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-sm text-gris">{MENTION_HT}</p>
    </div>
  );
}

/** §6.6 — Dire non par écrit. Filtre les appels autant qu'il rassure. */
export function CeQuOnNeFaitPas() {
  return (
    <div className="encadre" data-apparition>
      <h3 className="titre-3">{TARIFS.refus.titre}</h3>
      <p className="mt-3 max-w-[46rem] text-base text-gris">
        {TARIFS.refus.texte}
      </p>
    </div>
  );
}
