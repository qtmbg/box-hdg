import { SITE } from "@/content/site";
import { ACTIONS } from "@/content/commun";

/**
 * Le bouton d'appel. C'est l'élément de conversion du site : il existe dans le
 * bandeau, dans le héros, au pied de chaque page et dans la barre mobile fixe.
 * Un seul composant, pour qu'il ne dérive jamais d'un endroit à l'autre.
 */
export function BoutonAppel({
  variante = "principal",
  numeroSeul = false,
  className = "",
}: {
  variante?: "principal" | "secondaire";
  numeroSeul?: boolean;
  className?: string;
}) {
  return (
    <a
      href={SITE.telephone.lien}
      className={`bouton bouton-${variante} ${className}`.trim()}
      data-appel
    >
      {numeroSeul ? (
        <span className="chiffre">{SITE.telephone.affichage}</span>
      ) : (
        <>
          <span>{ACTIONS.appeler}</span>
          <span className="chiffre">{SITE.telephone.affichage}</span>
        </>
      )}
    </a>
  );
}
