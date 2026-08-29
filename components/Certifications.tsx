import { CERTIFICATIONS } from "@/content/equipe";

const C = CERTIFICATIONS;

/**
 * §10 — Bloc des formations certifiées.
 *
 * Le nombre et les organismes sont visibles d'emblée ; les vingt-trois
 * intitulés vivent dans un `<details>` natif, le même dispositif que la FAQ.
 * Un prospect démarché n'a pas à traverser un curriculum pour trouver un prix,
 * et celui qui veut vérifier trouve tout en un clic.
 */
export function Certifications() {
  return (
    <div className="encadre mt-5 max-w-[46rem]" data-apparition>
      <h3 className="titre-3">{C.titre}</h3>
      <p className="mt-3 text-base text-gris">{C.intro}</p>

      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-filet pt-5">
        {C.organismes.map((o) => (
          <li key={o.nom} className="flex items-baseline gap-2.5">
            <span
              data-prix
              className="text-[1.375rem] font-semibold leading-none"
            >
              {o.nombre}
            </span>
            <span className="text-base text-gris">{o.nom}</span>
          </li>
        ))}
      </ul>

      <div className="accordeon mt-5">
        <details>
          <summary>
            <span className="!text-base font-medium">{C.detailsLibelle}</span>
          </summary>
          <div className="reponse">
            {C.organismes.map((o) => (
              <div key={o.nom} className="mb-5 last:mb-0">
                <h4 className="sourcil !text-encre">{o.nom}</h4>
                <ul className="mt-2.5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {o.cours.map((cours) => {
                    const lien = o.verifications?.find(
                      (v) => v.titre === cours,
                    );
                    return (
                      <li
                        key={cours}
                        className="flex flex-wrap items-baseline gap-x-2.5 text-base"
                        lang="en"
                      >
                        <span className="text-encre">{cours}</span>
                        {lien ? (
                          <a
                            href={lien.url}
                            lang="fr"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-sm underline decoration-ambre underline-offset-4"
                          >
                            {C.verifierLibelle} →
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

      <p className="mt-4 text-sm text-gris">
        {C.note}
      </p>
    </div>
  );
}
