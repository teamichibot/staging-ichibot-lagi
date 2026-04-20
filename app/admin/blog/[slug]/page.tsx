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

const CATEGORIES = ['Case Study', 'Insight', 'Tutorial', 'News']

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

  if (loading) return <AdminShell><div className="p-8 text-gray-500 text-sm">Memuat data...</div></AdminShell>

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/admin/blog')} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Tambah Artikel' : 'Edit Artikel'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Metadata</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
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
                onChange={(e) => set('title', e.target.value)}
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
            <button type="submit" disabled={saving} className="bg-teal hover:bg-teal/90 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Batal
            </button>
          </div>
        </form>
      </div>

      <style>{`.input-field { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; } .input-field:focus { border-color: #2dd4bf; box-shadow: 0 0 0 2px rgba(45,212,191,0.1); }`}</style>
    </AdminShell>
  )
}
