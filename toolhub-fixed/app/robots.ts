import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
return {
rules: [
// Allow all well-behaved bots (including AI crawlers for discovery)
{
userAgent: '*',
allow: [
'/',
'/_next/',
'/static/'
],
disallow: [
'/api/'
]
},

  // AI crawlers allowed — they drive referral traffic and citations.
  // Remove individual entries below only if you have a specific legal
  // reason to opt out of a particular AI training programme.
  // { userAgent: 'GPTBot',           disallow: '/' },
  // { userAgent: 'ChatGPT-User',     disallow: '/' },
  // { userAgent: 'Google-Extended',  disallow: '/' },
  // { userAgent: 'anthropic-ai',     disallow: '/' },
  // { userAgent: 'ClaudeBot',        disallow: '/' }
],
sitemap: 'https://toolfocus.in/sitemap.xml',
host: 'https://toolfocus.in'


}
}

