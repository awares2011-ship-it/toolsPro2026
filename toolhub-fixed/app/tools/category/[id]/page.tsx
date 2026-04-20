export const dynamic = 'force-static' // ✅ ADD THIS

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ id: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find(c => c.id === params.id)
  if (!cat) return {}

  const toolCount = TOOLS.filter(t => t.category === cat.id).length

  return {
    title: `${cat.name} Tools — ${toolCount} Free Online Tools | ToolFocus`,
    description: `${cat.desc}. Explore ${toolCount} free, instant, browser-based ${cat.name.toLowerCase()} tools — no signup required.`,
    keywords: [
      `free ${cat.name.toLowerCase()} tools`,
      `online ${cat.name.toLowerCase()} utilities`,
      `browser ${cat.name.toLowerCase()} tools`,
      'no signup tools',
      'ToolFocus',
      cat.name,
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
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: { canonical: `https://toolfocus.in/tools/category/${cat.id}` },
    openGraph: {
      type: 'website',
      siteName: 'ToolFocus',
      locale: 'en_US',
      title: `${cat.name} Tools — ${toolCount} Free Online Tools | ToolFocus`,
      description: `${cat.desc}. Explore ${toolCount} free, instant, browser-based ${cat.name.toLowerCase()} tools — no signup required.`,
      url: `https://toolfocus.in/tools/category/${cat.id}`,
      images: [
        {
          url: 'https://toolfocus.in/og-image.png',
          width: 1200,
          height: 630,
          alt: `${cat.name} Tools — ToolFocus`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.name} Tools — ${toolCount} Free Online Tools | ToolFocus`,
      description: `${cat.desc}. Free, instant, browser-based — no signup required.`,
      images: ['https://toolfocus.in/og-image.png'],
      creator: '@toolfocus',
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat    = CATEGORIES.find(c => c.id === params.id)
  if (!cat) notFound()

  const tools  = TOOLS.filter(t => t.category === cat.id)
  const others = CATEGORIES.filter(c => c.id !== cat.id)

  /* ── JSON-LD: BreadcrumbList + ItemList ── */
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://toolfocus.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: cat.name,
            item: `https://toolfocus.in/tools/category/${cat.id}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${cat.name} Tools`,
        description: cat.desc,
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: tool.name,
          url: `https://toolfocus.in/tools/${tool.id}`,
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `https://toolfocus.in/tools/category/${cat.id}`,
        url: `https://toolfocus.in/tools/category/${cat.id}`,
        name: `${cat.name} Tools — Free Online Tools`,
        description: cat.desc,
        isPartOf: { '@id': 'https://toolfocus.in/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://toolfocus.in' },
            { '@type': 'ListItem', position: 2, name: cat.name,  item: `https://toolfocus.in/tools/category/${cat.id}` },
          ],
        },
      },
    ],
  }

  return (
    <>
      {/* ── JSON-LD ── */}
      <Script
        id={`structured-data-category-${cat.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-gray-400 mb-6"
        >
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600" aria-current="page">{cat.name}</span>
        </nav>

        {/* ── Page Header — H1 (exactly one, visible, matches page intent) ── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
            <h1 className="text-2xl font-bold text-gray-900">
              {cat.name} Tools
            </h1>
          </div>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            {cat.desc}. Free, browser-based — no signup required.
          </p>
          {/* Tool count badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1">
              <span aria-hidden="true">🛠</span>
              {tools.length} free tool{tools.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </header>

        {/* ── Ad placeholder — top banner ── */}
        <div className="mb-6" aria-hidden="true">
          {/* Future AdSense leaderboard / responsive banner */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Main Tools Grid ── */}
          <main className="lg:col-span-3" id="main-content">

            {/* Intro paragraph — content depth for AdSense */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-2xl">
              Explore our collection of free <strong>{cat.name.toLowerCase()} tools</strong> below.
              Every tool runs entirely in your browser — your data is never uploaded or stored.
              Simply pick a tool and get instant results, no installation or account needed.
            </p>

            {/* ── H2: All tools in category ── */}
            <h2 className="text-base font-semibold text-gray-700 mb-4">
              All {cat.name} Tools ({tools.length})
            </h2>

            {/* Tools grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* Ad — horizontal leaderboard below tool grid */}
            <AdBanner slot="4444444444" format="horizontal" />

            {/* ── Why Use These Tools (content section for AdSense depth) ── */}
            <section
              aria-labelledby="why-use-heading"
              className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-6"
            >
              <h2
                id="why-use-heading"
                className="text-base font-bold text-gray-800 mb-3"
              >
                Why Use Free {cat.name} Tools on ToolFocus?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                All {cat.name.toLowerCase()} tools on ToolFocus are designed to be fast,
                private, and accessible to everyone. Whether you are a professional or a
                beginner, our tools help you get the job done without friction.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    icon: '⚡',
                    title: 'Instant & Offline-Ready',
                    desc: 'All processing happens locally in your browser with zero latency.',
                  },
                  {
                    icon: '🔒',
                    title: 'Private by Design',
                    desc: 'Your input never leaves your device — no server, no logs.',
                  },
                  {
                    icon: '🆓',
                    title: 'Always Free',
                    desc: 'No pricing plans, no limits. Free for everyone, forever.',
                  },
                  {
                    icon: '📱',
                    title: 'Works on Any Device',
                    desc: 'Fully responsive — desktop, tablet, and smartphone.',
                  },
                ].map(({ icon, title, desc }) => (
                  <article
                    key={title}
                    className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4"
                  >
                    <span className="text-xl mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ── Ad placeholder — mid content ── */}
            <div className="mt-6" aria-hidden="true">
              {/* Future AdSense in-article / responsive ad */}
            </div>

            {/* ── FAQ Section ── */}
            <section
              aria-labelledby="faq-heading"
              itemScope
              itemType="https://schema.org/FAQPage"
              className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h2
                id="faq-heading"
                className="text-base font-bold text-gray-800 mb-5"
              >
                Frequently Asked Questions
              </h2>

              <div className="divide-y divide-gray-100">
                {[
                  {
                    q: `What ${cat.name.toLowerCase()} tools are available on ToolFocus?`,
                    a: `ToolFocus offers ${tools.length} free ${cat.name.toLowerCase()} tools including ${tools.slice(0, 3).map(t => t.name).join(', ')}${tools.length > 3 ? ', and more' : ''}. All tools run in your browser with no signup required.`,
                  },
                  {
                    q: `Are the ${cat.name.toLowerCase()} tools really free?`,
                    a: `Yes. Every ${cat.name.toLowerCase()} tool on ToolFocus is completely free with no usage limits, no premium tier, and no account needed.`,
                  },
                  {
                    q: `Is my data safe when using ${cat.name.toLowerCase()} tools?`,
                    a: `Absolutely. All tools process data directly in your browser. Nothing is ever sent to or stored on our servers, so your data stays completely private.`,
                  },
                  {
                    q: `Can I use ${cat.name.toLowerCase()} tools on my phone?`,
                    a: `Yes. All ToolFocus tools are fully responsive and work seamlessly on smartphones, tablets, and desktop browsers.`,
                  },
                  {
                    q: `Do I need to install anything to use these tools?`,
                    a: `No. Simply open any tool in your browser and start using it immediately — no download, no extension, and no account required.`,
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

            {/* ── Ad placeholder — below FAQ ── */}
            <div className="mt-6" aria-hidden="true">
              {/* Future AdSense display / responsive ad */}
            </div>

          </main>

          {/* ── Sidebar — Other Categories ── */}
          <aside aria-label="Other tool categories" className="space-y-4">

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Other categories
            </p>

            <nav aria-label="Tool categories">
              {others.map(c => (
                <Link
                  key={c.id}
                  href={`/tools/category/${c.id}`}
                  className="flex items-center gap-2.5 p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all group mb-2"
                  aria-label={`${c.name} — ${TOOLS.filter(t => t.category === c.id).length} tools`}
                >
                  <span className="text-lg" aria-hidden="true">{c.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                      {c.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {TOOLS.filter(t => t.category === c.id).length} tools
                    </p>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Sidebar ad placeholder */}
            <div className="mt-4" aria-hidden="true">
              {/* Future AdSense sidebar rectangle (300×250) */}
            </div>

            {/* Back to all tools CTA */}
            <Link
              href="/"
              className="block text-center text-xs font-semibold text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50 transition-colors mt-2"
              aria-label="Browse all ToolFocus tools"
            >
              ← Browse All Tools
            </Link>

          </aside>
        </div>
      </div>
    </>
  )
}
