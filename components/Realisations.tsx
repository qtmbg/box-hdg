"use client";

import { useMemo, useState } from "react";
import { PAGE_REALISATIONS, secteurs, type Realisation } from "@/content/realisations";
import { CarteRealisation } from "./CarteRealisation";

/**
 * §9. Grille de réalisations et sa barre de filtres.
 *
 * Filtrage côté client, sans bibliothèque : un `useState` et un `filter`.
 * Les puces sont des boutons dans un groupe annoncé, pas des liens : elles ne
 * changent pas d'adresse.
 */
export function GrilleRealisations({ liste }: { liste: Realisation[] }) {
  const [filtre, setFiltre] = useState<string>("tout");

  const puces = useMemo(
    () => [
      { cle: "tout", libelle: PAGE_REALISATIONS.filtres.tout },
      { cle: "creation", libelle: PAGE_REALISATIONS.filtres.creation },
      { cle: "refonte", libelle: PAGE_REALISATIONS.filtres.refonte },
      ...secteurs(liste).map((s) => ({ cle: `secteur:${s}`, libelle: s })),
    ],
    [liste],
  );

  const visibles = useMemo(() => {
    if (filtre === "tout") return liste;
    if (filtre.startsWith("secteur:")) {
      const s = filtre.slice(8);
      return liste.filter((r) => r.secteur === s);
    }
    return liste.filter((r) => r.type === filtre);
  }, [filtre, liste]);

  return (
    <div>
      <div
        role="group"
        aria-label={PAGE_REALISATIONS.legendeFiltres}
        className="flex flex-wrap gap-2"
      >
        {puces.map((p) => {
          const actif = filtre === p.cle;
          return (
            <button
              key={p.cle}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(p.cle)}
              className={`pilule ${actif ? "pilule-encre" : "pilule-trait"}`}
            >
              {p.libelle}
            </button>
          );
        })}
      </div>

      <ul className="mt-[var(--marge)] grid gap-[var(--marge)] md:grid-cols-2 xl:grid-cols-3">
        {visibles.map((r) => (
          <CarteRealisation key={r.slug} realisation={r} />
        ))}
      </ul>

      <BandeauCitations liste={visibles} />
    </div>
  );
}

function BandeauCitations({ liste }: { liste: Realisation[] }) {
  const citations = liste.filter((r) => r.citation);
  if (!citations.length) return null;

  return (
    <div className="mt-[var(--marge)] bloc bloc-sable">
      <ul className="grid gap-9 md:grid-cols-2 md:gap-10">
        {citations.map((r) => (
          <li key={r.slug}>
            <blockquote className="chapo">
              {r.citation!.texte}
            </blockquote>
            <p className="discret mt-3.5 text-[0.9375rem]">
              {r.citation!.auteur}, {r.citation!.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
