import { TARIFS } from "@/content/tarifs";
import { Bloc } from "./Bloc";

/**
 * Accordéon natif.
 *
 * `<details>` et `<summary>`, avec l'attribut `name` qui rend l'accordéon
 * exclusif sans une ligne de JavaScript. Les réponses sont dans le HTML servi,
 * donc lisibles sans script et indexables.
 */
export function Faq() {
  return (
    <Bloc>
      <h2 className="titre mesure">{TARIFS.faq.titre}</h2>
      <div className="accordeon mt-6 max-w-[48rem]">
        {TARIFS.faq.items.map((item) => (
          <details key={item.question} name="faq">
            <summary>
              <span>{item.question}</span>
            </summary>
            <div className="reponse">{item.reponse}</div>
          </details>
        ))}
      </div>
    </Bloc>
  );
}
