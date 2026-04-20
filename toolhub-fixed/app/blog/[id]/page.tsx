import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { BLOGS } from '@/lib/blogs'
import { TOOLS } from '@/lib/tools'
import BlogCard from '@/components/BlogCard'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'
import { AD_SLOTS } from '@/lib/adSlots'

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return BLOGS.map(b => ({ id: b.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = BLOGS.find(b => b.id === params.id)
  if (!blog) return {}
  return {
    title: `${blog.title} | ToolFocus Blog`,
    description: blog.description,
    keywords: blog.tags,
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
    alternates: { canonical: `https://toolfocus.in/blog/${blog.id}` },
    openGraph: {
      title: `${blog.title} | ToolFocus Blog`,
      description: blog.description,
      type: 'article',
      siteName: 'ToolFocus',
      locale: 'en_US',
      publishedTime: blog.publishDate,
      tags: blog.tags,
      url: `https://toolfocus.in/blog/${blog.id}`,
      images: [
        {
          url: 'https://toolfocus.in/og-image.png',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | ToolFocus Blog`,
      description: blog.description,
      images: ['https://toolfocus.in/og-image.png'],
      creator: '@toolfocus',
    },
  }
}

// Minimal markdown renderer — handles ## headings, **bold**, ``` code blocks, tables
function renderContent(md: string, midAdSlot: string): React.ReactNode[] {
  const lines  = md.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0
  let h2count = 0          // inject mid-article ad after 2nd heading
  let adInjected = false

  const inlineParse = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    return parts.map((p, idx) => {
      if (p.startsWith('**') && p.endsWith('**')) return <strong key={idx}>{p.slice(2, -2)}</strong>
      if (p.startsWith('`')  && p.endsWith('`'))  return <code key={idx} className="bg-gray-100 text-red-600 px-1 rounded text-[0.85em] font-mono">{p.slice(1, -1)}</code>
      return p
    })
  }

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.trimStart().startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      nodes.push(
        <pre key={i} className="bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto text-xs font-mono my-4 whitespace-pre">
          {codeLines.join('\n')}
        </pre>
      )
      i++
      continue
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map(h => h.trim()).filter(Boolean)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').map(c => c.trim()).filter(Boolean))
        i++
      }
      nodes.push(
        <div key={i} className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {headers.map((h, j) => (
                  <th key={j} className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="odd:bg-white even:bg-gray-50">
                  {row.map((cell, k) => (
                    <td key={k} className="border border-gray-200 px-3 py-2 text-xs text-gray-600">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      h2count++
      nodes.push(
        <h2 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
      // Inject mid-article ad after 2nd H2
      if (h2count === 2 && !adInjected) {
        adInjected = true
        nodes.push(
          <div key={`mid-ad-${i}`} className="my-6">
            <AdBanner slot={midAdSlot} format="rectangle" />
          </div>
        )
      }
      i++; continue
    }

    // H3
    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={i} className="text-base font-semibold text-gray-800 mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
      i++; continue
    }

    // Bullet
    if (line.startsWith('- ') || line.startsWith('• ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('• '))) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-3 text-gray-600 text-sm">
          {items.map((it, j) => <li key={j}>{inlineParse(it)}</li>)}
        </ul>
      )
      continue
    }

    // Blank line
    if (!line.trim()) { i++; continue }

    // Paragraph
    nodes.push(
      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">
        {inlineParse(line)}
      </p>
    )
    i++
  }
  return nodes
}

export default function BlogPost({ params }: Props) {
  const blog = BLOGS.find(b => b.id === params.id)
  if (!blog) notFound()

  const relatedBlogs = blog.relatedBlogs
    .map(id => BLOGS.find(b => b.id === id))
    .filter(Boolean) as typeof BLOGS

  const relatedTool = TOOLS.find(t => t.id === blog.relatedTool)

  /* ── JSON-LD: Article + BreadcrumbList ── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://toolfocus.in/blog/${blog.id}#article`,
        headline: blog.title,
        description: blog.description,
        datePublished: blog.publishDate,
        dateModified: blog.publishDate,
        inLanguage: 'en-US',
        keywords: blog.tags.join(', '),
        articleSection: blog.category,
        author: {
          '@type': 'Organization',
          name: 'ToolFocus',
          url: 'https://toolfocus.in',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ToolFocus',
          url: 'https://toolfocus.in',
          logo: {
            '@type': 'ImageObject',
            url: 'https://toolfocus.in/logo.png',
          },
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://toolfocus.in/og-image.png',
          width: 1200,
          height: 630,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://toolfocus.in/blog/${blog.id}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolfocus.in' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://toolfocus.in/blog' },
          { '@type': 'ListItem', position: 3, name: blog.title, item: `https://toolfocus.in/blog/${blog.id}` },
        ],
      },
    ],
  }

  const formattedDate = new Date(blog.publishDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* ── JSON-LD (using next/script for proper hydration) ── */}
      <Script
        id={`structured-data-blog-${blog.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600 truncate max-w-[200px]" aria-current="page">
            {blog.title}
          </span>
        </nav>

        {/* ── Ad placeholder — top banner ── */}
        <div className="mb-6" aria-hidden="true">
          {/* Future AdSense leaderboard / responsive banner */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Article ── */}
          <article
            className="lg:col-span-2"
            itemScope
            itemType="https://schema.org/Article"
          >
            {/* Article meta */}
            <header>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-400">{blog.readTime} min read</span>
                <span className="text-xs text-gray-300" aria-hidden="true">·</span>
                <time
                  className="text-xs text-gray-400"
                  dateTime={blog.publishDate}
                  itemProp="datePublished"
                >
                  {formattedDate}
                </time>
                <span className="text-xs text-gray-300" aria-hidden="true">·</span>
                <span className="text-xs text-gray-400">
                  By{' '}
                  <strong className="text-gray-500" itemProp="author">ToolFocus</strong>
                </span>
              </div>

              {/* H1 — exactly one, visible, matches page intent */}
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3"
                itemProp="headline"
              >
                {blog.title}
              </h1>

              {/* Intro / description */}
              <p
                className="text-gray-500 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6"
                itemProp="description"
              >
                {blog.description}
              </p>

              {/* Reading time + progress hint */}
              <div className="flex items-center gap-2 mb-6 text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-fit">
                <span aria-hidden="true">📖</span>
                <span>Estimated reading time: <strong className="text-gray-600">{blog.readTime} minutes</strong></span>
              </div>
            </header>

            {/* Article body — mid-article ad injected automatically after 2nd H2 */}
            <div itemProp="articleBody">
              {renderContent(blog.content, AD_SLOTS.BLOG_MID)}
            </div>

            {/* ── Ad placeholder — after article body ── */}
            <div className="mt-8" aria-hidden="true">
              {/* Future AdSense in-article / responsive ad */}
            </div>

            {/* Tags */}
            <footer>
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider self-center mr-1">
                  Tags:
                </span>
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author byline */}
              <div
                className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <div
                  className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0"
                  aria-hidden="true"
                >
                  TF
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700" itemProp="name">
                    ToolFocus
                  </p>
                  <p className="text-[10px] text-gray-400">ToolFocus editorial team</p>
                </div>
              </div>

              {/* ── Share prompt — improves engagement signals ── */}
              <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-green-700 mb-1">
                  Found this helpful?
                </p>
                <p className="text-[11px] text-green-600">
                  Share it with your team or bookmark it for later.
                </p>
              </div>
            </footer>
          </article>

          {/* ── Sidebar ── */}
          <aside aria-label="Blog sidebar" className="space-y-5">

            {/* Related tool CTA */}
            {relatedTool && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-2">
                  Try the tool
                </p>
                <p className="text-sm font-bold text-green-900 mb-1">{relatedTool.name}</p>
                <p className="text-xs text-green-700 mb-3">{relatedTool.shortDesc}</p>
                <Link
                  href={`/tools/${relatedTool.id}`}
                  className="block text-center text-xs font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 transition-colors"
                  aria-label={`Open ${relatedTool.name} tool`}
                >
                  Open tool →
                </Link>
              </div>
            )}

            {/* Sidebar ad — rectangle */}
            <AdBanner slot={AD_SLOTS.BLOG_SIDEBAR} format="rectangle" />

            {/* Related articles */}
            {relatedBlogs.length > 0 && (
              <nav aria-label="Related articles">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Related articles
                </p>
                <div className="space-y-3">
                  {relatedBlogs.map(b => <BlogCard key={b.id} blog={b} />)}
                </div>
              </nav>
            )}

            {/* Back to blog */}
            <Link
              href="/blog"
              className="block text-center text-xs font-semibold text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50 transition-colors"
              aria-label="View all blog articles"
            >
              ← All articles
            </Link>

            {/* Sidebar ad placeholder — bottom */}
            <div aria-hidden="true">
              {/* Future AdSense sidebar rectangle ad */}
            </div>

          </aside>
        </div>

        {/* ── Bottom leaderboard ad ── */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <AdBanner slot={AD_SLOTS.FOOTER_BANNER} format="horizontal" />
        </div>

        {/* ── More from ToolFocus (content depth + internal linking) ── */}
        <section
          aria-labelledby="more-blogs-heading"
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <h2
            id="more-blogs-heading"
            className="text-base font-bold text-gray-800 mb-5"
          >
            More from the ToolFocus Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOGS.filter(b => b.id !== blog.id)
              .slice(0, 4)
              .map(b => (
                <Link
                  key={b.id}
                  href={`/blog/${b.id}`}
                  className="group flex flex-col gap-1.5 bg-white border border-gray-100 rounded-2xl p-4 hover:border-green-200 hover:shadow-sm transition-all"
                >
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    {b.category}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-snug">
                    {b.title}
                  </p>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {b.readTime} min read ·{' '}
                    {new Date(b.publishDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </Link>
              ))}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/blog"
              className="inline-block text-xs font-semibold text-green-700 border border-green-200 rounded-xl px-5 py-2.5 hover:bg-green-50 transition-colors"
            >
              View all articles →
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
