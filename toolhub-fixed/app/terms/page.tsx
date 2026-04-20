import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — ToolFocus',
  description: 'The terms and conditions for using ToolFocus free developer tools.',
  alternates: { canonical: 'https://toolfocus.app/terms' },
}

const LAST_UPDATED = 'April 19, 2026'

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    content: `By accessing or using toolfocus.app ("ToolFocus", "the site", "the service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the site.\n\nWe reserve the right to update these Terms at any time. Continued use of the site after changes constitutes acceptance.`,
  },
  {
    id: 'description',
    title: '2. Description of service',
    content: `ToolFocus provides a collection of free, browser-based developer and productivity tools including JSON formatters, text tools, code generators, SEO utilities, and colour tools. All tools operate client-side in your browser at no charge and without requiring account registration.`,
  },
  {
    id: 'permitted-use',
    title: '3. Permitted use',
    content: `You may use ToolFocus for any lawful personal or commercial purpose. You agree not to:\n\n• Attempt to gain unauthorised access to any part of the site or its related systems.\n• Use automated scraping or bots to bulk-harvest tool outputs at a rate that harms site performance.\n• Reproduce, resell, or redistribute the site's content or tools as your own product without written permission.\n• Use the site to transmit viruses, malware, or any code designed to disrupt or damage any system.\n• Violate any applicable local, national, or international law or regulation.`,
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual property',
    content: `The ToolFocus name, logo, design, and original content (including blog articles) are the intellectual property of ToolFocus (owned by Breakout Trade) and are protected by copyright and other applicable laws.\n\nTool outputs (e.g. a formatted JSON string or a generated password) produced using our tools belong to you. We make no claim over output you generate.`,
  },
  {
    id: 'disclaimer',
    title: '5. Disclaimer of warranties',
    content: `ToolFocus is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the site will be uninterrupted or error-free. Tool outputs are provided for informational and convenience purposes only. You are responsible for verifying any output before using it in a production environment.`,
  },
  {
    id: 'limitation-liability',
    title: '6. Limitation of liability',
    content: `To the fullest extent permitted by applicable law, ToolFocus shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the site or its tools.\n\nOur total liability for any claim arising from your use of the site is limited to £100 (one hundred pounds sterling).`,
  },
  {
    id: 'third-party',
    title: '7. Third-party services',
    content: `The site uses Google Analytics and Google AdSense. Your use of the site is also subject to Google's Terms of Service and Privacy Policy. We are not responsible for the content, privacy practices, or terms of any third-party services.`,
  },
  {
    id: 'availability',
    title: '8. Service availability',
    content: `We aim to keep ToolFocus available at all times but we do not guarantee continuous access. We may suspend or restrict availability for business or operational reasons without notice.`,
  },
  {
    id: 'governing-law',
    title: '9. Governing law',
    content: `These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    id: 'contact',
    title: '10. Contact',
    content: `For questions about these Terms:\n\nEmail: breakouttradeapp@gmail.com\nWebsite: toolfocus.app/contact`,
  },
]

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Terms of Service</span>
      </nav>

      <div className="mb-10 pb-8 border-b border-gray-100">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">📋 Legal</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          Please read these terms carefully before using ToolFocus. By using our tools, you agree to these terms.
        </p>
      </div>

      <nav className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-10">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Contents</p>
        <ol className="space-y-1.5">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-gray-600 hover:text-green-700 transition-colors">{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-10">
        {sections.map(s => (
          <section key={s.id} id={s.id}>
            <h2 className="text-base font-semibold text-gray-900 mb-3">{s.title}</h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              {s.content.split('\n\n').map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{
                  __html: para.replace(/\n•/g, '<br/>•').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
        <Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
        <Link href="/contact" className="hover:text-green-600 transition-colors">Contact Us</Link>
        <Link href="/" className="hover:text-green-600 transition-colors">← Back to Tools</Link>
      </div>
    </main>
  )
}
