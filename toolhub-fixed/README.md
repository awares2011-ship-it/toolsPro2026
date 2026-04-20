# ToolFocus — Free Developer & Productivity Tools

A production-ready Next.js 14 project — 21 working browser tools, 20 blog posts, full AdSense integration, SEO, and legal pages.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project structure

```
toolfocus/
├── app/
│   ├── layout.tsx              # Root layout — Header, Footer, CookieConsent
│   ├── page.tsx                # Homepage
│   ├── sitemap.ts              # Auto-generated sitemap for all pages/tools/blogs
│   ├── robots.ts               # robots.txt via Next.js
│   ├── not-found.tsx           # 404 page
│   ├── about/page.tsx
│   ├── privacy/page.tsx        # ← required for AdSense
│   ├── terms/page.tsx          # ← required for AdSense
│   ├── contact/page.tsx        # ← required for AdSense
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [id]/page.tsx       # Individual blog post
│   └── tools/
│       ├── [id]/page.tsx       # Individual tool page
│       └── category/[id]/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx              # Includes Privacy / Terms / Contact links
│   ├── HomepageClient.tsx
│   ├── ToolCard.tsx
│   ├── BlogCard.tsx
│   ├── AdBanner.tsx            # Google AdSense wrapper
│   ├── CookieConsent.tsx       # GDPR-compliant consent banner
│   └── ToolRenderer.tsx        # 21 working tool implementations
├── lib/
│   ├── tools.ts                # All 21 tools + 5 categories
│   ├── blogs.ts                # 20 long-form blog posts
│   └── colors.ts
└── public/
    └── robots.txt
```

---

## Before going live — checklist

### 1. Replace AdSense placeholder IDs
Search the project for `ca-pub-XXXXXXXXXX` and replace with your real publisher ID:
- `components/AdBanner.tsx`
- `components/CookieConsent.tsx`
- `app/layout.tsx` (uncomment the meta tag after approval)

Also replace ad slot IDs (`1111111111`, `2222222222`, etc.) with your real slot IDs from AdSense.

### 2. Apply for Google AdSense
Your site now has all required pages:
- ✅ `/privacy` — Privacy Policy
- ✅ `/terms` — Terms of Service
- ✅ `/contact` — Contact page
- ✅ Cookie consent banner (loads AdSense only after user accepts)
- ✅ `/sitemap.xml` — auto-generated
- ✅ `/robots.txt`

Apply at: https://www.google.com/adsense/start/

### 3. Wire up the contact form
In `app/contact/page.tsx`, replace the mock `await new Promise(...)` with a real endpoint.

**Easiest — Formspree (free):**
1. Sign up at formspree.io
2. Replace the mock with:
```ts
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: JSON.stringify(form),
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
})
setStatus(res.ok ? 'success' : 'error')
```

### 4. Update your domain
Replace all instances of `https://toolfocus.app` with your actual domain in:
- `app/layout.tsx` (metadataBase)
- `app/sitemap.ts`
- `app/robots.ts`
- All `alternates: { canonical: ... }` entries

### 5. Add a favicon
Place `favicon.ico` and `icon.png` in `/public/`.

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at vercel.com for automatic deploys on push.

---

## Adding new tools

1. Add a new entry to `TOOLS` in `lib/tools.ts`
2. Add a new component in `components/ToolRenderer.tsx` and register it in the `RENDERERS` map

---

## Adding new blog posts

Add a new entry to `BLOGS` in `lib/blogs.ts`. The blog listing, sitemap, and JSON-LD structured data are all generated automatically.

---

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google AdSense** (consent-gated)
- **Google Analytics** (consent-gated)
- Deployed on **Vercel**
