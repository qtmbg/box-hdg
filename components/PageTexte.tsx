import type { ReactNode } from "react";
import { Fil } from "./Fil";

/**
 * §12 — Gabarit des pages légales.
 *
 * Texte brut, 720 px de large, aucun décor. Ces pages existent pour être lues
 * et pour être opposables, pas pour être admirées.
 */
export function PageTexte({
  titre,
  chapo,
  fil,
  children,
}: {
  titre: string;
  chapo?: string;
  fil: { nom: string; chemin: string };
  children: ReactNode;
}) {
  return (
    <>
      <Fil elements={[fil]} />
      <div className="contenu">
        <div className="mx-auto max-w-[45rem] py-12 md:py-16">
          <h1 className="titre-2">{titre}</h1>
          {chapo ? <p className="mt-5 text-xl text-gris">{chapo}</p> : null}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </>
  );
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
    <section className="border-t border-filet py-7">
      <h2 className="titre-3 text-[1.1875rem]">{titre}</h2>
      <div className="mt-3 space-y-3.5 text-base text-gris">
        {paragraphes.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {liste?.length ? (
        <ul className="mt-3.5 space-y-1.5 text-base text-gris">
          {liste.map((l) => (
            <li key={l} className="flex gap-2.5">
              <span aria-hidden="true" className="text-filet-fort">
                —
              </span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/** Avertissement de rédaction. Rendu uniquement tant qu'un bloquant subsiste. */
export function Avertissement({ texte }: { texte: string }) {
  return (
    <p
      className="mb-10 rounded-[4px] border-2 border-ambre bg-ambre-sourd px-5 py-4 text-base"
      style={{ color: "var(--color-encre)" }}
      role="note"
    >
      <strong className="font-semibold">À compléter — </strong>
      {texte}
    </p>
  );
}
