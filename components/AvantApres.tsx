import { ACCUEIL } from "@/content/accueil";
import { UI } from "@/content/commun";

const M = ACCUEIL.avantApres;

/**
 * Module avant et après.
 *
 * Le produit transforme une fiche Google en site internet. Le héros montre
 * cet objet précis : la fiche telle qu'elle existe, puis le site construit à
 * partir des mêmes informations. Tout est en HTML et CSS, avec une entreprise
 * d'exemple étiquetée comme telle. Aucune capture, aucune donnée client.
 *
 * La ligne « Site web », barrée, est le seul argument de vente que le site
 * montre au lieu de l'écrire.
 */
export function AvantApres() {
  return (
    <figure className="m-0 grid gap-3 md:grid-cols-2" aria-labelledby="legende-exemple">
      <FicheGoogle />
      <SiteConstruit />
      <figcaption id="legende-exemple" className="discret menu md:col-span-2">
        {UI.exempleLegende}
      </figcaption>
    </figure>
  );
}

function FicheGoogle() {
  const f = M.fiche;
  return (
    <article className="rounded-[var(--rayon-petit)] bg-sable p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="etiquette text-sauge">{M.avant}</span>
        <span className="etiquette text-sauge">{M.etiquette}</span>
      </div>

      <p className="sous-titre mt-5">{f.nom}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem]">
        <span className="font-semibold">{f.note}</span>
        <Etoiles note={4.8} />
        <span className="discret">{f.avis}</span>
      </div>
      <p className="discret mt-1 text-[0.875rem]">{f.categorie}</p>

      <dl className="mt-5 text-[0.875rem]">
        <Ligne intitule={f.horaireJour} valeur={f.horaire} chiffre />
        <Ligne intitule="Adresse" valeur={f.adresse} />
        <Ligne intitule="Téléphone" valeur={f.telephone} chiffre />
      </dl>

      <p className="mt-3 border-t border-ardoise/12 pt-3 text-[0.875rem]">
        <span className="text-sauge line-through decoration-sauge">
          {M.lienGrise}
        </span>
      </p>

      <p className="mt-5">
        <span className="jeton jeton-brique">
          <span className="chiffre">{M.connecteur}</span>
        </span>
      </p>
    </article>
  );
}

function Ligne({
  intitule,
  valeur,
  chiffre = false,
}: {
  intitule: string;
  valeur: string;
  chiffre?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ardoise/12 py-2.5 first:border-t-0 first:pt-0">
      <dt className="font-medium">{intitule}</dt>
      <dd className={`discret text-right ${chiffre ? "chiffre" : ""}`}>{valeur}</dd>
    </div>
  );
}

function SiteConstruit() {
  const s = M.site;
  return (
    <article className="overflow-hidden rounded-[var(--rayon-petit)] bg-papier">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <span className="etiquette text-brique">{M.apres}</span>
        <span className="etiquette text-sauge">{M.etiquette}</span>
      </div>

      <div className="mt-4 flex items-center gap-2 bg-craie px-5 py-2.5">
        <Cadenas />
        <span className="text-[0.75rem] text-sauge">{s.domaine}</span>
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em]">
            {M.fiche.nom}
          </span>
          <span className="rounded-full bg-brique px-2.5 py-1 text-[0.625rem] font-semibold text-papier">
            {s.bouton}
          </span>
        </div>

        <p className="sous-titre mt-4 text-[1.0625rem]">{s.titre}</p>
        <p className="discret mt-1.5 text-[0.8125rem]">{s.accroche}</p>

        <div className="mt-4 flex items-center gap-2 rounded-[0.5rem] bg-craie px-3 py-2">
          <Etoiles note={4.8} petit />
          <span className="text-[0.75rem] text-sauge">{s.preuve}</span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {s.prestations.map((p) => (
            <span
              key={p}
              className="rounded-[0.5rem] bg-argile px-2 py-2.5 text-center text-[0.75rem] font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Cinq étoiles, remplissage partiel. 4,8 sur 5 fait 96 % de largeur. */
function Etoiles({ note, petit = false }: { note: number; petit?: boolean }) {
  const cote = petit ? 9 : 11;
  const total = cote * 5 + 4 * 1.5;
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: total, height: cote }}
      aria-hidden="true"
    >
      <Rangee cote={cote} couleur="rgba(19,50,45,.18)" />
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${(note / 5) * 100}%` }}>
        <Rangee cote={cote} couleur="var(--color-brique)" />
      </span>
    </span>
  );
}

function Rangee({ cote, couleur }: { cote: number; couleur: string }) {
  const total = cote * 5 + 4 * 1.5;
  return (
    <svg
      width={total}
      height={cote}
      viewBox={`0 0 ${total} ${cote}`}
      fill={couleur}
      className="absolute inset-0"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * (cote + 1.5)}) scale(${cote / 10})`}
          d="M5 0l1.55 3.13L10 3.64 7.5 6.07l.59 3.43L5 7.88 1.91 9.5l.59-3.43L0 3.64l3.45-.51z"
        />
      ))}
    </svg>
  );
}

function Cadenas() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect x="1.6" y="4.3" width="6.8" height="4.6" rx="1.2" stroke="var(--color-sauge)" strokeWidth="1.1" />
      <path d="M3.3 4.3V3a1.7 1.7 0 0 1 3.4 0v1.3" stroke="var(--color-sauge)" strokeWidth="1.1" />
    </svg>
  );
}
