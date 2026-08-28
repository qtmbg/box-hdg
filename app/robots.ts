import type { MetadataRoute } from "next";
import { ORIGINE } from "@/content/site";
import { LEGAL_COMPLET } from "@/content/legal";

export default function robots(): MetadataRoute.Robots {
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
