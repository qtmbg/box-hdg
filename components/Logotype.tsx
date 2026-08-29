/**
 * Logotype Box-HDG.
 *
 * Schibsted Grotesk, graisse 600, interlettrage resserré. Il se pose en haut
 * de la colonne d'identité et nulle part ailleurs. Un logotype qui se répète
 * dans chaque bloc perd sa fonction.
 */
export function Logotype({ ton = "encre" }: { ton?: "encre" | "craie" }) {
  return (
    <span
      className="inline-block select-none text-[0.9375rem] font-semibold tracking-[-0.02em]"
      style={{
        fontFamily: "var(--font-texte)",
        color: ton === "craie" ? "var(--color-craie)" : "var(--color-ardoise)",
      }}
    >
      Box-HDG
    </span>
  );
}
