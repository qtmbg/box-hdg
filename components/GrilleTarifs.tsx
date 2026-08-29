import Link from "next/link";
import { PRICING } from "@/content/pricing";
import { TARIFS } from "@/content/tarifs";
import { ACTIONS, MENTION_HT } from "@/content/commun";
import { SITE } from "@/content/site";
import { parMois, eurosHT } from "@/lib/format";
import { NBSP } from "@/lib/fr";
import { Prix } from "./Prix";
import { Bloc } from "./Bloc";

type Cle = "essentiel" | "complete";

/**
 * La grille de tarifs.
 *
 * Le sélecteur pilote les deux cartes en même temps, sans JavaScript : deux
 * boutons radio et `:has()`. Voir app/globals.css.
 *
 * Les montants viennent tous de content/pricing.ts. Aucun nombre n'est écrit
 * dans ce fichier.
 */
export function GrilleTarifs({ condense = false }: { condense?: boolean }) {
  return (
    <div className="tarifs">
      <Selecteur />

      <div className="mt-6 grid gap-[var(--marge)] lg:grid-cols-2">
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
        <p className="mt-6">
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
    <div>
      <fieldset className="selecteur">
        <legend className="lecteur-seul">{m.legende}</legend>
        <input type="radio" name="mode-paiement" id="mode-achat" defaultChecked aria-describedby="aide-achat" />
        <label htmlFor="mode-achat">{m.achat.libelle}</label>
        <input type="radio" name="mode-paiement" id="mode-abonnement" aria-describedby="aide-abonnement" />
        <label htmlFor="mode-abonnement">{m.abonnement.libelle}</label>
      </fieldset>

      <p id="aide-achat" data-mode="achat" className="discret mt-3.5 text-[0.9375rem]">
        {m.achat.aide}
      </p>
      <p id="aide-abonnement" data-mode="abonnement" className="discret mt-3.5 text-[0.9375rem]">
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
  const vedette = Boolean(marque);

  return (
    <article
      className={`bloc flex flex-col ${vedette ? "bloc-ardoise sur-ardoise" : ""}`}
      data-apparition
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="titre">{p.nom}</h2>
        {marque ? <span className="jeton jeton-brique">{marque}</span> : null}
      </div>

      <p className="mt-2 opacity-80">{accroche}</p>

      <div className="mt-8">
        <div data-mode="achat">
          <Prix montant={p.achat.setup} suffixe="HT" note={`${l.puis} ${parMois(p.achat.mensuel)}`} />
        </div>
        <div data-mode="abonnement">
          <Prix
            montant={p.abonnement.setup}
            suffixe={`HT ${l.aLaSignature}`}
            note={`${l.puis} ${parMois(p.abonnement.mensuel)} ${l.pendant}`}
          />
        </div>
        <p className="mt-4 text-[0.875rem] opacity-70">{MENTION_HT}</p>
      </div>

      {!condense ? (
        <div className="mt-8">
          {introInclus ? <p className="mb-2 font-medium">{introInclus}</p> : null}
          <ul className="liste-points text-[0.9375rem]">
            {inclus.map((ligne) => (
              <li key={ligne}>{ligne}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 lg:mt-auto lg:pt-8">
        <a href={SITE.telephone.lien} className="pilule pilule-pleine w-full">
          {ACTIONS.appelerPourDemarrer}
        </a>
      </div>
    </article>
  );
}

/** Le périmètre borné de l'abonnement. À conserver. */
export function PerimetreAbonnement() {
  return (
    <Bloc teinte="sable">
      <h2 className="titre mesure">{TARIFS.abonnement.titre}</h2>
      <ul className="liste-points mt-6 mesure-large">
        {TARIFS.abonnement.inclus.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className="discret mt-6 mesure-large text-[0.9375rem]">
        {TARIFS.abonnement.limite}
      </p>
    </Bloc>
  );
}

/** Options mensuelles. */
export function Options() {
  return (
    <div className="pile">
      <Bloc teinte="craie">
        <h2 className="titre">{TARIFS.options.titre}</h2>
      </Bloc>
      <ul className="trio">
        {TARIFS.options.liste.map((o, i) => {
          const montant = PRICING.options[o.cle as keyof typeof PRICING.options].mensuel;
          return (
            <li
              key={o.cle}
              className={`bloc flex flex-col ${i === 1 ? "bloc-argile" : ""}`}
              data-apparition
            >
              <h3 className="sous-titre">{o.titre}</h3>
              {o.precision ? (
                <p className="discret mt-2 text-[0.9375rem]">{o.precision}</p>
              ) : null}
              <p
                data-prix
                className="mt-auto pt-8 text-[1.75rem] leading-none"
                style={{ fontFamily: "var(--font-titre)", fontWeight: 380 }}
              >
                {eurosHT(montant)}
                <span className="text-[0.9375rem] opacity-70" style={{ fontFamily: "var(--font-texte)" }}>
                  {NBSP}/ mois
                </span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="discret px-6 text-[0.875rem]">{MENTION_HT}</p>
    </div>
  );
}

/** Dire non par écrit. Filtre les appels autant qu'il rassure. */
export function CeQuOnNeFaitPas() {
  return (
    <Bloc teinte="ocre">
      <h2 className="titre mesure">{TARIFS.refus.titre}</h2>
      <p className="mt-4 mesure-large">{TARIFS.refus.texte}</p>
    </Bloc>
  );
}
