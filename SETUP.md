# Rotaract Club of Coimbatore Crystals — Setup Guide

## 1. Installing Dependencies

Requires **Node.js 18.17+** and **npm 9+** (or pnpm / yarn).

```bash
cd rtwebsite
npm install
```

This installs:
- Next.js 14 (App Router)
- React 18
- Sanity v3 + next-sanity
- Framer Motion
- GSAP + @gsap/react
- Lenis (smooth scroll)
- Tailwind CSS + @tailwindcss/typography
- @portabletext/react (rich text renderer)

---

## 2. Creating and Configuring the Sanity Project

### 2a. Create a new Sanity project

```bash
npx sanity@latest init --env
```

When prompted:
- **Project name:** Rotaract Crystals CMS
- **Dataset:** `production`
- **Project output:** skip (we already have the schema)

Alternatively, create the project via the Sanity dashboard at https://sanity.io/manage and note the **Project ID**.

### 2b. Add CORS origin for local development

In https://sanity.io/manage → your project → **API** → **CORS Origins**, add:

```
http://localhost:3000
```

For production, also add your Vercel deployment URL.

### 2c. Create an API token (for mutations / Studio auth)

In https://sanity.io/manage → your project → **API** → **Tokens**:

- **Label:** `Next.js Server Token`
- **Permissions:** `Editor`
- Copy the token — you will not see it again.

---

## 3. Required Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `abc12def` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API date version | `2024-01-01` |
| `SANITY_API_TOKEN` | Server-only write/read token | `sk...` |
| `NEXT_PUBLIC_SITE_URL` | Full production URL (no trailing slash) | `https://rotaractcbecrystals.in` |

> **Security note:** `SANITY_API_TOKEN` must never be prefixed with `NEXT_PUBLIC_` — it would be exposed to the browser. It is server-only.

---

## 4. Running the Project Locally

```bash
npm run dev
```

The site is available at **http://localhost:3000**.

To type-check without building:

```bash
npm run type-check
```

To lint:

```bash
npm run lint
```

---

## 5. Accessing the Admin Panel at /admin

Once the dev server is running, navigate to:

```
http://localhost:3000/admin
```

You will be prompted to sign in with your **Sanity account** (the account that owns the project). After authenticating:

- **Events** → add/edit all club events with rich text, images, and categories
- **Team Members** → add board members and set `isLeadership: true` to show on homepage
- **Gallery** → upload photos with captions, categories, and `featured: true` for homepage gallery

### CMS content tips

| Section | Source |
|---|---|
| Homepage hero | Hardcoded in `components/Hero.tsx` props — edit `app/page.tsx` |
| Impact numbers | Hardcoded in `components/sections/ImpactNumbers.tsx` |
| FAQs | Hardcoded in `components/sections/FAQ.tsx` |
| Causes / Projects | Hardcoded in respective section components |
| Official messages | Hardcoded in `components/sections/OfficialMessages.tsx` |
| Events | Sanity CMS → `event` schema |
| Team members | Sanity CMS → `team` schema |
| Gallery images | Sanity CMS → `gallery` schema |

---

## 6. Deploying to Vercel

### 6a. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Rotaract Crystals website"
git remote add origin https://github.com/YOUR_ORG/rtwebsite.git
git push -u origin main
```

### 6b. Import to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: leave as default (`.`)

### 6c. Add environment variables in Vercel

In the Vercel project settings → **Environment Variables**, add all five variables from section 3:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN
NEXT_PUBLIC_SITE_URL
```

Set `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL (e.g. `https://rotaract-crystals.vercel.app`) or your custom domain.

### 6d. Add Vercel deployment URL to Sanity CORS

Back in https://sanity.io/manage → **API** → **CORS Origins**, add your Vercel URL:

```
https://your-app.vercel.app
```

Also add your custom domain if applicable.

### 6e. Deploy

Click **Deploy** in Vercel. Subsequent pushes to `main` will auto-deploy.

### 6f. Custom domain (optional)

In Vercel → **Domains**, add your custom domain and follow the DNS configuration instructions.

---

## Project Structure Summary

```
rtwebsite/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (fonts, providers)
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Home page skeleton
│   ├── not-found.tsx            # Global 404
│   ├── admin/                   # Sanity Studio at /admin
│   ├── our-activities/          # Events list + [slug] detail
│   ├── our-team/                # Team page
│   ├── gallery/                 # Gallery page
│   ├── bulletins/               # Bulletins page
│   ├── members-space/           # Members space page
│   └── contact-us/              # Contact page
├── components/                  # Shared UI components
│   ├── sections/                # Page-section components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── SmoothScrollProvider.tsx # Lenis + GSAP ticker
│   ├── PageTransition.tsx       # Framer Motion route wipe
│   ├── Preloader.tsx
│   ├── MagneticButton.tsx
│   ├── ScrambleText.tsx
│   ├── ParallaxSection.tsx
│   ├── SectionReveal.tsx
│   ├── AnimatedCounter.tsx
│   ├── EventCard.tsx
│   ├── TeamCard.tsx
│   └── GalleryGrid.tsx
├── lib/
│   ├── sanity.client.ts         # Sanity fetch client
│   ├── sanity.queries.ts        # All GROQ queries
│   ├── image.ts                 # URL builder helpers
│   └── shimmer.ts               # Blur placeholder generator
├── sanity/
│   ├── config.ts                # Sanity Studio config
│   ├── schema.ts                # Schema barrel
│   └── schemas/                 # event, team, gallery
├── types/
│   └── index.ts                 # TypeScript interfaces
├── .env.local.example           # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```
