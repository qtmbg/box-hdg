import type { Metadata } from "next";
import { IDENTITE, LEGAL_COMPLET, MENTIONS } from "@/content/legal";
import { SITE } from "@/content/site";
import { UI } from "@/content/commun";
import {
  PageTexte,
  BlocTexte,
  Avertissement,
} from "@/components/PageTexte";

export const metadata: Metadata = {
  title: MENTIONS.meta.titre,
  alternates: { canonical: "/mentions-legales" },
  // Une page d'identité incomplète ne doit pas être indexée.
  robots: LEGAL_COMPLET ? { index: true, follow: true } : { index: false, follow: false },
};

/**
 * §12 — ⚠️ BLOQUANT.
 *
 * Obligatoire en France : art. 6-III de la LCEN et art. R123-237 du code de
 * commerce. Les champs viennent de content/legal.ts et ne peuvent pas être
 * devinés — forme juridique, capital, SIREN/SIRET, ville du RCS, TVA, siège,
 * directeur de la publication, hébergeur.
 */
export default function PageMentions() {
  return (
    <PageTexte
      titre={MENTIONS.titre}
      fil={{ nom: "Mentions légales", chemin: "/mentions-legales" }}
    >
      {!LEGAL_COMPLET ? <Avertissement texte={MENTIONS.avertissement} /> : null}

      {MENTIONS.sections.map((s) => (
        <section key={s.titre} className="border-t border-filet py-7">
          <h2 className="titre-3 text-[1.1875rem]">{s.titre}</h2>
          <dl className="mt-4">
            {s.lignes.map(([libelle, cle]) => (
              <div
                key={libelle}
                className="grid gap-1 border-b border-filet py-2.5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="text-base font-medium">{libelle}</dt>
                <dd className="text-base text-gris">
                  {String(IDENTITE[cle])}
                </dd>
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
          `${IDENTITE.hebergeur.nom}, ${IDENTITE.hebergeur.adresse} — ${IDENTITE.hebergeur.site}`,
        ]}
      />

      <BlocTexte
        titre={MENTIONS.proprieteTitre}
        paragraphes={[MENTIONS.proprieteTexte]}
      />

      <BlocTexte
        titre={MENTIONS.donneesTitre}
        paragraphes={[MENTIONS.donneesTexte]}
      />
    </PageTexte>
  );
}
