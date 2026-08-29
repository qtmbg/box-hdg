import type { Metadata } from "next";
import { REFONTE } from "@/content/offres";
import { ACTIONS, UI } from "@/content/commun";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { Processus } from "@/components/Processus";
import { GrilleTarifs } from "@/components/GrilleTarifs";
import { AppelFinal } from "@/components/AppelFinal";
import { BoutonAppel, BoutonLien } from "@/components/Bouton";
import { JsonLd } from "@/components/JsonLd";
import { service } from "@/lib/jsonld";

const R = REFONTE;

export const metadata: Metadata = {
  title: R.meta.titre,
  description: R.meta.description,
  alternates: { canonical: `/offres/${R.slug}` },
};

/** Page d'atterrissage, segment 2. */
export default function PageRefonte() {
  return (
    <Page
      titre={R.titre}
      chapo={R.chapo}
      fil={[
        { nom: "Offres", chemin: "/offres" },
        { nom: R.fil, chemin: `/offres/${R.slug}` },
      ]}
    >
      <Bloc apparition={false}>
        <p className="chapo mesure-large">{R.chapo}</p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BoutonAppel />
          <BoutonLien href="/tarifs" style="trait">
            {ACTIONS.voirLesTarifs}
          </BoutonLien>
        </div>
      </Bloc>

      <Bloc teinte="sable">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <h2 className="titre">{R.cas.titre}</h2>
          <ul className="liste-separee">
            {R.cas.items.map((item) => (
              <li key={item} className="sous-titre py-3.5 first:pt-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Bloc>

      <div className="paire">
        <Bloc>
          <h2 className="titre">{R.preservation.titre}</h2>
          <p className="discret mt-5">{R.preservation.texte}</p>
        </Bloc>
        <Bloc teinte="argile">
          <h2 className="titre">{R.acces.titre}</h2>
          <p className="mt-5">{R.acces.texte}</p>
        </Bloc>
      </div>

      <Processus />

      <Bloc teinte="craie">
        <h2 className="titre">{UI.tarifs}</h2>
        <div className="mt-8">
          <GrilleTarifs condense />
        </div>
      </Bloc>

      <AppelFinal />
      <JsonLd
        data={service({
          nom: "Refonte de site internet",
          description: R.meta.description,
          chemin: `/offres/${R.slug}`,
        })}
      />
    </Page>
  );
}
