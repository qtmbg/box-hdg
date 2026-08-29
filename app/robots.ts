import type { MetadataRoute } from "next";
import { INDEXABLE, ORIGINE } from "@/content/site";
import { LEGAL_COMPLET } from "@/content/legal";

export default function robots(): MetadataRoute.Robots {
  // Recette ou identité légale incomplète : on ferme tout, sans exception.
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: LEGAL_COMPLET ? [] : ["/mentions-legales"],
    },
    sitemap: `${ORIGINE}/sitemap.xml`,
    host: ORIGINE,
  };
}
