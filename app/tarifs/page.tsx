import type { Metadata } from "next";
import { TARIFS } from "@/content/tarifs";
import { Page } from "@/components/Page";
import { GrilleTarifs, PerimetreAbonnement, Options, CeQuOnNeFaitPas } from "@/components/GrilleTarifs";
import { Faq } from "@/components/Faq";
import { AppelFinal } from "@/components/AppelFinal";
import { Bloc } from "@/components/Bloc";
import { JsonLd } from "@/components/JsonLd";
import { faqPage } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: TARIFS.meta.titre,
  description: TARIFS.meta.description,
  alternates: { canonical: "/tarifs" },
};

/**
 * Cette page est construite avant l'accueil : c'est elle qui conclut. Le prix
 * est visible sans défiler, et le sélecteur de mode de paiement fonctionne
 * avant qu'aucun script n'ait pu s'exécuter.
 */
export default function PageTarifs() {
  return (
    <Page titre={TARIFS.titre} chapo={TARIFS.chapo} fil={[{ nom: "Tarifs", chemin: "/tarifs" }]}>
      <Bloc apparition={false}>
        <GrilleTarifs />
      </Bloc>
      <PerimetreAbonnement />
      <Options />
      <CeQuOnNeFaitPas />
      <Faq />
      <AppelFinal />
      <JsonLd data={faqPage()} />
    </Page>
  );
}
