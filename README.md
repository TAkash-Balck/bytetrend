# ByteTrend — Semi-Auto Tech Blog (AdSense-Ready)

Launch a professional tech site with AI-assisted writing, daily tech headlines, SEO, legal pages, analytics hooks, and AdSense slots.

## Admin Login (preset)
- **Username:** `bytetrend_admin`
- **Password:** `Bt$2025_strong!`
> Change these in `.env` after deploy.

## 1) Run Locally

```bash
npm i
cp .env.example .env
# Fill DATABASE_URL (Vercel Postgres) and SITE_URL
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000 then visit **/admin/login**

## 2) Deploy to Vercel (Recommended)

1. Create a new GitHub repo and upload this folder.
2. Click the button below (after you replace the URL with your repo URL):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository=YOUR_GITHUB_REPO_URL)

### Vercel Postgres
In Vercel → **Storage → Postgres** create a DB and link it. `DATABASE_URL` will be provided automatically.

After first deploy, visit:
```
https://YOUR_DOMAIN/api/seed
```
to add 10 starter posts.

## 3) Environment Variables
- `DATABASE_URL` — from Vercel Postgres
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — admin login
- `OPENAI_API_KEY` — optional for AI draft generation
- `UNSPLASH_ACCESS_KEY` / `PEXELS_API_KEY` — optional image sources
- `SITE_NAME` / `SITE_URL` / `SITE_TWITTER`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 (optional)
- `NEXT_PUBLIC_GSC_VERIFICATION` — Search Console meta
- `NEXT_PUBLIC_ADSENSE` — set to "on" **after approval**
- `NEXT_PUBLIC_ADSENSE_CLIENT` — your AdSense publisher ID
- `NEXT_PUBLIC_BASE_URL` — set to your domain (e.g., https://bytetrend.com)

## 4) AdSense
Ad slots are placeholders and will only render after you set:
```
NEXT_PUBLIC_ADSENSE=on
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

## 5) Search Console & Analytics
- Paste the GSC verification code in `.env` → `NEXT_PUBLIC_GSC_VERIFICATION`
- Add GA4 measurement ID to `NEXT_PUBLIC_GA_ID`

## 6) Sitemap & Robots
- `/sitemap.xml` and `/robots.txt` are generated automatically.

## 7) News
News page and home section pull RSS headlines (title + source + link). No full text to respect copyright.

— 2025-08-15
