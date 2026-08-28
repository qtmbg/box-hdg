import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_REALISATIONS, REALISATIONS } from "@/content/realisations";
import { REALISATIONS_ENABLED } from "@/content/site";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import { GrilleRealisations } from "@/components/Realisations";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";

export const metadata: Metadata = {
  title: PAGE_REALISATIONS.meta.titre,
  description: PAGE_REALISATIONS.meta.description,
  alternates: { canonical: "/realisations" },
};

/**
 * §9 — Tant que REALISATIONS_ENABLED est à false, la route répond 404.
 *
 * Le lien a déjà disparu de la navigation et le teaser de l'accueil n'est pas
 * rendu ; laisser une adresse accessible et vide serait la troisième version
 * du même défaut. Rien à ajouter le jour où les données arrivent : le drapeau
 * passe à true et la page se met en service.
 */
export default function PageRealisations() {
  if (!REALISATIONS_ENABLED || !REALISATIONS.length) notFound();

  return (
    <>
      <Fil elements={[{ nom: "Réalisations", chemin: "/realisations" }]} />

      <Section filet={false}>
        <TitreSection
          niveau={1}
          titre={PAGE_REALISATIONS.titre}
          chapo={PAGE_REALISATIONS.chapo}
        />
        <div className="mt-11">
          <GrilleRealisations liste={REALISATIONS} />
        </div>
      </Section>

      <AppelFinal />
      <BarreAppelMobile />
    </>
  );
}
