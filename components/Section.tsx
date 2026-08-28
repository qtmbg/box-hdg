import type { ReactNode } from "react";

/**
 * Section de page. Le filet de 1 px en haut est le seul ornement structurel
 * du site : il n'y a ni fond alterné superflu, ni encadrement décoratif.
 */
export function Section({
  children,
  filet = true,
  fond = false,
  encre = false,
  id,
  className = "",
  etroit = false,
}: {
  children: ReactNode;
  filet?: boolean;
  fond?: boolean;
  encre?: boolean;
  id?: string;
  className?: string;
  etroit?: boolean;
}) {
  const classesSection = [
    "section",
    filet && !encre ? "filet-haut" : "",
    fond ? "bg-fond" : "",
    encre ? "sur-encre" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classesSection}>
      <div className="contenu">
        <div className={etroit ? "max-w-[45rem]" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** Titre de section avec son chapô, gabarit unique pour tout le site. */
export function TitreSection({
  sourcil,
  titre,
  chapo,
  niveau = 2,
  className = "",
}: {
  sourcil?: string;
  titre: string;
  chapo?: string;
  niveau?: 1 | 2;
  className?: string;
}) {
  const H = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-[46rem] ${className}`.trim()} data-apparition>
      {sourcil ? <p className="sourcil mb-4">{sourcil}</p> : null}
      <H className={niveau === 1 ? "titre-1" : "titre-2"}>{titre}</H>
      {chapo ? <p className="chapo mt-5">{chapo}</p> : null}
    </div>
  );
}
