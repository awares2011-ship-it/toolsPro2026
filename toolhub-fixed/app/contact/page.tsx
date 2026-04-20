'use client'
import { useState } from 'react'
import Link from 'next/link'

const CONTACT_EMAIL = 'breakouttradeapp@gmail.com'
const OWNER_NAME    = 'Breakout Trade'
const SUBJECTS = ['General question','Bug report','Feature request','Content / blog issue','Business / partnership','Privacy or legal matter','Other']

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const [form,   setForm]   = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // ── Wire up a real endpoint here ──────────────────────────────────────
    // Option A — Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //     method:'POST', body:JSON.stringify(form),
    //     headers:{'Content-Type':'application/json','Accept':'application/json'}
    //   })
    //   setStatus(res.ok ? 'success' : 'error')
    // ──────────────────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 900)) // remove when using real endpoint
    setStatus('success')
  }

  const faqs = [
    { q: 'Are all tools really free?', a: 'Yes — every tool is free with no signup, trial, or hidden fees. Ads keep the lights on.' },
    { q: 'Is my data safe?', a: 'All tools run in your browser. Nothing you type is ever sent to our servers.' },
    { q: 'Can I request a new tool?', a: 'Absolutely! Choose "Feature request" and describe what you need. We build the most-requested tools first.' },
    { q: 'I found a bug — how do I report it?', a: 'Choose "Bug report" and include which tool was affected, what happened, and your browser/OS.' },
  ]

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Contact</span>
      </nav>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">💬 Get in touch</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact ToolFocus</h1>
        <p className="text-gray-500 text-sm max-w-xl">Have a question, spotted a bug, or want to suggest a new tool? We read every message and usually reply within 1–2 business days.</p>
        <p className="text-gray-400 text-xs mt-2">ToolFocus is owned and operated by <strong className="text-gray-600">{OWNER_NAME}</strong>.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Form */}
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-3">✅</div>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Message sent!</h2>
              <p className="text-sm text-green-700 mb-6">Thanks for reaching out. We'll get back to you within 1–2 business days.</p>
              <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',subject:SUBJECTS[0],message:'' }) }}
                className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['name','Name','Jane Smith','text'],['email','Email','jane@example.com','email']].map(([k,l,ph,t]) => (
                  <div key={k}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{l} <span className="text-red-400">*</span></label>
                    <input name={k} type={t} value={(form as any)[k]} onChange={handleChange} placeholder={ph}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-colors text-gray-800 placeholder-gray-300" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 bg-gray-50 text-gray-700">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={6}
                  placeholder="Tell us what's on your mind…"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400 bg-gray-50 focus:bg-white transition-colors text-gray-800 placeholder-gray-300 resize-none" />
              </div>

              <button onClick={handleSubmit} disabled={status==='sending' || !form.name || !form.email || !form.message}
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm rounded-lg transition-colors">
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'error' && <p className="text-xs text-red-500 text-center">Something went wrong. Please email us directly.</p>}

              <p className="text-xs text-gray-400 text-center">
                Or email directly: <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">{CONTACT_EMAIL}</a>
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick info</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2.5"><span>👤</span><span>Owned by <strong>{OWNER_NAME}</strong></span></li>
              <li className="flex items-start gap-2.5"><span>⏱️</span><span>Reply within <strong>1–2 business days</strong></span></li>
              <li className="flex items-start gap-2.5"><span>🔒</span><span>Your message is sent securely. We never share your email.</span></li>
              <li className="flex items-start gap-2.5"><span>✉️</span>
                <span>Direct: <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:underline">{CONTACT_EMAIL}</a></span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Common questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white border border-gray-100 rounded-xl group">
                  <summary className="px-4 py-3 text-xs font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between gap-2 hover:text-green-700 transition-colors">
                    {faq.q}
                    <span className="text-gray-400 text-[10px] shrink-0 group-open:rotate-180 transition-transform inline-block">▼</span>
                  </summary>
                  <p className="px-4 pb-4 pt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-50">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="flex gap-3 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-green-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-green-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
