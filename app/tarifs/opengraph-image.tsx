import { carteOG, taille, typeContenu } from "@/lib/og";

export const size = taille;
export const contentType = typeContenu;
export const alt = "Tarifs Box-HDG";

export default function Image() {
  return carteOG("Deux formules. Deux façons de payer.", "Tarifs");
}
