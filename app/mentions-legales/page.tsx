import type { Metadata } from "next";
import { IDENTITE, LEGAL_COMPLET, MENTIONS } from "@/content/legal";
import { SITE } from "@/content/site";
import { UI } from "@/content/commun";
import { Page } from "@/components/Page";
import { ContenuLegal, BlocTexte, Avertissement } from "@/components/PageTexte";

export const metadata: Metadata = {
  title: MENTIONS.meta.titre,
  alternates: { canonical: "/mentions-legales" },
  robots: LEGAL_COMPLET
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * Obligatoire en France : article 6-III de la LCEN et article R123-237 du code
 * de commerce. Les champs viennent de content/legal.ts.
 */
export default function PageMentions() {
  return (
    <Page
      titre={MENTIONS.titre}
      fil={[{ nom: "Mentions légales", chemin: "/mentions-legales" }]}
    >
      <ContenuLegal>
        {!LEGAL_COMPLET ? <Avertissement texte={MENTIONS.avertissement} /> : null}

        {MENTIONS.sections.map((s) => (
          <section key={s.titre} className="pb-7">
            <h2 className="sous-titre">{s.titre}</h2>
            <dl className="mt-4 liste-separee">
              {s.lignes.map(([libelle, cle]) => (
                <div
                  key={libelle}
                  className="grid gap-1 py-2.5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="font-medium">{libelle}</dt>
                  <dd className="discret">{String(IDENTITE[cle])}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <BlocTexte
          titre={MENTIONS.contactTitre}
          paragraphes={[
            `${UI.telephoneLabel} : ${SITE.telephone.affichage}`,
            `${UI.emailLabel} : ${SITE.email}`,
          ]}
        />
        <BlocTexte
          titre={MENTIONS.hebergementTitre}
          paragraphes={[
            `${IDENTITE.hebergeur.nom}, ${IDENTITE.hebergeur.adresse}. ${IDENTITE.hebergeur.site}`,
          ]}
        />
        <BlocTexte titre={MENTIONS.proprieteTitre} paragraphes={[MENTIONS.proprieteTexte]} />
        <BlocTexte titre={MENTIONS.donneesTitre} paragraphes={[MENTIONS.donneesTexte]} />
      </ContenuLegal>
    </Page>
  );
}
