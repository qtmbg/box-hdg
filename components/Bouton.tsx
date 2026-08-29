import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/content/site";
import { ACTIONS } from "@/content/commun";

type Style = "pleine" | "trait" | "encre";

/** Lien présenté en pilule. */
export function BoutonLien({
  href,
  style = "pleine",
  children,
  className = "",
}: {
  href: string;
  style?: Style;
  children: ReactNode;
  className?: string;
}) {
  const cn = `pilule pilule-${style} ${className}`.trim();
  return href.startsWith("/") ? (
    <Link href={href} className={cn}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cn}>
      {children}
    </a>
  );
}

/**
 * Le bouton d'appel.
 *
 * Un seul composant pour la colonne d'identité, les blocs d'appel et les
 * cartes de tarif, pour que le numéro ne dérive jamais d'un endroit à l'autre.
 */
export function BoutonAppel({
  style = "pleine",
  libelle,
  numeroSeul = false,
  className = "",
}: {
  style?: Style;
  libelle?: string;
  numeroSeul?: boolean;
  className?: string;
}) {
  return (
    <a
      href={SITE.telephone.lien}
      className={`pilule pilule-${style} ${className}`.trim()}
      data-appel
    >
      {numeroSeul ? null : <span>{libelle ?? ACTIONS.appeler}</span>}
      {libelle ? null : (
        <span className="chiffre">{SITE.telephone.affichage}</span>
      )}
    </a>
  );
}
