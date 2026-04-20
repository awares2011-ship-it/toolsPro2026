import type { Metadata } from 'next'
import HomepageClient from '@/components/HomepageClient'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'

export const metadata: Metadata = {
  title: 'ToolFocus — Free Developer & Productivity Tools',
  description: 'Free browser-based tools for developers, writers & SEO pros. JSON formatter, password generator, word counter, Base64 encoder, and 20+ more. No signup required.',
  alternates: { canonical: 'https://toolfocus.app' },
  openGraph: {
    url: 'https://toolfocus.app',
    images: [
      {
        url: 'https://toolfocus.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolFocus — Free Developer & Productivity Tools',
      },
    ],
  },
}

export default function HomePage() {

  // ✅ SAFETY FIX (ensures tools never break UI)
  const safeTools = Array.isArray(TOOLS) ? TOOLS : []
  const safeCategories = Array.isArray(CATEGORIES) ? CATEGORIES : []
  const safeBlogs = Array.isArray(BLOGS) ? BLOGS.slice(0, 6) : []

  return (
    <HomepageClient
      tools={safeTools}
      categories={safeCategories}
      blogs={safeBlogs}
    />
  )
}
