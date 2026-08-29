import { Page } from "@/components/Page";
import { Bloc } from "@/components/Bloc";
import { BoutonLien, BoutonAppel } from "@/components/Bouton";
import { ACTIONS, PAGE_404 } from "@/content/commun";

export default function Introuvable() {
  return (
    <Page titre={PAGE_404.titre} chapo={PAGE_404.sourcil}>
      <Bloc apparition={false}>
        <p className="chapo mesure-large">{PAGE_404.texte}</p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <BoutonLien href="/tarifs">{ACTIONS.voirLesTarifs}</BoutonLien>
          <BoutonAppel style="trait" />
        </div>
      </Bloc>
    </Page>
  );
}
