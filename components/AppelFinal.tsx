import { APPEL_FINAL } from "@/content/commun";
import { BoutonAppel, BoutonLien } from "./Bouton";

/** Bloc d'appel final, en pied de quatre pages. */
export function AppelFinal() {
  return (
    <section className="bloc bloc-brique sur-brique" data-apparition>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
        <h2 className="titre max-w-[32rem]">{APPEL_FINAL.titre}</h2>
        <div className="flex shrink-0 flex-wrap gap-2.5">
          <BoutonAppel style="encre" />
          <BoutonLien href="/contact" style="trait">
            {APPEL_FINAL.lienEcrire}
          </BoutonLien>
        </div>
      </div>
    </section>
  );
}
