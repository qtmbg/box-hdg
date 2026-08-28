import { TARIFS } from "@/content/tarifs";

/**
 * §6.7 — Accordéon.
 *
 * `<details>` et `<summary>` natifs, avec l'attribut `name` qui rend
 * l'accordéon exclusif sans une ligne de JavaScript. Le contenu des réponses
 * est dans le HTML servi : il est indexable et lisible sans script.
 */
export function Faq() {
  return (
    <div className="mt-10 md:mt-12">
      <div className="accordeon max-w-[52rem]" data-apparition>
        {TARIFS.faq.items.map((item) => (
          <details key={item.question} name="faq">
            <summary>
              <span>{item.question}</span>
            </summary>
            <div className="reponse">{item.reponse}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
