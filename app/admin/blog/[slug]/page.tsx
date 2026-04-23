'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { AdminShell } from '../../AdminShell'
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

export default function AdminBlogEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const isNew = slug === 'new'
  const router = useRouter()
  const [form, setForm] = useState<PostForm>(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    fetch(`/api/admin/blog/${slug}`)
      .then((r) => r.json())
      .then((d) => { setForm(d); setLoading(false) })
  }, [slug, isNew])

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

  if (loading) return <AdminShell><div className="p-8 text-gray-500 text-sm">Memuat data...</div></AdminShell>

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/blog')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Tambah Artikel' : 'Edit Artikel'}</h1>
          </div>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={exportJSON}
              title="Salin data ke clipboard untuk AI"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-teal border border-teal/20 bg-teal/5 hover:bg-teal/10 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Export
            </button>
            <button 
              type="button" 
              onClick={importJSON}
              title="Impor data dari AI"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Import
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Metadata</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-gray-400 font-normal">(auto URL-safe)</span></label>
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
                  className="input-field w-full disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar Cover</label>
                <input
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field w-full"
                />
              </div>
            </div>

            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-xl" />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Video (YouTube / YouTube Shorts / TikTok / Instagram Reels)</label>
              <input
                value={form.videoUrl}
                onChange={(e) => set('videoUrl', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... atau https://www.tiktok.com/@.../video/..."
                className="input-field w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Paste link langsung — otomatis terdeteksi platformnya.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ringkasan (Excerpt)</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                className="input-field w-full resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Konten Artikel</h2>
            <p className="text-xs text-gray-400">
              Toolbar untuk styling — atau klik ikon <code>&lt;/&gt;</code> untuk edit raw markdown langsung.
              Sisipkan gambar dengan <code>![alt](url)</code>.
            </p>
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
            <button type="submit" disabled={saving} className="bg-teal hover:bg-teal/90 disabled:opacity-50 text-navy font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Batal
            </button>
          </div>
        </form>
      </div>

      <style>{`.input-field { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; color: #1a202c; } .input-field:focus { border-color: #2dd4bf; box-shadow: 0 0 0 2px rgba(45,212,191,0.1); }`}</style>
    </AdminShell>
  )
}
