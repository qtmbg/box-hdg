import type { Metadata } from "next";
import { CGV } from "@/content/legal";
import { Page } from "@/components/Page";
import { ContenuLegal, BlocTexte } from "@/components/PageTexte";

export const metadata: Metadata = {
  title: CGV.meta.titre,
  description: CGV.meta.description,
  alternates: { canonical: "/cgv" },
};

/**
 * À faire relire une fois par un avocat français avant la première vente.
 * C'est ce document qui porte l'engagement de délai et le transfert de
 * propriété du site. L'avertissement reste dans le code : il s'adresse à
 * l'agence, pas au visiteur.
 */
export default function PageCGV() {
  return (
    <Page titre={CGV.titre} fil={[{ nom: "CGV", chemin: "/cgv" }]}>
      <ContenuLegal>
        <p className="chapo mesure-large">{CGV.preambule}</p>
        <div className="mt-8">
          {CGV.articles.map((a) => (
            <BlocTexte key={a.titre} titre={a.titre} paragraphes={a.paragraphes} />
          ))}
        </div>
      </ContenuLegal>
    </Page>
  );
}
