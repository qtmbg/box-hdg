import { Section } from "@/components/Section";
import { ACTIONS, PAGE_404 } from "@/content/commun";
import { BoutonLien } from "@/components/Bouton";
import { BoutonAppel } from "@/components/BoutonAppel";

export default function Introuvable() {
  return (
    <Section filet={false}>
      <p className="sourcil">{PAGE_404.sourcil}</p>
      <h1 className="titre-1 mt-5 max-w-[30rem]">{PAGE_404.titre}</h1>
      <p className="chapo mt-6">{PAGE_404.texte}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <BoutonLien href="/tarifs">{ACTIONS.voirLesTarifs}</BoutonLien>
        <BoutonAppel variante="secondaire" />
      </div>
    </Section>
  );
}
