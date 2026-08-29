import type { MetadataRoute } from "next";
import { INDEXABLE, ORIGINE, REALISATIONS_ENABLED } from "@/content/site";
import { LEGAL_COMPLET } from "@/content/legal";

/** §13 — Sitemap généré au build. Rien n'y figure qui ne soit publiable. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];

  const routes: { chemin: string; priorite: number }[] = [
    { chemin: "/", priorite: 1 },
    { chemin: "/tarifs", priorite: 0.9 },
    { chemin: "/offres", priorite: 0.7 },
    { chemin: "/offres/creation-site-internet", priorite: 0.9 },
    { chemin: "/offres/refonte-site-internet", priorite: 0.9 },
    { chemin: "/equipe", priorite: 0.5 },
    { chemin: "/contact", priorite: 0.7 },
    { chemin: "/confidentialite", priorite: 0.2 },
    { chemin: "/cgv", priorite: 0.2 },
  ];

  if (REALISATIONS_ENABLED) {
    routes.push({ chemin: "/realisations", priorite: 0.6 });
  }
  if (LEGAL_COMPLET) {
    routes.push({ chemin: "/mentions-legales", priorite: 0.2 });
  }

  const maintenant = new Date();

  return routes.map((r) => ({
    url: `${ORIGINE}${r.chemin}`,
    lastModified: maintenant,
    changeFrequency: "monthly",
    priority: r.priorite,
  }));
}
