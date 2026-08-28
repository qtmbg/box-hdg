import type { Metadata } from "next";
import { REFONTE } from "@/content/offres";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import { Processus } from "@/components/Processus";
import { GrilleTarifs } from "@/components/GrilleTarifs";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";
import { BoutonAppel } from "@/components/BoutonAppel";
import { BoutonLien } from "@/components/Bouton";
import { ACTIONS, UI } from "@/content/commun";
import { JsonLd } from "@/components/JsonLd";
import { service } from "@/lib/jsonld";

const R = REFONTE;

export const metadata: Metadata = {
  title: R.meta.titre,
  description: R.meta.description,
  alternates: { canonical: `/offres/${R.slug}` },
};

/** §8 — Page d'atterrissage segment 2. */
export default function PageRefonte() {
  return (
    <>
      <Fil
        elements={[
          { nom: "Offres", chemin: "/offres" },
          { nom: R.fil, chemin: `/offres/${R.slug}` },
        ]}
      />

      <Section filet={false}>
        <TitreSection niveau={1} titre={R.titre} chapo={R.chapo} />
        <div className="mt-8 flex flex-wrap gap-3" data-apparition>
          <BoutonAppel />
          <BoutonLien href="/tarifs" variante="secondaire">
            {ACTIONS.voirLesTarifs}
          </BoutonLien>
        </div>
      </Section>

      {/* Même gabarit que « Ce dont on a besoin » sur la page création : titre
          à gauche, liste à droite. Les deux pages d'atterrissage doivent se
          lire comme une paire. */}
      <Section fond>
        <div className="grid gap-9 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] md:gap-14">
          <h2 className="titre-2" data-apparition>
            {R.cas.titre}
          </h2>
          <ul className="border-t border-filet" data-apparition>
            {R.cas.items.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-filet py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] block h-[5px] w-[5px] shrink-0 bg-ambre"
                />
                <span className="text-xl">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-9 md:grid-cols-2 md:gap-14">
          <div data-apparition>
            <h2 className="titre-3">{R.preservation.titre}</h2>
            <p className="mt-4 text-base text-gris">{R.preservation.texte}</p>
          </div>
          <div data-apparition>
            <h2 className="titre-3">{R.acces.titre}</h2>
            <p className="mt-4 text-base text-gris">{R.acces.texte}</p>
          </div>
        </div>
      </Section>

      <Section fond>
        <Processus />
      </Section>

      <Section>
        <h2 className="titre-2" data-apparition>
          {UI.tarifs}
        </h2>
        <div className="mt-8">
          <GrilleTarifs condense />
        </div>
      </Section>

      <AppelFinal />
      <BarreAppelMobile />
      <JsonLd
        data={service({
          nom: "Refonte de site internet",
          description: R.meta.description,
          chemin: `/offres/${R.slug}`,
        })}
      />
    </>
  );
}
