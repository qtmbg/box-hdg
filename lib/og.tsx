import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

/**
 * §13. Carte Open Graph, 1200 × 630, générée au build.
 *
 * Logotype BOX-HDG sur encre, titre de page en Archivo, filet ambre. Rien
 * d'autre : aucune illustration à produire, aucune image à maintenir, et une
 * carte qui reste lisible dans une conversation WhatsApp.
 */

export const taille = { width: 1200, height: 630 };
export const typeContenu = "image/png";

let polices: { serif: ArrayBuffer; grotesque: ArrayBuffer } | null = null;

async function chargerPolices() {
  if (polices) return polices;
  const base = path.join(process.cwd(), "assets", "fonts");
  const [serif, grotesque] = await Promise.all([
    readFile(path.join(base, "newsreader-400.woff")),
    readFile(path.join(base, "schibsted-500.woff")),
  ]);
  polices = {
    serif: serif.buffer.slice(
      serif.byteOffset,
      serif.byteOffset + serif.byteLength,
    ) as ArrayBuffer,
    grotesque: grotesque.buffer.slice(
      grotesque.byteOffset,
      grotesque.byteOffset + grotesque.byteLength,
    ) as ArrayBuffer,
  };
  return polices;
}

export async function carteOG(titre: string, surtitre?: string) {
  const { serif, grotesque } = await chargerPolices();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#F4EFE4",
          padding: 20,
          gap: 20,
          fontFamily: "Schibsted",
        }}
      >
        {/* La colonne d'identité, comme sur le site. */}
        <div
          style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#EEA749",
            borderRadius: 26,
            padding: 36,
            color: "#13322D",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Box-HDG
          </span>
          <span style={{ fontSize: 21, lineHeight: 1.35, display: "flex" }}>
            {SITE.baseline}
          </span>
        </div>

        {/* Le bloc de titre. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            borderRadius: 26,
            padding: 56,
          }}
        >
          {surtitre ? (
            <div
              style={{
                fontSize: 20,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C0431C",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {surtitre}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}

          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: titre.length > 52 ? 60 : 74,
              lineHeight: 1.06,
              letterSpacing: "-0.018em",
              color: "#13322D",
              display: "flex",
            }}
          >
            {titre}
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#4A605A",
              display: "flex",
            }}
          >
            {SITE.telephone.affichage}
          </div>
        </div>
      </div>
    ),
    {
      ...taille,
      fonts: [
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
        { name: "Schibsted", data: grotesque, weight: 500, style: "normal" },
      ],
    },
  );
}
