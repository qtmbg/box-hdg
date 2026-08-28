import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

/**
 * §13 — Carte Open Graph, 1200 × 630, générée au build.
 *
 * Logotype BOX-HDG sur encre, titre de page en Archivo, filet ambre. Rien
 * d'autre : aucune illustration à produire, aucune image à maintenir, et une
 * carte qui reste lisible dans une conversation WhatsApp.
 */

export const taille = { width: 1200, height: 630 };
export const typeContenu = "image/png";

let polices: { archivo: ArrayBuffer; inter: ArrayBuffer } | null = null;

async function chargerPolices() {
  if (polices) return polices;
  const base = path.join(process.cwd(), "assets", "fonts");
  const [archivo, inter] = await Promise.all([
    readFile(path.join(base, "archivo-700.woff")),
    readFile(path.join(base, "inter-500.woff")),
  ]);
  polices = {
    archivo: archivo.buffer.slice(
      archivo.byteOffset,
      archivo.byteOffset + archivo.byteLength,
    ) as ArrayBuffer,
    inter: inter.buffer.slice(
      inter.byteOffset,
      inter.byteOffset + inter.byteLength,
    ) as ArrayBuffer,
  };
  return polices;
}

export async function carteOG(titre: string, surtitre?: string) {
  const { archivo, inter } = await chargerPolices();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14202E",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "Archivo",
              fontSize: 34,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            BOX
          </span>
          <span
            style={{
              width: 16,
              height: 4,
              marginBottom: 3,
              backgroundColor: "#FFFFFF",
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "Archivo",
              fontSize: 34,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              display: "flex",
            }}
          >
            HDG
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 96,
              height: 4,
              backgroundColor: "#E8930C",
              marginBottom: 36,
              display: "flex",
            }}
          />
          {surtitre ? (
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.62)",
                marginBottom: 22,
                display: "flex",
              }}
            >
              {surtitre}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: "Archivo",
              fontSize: titre.length > 58 ? 58 : 72,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {titre}
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.62)",
            display: "flex",
          }}
        >
          {SITE.baseline}
        </div>
      </div>
    ),
    {
      ...taille,
      fonts: [
        { name: "Archivo", data: archivo, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
