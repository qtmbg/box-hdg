import type { Metadata } from "next";
import { CONFIDENTIALITE } from "@/content/legal";
import { SITE } from "@/content/site";
import { UI } from "@/content/commun";
import { PageTexte, BlocTexte } from "@/components/PageTexte";

export const metadata: Metadata = {
  title: CONFIDENTIALITE.meta.titre,
  description: CONFIDENTIALITE.meta.description,
  alternates: { canonical: "/confidentialite" },
};

export default function PageConfidentialite() {
  return (
    <PageTexte
      titre={CONFIDENTIALITE.titre}
      chapo={CONFIDENTIALITE.chapo}
      fil={{ nom: "Politique de confidentialité", chemin: "/confidentialite" }}
    >
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
    </PageTexte>
  );
}
