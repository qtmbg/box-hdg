import type { Metadata } from "next";
import { CONFIDENTIALITE } from "@/content/legal";
import { SITE } from "@/content/site";
import { UI } from "@/content/commun";
import { Page } from "@/components/Page";
import { ContenuLegal, BlocTexte } from "@/components/PageTexte";

export const metadata: Metadata = {
  title: CONFIDENTIALITE.meta.titre,
  description: CONFIDENTIALITE.meta.description,
  alternates: { canonical: "/confidentialite" },
};

export default function PageConfidentialite() {
  return (
    <Page
      titre={CONFIDENTIALITE.titre}
      fil={[{ nom: "Politique de confidentialité", chemin: "/confidentialite" }]}
    >
      <ContenuLegal>
        <p className="chapo mesure-large">{CONFIDENTIALITE.chapo}</p>
        <div className="mt-8">
          {CONFIDENTIALITE.sections.map((s) => (
            <BlocTexte
              key={s.titre}
              titre={s.titre}
              paragraphes={s.paragraphes}
              liste={s.liste}
            />
          ))}
          <BlocTexte
            titre={UI.nousContacter}
            paragraphes={[
              `Pour toute question ou pour exercer vos droits : ${SITE.email}, ou par téléphone au ${SITE.telephone.affichage}.`,
            ]}
          />
        </div>
      </ContenuLegal>
    </Page>
  );
}
