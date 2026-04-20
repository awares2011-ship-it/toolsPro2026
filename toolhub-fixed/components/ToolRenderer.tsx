'use client'
import { useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Shared UI primitives                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function Textarea({ label, value, onChange, readOnly, rows = 8, mono = false, placeholder = '' }: {
  label?: string; value: string; onChange?: (v: string) => void
  readOnly?: boolean; rows?: number; mono?: boolean; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-500">{label}</label>}
      <textarea
        rows={rows}
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-green-400 bg-gray-50 resize-none ${mono ? 'font-mono' : ''} ${readOnly ? 'text-gray-600' : 'text-gray-900'}`}
      />
    </div>
  )
}
function Btn({ onClick, children, variant = 'primary', disabled = false }: {
  onClick: () => void; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; disabled?: boolean
}) {
  const cls = {
    primary:   'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    ghost:     'text-green-600 hover:text-green-800 underline text-xs',
  }[variant]
  return (
    <button disabled={disabled} onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 ${cls}`}>
      {children}
    </button>
  )
}
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }
  return (
    <button onClick={copy} className="text-xs font-semibold text-gray-400 hover:text-green-600 transition-colors">
      {copied ? '✅ Copied!' : '📋 Copy'}
    </button>
  )
}
function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-center">
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Individual tool components                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

function JsonFormatter() {
  const [input,  setInput]  = useState('')
  const [output, setOutput] = useState('')
  const [error,  setError]  = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <Textarea label="Paste JSON" value={input} onChange={setInput} rows={10} mono placeholder='{"key": "value"}' />
      <div className="flex items-center gap-3 flex-wrap">
        <Btn onClick={format}>Format</Btn>
        <Btn onClick={minify} variant="secondary">Minify</Btn>
        <label className="text-xs text-gray-500 flex items-center gap-1.5">
          Indent:
          <select value={indent} onChange={e => setIndent(+e.target.value)} className="border border-gray-200 rounded px-2 py-1 text-xs">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>
      {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">❌ {error}</p>}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Output</label>
            <CopyBtn text={output} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-72 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}

function Base64Tool() {
  const [input, setInput] = useState('')
  const encode = () => { try { return btoa(unescape(encodeURIComponent(input))) } catch { return 'Error: invalid input' } }
  const decode = () => { try { return decodeURIComponent(escape(atob(input))) } catch { return 'Error: invalid Base64' } }
  const [result, setResult] = useState('')
  return (
    <div className="space-y-4">
      <Textarea label="Input" value={input} onChange={setInput} rows={6} mono placeholder="Text or Base64 string…" />
      <div className="flex gap-3">
        <Btn onClick={() => setResult(encode())}>Encode → Base64</Btn>
        <Btn onClick={() => setResult(decode())} variant="secondary">Decode Base64 →</Btn>
      </div>
      {result && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Result</label>
            <CopyBtn text={result} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-48 whitespace-pre-wrap break-all">{result}</pre>
        </div>
      )}
    </div>
  )
}

function UuidGenerator() {
  const [count, setCount]   = useState(1)
  const [uuids, setUuids]   = useState<string[]>([])
  const gen = () => {
    const list: string[] = []
    for (let i = 0; i < count; i++) list.push(crypto.randomUUID())
    setUuids(list)
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-xs font-semibold text-gray-600">How many?</label>
        <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.min(100, +e.target.value))}
          className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400" />
        <Btn onClick={gen}>Generate</Btn>
      </div>
      {uuids.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">{uuids.length} UUID{uuids.length > 1 ? 's' : ''}</label>
            <CopyBtn text={uuids.join('\n')} />
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1 max-h-72 overflow-auto">
            {uuids.map((u, i) => (
              <div key={i} className="flex items-center justify-between gap-2 py-0.5">
                <code className="text-xs font-mono text-gray-700">{u}</code>
                <CopyBtn text={u} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function JwtDecoder() {
  const [token, setToken] = useState('')
  const decode = useCallback(() => {
    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) return null
      const parse = (p: string) => JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')))
      return { header: parse(parts[0]), payload: parse(parts[1]), sig: parts[2] }
    } catch { return null }
  }, [token])
  const result = token ? decode() : null
  const now = Math.floor(Date.now() / 1000)
  const expired = result?.payload?.exp && result.payload.exp < now

  return (
    <div className="space-y-4">
      <Textarea label="Paste JWT" value={token} onChange={setToken} rows={4} mono placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…" />
      {token && !result && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">❌ Invalid JWT</p>}
      {result && (
        <div className="space-y-3">
          {expired !== undefined && (
            <div className={`text-xs font-semibold px-3 py-2 rounded-lg ${expired ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
              {expired ? '⚠️ Token is expired' : '✅ Token is valid (not expired)'}
              {result.payload.exp && <span className="font-normal ml-2">— expires {new Date(result.payload.exp * 1000).toLocaleString()}</span>}
            </div>
          )}
          {[['Header', result.header], ['Payload', result.payload]].map(([label, obj]) => (
            <div key={label as string}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-500">{label as string}</label>
                <CopyBtn text={JSON.stringify(obj, null, 2)} />
              </div>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto whitespace-pre-wrap">
                {JSON.stringify(obj, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UrlEncoderTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  return (
    <div className="space-y-4">
      <Textarea label="Input" value={input} onChange={setInput} rows={6} mono placeholder="https://example.com/search?q=hello world&lang=en" />
      <div className="flex gap-3">
        <Btn onClick={() => setResult(encodeURIComponent(input))}>Encode</Btn>
        <Btn onClick={() => { try { setResult(decodeURIComponent(input)) } catch { setResult('Error: invalid encoded string') } }} variant="secondary">Decode</Btn>
      </div>
      {result && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Result</label>
            <CopyBtn text={result} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-48 whitespace-pre-wrap break-all">{result}</pre>
        </div>
      )}
    </div>
  )
}

function CsvJsonTool() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode]     = useState<'csv2json' | 'json2csv'>('csv2json')

  const convert = () => {
    if (mode === 'csv2json') {
      const lines = input.trim().split('\n')
      const headers = lines[0].split(',').map(h => h.trim())
      const rows = lines.slice(1).map(line => {
        const vals = line.split(',')
        return Object.fromEntries(headers.map((h, i) => [h, vals[i]?.trim() ?? '']))
      })
      setOutput(JSON.stringify(rows, null, 2))
    } else {
      try {
        const data = JSON.parse(input)
        if (!Array.isArray(data)) { setOutput('Error: JSON must be an array of objects'); return }
        const keys = Object.keys(data[0] ?? {})
        const csv  = [keys.join(','), ...data.map((row: any) => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))].join('\n')
        setOutput(csv)
      } catch { setOutput('Error: invalid JSON') }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {(['csv2json', 'json2csv'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${mode === m ? 'bg-green-600 text-white border-transparent' : 'bg-white border-gray-200 text-gray-600 hover:border-green-300'}`}>
            {m === 'csv2json' ? 'CSV → JSON' : 'JSON → CSV'}
          </button>
        ))}
      </div>
      <Textarea label="Input" value={input} onChange={setInput} rows={8} mono placeholder={mode === 'csv2json' ? 'name,age,city\nAlice,30,London' : '[{"name":"Alice","age":30}]'} />
      <Btn onClick={convert}>Convert</Btn>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Output</label>
            <CopyBtn text={output} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-72 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}

function SqlFormatter() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')

  const keywords = ['SELECT','FROM','WHERE','AND','OR','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','ON','AS','DISTINCT','COUNT','SUM','AVG','MAX','MIN','NOT','IN','LIKE','BETWEEN','IS NULL','IS NOT NULL','CREATE TABLE','DROP TABLE','ALTER TABLE','ADD COLUMN']

  const format = () => {
    let sql = input.trim()
    keywords.forEach(kw => { sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `\n${kw.toUpperCase()}`) })
    sql = sql.replace(/,\s*/g, ',\n  ').replace(/^\n/, '').split('\n').map(l => l.trim()).filter(Boolean).join('\n')
    setOutput(sql)
  }

  return (
    <div className="space-y-4">
      <Textarea label="SQL Query" value={input} onChange={setInput} rows={8} mono placeholder="SELECT id, name, email FROM users WHERE active = 1 ORDER BY name" />
      <Btn onClick={format}>Format SQL</Btn>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Formatted</label>
            <CopyBtn text={output} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-72 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}

function WordCounter() {
  const [text, setText] = useState('')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const readTime = Math.max(1, Math.ceil(words / 200))

  return (
    <div className="space-y-4">
      <Textarea label="Paste your text" value={text} onChange={setText} rows={10} placeholder="Start typing or paste text here…" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[['Words', words], ['Characters', chars], ['Chars (no spaces)', charsNoSpace], ['Sentences', sentences], ['Read time', `${readTime} min`]].map(([l, v]) => (
          <StatBadge key={l as string} label={l as string} value={v as string | number} />
        ))}
      </div>
    </div>
  )
}

function CaseConverter() {
  const [text, setText]   = useState('')
  const [result, setResult] = useState('')
  const cases = [
    { label: 'UPPERCASE',    fn: (t: string) => t.toUpperCase() },
    { label: 'lowercase',    fn: (t: string) => t.toLowerCase() },
    { label: 'Title Case',   fn: (t: string) => t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
    { label: 'Sentence case',fn: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()) },
    { label: 'camelCase',    fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { label: 'snake_case',   fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
    { label: 'kebab-case',   fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
    { label: 'PascalCase',   fn: (t: string) => t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s/g, '') },
  ]
  return (
    <div className="space-y-4">
      <Textarea label="Input text" value={text} onChange={setText} rows={5} placeholder="Type or paste text here…" />
      <div className="flex flex-wrap gap-2">
        {cases.map(c => (
          <button key={c.label} onClick={() => setResult(c.fn(text))}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-green-400 hover:text-green-700 transition-colors font-mono">
            {c.label}
          </button>
        ))}
      </div>
      {result && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Result</label>
            <CopyBtn text={result} />
          </div>
          <Textarea value={result} readOnly rows={5} />
        </div>
      )}
    </div>
  )
}

function RemoveSpaces() {
  const [input, setInput]  = useState('')
  const [output, setOutput] = useState('')
  const ops = [
    { label: 'Remove extra spaces', fn: (t: string) => t.replace(/[ \t]+/g, ' ').trim() },
    { label: 'Trim each line',      fn: (t: string) => t.split('\n').map(l => l.trim()).join('\n') },
    { label: 'Remove blank lines',  fn: (t: string) => t.split('\n').filter(l => l.trim()).join('\n') },
    { label: 'Remove all spaces',   fn: (t: string) => t.replace(/\s/g, '') },
  ]
  return (
    <div className="space-y-4">
      <Textarea label="Input" value={input} onChange={setInput} rows={8} placeholder="Paste text with extra spaces…" />
      <div className="flex flex-wrap gap-2">
        {ops.map(o => (
          <button key={o.label} onClick={() => setOutput(o.fn(input))}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-green-400 hover:text-green-700 transition-colors">
            {o.label}
          </button>
        ))}
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Output</label>
            <CopyBtn text={output} />
          </div>
          <Textarea value={output} readOnly rows={8} />
        </div>
      )}
    </div>
  )
}

function TextDiff() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const diff = () => {
    const aLines = a.split('\n')
    const bLines = b.split('\n')
    const max = Math.max(aLines.length, bLines.length)
    const result: { type: 'same' | 'removed' | 'added'; text: string }[] = []
    for (let i = 0; i < max; i++) {
      if (aLines[i] === bLines[i]) result.push({ type: 'same', text: aLines[i] ?? '' })
      else {
        if (aLines[i] !== undefined) result.push({ type: 'removed', text: aLines[i] })
        if (bLines[i] !== undefined) result.push({ type: 'added', text: bLines[i] })
      }
    }
    return result
  }
  const results = (a || b) ? diff() : []
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Textarea label="Original text" value={a} onChange={setA} rows={8} mono />
        <Textarea label="Modified text" value={b} onChange={setB} rows={8} mono />
      </div>
      {results.length > 0 && (
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">Diff</label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-h-72 overflow-auto space-y-0.5">
            {results.map((r, i) => (
              <div key={i} className={`text-xs font-mono px-2 py-0.5 rounded ${r.type === 'removed' ? 'bg-red-50 text-red-700' : r.type === 'added' ? 'bg-green-50 text-green-700' : 'text-gray-500'}`}>
                {r.type === 'removed' ? '− ' : r.type === 'added' ? '+ ' : '  '}{r.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RegexTester() {
  const [pattern, setPattern]  = useState('')
  const [flags, setFlags]      = useState('g')
  const [testStr, setTestStr]  = useState('')
  const getMatches = () => {
    if (!pattern || !testStr) return []
    try {
      const rx = new RegExp(pattern, flags)
      const matches: { match: string; index: number }[] = []
      let m
      if (flags.includes('g')) { while ((m = rx.exec(testStr)) !== null) matches.push({ match: m[0], index: m.index }) }
      else { m = rx.exec(testStr); if (m) matches.push({ match: m[0], index: m.index }) }
      return matches
    } catch { return [] }
  }
  const matches = getMatches()
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-500 block mb-1">Pattern</label>
          <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-400" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">Flags</label>
          <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-400" />
        </div>
      </div>
      <Textarea label="Test string" value={testStr} onChange={setTestStr} rows={6} mono placeholder="Enter text to test against…" />
      {pattern && testStr && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">{matches.length} match{matches.length !== 1 ? 'es' : ''}</p>
          {matches.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1 max-h-40 overflow-auto">
              {matches.map((m, i) => (
                <div key={i} className="text-xs font-mono text-gray-700 flex gap-3">
                  <span className="text-gray-400">#{i + 1}</span>
                  <span className="bg-yellow-100 px-1 rounded">{m.match}</span>
                  <span className="text-gray-400">index {m.index}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MetaTagGenerator() {
  const [f, setF] = useState({ title: '', desc: '', url: '', image: '', type: 'website', robots: 'index, follow' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }))
  const html = `<!-- Primary Meta Tags -->
<title>${f.title}</title>
<meta name="title" content="${f.title}">
<meta name="description" content="${f.desc}">
<meta name="robots" content="${f.robots}">

<!-- Open Graph -->
<meta property="og:type" content="${f.type}">
<meta property="og:url" content="${f.url}">
<meta property="og:title" content="${f.title}">
<meta property="og:description" content="${f.desc}">
${f.image ? `<meta property="og:image" content="${f.image}">` : ''}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${f.title}">
<meta name="twitter:description" content="${f.desc}">
${f.image ? `<meta name="twitter:image" content="${f.image}">` : ''}`

  const Field = ({ label, k, placeholder }: { label: string; k: string; placeholder?: string }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <input value={(f as any)[k]} onChange={set(k)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400" />
    </div>
  )

  return (
    <div className="space-y-3">
      <Field label="Page Title" k="title" placeholder="My Awesome Page — Site Name" />
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Description</label>
        <textarea value={f.desc} onChange={set('desc')} rows={2} placeholder="A brief description of the page (120-160 characters)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400 resize-none" />
        <p className="text-[10px] text-gray-400 mt-0.5">{f.desc.length}/160 chars</p>
      </div>
      <Field label="Page URL" k="url" placeholder="https://example.com/page" />
      <Field label="OG Image URL" k="image" placeholder="https://example.com/image.jpg" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">OG Type</label>
          <select value={f.type} onChange={set('type')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400">
            {['website', 'article', 'product'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">Robots</label>
          <select value={f.robots} onChange={set('robots')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400">
            {['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>
      {f.title && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-500">Generated HTML</label>
            <CopyBtn text={html} />
          </div>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-64 whitespace-pre-wrap">{html}</pre>
        </div>
      )}
    </div>
  )
}

function SlugGenerator() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const slugify = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Title or phrase</label>
        <input value={input} onChange={e => { setInput(e.target.value); setOutput(slugify(e.target.value)) }}
          placeholder="My Awesome Blog Post Title!"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400" />
      </div>
      {output && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <code className="text-sm font-mono text-green-800 break-all">{output}</code>
          <CopyBtn text={output} />
        </div>
      )}
    </div>
  )
}

function KeywordDensity() {
  const [text, setText] = useState('')
  const analyse = () => {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3)
    const counts: Record<string, number> = {}
    words.forEach(w => { counts[w] = (counts[w] ?? 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20)
  }
  const results = text.trim() ? analyse() : []
  const total   = text.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="space-y-4">
      <Textarea label="Paste your content" value={text} onChange={setText} rows={8} placeholder="Paste your article or page content here…" />
      {results.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">Top keywords from {total} total words</p>
          <div className="space-y-1">
            {results.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="w-32 text-xs font-mono text-gray-700 truncate">{word}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(count / results[0][1]) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">{count}x · {((count / total) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function OgGenerator() {
  const [f, setF] = useState({ title: '', desc: '', image: '', url: '', siteName: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }))
  const html = `<meta property="og:title" content="${f.title}">
<meta property="og:description" content="${f.desc}">
<meta property="og:image" content="${f.image}">
<meta property="og:url" content="${f.url}">
<meta property="og:site_name" content="${f.siteName}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${f.title}">
<meta name="twitter:description" content="${f.desc}">
<meta name="twitter:image" content="${f.image}">`

  const Field = ({ label, k, placeholder }: { label: string; k: string; placeholder?: string }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <input value={(f as any)[k]} onChange={set(k)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400" />
    </div>
  )

  return (
    <div className="space-y-3">
      <Field label="Title" k="title" placeholder="Your page title" />
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Description</label>
        <textarea value={f.desc} onChange={set('desc')} rows={2} placeholder="1-2 sentence description"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400 resize-none" />
      </div>
      <Field label="Image URL" k="image" placeholder="https://example.com/og-image.jpg" />
      <Field label="Page URL" k="url" placeholder="https://example.com/page" />
      <Field label="Site Name" k="siteName" placeholder="ToolFocus" />
      {f.title && (
        <div>
          {/* Preview card */}
          <p className="text-xs font-semibold text-gray-500 mb-2">Preview</p>
          <div className="border border-gray-200 rounded-xl overflow-hidden max-w-sm">
            {f.image && <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-300 text-xs">[OG Image: {f.image.split('/').pop()}]</div>}
            <div className="p-3 bg-white">
              <p className="text-[10px] uppercase text-gray-400 mb-0.5">{f.siteName || f.url}</p>
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{f.title}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{f.desc}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-500">Generated HTML</label>
              <CopyBtn text={html} />
            </div>
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono overflow-auto max-h-48 whitespace-pre-wrap">{html}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

function RobotsTxt() {
  const [sitemap, setSitemap]         = useState('')
  const [disallow, setDisallow]       = useState('/admin/\n/private/\n/api/')
  const [allowAll, setAllowAll]       = useState(true)
  const txt = `User-agent: *
${allowAll ? 'Allow: /' : ''}
${disallow.split('\n').filter(Boolean).map(d => `Disallow: ${d.trim()}`).join('\n')}
${sitemap ? `\nSitemap: ${sitemap}` : ''}`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={allowAll} onChange={e => setAllowAll(e.target.checked)} className="rounded" />
          Allow all crawlers
        </label>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Disallow paths (one per line)</label>
        <textarea value={disallow} onChange={e => setDisallow(e.target.value)} rows={5}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm font-mono focus:outline-none focus:border-green-400 resize-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-1">Sitemap URL</label>
        <input value={sitemap} onChange={e => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-gray-500">robots.txt</label>
          <CopyBtn text={txt} />
        </div>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap">{txt}</pre>
      </div>
    </div>
  )
}

function PasswordGenerator() {
  const [length, setLength]   = useState(16)
  const [opts, setOpts]       = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [pwd, setPwd]         = useState('')
  const toggle = (k: keyof typeof opts) => setOpts(p => ({ ...p, [k]: !p[k] }))
  const generate = () => {
    const sets = [
      opts.upper   ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      opts.lower   ? 'abcdefghijklmnopqrstuvwxyz' : '',
      opts.numbers ? '0123456789' : '',
      opts.symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '',
    ].join('')
    if (!sets) return
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    setPwd(Array.from(arr).map(n => sets[n % sets.length]).join(''))
  }
  const strength = pwd.length >= 20 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd) ? 'Strong' : pwd.length >= 12 ? 'Good' : 'Weak'
  const strengthColor = { Strong: 'text-green-600 bg-green-50', Good: 'text-amber-600 bg-amber-50', Weak: 'text-red-500 bg-red-50' }[strength]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-xs font-semibold text-gray-600">Length: {length}</label>
        <input type="range" min={8} max={64} value={length} onChange={e => setLength(+e.target.value)} className="flex-1" />
      </div>
      <div className="flex flex-wrap gap-4">
        {([['upper', 'A-Z'], ['lower', 'a-z'], ['numbers', '0-9'], ['symbols', '!@#']] as const).map(([k, l]) => (
          <label key={k} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={opts[k]} onChange={() => toggle(k)} className="rounded" />
            {l}
          </label>
        ))}
      </div>
      <Btn onClick={generate}>Generate Password</Btn>
      {pwd && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <code className="text-sm font-mono text-gray-800 break-all flex-1">{pwd}</code>
            <CopyBtn text={pwd} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${strengthColor}`}>{strength}</span>
            <span className="text-xs text-gray-400">{pwd.length} characters</span>
          </div>
        </div>
      )}
    </div>
  )
}

function HashGenerator() {
  const [input, setInput]   = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})

  const compute = async () => {
    const enc = new TextEncoder().encode(input)
    const results: Record<string, string> = {}
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-512']) {
      const buf    = await crypto.subtle.digest(algo, enc)
      results[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    // MD5 approximation note
    results['MD5 (note)'] = 'Use a dedicated MD5 library — browser SubtleCrypto does not support MD5 (insecure). SHA-256 is recommended instead.'
    setHashes(results)
  }

  return (
    <div className="space-y-4">
      <Textarea label="Input text" value={input} onChange={setInput} rows={4} mono placeholder="Enter text to hash…" />
      <Btn onClick={compute} disabled={!input}>Compute Hashes</Btn>
      {Object.entries(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-500">{algo}</label>
                {!algo.includes('note') && <CopyBtn text={hash} />}
              </div>
              <p className={`font-mono text-xs break-all p-2 rounded-lg border ${algo.includes('note') ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>{hash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HexColor() {
  const [hex, setHex] = useState('#16a34a')
  const hexToRgb = (h: string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null
  }
  const rgb = hexToRgb(hex)
  const hsl = rgb ? (() => {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
      h /= 6
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  })() : null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer" />
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-500 block mb-1">HEX</label>
          <input value={hex} onChange={e => setHex(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-400 uppercase" />
        </div>
      </div>
      {rgb && hsl && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'HEX', value: hex.toUpperCase() },
            { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">{label}</p>
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono text-gray-700">{value}</code>
                <CopyBtn text={value} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="h-20 rounded-xl border border-gray-200" style={{ background: hex }} />
    </div>
  )
}

function CssGradient() {
  const [type, setType]     = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle]   = useState(135)
  const [c1, setC1]         = useState('#16a34a')
  const [c2, setC2]         = useState('#059669')
  const css = type === 'linear'
    ? `background: linear-gradient(${angle}deg, ${c1}, ${c2});`
    : `background: radial-gradient(circle, ${c1}, ${c2});`

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {(['linear', 'radial'] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${type === t ? 'bg-green-600 text-white border-transparent' : 'bg-white border-gray-200 text-gray-600'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">Color 1</label>
          <div className="flex gap-2">
            <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <input value={c1} onChange={e => setC1(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm font-mono focus:outline-none focus:border-green-400" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">Color 2</label>
          <div className="flex gap-2">
            <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
            <input value={c2} onChange={e => setC2(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm font-mono focus:outline-none focus:border-green-400" />
          </div>
        </div>
      </div>
      {type === 'linear' && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-gray-600">Angle: {angle}°</label>
          <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="flex-1" />
        </div>
      )}
      <div className="h-32 rounded-xl border border-gray-200" style={{ background: type === 'linear' ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})` }} />
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-gray-500">CSS</label>
          <CopyBtn text={css} />
        </div>
        <code className="block bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-700">{css}</code>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Main dispatcher                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */
const RENDERERS: Record<string, React.ComponentType> = {
  'json-formatter':     JsonFormatter,
  'base64':             Base64Tool,
  'uuid-generator':     UuidGenerator,
  'jwt-decoder':        JwtDecoder,
  'url-encoder':        UrlEncoderTool,
  'csv-json':           CsvJsonTool,
  'sql-formatter':      SqlFormatter,
  'word-counter':       WordCounter,
  'case-converter':     CaseConverter,
  'remove-spaces':      RemoveSpaces,
  'text-diff':          TextDiff,
  'regex-tester':       RegexTester,
  'meta-tag-generator': MetaTagGenerator,
  'slug-generator':     SlugGenerator,
  'keyword-density':    KeywordDensity,
  'og-generator':       OgGenerator,
  'robots-txt':         RobotsTxt,
  'password-generator': PasswordGenerator,
  'hash-generator':     HashGenerator,
  'hex-color':          HexColor,
  'css-gradient':       CssGradient,
}

export default function ToolRenderer({ toolId }: { toolId: string }) {
  const Component = RENDERERS[toolId]
  if (!Component) return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-4xl mb-3">🔧</p>
      <p className="text-sm">Tool coming soon!</p>
    </div>
  )
  return <Component />
}
