# Mise en ligne

Ce document liste ce qui bloque l'ouverture du site au public, puis les
décisions prises en cours de construction qui demandent une validation.

---

## 1. Bloquants

Le site ne doit pas être ouvert au public tant que ces sept points ne sont pas
traités. Chacun indique le fichier à modifier.

### 1.1 Numéro de téléphone et email — `content/site.ts`

Le numéro affiché, `06 39 98 76 54`, appartient à la plage `06 39 98 XX XX`
réservée par l'ARCEP à la fiction : il ne peut sonner chez personne. C'est
volontaire — un numéro « pris au hasard » sonnerait chez un inconnu.

À remplacer : `telephone.affichage`, `telephone.lien`,
`telephone.international`, et `email`.

### 1.2 Nom de domaine — variable d'environnement

`NEXT_PUBLIC_SITE_URL`, sans slash final. Sert aux adresses canoniques, au
sitemap, aux données structurées et aux cartes Open Graph.

### 1.3 Identité légale — `content/legal.ts`

Obligatoire en France : article 6-III de la LCEN du 21 juin 2004 et article
R123-237 du code de commerce. À renseigner :

- raison sociale, forme juridique, capital social ;
- adresse du siège social ;
- SIREN, SIRET, ville d'immatriculation au RCS ;
- numéro de TVA intracommunautaire ;
- directeur de la publication.

Tant que `LEGAL_COMPLET` vaut `false` : `/mentions-legales` est en `noindex`,
absente du sitemap, interdite dans `robots.txt`, et un avertissement de
rédaction coiffe la page. Passer le drapeau à `true` une fois les champs
remplis.

L'hébergeur est déjà renseigné (Vercel Inc.). À corriger si l'hébergement
change.

### 1.4 Relecture des CGV par un avocat français

`content/legal.ts`, export `CGV`. Le document est rédigé et couvre le
périmètre des formules, l'échéancier de paiement, l'engagement de vingt-quatre
mois, l'engagement de délai et sa compensation, la propriété et le transfert du
site, le périmètre borné de la maintenance, la résiliation et la remise des
fichiers.

Deux clauses méritent une attention particulière lors de la relecture :

- **article 5**, l'engagement de délai et la non-facturation du premier mois.
  C'est un engagement contractuel chiffré, et c'est ce que le site promet en
  page d'accueil ;
- **article 10**, le droit de rétractation. Un artisan de cinq salariés ou
  moins qui commande un site — prestation hors de son activité principale —
  bénéficie du délai de quatorze jours de l'article L221-3 du code de la
  consommation. Cette clause est probablement la plus contre-intuitive du
  document pour l'agence, et c'est celle qui protège le plus en cas de litige.

À faire **avant la première vente**, pas avant la mise en ligne.

### 1.5 Données réalisations — `content/realisations.ts`

Le tableau est vide et `REALISATIONS_ENABLED` (dans `content/site.ts`) vaut
`false`. Pour chaque référence : nom du client, secteur, ville, type
(`creation` ou `refonte`), délai en jours, URL du site en ligne, une phrase de
résumé, une capture au format 16:10 dans `public/realisations/`, et
éventuellement une citation avec son auteur et son rôle.

Remplir le tableau puis passer le drapeau à `true`. Le lien réapparaît dans la
navigation, le teaser de l'accueil se rend, la page sort du 404 et entre dans le
sitemap.

### 1.6 Mouncef — `content/equipe.ts`

Nom de famille, rôle et phrase de présentation manquants. La boîte reste à
`actif: false`. **Ne pas inventer de rôle.** Une fois les informations reçues,
renseigner les champs et passer `actif` à `true`.

### 1.7 Photo de Nizzar — `public/equipe/`

Déposer le fichier puis renseigner `photo: "/equipe/nizzar.jpg"` dans
`content/equipe.ts`. Format carré, 800 × 800 px suffisent. En attendant, le
carré porte les initiales en Archivo : jamais d'image cassée en production.

---

## 2. Décisions à valider

### 2.1 La mention de certification IA n'est pas publiée

Le brief mentionnait une ligne « consultant certifié Anthropic/OpenAI » pour
Nizzar. Elle n'apparaît pas sur le site.

En France, un titre professionnel invérifiable sur un site commercial relève
des pratiques commerciales trompeuses (article L121-2 du code de la
consommation). Et l'argument est faible face à un plombier : ce qui le rassure,
c'est de savoir qui décroche le téléphone.

Si le certificat existe et qu'il est vérifiable, ajouter **une seule
proposition** à `EQUIPE[0].ligne`, avec la référence. Sinon, laisser la ligne
telle quelle.

### 2.2 Aucune référence de l'ancien portfolio n'a été reprise

Ni Nations unies, ni Gucci, ni Time Magazine, ni Lakers. Ces références
appartiennent à une autre activité et, à côté d'une offre à 890 €, elles
rendent un prospect démarché méfiant plutôt que rassuré.

### 2.3 Une page a été ajoutée : `/offres`

La §4.1 de la spécification place « Offres → /offres » dans la navigation sans
décrire la page. Un lien de navigation sans destination est un défaut. La page
existe donc et se contente d'orienter vers les deux offres réelles : titre, les
deux cartes de situation, le module de processus, les tarifs en version
condensée, appel final.

### 2.4 Trois couleurs ont été ajoutées à la palette

Pour des raisons de contraste mesuré, détaillées dans le README. La plus
importante : **l'ambre pur ne peut pas servir de couleur de texte** sur fond
clair (2,44:1, seuil à 4,5:1). Une déclinaison assombrie, `#A05C00`, sert
partout où l'accent doit être lu. Corollaire : les boutons ambre portent du
texte encre, pas du blanc.

### 2.5 `PRICING.marche` a été étendu

Le tableau de la §5.6 comporte quatre lignes — agence, freelance, solution en
abonnement, Box-HDG — mais les clés fournies ne couvraient que l'agence et les
délais. Les blocs `freelance*` et `abonnement*` ont été ajoutés au même objet.
Les clés d'origine sont intactes.

**Les fourchettes ajoutées sont celles du tableau de la spécification.** Elles
sont présentées sur le site comme « relevées auprès d'agences et de prestataires
français, 2026 » : il faut pouvoir produire la source si on la demande. À
vérifier avant mise en ligne.

### 2.6 L'apostrophe typographique remplace la quote droite

`l'équipe` est rendu `l’équipe`. Le texte est identique au mot près ; seul le
caractère d'apostrophe change, conformément à l'usage typographique français.
Même logique pour les espaces insécables avant la ponctuation haute.

### 2.7 L'entreprise du module avant / après est fictive

« Menuiserie Delorme », à Vitrolles. Les deux cartes portent l'étiquette
« Exemple », et la légende sous le module le répète. Aucune donnée client, aucune
capture d'écran : tout est en HTML et CSS.

---

## 3. Ce qui n'est pas atteint

**Budget JavaScript : 140,8 kB compressés contre 90 kB visés.**

Répartition mesurée sur l'accueil :

| | Compressé |
|---|---|
| React et react-dom | 61,7 kB |
| Routeur et client Next.js | 63,9 kB |
| Code du site | ~14 kB |

Le socle de l'App Router pèse 126 kB avant la première ligne de code
applicatif. Le code du site représente 14 kB de l'ensemble, et trois composants
seulement s'exécutent côté client : le panneau de navigation mobile,
l'observateur d'apparition et le formulaire. Le sélecteur de tarifs et la FAQ
n'embarquent rien.

Trois leviers, du moins au plus coûteux :

1. **Ne rien faire.** Les critères que le budget servait sont atteints :
   Lighthouse ≥ 99 partout, CLS à 0, LCP réel à 0,52 s. Le JavaScript est
   asynchrone et ne bloque pas le premier rendu. C'est la recommandation.
2. **Retirer les préchargements de route de Next.** Économise quelques
   kilo-octets de trafic, dégrade la navigation interne. Peu d'intérêt.
3. **Quitter l'App Router** pour un générateur sans runtime client — Astro ou
   Eleventy — et réécrire les trois composants clients en JavaScript nu.
   Descendrait sous 15 kB. Coût : une réécriture, et l'abandon d'un socle que
   la §2 de la spécification impose explicitement.

Le point 3 est un arbitrage produit, pas une décision technique. À trancher
avant d'aller plus loin, si le budget est ferme.

---

## 4. Vérification avant ouverture

```bash
npm run typecheck
npm run build && npm start
npm run verifier                 # 95 vérifications, 0 échec attendu
npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo
```

Puis, à la main :

- [ ] appeler le numéro affiché, depuis un téléphone, en cliquant le bouton ;
- [ ] envoyer le formulaire et vérifier la réception de l'email ;
- [ ] relire `/mentions-legales` une fois `LEGAL_COMPLET` passé à `true` ;
- [ ] vérifier une carte Open Graph dans une conversation WhatsApp réelle ;
- [ ] ouvrir le site sur un Android d'entrée de gamme, en 4G, hors Wi-Fi.
