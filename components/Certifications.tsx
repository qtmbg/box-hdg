import { CERTIFICATIONS } from "@/content/equipe";
import { Bloc } from "./Bloc";

const C = CERTIFICATIONS;

/**
 * Formations certifiées.
 *
 * Le nombre et les organismes se lisent d'emblée. Les vingt-trois intitulés
 * vivent dans un `<details>` natif, le même dispositif que la FAQ : un
 * prospect démarché cherche un prix, celui qui veut vérifier ouvre le bloc et
 * trouve tout, liens de vérification compris.
 */
export function Certifications() {
  return (
    <Bloc teinte="craie">
      <h2 className="titre mesure">{C.titre}</h2>
      <p className="discret mt-4 mesure-large">{C.intro}</p>

      <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        {C.organismes.map((o) => (
          <li key={o.nom} className="flex items-baseline gap-3">
            <span
              data-prix
              className="text-[2.25rem] leading-none"
              style={{ fontFamily: "var(--font-titre)", fontWeight: 360 }}
            >
              {o.nombre}
            </span>
            <span className="discret">{o.nom}</span>
          </li>
        ))}
      </ul>

      <div className="accordeon mt-8">
        <details>
          <summary>
            <span className="!text-[1.0625rem]" style={{ fontFamily: "var(--font-texte)", fontWeight: 500 }}>
              {C.detailsLibelle}
            </span>
          </summary>
          <div className="reponse">
            {C.organismes.map((o) => (
              <div key={o.nom} className="mb-6 last:mb-0">
                <h3 className="etiquette text-ardoise">{o.nom}</h3>
                <ul className="mt-3 grid gap-x-10 gap-y-1.5 sm:grid-cols-2">
                  {o.cours.map((cours) => {
                    const lien = o.verifications?.find((v) => v.titre === cours);
                    return (
                      <li key={cours} className="flex flex-wrap items-baseline gap-x-2.5" lang="en">
                        <span className="text-ardoise">{cours}</span>
                        {lien ? (
                          <a
                            href={lien.url}
                            lang="fr"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="lien text-[0.875rem]"
                          >
                            {C.verifierLibelle}
                          </a>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>

      <p className="discret mt-6 text-[0.875rem]">{C.note}</p>
    </Bloc>
  );
}
