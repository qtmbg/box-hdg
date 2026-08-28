import { carteOG, taille, typeContenu } from "@/lib/og";
import { ACCUEIL } from "@/content/accueil";

export const size = taille;
export const contentType = typeContenu;
export const alt = ACCUEIL.hero.titre;

export default function Image() {
  return carteOG(ACCUEIL.hero.titre);
}
