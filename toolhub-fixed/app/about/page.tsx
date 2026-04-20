import type { Metadata } from 'next'
import Link from 'next/link'
import { TOOLS, CATEGORIES } from '@/lib/tools'
import { BLOGS } from '@/lib/blogs'

export const metadata: Metadata = {
  title: 'About ToolFocus — Free Browser-Based Developer Tools',
  description: 'Learn about ToolFocus — a collection of free, instant, browser-based tools for developers, writers and SEO professionals. No signup, no tracking, no cost.',
  alternates: { canonical: 'https://toolfocus.in/about' },
}

const OWNER      = 'Breakout Trade'
const CONTACT_EMAIL = 'breakouttradeapp@gmail.com'

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">About</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white shrink-0"
            style={{background:'linear-gradient(135deg,#16a34a,#059669)'}}>⚡</span>
          <h1 className="text-3xl font-bold text-gray-900">About ToolFocus</h1>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm mb-3">
          ToolFocus is a growing collection of free, instant, browser-based tools for developers, writers, and SEO professionals. We believe the best tools are the ones that are always there when you need them — no accounts, no paywalls, no delays.
        </p>
        <p className="text-xs text-gray-400">
          ToolFocus is owned and operated by <strong className="text-gray-600">{OWNER}</strong>.{' '}
          Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">{CONTACT_EMAIL}</a>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: `${TOOLS.length}+`, label: 'Free tools' },
          { value: `${BLOGS.length}`, label: 'In-depth guides' },
          { value: `${CATEGORIES.length}`, label: 'Categories' },
        ].map(({ value, label }) => (
          <div key={label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-green-700 mb-0.5">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Owner card */}
      <section className="mb-12 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-3">👤 Who runs ToolFocus?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          ToolFocus is built and maintained by <strong>{OWNER}</strong> — a team passionate about making powerful developer utilities free and accessible to everyone. We believe great tools shouldn&apos;t require sign-ups, credit cards, or sending your data to remote servers.
        </p>
        <p className="mt-3 text-xs text-gray-400">
          Reach us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">{CONTACT_EMAIL}</a>
        </p>
      </section>

      {/* Core principles */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Our principles</h2>
        <div className="space-y-4">
          {[
            {
              icon: '🔒',
              title: 'Your data stays on your device',
              desc: 'Every tool on ToolFocus runs entirely in your browser. Nothing you type, paste, or generate is ever transmitted to our servers. We have no access to your data — not because we promise not to look, but because it never reaches us.',
            },
            {
              icon: '⚡',
              title: 'Instant, no friction',
              desc: 'No sign-up forms, no email verification, no trials, no credit cards. You open a tool, you use it, you get results. That\'s it. We believe the best tool is one you can actually use in the 30 seconds you have.',
            },
            {
              icon: '💚',
              title: 'Free, forever',
              desc: 'All tools on ToolFocus are free and will remain free. We keep the lights on through non-intrusive, consent-based advertising via Google AdSense. We will never sell your data, run pop-ups, or gate features behind a paywall.',
            },
            {
              icon: '📖',
              title: 'Education, not just utilities',
              desc: 'Every tool is paired with in-depth guides that explain the underlying concepts. We want you to understand JSON formatting, URL encoding, or password security — not just use a black box.',
            },
          ].map(p => (
            <div key={p.title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4">
              <span className="text-2xl shrink-0">{p.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-5">What you&apos;ll find on ToolFocus</h2>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/tools/category/${cat.id}`}
              className="flex items-center gap-3 p-3.5 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:shadow-sm transition-all group">
              <span className="text-xl">{cat.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.desc}</p>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-green-500 transition-colors">
                {TOOLS.filter(t => t.category === cat.id).length} tools →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 text-center">
        <p className="text-sm font-bold text-green-800 mb-1">Have a suggestion?</p>
        <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
          Missing a tool? Found a bug? We read every message and build the most-requested tools first.
        </p>
        <Link href="/contact"
          className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Get in touch
        </Link>
      </section>

      {/* Footer links */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
        <Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
        <Link href="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
      </div>
    </main>
  )
}
