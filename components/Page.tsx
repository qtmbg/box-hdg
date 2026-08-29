import type { ReactNode } from "react";
import { Rail } from "./Rail";
import { PiedDePage } from "./PiedDePage";
import { BarreAppelMobile } from "./BarreAppelMobile";
import { JsonLd } from "./JsonLd";
import { filDAriane } from "@/lib/jsonld";
import { UI } from "@/content/commun";

/**
 * Gabarit de page.
 *
 * Le canevas tient deux choses : la colonne d'identité, et la pile de blocs.
 * Toutes les pages du site passent par là, ce qui garantit que le titre, la
 * navigation et le bouton d'appel se comportent partout de la même façon.
 *
 * Le fil d'Ariane n'est plus affiché : la colonne d'identité annonce déjà où
 * l'on se trouve. Il reste déclaré en données structurées pour les moteurs.
 */
export function Page({
  titre,
  chapo,
  fil,
  children,
  barreAppel = true,
}: {
  titre: string;
  chapo?: string;
  fil?: { nom: string; chemin: string }[];
  children: ReactNode;
  barreAppel?: boolean;
}) {
  return (
    <div className="canevas">
      <Rail titre={titre} chapo={chapo} />
      <div className="pile">
        {children}
        <PiedDePage />
      </div>
      {barreAppel ? <BarreAppelMobile /> : null}
      {fil ? (
        <JsonLd
          data={filDAriane([{ nom: UI.accueil, chemin: "/" }, ...fil])}
        />
      ) : null}
    </div>
  );
}
