import { PROCESSUS } from "@/content/commun";
import { Bloc } from "./Bloc";

/**
 * Comment ça se passe.
 *
 * La numérotation vaut ici parce qu'il s'agit d'une vraie séquence, du premier
 * appel à la mise en ligne. Le chiffre est composé en Newsreader, au corps
 * d'un titre : c'est lui qui donne le rythme des quatre blocs.
 */
export function Processus({ titre = true }: { titre?: boolean }) {
  return (
    <div className="pile">
      {titre ? (
        <Bloc teinte="craie">
          <h2 className="titre mesure">{PROCESSUS.titre}</h2>
        </Bloc>
      ) : null}

      <ol className="grid gap-[var(--marge)] sm:grid-cols-2 xl:grid-cols-4">
        {PROCESSUS.etapes.map((etape, i) => (
          <li
            key={etape.titre}
            className={`bloc ${i % 2 === 1 ? "bloc-sable" : ""}`}
            data-apparition
          >
            <p
              className="text-[2.75rem] leading-none text-brique"
              style={{ fontFamily: "var(--font-titre)", fontWeight: 340 }}
            >
              <span className="chiffre">{i + 1}</span>
            </p>
            <h3 className="sous-titre mt-4">{etape.titre}</h3>
            <p className="discret mt-2.5 text-[0.9375rem]">{etape.texte}</p>
          </li>
        ))}
      </ol>

      <Bloc teinte="argile">
        <p className="mesure-large">
          <strong className="font-semibold">
            {PROCESSUS.engagementLabel}&#160;:{" "}
          </strong>
          {PROCESSUS.engagementTexte}
        </p>
      </Bloc>
    </div>
  );
}
