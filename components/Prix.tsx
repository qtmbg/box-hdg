import { NBSP } from "@/lib/fr";

/**
 * Bloc de prix.
 *
 * Le montant est composé en Newsreader, au corps d'un grand titre. Le suffixe
 * légal suit en grotesque, plus petit. Chiffres tabulaires : passer d'un mode
 * de paiement à l'autre ne doit rien déplacer.
 */
export function Prix({
  montant,
  suffixe,
  note,
}: {
  montant: number;
  suffixe: string;
  note?: string;
}) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2.5">
        <span
          data-prix
          className="text-[2.75rem] leading-none"
          style={{ fontFamily: "var(--font-titre)", fontWeight: 360 }}
        >
          {montant.toLocaleString("fr-FR").replace(/[  \s]/g, NBSP)}
          {NBSP}€
        </span>
        <span className="text-[0.9375rem] font-medium opacity-75">{suffixe}</span>
      </p>
      {note ? <p className="mt-2.5 text-[0.9375rem] opacity-75">{note}</p> : null}
    </div>
  );
}
