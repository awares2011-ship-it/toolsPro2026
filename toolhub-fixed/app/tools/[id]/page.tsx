import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { TOOLS, CATEGORIES, getToolById, getRelatedTools } from '@/lib/tools'
import ToolRenderer from '@/components/ToolRenderer'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'
import { AD_SLOTS } from '@/lib/adSlots'

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return TOOLS.map(t => ({ id: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolById(params.id)
  if (!tool) return {}
  return {
    title: `${tool.name} — Free Online Tool | ToolFocus`,
    description: tool.longDesc,
    keywords: tool.keywords,
    authors: [{ name: 'ToolFocus', url: 'https://toolfocus.in' }],
    creator: 'ToolFocus',
    publisher: 'ToolFocus',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: { canonical: `https://toolfocus.in/tools/${tool.id}` },
    openGraph: {
      title: `${tool.name} — Free Online Tool | ToolFocus`,
      description: tool.longDesc,
      type: 'website',
      siteName: 'ToolFocus',
      locale: 'en_US',
      url: `https://toolfocus.in/tools/${tool.id}`,
      images: [
        {
          url: 'https://toolfocus.in/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} — ToolFocus`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} — Free Online Tool | ToolFocus`,
      description: tool.longDesc,
      images: ['https://toolfocus.in/og-image.png'],
      creator: '@toolfocus',
    },
  }
}

export default function ToolPage({ params }: Props) {
  const tool    = getToolById(params.id)
  if (!tool) notFound()

  const cat     = CATEGORIES.find(c => c.id === tool.category)
  const related = getRelatedTools(tool, 4)

  /* ── JSON-LD: SoftwareApplication + BreadcrumbList + FAQPage ── */
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.longDesc,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: `https://toolfocus.in/tools/${tool.id}`,
        publisher: {
          '@type': 'Organization',
          name: 'ToolFocus',
          url: 'https://toolfocus.in',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://toolfocus.in' },
          { '@type': 'ListItem', position: 2, name: cat?.name ?? 'Tools', item: `https://toolfocus.in/tools/category/${tool.category}` },
          { '@type': 'ListItem', position: 3, name: tool.name,        item: `https://toolfocus.in/tools/${tool.id}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is ${tool.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: tool.longDesc,
            },
          },
          {
            '@type': 'Question',
            name: `Is ${tool.name} free to use?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. ${tool.name} on ToolFocus is completely free with no usage limits and no sign-up required.`,
            },
          },
          {
            '@type': 'Question',
            name: `Does ${tool.name} store my data?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `No. ${tool.name} runs entirely in your browser. Your data is never sent to or stored on any server.`,
            },
          },
          {
            '@type': 'Question',
            name: `Can I use ${tool.name} on my phone?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. ${tool.name} is fully responsive and works on all devices including smartphones and tablets.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      {/* ── JSON-LD ── */}
      <Script
        id={`structured-data-${tool.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/tools/category/${tool.category}`}
            className="hover:text-green-600 transition-colors"
          >
            {cat?.icon} {cat?.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600" aria-current="page">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Tool Panel ── */}
          <main className="lg:col-span-2" id="main-content">

            {/* H1 — exactly one, visible, matches page intent */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{tool.name}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.longDesc}</p>
            </div>

            {/* Tool UI */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <ToolRenderer toolId={tool.id} />
            </div>

            {/* Ad — below tool (horizontal leaderboard) */}
            <div className="mt-6">
              <AdBanner slot={AD_SLOTS.TOOL_BELOW} format="horizontal" />
            </div>

            {/* ══════════════════════════════════════════════
                SEO + AdSense content sections — below tool
            ══════════════════════════════════════════════ */}

            {/* ── What is this tool ── */}
            <section
              aria-labelledby="what-is-heading"
              className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-6"
            >
              <h2
                id="what-is-heading"
                className="text-lg font-bold text-gray-800 mb-3"
              >
                What is {tool.name}?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {tool.longDesc}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.name} is part of ToolFocus — a collection of free,
                browser-based utilities built for developers, writers, and SEO
                professionals. No installation, no account, and no data ever
                leaves your device.
              </p>
            </section>

            {/* Ad placeholder — mid content */}
            <div className="mt-6" aria-hidden="true">
              {/* Future AdSense in-article / responsive ad */}
            </div>

            {/* ── How to Use ── */}
            <section
              aria-labelledby="how-to-use-heading"
              className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h2
                id="how-to-use-heading"
                className="text-lg font-bold text-gray-800 mb-4"
              >
                How to Use {tool.name}
              </h2>
              <ol className="space-y-3">
                {[
                  `Open ${tool.name} on this page — no download or sign-up needed.`,
                  'Paste or type your input into the provided field.',
                  'The result is generated instantly in your browser.',
                  'Copy, download, or use the output however you need.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* ── Benefits ── */}
            <section
              aria-labelledby="benefits-heading"
              className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-6"
            >
              <h2
                id="benefits-heading"
                className="text-lg font-bold text-gray-800 mb-4"
              >
                Benefits of Using {tool.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: '⚡',
                    title: 'Instant Results',
                    desc: 'Processing happens locally in your browser — zero server latency.',
                  },
                  {
                    icon: '🔒',
                    title: 'Completely Private',
                    desc: 'Your input is never sent to any server. Your data stays on your device.',
                  },
                  {
                    icon: '🆓',
                    title: 'Always Free',
                    desc: 'No pricing tiers, no limits, no hidden fees — free forever.',
                  },
                  {
                    icon: '📱',
                    title: 'Works Everywhere',
                    desc: 'Fully responsive on desktop, tablet, and smartphone.',
                  },
                ].map(({ icon, title, desc }) => (
                  <article
                    key={title}
                    className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4"
                  >
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Ad placeholder — before FAQ */}
            <div className="mt-6" aria-hidden="true">
              {/* Future AdSense display / responsive ad */}
            </div>

            {/* ── FAQ ── */}
            <section
              aria-labelledby="faq-heading"
              itemScope
              itemType="https://schema.org/FAQPage"
              className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4"
            >
              <h2
                id="faq-heading"
                className="text-lg font-bold text-gray-800 mb-5"
              >
                Frequently Asked Questions
              </h2>

              <div className="divide-y divide-gray-100">
                {[
                  {
                    q: `What is ${tool.name}?`,
                    a: tool.longDesc,
                  },
                  {
                    q: `Is ${tool.name} free to use?`,
                    a: `Yes. ${tool.name} is 100% free with no usage limits and no account required.`,
                  },
                  {
                    q: `Does ${tool.name} store or share my data?`,
                    a: `No. ${tool.name} runs entirely in your browser. Nothing is sent to or logged on any server, keeping your data fully private.`,
                  },
                  {
                    q: `Can I use ${tool.name} on a mobile device?`,
                    a: `Absolutely. ${tool.name} is fully responsive and works on all screen sizes including phones and tablets.`,
                  },
                  {
                    q: `Do I need to install anything to use ${tool.name}?`,
                    a: `No installation is needed. Simply open the tool in any modern browser and start using it immediately.`,
                  },
                ].map(({ q, a }) => (
                  <div
                    key={q}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    className="py-4"
                  >
                    <h3
                      itemProp="name"
                      className="text-sm font-semibold text-gray-800 mb-1.5"
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
                        className="text-sm text-gray-500 leading-relaxed"
                      >
                        {a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* ── Sidebar ── */}
          <aside aria-label="Sidebar" className="space-y-5">

            {/* About this tool */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                About this tool
              </p>
              <ul className="space-y-2" role="list">
                {[
                  'Runs entirely in your browser',
                  'No data is sent to any server',
                  'Free — no signup required',
                  'Works on mobile and desktop',
                ].map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className="text-green-500 mt-0.5" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar ad — rectangle (300×250 ideal) */}
            <AdBanner slot={AD_SLOTS.BLOG_SIDEBAR} format="rectangle" />

            {/* Related tools */}
            {related.length > 0 && (
              <nav aria-label="Related tools">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Related tools
                </p>
                <div className="space-y-2">
                  {related.map(t => <ToolCard key={t.id} tool={t} />)}
                </div>
              </nav>
            )}

            {/* Category link */}
            <Link
              href={`/tools/category/${tool.category}`}
              className="block text-center text-xs font-semibold text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50 transition-colors"
              aria-label={`View all ${cat?.name} tools`}
            >
              View all {cat?.name} →
            </Link>

            {/* Sidebar ad placeholder — bottom */}
            <div aria-hidden="true">
              {/* Future AdSense sidebar rectangle ad */}
            </div>

          </aside>
        </div>
      </div>
    </>
  )
}
