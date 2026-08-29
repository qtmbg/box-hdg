import { ACCUEIL } from "@/content/accueil";
import { PRICING } from "@/content/pricing";
import { MENTION_HT, UI } from "@/content/commun";
import { euros, fourchetteEuros, fourchetteSemaines } from "@/lib/format";
import { NBSP } from "@/lib/fr";

const C = ACCUEIL.comparaison;
const m = PRICING.marche;

/**
 * Le module de comparaison.
 *
 * Le prix agressif est le produit. Le site le montre donc comme une donnée.
 * Trois échelles, quatre lignes, des barres en CSS, aucune bibliothèque de
 * graphiques.
 *
 * Lecture : la barre part de zéro et s'arrête au haut de la fourchette, le
 * repère clair marque le bas, et l'échelle de chaque groupe est le plafond
 * relevé sur le marché. Une barre pleine largeur vaut donc le prix le plus
 * élevé qu'on ait constaté. La barre brique est la nôtre.
 *
 * Chaque valeur est aussi imprimée en clair à droite de sa barre. Le graphique
 * appuie la lecture ; le chiffre la porte.
 */

type Ligne = {
  nom: string;
  min?: number;
  max?: number;
  valeur?: number;
  texte: string;
  nous?: boolean;
  indefini?: boolean;
};

type Groupe = { cle: string; titre: string; echelle: number; echelleTexte: string; lignes: Ligne[] };

const groupes: Groupe[] = [
  {
    cle: "initial",
    titre: C.colonnes.initial,
    echelle: m.agenceSetupMax,
    echelleTexte: euros(m.agenceSetupMax),
    lignes: [
      { nom: C.lignes.agence, min: m.agenceSetupMin, max: m.agenceSetupMax, texte: fourchetteEuros(m.agenceSetupMin, m.agenceSetupMax) },
      { nom: C.lignes.freelance, min: m.freelanceSetupMin, max: m.freelanceSetupMax, texte: fourchetteEuros(m.freelanceSetupMin, m.freelanceSetupMax) },
      { nom: C.lignes.abonnement, min: m.abonnementSetupMin, max: m.abonnementSetupMax, texte: fourchetteEuros(m.abonnementSetupMin, m.abonnementSetupMax) },
      { nom: C.lignes.boxhdg, valeur: PRICING.essentiel.achat.setup, texte: euros(PRICING.essentiel.achat.setup), nous: true },
    ],
  },
  {
    cle: "mensuel",
    titre: C.colonnes.mensuel,
    echelle: m.agenceMensuelMax,
    echelleTexte: euros(m.agenceMensuelMax),
    lignes: [
      { nom: C.lignes.agence, min: m.agenceMensuelMin, max: m.agenceMensuelMax, texte: fourchetteEuros(m.agenceMensuelMin, m.agenceMensuelMax) },
      { nom: C.lignes.freelance, texte: C.variable, indefini: true },
      { nom: C.lignes.abonnement, min: m.abonnementMensuelMin, max: m.abonnementMensuelMax, texte: fourchetteEuros(m.abonnementMensuelMin, m.abonnementMensuelMax) },
      { nom: C.lignes.boxhdg, valeur: PRICING.essentiel.achat.mensuel, texte: euros(PRICING.essentiel.achat.mensuel), nous: true },
    ],
  },
  {
    cle: "delai",
    titre: C.colonnes.delai,
    echelle: m.delaiSemainesMax,
    echelleTexte: `${m.delaiSemainesMax}${NBSP}semaines`,
    lignes: [
      { nom: C.lignes.agence, min: m.delaiSemainesMin, max: m.delaiSemainesMax, texte: fourchetteSemaines(m.delaiSemainesMin, m.delaiSemainesMax) },
      { nom: C.lignes.freelance, min: m.freelanceDelaiSemainesMin, max: m.freelanceDelaiSemainesMax, texte: fourchetteSemaines(m.freelanceDelaiSemainesMin, m.freelanceDelaiSemainesMax) },
      { nom: C.lignes.abonnement, min: m.abonnementDelaiSemainesMin, max: m.abonnementDelaiSemainesMax, texte: fourchetteSemaines(m.abonnementDelaiSemainesMin, m.abonnementDelaiSemainesMax) },
      // Cinq jours ouvrés font une semaine : l'échelle reste honnête.
      { nom: C.lignes.boxhdg, valeur: 1, texte: `5${NBSP}jours`, nous: true },
    ],
  },
];

export function Comparaison() {
  return (
    <div className="mt-10 md:mt-12">
      <div className="grid gap-10 md:gap-12">
        {groupes.map((g) => (
          <GroupeBarres key={g.cle} groupe={g} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem]">
          <li className="flex items-center gap-2.5">
            <span className="relative block h-2.5 w-9 rounded-full bg-sauge">
              <span className="absolute inset-y-0 left-[30%] w-[2px] bg-sable" />
            </span>
            <span className="discret">{C.legende.fourchette}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="block h-2.5 w-9 rounded-full bg-brique" />
            <span className="discret">{C.legende.nous}</span>
          </li>
        </ul>
        <p className="discret max-w-[28rem] text-[0.875rem] md:text-right">{C.note}</p>
      </div>

      <p className="discret mt-3 text-[0.875rem]">{MENTION_HT}</p>
    </div>
  );
}

function GroupeBarres({ groupe }: { groupe: Groupe }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="etiquette">{groupe.titre}</h3>
        <p className="chiffre text-[0.875rem] text-sauge">
          <span className="hidden sm:inline">{UI.echelle}&#160;: </span>0 à{" "}
          {groupe.echelleTexte}
        </p>
      </div>

      <ul className="mt-3">
        {groupe.lignes.map((l) => (
          <LigneBarre key={l.nom} ligne={l} echelle={groupe.echelle} />
        ))}
      </ul>
    </div>
  );
}

function LigneBarre({ ligne, echelle }: { ligne: Ligne; echelle: number }) {
  const haut = ligne.nous ? ligne.valeur! : (ligne.max ?? 0);
  const bas = ligne.min ?? 0;
  const largeur = `${Math.max((haut / echelle) * 100, 1)}%`;

  return (
    <li className="py-3.5 md:grid md:grid-cols-[minmax(0,12rem)_1fr_minmax(0,10rem)] md:items-center md:gap-5">
      <div className="flex items-baseline justify-between gap-4 md:block">
        <span className={ligne.nous ? "font-semibold" : ""}>{ligne.nom}</span>
        <span
          data-prix
          className={`shrink-0 md:hidden ${ligne.nous ? "font-semibold" : "discret"}`}
        >
          {ligne.texte}
        </span>
      </div>

      <div className="mt-2.5 md:mt-0">
        {ligne.indefini ? (
          <span
            className="block h-2.5 rounded-full border border-dashed border-ardoise/25"
            aria-hidden="true"
          />
        ) : (
          <span
            className="relative block h-2.5 rounded-full bg-ardoise/10"
            aria-hidden="true"
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: largeur,
                backgroundColor: ligne.nous ? "var(--color-brique)" : "var(--color-sauge)",
              }}
            />
            {!ligne.nous && bas > 0 ? (
              <span
                className="absolute inset-y-0 w-[2px] bg-sable"
                style={{ left: `${(bas / echelle) * 100}%` }}
              />
            ) : null}
          </span>
        )}
      </div>

      <span
        data-prix
        className={`hidden text-right md:block ${ligne.nous ? "font-semibold" : "discret"}`}
      >
        {ligne.texte}
      </span>
    </li>
  );
}
