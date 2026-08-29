#!/usr/bin/env python3
"""
Fabrication des polices auto-hébergées.

Trois opérations, dans cet ordre :

  1. récupération des fichiers variables complets depuis le dépôt google/fonts.
     Les sous-ensembles « latin » servis par l'API Google Fonts ne contiennent
     ni l'espace fine insécable (U+202F), ni la flèche (U+2192) : deux
     caractères que ce site utilise. Il faut donc partir des fichiers sources.

  2. réduction des axes variables aux valeurs réellement appelées, Inter
     400-600, Archivo 600-700, largeur figée à 100, ce qui supprime les deltas
     des graisses jamais utilisées.

  3. sous-ensemble limité au répertoire français, ponctuation typographique
     comprise. Le jeu de caractères est plus large que le texte actuel du
     site : il doit survivre à une réécriture de la copie.

Les deux familles sont sous SIL Open Font License 1.1. La licence exige que
l'avis de copyright accompagne les fichiers : elle est déposée à côté d'eux
dans public/fonts/.

Usage : python3 scripts/polices.py
Dépendances : fonttools, brotli.
"""

from __future__ import annotations

import subprocess
import sys
import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

RACINE = Path(__file__).resolve().parent.parent
SOURCES = RACINE / "assets" / "polices-sources"
SORTIE = RACINE / "public" / "fonts"

DEPOT = "https://raw.githubusercontent.com/google/fonts/main/ofl"

POLICES = [
    {
        "dossier": "newsreader",
        "fichier": "Newsreader%5Bopsz%2Cwght%5D.ttf",
        "source": "newsreader-variable.ttf",
        "sortie": "newsreader-fr",
        # L'axe optique est figé à 26. Garder l'axe coûtait 55 kB de deltas,
        # sur une famille qui compose ici entre 20 et 64 px. Le dessin choisi
        # tient les deux bouts : assez ouvert pour un chapô, assez fin pour un
        # grand titre.
        "axes": {"opsz": 26, "wght": (320, 420)},
    },
    {
        "dossier": "schibstedgrotesk",
        "fichier": "SchibstedGrotesk%5Bwght%5D.ttf",
        "source": "schibsted-variable.ttf",
        "sortie": "schibsted-fr",
        "axes": {"wght": (400, 620)},
    },
]

# ---------------------------------------------------------------------------
# Répertoire français
# ---------------------------------------------------------------------------
PLAGES: list[tuple[int, int] | int] = [
    (0x0020, 0x007E),  # ASCII imprimable
    0x00A0,  # espace insécable
    0x00A7,  # §
    0x00A9,  # ©
    0x00AB,
    0x00BB,  # « »
    0x00B0,  # °
    0x00B7,  # ·
    0x00D7,  # ×
    0x0152,
    0x0153,  # Œ œ
    0x00C6,
    0x00E6,  # Æ æ
    0x2013,  # tiret demi-cadratin, pour les intervalles chiffrés
    0x2018,
    0x2019,  # ‘ ’
    0x201C,
    0x201D,  # “ ”
    0x2020,  # †
    0x2026,  # …
    0x20AC,  # €
    0x2212,  # −
    0xFEFF,
]
PLAGES += [ord(c) for c in "àâäçèéêëîïñôöùûüÿÀÂÄÇÈÉÊËÎÏÑÔÖÙÛÜŸ"]


def unicodes() -> str:
    parties = []
    for c in PLAGES:
        parties.append(
            f"U+{c[0]:04X}-{c[1]:04X}" if isinstance(c, tuple) else f"U+{c:04X}"
        )
    return ",".join(parties)


def telecharger(url: str, cible: Path) -> None:
    if cible.exists():
        return
    cible.parent.mkdir(parents=True, exist_ok=True)
    print(f"  téléchargement {cible.name}")
    urllib.request.urlretrieve(url, cible)


def completer_espace_fine(police: TTFont, nom: str) -> None:
    """
    Archivo ne déclare pas U+202F.

    L'espace fine insécable a le même dessin que l'espace fine U+2009 : seule
    la règle de coupure diffère, et cette règle appartient au moteur de rendu,
    pas à la police. On ajoute donc l'association manquante vers le glyphe
    existant. Sans cela, chaque ponctuation haute d'un titre déclencherait un
    repli sur une autre police pour une seule espace.
    """
    tables = police["cmap"].tables
    presents: dict[int, str] = {}
    for table in tables:
        presents.update(table.cmap)

    if 0x202F in presents:
        return
    glyphe = presents.get(0x2009)
    if glyphe is None:
        print(f"  {nom}: ni U+202F ni U+2009, espace fine indisponible")
        return

    for table in tables:
        if table.isUnicode():
            table.cmap[0x202F] = glyphe
    if "hmtx" in police and glyphe in police["hmtx"].metrics:
        pass  # le glyphe existe déjà, ses métriques sont donc correctes
    print(f"  {nom}: U+202F associé au glyphe {glyphe} (U+2009)")


def traiter(spec: dict) -> None:
    source = SOURCES / spec["source"]
    telecharger(f"{DEPOT}/{spec['dossier']}/{spec['fichier']}", source)
    telecharger(
        f"{DEPOT}/{spec['dossier']}/OFL.txt",
        SORTIE / f"OFL-{spec['dossier']}.txt",
    )

    police = TTFont(source)
    avant = source.stat().st_size

    instancer.instantiateVariableFont(police, spec["axes"], inplace=True, updateFontNames=False)
    completer_espace_fine(police, spec["sortie"])
    intermediaire = SORTIE / f".{spec['sortie']}.ttf"
    police.flavor = None
    police.save(intermediaire)

    final = SORTIE / f"{spec['sortie']}.woff2"
    subprocess.run(
        [
            sys.executable,
            "-m",
            "fontTools.subset",
            str(intermediaire),
            f"--unicodes={unicodes()}",
            "--layout-features=kern,liga,ccmp,mark,mkmk,locl,tnum,calt,cv05,cv11,ss01",
            "--flavor=woff2",
            "--no-hinting",
            "--desubroutinize",
            f"--output-file={final}",
        ],
        check=True,
    )
    intermediaire.unlink()

    apres = final.stat().st_size
    axes = ", ".join(
        f"{k}={v[0]}-{v[1]}" if isinstance(v, tuple) else f"{k}={v}"
        for k, v in spec["axes"].items()
    )
    print(f"  {spec['sortie']:<12} {avant / 1024:7.1f} kB → {apres / 1024:6.1f} kB   ({axes})")


def verifier() -> None:
    """Contrôle que chaque police couvre bien tout le répertoire demandé."""
    attendus = set()
    for c in PLAGES:
        attendus |= set(range(c[0], c[1] + 1)) if isinstance(c, tuple) else {c}
    attendus.discard(0xFEFF)

    for spec in POLICES:
        f = TTFont(SORTIE / f"{spec['sortie']}.woff2")
        couverts: set[int] = set()
        for table in f["cmap"].tables:
            couverts |= set(table.cmap.keys())
        manquants = sorted(attendus - couverts)
        etat = "complet" if not manquants else (
            "manque " + " ".join(f"U+{m:04X}" for m in manquants)
        )
        print(f"  {spec['sortie']:<12} {f['maxp'].numGlyphs:4d} glyphes, {etat}")


if __name__ == "__main__":
    SORTIE.mkdir(parents=True, exist_ok=True)
    print("Fabrication :")
    for spec in POLICES:
        traiter(spec)
    print("Vérification :")
    verifier()
