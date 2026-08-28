import type { Metadata } from "next";
import { CREATION } from "@/content/offres";
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

const C = CREATION;

export const metadata: Metadata = {
  title: C.meta.titre,
  description: C.meta.description,
  alternates: { canonical: `/offres/${C.slug}` },
};

/**
 * §7 — Page d'atterrissage segment 1.
 *
 * C'est le lien envoyé par SMS juste après un appel à froid. Elle doit charger
 * vite et répondre à une seule question : ce que j'obtiens et ce que ça coûte.
 */
export default function PageCreation() {
  return (
    <>
      <Fil
        elements={[
          { nom: "Offres", chemin: "/offres" },
          { nom: C.fil, chemin: `/offres/${C.slug}` },
        ]}
      />

      <Section filet={false}>
        <TitreSection niveau={1} titre={C.titre} chapo={C.chapo} />
        <div className="mt-8 flex flex-wrap gap-3" data-apparition>
          <BoutonAppel />
          <BoutonLien href="/tarifs" variante="secondaire">
            {ACTIONS.voirLesTarifs}
          </BoutonLien>
        </div>
      </Section>

      <Section fond>
        <div className="grid gap-9 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] md:gap-14">
          <h2 className="titre-2" data-apparition>
            {C.besoins.titre}
          </h2>
          <div data-apparition>
            <ol className="liste-filets border-t border-filet">
              {C.besoins.items.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-4">
                  <span
                    data-prix
                    className="w-5 shrink-0 text-base text-gris"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-xl">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xl font-semibold">{C.besoins.chute}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-9 md:grid-cols-2 md:gap-14">
          <div data-apparition>
            <h2 className="titre-3">{C.recuperation.titre}</h2>
            <p className="mt-4 text-base text-gris">{C.recuperation.texte}</p>
          </div>
          <div data-apparition>
            <h2 className="titre-3">{C.photos.titre}</h2>
            <p className="mt-4 text-base text-gris">{C.photos.texte}</p>
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
          nom: "Création de site internet",
          description: C.meta.description,
          chemin: `/offres/${C.slug}`,
        })}
      />
    </>
  );
}
