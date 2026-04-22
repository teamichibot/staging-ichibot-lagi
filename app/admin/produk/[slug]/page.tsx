'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { AdminShell } from '../../AdminShell'

type Bilingual = { id: string; en: string }
type FeatureItem = { title: Bilingual; desc: Bilingual }
type SpecItem = { label: Bilingual; value: Bilingual }

type ProductForm = {
  slug: string
  image: string
  title: Bilingual
  desc: Bilingual
  longDesc: Bilingual
  highlights: Bilingual[]
  features: FeatureItem[]
  specs: SpecItem[]
}

const empty: ProductForm = {
  slug: '', image: '',
  title: { id: '', en: '' },
  desc: { id: '', en: '' },
  longDesc: { id: '', en: '' },
  highlights: [{ id: '', en: '' }],
  features: [{ title: { id: '', en: '' }, desc: { id: '', en: '' } }],
  specs: [{ label: { id: '', en: '' }, value: { id: '', en: '' } }],
}

function BiInput({ label, value, onChange }: { label: string; value: Bilingual; onChange: (v: Bilingual) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div><span className="text-xs text-gray-400 mb-1 block">Indonesia</span>
          <input value={value.id} onChange={(e) => onChange({ ...value, id: e.target.value })} className="input-field w-full" /></div>
        <div><span className="text-xs text-gray-400 mb-1 block">English</span>
          <input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} className="input-field w-full" /></div>
      </div>
    </div>
  )
}

function BiTextarea({ label, value, onChange }: { label: string; value: Bilingual; onChange: (v: Bilingual) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        <div><span className="text-xs text-gray-400 mb-1 block">Indonesia</span>
          <textarea rows={3} value={value.id} onChange={(e) => onChange({ ...value, id: e.target.value })} className="input-field w-full resize-none" /></div>
        <div><span className="text-xs text-gray-400 mb-1 block">English</span>
          <textarea rows={3} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} className="input-field w-full resize-none" /></div>
      </div>
    </div>
  )
}

function ArrayBiField({ label, items, onChange }: { label: string; items: Bilingual[]; onChange: (v: Bilingual[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button type="button" onClick={() => onChange([...items, { id: '', en: '' }])} className="text-xs text-teal hover:underline">+ Tambah</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input value={item.id} placeholder="ID" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], id: e.target.value }; onChange(n) }} className="input-field w-full" />
              <input value={item.en} placeholder="EN" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], en: e.target.value }; onChange(n) }} className="input-field w-full" />
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArrayFeatureField({ items, onChange }: { items: FeatureItem[]; onChange: (v: FeatureItem[]) => void }) {
  const emptyItem: FeatureItem = { title: { id: '', en: '' }, desc: { id: '', en: '' } }
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Fitur Utama</label>
        <button type="button" onClick={() => onChange([...items, emptyItem])} className="text-xs text-teal hover:underline">+ Tambah</button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <p className="text-xs font-semibold text-gray-500 mb-3">Fitur {i + 1}</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input value={item.title.id} placeholder="Judul (ID)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: { ...n[i].title, id: e.target.value } }; onChange(n) }} className="input-field w-full" />
                <input value={item.title.en} placeholder="Title (EN)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], title: { ...n[i].title, en: e.target.value } }; onChange(n) }} className="input-field w-full" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <textarea rows={2} value={item.desc.id} placeholder="Deskripsi (ID)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], desc: { ...n[i].desc, id: e.target.value } }; onChange(n) }} className="input-field w-full resize-none" />
                <textarea rows={2} value={item.desc.en} placeholder="Description (EN)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], desc: { ...n[i].desc, en: e.target.value } }; onChange(n) }} className="input-field w-full resize-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArraySpecField({ items, onChange }: { items: SpecItem[]; onChange: (v: SpecItem[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Spesifikasi Teknis</label>
        <button type="button" onClick={() => onChange([...items, { label: { id: '', en: '' }, value: { id: '', en: '' } }])} className="text-xs text-teal hover:underline">+ Tambah</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input value={item.label.id} placeholder="Label (ID)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], label: { ...n[i].label, id: e.target.value } }; onChange(n) }} className="input-field w-full" />
              <input value={item.value.id} placeholder="Nilai (ID)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], value: { ...n[i].value, id: e.target.value } }; onChange(n) }} className="input-field w-full" />
              <input value={item.label.en} placeholder="Label (EN)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], label: { ...n[i].label, en: e.target.value } }; onChange(n) }} className="input-field w-full" />
              <input value={item.value.en} placeholder="Value (EN)" onChange={(e) => { const n = [...items]; n[i] = { ...n[i], value: { ...n[i].value, en: e.target.value } }; onChange(n) }} className="input-field w-full" />
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminProdukEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const isNew = slug === 'new'
  const router = useRouter()
  const [form, setForm] = useState<ProductForm>(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [manuallyEdited, setManuallyEdited] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (isNew) return
    fetch(`/api/admin/products/${slug}`)
      .then((r) => r.json())
      .then((d) => { setForm(d); setLoading(false) })
  }, [slug, isNew])

  const translate = async (text: string, fieldPath: string) => {
    if (!text || manuallyEdited[fieldPath]) return
    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      if (data.text) {
        setForm(prev => {
          if (manuallyEdited[fieldPath]) return prev
          const next = { ...prev }
          if (fieldPath === 'title') next.title = { ...next.title, en: data.text }
          if (fieldPath === 'desc') next.desc = { ...next.desc, en: data.text }
          if (fieldPath === 'longDesc') next.longDesc = { ...next.longDesc, en: data.text }
          return next
        })
      }
    } catch (e) {
      console.error('Auto-translate error:', e)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.title.id) translate(form.title.id, 'title')
    }, 1500)
    return () => clearTimeout(timer)
  }, [form.title.id])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.desc.id) translate(form.desc.id, 'desc')
    }, 1500)
    return () => clearTimeout(timer)
  }, [form.desc.id])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.longDesc.id) translate(form.longDesc.id, 'longDesc')
    }, 2000)
    return () => clearTimeout(timer)
  }, [form.longDesc.id])

  function set<K extends keyof ProductForm>(key: K, val: ProductForm[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    const url = isNew ? '/api/admin/products' : `/api/admin/products/${slug}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      router.push('/admin/produk')
    } else {
      const d = await res.json()
      setError(d.error ?? 'Terjadi kesalahan')
    }
  }

  const exportJSON = () => {
    const data = { ...form, _ichibot_type: 'product' }
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('Data berhasil disalin ke clipboard! Silakan berikan ke AI.')
  }

  const importJSON = () => {
    const input = window.prompt('Tempelkan JSON dari AI ke sini:')
    if (!input) return
    try {
      const data = JSON.parse(input)
      if (data._ichibot_type !== 'product') {
        alert('Data JSON tidak valid untuk halaman Produk.')
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
            <button onClick={() => router.push('/admin/produk')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Tambah Produk' : 'Edit Produk'}</h1>
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
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Informasi Dasar</h2>
              <span className="text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded font-bold">Auto-Translate Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar</label>
                <input value={form.image} onChange={(e) => set('image', e.target.value)} className="input-field w-full" />
              </div>
            </div>
            
            <BiInput 
              label="Judul" 
              value={form.title} 
              onChange={(v) => {
                if (v.en !== form.title.en && v.id === form.title.id) setManuallyEdited(m => ({ ...m, title: true }))
                
                setForm(f => {
                  const next = { ...f, title: v }
                  if (isNew && v.id && v.id !== f.title.id) {
                    next.slug = v.id.toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-+|-+$/g, '')
                  }
                  return next
                })
              }} 
            />
            
            <BiTextarea 
              label="Deskripsi Singkat" 
              value={form.desc} 
              onChange={(v) => {
                if (v.en !== form.desc.en && v.id === form.desc.id) setManuallyEdited(m => ({ ...m, desc: true }))
                set('desc', v)
              }} 
            />
            
            <BiTextarea 
              label="Deskripsi Panjang" 
              value={form.longDesc} 
              onChange={(v) => {
                if (v.en !== form.longDesc.en && v.id === form.longDesc.id) setManuallyEdited(m => ({ ...m, longDesc: true }))
                set('longDesc', v)
              }} 
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <ArrayBiField label="Highlights" items={form.highlights} onChange={(v) => set('highlights', v)} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <ArrayFeatureField items={form.features} onChange={(v) => set('features', v)} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <ArraySpecField items={form.specs} onChange={(v) => set('specs', v)} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-teal hover:bg-teal/90 disabled:opacity-50 text-navy font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={() => router.push('/admin/produk')} className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Batal
            </button>
          </div>
        </form>
      </div>

      <style>{`.input-field { border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; } .input-field:focus { border-color: #2dd4bf; box-shadow: 0 0 0 2px rgba(45,212,191,0.1); }`}</style>
    </AdminShell>
  )
}
