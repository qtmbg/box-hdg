import type { Metadata } from "next";
import { CONTACT } from "@/content/contact";
import { SITE } from "@/content/site";
import { Section, TitreSection } from "@/components/Section";
import { Fil } from "@/components/Fil";
import { FormulaireContact } from "@/components/FormulaireContact";

export const metadata: Metadata = {
  title: CONTACT.meta.titre,
  description: CONTACT.meta.description,
  alternates: { canonical: "/contact" },
};

/**
 * §11 — Contact.
 *
 * Seule page sans barre d'appel fixe : le bouton d'appel occupe déjà le haut
 * de la colonne de gauche, et le doubler sur 56 px de haut prendrait la place
 * du formulaire.
 */
export default function PageContact() {
  return (
    <>
      <Fil elements={[{ nom: "Contact", chemin: "/contact" }]} />

      <Section filet={false}>
        <TitreSection niveau={1} titre={CONTACT.titre} chapo={CONTACT.chapo} />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <div data-apparition>
            <h2 className="sourcil">{CONTACT.direct.titre}</h2>
            <a
              href={SITE.telephone.lien}
              className="bouton bouton-principal mt-4 w-full !min-h-[3.5rem] !text-[1.1875rem]"
            >
              <span className="chiffre">{SITE.telephone.affichage}</span>
            </a>
            <p className="mt-3.5 text-base text-gris">{SITE.horaires}</p>

            <h2 className="sourcil mt-9 border-t border-filet pt-8">
              {CONTACT.direct.titreEmail}
            </h2>
            <p className="mt-3">
              <a href={`mailto:${SITE.email}`} className="lien text-base">
                {SITE.email}
              </a>
            </p>

            <h2 className="sourcil mt-9 border-t border-filet pt-8">
              {CONTACT.direct.titreAdresse}
            </h2>
            <address className="mt-3 text-base not-italic text-gris">
              {SITE.adresse.ligne1}
              <br />
              <span className="chiffre">{SITE.adresse.codePostal}</span>{" "}
              {SITE.adresse.ville}
              <br />
              {SITE.adresse.pays}
            </address>
          </div>

          <div data-apparition>
            <h2 className="sourcil mb-6">{CONTACT.formulaire.titre}</h2>
            <FormulaireContact />
          </div>
        </div>
      </Section>
    </>
  );
}
