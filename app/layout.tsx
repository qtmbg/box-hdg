import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ORIGINE, SITE } from "@/content/site";
import { UI } from "@/content/commun";
import { EnTete } from "@/components/EnTete";
import { PiedDePage } from "@/components/PiedDePage";
import { Apparition } from "@/components/Apparition";
import { JsonLd } from "@/components/JsonLd";
import { organisation } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGINE),
  title: {
    default: `${SITE.nom} — Création de site internet pour entreprises`,
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14202e",
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
        {/* La police du corps est préchargée : elle porte le LCP. */}
        <link
          rel="preload"
          href="/fonts/inter-fr.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/archivo-fr.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#contenu" className="evitement">
          {UI.allerAuContenu}
        </a>
        <EnTete />
        <main id="contenu">{children}</main>
        <PiedDePage />
        <Apparition />
        <JsonLd data={organisation()} />
      </body>
    </html>
  );
}
