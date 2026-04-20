'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/tools'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter() // ✅ added

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{background:'linear-gradient(135deg,#16a34a,#059669)'}}>⚡</span>
          <span className="font-bold text-gray-900 text-sm tracking-tight">
            Tool<span className="text-green-600">Focus</span>
          </span>
        </Link>

        <span className="hidden sm:block text-gray-200 text-lg font-light">|</span>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0 flex-1">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/tools/category/${cat.id}`}
              prefetch={false} // ✅ added
              className="px-2.5 py-1 text-[11.5px] font-medium text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-md transition-all duration-150"
            >
              {cat.icon} {cat.name.replace(' Tools', '')}
            </Link>
          ))}

          {/* ✅ FIXED BLOG LINK */}
          <Link
            href="/blog"
            prefetch={false}
            onClick={(e) => {
              e.preventDefault()
              router.push('/blog')
            }}
            className="px-2.5 py-1 text-[11.5px] font-medium text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-md transition-all duration-150"
          >
            ✍️ Blog
          </Link>

          <Link href="/about" prefetch={false}
            className="px-2.5 py-1 text-[11.5px] font-medium text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-md transition-all duration-150">
            About
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
            Free • No signup
          </span>
          <button
            className="md:hidden w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-xs text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >☰</button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-gray-100 bg-white px-4 py-2 flex flex-col gap-0.5">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/tools/category/${cat.id}`} prefetch={false}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700 rounded-lg transition-all">
              {cat.icon} {cat.name}
            </Link>
          ))}

          {/* ✅ FIXED MOBILE BLOG */}
          <Link
            href="/blog"
            prefetch={false}
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              router.push('/blog')
            }}
            className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700 rounded-lg"
          >
            ✍️ Blog
          </Link>

          <Link href="/about" prefetch={false}
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700 rounded-lg">
            About
          </Link>
        </div>
      )}
    </header>
  )
}
