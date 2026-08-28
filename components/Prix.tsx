import { NBSP } from "@/lib/fr";

/**
 * Bloc de prix.
 *
 * Le montant domine, la mention légale suit. Chiffres tabulaires : basculer
 * d'un mode de paiement à l'autre ne doit pas faire sauter la mise en page
 * d'un demi-pixel.
 */
export function Prix({
  montant,
  suffixe,
  note,
  taille = "grand",
}: {
  montant: number;
  suffixe: string;
  note?: string;
  taille?: "grand" | "moyen";
}) {
  const corps = taille === "grand" ? "text-[2.25rem]" : "text-[1.75rem]";
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          data-prix
          className={`${corps} font-semibold leading-none tracking-[-0.02em]`}
        >
          {montant.toLocaleString("fr-FR").replace(/[  \s]/g, NBSP)}
          {NBSP}€
        </span>
        <span className="text-base font-medium text-gris">{suffixe}</span>
      </p>
      {note ? <p className="mt-2 text-base text-gris">{note}</p> : null}
    </div>
  );
}
