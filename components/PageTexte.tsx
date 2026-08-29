import type { ReactNode } from "react";
import { Bloc } from "./Bloc";

/**
 * Gabarit des pages légales.
 *
 * Texte au kilomètre dans un bloc unique, mesure courte, aucun décor. Ces
 * pages existent pour être lues et pour être opposables.
 */
export function ContenuLegal({ children }: { children: ReactNode }) {
  return <Bloc className="max-w-none">{children}</Bloc>;
}

export function BlocTexte({
  titre,
  paragraphes,
  liste,
}: {
  titre: string;
  paragraphes: readonly string[];
  liste?: readonly string[];
}) {
  return (
    <section className="border-t border-ardoise/12 py-7 first:border-t-0 first:pt-0">
      <h2 className="sous-titre">{titre}</h2>
      <div className="discret mt-3 space-y-3.5 text-[0.9375rem]">
        {paragraphes.map((p) => (
          <p key={p} className="mesure-large">
            {p}
          </p>
        ))}
      </div>
      {liste?.length ? (
        <ul className="discret mt-3.5 space-y-1.5 text-[0.9375rem]">
          {liste.map((l) => (
            <li key={l} className="flex gap-2.5">
              <span aria-hidden="true" className="text-brique">
                •
              </span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/** Avertissement de rédaction, rendu tant qu'un bloquant subsiste. */
export function Avertissement({ texte }: { texte: string }) {
  return (
    <p className="mb-8 rounded-[var(--rayon-petit)] bg-ocre px-5 py-4" role="note">
      <strong className="font-semibold">À compléter. </strong>
      {texte}
    </p>
  );
}
