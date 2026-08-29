import Image from "next/image";
import { PAGE_REALISATIONS, type Realisation } from "@/content/realisations";

/** Carte de réalisation, composant serveur. */
export function CarteRealisation({ realisation: r }: { realisation: Realisation }) {
  const P = PAGE_REALISATIONS;
  return (
    <li className="bloc flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--rayon-petit)] bg-sable">
        <Image
          src={r.image}
          alt={`Page d'accueil du site de ${r.client}`}
          fill
          sizes="(min-width: 1280px) 24rem, (min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <h2 className="sous-titre mt-5">{r.client}</h2>
      <p className="discret mt-1.5 text-[0.9375rem]">
        {r.secteur} · {r.ville}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span className="jeton jeton-clair">{P.etiquettes[r.type]}</span>
        <span className="chiffre discret text-[0.875rem]">{P.delai(r.delaiJours)}</span>
      </div>

      <p className="mt-4 text-[0.9375rem]">{r.resume}</p>

      {r.url ? (
        <p className="mt-4">
          <a href={r.url} className="lien" target="_blank" rel="noreferrer noopener">
            {P.voirLeSite}
          </a>
        </p>
      ) : null}
    </li>
  );
}
