import type { Metadata } from "next";
import Link from "next/link";
import { ACCUEIL } from "@/content/accueil";
import { ACTIONS, UI } from "@/content/commun";
import { REALISATIONS_ENABLED } from "@/content/site";
import { REALISATIONS } from "@/content/realisations";
import {
  DELAI_JOURS_OUVRES,
  MENSUEL_PLANCHER,
  PRIX_PLANCHER,
} from "@/content/pricing";
import { euros } from "@/lib/format";
import { NBSP } from "@/lib/fr";
import { Section, TitreSection } from "@/components/Section";
import { BoutonLien } from "@/components/Bouton";
import { BoutonAppel } from "@/components/BoutonAppel";
import { AvantApres } from "@/components/AvantApres";
import { Comparaison } from "@/components/Comparaison";
import { Processus } from "@/components/Processus";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";
import { CarteRealisation } from "@/components/CarteRealisation";

export const metadata: Metadata = {
  title: ACCUEIL.meta.titre,
  description: ACCUEIL.meta.description,
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      <Hero />
      <Bandeau />
      <Constat />
      <Situations />

      <Section>
        <Processus />
      </Section>

      {/* Module signature. Tout le poids visuel du site est dépensé ici. */}
      <Section fond id="comparaison">
        <TitreSection
          titre={ACCUEIL.comparaison.titre}
          chapo={ACCUEIL.comparaison.chapo}
        />
        <Comparaison />
      </Section>

      <Ia />
      {REALISATIONS_ENABLED && REALISATIONS.length ? <TeaserRealisations /> : null}
      <AppelFinal />
      <BarreAppelMobile />
    </>
  );
}

/* -- §5.1 ---------------------------------------------------------------- */

function Hero() {
  const h = ACCUEIL.hero;
  return (
    <section className="section pt-11 md:pt-16">
      <div className="contenu grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_25.5rem] lg:gap-16">
        <div data-apparition>
          <p className="sourcil">{h.sourcil}</p>
          <h1 className="titre-1 mt-5 max-w-[38rem]">{h.titre}</h1>
          <p className="chapo mt-6">{h.chapo}</p>

          <p className="mt-7 border-l-2 border-ambre pl-4 text-xl font-medium">
            {h.prix}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BoutonLien href="/tarifs">{ACTIONS.voirLesTarifs}</BoutonLien>
            <BoutonAppel variante="secondaire" />
          </div>
        </div>

        <div data-apparition>
          <AvantApres />
        </div>
      </div>
    </section>
  );
}

/* -- §5.2 ---------------------------------------------------------------- */

function Bandeau() {
  const chiffres = [
    { valeur: `${DELAI_JOURS_OUVRES}${NBSP}j`, legende: ACCUEIL.bandeau[0].legende },
    { valeur: euros(PRIX_PLANCHER), legende: ACCUEIL.bandeau[1].legende },
    { valeur: euros(MENSUEL_PLANCHER), legende: ACCUEIL.bandeau[2].legende },
    { valeur: "0", legende: ACCUEIL.bandeau[3].legende },
  ];

  return (
    <section className="sur-encre" aria-label={UI.chiffresCles}>
      <div className="contenu">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {chiffres.map((c, i) => (
            <div
              key={c.legende}
              className={[
                "py-8 md:py-11",
                i % 2 === 1 ? "border-l border-white/12 pl-6" : "",
                i > 1 ? "border-t border-white/12 md:border-t-0" : "",
                i > 0 ? "md:border-l md:border-white/12 md:pl-8" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-apparition
            >
              <dt
                data-prix
                className="text-[2.25rem] leading-none tracking-[-0.03em] md:text-[2.75rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {c.valeur}
              </dt>
              <dd className="secondaire mt-3 max-w-[11rem] text-base leading-snug">
                {c.legende}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -- §5.3 ---------------------------------------------------------------- */

function Constat() {
  const c = ACCUEIL.constat;
  return (
    <Section filet={false}>
      <div className="grid gap-9 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-14">
        <h2 className="titre-2" data-apparition>
          {c.titre}
        </h2>
        <div data-apparition>
          <p className="max-w-[38rem] text-xl text-gris">{c.texte}</p>
          <p className="mt-6 max-w-[38rem] text-xl font-semibold">{c.chute}</p>
        </div>
      </div>
    </Section>
  );
}

/* -- §5.4 ---------------------------------------------------------------- */

function Situations() {
  return (
    <Section fond>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {ACCUEIL.situations.map((s) => (
          <article
            key={s.href}
            className="carte flex flex-col p-6 md:p-8"
            data-apparition
          >
            <h2 className="titre-3">{s.titre}</h2>
            <p className="mt-4 text-base text-gris">{s.texte}</p>
            <p className="mt-6 pt-1 md:mt-auto">
              <Link href={s.href} className="lien">
                {ACTIONS.voirLeDetail} →
              </Link>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -- §5.7 ---------------------------------------------------------------- */

function Ia() {
  const ia = ACCUEIL.ia;
  return (
    <Section>
      <TitreSection titre={ia.titre} chapo={ia.intro} />

      <ul className="mt-11 max-w-[52rem]">
        {ia.modules.map((m) => (
          <li
            key={m.titre}
            className="grid gap-2 border-t border-filet py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10"
            data-apparition
          >
            <h3 className="titre-3 text-[1.1875rem] md:text-[1.25rem]">
              {m.titre}
            </h3>
            <p className="text-base text-gris">{m.texte}</p>
          </li>
        ))}
      </ul>

      <p className="mt-7 max-w-[46rem] text-base text-gris" data-apparition>
        {ia.chute}
      </p>
    </Section>
  );
}

/* -- §5.8 — masqué tant que REALISATIONS_ENABLED est à false --------------- */

function TeaserRealisations() {
  return (
    <Section fond>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="titre-2" data-apparition>
          {ACCUEIL.realisations.titre}
        </h2>
        <Link href="/realisations" className="lien" data-apparition>
          {ACCUEIL.realisations.lien} →
        </Link>
      </div>
      <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
        {REALISATIONS.slice(0, 3).map((r) => (
          <CarteRealisation key={r.slug} realisation={r} />
        ))}
      </ul>
    </Section>
  );
}
