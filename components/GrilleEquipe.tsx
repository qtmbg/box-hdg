import Image from "next/image";
import { EQUIPE, PAGE_EQUIPE, type Membre } from "@/content/equipe";
import { Bloc } from "./Bloc";

/**
 * Grille d'équipe.
 *
 * La grille se réduit au nombre de membres actifs. Une photo manquante sur une
 * personne réelle tombe sur ses initiales, composées en Newsreader dans le
 * même carré.
 */
export function GrilleEquipe() {
  const actifs = EQUIPE.filter((m) => m.actif && m.nom && m.role);
  if (!actifs.length) return null;

  return (
    <ul className="grid gap-[var(--marge)] sm:grid-cols-2 xl:grid-cols-3">
      {actifs.map((m) => (
        <CarteMembre key={m.nom} membre={m} />
      ))}
    </ul>
  );
}

function CarteMembre({ membre }: { membre: Membre }) {
  return (
    <li className="bloc" data-apparition>
      <div className="portrait relative aspect-[4/5] overflow-hidden rounded-[var(--rayon-petit)] bg-argile">
        {membre.photo ? (
          <Image
            src={membre.photo}
            alt={membre.nom}
            fill
            sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <Initiales nom={membre.nom} />
        )}
      </div>

      <h2 className="sous-titre mt-5">{membre.nom}</h2>
      <p className="etiquette mt-2 text-brique">{membre.role}</p>
      <p className="discret mt-3 text-[0.9375rem]">{membre.ligne}</p>
    </li>
  );
}

function Initiales({ nom }: { nom: string }) {
  const initiales = nom.split(/\s+/).slice(0, 2).map((mot) => mot[0]).join("");
  return (
    <span
      className="absolute inset-0 grid place-items-center text-[3.5rem] leading-none text-sauge"
      style={{ fontFamily: "var(--font-titre)", fontWeight: 380 }}
      aria-hidden="true"
    >
      {initiales}
    </span>
  );
}

/** Comment on travaille. */
export function MethodeEquipe() {
  return (
    <Bloc teinte="sable">
      <h2 className="titre mesure">{PAGE_EQUIPE.methode.titre}</h2>
      <p className="mt-4 mesure-large">{PAGE_EQUIPE.methode.texte}</p>
    </Bloc>
  );
}
