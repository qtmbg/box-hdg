import Image from "next/image";
import { PAGE_REALISATIONS, type Realisation } from "@/content/realisations";

/**
 * Carte de réalisation — composant serveur.
 *
 * Séparée de la grille filtrable, qui est cliente : importer la carte depuis
 * le teaser de l'accueil embarquait sinon `useState`, `useMemo` et toute la
 * barre de filtres dans le bundle de la page d'accueil, pour un bloc qui n'est
 * même pas rendu tant que le drapeau est baissé.
 */
export function CarteRealisation({
  realisation: r,
}: {
  realisation: Realisation;
}) {
  const P = PAGE_REALISATIONS;
  return (
    <li className="flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-filet bg-fond">
        <Image
          src={r.image}
          alt={`Page d'accueil du site de ${r.client}`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <h2
        className="mt-4 text-[1.125rem] leading-snug tracking-[-0.015em]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {r.client}
      </h2>
      <p className="mt-1 text-base text-gris">
        {r.secteur} · {r.ville}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="etiquette">{P.etiquettes[r.type]}</span>
        <span className="chiffre text-sm text-gris">
          {P.delai(r.delaiJours)}
        </span>
      </div>

      <p className="mt-3 text-base">{r.resume}</p>

      {r.url ? (
        <p className="mt-3.5">
          <a
            href={r.url}
            className="lien"
            target="_blank"
            rel="noreferrer noopener"
          >
            {P.voirLeSite}
          </a>
        </p>
      ) : null}
    </li>
  );
}
