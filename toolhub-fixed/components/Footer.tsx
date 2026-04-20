import Link from 'next/link'
import { CATEGORIES } from '@/lib/tools'

const OWNER = 'Breakout Trade'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-1.5 mb-3">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white" style={{background:'linear-gradient(135deg,#16a34a,#059669)'}}>⚡</span>
              <span className="font-bold text-gray-900 text-sm">Tool<span className="text-green-600">Hub</span></span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              Free browser-based tools for developers, writers, and SEO professionals. No signup, no tracking, no cost.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Owned by <strong className="text-gray-500">{OWNER}</strong>
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Tools</p>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link href={`/tools/category/${cat.id}`} className="text-xs text-gray-500 hover:text-green-700 transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Resources</p>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/about" className="text-xs text-gray-500 hover:text-green-700 transition-colors">About ToolFocus</Link></li>
              <li><Link href="/contact" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Terms of Service</Link></li>
            </ul>
            {/* Trust signals */}
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <span className="text-green-500">✓</span> 100% client-side processing
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <span className="text-green-500">✓</span> No data stored on servers
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <span className="text-green-500">✓</span> HTTPS encrypted
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {year} ToolFocus by <strong>{OWNER}</strong>. All rights reserved.</p>
          <p className="text-xs text-gray-400">All tools run entirely in your browser. Your data never leaves your device.</p>
        </div>
      </div>
    </footer>
  )
}
