import { carteOG, taille, typeContenu } from "@/lib/og";
import { REFONTE } from "@/content/offres";

export const size = taille;
export const contentType = typeContenu;
export const alt = REFONTE.titre;

export default function Image() {
  return carteOG(REFONTE.titre, "Refonte de site");
}
