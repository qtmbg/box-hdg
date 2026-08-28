import Link from "next/link";
import { filDAriane } from "@/lib/jsonld";
import { UI } from "@/content/commun";
import { JsonLd } from "./JsonLd";

/**
 * Fil d'Ariane. Visible et structuré : le prospect vérifie où il est, et
 * Google reçoit le BreadcrumbList demandé par la §13.
 */
export function Fil({
  elements,
}: {
  elements: { nom: string; chemin: string }[];
}) {
  const complet = [{ nom: UI.accueil, chemin: "/" }, ...elements];

  return (
    <>
      <nav aria-label={UI.filDAriane} className="border-b border-filet">
        <div className="contenu">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-2.5 text-sm text-gris">
            {complet.map((e, i) => {
              const dernier = i === complet.length - 1;
              return (
                <li key={e.chemin} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-filet-fort">
                      /
                    </span>
                  ) : null}
                  {dernier ? (
                    <span aria-current="page" className="text-encre">
                      {e.nom}
                    </span>
                  ) : (
                    <Link
                      href={e.chemin}
                      className="inline-block py-1 underline decoration-filet-fort underline-offset-4 hover:decoration-ambre"
                    >
                      {e.nom}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <JsonLd data={filDAriane(complet)} />
    </>
  );
}
