"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Entree = { libelle: string; href: string };

/**
 * Panneau de navigation mobile.
 *
 * Écrit à la main plutôt qu'importé : une bibliothèque de dialogue coûterait
 * plus lourd que le budget JS total de la page. Le nécessaire est là — état
 * annoncé, échappement au clavier, focus déplacé puis rendu, défilement de
 * fond bloqué.
 */
export function MenuMobile({
  entrees,
  libelleOuvrir,
  libelleFermer,
}: {
  entrees: Entree[];
  libelleOuvrir: string;
  libelleFermer: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const declencheur = useRef<HTMLButtonElement>(null);
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", surTouche);
    document.documentElement.classList.add("sans-scroll");
    panneau.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", surTouche);
      document.documentElement.classList.remove("sans-scroll");
    };
  }, [ouvert]);

  const fermer = () => {
    setOuvert(false);
    declencheur.current?.focus();
  };

  return (
    <>
      <button
        ref={declencheur}
        type="button"
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
        aria-label={libelleOuvrir}
        onClick={() => setOuvert((v) => !v)}
        className="grid h-11 w-11 place-items-center rounded-[4px] border border-filet md:hidden"
      >
        <span aria-hidden="true" className="grid gap-[5px]">
          <span className="block h-[2px] w-[18px] bg-encre" />
          <span className="block h-[2px] w-[18px] bg-encre" />
        </span>
      </button>

      {ouvert ? (
        <div
          id="menu-mobile"
          ref={panneau}
          role="dialog"
          aria-modal="true"
          aria-label={libelleOuvrir}
          className="fixed inset-0 top-16 z-40 bg-papier md:hidden"
        >
          <nav className="contenu flex flex-col pt-6">
            <ul className="liste-filets border-t border-filet">
              {entrees.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    onClick={fermer}
                    className="flex min-h-[3.5rem] items-center text-[1.375rem] font-semibold tracking-[-0.018em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {e.libelle}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={fermer}
              className="mt-8 self-start text-base font-medium text-gris underline decoration-filet-fort"
            >
              {libelleFermer}
            </button>
          </nav>
        </div>
      ) : null}
    </>
  );
}
