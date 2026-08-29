import type { Metadata } from "next";
import Link from "next/link";
import { ACCUEIL } from "@/content/accueil";
import { ACTIONS, UI } from "@/content/commun";
import { INDEX_OFFRES } from "@/content/offres";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { Processus } from "@/components/Processus";
import { GrilleTarifs } from "@/components/GrilleTarifs";
import { AppelFinal } from "@/components/AppelFinal";

export const metadata: Metadata = {
  title: INDEX_OFFRES.meta.titre,
  description: INDEX_OFFRES.meta.description,
  alternates: { canonical: "/offres" },
};

export default function PageOffres() {
  return (
    <Page
      titre={INDEX_OFFRES.titre}
      chapo={INDEX_OFFRES.chapo}
      fil={[{ nom: "Offres", chemin: "/offres" }]}
    >
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

      <Processus />

      <Bloc teinte="craie">
        <h2 className="titre">{UI.tarifs}</h2>
        <div className="mt-8">
          <GrilleTarifs condense />
        </div>
      </Bloc>

      <AppelFinal />
    </Page>
  );
}
