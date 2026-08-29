import type { Metadata } from "next";
import { PAGE_EQUIPE } from "@/content/equipe";
import { Page } from "@/components/Page";
import { GrilleEquipe, MethodeEquipe } from "@/components/GrilleEquipe";
import { Certifications } from "@/components/Certifications";
import { AppelFinal } from "@/components/AppelFinal";
import { JsonLd } from "@/components/JsonLd";
import { personne } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: PAGE_EQUIPE.meta.titre,
  description: PAGE_EQUIPE.meta.description,
  alternates: { canonical: "/equipe" },
};

/** Le titre est « L'équipe ». Jamais « Les fondateurs », jamais « Notre histoire ». */
export default function PageEquipe() {
  return (
    <Page
      titre={PAGE_EQUIPE.titre}
      chapo={PAGE_EQUIPE.chapo}
      fil={[{ nom: "L'équipe", chemin: "/equipe" }]}
    >
      <GrilleEquipe />
      <MethodeEquipe />
      <Certifications />
      <AppelFinal />
      <JsonLd data={personne()} />
    </Page>
  );
}
