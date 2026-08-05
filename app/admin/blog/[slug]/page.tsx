'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AdminShell } from '../../AdminShell'
import { buildPrompt } from '@/lib/articlePromptTemplate'
import { sanitizeAiJson, parseJsonWithContext } from '@/lib/sanitizeAiJson'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type PostForm = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  videoUrl: string
  content: string
}

const empty: PostForm = {
  slug: '',
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  excerpt: '',
  image: '',
  videoUrl: '',
  content: '',
}

const CATEGORIES = ['IoT', 'AI', 'Case Study', 'Insight', 'Tutorial', 'News']

type UnsplashPhoto = {
  id: string
  urls: { thumb: string; raw: string }
  user: { name: string; links: { html: string } }
  links: { download_location: string }
}

const sanitizeSchema = { ...defaultSchema, allowComments: true }

type AiBlogJson = PostForm & {
  _ichibot_type?: string
  keywords?: string[]
  faq?: { q: string; a: string }[]
}

export default function AdminBlogEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const isNew = slug === 'new'
  const router = useRouter()
  const [form, setForm] = useState<PostForm>(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [promptForm, setPromptForm] = useState({
    topic: '',
    category: '',
    audience: '',
    keyword: '',
    insertImages: false,
    notes: '',
    cta: '',
    productLink: '',
    useFaq: true,
  })
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [pastedJSON, setPastedJSON] = useState('')
  const [validatedJSON, setValidatedJSON] = useState<AiBlogJson | null>(null)
  const [showUnsplash, setShowUnsplash] = useState(false)
  const [unsplashQuery, setUnsplashQuery] = useState('')
  const [unsplashResults, setUnsplashResults] = useState<UnsplashPhoto[]>([])
  const [unsplashLoading, setUnsplashLoading] = useState(false)
  const [unsplashTarget, setUnsplashTarget] = useState<'cover' | string>('cover') // 'cover' or 'GAMBAR_1' etc.
  const [unsplashAttribution, setUnsplashAttribution] = useState('')

  useEffect(() => {
    if (isNew) return
    fetch(`/api/admin/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => { setForm(d); setLoading(false) })
  }, [slug, isNew])

  const handleGeneratePrompt = () => {
    const text = buildPrompt(promptForm)
    setGeneratedPrompt(text)
    setCopied(false)
  }

  const handleCopyPrompt = async () => {
    if (!generatedPrompt) return
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Count GAMBAR_N placeholders in content
  const getPlaceholders = (content: string) => {
    const matches = content.match(/GAMBAR_\d+/g)
    return matches ? [...new Set(matches)] : []
  }

  const handleValidateOnly = (jsonStr: string) => {
    if (!jsonStr.trim()) {
      alert('Silakan masukkan JSON terlebih dahulu.')
      return
    }
    const sanitized = sanitizeAiJson(jsonStr)
    const result = parseJsonWithContext(sanitized)
    if (!result.ok) {
      alert(`Validasi Gagal:\n\n${result.error}`)
      return
    }
    const data = result.data as AiBlogJson

    if (data._ichibot_type !== 'blog') {
      alert('Validasi Gagal: Data JSON tidak valid untuk halaman Blog (_ichibot_type harus "blog").')
      return
    }

    const requiredKeys = [
      'slug', 'title', 'date', 'category', 'excerpt', 'image',
      'videoUrl', 'content', 'keywords', 'faq', '_ichibot_type'
    ]
    const missingKeys = requiredKeys.filter(k => !(k in data))
    if (missingKeys.length > 0) {
      alert(`Validasi Gagal: Kunci wajib berikut tidak ditemukan: ${missingKeys.join(', ')}`)
      return
    }

    if (data.excerpt && data.excerpt.includes('*')) {
      alert('Validasi Gagal: excerpt tidak boleh mengandung simbol asteris (*).')
      return
    }

    if (Array.isArray(data.faq)) {
      const hasAsteris = data.faq.some((item: { q: string; a: string }) => item.a && item.a.includes('*'))
      if (hasAsteris) {
        alert('Validasi Gagal: jawaban pada FAQ tidak boleh mengandung simbol asteris (*).')
        return
      }
    }

    setValidatedJSON(data)
    const placeholders = getPlaceholders(data.content || '')
    const needsCover = !data.image
    const msgs: string[] = ['\u2705 JSON Valid!']
    if (needsCover) msgs.push('\u26a0\ufe0f Field image kosong \u2014 gunakan "Cari Gambar" untuk mengisi.')
    if (placeholders.length > 0) msgs.push(`\u26a0\ufe0f Ditemukan ${placeholders.length} placeholder gambar in-body: ${placeholders.join(', ')}`)
    if (!needsCover && placeholders.length === 0) msgs.push('Siap di-import.')
    alert(msgs.join('\n'))
  }

  const handleImportValidated = () => {
    if (!validatedJSON) {
      alert('Validasi JSON terlebih dahulu.')
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _ichibot_type, keywords, faq, ...rest } = validatedJSON
    setForm(prev => ({ ...prev, ...rest }))
    alert('Data berhasil diimpor ke form editor.')
    setPastedJSON('')
    setValidatedJSON(null)
  }

  // Unsplash handlers
  const openUnsplash = (target: 'cover' | string) => {
    setUnsplashTarget(target)
    // Default query from keywords or title
    const kw = (validatedJSON?.keywords as string[] | undefined)
    const defaultQuery = kw && kw.length > 0
      ? kw.slice(0, 3).join(' ')
      : (form.title || '')
    setUnsplashQuery(defaultQuery)
    setUnsplashResults([])
    setShowUnsplash(true)
    setUnsplashAttribution('')
  }

  const searchUnsplash = async () => {
    if (!unsplashQuery.trim()) return
    setUnsplashLoading(true)
    try {
      const res = await fetch(`/api/admin/unsplash?action=search&query=${encodeURIComponent(unsplashQuery)}`)
      const data = await res.json()
      if (data.results) {
        setUnsplashResults(data.results)
      } else {
        alert(data.error || 'Gagal mengambil data dari Unsplash.')
      }
    } catch {
      alert('Gagal terhubung ke server Unsplash.')
    }
    setUnsplashLoading(false)
  }

  const selectUnsplashPhoto = async (photo: UnsplashPhoto) => {
    // 1. Trigger download event (Unsplash API Guidelines)
    try {
      await fetch(`/api/admin/unsplash?action=download&url=${encodeURIComponent(photo.links.download_location)}`)
    } catch { /* best effort */ }

    // 2. Build final URL
    const widthParam = unsplashTarget === 'cover' ? 1200 : 1600
    const finalUrl = `${photo.urls.raw}&w=${widthParam}&q=80&fm=jpg&fit=crop`

    // 3. Attribution
    const utmParams = '?utm_source=ichibot_editor&utm_medium=referral'
    const attribution = `Photo by ${photo.user.name} on Unsplash`
    setUnsplashAttribution(attribution)

    if (unsplashTarget === 'cover') {
      set('image', finalUrl)
    } else {
      // Replace placeholder in content (e.g. GAMBAR_1)
      const altText = unsplashQuery || 'gambar artikel'
      const markdownImg = `![${altText}](${finalUrl})`
      const newContent = form.content.replace(unsplashTarget, markdownImg)
      set('content', newContent)
    }

    // Append attribution as HTML comment in content if not already there
    const attrComment = `<!-- ${attribution} | ${photo.user.links.html}${utmParams} | https://unsplash.com${utmParams} -->`
    if (!form.content.includes(attrComment)) {
      setForm(prev => ({ ...prev, content: prev.content + '\n\n' + attrComment }))
    }

    setShowUnsplash(false)
  }

  function set<K extends keyof PostForm>(key: K, val: PostForm[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${slug}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      router.push('/admin/blog')
    } else {
      const d = await res.json()
      setError(d.error ?? 'Terjadi kesalahan')
    }
  }

  const exportJSON = () => {
    const data = { ...form, _ichibot_type: 'blog' }
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('Data berhasil disalin ke clipboard! Silakan berikan ke AI.')
  }

  const importJSON = () => {
    const input = window.prompt('Tempelkan JSON dari AI ke sini:')
    if (!input) return
    try {
      const data = JSON.parse(input)
      if (data._ichibot_type !== 'blog') {
        alert('Data JSON tidak valid untuk halaman Blog.')
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _ichibot_type, ...rest } = data
      setForm(prev => ({ ...prev, ...rest }))
      alert('Data berhasil diimpor!')
    } catch (e) {
      alert('Format JSON tidak valid.')
    }
  }

  if (loading) return <AdminShell><div className="p-8 text-ink/55 text-sm">Memuat data...</div></AdminShell>

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/blog')} className="text-ink/40 hover:text-ink/65 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-ink">{isNew ? 'Tambah Artikel' : 'Edit Artikel'}</h1>
          </div>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={exportJSON}
              title="Salin data ke clipboard untuk AI"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-brand border border-brand/20 bg-brand/5 hover:bg-brand/10 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Export
            </button>
            <button 
              type="button" 
              onClick={importJSON}
              title="Impor data dari AI"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-ink/65 border border-black/10 bg-off-white hover:bg-black/5 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Import
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-5">
            <h2 className="font-semibold text-ink text-sm uppercase">Metadata</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Slug <span className="text-ink/40 font-normal">(auto URL-safe)</span></label>
                <input
                  value={form.slug}
                  onChange={(e) => {
                    const safe = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                    set('slug', safe)
                  }}
                  placeholder="judul-artikel-saya"
                  required
                  disabled={!isNew}
                  className="input-field w-full disabled:bg-off-white disabled:text-ink/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Tanggal</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/85 mb-1.5">Judul</label>
              <input
                value={form.title}
                onChange={(e) => {
                  const val = e.target.value
                  setForm(f => {
                    const next = { ...f, title: val }
                    if (isNew) {
                      next.slug = val.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    }
                    return next
                  })
                }}
                required
                className="input-field w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="input-field w-full bg-white"
                >
                  <option value="">— Pilih Kategori —</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/85 mb-1.5">URL Gambar Cover</label>
                <div className="flex gap-2">
                  <input
                    value={form.image}
                    onChange={(e) => set('image', e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="input-field w-full"
                  />
                  <button
                    type="button"
                    onClick={() => openUnsplash('cover')}
                    aria-label="Cari gambar cover dari Unsplash"
                    className="shrink-0 px-3 py-1.5 text-xs font-semibold text-brand border border-brand/20 bg-brand/5 hover:bg-brand/10 rounded-lg transition-all whitespace-nowrap"
                  >
                    Cari Gambar
                  </button>
                </div>
              </div>
            </div>

            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-xl" />
            )}

            <div>
              <label className="block text-sm font-medium text-ink/85 mb-1.5">URL Video (YouTube / YouTube Shorts / TikTok / Instagram Reels)</label>
              <input
                value={form.videoUrl}
                onChange={(e) => set('videoUrl', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... atau https://www.tiktok.com/@.../video/..."
                className="input-field w-full"
              />
              <p className="text-xs text-ink/40 mt-1">Paste link langsung — otomatis terdeteksi platformnya.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/85 mb-1.5">Ringkasan (Excerpt)</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                className="input-field w-full resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-3">
            <h2 className="font-semibold text-ink text-sm uppercase">Konten Artikel</h2>
            <p className="text-xs text-ink/40">
              Toolbar untuk styling — atau klik ikon <code>&lt;/&gt;</code> untuk edit raw markdown langsung.
              Sisipkan gambar dengan <code>![alt](url)</code>.
            </p>

            {/* Placeholder detection */}
            {getPlaceholders(form.content).length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                <p className="text-xs font-semibold text-amber-800">⚠️ Placeholder gambar terdeteksi:</p>
                <div className="flex flex-wrap gap-2">
                  {getPlaceholders(form.content).map(ph => (
                    <button
                      key={ph}
                      type="button"
                      onClick={() => openUnsplash(ph)}
                      className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg hover:bg-amber-200 transition-colors border border-amber-300"
                    >
                      {ph} → Cari Gambar
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div data-color-mode="light">
              <MDEditor
                value={form.content}
                onChange={(v) => set('content', v ?? '')}
                height={520}
                preview="edit"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-brand hover:bg-brand-dark disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-sm text-sm transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="bg-white hover:bg-black/5 border border-black/10 text-ink/85 font-semibold px-6 py-2.5 rounded-sm text-sm transition-colors"
            >
              Preview
            </button>
            <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 rounded-xl text-sm font-medium text-ink/65 hover:bg-black/5 transition-colors">
              Batal
            </button>
          </div>
        </form>
      </div>

      {/* Kolom Kanan: Generate Prompt & Validator */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-5 shadow-sm">
          <div>
            <h2 className="font-semibold text-ink text-sm uppercase tracking-wider">Generate AI Prompt</h2>
            <p className="text-xs text-ink/40 mt-1">Buat prompt terstruktur untuk di-input ke Chatbot AI (ChatGPT, Claude, Gemini, dll).</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Topik Artikel</label>
              <input
                type="text"
                value={promptForm.topic}
                onChange={(e) => setPromptForm(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="mis. Jasa CCTV AI untuk deteksi APD"
                className="input-field w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Kategori</label>
              <select
                value={promptForm.category}
                onChange={(e) => setPromptForm(prev => ({ ...prev, category: e.target.value }))}
                className="input-field w-full bg-white text-ink/85 font-normal text-sm"
              >
                <option value="">— Pilih Kategori (Biarkan AI Pilih) —</option>
                <option value="Layanan">Layanan</option>
                <option value="Insight">Insight</option>
                <option value="Studi Kasus">Studi Kasus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Target Audiens</label>
              <input
                type="text"
                value={promptForm.audience}
                onChange={(e) => setPromptForm(prev => ({ ...prev, audience: e.target.value }))}
                placeholder="mis. Plant Manager pabrik manufaktur"
                className="input-field w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Keyword Utama</label>
              <input
                type="text"
                value={promptForm.keyword}
                onChange={(e) => setPromptForm(prev => ({ ...prev, keyword: e.target.value }))}
                placeholder="mis. cctv ai k3"
                className="input-field w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Call to Action</label>
              <input
                type="text"
                value={promptForm.cta}
                onChange={(e) => setPromptForm(prev => ({ ...prev, cta: e.target.value }))}
                placeholder="mis. Ajak konsultasi gratis / coba demo produk"
                className="input-field w-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Link Produk</label>
              <input
                type="text"
                value={promptForm.productLink}
                onChange={(e) => setPromptForm(prev => ({ ...prev, productLink: e.target.value }))}
                placeholder="mis. /produk/equipment-monitoring"
                className="input-field w-full text-sm"
              />
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <input
                type="checkbox"
                id="insertImages"
                checked={promptForm.insertImages}
                onChange={(e) => setPromptForm(prev => ({ ...prev, insertImages: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              <label htmlFor="insertImages" className="text-sm font-medium text-ink/85 select-none">
                Sisipkan 2–3 gambar di dalam artikel
              </label>
            </div>

            <div className="flex items-center gap-2.5 py-1">
              <input
                type="checkbox"
                id="useFaq"
                checked={promptForm.useFaq}
                onChange={(e) => setPromptForm(prev => ({ ...prev, useFaq: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              <label htmlFor="useFaq" className="text-sm font-medium text-ink/85 select-none">
                Pakai section FAQ
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/85 mb-1.5 uppercase">Catatan Tambahan</label>
              <textarea
                rows={3}
                value={promptForm.notes}
                onChange={(e) => setPromptForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="mis. Tambahkan studi kasus di Indonesia..."
                className="input-field w-full resize-none text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleGeneratePrompt}
              className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              Generate Prompt
            </button>
          </div>

          {generatedPrompt && (
            <div className="space-y-3 pt-4 border-t border-black/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink uppercase tracking-wider">Hasil Prompt</span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-xs font-semibold text-brand hover:underline flex items-center gap-1.5"
                  aria-label={copied ? "Prompt tersalin" : "Salin prompt ke clipboard"}
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Tersalin
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <div aria-live="polite" className="sr-only">
                {copied ? "Prompt telah berhasil disalin ke clipboard." : ""}
              </div>
              <textarea
                readOnly
                rows={8}
                value={generatedPrompt}
                className="w-full text-xs font-mono bg-off-white border border-black/10 rounded-xl p-3.5 outline-none resize-y text-ink/85"
              />
            </div>
          )}
        </div>

        {/* Panel Validator & Import */}
        <div className="bg-white rounded-2xl border border-black/10 p-6 space-y-5 shadow-sm">
          <div>
            <h2 className="font-semibold text-ink text-sm uppercase tracking-wider">JSON Validator & Import</h2>
            <p className="text-xs text-ink/40 mt-1">Tempelkan hasil JSON dari chatbot AI. Alur: Validate → Cari Gambar → Import.</p>
          </div>

          <div className="space-y-4">
            <textarea
              rows={4}
              value={pastedJSON}
              onChange={(e) => { setPastedJSON(e.target.value); setValidatedJSON(null) }}
              placeholder='Tempelkan JSON artikel di sini...'
              className="w-full text-xs font-mono bg-off-white border border-black/10 rounded-xl p-3.5 outline-none resize-y text-ink/85"
            />

            <button
              type="button"
              onClick={() => handleValidateOnly(pastedJSON)}
              className="w-full bg-off-white hover:bg-black/5 border border-black/15 text-ink font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              1. Validate JSON
            </button>

            {validatedJSON && (
              <>
                {/* Show placeholder info */}
                {(!validatedJSON.image || getPlaceholders(validatedJSON.content || '').length > 0) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                    <p className="text-xs font-semibold text-amber-800">{'\u26a0\ufe0f'} Gambar perlu diisi:</p>
                    <div className="flex flex-wrap gap-2">
                      {!validatedJSON.image && (
                        <button
                          type="button"
                          onClick={() => openUnsplash('cover')}
                          className="text-xs font-semibold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg hover:bg-amber-200 transition-colors border border-amber-300"
                        >
                          Cover Image {'\u2192'} Cari
                        </button>
                      )}
                      {getPlaceholders(validatedJSON.content || '').map(ph => (
                        <button
                          key={ph}
                          type="button"
                          onClick={() => {
                            // Also update validatedJSON content so UI stays in sync
                            openUnsplash(ph)
                          }}
                          className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg hover:bg-amber-200 transition-colors border border-amber-300"
                        >
                          {ph} {'\u2192'} Cari
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleImportValidated}
                  className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                >
                  3. Import ke Editor
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Unsplash Search Modal */}
  {showUnsplash && (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 px-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-5 mb-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-ink text-lg">Cari Gambar Unsplash</h2>
            <p className="text-xs text-ink/40 mt-0.5">
              Target: <span className="font-semibold text-ink/70">{unsplashTarget === 'cover' ? 'Gambar Cover' : unsplashTarget}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowUnsplash(false)}
            className="text-ink/40 hover:text-ink transition-colors p-1"
            aria-label="Tutup pencarian gambar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={unsplashQuery}
            onChange={(e) => setUnsplashQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchUnsplash()}
            placeholder="Kata kunci pencarian..."
            className="input-field w-full text-sm"
            aria-label="Kata kunci pencarian gambar Unsplash"
          />
          <button
            type="button"
            onClick={searchUnsplash}
            disabled={unsplashLoading}
            className="shrink-0 bg-brand hover:bg-brand-dark disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
          >
            {unsplashLoading ? 'Mencari...' : 'Cari'}
          </button>
        </div>

        {unsplashResults.length > 0 && (
          <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
            {unsplashResults.map(photo => (
              <button
                key={photo.id}
                type="button"
                onClick={() => selectUnsplashPhoto(photo)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-transparent hover:border-brand transition-all focus:outline-none focus:border-brand"
                aria-label={`Pilih foto oleh ${photo.user.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.urls.thumb}
                  alt={`Foto oleh ${photo.user.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white/90 truncate">
                    Photo by <span className="font-semibold">{photo.user.name}</span> on Unsplash
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {unsplashResults.length === 0 && !unsplashLoading && (
          <p className="text-center text-ink/40 text-sm py-8">Masukkan kata kunci dan klik &quot;Cari&quot; untuk memulai pencarian.</p>
        )}

        {unsplashAttribution && (
          <div aria-live="polite" className="text-xs text-ink/55 bg-off-white rounded-lg p-3">
            {'\u2705'} Gambar dipilih. {unsplashAttribution}.
          </div>
        )}

        <p className="text-[10px] text-ink/30 text-center">
          Foto dari{' '}
          <a href="https://unsplash.com?utm_source=ichibot_editor&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline">
            Unsplash
          </a>
        </p>
      </div>
    </div>
  )}

  {showPreview && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Preview Sticky Top Bar */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-between z-10 max-w-4xl mx-auto rounded-b-xl shadow-sm">
            <span className="font-bold text-ink text-sm uppercase tracking-wider">Pratinjau Artikel</span>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tutup Pratinjau
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-6 text-xs">
                {form.category && (
                  <span className="font-semibold text-brand uppercase">{form.category}</span>
                )}
                {form.category && form.date && <span className="w-1 h-1 rounded-full bg-ink/20" />}
                {form.date && (
                  <span className="text-ink/55 font-medium">
                    {new Date(form.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1] mb-6">
                {form.title || 'Judul Artikel'}
              </h1>
              <p className="text-ink/65 text-lg leading-relaxed">{form.excerpt || 'Ringkasan artikel akan muncul di sini...'}</p>
            </div>

            {/* Hero Image */}
            {form.image && (
              <div className="mt-8 rounded-2xl overflow-hidden bg-black aspect-video max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt={form.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Body Content */}
            <div className="mt-12 max-w-3xl">
              <article className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-ink prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-ink/75 prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-ink/75 prose-li:mb-2
                prose-a:text-brand prose-a:no-underline hover:prose-a:text-brand-dark hover:prose-a:underline
                prose-strong:text-ink prose-strong:font-bold
                prose-img:rounded-2xl prose-img:my-8
                prose-code:text-brand prose-code:bg-off-white prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-blockquote:border-l-brand prose-blockquote:text-ink/75 prose-blockquote:not-italic
                prose-hr:border-black/10 prose-hr:my-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
                  components={{
                    img: ({ src, alt }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={alt} className="w-full rounded-2xl my-8 object-cover" />
                    ),
                    h2: ({ children }) => <h2 className="text-2xl font-bold pt-8 mb-4 tracking-tight text-ink">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold pt-6 mb-3 tracking-tight text-ink">{children}</h3>,
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 my-6 space-y-2 text-ink/75">{children}</ol>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 my-6 space-y-2 text-ink/75">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    table: ({ children }) => (
                      <div className="my-8 overflow-x-auto rounded-2xl border border-black/8">
                        <table className="w-full text-sm border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-off-white">{children}</thead>,
                    tbody: ({ children }) => <tbody className="divide-y divide-black/8">{children}</tbody>,
                    tr: ({ children }) => <tr>{children}</tr>,
                    th: ({ children }) => (
                      <th className="text-left px-5 py-3 font-semibold text-ink text-[13px] uppercase">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-5 py-3 text-ink/75 align-top">{children}</td>
                    ),
                  }}
                >
                  {form.content || '*Belum ada konten.*'}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      )}

      <style>{`.input-field { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; color: #1a202c; } .input-field:focus { border-color: #2dd4bf; box-shadow: 0 0 0 2px rgba(45,212,191,0.1); }`}</style>
    </AdminShell>
  )
}
