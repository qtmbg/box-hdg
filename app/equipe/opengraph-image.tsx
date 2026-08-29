import { carteOG, taille, typeContenu } from "@/lib/og";

export const size = taille;
export const contentType = typeContenu;
export const alt = "L'équipe Box-HDG";

export default function Image() {
  return carteOG("Vous savez qui construit votre site.", "L'équipe");
}
