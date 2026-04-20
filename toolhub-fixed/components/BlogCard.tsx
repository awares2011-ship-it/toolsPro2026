import Link from 'next/link'
import type { Blog } from '@/lib/blogs'
import { ACCENT_HEX } from '@/lib/colors'

interface Props { blog: Blog }

export default function BlogCard({ blog }: Props) {
  const color = ACCENT_HEX[blog.color] ?? '#16a34a'

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-150"
    >
      {/* Color bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            {blog.category}
          </span>
          <span className="text-[10px] text-gray-400">{blog.readTime} min read</span>
        </div>

        <h3 className="text-[13px] font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-snug mb-1.5 line-clamp-2 flex-1">
          {blog.title}
        </h3>
        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {blog.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-300">
            {new Date(blog.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="text-[10px] font-medium text-green-600 group-hover:text-green-700">Read →</span>
        </div>
      </div>
    </Link>
  )
}
