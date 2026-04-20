# ToolFocus — Deployment & AdSense Guide

**Owner:** Breakout Trade  
**Contact:** breakouttradeapp@gmail.com  
**Site:** https://toolfocus.in

---

## 🚀 Step 1 — Get a Custom Domain (REQUIRED for AdSense)

AdSense does **not** approve `*.web.app` or any free subdomain.

1. Buy a domain: `toolfocus.in`, `toolfocuspro.com`, or similar from Namecheap / GoDaddy / Cloudflare.
2. In Firebase Hosting console → **Add custom domain** → follow DNS instructions.
3. Update `BASE` in `app/sitemap.ts` and all `canonical` URLs in each page to match your domain.

---

## 🔧 Step 2 — Deploy the Next.js App

This project uses **Next.js App Router** with static export capability.

### Option A — Firebase Hosting (recommended, you already use it)

```bash
npm install
npm run build        # generates .next/
npx firebase deploy  # deploy to Firebase
```

> If using static export, add `output: 'export'` to `next.config.js`.  
> For dynamic routes, use Firebase with Cloud Functions or switch to Vercel.

### Option B — Vercel (easiest for Next.js)

```bash
npx vercel --prod
```

Vercel handles SSR, ISR, and static pages automatically.

---

## 📋 Step 3 — Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → Domain → enter your custom domain
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Paste your verification token into `layout.tsx`:
   ```ts
   verification: { google: 'YOUR_TOKEN_HERE' }
   ```

---

## 💰 Step 4 — Apply for Google AdSense

**Prerequisites checklist before applying:**
- [ ] Custom domain live (not .web.app)
- [ ] Site has been live for at least 2–4 weeks
- [ ] Privacy Policy page accessible at `/privacy`
- [ ] Terms of Service accessible at `/terms`
- [ ] About page accessible at `/about`
- [ ] Contact page accessible at `/contact`
- [ ] Cookie consent banner visible on first visit
- [ ] Site is indexed in Google (check Search Console)
- [ ] Site has original content (blog articles)

**Steps:**
1. Go to https://adsense.google.com → Sign up
2. Enter your site URL (custom domain only)
3. Once approved, get your **publisher ID**: `ca-pub-XXXXXXXXXXXXXXXX`

---

## 🔑 Step 5 — Activate Ads (After Approval)

Edit **`app/layout.tsx`** — uncomment these two blocks:

```tsx
// 1. In <head>:
<meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />

// 2. In <body>:
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

Edit **`components/AdBanner.tsx`** — set your publisher ID:
```ts
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'
```

Then go to your AdSense dashboard → **Ads → By ad unit** → create ad units and copy the real slot IDs into `AD_SLOTS` in `AdBanner.tsx`:

```ts
export const AD_SLOTS = {
  HOME_LEADERBOARD: 'YOUR_REAL_SLOT_1',   // Homepage leaderboard
  TOOL_BELOW:       'YOUR_REAL_SLOT_2',   // Below tool panel
  BLOG_MID:         'YOUR_REAL_SLOT_3',   // Mid-article rectangle
  BLOG_SIDEBAR:     'YOUR_REAL_SLOT_4',   // Sidebar rectangle
  FOOTER_BANNER:    'YOUR_REAL_SLOT_5',   // Footer leaderboard
}
```

---

## 📍 Ad Placement Map

| Location | Slot | Format | Page |
|---|---|---|---|
| Below tool grid | `HOME_LEADERBOARD` | Horizontal 728×90 | Homepage |
| Above footer | `FOOTER_BANNER` | Horizontal 728×90 | Homepage |
| Below tool panel | `TOOL_BELOW` | Horizontal responsive | Tool pages |
| Tool sidebar | `BLOG_SIDEBAR` | Rectangle 300×250 | Tool pages |
| Mid-article | `BLOG_MID` | Rectangle responsive | Blog posts (after 2nd heading) |
| Blog sidebar | `BLOG_SIDEBAR` | Rectangle 300×250 | Blog posts |
| Below article | `FOOTER_BANNER` | Horizontal responsive | Blog posts |

---

## 🔍 SEO Checklist

- [x] `sitemap.xml` auto-generated at `/sitemap.xml`
- [x] `robots.txt` served at `/robots.txt`
- [x] Organization + WebSite JSON-LD in `<head>`
- [x] Article JSON-LD on all blog posts (author: Breakout Trade)
- [x] Canonical URLs on every page
- [x] OpenGraph + Twitter card meta tags
- [x] `generateStaticParams` on tools + blog routes (SSR/SSG)
- [ ] Submit sitemap in Google Search Console
- [ ] Add Google Analytics (optional, after cookie consent)

---

## 📞 Support

Owner: **Breakout Trade**  
Email: breakouttradeapp@gmail.com  
