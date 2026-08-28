import Link from "next/link";
import { SITE, REALISATIONS_ENABLED } from "@/content/site";
import { PIED, UI } from "@/content/commun";
import { Logotype } from "./Logotype";

export function PiedDePage() {
  const annee = new Date().getFullYear();
  const agence = PIED.colonnes.agence.liens.filter(
    (e) => !e.drapeau || REALISATIONS_ENABLED,
  );

  return (
    <footer className="sur-encre">
      <div className="contenu grid gap-10 py-14 md:grid-cols-4 md:gap-8 md:py-16">
        <div>
          <Logotype ton="papier" />
          <p className="secondaire mt-4 max-w-[16rem] text-base">
            {SITE.baseline}
          </p>
        </div>

        <ColonnePied
          titre={PIED.colonnes.offres.titre}
          liens={PIED.colonnes.offres.liens}
        />
        <ColonnePied titre={PIED.colonnes.agence.titre} liens={agence} />

        <div>
          <TitreColonne>{PIED.colonnes.contact.titre}</TitreColonne>
          <ul className="space-y-2.5 text-base">
            <li>
              <a href={SITE.telephone.lien} className="chiffre lien inline-block py-1">
                {SITE.telephone.affichage}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="lien inline-block py-1">
                {SITE.email}
              </a>
            </li>
            <li className="secondaire pt-1.5 leading-relaxed">
              {SITE.adresse.ligne1}
              <br />
              <span className="chiffre">{SITE.adresse.codePostal}</span>{" "}
              {SITE.adresse.ville}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="contenu flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="secondaire">
            © <span className="chiffre">{annee}</span> {SITE.nom}.{" "}
            {UI.droitsReserves}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {PIED.legal.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="inline-block py-1 text-white/72 underline decoration-white/25 underline-offset-4 hover:decoration-ambre"
                >
                  {e.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function TitreColonne({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.09em] text-white/60">
      {children}
    </h2>
  );
}

function ColonnePied({
  titre,
  liens,
}: {
  titre: string;
  liens: readonly { libelle: string; href: string }[];
}) {
  return (
    <div>
      <TitreColonne>{titre}</TitreColonne>
      <ul className="space-y-2.5 text-base">
        {liens.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block py-1 underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-ambre"
            >
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
