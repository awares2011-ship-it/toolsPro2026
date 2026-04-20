import Link from 'next/link'
import { TOOLS } from '@/lib/tools'

export default function NotFound() {
  const popular = TOOLS.slice(0, 4)
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="text-6xl mb-6">🔧</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 text-sm mb-8">
        The page you're looking for doesn't exist or may have moved. Try one of our popular tools below.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto">
        {popular.map(t => (
          <Link key={t.id} href={`/tools/${t.id}`}
            className="p-3 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all text-left group">
            <p className="text-xs font-semibold text-gray-700 group-hover:text-green-700 transition-colors">{t.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{t.shortDesc}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
          ← Back to home
        </Link>
        <Link href="/contact" className="text-sm text-gray-500 hover:text-green-600 transition-colors underline">
          Report broken link
        </Link>
      </div>
    </main>
  )
}
