import { APPEL_FINAL } from "@/content/commun";
import { BoutonAppel } from "./BoutonAppel";
import { BoutonLien } from "./Bouton";

/** §5.9 — Bloc d'appel final, fond encre. Présent au pied de quatre pages. */
export function AppelFinal() {
  return (
    <section className="sur-encre">
      <div className="contenu section">
        <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-14">
          <h2 className="titre-2 max-w-[36rem]" data-apparition>
            {APPEL_FINAL.titre}
          </h2>
          <div className="flex shrink-0 flex-wrap gap-3" data-apparition>
            <BoutonAppel />
            <BoutonLien href="/contact" variante="secondaire">
              {APPEL_FINAL.lienEcrire}
            </BoutonLien>
          </div>
        </div>
      </div>
    </section>
  );
}
