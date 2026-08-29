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
npm run verifier             # 96 vérifications, local ou URL en argument
npm run typecheck
```

`npm run verifier` attend un serveur de production sur le port 3000, ou une
URL en argument : `node tests/verification.mjs http://localhost:3128`.

Variables d'environnement : copier `.env.example` en `.env.local`. Sans
`RESEND_API_KEY`, le formulaire journalise le message en développement et
renvoie une erreur en production, il ne perd jamais une demande en silence.

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

## Le système

Le site est une surface de blocs. Chaque bloc porte une couleur pleine, un
rayon de 18 px, et rien d'autre. Aucune bordure, aucune ombre, aucun filet de
séparation nulle part. C'est la couleur qui découpe la page, et les dix pixels
qui séparent les blocs qui la font respirer.

Au-dessus de 1100 px, une colonne d'identité reste fixe à gauche pendant que
le contenu défile à droite. Elle porte le logotype, la navigation, le titre de
la page, une phrase, et le bouton d'appel. Le numéro est donc lisible du début
à la fin de chaque page, sans barre collante qui vienne manger le haut de
l'écran. En dessous de cette largeur, la colonne redevient un bloc ordinaire
en tête de pile et la barre d'appel prend le relais en bas.

### Palette

| Rôle | Nom | Valeur | Contraste mesuré |
|---|---|---|---|
| Fond de page | `craie` | `#F4EFE4` | |
| Blocs clairs | `papier` | `#FFFFFF` | |
| Encre | `ardoise` | `#13322D` | 12,0:1 sur craie |
| Texte secondaire | `sauge` | `#4A605A` | 5,9:1 sur craie |
| Accent | `brique` | `#C0431C` | 4,5:1 sur craie, 5,2:1 en blanc dessus |
| Bloc chaud | `ocre` | `#EEA749` | ardoise dessus : 6,7:1 |
| Bloc doux | `argile` | `#E8C2AB` | ardoise dessus : 8,4:1 |
| Bloc secondaire | `sable` | `#EAE1D0` | ardoise dessus : 10,6:1 |

Les rapports sont calculés, pas estimés. `brique` tient le seuil de 4,5:1 en
texte sur les fonds clairs, ce qui lui permet de servir aussi bien de couleur
d'accent que de fond de bouton.

### Typographie

**Newsreader** compose les titres, les chapôs et les prix. C'est un serif de
labeur, chaleureux, dessiné pour être lu, et il tient aussi bien un titre de
56 px qu'un paragraphe de 22 px.

**Schibsted Grotesk** prend le corps de texte, l'interface et les chiffres
tabulaires. Le contraste entre la plume de l'un et la netteté de l'autre
remplace tout l'appareil de règles et de cadres que le site n'a pas.

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

- l'apostrophe typographique, `l'équipe` devient `l’équipe` ;
- l'espace insécable avant `:` et dans les groupes de milliers ;
- l'espace fine insécable avant `?` `!` `;` ;
- les guillemets français avec leurs espaces ;
- l'insécable entre un nombre et son unité, `890 €`, `9 h`.

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
| Newsreader | 441 kB | **31,1 kB** (`opsz=26`, `wght 320-420`) |
| Schibsted Grotesk | 172 kB | **29,1 kB** (`wght 400-620`) |

Les sous-ensembles « latin » de l'API Google Fonts ne contiennent ni l'espace
fine insécable (U+202F) ni la flèche (U+2192), deux caractères que ce site
utilise : c'est pourquoi le script part des fichiers sources. Aucune des
déclare pas U+202F ; le script associe ce point de code au glyphe U+2009
existant, dont le dessin est identique, seule la règle de coupure diffère, et
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
polices 36,3 kB, JavaScript 140,8 kB, tout compressé.

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
attestations, vingt d'Anthropic Academy, trois d'OpenAI Academy, présentées
par leur nombre, dépliables au détail, avec un lien de vérification sur les
trois certificats OpenAI et une déclaration `hasCredential` en données
structurées. Le libellé dit « certificats de formation », ce qu'ils sont, et
non « consultant certifié », ce qu'ils ne sont pas.

**Aucune carte fantôme sur la page équipe.** La grille se réduit au nombre de
membres actifs. Une photo manquante sur une personne réelle tombe sur ses
initiales, en Newsreader, dans le même carré, ce qui n'a rien à voir avec les
silhouettes grises que la page existe précisément pour éviter.

---

## Déploiement

Production Vercel, ouverte sans authentification :
**https://box-hdg.vercel.app**

Le site n'y est pas indexable : le drapeau `INDEXABLE` de `content/site.ts`
exige que l'identité légale soit renseignée *et* que l'adresse ne soit pas une
adresse `.vercel.app`. Tant qu'une des deux manque, `robots.txt` interdit tout,
le sitemap est vide et les pages partent en `noindex`. Une recette indexée
deviendrait un doublon qui concurrencerait le vrai domaine.

GitHub → Vercel. Toutes les routes sont prérendues statiquement ; seule l'action
serveur du formulaire s'exécute à la demande. Renseigner `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` et `NEXT_PUBLIC_SITE_URL` dans les
variables d'environnement du projet.

Mesure d'audience : Vercel Analytics, sans cookie. **Aucun bandeau de
consentement n'est nécessaire en l'état.** Le jour où un outil déposant un
cookie est ajouté, le bandeau devient obligatoire.

Avant la première ouverture au public : lire `MISE-EN-LIGNE.md`.
