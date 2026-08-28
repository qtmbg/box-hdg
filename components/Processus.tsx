import { PROCESSUS } from "@/content/commun";

/**
 * §5.5 — Comment ça se passe.
 *
 * La numérotation est légitime : c'est une séquence réelle, du premier appel à
 * la mise en ligne. Le filet horizontal porte un repère ambre par étape — la
 * même grammaire que le reste du site, un filet de 1 px et rien d'autre.
 */
export function Processus({ titre = true }: { titre?: boolean }) {
  return (
    <div>
      {titre ? (
        <h2 className="titre-2 max-w-[34rem]" data-apparition>
          {PROCESSUS.titre}
        </h2>
      ) : null}

      <ol className={`grid gap-y-9 md:grid-cols-4 md:gap-x-8 ${titre ? "mt-11" : ""}`}>
        {PROCESSUS.etapes.map((etape, i) => (
          <li key={etape.titre} className="relative" data-apparition>
            {/* Le filet et son repère : la séquence, dessinée. */}
            <div className="relative mb-5 h-px bg-filet" aria-hidden="true">
              <span className="absolute left-0 top-1/2 block h-[5px] w-[5px] -translate-y-1/2 bg-ambre" />
            </div>
            <p
              className="chiffre text-[1.75rem] leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              {i + 1}
            </p>
            <h3 className="titre-3 mt-3 text-[1.25rem] md:text-[1.375rem]">
              {etape.titre}
            </h3>
            <p className="mt-2.5 text-base text-gris">{etape.texte}</p>
          </li>
        ))}
      </ol>

      <div className="encadre mt-11" data-apparition>
        <p className="max-w-[46rem] text-base">
          <strong className="font-semibold">
            {PROCESSUS.engagementLabel}&#160;:{" "}
          </strong>
          {PROCESSUS.engagementTexte}
        </p>
      </div>
    </div>
  );
}
