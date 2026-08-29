import type { ElementType, ReactNode } from "react";

type Teinte = "papier" | "craie" | "sable" | "argile" | "ocre" | "ardoise" | "brique";

const teintes: Record<Teinte, string> = {
  papier: "",
  craie: "bloc-craie",
  sable: "bloc-sable",
  argile: "bloc-argile",
  ocre: "bloc-ocre",
  ardoise: "bloc-ardoise",
  brique: "bloc-brique",
};

/**
 * Le bloc est l'unité de mise en page du site.
 *
 * Une couleur pleine, un grand rayon, de l'air autour. Toute la structure
 * tient dans ces trois choses : il n'y a ni bordure, ni ombre, ni filet de
 * séparation nulle part.
 */
export function Bloc({
  teinte = "papier",
  balise: Balise = "section",
  className = "",
  id,
  children,
  apparition = true,
  ...reste
}: {
  teinte?: Teinte;
  balise?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
  apparition?: boolean;
  [k: string]: unknown;
}) {
  return (
    <Balise
      id={id}
      className={`bloc ${teintes[teinte]} ${className}`.trim()}
      {...(apparition ? { "data-apparition": true } : {})}
      {...reste}
    >
      {children}
    </Balise>
  );
}
