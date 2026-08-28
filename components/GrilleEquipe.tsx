import Image from "next/image";
import { EQUIPE, PAGE_EQUIPE, type Membre } from "@/content/equipe";

/**
 * §10 — Grille d'équipe.
 *
 * La grille se réduit au nombre de membres actifs : aucune carte fantôme,
 * aucune silhouette, aucun « Nous recrutons ». Une photo manquante sur une
 * personne réelle tombe sur ses initiales, en Archivo, dans le même carré.
 */
export function GrilleEquipe() {
  const actifs = EQUIPE.filter((m) => m.actif && m.nom && m.role);

  return (
    <div>
      {actifs.length ? (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-7">
          {actifs.map((m) => (
            <CarteMembre key={m.nom} membre={m} />
          ))}
        </ul>
      ) : null}

      <div className="encadre mt-11 max-w-[46rem] md:mt-14" data-apparition>
        <h3 className="titre-3">{PAGE_EQUIPE.methode.titre}</h3>
        <p className="mt-3 text-base text-gris">{PAGE_EQUIPE.methode.texte}</p>
      </div>
    </div>
  );
}

function CarteMembre({ membre }: { membre: Membre }) {
  return (
    <li data-apparition>
      <div className="portrait relative aspect-square overflow-hidden rounded-[4px] border border-filet bg-fond">
        {membre.photo ? (
          <Image
            src={membre.photo}
            alt={membre.nom}
            fill
            sizes="(min-width: 768px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <Initiales nom={membre.nom} />
        )}
      </div>

      <h2
        className="mt-4 text-[1.125rem] leading-snug tracking-[-0.015em]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {membre.nom}
      </h2>
      <p
        className="mt-1.5 text-xs font-semibold uppercase tracking-[0.08em]"
        style={{ color: "var(--color-ambre-texte)" }}
      >
        {membre.role}
      </p>
      <p className="mt-2.5 text-base text-gris">{membre.ligne}</p>
    </li>
  );
}

function Initiales({ nom }: { nom: string }) {
  const initiales = nom
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => mot[0])
    .join("");

  return (
    <span
      className="absolute inset-0 grid place-items-center text-[2.75rem] leading-none"
      style={{
        color: "var(--color-barre)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
      }}
      aria-hidden="true"
    >
      {initiales}
    </span>
  );
}
