import { NBSP } from "./fr";

/** 1390 → « 1 390 € », espaces insécables comprises. */
export function euros(montant: number): string {
  return `${montant.toLocaleString("fr-FR").replace(/[\u00A0\u202F\s]/g, NBSP)}${NBSP}€`;
}

/** 1390 → « 1 390 € HT ». */
export function eurosHT(montant: number): string {
  return `${euros(montant)}${NBSP}HT`;
}

/** 29 → « 29 € HT / mois ». */
export function parMois(montant: number): string {
  return `${eurosHT(montant)} / mois`;
}

/** 1500, 3500 → « 1 500 – 3 500 € ». Tiret demi-cadratin, comme en édition. */
export function fourchetteEuros(min: number, max: number): string {
  return `${min.toLocaleString("fr-FR").replace(/[\u00A0\u202F\s]/g, NBSP)}${NBSP}–${NBSP}${euros(max)}`;
}

export function fourchetteSemaines(min: number, max: number): string {
  return `${min}${NBSP}à${NBSP}${max} semaines`;
}
