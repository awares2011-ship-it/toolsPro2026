'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import ToolCard from './ToolCard'
import BlogCard from './BlogCard'
import AdBanner from './AdBanner'
import { AD_SLOTS } from '@/lib/adSlots'
import type { Tool, ToolCategory } from '@/lib/tools'
import type { Blog } from '@/lib/blogs'
import { ACCENT_HEX } from '@/lib/colors'

interface Props {
  tools: Tool[]
  categories: { id: ToolCategory; name: string; icon: string; color: string; desc: string }[]
  blogs: Blog[]
}

export default function HomepageClient({ tools, categories, blogs }: Props) {
  const [query,     setQuery]     = useState('')
  const [activeCat, setActiveCat] = useState<ToolCategory | 'all'>('all')

  const filtered = useMemo(() => {
    let list = tools
    if (activeCat !== 'all') list = list.filter(t => t.category === activeCat)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
      )
    }
    return list
  }, [tools, activeCat, query])

  return (
    <>
      {/* ── TOP BAR ──────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 text-gray-800 placeholder-gray-400 shadow-sm"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>
          <div className="flex items-center gap-4 ml-auto shrink-0">
            <span className="text-xs text-gray-500"><span className="font-semibold text-gray-700">{tools.length}+</span> free tools</span>
            <span className="text-xs text-gray-500"><span className="font-semibold text-gray-700">100%</span> client-side</span>
            <span className="text-xs text-gray-500"><span className="font-semibold text-gray-700">0</span> signup</span>
          </div>
        </div>
      </div>

      {/* ── CATEGORY PILLS ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-0">
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              activeCat === 'all'
                ? 'bg-green-600 text-white border-transparent'
                : 'bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700'
            }`}
          >
            All ({tools.length})
          </button>
          {categories.map(cat => {
            const accent  = ACCENT_HEX[cat.color as keyof typeof ACCENT_HEX] ?? '#16a34a'
            const isActive = activeCat === cat.id
            const count    = tools.filter(t => t.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={isActive ? { background: accent, borderColor: accent } : {}}
              >
                {cat.icon} {cat.name.replace(' Tools', '')} <span className="opacity-60">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── TOOL GRID ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">No tools found for &ldquo;<strong>{query}</strong>&rdquo;</p>
            <button onClick={() => setQuery('')} className="mt-3 text-xs text-green-600 underline">Clear search</button>
          </div>
        ) : (
          <>
            {query && (
              <p className="text-xs text-gray-400 mb-3">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </>
        )}
      </section>

      {/* ── AD ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <AdBanner format="horizontal" slot={AD_SLOTS.HOME_LEADERBOARD} />
      </div>

      {/* ── BLOG SECTION ─────────────────────────────────────── */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-100 mt-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Latest Guides</h2>
              <p className="text-xs text-gray-500 mt-0.5">In-depth articles on tools, development & SEO</p>
            </div>
            <Link href="/blog" className="text-xs font-semibold text-green-700 hover:text-green-800 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-all">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.slice(0, 6).map(blog => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        </section>
      )}

      {/* ── FOOTER AD ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2">
        <AdBanner format="horizontal" slot={AD_SLOTS.FOOTER_BANNER} />
      </div>

      {/* ── FOOTER CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-100 mt-2">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-green-800 mb-1">All tools run in your browser</p>
          <p className="text-xs text-gray-500 max-w-md mx-auto">Your data never leaves your device. No account, no tracking, no cost. Just instant, reliable tools.</p>
        </div>
      </section>
    </>
  )
}

