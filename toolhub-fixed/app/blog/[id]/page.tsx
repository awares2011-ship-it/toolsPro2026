import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    alternates: { canonical: `https://toolhub.app/blog/${blog.id}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.publishDate,
      tags: blog.tags,
      url: `https://toolhub.app/blog/${blog.id}`,
      images: [
        {
          url: 'https://toolhub.app/og-image.png',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://toolhub.app/og-image.png'],
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
                {headers.map((h, j) => <th key={j} className="border border-gray-200 px-3 py-2 text-left text-xs font-semibold text-gray-700">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="odd:bg-white even:bg-gray-50">
                  {row.map((cell, k) => <td key={k} className="border border-gray-200 px-3 py-2 text-xs text-gray-600">{cell}</td>)}
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
      nodes.push(<h2 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-3">{line.slice(3)}</h2>)
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
      nodes.push(<h3 key={i} className="text-base font-semibold text-gray-800 mt-6 mb-2">{line.slice(4)}</h3>)
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
    nodes.push(<p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">{inlineParse(line)}</p>)
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description,
    datePublished: blog.publishDate,
    author: { '@type': 'Organization', name: 'Breakout Trade', url: 'https://toolhub.app/about' },
    publisher: { '@type': 'Organization', name: 'ToolHub by Breakout Trade', url: 'https://toolhub.app' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{blog.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Article ───────────────────────────────────── */}
          <article className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{blog.category}</span>
              <span className="text-xs text-gray-400">{blog.readTime} min read</span>
              <span className="text-xs text-gray-300">·</span>
              <time className="text-xs text-gray-400" dateTime={blog.publishDate}>
                {new Date(blog.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">By <strong className="text-gray-500">Breakout Trade</strong></span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">{blog.title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 border-b border-gray-100 pb-6">{blog.description}</p>

            {/* Content with mid-article ad injected automatically after 2nd heading */}
            <div>{renderContent(blog.content, AD_SLOTS.BLOG_MID)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              {blog.tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author byline */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0">BT</div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Breakout Trade</p>
                <p className="text-[10px] text-gray-400">ToolHub owner &amp; content team</p>
              </div>
            </div>
          </article>

          {/* ── Sidebar ───────────────────────────────────── */}
          <aside className="space-y-5">
            {/* Related tool CTA */}
            {relatedTool && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-2">Try the tool</p>
                <p className="text-sm font-bold text-green-900 mb-1">{relatedTool.name}</p>
                <p className="text-xs text-green-700 mb-3">{relatedTool.shortDesc}</p>
                <Link href={`/tools/${relatedTool.id}`}
                  className="block text-center text-xs font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 transition-colors">
                  Open tool →
                </Link>
              </div>
            )}

            {/* Sidebar ad — rectangle */}
            <AdBanner slot={AD_SLOTS.BLOG_SIDEBAR} format="rectangle" />

            {/* Related articles */}
            {relatedBlogs.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Related articles</p>
                <div className="space-y-3">
                  {relatedBlogs.map(b => <BlogCard key={b.id} blog={b} />)}
                </div>
              </div>
            )}

            <Link href="/blog" className="block text-center text-xs font-semibold text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50 transition-colors">
              ← All articles
            </Link>
          </aside>
        </div>

        {/* Bottom leaderboard ad */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <AdBanner slot={AD_SLOTS.FOOTER_BANNER} format="horizontal" />
        </div>
      </div>
    </>
  )
}

