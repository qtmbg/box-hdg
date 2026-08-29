import Link from "next/link";
import { NAVIGATION, REALISATIONS_ENABLED, SITE } from "@/content/site";
import { ACTIONS, UI } from "@/content/commun";
import { Logotype } from "./Logotype";

/**
 * La colonne d'identité.
 *
 * Sur grand écran elle reste fixe pendant que le contenu défile : logotype,
 * navigation, titre de la page, une phrase, et le bouton d'appel posé en bas.
 * Le numéro est donc lisible du début à la fin de la page sans qu'aucune barre
 * ne vienne recouvrir le contenu.
 *
 * Sous 1100 px elle redevient un bloc ordinaire, en tête de la pile, et la
 * barre d'appel prend le relais en bas de l'écran.
 */
export function Rail({
  titre,
  chapo,
}: {
  titre: string;
  chapo?: string;
}) {
  const entrees = NAVIGATION.filter(
    (e) => e.drapeau !== "realisations" || REALISATIONS_ENABLED,
  );

  return (
    <div className="rail">
      <div className="flex flex-col gap-5">
        <Link href="/" aria-label={UI.logoAria} className="inline-flex self-start py-1">
          <Logotype />
        </Link>

        <nav aria-label={UI.navigationPrincipale}>
          <ul className="-ml-3 flex flex-wrap gap-x-1 gap-y-0.5">
            {entrees.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="menu inline-flex min-h-9 items-center rounded-full px-3 font-medium transition-colors hover:bg-ardoise hover:text-craie"
                >
                  {e.libelle}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="menu inline-flex min-h-9 items-center rounded-full px-3 font-medium transition-colors hover:bg-ardoise hover:text-craie"
              >
                {UI.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="rail-corps">
        <h1 className="geant">{titre}</h1>
        {chapo ? <p className="menu max-w-[26rem]">{chapo}</p> : null}
      </div>

      <div className="rail-pied">
        <a href={SITE.telephone.lien} className="pilule pilule-encre" data-appel>
          <span>{ACTIONS.appeler}</span>
          <span className="chiffre">{SITE.telephone.affichage}</span>
        </a>
        <p className="menu w-full opacity-80">{SITE.horaires}</p>
      </div>
    </div>
  );
}
