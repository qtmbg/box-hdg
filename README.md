# Box-HDG

Site vitrine de l'agence Box-HDG. Next.js 16 (App Router), TypeScript,
Tailwind 4, tout en français.

La vente se fait au téléphone. Ce site n'est ni un aimant à prospects ni une
pièce de portfolio : c'est la page qu'un prospect ouvre **pendant l'appel** ou
juste après avoir raccroché, pour vérifier que l'agence existe et que le prix
est bien celui qu'on lui a dit. Tout en découle : les prix visibles sans
défiler, le numéro joignable en permanence, et zéro astuce.

---

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production locale
npm run verifier             # 95 vérifications sur le serveur local
npm run typecheck
```

`npm run verifier` attend un serveur de production sur le port 3000, ou une
URL en argument : `node tests/verification.mjs http://localhost:3128`.

Variables d'environnement : copier `.env.example` en `.env.local`. Sans
`RESEND_API_KEY`, le formulaire journalise le message en développement et
renvoie une erreur en production — il ne perd jamais une demande en silence.

---

## Les prix vivent dans un seul fichier

`content/pricing.ts`. Aucun autre fichier du dépôt ne code un montant en dur.
Si un prix change, ce fichier change, et lui seul. Tous les montants sont hors
taxes, et chaque bloc de prix porte la mention « Prix en euros hors taxes. »

Le module de comparaison de la page d'accueil lit lui aussi ses fourchettes de
marché dans `PRICING.marche`.

---

## Organisation

```
app/                 routes, métadonnées, sitemap, robots, cartes Open Graph
components/          composants d'interface
content/             tout le texte, en objets typés
lib/                 typographie française, formats, données structurées
scripts/polices.py   fabrication des polices auto-hébergées
tests/               vérification du site
```

Le contenu ne vit jamais dans un composant. Un libellé de bouton, un titre de
colonne de pied de page, un message d'erreur : tout passe par `/content`. C'est
ce qui garantit que la typographie française s'applique partout, y compris dans
les métadonnées.

---

## Système de design

Le brief dit « ennuyeux, clair, simple, rapide ». C'est une direction, pas une
absence de direction : elle s'exécute avec précision plutôt qu'avec du décor.

| Rôle | Jeton | Valeur |
|---|---|---|
| Texte, sections sombres | `encre` | `#14202E` |
| Fond de page | `papier` | `#FFFFFF` |
| Texte secondaire | `gris` | `#5B6B7C` |
| Filets de 1 px, bordures | `filet` | `#E3E7EB` |
| Accent unique | `ambre` | `#E8930C` |
| Fond de section alternée | `fond` | `#F7F8F9` |

Trois déclinaisons ont été ajoutées, pour des raisons de contraste et non de
goût :

- **`ambre-texte` `#A05C00`** — l'ambre pur plafonne à 2,44:1 sur blanc, sous
  le seuil de 4,5:1. Partout où l'accent doit être *lu* comme texte (le rôle
  sur la page équipe, l'étiquette « Après »), c'est cette déclinaison qui sert.
  L'ambre pur reste réservé aux fonds, aux étoiles et aux barres.
- **`barre` `#7B8896`** — les barres du module de comparaison, à 3,4:1 sur le
  fond gris, seuil des éléments graphiques non textuels.
- **`filet-fort` `#C6CFD8`** — filet assombri, usages non informatifs.

Conséquence directe : **les boutons ambre portent du texte encre** (6,75:1). Du
blanc sur ambre tomberait à 2,44:1.

Typographie : **Archivo** 600/700 pour les titres, interlettrage `-0.02em`.
**Inter** 400/500/600 pour le corps et l'interface, chiffres tabulaires partout.
Échelle 14 / 16 / 18 / 22 / 28 / 36 / 48. Corps à 18 px sur desktop, 17 px sur
mobile.

Pas de dégradé. Une seule ombre, `0 1px 2px rgb(20 32 46 / 0.06)`, sur les
cartes. Rayon de 4 px, partout. Le filet de 1 px est le seul ornement
structurel du site.

Mouvement : apparition en fondu montant, 200 ms, 8 px, et rien d'autre.
`prefers-reduced-motion` désactive tout. Le script ne masque **jamais** un bloc
déjà peint : seuls les éléments situés sous la ligne de flottaison reçoivent
l'état masqué. Sans JavaScript, rien n'est masqué.

### Le module signature

Le prix agressif est le produit. Le site le montre donc comme une donnée, pas
comme un adjectif : le module de comparaison (`components/Comparaison.tsx`),
trois échelles, quatre lignes, des barres en CSS, aucune bibliothèque de
graphiques. La barre part de zéro et s'arrête au haut de la fourchette ; le
repère blanc marque le bas ; l'échelle de chaque groupe est le plafond constaté
sur le marché. Toute valeur est aussi imprimée en clair à droite de sa barre :
le graphique appuie la lecture, il ne la porte pas seul.

Toute l'audace du site est dépensée là. Le reste reste silencieux.

---

## Typographie française

`lib/fr.ts` applique, une seule fois au chargement des modules de contenu :

- l'apostrophe typographique — `l'équipe` devient `l’équipe` ;
- l'espace insécable avant `:` et dans les groupes de milliers ;
- l'espace fine insécable avant `?` `!` `;` ;
- les guillemets français avec leurs espaces ;
- l'insécable entre un nombre et son unité — `890 €`, `9 h`.

La transformation a lieu au build. Aucun coût à l'exécution, et les
métadonnées en bénéficient au même titre que le corps de page.

---

## Polices

Auto-hébergées, sous-ensemble français, `font-display: swap`, préchargées.

```bash
npm run polices    # nécessite python3 + fonttools + brotli
```

`scripts/polices.py` part des fichiers variables complets du dépôt
`google/fonts`, restreint les axes aux valeurs réellement utilisées, puis
réduit le jeu de glyphes au répertoire français.

| | Source | Servi |
|---|---|---|
| Inter | 856 kB | **21,8 kB** (`opsz=18`, `wght 400-600`) |
| Archivo | 643 kB | **14,6 kB** (`wdth=100`, `wght 600-700`) |

Les sous-ensembles « latin » de l'API Google Fonts ne contiennent ni l'espace
fine insécable (U+202F) ni la flèche (U+2192), deux caractères que ce site
utilise : c'est pourquoi le script part des fichiers sources. Archivo ne
déclare pas U+202F ; le script associe ce point de code au glyphe U+2009
existant, dont le dessin est identique — seule la règle de coupure diffère, et
elle appartient au moteur de rendu.

Les deux familles sont sous SIL Open Font License 1.1. Les licences sont
déposées à côté des fichiers, dans `public/fonts/`.

---

## Mesures

Serveur de production local, Lighthouse mobile, médiane de trois passes :

| Route | Perf | Access. | Bonnes pratiques | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 1,96 s | 36 ms | 0 |
| `/tarifs` | 99 | 100 | 100 | 100 | 1,81 s | 42 ms | 0 |
| `/offres/creation-site-internet` | 100 | 100 | 100 | 100 | 1,81 s | 14 ms | 0 |
| `/contact` | 99 | 100 | 100 | 100 | 1,96 s | 41 ms | 0 |
| `/equipe` | 99 | 100 | 100 | 100 | 1,96 s | 38 ms | 0 |
| `/cgv` | 100 | 100 | 100 | 100 | 1,52 s | 15 ms | 0 |

Les LCP ci-dessus viennent du modèle *simulé* de Lighthouse, volontairement
pessimiste. Sous bridage réel du réseau (150 ms de latence, 1,6 Mb/s, processeur
divisé par quatre), le LCP mesuré est de **0,52 s** sur l'accueil et de 0,41 s
sur les tarifs.

Poids transféré sur l'accueil : HTML 37,7 kB (feuille de style incluse),
polices 36,3 kB, JavaScript 140,8 kB — tout compressé.

Le budget de 90 kB de JavaScript de la spécification n'est pas atteint, et ne
peut pas l'être avec l'App Router : le socle React + routeur pèse à lui seul
126 kB compressés, avant la première ligne de code applicatif. Le code du site
représente environ 14 kB de ce total. Voir `MISE-EN-LIGNE.md` pour ce que
coûterait de descendre plus bas.

---

## Choix d'implémentation qui méritent une phrase

**Le sélecteur de mode de paiement ne charge aucun JavaScript.** Deux boutons
radio et `:has()`. Sur la page qui conclut les ventes, le prix est affiché
avant qu'un seul script n'ait pu s'exécuter, et la navigation au clavier est
celle du navigateur.

**La FAQ non plus.** `<details>` et `<summary>` natifs, avec l'attribut `name`
qui rend l'accordéon exclusif. Les réponses sont dans le HTML servi : elles
sont indexables.

**Le formulaire fonctionne sans JavaScript.** Action serveur ; la couche
cliente n'ajoute que l'état d'envoi et le déplacement du focus. Piège à robots
invisible, pas de captcha.

**`/realisations` répond 404 tant que `REALISATIONS_ENABLED` est à `false`.**
Le lien a déjà disparu de la navigation et le teaser de l'accueil n'est pas
rendu ; laisser une adresse accessible et vide serait la troisième version du
même défaut. Le jour où les données arrivent, le drapeau passe à `true`.

**Les formations certifiées sont publiées et vérifiables.** Vingt-trois
attestations — vingt d'Anthropic Academy, trois d'OpenAI Academy — présentées
par leur nombre, dépliables au détail, avec un lien de vérification sur les
trois certificats OpenAI et une déclaration `hasCredential` en données
structurées. Le libellé dit « certificats de formation », ce qu'ils sont, et
non « consultant certifié », ce qu'ils ne sont pas.

**Aucune carte fantôme sur la page équipe.** La grille se réduit au nombre de
membres actifs. Une photo manquante sur une personne réelle tombe sur ses
initiales, en Archivo, dans le même carré — ce qui n'a rien à voir avec les
silhouettes grises que la page existe précisément pour éviter.

---

## Déploiement

GitHub → Vercel. Toutes les routes sont prérendues statiquement ; seule l'action
serveur du formulaire s'exécute à la demande. Renseigner `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` et `NEXT_PUBLIC_SITE_URL` dans les
variables d'environnement du projet.

Mesure d'audience : Vercel Analytics, sans cookie. **Aucun bandeau de
consentement n'est nécessaire en l'état.** Le jour où un outil déposant un
cookie est ajouté, le bandeau devient obligatoire.

Avant la première ouverture au public : lire `MISE-EN-LIGNE.md`.
