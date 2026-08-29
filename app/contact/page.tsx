import type { Metadata } from "next";
import { CONTACT } from "@/content/contact";
import { SITE } from "@/content/site";
import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { FormulaireContact } from "@/components/FormulaireContact";

export const metadata: Metadata = {
  title: CONTACT.meta.titre,
  description: CONTACT.meta.description,
  alternates: { canonical: "/contact" },
};

/**
 * La barre d'appel mobile est retirée ici : le bouton d'appel occupe déjà le
 * haut du premier bloc, et le doubler prendrait la place du formulaire.
 */
export default function PageContact() {
  return (
    <Page
      titre={CONTACT.titre}
      chapo={CONTACT.chapo}
      fil={[{ nom: "Contact", chemin: "/contact" }]}
      barreAppel={false}
    >
      <div className="grid gap-[var(--marge)] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <Bloc teinte="argile" className="flex flex-col">
          <h2 className="etiquette">{CONTACT.direct.titre}</h2>
          <a
            href={SITE.telephone.lien}
            className="pilule pilule-encre mt-4 !min-h-[3.5rem] w-full !text-[1.125rem]"
          >
            <span className="chiffre">{SITE.telephone.affichage}</span>
          </a>
          <p className="mt-4 text-[0.9375rem]">{SITE.horaires}</p>

          <h2 className="etiquette mt-9">{CONTACT.direct.titreEmail}</h2>
          <p className="mt-3">
            <a href={`mailto:${SITE.email}`} className="lien">
              {SITE.email}
            </a>
          </p>

          <h2 className="etiquette mt-9">{CONTACT.direct.titreAdresse}</h2>
          <address className="mt-3 not-italic text-[0.9375rem]">
            {SITE.adresse.ligne1}
            <br />
            <span className="chiffre">{SITE.adresse.codePostal}</span>{" "}
            {SITE.adresse.ville}
            <br />
            {SITE.adresse.pays}
          </address>
        </Bloc>

        <Bloc>
          <h2 className="etiquette mb-6">{CONTACT.formulaire.titre}</h2>
          <FormulaireContact />
        </Bloc>
      </div>
    </Page>
  );
}
