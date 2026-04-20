export type ToolCategory = 'developer' | 'text' | 'seo' | 'security' | 'design'

export interface Tool {
  id: string
  name: string
  shortDesc: string
  longDesc: string
  category: ToolCategory
  keywords: string[]
  icon: string
}

export const CATEGORIES: { id: ToolCategory; name: string; icon: string; color: string; desc: string }[] = [
  { id: 'developer', name: 'Developer Tools', icon: '⚙️', color: 'teal',   desc: 'JSON, Base64, UUID, JWT and more developer utilities' },
  { id: 'text',      name: 'Text Tools',      icon: '📝', color: 'blue',   desc: 'Word counter, case converter, diff checker and more' },
  { id: 'seo',       name: 'SEO Tools',       icon: '🔍', color: 'green',  desc: 'Meta tags, slug generator, keyword density checker' },
  { id: 'security',  name: 'Security Tools',  icon: '🔒', color: 'coral',  desc: 'Password generator, hash generator, JWT decoder' },
  { id: 'design',    name: 'Design Tools',    icon: '🎨', color: 'purple', desc: 'Colour picker, CSS gradient generator and more' },
]

export const TOOLS: Tool[] = [
  // ── Developer ────────────────────────────────────────────────────────────
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    shortDesc: 'Format, validate and minify JSON instantly',
    longDesc: 'Paste any JSON string to instantly format it with proper indentation, or minify it for production. Validates syntax and highlights errors with line numbers.',
    category: 'developer',
    icon: '{ }',
    keywords: ['json', 'format', 'validate', 'pretty print', 'minify', 'beautify', 'lint'],
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    shortDesc: 'Encode or decode Base64 strings in your browser',
    longDesc: 'Instantly encode plain text to Base64 or decode Base64 back to readable text. Also supports URL-safe Base64. Everything runs in your browser — no data is sent to any server.',
    category: 'developer',
    icon: '64',
    keywords: ['base64', 'encode', 'decode', 'binary', 'text'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    shortDesc: 'Generate v4 UUIDs instantly — bulk or single',
    longDesc: 'Generate one or hundreds of RFC 4122 version 4 UUIDs in one click. Copy individually or all at once. Uses the browser\'s cryptographically secure random number generator.',
    category: 'developer',
    icon: '🔑',
    keywords: ['uuid', 'guid', 'unique id', 'random', 'v4'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    shortDesc: 'Decode and inspect JWT tokens instantly',
    longDesc: 'Paste any JSON Web Token to instantly decode its header, payload and signature sections. Highlights expiry status and algorithm. No token is ever sent to a server.',
    category: 'developer',
    icon: '🔓',
    keywords: ['jwt', 'json web token', 'decode', 'auth', 'bearer'],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    shortDesc: 'Encode or decode URLs and query strings',
    longDesc: 'Percent-encode special characters in URLs or decode encoded URLs back to readable form. Handles full URLs and individual query string values.',
    category: 'developer',
    icon: '🔗',
    keywords: ['url', 'encode', 'decode', 'percent encoding', 'query string', 'uri'],
  },
  {
    id: 'csv-json',
    name: 'CSV ↔ JSON Converter',
    shortDesc: 'Convert between CSV and JSON formats in one click',
    longDesc: 'Paste CSV data to get clean JSON, or paste a JSON array to get a downloadable CSV. Automatically detects headers and handles quoted fields.',
    category: 'developer',
    icon: '⇄',
    keywords: ['csv', 'json', 'convert', 'data', 'spreadsheet', 'import', 'export'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    shortDesc: 'Format and beautify SQL queries instantly',
    longDesc: 'Paste any SQL query to get it beautifully indented and formatted with consistent capitalisation of keywords. Supports SELECT, INSERT, UPDATE, DELETE and more.',
    category: 'developer',
    icon: '🗄️',
    keywords: ['sql', 'format', 'query', 'database', 'mysql', 'postgres', 'beautify'],
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  {
    id: 'word-counter',
    name: 'Word Counter',
    shortDesc: 'Count words, characters and reading time',
    longDesc: 'Instantly count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time. Perfect for blog posts, essays, and social media copy.',
    category: 'text',
    icon: '🔢',
    keywords: ['word count', 'character count', 'reading time', 'text length', 'essay'],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    shortDesc: 'Convert text between UPPER, lower, Title and more',
    longDesc: 'Convert any text to uppercase, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, or PascalCase. Instant, no page reload.',
    category: 'text',
    icon: 'Aa',
    keywords: ['case', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake_case', 'kebab'],
  },
  {
    id: 'remove-spaces',
    name: 'Remove Extra Spaces',
    shortDesc: 'Clean up extra whitespace from any text',
    longDesc: 'Remove duplicate spaces, trim leading and trailing whitespace, remove blank lines, and normalise all spacing in one click. Great for cleaning up pasted text.',
    category: 'text',
    icon: '⎵',
    keywords: ['spaces', 'whitespace', 'trim', 'clean', 'remove', 'extra spaces'],
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    shortDesc: 'Compare two texts and highlight differences',
    longDesc: 'Paste two pieces of text side by side and instantly see what changed — additions highlighted in green, deletions in red. Great for proofreading and code reviews.',
    category: 'text',
    icon: '⟺',
    keywords: ['diff', 'compare', 'difference', 'text compare', 'changes'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    shortDesc: 'Test regular expressions with live highlighting',
    longDesc: 'Write a regex pattern and test it against any string in real time. All matches are highlighted. Supports flags (global, case-insensitive, multiline) and shows captured groups.',
    category: 'text',
    icon: '/.*/',
    keywords: ['regex', 'regular expression', 'pattern', 'match', 'test'],
  },

  // ── SEO ──────────────────────────────────────────────────────────────────
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortDesc: 'Generate complete SEO and Open Graph meta tags',
    longDesc: 'Fill in your page details and get a complete set of meta tags including title, description, Open Graph, Twitter Card and robots directives. Copy-paste ready HTML.',
    category: 'seo',
    icon: '</>',
    keywords: ['meta tags', 'seo', 'open graph', 'twitter card', 'robots', 'head'],
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    shortDesc: 'Generate SEO-friendly URL slugs from any title',
    longDesc: 'Convert any title or phrase into a clean, SEO-friendly URL slug. Removes special characters, replaces spaces with hyphens, and handles accented characters.',
    category: 'seo',
    icon: '🔗',
    keywords: ['slug', 'url', 'seo', 'permalink', 'friendly url'],
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    shortDesc: 'Analyse keyword frequency in your content',
    longDesc: 'Paste any article or page content to see the frequency and density percentage of every word and phrase. Helps identify over-optimisation and keyword gaps.',
    category: 'seo',
    icon: '📊',
    keywords: ['keyword', 'density', 'seo', 'content', 'frequency', 'analysis'],
  },
  {
    id: 'og-generator',
    name: 'Open Graph Generator',
    shortDesc: 'Create Open Graph tags for social sharing',
    longDesc: 'Generate complete Open Graph meta tags for Facebook, LinkedIn, and other platforms. Preview how your link will appear in a social media feed before publishing.',
    category: 'seo',
    icon: '📤',
    keywords: ['open graph', 'og tags', 'social', 'facebook', 'linkedin', 'preview'],
  },
  {
    id: 'robots-txt',
    name: 'Robots.txt Generator',
    shortDesc: 'Generate a robots.txt file for your website',
    longDesc: 'Configure allow/disallow rules for search engine bots, specify your sitemap URL, and download a robots.txt file ready to place at your site root.',
    category: 'seo',
    icon: '🤖',
    keywords: ['robots.txt', 'seo', 'crawlers', 'sitemap', 'googlebot'],
  },

  // ── Security ─────────────────────────────────────────────────────────────
  {
    id: 'password-generator',
    name: 'Password Generator',
    shortDesc: 'Generate strong, random passwords instantly',
    longDesc: 'Generate cryptographically secure random passwords with full control over length, uppercase, lowercase, numbers, and symbols. Shows password strength score.',
    category: 'security',
    icon: '🔐',
    keywords: ['password', 'generator', 'random', 'security', 'strong', 'secure'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    shortDesc: 'Generate MD5, SHA-256 and SHA-512 hashes',
    longDesc: 'Compute cryptographic hashes of any text using MD5, SHA-1, SHA-256, or SHA-512. Useful for verifying data integrity and understanding hash functions.',
    category: 'security',
    icon: '#',
    keywords: ['hash', 'md5', 'sha256', 'sha512', 'checksum', 'crypto'],
  },

  // ── Design ───────────────────────────────────────────────────────────────
  {
    id: 'hex-color',
    name: 'Hex Colour Picker',
    shortDesc: 'Pick, convert and explore colours in HEX, RGB & HSL',
    longDesc: 'Convert colours between HEX, RGB, HSL, and HSB formats instantly. Pick from a colour wheel, generate complementary palettes, and copy CSS values in one click.',
    category: 'design',
    icon: '🎨',
    keywords: ['color', 'colour', 'hex', 'rgb', 'hsl', 'picker', 'palette'],
  },
  {
    id: 'css-gradient',
    name: 'CSS Gradient Generator',
    shortDesc: 'Build beautiful CSS gradients visually',
    longDesc: 'Create linear and radial CSS gradients with a live visual editor. Add multiple colour stops, adjust angles and positions, and copy the CSS code instantly.',
    category: 'design',
    icon: '🌈',
    keywords: ['css', 'gradient', 'design', 'background', 'linear', 'radial'],
  },
]

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find(t => t.id === id)
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, limit)
}

