"use client";

import { useMemo, useState } from "react";
import { PAGE_REALISATIONS, secteurs, type Realisation } from "@/content/realisations";
import { CarteRealisation } from "./CarteRealisation";

/**
 * §9 — Grille de réalisations et sa barre de filtres.
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
        className="flex flex-wrap gap-2 border-y border-filet py-4"
      >
        {puces.map((p) => {
          const actif = filtre === p.cle;
          return (
            <button
              key={p.cle}
              type="button"
              aria-pressed={actif}
              onClick={() => setFiltre(p.cle)}
              className={`min-h-11 rounded-[4px] border px-3.5 text-base font-medium transition-colors ${
                actif
                  ? "border-encre bg-encre text-papier"
                  : "border-filet text-gris hover:text-encre"
              }`}
            >
              {p.libelle}
            </button>
          );
        })}
      </div>

      <ul className="mt-9 grid gap-8 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
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
    <div className="mt-14 border-t border-filet pt-11">
      <ul className="grid gap-9 md:grid-cols-2 md:gap-10">
        {citations.map((r) => (
          <li key={r.slug}>
            <blockquote className="text-[1.375rem] leading-[1.45] tracking-[-0.014em]">
              {r.citation!.texte}
            </blockquote>
            <p className="mt-3.5 text-base text-gris">
              — {r.citation!.auteur}, {r.citation!.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
