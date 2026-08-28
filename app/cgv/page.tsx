import type { Metadata } from "next";
import { CGV } from "@/content/legal";
import { PageTexte, BlocTexte } from "@/components/PageTexte";

export const metadata: Metadata = {
  title: CGV.meta.titre,
  description: CGV.meta.description,
  alternates: { canonical: "/cgv" },
};

/**
 * §12 — ⚠️ À faire relire une fois par un avocat français avant la première
 * vente. C'est ce document qui porte l'engagement de délai et le transfert de
 * propriété du site. L'avertissement reste ici, dans le code : il s'adresse à
 * l'agence, pas au visiteur.
 */
export default function PageCGV() {
  return (
    <PageTexte
      titre={CGV.titre}
      chapo={CGV.preambule}
      fil={{ nom: "CGV", chemin: "/cgv" }}
    >
      {CGV.articles.map((a) => (
        <BlocTexte key={a.titre} titre={a.titre} paragraphes={a.paragraphes} />
      ))}
    </PageTexte>
  );
}
