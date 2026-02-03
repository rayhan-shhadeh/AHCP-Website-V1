# AHPC Website - Complete Deployment Guide (Free Platforms)

This guide walks you through deploying the AHPC website on **fully free** platforms: **Vercel** (frontend) and **Firebase** (backend, auth, hosting alternative).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Local Development](#local-development)
4. [Deploy to Vercel (Frontend)](#deploy-to-vercel-frontend)
5. [Deploy to Firebase Hosting (Alternative)](#deploy-to-firebase-hosting-alternative)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Donorbox Integration](#donorbox-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **Google Account** (for Firebase)
- **GitHub Account** (for Vercel)
- **Donorbox Account** (optional, for donations)

---

## Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → Name it `ahpc-website` → Continue
3. Disable Google Analytics (optional) → Create project

### Step 2: Enable Services

1. **Authentication**
   - Build → Authentication → Get started
   - Sign-in method → Email/Password → Enable → Save

2. **Firestore Database**
   - Build → Firestore Database → Create database
   - Start in **production mode** → Choose location (e.g., `europe-west1`)
   - Create

3. **Storage**
   - Build → Storage → Get started
   - Start in production mode → Done

### Step 3: Create Admin User

1. Authentication → Users → Add user
2. Enter admin email and password
3. Save (you'll use this to log into `/admin`)

### Step 4: Get Firebase Config

1. Project Settings (gear icon) → General
2. Under "Your apps" → Add app → Web (</>)
3. Register app → Copy the config object
4. You'll need: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`

### Step 5: Deploy Firestore & Storage Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init

# Deploy rules only
firebase deploy --only firestore:rules
firebase deploy --only storage
```

---

## Local Development

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd AHCP-Website-V1

npm install
```

### 2. Environment Variables

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Optional
VITE_DONORBOX_URL=https://donorbox.org/embed/your-campaign
```

### 3. Run Locally

```bash
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel (Frontend)

Vercel offers **free** hosting for static sites and serverless functions.

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ahpc-website.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Add New** → **Project**
3. Import your repository
4. **Framework Preset**: Vite
5. **Root Directory**: `./` (or leave default)
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`

### Step 3: Add Environment Variables

In Vercel project → Settings → Environment Variables, add:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | Your project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `VITE_FIREBASE_APP_ID` | Your app ID |
| `VITE_DONORBOX_URL` | (Optional) Donorbox embed URL |

### Step 4: Deploy

Click **Deploy**. Your site will be live at `https://your-project.vercel.app`.

---

## Deploy to Firebase Hosting (Alternative)

If you prefer Firebase Hosting instead of Vercel:

### Step 1: Build

```bash
npm run build
```

### Step 2: Deploy

```bash
firebase deploy --only hosting
```

Your site will be at `https://your-project.web.app`.

---

## Custom Domain Setup

### Vercel

1. Project → **Settings** → **Domains**
2. Add your domain (e.g., `www.isaadtefelfalastini.com`)
3. Vercel will show DNS records to add
4. In your domain registrar (GoDaddy, Namecheap, etc.):
   - Add **A record**: `76.76.21.21` (Vercel IP)
   - Or **CNAME**: `cname.vercel-dns.com`
5. Wait for DNS propagation (5 min - 48 hrs)
6. Vercel auto-provisions SSL (HTTPS)

### Firebase Hosting

1. Firebase Console → Hosting → Add custom domain
2. Enter domain → Follow DNS instructions
3. Add the provided records at your registrar
4. Firebase provisions SSL automatically

### Free Domain Options

- **Freenom** (free .tk, .ml domains) – use with caution
- **GitHub Student Pack** – free domain with Namecheap
- **Your existing domain** – point it to Vercel/Firebase

---

## Donorbox Integration

### 1. Create Donorbox Account

1. Go to [donorbox.org](https://donorbox.org)
2. Sign up (free tier available)
3. Create a campaign

### 2. Get Embed Code

1. Campaign → Share → Embed
2. Copy the iframe URL (e.g., `https://donorbox.org/embed/ahpc-donate`)

### 3. Add to Project

In `.env`:
```
VITE_DONORBOX_URL=https://donorbox.org/embed/your-campaign-id
```

Rebuild and redeploy.

### Bank Transfer (Manual)

Edit `src/pages/Donate.tsx` and update the bank details section with your actual:
- Bank name
- Account number
- SWIFT/IBAN

---

## Troubleshooting

### Build Fails on Vercel

- **"Module not found"**: Ensure all imports use correct paths (`@/` alias)
- **"Firebase not defined"**: Add all `VITE_` env vars in Vercel
- **TypeScript errors**: Run `npm run build` locally first

### Admin Login Not Working

- Ensure Firebase Auth Email/Password is enabled
- Create an admin user in Firebase Console
- Check browser console for CORS or auth errors

### Images Not Loading

- Firebase Storage rules must allow public read for `activities/` and `gallery/`
- Ensure Storage is enabled in Firebase project

### RTL/Arabic Layout Issues

- The site uses `dir="rtl"` when Arabic is selected
- Test with the language toggle in the header

### CORS Errors

- Firebase and Vercel don't require CORS for client-side apps
- If using a custom API, add your Vercel domain to allowed origins

---

## Summary Checklist

- [ ] Firebase project created
- [ ] Auth, Firestore, Storage enabled
- [ ] Admin user created
- [ ] `.env` configured
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] Custom domain connected (optional)
- [ ] Donorbox configured (optional)
- [ ] Bank details updated in Donate page

---

## Support

- **Firebase Docs**: https://firebase.google.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **AHPC Contact**: isaadtefelfalastini@gmail.com

---

Built with ❤️ for the children of Palestine.
