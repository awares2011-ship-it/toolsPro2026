import type { Metadata } from 'next'
import HomepageClient from '@/components/HomepageClient'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'ToolFocus — Free Developer & Productivity Tools',
  description:
    'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required.',
  keywords: [
    'free developer tools',
    'online productivity tools',
    'JSON formatter',
    'password generator',
    'word counter',
    'Base64 encoder',
    'SEO tools',
    'browser tools',
    'no signup tools',
    'ToolFocus',
  ],
  authors: [{ name: 'ToolFocus', url: 'https://toolfocus.in' }],
  creator: 'ToolFocus',
  publisher: 'ToolFocus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: 'https://toolfocus.in' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ToolFocus',
    title: 'ToolFocus — Free Developer & Productivity Tools',
    description:
      'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required.',
    url: 'https://toolfocus.in',
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
    description:
      'Free browser-based tools for developers, writers & SEO pros. No signup required.',
    images: ['https://toolfocus.in/og-image.png'],
    creator: '@toolfocus',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://toolfocus.in/#website',
      url: 'https://toolfocus.in',
      name: 'ToolFocus',
      description:
        'Free browser-based tools for developers, writers & SEO professionals.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://toolfocus.in/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://toolfocus.in/#organization',
      name: 'ToolFocus',
      url: 'https://toolfocus.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toolfocus.in/logo.png',
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://toolfocus.in/#webpage',
      url: 'https://toolfocus.in',
      name: 'ToolFocus — Free Developer & Productivity Tools',
      isPartOf: { '@id': 'https://toolfocus.in/#website' },
      about: { '@id': 'https://toolfocus.in/#organization' },
      description:
        'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://toolfocus.in',
          },
        ],
      },
    },
  ],
}

export default function HomePage() {
  // ✅ SAFETY FIX (ensures tools never break UI)
  const safeTools = Array.isArray(TOOLS) ? TOOLS : []
  const safeCategories = Array.isArray(CATEGORIES) ? CATEGORIES : []
  const safeBlogs = Array.isArray(BLOGS) ? BLOGS.slice(0, 6) : []

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        {/* ── Hero / Above-the-fold SEO Block ── */}
        <section
          aria-labelledby="homepage-heading"
          style={{
            textAlign: 'center',
            padding: '2.5rem 1rem 1.5rem',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          {/* EXACTLY ONE H1 — visible, matches page intent */}
          <h1
            id="homepage-heading"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Free Online Tools for Developers, Writers &amp; SEO Pros
          </h1>

          {/* Intro paragraph — improves dwell time & AdSense content density */}
          <p
            style={{
              fontSize: '1.05rem',
              color: '#555',
              maxWidth: '620px',
              margin: '0 auto 0.5rem',
              lineHeight: 1.7,
            }}
          >
            ToolFocus gives you instant access to{' '}
            <strong>20+ free, browser-based utilities</strong> — no account,
            no install, no tracking. Format JSON, generate secure passwords,
            count words, encode Base64, and much more, all in one place.
          </p>
        </section>

        {/* ── Ad Placeholder — Top Banner ── */}
        <div
          aria-hidden="true"
          style={{
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
            padding: '0 1rem',
          }}
        >
          {/* Future AdSense leaderboard (728×90 or responsive) goes here */}
        </div>

        {/* ── All Tools & Categories (existing client component) ── */}
        <HomepageClient
          tools={safeTools}
          categories={safeCategories}
          blogs={safeBlogs}
        />

        {/* ── Ad Placeholder — Mid-page ── */}
        <div
          aria-hidden="true"
          style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}
        >
          {/* Future AdSense in-article / responsive ad goes here */}
        </div>

        {/* ── Why ToolFocus (H2 content section — AdSense content depth) ── */}
        <section
          aria-labelledby="why-toolfocus"
          style={{
            maxWidth: '780px',
            margin: '2rem auto',
            padding: '0 1.25rem 2rem',
          }}
        >
          <h2
            id="why-toolfocus"
            style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}
          >
            Why Choose ToolFocus?
          </h2>
          <p style={{ lineHeight: 1.75, color: '#444', marginBottom: '1rem' }}>
            Every tool on ToolFocus runs entirely in your browser. That means
            your data never leaves your device — no server uploads, no logs,
            no privacy concerns.
          </p>
          <p style={{ lineHeight: 1.75, color: '#444', marginBottom: '1rem' }}>
            Whether you are a developer who needs a quick JSON formatter, a
            writer checking word count, or an SEO specialist validating
            meta tags — ToolFocus has a dedicated, distraction-free tool for
            each task.
          </p>

          {/* H3 feature grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.25rem',
            }}
          >
            {[
              {
                icon: '⚡',
                heading: 'Instant Results',
                body: 'All processing happens locally — zero network latency.',
              },
              {
                icon: '🔒',
                heading: '100% Private',
                body: 'No data is ever sent to our servers.',
              },
              {
                icon: '🆓',
                heading: 'Always Free',
                body: 'Every tool is free to use, forever, with no limits.',
              },
              {
                icon: '📱',
                heading: 'Works Everywhere',
                body: 'Fully responsive — desktop, tablet, or mobile.',
              },
            ].map(({ icon, heading, body }) => (
              <article
                key={heading}
                style={{
                  background: '#f7f8fa',
                  borderRadius: '10px',
                  padding: '1rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                  }}
                >
                  {icon} {heading}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Ad Placeholder — Before FAQ ── */}
        <div
          aria-hidden="true"
          style={{ maxWidth: '900px', margin: '0 auto 1rem', padding: '0 1rem' }}
        >
          {/* Future AdSense display / responsive ad goes here */}
        </div>

        {/* ── FAQ Section (H2 → H3 hierarchy, boosts featured snippets) ── */}
        <section
          aria-labelledby="faq-heading"
          itemScope
          itemType="https://schema.org/FAQPage"
          style={{
            maxWidth: '780px',
            margin: '0 auto 3rem',
            padding: '0 1.25rem',
          }}
        >
          <h2
            id="faq-heading"
            style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem' }}
          >
            Frequently Asked Questions
          </h2>

          {[
            {
              q: 'Are all ToolFocus tools completely free?',
              a: 'Yes. Every tool on ToolFocus is 100% free with no usage limits, no premium tier, and no sign-up required.',
            },
            {
              q: 'Do I need to create an account to use the tools?',
              a: 'No account is needed. Simply open any tool and start using it immediately — no registration, no email, no password.',
            },
            {
              q: 'Is my data safe when I use these tools?',
              a: 'Absolutely. All tools process data directly in your browser. Nothing is sent to or stored on our servers, so your data stays completely private.',
            },
            {
              q: 'What kinds of tools does ToolFocus offer?',
              a: 'ToolFocus offers tools across categories including developer utilities (JSON formatter, Base64 encoder), text tools (word counter, case converter), security tools (password generator), and SEO utilities — with more added regularly.',
            },
            {
              q: 'Can I use ToolFocus on my phone or tablet?',
              a: 'Yes. ToolFocus is fully responsive and works seamlessly on all screen sizes including smartphones and tablets.',
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              style={{
                borderBottom: '1px solid #eee',
                padding: '1rem 0',
              }}
            >
              <h3
                itemProp="name"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                  color: '#222',
                }}
              >
                {q}
              </h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  itemProp="text"
                  style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.7 }}
                >
                  {a}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Ad Placeholder — Footer Banner ── */}
        <div
          aria-hidden="true"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', padding: '0 1rem' }}
        >
          {/* Future AdSense leaderboard / anchor ad goes here */}
        </div>
      </main>
    </>
  )
}
