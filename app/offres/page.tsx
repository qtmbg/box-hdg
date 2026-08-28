import type { Metadata } from "next";
import Link from "next/link";
import { ACCUEIL } from "@/content/accueil";
import { ACTIONS, UI } from "@/content/commun";
import { INDEX_OFFRES } from "@/content/offres";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import { Processus } from "@/components/Processus";
import { GrilleTarifs } from "@/components/GrilleTarifs";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";

/**
 * Page d'index des offres.
 *
 * La §4.1 place « Offres → /offres » dans la navigation, sans décrire la page.
 * Un lien de navigation sans destination est un défaut : cette page existe
 * donc, et elle se contente d'orienter vers les deux offres réelles.
 */
export const metadata: Metadata = {
  title: INDEX_OFFRES.meta.titre,
  description: INDEX_OFFRES.meta.description,
  alternates: { canonical: "/offres" },
};

export default function PageOffres() {
  return (
    <>
      <Fil elements={[{ nom: "Offres", chemin: "/offres" }]} />

      <Section filet={false}>
        <TitreSection
          niveau={1}
          titre={INDEX_OFFRES.titre}
          chapo={INDEX_OFFRES.chapo}
        />

        <div className="mt-11 grid gap-5 md:grid-cols-2 md:gap-6">
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
    </>
  );
}
