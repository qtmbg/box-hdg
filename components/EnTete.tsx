import Link from "next/link";
import { NAVIGATION, REALISATIONS_ENABLED } from "@/content/site";
import { ACTIONS, UI } from "@/content/commun";
import { Logotype } from "./Logotype";
import { BoutonAppel } from "./BoutonAppel";
import { MenuMobile } from "./MenuMobile";

export function EnTete() {
  // La navigation de la §4.1, moins ce que les drapeaux masquent.
  const entrees = NAVIGATION.filter(
    (e) => e.drapeau !== "realisations" || REALISATIONS_ENABLED,
  ).map(({ libelle, href }) => ({ libelle, href }));

  // Le panneau mobile a la place d'un lien de plus, et « Contact » y a sa
  // place : la barre du haut, elle, reste celle de la spécification.
  const entreesMobile = [...entrees, { libelle: UI.contact, href: "/contact" }];

  return (
    <header className="entete sticky top-0 z-50 border-b border-filet bg-papier">
      <div className="contenu flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center py-2"
          aria-label={UI.logoAria}
        >
          <Logotype />
        </Link>

        <nav aria-label={UI.navigationPrincipale} className="hidden md:block">
          <ul className="flex items-center gap-7">
            {entrees.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="text-base font-medium text-encre decoration-transparent underline-offset-[6px] transition-[text-decoration-color] hover:decoration-ambre hover:underline"
                >
                  {e.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Sur mobile le libellé tombe, le numéro reste. */}
          <BoutonAppel numeroSeul className="entete-appel md:hidden" />
          <BoutonAppel className="hidden md:inline-flex" />
          <MenuMobile
            entrees={entreesMobile}
            libelleOuvrir={ACTIONS.menu}
            libelleFermer={ACTIONS.fermer}
          />
        </div>
      </div>
    </header>
  );
}
