import Link from "next/link";
import { SITE, REALISATIONS_ENABLED } from "@/content/site";
import { PIED, UI } from "@/content/commun";
import { Logotype } from "./Logotype";

/** Dernier bloc de la pile. */
export function PiedDePage() {
  const annee = new Date().getFullYear();
  const agence = PIED.colonnes.agence.liens.filter(
    (e) => !e.drapeau || REALISATIONS_ENABLED,
  );

  return (
    <footer className="bloc bloc-ardoise" data-apparition>
      <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div>
          <Logotype ton="craie" />
          <p className="discret mt-3 max-w-[15rem] text-[0.9375rem]">
            {SITE.baseline}
          </p>
        </div>

        <Colonne titre={PIED.colonnes.offres.titre} liens={PIED.colonnes.offres.liens} />
        <Colonne titre={PIED.colonnes.agence.titre} liens={agence} />

        <div>
          <h2 className="etiquette opacity-60">{PIED.colonnes.contact.titre}</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            <li>
              <a href={SITE.telephone.lien} className="chiffre lien">
                {SITE.telephone.affichage}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="lien">
                {SITE.email}
              </a>
            </li>
            <li className="discret pt-2 leading-relaxed">
              {SITE.adresse.ligne1}
              <br />
              <span className="chiffre">{SITE.adresse.codePostal}</span>{" "}
              {SITE.adresse.ville}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-craie/15 pt-6 text-[0.875rem] md:flex-row md:items-center md:justify-between">
        <p className="discret">
          © <span className="chiffre">{annee}</span> {SITE.nom}. {UI.droitsReserves}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {PIED.legal.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="discret inline-block py-1 hover:text-craie">
                {e.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function Colonne({
  titre,
  liens,
}: {
  titre: string;
  liens: readonly { libelle: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="etiquette opacity-60">{titre}</h2>
      <ul className="mt-4 space-y-2 text-[0.9375rem]">
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 hover:text-ocre">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
