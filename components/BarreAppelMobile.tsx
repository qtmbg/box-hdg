import { SITE } from "@/content/site";
import { ACTIONS } from "@/content/commun";

/**
 * §4.3 — Barre d'appel fixe, sous 768 px, 56 px de haut.
 *
 * C'est le premier élément de conversion du site. Elle est présente partout
 * sauf sur /contact, où le bouton d'appel occupe déjà la moitié de l'écran.
 */
export function BarreAppelMobile() {
  return (
    <>
      {/* Cale : la barre est fixe, le bas de page ne doit pas passer dessous. */}
      <div className="h-14 md:hidden" aria-hidden="true" />
      <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={SITE.telephone.lien}
        className="flex h-14 items-center justify-center gap-2 bg-ambre text-base font-semibold text-encre"
      >
        <TelephoneIcone />
        <span>{ACTIONS.appeler}</span>
        <span className="chiffre">{SITE.telephone.affichage}</span>
      </a>
      </div>
    </>
  );
}

/** Dessiné en ligne : une icône vaut moins qu'une requête réseau. */
function TelephoneIcone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.2 1.8h2.1l1 2.5-1.3.9a7.4 7.4 0 0 0 3.8 3.8l.9-1.3 2.5 1v2.1c0 .6-.5 1.1-1.1 1.1A9.9 9.9 0 0 1 2.1 2.9c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
