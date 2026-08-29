import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_REALISATIONS, REALISATIONS } from "@/content/realisations";
import { REALISATIONS_ENABLED } from "@/content/site";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { GrilleRealisations } from "@/components/Realisations";
import { AppelFinal } from "@/components/AppelFinal";

export const metadata: Metadata = {
  title: PAGE_REALISATIONS.meta.titre,
  description: PAGE_REALISATIONS.meta.description,
  alternates: { canonical: "/realisations" },
};

/**
 * Tant que REALISATIONS_ENABLED vaut false, la route répond 404. Le lien a
 * déjà disparu de la navigation et le teaser de l'accueil n'est pas rendu.
 * Le jour où les données arrivent, le drapeau passe à true et la page entre en
 * service.
 */
export default function PageRealisations() {
  if (!REALISATIONS_ENABLED || !REALISATIONS.length) notFound();

  return (
    <Page
      titre={PAGE_REALISATIONS.titre}
      chapo={PAGE_REALISATIONS.chapo}
      fil={[{ nom: "Réalisations", chemin: "/realisations" }]}
    >
      <Bloc teinte="craie" apparition={false}>
        <GrilleRealisations liste={REALISATIONS} />
      </Bloc>
      <AppelFinal />
    </Page>
  );
}
