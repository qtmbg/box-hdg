import { ORIGINE, SITE } from "@/content/site";
import { IDENTITE, LEGAL_COMPLET } from "@/content/legal";
import { PRICING } from "@/content/pricing";
import { TARIFS } from "@/content/tarifs";
import { CERTIFICATIONS, EQUIPE } from "@/content/equipe";

export function organisation() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${ORIGINE}/#organisation`,
    name: SITE.nom,
    description: SITE.baseline,
    url: ORIGINE,
    telephone: SITE.telephone.international,
    email: SITE.email,
    areaServed: { "@type": "Country", name: "France" },
    availableLanguage: "fr",
    priceRange: `${PRICING.essentiel.achat.setup}–${PRICING.complete.achat.setup} EUR`,
    ...(LEGAL_COMPLET
      ? {
          legalName: IDENTITE.raisonSociale,
          vatID: IDENTITE.tvaIntracommunautaire,
          taxID: IDENTITE.siren,
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.adresse.ligne1,
            postalCode: SITE.adresse.codePostal,
            addressLocality: SITE.adresse.ville,
            addressCountry: "FR",
          },
        }
      : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function service({
  nom,
  description,
  chemin,
}: {
  nom: string;
  description: string;
  chemin: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nom,
    description,
    serviceType: nom,
    url: `${ORIGINE}${chemin}`,
    provider: { "@id": `${ORIGINE}/#organisation` },
    areaServed: { "@type": "Country", name: "France" },
    offers: [
      offre(PRICING.essentiel.nom, PRICING.essentiel.achat.setup),
      offre(PRICING.complete.nom, PRICING.complete.achat.setup),
    ],
  };
}

function offre(nom: string, prix: number) {
  return {
    "@type": "Offer",
    name: nom,
    price: prix,
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    url: `${ORIGINE}/tarifs`,
  };
}

export function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TARIFS.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.reponse },
    })),
  };
}

export function filDAriane(elements: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: `${ORIGINE}${e.chemin}`,
    })),
  };
}

/**
 * §13. Fiche Person pour la page équipe.
 *
 * `hasCredential` porte les attestations : celles qui ont une adresse publique
 * la déclarent, les autres sont décrites sans lien. On n'annonce jamais une
 * vérification qu'on ne peut pas fournir.
 */
export function personne() {
  const membre = EQUIPE.find((m) => m.actif && m.nom);
  if (!membre) return {};

  const diplomes = CERTIFICATIONS.organismes.flatMap((organisme) =>
    organisme.cours.map((cours) => {
      const verification = organisme.verifications?.find(
        (v) => v.titre === cours,
      );
      return {
        "@type": "EducationalOccupationalCredential",
        name: cours,
        credentialCategory: "Certificate of completion",
        recognizedBy: { "@type": "Organization", name: organisme.nom },
        ...(verification ? { url: verification.url } : {}),
      };
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: membre.nom,
    jobTitle: membre.role,
    description: membre.ligne,
    worksFor: { "@id": `${ORIGINE}/#organisation` },
    url: `${ORIGINE}/equipe`,
    hasCredential: diplomes,
  };
}
