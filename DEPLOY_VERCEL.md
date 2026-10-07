# 🚀 Guide de Déploiement Vercel — SENEGAL TOP TOUR

Ce guide vous accompagne pas à pas pour déployer l'intégralité de la plateforme **SENEGAL TOP TOUR** (Frontend React/Vite + Backend API Express/Prisma) sur **Vercel** avec une base de données Cloud hébergée.

---

## 🏛️ Architecture de Déploiement

Le projet est structuré sous forme de monorepo optimisé pour Vercel :
* **Frontend** : Application React + Vite + TypeScript, compilée dans `frontend/dist` avec support SPA (Single Page Application).
* **Backend API** : API REST Express & Prisma exposée en **Serverless Function** sous `/api/*` via le point d'entrée [`api/index.ts`](file:///c:/Senegal%20Top%20tour/api/index.ts).
* **Routage & Sécurité** : Orchestré via [`vercel.json`](file:///c:/Senegal%20Top%20tour/vercel.json) (gestion du CORS, réécritures d'URL, headers de cache).

---

## 📋 Prérequis

1. Un compte **[GitHub](https://github.com)**.
2. Un compte **[Vercel](https://vercel.com)** (gratuit).
3. Une base de données cloud hébergée (ex: **Railway**, **Aiven**, **PlanetScale**, **Supabase** ou **Neon**).

---

## 🗄️ Étape 1 : Créer votre Base de Données Neon (Gratuit & Instantané)

Le projet est configuré nativement avec **PostgreSQL** pour **Neon** (`prisma/schema.prisma`).

1. Rendez-vous sur **[neon.tech](https://neon.tech)** et créez un compte gratuit (avec GitHub ou Google).
2. Cliquez sur **Create Project** et nommez-le par exemple `senegal-top-tour`.
3. Sur votre tableau de bord Neon, dans la section **Connection Details**, sélectionnez :
   - Branch : `main`
   - Database : `neondb`
   - Role : `neondb_owner`
4. Copiez votre chaîne de connexion **Connection string** (Postgres) :
   ```env
   DATABASE_URL="postgresql://neondb_owner:VOTRE_MOT_DE_PASSE@ep-cool-fog-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   ```
*(Note : La base est immédiatement active sans aucune installation supplémentaire).*

---

## 🔄 Étape 2 : Initialiser la Base de Données Cloud

Depuis votre terminal local, appliquez le schéma et chargez les données initiales (excursions, destinations, admin par défaut) vers votre base cloud :

```bash
# Dans le dossier backend
cd backend

# Remplacez temporairement ou définissez la variable DATABASE_URL vers votre base cloud
npx prisma db push

# Exécutez le script de remplissage initial (Seed)
npx tsx src/seed.ts
```

> **Identifiants Admin créés par défaut :**
> - **Email** : `admin@senegaltoptour.com`
> - **Mot de passe** : `2004` (ou la valeur de votre variable `ADMIN_DEFAULT_PASSWORD`)

---

## 🐙 Étape 3 : Pousser votre Code sur GitHub

Initialisez le dépôt Git à la racine du projet (`Senegal Top tour`) :

```bash
git init
git add .
git commit -m "feat: Senegal Top Tour - ready for Vercel deployment"
```

Créez un nouveau dépôt sur **GitHub** (ex: `senegal-top-tour`), puis liez-le et poussez votre code :

```bash
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/senegal-top-tour.git
git push -u origin main
```

---

## ⚡ Étape 4 : Déployer sur Vercel

1. Connectez-vous sur [vercel.com](https://vercel.com) et cliquez sur **Add New...** > **Project**.
2. Sélectionnez votre dépôt GitHub `senegal-top-tour` et cliquez sur **Import**.
3. Dans la section de configuration du projet :
   - **Framework Preset** : `Vite` (détecté automatiquement)
   - **Root Directory** : `./` (laissez vide / racine)
   - **Build Command** : `npm run vercel-build` (déjà configuré par défaut dans `vercel.json`)
   - **Output Directory** : `frontend/dist`
4. Dépliez l'onglet **Environment Variables** et ajoutez les variables suivantes :

| Variable d'environnement | Valeur recommandée / Exemple | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `mysql://user:pass@host:port/db` | URL de votre base de données Cloud |
| `JWT_SECRET` | `senegal_top_tour_super_secret_jwt_key_2026_luxury` | Clé secrète de chiffrement des tokens admin |
| `NODE_ENV` | `production` | Environnement d'exécution |
| `ADMIN_DEFAULT_EMAIL` | `admin@senegaltoptour.com` | Email de l'administrateur |
| `ADMIN_DEFAULT_PASSWORD` | `2004` | Mot de passe de l'administrateur |
| `WHATSAPP_PHONE` | `+221778848029` | Numéro WhatsApp officiel pour contact direct |
| `CORS_ORIGIN` | `*` | Origine autorisée pour l'API |
| `CLOUDINARY_CLOUD_NAME` | `votre_cloud_name` | Nom de votre Cloud sur Cloudinary |
| `CLOUDINARY_API_KEY` | `123456789012345` | Clé API Cloudinary |
| `CLOUDINARY_API_SECRET` | `AbCdEfGhIjKlMnOpQrStUvWxYz` | Clé secrète API Cloudinary |
| `CLOUDINARY_FOLDER` | `senegal_top_tour` | Dossier de stockage des médias (optionnel) |

> 💡 **Où trouver vos identifiants Cloudinary ?**
> Connectez-vous sur [cloudinary.com](https://cloudinary.com/console) $\to$ Tableau de bord (**Dashboard**) $\to$ Copiez **Cloud Name**, **API Key** et **API Secret** (ou l'URL complète `CLOUDINARY_URL`).

5. Cliquez sur **Deploy**.

Vercel va automatiquement :
- Installer les dépendances.
- Générer le client Prisma (`npx prisma generate`).
- Compiler le backend TypeScript.
- Compiler l'application frontend React Vite.
- Déployer l'application et les fonctions Serverless sur son CDN mondial.

---

## ✅ Étape 5 : Vérification de votre Site en Ligne

Une fois le déploiement terminé, Vercel vous fournit une URL en `.vercel.app` (ex: `https://senegal-top-tour.vercel.app`).

### Points à vérifier :
* **Site Public** : `https://votre-projet.vercel.app/`
* **Catalogue d'Excursions & Filtres** : `https://votre-projet.vercel.app/excursions`
* **Formulaire de Réservation** : `https://votre-projet.vercel.app/reservation`
* **Voyages à thèmes & Solidaire** : `https://votre-projet.vercel.app/voyages-a-themes`
* **Santé de l'API** : `https://votre-projet.vercel.app/api/health`
* **Dashboard Administrateur** : `https://votre-projet.vercel.app/admin/login`

---

## 🛠️ Dépannage & Astuces

### 1. Erreur 404 sur les routes après rechargement (ex: `/excursions`)
La configuration dans [`vercel.json`](file:///c:/Senegal%20Top%20tour/vercel.json) redirige automatiquement toutes les routes vers `/index.html` via `{"source": "/(.*)", "destination": "/index.html"}` pour garantir que React Router gère la navigation sans erreur 404.

### 2. Comment modifier le contenu après le déploiement ?
Connectez-vous sur `/admin/login` avec votre compte administrateur. Vous pouvez gérer toutes les excursions, destinations, demandes de devis et messages en direct sans devoir redéployer le code.

---

🌟 **Félicitations ! Votre plateforme SENEGAL TOP TOUR est prête pour le monde entier !**
