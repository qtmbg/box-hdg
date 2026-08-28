/**
 * Logotype BOX-HDG.
 *
 * Archivo 700, interlettrage -0,03em. Le trait d'union est dessiné et non
 * composé : le tiret d'Archivo est court et fin, et dans un logotype en
 * capitales resserrées il se lit comme une poussière. Un filet de 0,105em,
 * relevé au milieu optique des capitales, tient la ligne.
 *
 * Le corps est porté par une classe et non par un style en ligne : l'en-tête
 * doit pouvoir le réduire sous 400 px de large, où chaque pixel compte.
 */
export function Logotype({
  taille = "normal",
  ton = "encre",
}: {
  taille?: "normal" | "grand";
  ton?: "encre" | "papier";
}) {
  return (
    <span
      className={`logotype ${taille === "grand" ? "logotype-grand" : ""} ${
        ton === "papier" ? "logotype-papier" : ""
      }`.trim()}
    >
      BOX
      <span aria-hidden="true" className="logotype-trait" />
      HDG
    </span>
  );
}
