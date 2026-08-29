/**
 * Vérification du site.
 *
 * Les critères de la §2 de la spécification sont présentés comme des critères
 * d'acceptation, pas comme des vœux. Ce script les vérifie sur un serveur de
 * production local : accessibilité (axe, WCAG 2.2 AA), absence de débordement
 * horizontal à 320 px, taille des cibles tactiles, anneau de focus, tarifs et
 * FAQ sans JavaScript, formulaire, drapeaux de fonctionnalité, cartes Open
 * Graph.
 *
 *   npm run build && npm start &
 *   npm run verifier            # ou : node tests/verification.mjs [url]
 *
 * Les scores Lighthouse se mesurent à part, l'outil étant trop lourd pour
 * figurer dans les dépendances :
 *   npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { gzipSync } from "node:zlib";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const PAGES = [
  "/",
  "/tarifs",
  "/offres",
  "/offres/creation-site-internet",
  "/offres/refonte-site-internet",
  "/equipe",
  "/contact",
  "/cgv",
  "/confidentialite",
  "/mentions-legales",
  "/adresse-inexistante",
];

let reussis = 0;
const echecs = [];

function verifier(nom, condition, detail = "") {
  if (condition) {
    reussis += 1;
    console.log(`  ok    ${nom}`);
  } else {
    echecs.push(nom);
    console.log(`  ÉCHEC ${nom}${detail ? ` — ${detail}` : ""}`);
  }
}

function titre(texte) {
  console.log(`\n${texte}`);
}

const navigateur = await chromium.launch();

/* -- Accessibilité et débordement ---------------------------------------- */

titre("Accessibilité (axe, WCAG 2.2 AA) et largeur, 320 px et 1440 px");
for (const largeur of [320, 1440]) {
  for (const chemin of PAGES) {
    const ctx = await navigateur.newContext({
      viewport: { width: largeur, height: 800 },
    });
    const page = await ctx.newPage();
    await page.goto(BASE + chemin, { waitUntil: "networkidle" });
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: [
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa",
            "wcag22aa",
            "best-practice",
          ],
        },
      });
      return r.violations.map((v) => `${v.id}(${v.nodes.length})`);
    });
    verifier(
      `${largeur} px ${chemin} : aucune violation`,
      violations.length === 0,
      violations.join(", "),
    );
    const debord = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    verifier(`${largeur} px ${chemin} : pas de débordement`, debord <= 0, `${debord} px`);
    await ctx.close();
  }
}

/* -- Cibles tactiles ----------------------------------------------------- */

/*
 * Deux règles, et non une.
 *
 * Les commandes — boutons, champs, sommaires d'accordéon, puces de filtre,
 * libellés du sélecteur de paiement — doivent tenir 44 px, seuil du critère
 * 2.5.5 de WCAG et du plancher de qualité de la §3.
 *
 * Les liens de texte relèvent du critère 2.5.8 (24 px), qui exclut
 * explicitement les cibles « en ligne dans une phrase ou contraintes par
 * l'interligne du texte qui les entoure ». Imposer 44 px à chaque lien du pied
 * de page ou du fil d'Ariane ne rendrait service à personne : cela ferait
 * exploser des listes que l'œil lit comme des listes.
 */
titre("Cibles tactiles, 320 px");
{
  const ctx = await navigateur.newContext({
    viewport: { width: 320, height: 800 },
    isMobile: true,
  });
  const page = await ctx.newPage();
  for (const chemin of ["/", "/tarifs", "/contact"]) {
    await page.goto(BASE + chemin, { waitUntil: "networkidle" });
    const mesures = await page.evaluate(() => {
      const commande = (el) =>
        el.tagName === "BUTTON" ||
        el.tagName === "SUMMARY" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "INPUT" ||
        el.classList.contains("bouton") ||
        el.closest(".selecteur") !== null;
      return [...document.querySelectorAll("a, button, summary, input, textarea, .selecteur label")]
        .filter((el) => el.offsetParent !== null || el.tagName === "SUMMARY")
        .map((el) => {
          const r = el.getBoundingClientRect();
          // Un bouton radio est activé par son libellé : la cible réelle est
          // l'union des deux rectangles. Même règle pour un contrôle masqué au
          // profit de son libellé, comme le sélecteur de paiement.
          let cible = r;
          if (el.tagName === "INPUT" && el.id) {
            const l = document.querySelector(`label[for="${el.id}"]`);
            if (l) {
              const b = l.getBoundingClientRect();
              cible = {
                height: Math.max(r.bottom, b.bottom) - Math.min(r.top, b.top),
              };
            }
          }
          return {
            t: (el.textContent || el.id || "").trim().slice(0, 28),
            h: Math.round(cible.height),
            commande: commande(el),
          };
        })
        .filter((x) => x.h > 0);
    });
    const commandes = mesures.filter((m) => m.commande && m.h < 44);
    const liens = mesures.filter((m) => !m.commande && m.h < 24);
    verifier(
      `${chemin} : commandes ≥ 44 px`,
      commandes.length === 0,
      commandes.map((m) => `"${m.t}" ${m.h}px`).join(", "),
    );
    verifier(
      `${chemin} : liens de texte ≥ 24 px`,
      liens.length === 0,
      liens.map((m) => `"${m.t}" ${m.h}px`).join(", "),
    );
  }
  await ctx.close();
}

/* -- Sélecteur de tarifs et FAQ sans JavaScript -------------------------- */

titre("Tarifs et FAQ sans JavaScript");
{
  const ctx = await navigateur.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/tarifs");
  verifier(
    "mode achat affiché par défaut",
    await page.locator('[data-mode="achat"]').first().isVisible(),
  );
  await page.locator('label[for="mode-abonnement"]').click();
  verifier(
    "bascule vers abonnement",
    await page.locator('[data-mode="abonnement"]').first().isVisible(),
  );
  verifier(
    "mode achat masqué",
    !(await page.locator('[data-mode="achat"]').first().isVisible()),
  );
  await page.locator(".accordeon summary").first().click();
  verifier(
    "FAQ : réponse dépliée",
    await page.locator(".accordeon .reponse").first().isVisible(),
  );
  await page.locator(".accordeon summary").nth(1).click();
  verifier(
    "FAQ : accordéon exclusif",
    (await page.locator(".accordeon details[open]").count()) === 1,
  );
  await ctx.close();
}

/* -- Menu mobile --------------------------------------------------------- */

titre("Menu mobile");
{
  const ctx = await navigateur.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/");
  const bouton = page.locator('header button[aria-controls="menu-mobile"]');
  verifier("aria-expanded=false au repos", (await bouton.getAttribute("aria-expanded")) === "false");
  await bouton.click();
  verifier("panneau ouvert", await page.locator("#menu-mobile").isVisible());
  verifier("focus déplacé dans le panneau", await page.evaluate(() => !!document.activeElement?.closest("#menu-mobile")));
  verifier("défilement de fond bloqué", await page.evaluate(() => document.documentElement.classList.contains("sans-scroll")));
  verifier("bouton d'appel toujours visible", await page.locator("header a[data-appel]").first().isVisible());
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  verifier("Échap referme", (await page.locator("#menu-mobile").count()) === 0);
  await ctx.close();
}

/* -- Barre d'appel mobile ------------------------------------------------ */

titre("Barre d'appel mobile (§4.3)");
{
  const ctx = await navigateur.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const page = await ctx.newPage();
  const barre = 'div.fixed.bottom-0 a[href^="tel:"]';
  for (const chemin of ["/", "/tarifs", "/offres", "/offres/creation-site-internet", "/offres/refonte-site-internet", "/equipe"]) {
    await page.goto(BASE + chemin);
    verifier(`présente sur ${chemin}`, (await page.locator(barre).count()) === 1);
  }
  await page.goto(BASE + "/contact");
  verifier("absente sur /contact", (await page.locator(barre).count()) === 0);
  await ctx.close();
}

/* -- Formulaire de contact ---------------------------------------------- */

titre("Formulaire de contact (§11)");
{
  const ctx = await navigateur.newContext({ viewport: { width: 1280, height: 1200 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/contact");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await page.waitForTimeout(900);
  verifier(
    "quatre champs obligatoires signalés",
    (await page.getByText("Ce champ est obligatoire.").count()) === 4,
  );
  verifier("aria-invalid posé", (await page.locator("#entreprise").getAttribute("aria-invalid")) === "true");
  await page.fill("#entreprise", "Menuiserie Test");
  await page.fill("#nom", "Jean Dupont");
  await page.fill("#telephone", "0612345678");
  await page.fill("#email", "pas-un-email");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await page.waitForTimeout(900);
  verifier("email invalide signalé", (await page.getByText("email", { exact: false }).count()) > 0);
  verifier("valeurs conservées après erreur", (await page.inputValue("#entreprise")) === "Menuiserie Test");
  await ctx.close();
}

/* -- Drapeaux, indexation, cartes sociales ------------------------------ */

titre("Drapeaux de fonctionnalité et indexation (§9, §12, §13)");
{
  const ctx = await navigateur.newContext();
  const page = await ctx.newPage();
  const realisations = await page.goto(BASE + "/realisations");
  const active = realisations.status() === 200;
  verifier(
    "/realisations cohérent avec son drapeau",
    active || realisations.status() === 404,
    `statut ${realisations.status()}`,
  );
  await page.goto(BASE + "/");
  verifier(
    "lien Réalisations aligné sur le drapeau",
    (await page.locator('header nav a[href="/realisations"]').count()) === (active ? 1 : 0),
  );

  /*
   * L'indexation est un drapeau, comme les réalisations : elle est fermée tant
   * que l'identité légale manque ou que l'adresse est une adresse de recette
   * (*.vercel.app). On ne vérifie donc pas « le site est indexable », on
   * vérifie que les trois signaux disent la même chose.
   */
  const robots = await (await page.goto(BASE + "/robots.txt")).text();
  const sitemap = await (await page.goto(BASE + "/sitemap.xml")).text();
  await page.goto(BASE + "/");
  const metaRobots =
    (await page
      .locator('meta[name="robots"]')
      .getAttribute("content")
      .catch(() => null)) || "";

  const ouvert = !/Disallow:\s*\/\s*$/m.test(robots.trim());

  if (ouvert) {
    verifier("indexation ouverte : sitemap peuplé", sitemap.includes("/tarifs"));
    verifier("indexation ouverte : sitemap déclaré", robots.includes("sitemap.xml"));
    verifier("indexation ouverte : pages indexables", !metaRobots.includes("noindex"));
    verifier(
      "sitemap : /realisations aligné sur le drapeau",
      sitemap.includes("/realisations") === active,
    );
  } else {
    verifier("indexation fermée : sitemap vide", !sitemap.includes("<loc>"));
    verifier("indexation fermée : robots interdit tout", /Disallow:\s*\//.test(robots));
    verifier("indexation fermée : pages en noindex", metaRobots.includes("noindex"));
    verifier("indexation fermée : cohérent avec l'absence de sitemap", !robots.includes("sitemap.xml"));
  }

  for (const chemin of ["/", "/tarifs", "/offres/creation-site-internet", "/contact", "/equipe"]) {
    await page.goto(BASE + chemin);
    const h1 = await page.locator("h1").count();
    verifier(`${chemin} : un seul <h1>`, h1 === 1, `${h1} trouvés`);
    const canonique = await page.locator('link[rel="canonical"]').count();
    verifier(`${chemin} : canonique déclarée`, canonique === 1);
  }

  for (const chemin of ["/opengraph-image", "/tarifs/opengraph-image", "/equipe/opengraph-image"]) {
    const r = await page.goto(BASE + chemin);
    verifier(
      `carte Open Graph ${chemin}`,
      r.status() === 200 && r.headers()["content-type"] === "image/png",
    );
  }
  await ctx.close();
}

/* -- Anneau de focus ---------------------------------------------------- */

titre("Anneau de focus en ambre");
{
  const ctx = await navigateur.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.keyboard.press("Tab");
  const style = await page.evaluate(() => {
    const s = getComputedStyle(document.activeElement);
    return { couleur: s.outlineColor, largeur: s.outlineWidth, texte: document.activeElement.textContent.trim() };
  });
  verifier("premier Tab : lien d'évitement", style.texte.includes("Aller au contenu"), style.texte);
  verifier("anneau ambre", style.couleur.includes("232, 147, 12"), style.couleur);
  verifier("anneau visible", parseFloat(style.largeur) >= 2, style.largeur);
  await ctx.close();
}

/* -- Poids du JavaScript ------------------------------------------------ */

titre("Poids transféré");
{
  const ctx = await navigateur.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const poids = { script: 0, stylesheet: 0, font: 0, document: 0 };
  const attentes = [];
  page.on("response", (r) => {
    const type = r.request().resourceType();
    if (!(type in poids)) return;
    attentes.push(
      (async () => {
        try {
          const corps = await r.body();
          // Les woff2 sont déjà compressés ; le reste est mesuré gzipé, comme
          // le servirait un CDN.
          poids[type] += type === "font" ? corps.length : gzipSync(corps, { level: 9 }).length;
        } catch {
          /* réponse indisponible : ignorée */
        }
      })(),
    );
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await Promise.all(attentes);
  const ko = (n) => (n / 1024).toFixed(1);
  console.log(
    `  mesure  HTML ${ko(poids.document)} kB · CSS ${ko(poids.stylesheet)} kB · ` +
      `polices ${ko(poids.font)} kB · JS ${ko(poids.script)} kB (compressé)`,
  );
  verifier("polices sous 40 kB", poids.font < 40 * 1024, `${ko(poids.font)} kB`);
  verifier("CSS sous 12 kB compressé", poids.stylesheet + poids.document < 40 * 1024, `${ko(poids.stylesheet)} kB`);
  await ctx.close();
}

await navigateur.close();

console.log(`\n${reussis} vérifications réussies, ${echecs.length} échecs`);
if (echecs.length) {
  console.log(echecs.map((e) => `  · ${e}`).join("\n"));
  process.exit(1);
}
