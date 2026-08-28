import { carteOG, taille, typeContenu } from "@/lib/og";
import { CREATION } from "@/content/offres";

export const size = taille;
export const contentType = typeContenu;
export const alt = CREATION.titre;

export default function Image() {
  return carteOG(CREATION.titre, "Création de site");
}
