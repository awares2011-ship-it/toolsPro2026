import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — ToolFocus',
  description: 'How ToolFocus collects, uses, and protects your information. All tools run in your browser — your data never leaves your device.',
  alternates: { canonical: 'https://toolfocus.in/privacy' },
}

const LAST_UPDATED = 'April 19, 2026'

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    content: `ToolFocus ("we", "our", or "us"), owned and operated by Breakout Trade, operates toolfocus.in. This Privacy Policy explains what information we collect when you use our site, how we use it, and your rights regarding that information.\n\nBy using ToolFocus you agree to the practices described in this policy.`,
  },
  {
    id: 'tools-client-side',
    title: '2. Our tools run in your browser',
    content: `All tools on ToolFocus process data entirely within your browser (client-side). Text you paste into a JSON formatter, password generator, word counter, or any other tool is never transmitted to our servers. We have no access to it, we do not log it, and it is not stored anywhere outside your device.`,
  },
  {
    id: 'information-we-collect',
    title: '3. Information we collect',
    content: `We collect two categories of information:\n\n**Automatically collected data.** When you visit ToolFocus, our hosting infrastructure may record standard server logs including your IP address, browser type, operating system, referring URL, pages visited, and timestamps. This data is used solely for security monitoring and aggregate analytics.\n\n**Cookies and similar technologies.** We use cookies for the following purposes:\n• Essential cookies that remember your consent preferences.\n• Analytics cookies (Google Analytics) to understand which tools and pages are most useful — only set after you provide consent.\n• Advertising cookies (Google AdSense) to allow Google to serve relevant ads — only set after consent.`,
  },
  {
    id: 'google-adsense',
    title: '4. Google AdSense and advertising',
    content: `We use Google AdSense to display advertisements. Google may use cookies and web beacons to collect data about your browsing activity to serve personalised ads.\n\nYou can opt out of personalised advertising at any time by visiting adssettings.google.com. For more information, see Google's Privacy Policy at policies.google.com/privacy.`,
  },
  {
    id: 'analytics',
    title: '5. Analytics',
    content: `We use Google Analytics to collect anonymised information about how visitors use the site. We have enabled IP anonymisation so no full IP address is stored by Google. This data is only collected after you provide consent via our cookie banner.`,
  },
  {
    id: 'data-sharing',
    title: '6. How we share information',
    content: `We do not sell, rent, or trade your personal information. We share data only:\n• With Google (Analytics and AdSense) as described above, subject to your consent.\n• With our hosting provider for the purpose of operating the site.\n• If required by law, regulation, or a valid legal process.`,
  },
  {
    id: 'data-retention',
    title: '7. Data retention',
    content: `Server log data is retained for up to 90 days for security purposes and then deleted. Analytics data is retained for 26 months. We do not store any tool input data because it never leaves your device.`,
  },
  {
    id: 'your-rights',
    title: '8. Your rights',
    content: `Depending on your location, you may have the following rights:\n\n• **Access**: Request a copy of any personal data we hold about you.\n• **Deletion**: Request deletion of your personal data.\n• **Objection**: Object to the processing of your data for advertising purposes.\n• **Withdraw consent**: Withdraw your cookie consent at any time by clearing your browser cookies and revisiting our consent banner.\n\nTo exercise any of these rights, contact us at breakouttradeapp@gmail.com.`,
  },
  {
    id: 'childrens-privacy',
    title: '9. Children\'s privacy',
    content: `ToolFocus is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at breakouttradeapp@gmail.com and we will delete it promptly.`,
  },
  {
    id: 'changes',
    title: '10. Changes to this policy',
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '11. Contact us',
    content: `If you have questions or concerns about this Privacy Policy, please contact us:\n\nEmail: breakouttradeapp@gmail.com\nWebsite: toolfocus.in/contact
Owner: Breakout Trade`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Privacy Policy</span>
      </nav>

      <div className="mb-10 pb-8 border-b border-gray-100">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">🔒 Legal</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          We built ToolFocus around a simple principle: your data belongs to you. All tools run entirely in your browser — nothing you type is ever sent to our servers.
        </p>
      </div>

      {/* Table of contents */}
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
        <Link href="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
        <Link href="/contact" className="hover:text-green-600 transition-colors">Contact Us</Link>
        <Link href="/" className="hover:text-green-600 transition-colors">← Back to Tools</Link>
      </div>
    </main>
  )
}
