import type { Metadata } from "next";
import { TARIFS } from "@/content/tarifs";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import {
  GrilleTarifs,
  PerimetreAbonnement,
  Options,
  CeQuOnNeFaitPas,
} from "@/components/GrilleTarifs";
import { Faq } from "@/components/Faq";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";
import { JsonLd } from "@/components/JsonLd";
import { faqPage } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: TARIFS.meta.titre,
  description: TARIFS.meta.description,
  alternates: { canonical: "/tarifs" },
};

/**
 * §14 — Cette page est construite avant l'accueil : c'est elle qui conclut.
 * Le prix est visible sans défilement, et le sélecteur de mode de paiement
 * fonctionne avant qu'aucun script ne se soit exécuté.
 */
export default function PageTarifs() {
  return (
    <>
      <Fil elements={[{ nom: "Tarifs", chemin: "/tarifs" }]} />

      <Section filet={false} className="!pb-0">
        <TitreSection niveau={1} titre={TARIFS.titre} chapo={TARIFS.chapo} />
      </Section>

      <Section filet={false}>
        <GrilleTarifs />
        <PerimetreAbonnement />
      </Section>

      <Section fond>
        <Options />
      </Section>

      <Section>
        <CeQuOnNeFaitPas />
      </Section>

      <Section fond>
        <h2 className="titre-2" data-apparition>
          {TARIFS.faq.titre}
        </h2>
        <Faq />
      </Section>

      <AppelFinal />
      <BarreAppelMobile />
      <JsonLd data={faqPage()} />
    </>
  );
}
