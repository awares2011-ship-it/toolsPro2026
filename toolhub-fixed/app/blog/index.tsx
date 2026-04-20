export const dynamic = "force-static";
import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOGS } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Blog & Guides — Developer Tools, SEO & Productivity',
  description: 'In-depth guides on JSON, passwords, SEO, URL encoding, and developer productivity. Free, practical articles with no fluff.',
  alternates: { canonical: 'https://toolfocus.in/blog' },
}

const CATEGORIES = Array.from(new Set(BLOGS.map(b => b.category)))

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Blog</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog & Guides</h1>
        <p className="text-sm text-gray-500">In-depth articles on developer tools, SEO, security, and productivity.</p>
      </div>

      {/* Ad top */}
      <div className="mb-8">
        <AdBanner slot="5555555555" format="horizontal" />
      </div>

      {CATEGORIES.map(cat => {
        const posts = BLOGS.filter(b => b.category === cat)
        return (
          <section key={cat} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-gray-800">{cat}</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{posts.length} articles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}
