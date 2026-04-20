'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PUBLISHER_ID = 'ca-pub-XXXXXXXXXX' // ← replace after AdSense approval
const STORAGE_KEY  = 'toolfocus_cookie_consent'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

function loadAdSense() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[src*="adsbygoogle"]`)) return
  const s = document.createElement('script')
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`
  s.async = true
  s.crossOrigin = 'anonymous'
  document.head.appendChild(s)
}

export default function CookieConsent() {
  const [visible,     setVisible]     = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return  // ✅ FIX

    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null

    if (stored === 'accepted') { 
      loadAdSense()
      return 
    }

    if (stored === 'declined') return

    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const accept = () => {
    if (typeof window !== 'undefined') {  // ✅ FIX
      localStorage.setItem(STORAGE_KEY, 'accepted')
    }
    setVisible(false)
    loadAdSense()
  }

  const decline = () => {
    if (typeof window !== 'undefined') {  // ✅ FIX
      localStorage.setItem(STORAGE_KEY, 'declined')
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-modal="true" aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">

        {/* Main bar */}
        <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-xl shrink-0 mt-0.5">🍪</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-0.5">We use cookies</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                We use cookies for ads and analytics. All tools run entirely in your browser — no tool data is ever collected.{' '}
                <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button onClick={() => setShowDetails(v => !v)}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 px-1">
              {showDetails ? 'Hide' : 'Manage'}
            </button>
            <button onClick={decline}
              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Decline
            </button>
            <button onClick={accept}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors">
              Accept all
            </button>
          </div>
        </div>

        {/* Detail panel */}
        {showDetails && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
            <p className="text-xs font-semibold text-gray-600 mb-3">Cookie details</p>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Essential cookies', desc: 'Remember your consent preference. Required for the site to function.', always: true },
                { name: 'Analytics (Google Analytics)', desc: 'Help us understand which tools are popular. Data is anonymised.', always: false },
                { name: 'Advertising (Google AdSense)', desc: 'Allow Google to serve relevant ads. Revenue keeps ToolFocus free.', always: false },
              ].map(c => (
                <div key={c.name} className="flex items-start justify-between gap-4 pt-2 first:pt-0 border-t first:border-t-0 border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-700">{c.name}</p>
                    <p className="text-gray-400 mt-0.5">{c.desc}</p>
                  </div>
                  <span className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full font-semibold ${c.always ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    {c.always ? 'Always on' : 'Optional'}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
              <button onClick={decline} className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-white transition-colors">Essential only</button>
              <button onClick={accept} className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors">Accept all cookies</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
