import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    title: `${tool.name} — Free Online Tool`,
    description: tool.longDesc,
    keywords: tool.keywords,
    alternates: { canonical: `https://toolfocus.app/tools/${tool.id}` },
    openGraph: {
      title: `${tool.name} — Free Online Tool`,
      description: tool.longDesc,
      type: 'website',
      url: `https://toolfocus.app/tools/${tool.id}`,
      images: [{ url: 'https://toolfocus.app/og-image.png', width: 1200, height: 630, alt: `${tool.name} — ToolFocus` }],
    },
    twitter: { card: 'summary_large_image', images: ['https://toolfocus.app/og-image.png'] },
  }
}

export default function ToolPage({ params }: Props) {
  const tool    = getToolById(params.id)
  if (!tool) notFound()

  const cat     = CATEGORIES.find(c => c.id === tool.category)
  const related = getRelatedTools(tool, 4)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/tools/category/${tool.category}`} className="hover:text-green-600 transition-colors">
          {cat?.icon} {cat?.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600">{tool.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Tool panel ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{tool.name}</h1>
            <p className="text-sm text-gray-500 leading-relaxed">{tool.longDesc}</p>
          </div>

          {/* Tool UI */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <ToolRenderer toolId={tool.id} />
          </div>

          {/* Ad below tool — horizontal leaderboard */}
          <div className="mt-6">
            <AdBanner slot={AD_SLOTS.TOOL_BELOW} format="horizontal" />
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────── */}
        <div className="space-y-5">

          {/* About this tool */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">About this tool</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                Runs entirely in your browser
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                No data is sent to any server
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                Free — no signup required
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                Works on mobile and desktop
              </li>
            </ul>
          </div>

          {/* Sidebar ad — rectangle (300×250 ideal) */}
          <AdBanner slot={AD_SLOTS.BLOG_SIDEBAR} format="rectangle" />

          {/* Related tools */}
          {related.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Related tools</p>
              <div className="space-y-2">
                {related.map(t => <ToolCard key={t.id} tool={t} />)}
              </div>
            </div>
          )}

          {/* Category link */}
          <Link
            href={`/tools/category/${tool.category}`}
            className="block text-center text-xs font-semibold text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50 transition-colors"
          >
            View all {cat?.name} →
          </Link>
        </div>
      </div>
    </div>
  )
}
