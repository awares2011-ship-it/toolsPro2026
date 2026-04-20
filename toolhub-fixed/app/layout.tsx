import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

// ─── Replace with your real AdSense publisher ID after approval ───────────
const PUBLISHER_ID = 'ca-pub-1607968585289432'
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://toolfocus.in'),
  title: {
    default:  'ToolFocus — Free Developer & Productivity Tools',
    template: '%s — ToolFocus',
  },
  description: 'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required.',
  keywords: ['free online tools', 'developer tools', 'json formatter', 'password generator', 'word counter', 'seo tools'],
  authors: [{ name: 'Breakout Trade', url: 'https://toolfocus.in/about' }],
  creator: 'Breakout Trade',
  publisher: 'Breakout Trade',

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    siteName: 'ToolFocus',
    type: 'website',
    locale: 'en_GB',
    url: 'https://toolfocus.in',
    title: 'ToolFocus — Free Developer & Productivity Tools',
    description: 'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup.',
    images: [
      {
        url: 'https://toolfocus.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolFocus — Free Developer & Productivity Tools',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ToolFocus — Free Developer & Productivity Tools',
    description: 'Free browser-based tools for developers, writers & SEO pros. No signup required.',
    images: ['https://toolfocus.in/og-image.png'],
  },

  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },

  verification: {
    google: 'w3SWTovaVL930ay54XX_q8tDdqsQV5uHr_MHaOKGJkA',
  },
}

// Organization schema
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolFocus',
  alternateName: 'Breakout Trade',
  url: 'https://toolfocus.in',
  logo: 'https://toolfocus.in/icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'breakouttradeapp@gmail.com',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolFocus',
  url: 'https://toolfocus.in',
  description: 'Free browser-based tools for developers, writers, and SEO professionals.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://toolfocus.in/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>

        {/* ✅ Google Search Console Verification */}
        <meta name="google-site-verification" content="w3SWTovaVL930ay54XX_q8tDdqsQV5uHr_MHaOKGJkA" />

        {/* ✅ AdSense Verification Script (CRITICAL FIX) */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
          crossOrigin="anonymous"
        ></script>

        {/* Structured Data */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <link rel="ai-content-policy" href="https://toolfocus.in/llms.txt" />

        {/* Optional AdSense meta */}
        <meta name="google-adsense-account" content={PUBLISHER_ID} />

      </head>

      <body className="flex flex-col min-h-screen">

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />

      </body>
    </html>
  )
}
