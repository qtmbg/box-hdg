import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(import.meta.dirname) },
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    // La feuille de style est injectée dans le HTML : un aller-retour réseau
    // de moins avant le premier rendu, sur une page dont le CSS complet pèse
    // moins de 8 kB compressé.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
