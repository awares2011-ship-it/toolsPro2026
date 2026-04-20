export const dynamic = 'force-static' // ✅ ADD THIS

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
  return {
    title: `${cat.name} — Free Online Tools`,
    description: `${cat.desc}. Free, instant, browser-based — no signup required.`,
    alternates: { canonical: `https://toolhub.app/tools/category/${cat.id}` },
    openGraph: {
      title: `${cat.name} — Free Online Tools`,
      description: `${cat.desc}. Free, instant, browser-based — no signup required.`,
      url: `https://toolhub.app/tools/category/${cat.id}`,
      images: [{ url: 'https://toolhub.app/og-image.png', width: 1200, height: 630, alt: `${cat.name} — ToolHub` }],
    },
    twitter: { card: 'summary_large_image', images: ['https://toolhub.app/og-image.png'] },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat   = CATEGORIES.find(c => c.id === params.id)
  if (!cat) notFound()

  const tools = TOOLS.filter(t => t.category === cat.id)
  const others = CATEGORIES.filter(c => c.id !== cat.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">{cat.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{cat.icon}</span>
          <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
        </div>
        <p className="text-sm text-gray-500 max-w-xl">{cat.desc}. Free, browser-based — no signup required.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Tools grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
          <AdBanner slot="4444444444" format="horizontal" />
        </div>

        {/* Sidebar — other categories */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Other categories</p>
          {others.map(c => (
            <Link key={c.id} href={`/tools/category/${c.id}`}
              className="flex items-center gap-2.5 p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all group">
              <span className="text-lg">{c.icon}</span>
              <div>
                <p className="text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors">{c.name}</p>
                <p className="text-[10px] text-gray-400">{TOOLS.filter(t => t.category === c.id).length} tools</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
