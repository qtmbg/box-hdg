import { ACCUEIL } from "@/content/accueil";
import { UI } from "@/content/commun";

const M = ACCUEIL.avantApres;

/**
 * §5.1 — Module avant / après.
 *
 * Le produit transforme une fiche Google en site internet. Le héros montre
 * exactement cet objet-là : la fiche telle qu'elle existe, puis le site
 * construit à partir des mêmes données. Tout est en HTML et CSS — aucune
 * capture d'écran, aucune donnée client, une entreprise d'exemple étiquetée
 * comme telle.
 *
 * La ligne « Site web » est la seule ligne vide de la fiche. C'est l'argument
 * de vente du site entier, et il n'est pas écrit : il est montré.
 */
export function AvantApres() {
  return (
    <figure className="m-0" aria-labelledby="avant-apres-legende">
      <div className="flex flex-col">
        <FicheGoogle />
        <Connecteur />
        <SiteConstruit />
      </div>
      <figcaption
        id="avant-apres-legende"
        className="mt-4 text-sm text-gris"
      >
{UI.exempleLegende}
      </figcaption>
    </figure>
  );
}

/* -- Carte 1 : la fiche Google ------------------------------------------- */

function FicheGoogle() {
  const f = M.fiche;
  return (
    <article className="carte relative overflow-hidden">
      <EnTeteCarte libelle={M.avant} />

      <div className="px-4 pb-4 pt-3.5 md:px-5 md:pb-5">
        <p
          className="text-[1.0625rem] font-semibold leading-tight tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {f.nom}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] leading-none">
          <span className="chiffre font-semibold">{f.note}</span>
          <Etoiles note={4.8} />
          <span className="text-gris">{f.avis}</span>
        </div>
        <p className="mt-1.5 text-[0.8125rem] text-gris">{f.categorie}</p>

        <dl className="mt-4 border-t border-filet text-[0.8125rem]">
          <LigneFiche glyphe={<Horloge />} intitule={f.horaireJour}>
            <span className="chiffre">{f.horaire}</span>
          </LigneFiche>
          <LigneFiche glyphe={<Epingle />} intitule="Adresse">
            <span className="text-gris">{f.adresse}</span>
          </LigneFiche>
          <LigneFiche glyphe={<Combine />} intitule="Téléphone">
            <span className="chiffre text-gris">{f.telephone}</span>
          </LigneFiche>
        </dl>

        {/* La ligne qui manque. Le barré dit l'absence ; le gris reste lisible. */}
        <p className="flex items-center gap-2.5 border-t border-filet py-2.5 text-[0.8125rem]">
          <span className="grid w-4 shrink-0 place-items-center text-gris">
            <Globe />
          </span>
          <span className="text-gris line-through decoration-gris">
            {M.lienGrise}
          </span>
        </p>
      </div>
    </article>
  );
}

function LigneFiche({
  glyphe,
  intitule,
  children,
}: {
  glyphe: React.ReactNode;
  intitule: string;
  children: React.ReactNode;
}) {
  return (
    // Un <dl> ne doit contenir que des couples dt/dd : le glyphe vit donc
    // dans le <dt>, et non à côté.
    <div className="flex items-baseline gap-2.5 border-t border-filet py-2.5 first:border-t-0">
      <dt className="flex shrink-0 items-baseline gap-2.5 font-medium">
        <span className="grid w-4 shrink-0 translate-y-[2px] place-items-center text-gris">
          {glyphe}
        </span>
        {intitule}
      </dt>
      <dd className="ml-auto text-right">{children}</dd>
    </div>
  );
}

/* -- Le connecteur ------------------------------------------------------- */

function Connecteur() {
  return (
    <div
      className="relative grid h-14 place-items-center"
      aria-hidden="true"
    >
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-filet" />
      <span className="relative flex items-center gap-1.5 rounded-[4px] border border-filet bg-papier px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-gris">
        <span className="chiffre">{M.connecteur}</span>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M4.5 1v7M1.6 5.4 4.5 8.3l2.9-2.9"
            stroke="var(--color-ambre)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

/* -- Carte 2 : le site construit ----------------------------------------- */

function SiteConstruit() {
  const s = M.site;
  return (
    <article className="carte overflow-hidden">
      <EnTeteCarte libelle={M.apres} accent />

      {/* Barre d'adresse du navigateur, réduite au strict nécessaire. */}
      <div className="flex items-center gap-1.5 border-b border-filet bg-fond px-4 py-2">
        <Cadenas />
        <span className="text-[0.6875rem] text-gris">{s.domaine}</span>
      </div>

      <div className="px-4 py-4 md:px-5">
        {/* En-tête du site */}
        <div className="flex items-center justify-between gap-3 border-b border-filet pb-3">
          <span
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {M.fiche.nom}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="hidden gap-2.5 text-[0.625rem] text-gris sm:flex">
              {s.nav.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
            <span className="rounded-[3px] bg-ambre px-1.5 py-[3px] text-[0.625rem] font-semibold text-encre">
              {s.bouton}
            </span>
          </div>
        </div>

        {/* Héros du site */}
        <div className="pt-3.5">
          <p
            className="text-[0.9375rem] font-bold leading-[1.2] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s.titre}
          </p>
          <p className="mt-1.5 text-[0.6875rem] leading-snug text-gris">
            {s.accroche}
          </p>

          <div className="mt-3 flex items-center gap-1.5 border-y border-filet py-2">
            <Etoiles note={4.8} petit />
            <span className="chiffre text-[0.625rem] text-gris">
              {s.preuve}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {s.prestations.map((p) => (
              <div
                key={p}
                className="rounded-[3px] border border-filet px-1.5 py-2.5 text-center text-[0.625rem] font-medium"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* -- Pièces partagées ---------------------------------------------------- */

function EnTeteCarte({
  libelle,
  accent = false,
}: {
  libelle: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-filet px-4 py-2 md:px-5">
      <span
        className="text-[0.6875rem] font-semibold uppercase tracking-[0.09em]"
        style={{
          color: accent ? "var(--color-ambre-texte)" : "var(--color-gris)",
        }}
      >
        {libelle}
      </span>
      <span className="text-[0.6875rem] uppercase tracking-[0.09em] text-gris">
        {M.etiquette}
      </span>
    </div>
  );
}

/**
 * Cinq étoiles, la note en remplissage partiel. Deux passes superposées
 * plutôt qu'une demi-étoile approximative : 4,8 sur 5 fait 96 % de largeur.
 */
function Etoiles({ note, petit = false }: { note: number; petit?: boolean }) {
  const cote = petit ? 8 : 10;
  const total = cote * 5 + 4 * 1.5;
  return (
    <span
      className="relative inline-block shrink-0"
      style={{ width: total, height: cote }}
      aria-hidden="true"
    >
      <RangeeEtoiles cote={cote} couleur="var(--color-filet)" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${(note / 5) * 100}%` }}
      >
        <RangeeEtoiles cote={cote} couleur="var(--color-ambre)" />
      </span>
    </span>
  );
}

function RangeeEtoiles({ cote, couleur }: { cote: number; couleur: string }) {
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

function Horloge() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6 3.4V6l2 1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Epingle() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 11S1.8 7.6 1.8 4.9a4.2 4.2 0 1 1 8.4 0C10.2 7.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="4.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function Combine() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.4 1.4h1.6l.8 1.9-1 .7a5.6 5.6 0 0 0 2.9 2.9l.7-1 1.9.8v1.6c0 .5-.4.8-.8.8A7.5 7.5 0 0 1 1.6 2.2c0-.4.4-.8.8-.8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Globe() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1 6h10M6 1c1.4 1.4 2.1 3.1 2.1 5S7.4 12 6 11M6 1C4.6 2.4 3.9 4.1 3.9 6S4.6 12 6 11"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Cadenas() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <rect
        x="1.6"
        y="4.3"
        width="6.8"
        height="4.6"
        rx="1"
        stroke="var(--color-gris)"
        strokeWidth="1.1"
      />
      <path
        d="M3.3 4.3V3a1.7 1.7 0 0 1 3.4 0v1.3"
        stroke="var(--color-gris)"
        strokeWidth="1.1"
      />
    </svg>
  );
}
