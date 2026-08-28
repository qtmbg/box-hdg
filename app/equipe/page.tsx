import type { Metadata } from "next";
import { PAGE_EQUIPE } from "@/content/equipe";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import { GrilleEquipe } from "@/components/GrilleEquipe";
import { AppelFinal } from "@/components/AppelFinal";
import { BarreAppelMobile } from "@/components/BarreAppelMobile";

export const metadata: Metadata = {
  title: PAGE_EQUIPE.meta.titre,
  description: PAGE_EQUIPE.meta.description,
  alternates: { canonical: "/equipe" },
};

/** §10 — Le titre est « L'équipe ». Jamais « Les fondateurs », jamais « Notre histoire ». */
export default function PageEquipe() {
  return (
    <>
      <Fil elements={[{ nom: "L'équipe", chemin: "/equipe" }]} />

      <Section filet={false}>
        <TitreSection
          niveau={1}
          titre={PAGE_EQUIPE.titre}
          chapo={PAGE_EQUIPE.chapo}
        />
        <GrilleEquipe />
      </Section>

      <AppelFinal />
      <BarreAppelMobile />
    </>
  );
}
