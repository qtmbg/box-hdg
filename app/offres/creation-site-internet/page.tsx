import type { Metadata } from "next";
import { CREATION } from "@/content/offres";
import { ACTIONS, UI } from "@/content/commun";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { Processus } from "@/components/Processus";
import { GrilleTarifs } from "@/components/GrilleTarifs";
import { AppelFinal } from "@/components/AppelFinal";
import { BoutonAppel, BoutonLien } from "@/components/Bouton";
import { JsonLd } from "@/components/JsonLd";
import { service } from "@/lib/jsonld";

const C = CREATION;

export const metadata: Metadata = {
  title: C.meta.titre,
  description: C.meta.description,
  alternates: { canonical: `/offres/${C.slug}` },
};

/**
 * Page d'atterrissage, segment 1.
 *
 * C'est le lien envoyé par SMS juste après un appel à froid. Elle charge vite
 * et répond à une question : ce que j'obtiens, ce que ça coûte.
 */
export default function PageCreation() {
  return (
    <Page
      titre={C.titre}
      chapo={C.chapo}
      fil={[
        { nom: "Offres", chemin: "/offres" },
        { nom: C.fil, chemin: `/offres/${C.slug}` },
      ]}
    >
      <Bloc apparition={false}>
        <p className="chapo mesure-large">{C.chapo}</p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BoutonAppel />
          <BoutonLien href="/tarifs" style="trait">
            {ACTIONS.voirLesTarifs}
          </BoutonLien>
        </div>
      </Bloc>

      <Bloc teinte="sable">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <h2 className="titre">{C.besoins.titre}</h2>
          <div>
            <ol className="liste-separee">
              {C.besoins.items.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-3.5 first:pt-0">
                  <span data-prix className="discret w-5 shrink-0" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="sous-titre">{item}</span>
                </li>
              ))}
            </ol>
            <p className="sous-titre mt-6">{C.besoins.chute}</p>
          </div>
        </div>
      </Bloc>

      <div className="paire">
        <Bloc>
          <h2 className="titre">{C.recuperation.titre}</h2>
          <p className="discret mt-5">{C.recuperation.texte}</p>
        </Bloc>
        <Bloc teinte="argile">
          <h2 className="titre">{C.photos.titre}</h2>
          <p className="mt-5">{C.photos.texte}</p>
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
          nom: "Création de site internet",
          description: C.meta.description,
          chemin: `/offres/${C.slug}`,
        })}
      />
    </Page>
  );
}
