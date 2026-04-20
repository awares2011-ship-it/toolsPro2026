import Link from 'next/link'
import type { Tool } from '@/lib/tools'
import { ACCENT_HEX } from '@/lib/colors'
import { CATEGORIES } from '@/lib/tools'

interface Props { tool: Tool }

export default function ToolCard({ tool }: Props) {
  const cat   = CATEGORIES.find(c => c.id === tool.category)
  const color = ACCENT_HEX[cat?.color ?? 'green']

  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl p-3.5 hover:border-gray-200 hover:shadow-sm transition-all duration-150"
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black text-white mb-2.5 shrink-0"
        style={{ background: color }}
      >
        {tool.icon.length > 2 ? '⚡' : tool.icon}
      </div>

      <p className="text-[13px] font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-snug mb-1">
        {tool.name}
      </p>
      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 flex-1">
        {tool.shortDesc}
      </p>

      <span className="mt-2 text-[10px] font-medium text-gray-300 group-hover:text-green-500 transition-colors">
        Open →
      </span>
    </Link>
  )
}
