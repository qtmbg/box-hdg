import type { Metadata } from "next";
import Link from "next/link";
import { ACCUEIL } from "@/content/accueil";
import { ACTIONS, UI } from "@/content/commun";
import { REALISATIONS_ENABLED } from "@/content/site";
import { REALISATIONS } from "@/content/realisations";
import { DELAI_JOURS_OUVRES, MENSUEL_PLANCHER, PRIX_PLANCHER } from "@/content/pricing";
import { euros } from "@/lib/format";
import { NBSP } from "@/lib/fr";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { BoutonLien } from "@/components/Bouton";
import { AvantApres } from "@/components/AvantApres";
import { Comparaison } from "@/components/Comparaison";
import { Processus } from "@/components/Processus";
import { AppelFinal } from "@/components/AppelFinal";
import { CarteRealisation } from "@/components/CarteRealisation";

export const metadata: Metadata = {
  title: ACCUEIL.meta.titre,
  description: ACCUEIL.meta.description,
  alternates: { canonical: "/" },
};

export default function Accueil() {
  const h = ACCUEIL.hero;

  return (
    <Page titre={h.titre} chapo={h.sourcil}>
      <Bloc apparition={false}>
        <p className="chapo mesure-large">{h.chapo}</p>
        <p className="sous-titre mt-7 text-brique">{h.prix}</p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BoutonLien href="/tarifs">{ACTIONS.voirLesTarifs}</BoutonLien>
          <BoutonLien href="/offres" style="trait">
            {ACTIONS.voirLeDetail}
          </BoutonLien>
        </div>
      </Bloc>

      <Bloc teinte="craie">
        <AvantApres />
      </Bloc>

      <Bandeau />
      <Constat />
      <Situations />
      <Processus />

      <Bloc teinte="sable" id="comparaison">
        <h2 className="titre mesure">{ACCUEIL.comparaison.titre}</h2>
        <p className="discret mt-4 mesure-large">{ACCUEIL.comparaison.chapo}</p>
        <Comparaison />
      </Bloc>

      <Ia />
      {REALISATIONS_ENABLED && REALISATIONS.length ? <TeaserRealisations /> : null}
      <AppelFinal />
    </Page>
  );
}

function Bandeau() {
  const chiffres = [
    { valeur: `${DELAI_JOURS_OUVRES}${NBSP}j`, legende: ACCUEIL.bandeau[0].legende },
    { valeur: euros(PRIX_PLANCHER), legende: ACCUEIL.bandeau[1].legende },
    { valeur: euros(MENSUEL_PLANCHER), legende: ACCUEIL.bandeau[2].legende },
    { valeur: "0", legende: ACCUEIL.bandeau[3].legende },
  ];

  return (
    <section className="bloc bloc-ardoise sur-ardoise" aria-label={UI.chiffresCles} data-apparition>
      <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {chiffres.map((c) => (
          <div key={c.legende}>
            <dt
              data-prix
              className="text-[2.5rem] leading-none lg:text-[3rem]"
              style={{ fontFamily: "var(--font-titre)", fontWeight: 340 }}
            >
              {c.valeur}
            </dt>
            <dd className="discret mt-3 max-w-[11rem] text-[0.9375rem] leading-snug">
              {c.legende}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Constat() {
  const c = ACCUEIL.constat;
  return (
    <Bloc teinte="argile">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
        <h2 className="titre">{c.titre}</h2>
        <div>
          <p className="mesure-large">{c.texte}</p>
          <p className="sous-titre mt-6 mesure-large">{c.chute}</p>
        </div>
      </div>
    </Bloc>
  );
}

function Situations() {
  return (
    <div className="paire">
      {ACCUEIL.situations.map((s, i) => (
        <article
          key={s.href}
          className={`bloc flex flex-col ${i === 1 ? "bloc-craie" : ""}`}
          data-apparition
        >
          <h2 className="titre">{s.titre}</h2>
          <p className="discret mt-5">{s.texte}</p>
          <p className="mt-7 lg:mt-auto lg:pt-7">
            <Link href={s.href} className="lien">
              {ACTIONS.voirLeDetail}
            </Link>
          </p>
        </article>
      ))}
    </div>
  );
}

function Ia() {
  const ia = ACCUEIL.ia;
  return (
    <Bloc>
      <h2 className="titre mesure">{ia.titre}</h2>
      <p className="discret mt-4 mesure-large">{ia.intro}</p>

      <ul className="liste-separee mt-8 max-w-[52rem]">
        {ia.modules.map((m) => (
          <li key={m.titre} className="grid gap-2 py-6 first:pt-0 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-10">
            <h3 className="sous-titre">{m.titre}</h3>
            <p className="discret text-[0.9375rem]">{m.texte}</p>
          </li>
        ))}
      </ul>

      <p className="discret mt-7 mesure-large text-[0.9375rem]">{ia.chute}</p>
    </Bloc>
  );
}

function TeaserRealisations() {
  return (
    <div className="pile">
      <Bloc teinte="craie">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="titre">{ACCUEIL.realisations.titre}</h2>
          <Link href="/realisations" className="lien">
            {ACCUEIL.realisations.lien}
          </Link>
        </div>
      </Bloc>
      <ul className="trio">
        {REALISATIONS.slice(0, 3).map((r) => (
          <CarteRealisation key={r.slug} realisation={r} />
        ))}
      </ul>
    </div>
  );
}
