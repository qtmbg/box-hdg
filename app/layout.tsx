import type { Metadata, Viewport } from "next";
import "./globals.css";
import { INDEXABLE, ORIGINE, SITE } from "@/content/site";
import { UI } from "@/content/commun";
import { Apparition } from "@/components/Apparition";
import { JsonLd } from "@/components/JsonLd";
import { organisation } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGINE),
  title: {
    default: `${SITE.nom} · Création de site internet pour entreprises`,
    template: `%s`,
  },
  description: SITE.baseline,
  applicationName: SITE.nom,
  authors: [{ name: SITE.nom }],
  formatDetection: { telephone: true, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nom,
    url: ORIGINE,
  },
  twitter: { card: "summary_large_image" },
  robots: INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#13322d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RacineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="preload"
          href="/fonts/schibsted-fr.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/newsreader-fr.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#contenu" className="evitement">
          {UI.allerAuContenu}
        </a>
        <main id="contenu">{children}</main>
        <Apparition />
        <JsonLd data={organisation()} />
      </body>
    </html>
  );
}
