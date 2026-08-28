/**
 * Données structurées. Sérialisées côté serveur, sans dépendance.
 * Les `<` sont échappés : un contenu éditorial ne doit jamais pouvoir fermer
 * la balise script.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocs.map((bloc, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bloc).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
