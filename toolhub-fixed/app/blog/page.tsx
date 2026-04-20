export const dynamic = "force-static";
// ✅ ADD THIS (VERY IMPORTANT)
export function generateStaticParams() {
  return [{}];
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { BLOGS } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Blog & Guides — Developer Tools, SEO & Productivity | ToolFocus',
  description:
    'In-depth guides on JSON, passwords, SEO, URL encoding, and developer productivity. Free, practical articles with no fluff.',
  keywords: [
    'developer tools blog',
    'SEO guides',
    'productivity tips',
    'JSON tutorial',
    'password security',
    'URL encoding guide',
    'free developer resources',
    'ToolFocus blog',
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
  alternates: { canonical: 'https://toolfocus.in/blog' },
  openGraph: {
    type: 'website',
    siteName: 'ToolFocus',
    locale: 'en_US',
    title: 'Blog & Guides — Developer Tools, SEO & Productivity | ToolFocus',
    description:
      'In-depth guides on JSON, passwords, SEO, URL encoding, and developer productivity. Free, practical articles with no fluff.',
    url: 'https://toolfocus.in/blog',
    images: [
      {
        url: 'https://toolfocus.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolFocus Blog & Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Guides — Developer Tools, SEO & Productivity | ToolFocus',
    description:
      'In-depth guides on JSON, passwords, SEO, URL encoding, and developer productivity.',
    images: ['https://toolfocus.in/og-image.png'],
    creator: '@toolfocus',
  },
}

const CATEGORIES = Array.from(new Set(BLOGS.map(b => b.category)))

export default function BlogPage() {
  const totalArticles = BLOGS.length

  /* ── JSON-LD: Blog + BreadcrumbList ── */
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://toolfocus.in/blog#blog',
        name: 'ToolFocus Blog & Guides',
        description:
          'In-depth guides on developer tools, SEO, security, and productivity.',
        url: 'https://toolfocus.in/blog',
        publisher: {
          '@type': 'Organization',
          name: 'ToolFocus',
          url: 'https://toolfocus.in',
          logo: {
            '@type': 'ImageObject',
            url: 'https://toolfocus.in/logo.png',
          },
        },
        blogPost: BLOGS.slice(0, 10).map(blog => ({
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.description,
          url: `https://toolfocus.in/blog/${blog.id}`,
          datePublished: blog.publishDate,
          author: {
            '@type': 'Organization',
            name: 'ToolFocus',
          },
        })),
      },
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
            name: 'Blog',
            item: 'https://toolfocus.in/blog',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://toolfocus.in/blog#webpage',
        url: 'https://toolfocus.in/blog',
        name: 'Blog & Guides — Developer Tools, SEO & Productivity',
        description:
          'In-depth guides on JSON, passwords, SEO, URL encoding, and developer productivity.',
        isPartOf: { '@id': 'https://toolfocus.in/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolfocus.in' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://toolfocus.in/blog' },
          ],
        },
      },
    ],
  }

  return (
    <>
      {/* ── JSON-LD ── */}
      <Script
        id="structured-data-blog-index"
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
          <span className="text-gray-600" aria-current="page">Blog</span>
        </nav>

        {/* ── Page Header — H1 (exactly one, visible, matches page intent) ── */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog &amp; Guides
          </h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            In-depth articles on developer tools, SEO, security, and productivity.
            Written by the ToolFocus team — practical, no-fluff, and free.
          </p>

          {/* Stats row — content signals for AdSense */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1">
              <span aria-hidden="true">📝</span>
              {totalArticles} articles published
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-3 py-1">
              <span aria-hidden="true">📂</span>
              {CATEGORIES.length} categories
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-3 py-1">
              <span aria-hidden="true">🆓</span>
              Always free to read
            </span>
          </div>
        </header>

        {/* ── Ad — top horizontal banner ── */}
        <div className="mb-8">
          <AdBanner slot="5555555555" format="horizontal" />
        </div>

        {/* ── Intro paragraph — content depth for AdSense ── */}
        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mb-10">
          Whether you are a developer looking to streamline your workflow, an SEO
          professional hunting for practical tips, or someone building a more secure
          digital presence — the ToolFocus blog covers it all. Browse by category
          below, or dive straight into any article.
        </p>

        {/* ── Category sections ── */}
        {CATEGORIES.map((cat, catIndex) => {
          const posts = BLOGS.filter(b => b.category === cat)

          return (
            <section
              key={cat}
              aria-labelledby={`cat-heading-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="mb-12"
            >
              {/* H2 — category heading */}
              <div className="flex items-center gap-3 mb-4">
                <h2
                  id={`cat-heading-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-base font-bold text-gray-800"
                >
                  {cat}
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {posts.length} article{posts.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Ad placeholder injected after every 2nd category */}
              {(catIndex + 1) % 2 === 0 && (
                <div className="mt-8" aria-hidden="true">
                  {/* Future AdSense in-feed / responsive ad */}
                </div>
              )}
            </section>
          )
        })}

        {/* ── Ad placeholder — before footer content ── */}
        <div className="mt-4 mb-10" aria-hidden="true">
          {/* Future AdSense leaderboard / responsive banner */}
        </div>

        {/* ── Why Read ToolFocus Blog (content depth section) ── */}
        <section
          aria-labelledby="why-read-heading"
          className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-10"
        >
          <h2
            id="why-read-heading"
            className="text-base font-bold text-gray-800 mb-3"
          >
            Why Read the ToolFocus Blog?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-2xl">
            Every article on the ToolFocus blog is written to be actionable and
            beginner-friendly. We focus on real-world use cases so you can apply
            what you read immediately — no jargon, no unnecessary padding.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🎯',
                title: 'Practical & Actionable',
                desc: 'Every guide is written with real-world use cases in mind.',
              },
              {
                icon: '🔍',
                title: 'SEO & Developer Focused',
                desc: 'Deep dives into tools, techniques, and best practices.',
              },
              {
                icon: '🆕',
                title: 'Regularly Updated',
                desc: 'New articles added frequently across all categories.',
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

        {/* ── CTA — link to tools ── */}
        <aside
          aria-label="Try our free tools"
          className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center"
        >
          <h2 className="text-base font-bold text-green-900 mb-1">
            Looking for a free tool?
          </h2>
          <p className="text-sm text-green-700 mb-4 max-w-md mx-auto">
            ToolFocus offers 20+ free, browser-based utilities for developers,
            writers, and SEO professionals — no signup required.
          </p>
          <Link
            href="/"
            className="inline-block text-xs font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-2.5 transition-colors"
            aria-label="Browse all free tools on ToolFocus"
          >
            Browse All Free Tools →
          </Link>
        </aside>

      </div>
    </>
  )
}
