import type { MetadataRoute } from 'next'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'

const BASE = 'https://toolfocus.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terms`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
  ]

  const toolPages: MetadataRoute.Sitemap = TOOLS.map(t => ({
    url: `${BASE}/tools/${t.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${BASE}/tools/category/${c.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOGS.map(b => ({
    url: `${BASE}/blog/${b.id}`,
    lastModified: new Date(b.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.70,
  }))

  return [...staticPages, ...toolPages, ...categoryPages, ...blogPages]
}
