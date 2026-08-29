import { SITE } from "@/content/site";
import { ACTIONS } from "@/content/commun";

/**
 * Barre d'appel, sous 1100 px.
 *
 * Au-dessus de cette largeur, la colonne d'identité porte déjà le bouton et
 * reste visible en permanence : la barre disparaît.
 */
export function BarreAppelMobile() {
  return (
    <>
      <div className="h-16 xl:hidden" aria-hidden="true" />
      <div
        className="barre-appel"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a href={SITE.telephone.lien}>
          <Combine />
          <span>{ACTIONS.appeler}</span>
          <span className="chiffre">{SITE.telephone.affichage}</span>
        </a>
      </div>
    </>
  );
}

function Combine() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 1.8h2.1l1 2.5-1.3.9a7.4 7.4 0 0 0 3.8 3.8l.9-1.3 2.5 1v2.1c0 .6-.5 1.1-1.1 1.1A9.9 9.9 0 0 1 2.1 2.9c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
