/**
 * Typographie française.
 *
 * Le français impose une espace avant ? ! ; : » et après «. Cette espace doit
 * être insécable, sinon la ponctuation se retrouve seule en début de ligne.
 *
 * On emploie partout l'insécable pleine (U+00A0). L'espace fine (U+202F) serait
 * la forme de haute typographie, mais ni Newsreader ni Schibsted Grotesk ne la
 * dessinent : elle déclencherait un repli sur une autre police à chaque
 * ponctuation haute.
 *
 * La transformation est appliquée une seule fois, au chargement des modules de
 * contenu, donc au build. Aucun coût à l'exécution, et les métadonnées en
 * bénéficient au même titre que le corps de page.
 */

export const NBSP = " ";
export const FINE = NBSP;

const ESPACE = "[ \\u00A0\\u202F]+";

/** Clés dont la valeur ne doit jamais être retouchée (URL, numéros, chemins). */
const CLES_BRUTES = /^(href|url|slug|image|photo|lien|id|src|telephone|nomFichier)$/i;

export function typo(texte: string): string {
  return texte
    // Apostrophe typographique. La touche du clavier produit une quote droite,
    // qui n'existe pas en typographie française : « l'équipe » se compose
    // « l’équipe ». Seule l'apostrophe entre deux lettres est convertie.
    .replace(/(\p{L})'(\p{L})/gu, "$1’$2")
    .replace(new RegExp(`${ESPACE}([?!;])`, "g"), `${FINE}$1`)
    .replace(new RegExp(`${ESPACE}:`, "g"), `${NBSP}:`)
    .replace(new RegExp(`«${ESPACE}`, "g"), `«${NBSP}`)
    .replace(new RegExp(`${ESPACE}»`, "g"), `${NBSP}»`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`)
    .replace(/(\d) (€|%|h\b|j\b)/g, `$1${NBSP}$2`);
}

type Valeur =
  | string
  | number
  | boolean
  | null
  | undefined
  | Valeur[]
  | { [k: string]: Valeur };

/** Applique `typo` récursivement à toutes les chaînes d'un objet de contenu. */
export function fr<T>(valeur: T): T {
  return appliquer(valeur as Valeur) as T;
}

function appliquer(valeur: Valeur): Valeur {
  if (typeof valeur === "string") return typo(valeur);
  if (Array.isArray(valeur)) return valeur.map(appliquer);
  if (valeur && typeof valeur === "object") {
    const sortie: Record<string, Valeur> = {};
    for (const [cle, v] of Object.entries(valeur)) {
      sortie[cle] = CLES_BRUTES.test(cle) ? v : appliquer(v);
    }
    return sortie;
  }
  return valeur;
}
