'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '../AdminShell'
import type { TestimonialData, TestimonialTone } from '@/lib/homepage-data'

const inputClass =
  'w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none'
const labelClass = 'block text-[10px] font-bold text-ink/40 uppercase mb-1'

/** Warna kartu di halaman utama — swatch-nya meniru warna asli kartunya. */
const toneOptions: { value: TestimonialTone; label: string; swatch: string }[] = [
  { value: 'ice', label: 'Ice', swatch: 'bg-gradient-to-br from-[#EEF3FB] to-[#D7E4F4]' },
  { value: 'lime', label: 'Lime', swatch: 'bg-[#DCEF5E]' },
  { value: 'sky', label: 'Sky', swatch: 'bg-gradient-to-br from-[#CFE8F7] to-[#A9D4EE]' },
  { value: 'sand', label: 'Sand', swatch: 'bg-gradient-to-br from-[#F4EADA] to-[#EADCC4]' },
]

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<TestimonialData | null>(null)

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((r) => r.json())
      .then((d) => {
        setItems(Array.isArray(d) ? d : [])
        setLoading(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    const res = await fetch('/api/admin/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    if (res.ok) alert('Berhasil disimpan!')
    setSaving(false)
  }

  function startEdit(index: number, source: TestimonialData[] = items) {
    setEditingIndex(index)
    setEditForm({ ...source[index] })
  }

  function saveEdit() {
    if (editingIndex === null || !editForm) return
    const next = [...items]
    next[editingIndex] = editForm
    setItems(next)
    setEditingIndex(null)
    setEditForm(null)
  }

  function addItem() {
    const newItem: TestimonialData = {
      id: String(Date.now()),
      quote: { id: 'Tulis kutipan testimoni di sini...', en: 'Write the testimonial quote here...' },
      author: 'Nama Narasumber',
      role: { id: 'Jabatan', en: 'Job Title' },
      company: 'Nama Perusahaan',
      logo: '',
      color: 'ice',
      placeholder: true,
    }
    const next = [...items, newItem]
    setItems(next)
    startEdit(next.length - 1, next)
  }

  function removeItem(index: number) {
    if (!confirm('Hapus testimoni ini?')) return
    setItems(items.filter((_, i) => i !== index))
    setEditingIndex(null)
  }

  function moveItem(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return
    const next = [...items]
    const temp = next[index]
    next[index] = next[targetIndex]
    next[targetIndex] = temp
    setItems(next)
    setEditingIndex(null)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Testimoni Klien</h1>
            <p className="text-ink/55 text-sm mt-1">Atur testimoni yang muncul di halaman utama.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-white hover:bg-off-white text-ink/85 border border-black/8 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Tambah Testimoni
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan Semua'}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white rounded-2xl border border-black/8 p-5">
                {editingIndex === i && editForm ? (
                  <div className="space-y-4 bg-off-white p-4 rounded-xl border border-black/8">
                    <div>
                      <label className={labelClass}>Kutipan (Indonesia)</label>
                      <textarea
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={editForm.quote.id}
                        onChange={(e) => setEditForm({ ...editForm, quote: { ...editForm.quote, id: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Kutipan (English)</label>
                      <textarea
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={editForm.quote.en}
                        onChange={(e) => setEditForm({ ...editForm, quote: { ...editForm.quote, en: e.target.value } })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nama Narasumber</label>
                        <input
                          className={inputClass}
                          value={editForm.author}
                          onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Perusahaan</label>
                        <input
                          className={inputClass}
                          value={editForm.company}
                          onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Jabatan (Indonesia)</label>
                        <input
                          className={inputClass}
                          value={editForm.role.id}
                          onChange={(e) => setEditForm({ ...editForm, role: { ...editForm.role, id: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Jabatan (English)</label>
                        <input
                          className={inputClass}
                          value={editForm.role.en}
                          onChange={(e) => setEditForm({ ...editForm, role: { ...editForm.role, en: e.target.value } })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>URL Logo Perusahaan (opsional)</label>
                      <input
                        className={inputClass}
                        placeholder="https://... — kosongkan untuk memakai inisial"
                        value={editForm.logo}
                        onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Warna Kartu</label>
                      <div className="flex flex-wrap gap-2">
                        {toneOptions.map((tone) => {
                          const active = (editForm.color ?? 'ice') === tone.value
                          return (
                            <button
                              key={tone.value}
                              type="button"
                              onClick={() => setEditForm({ ...editForm, color: tone.value })}
                              aria-pressed={active}
                              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border text-sm transition-colors ${
                                active
                                  ? 'border-brand bg-white text-ink font-semibold'
                                  : 'border-black/8 bg-white text-ink/65 hover:text-ink'
                              }`}
                            >
                              <span className={`${tone.swatch} w-5 h-5 rounded-md border border-black/10`} />
                              {tone.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <label className="flex items-center gap-2.5 text-sm text-ink/75 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-brand"
                        checked={editForm.placeholder ?? false}
                        onChange={(e) => setEditForm({ ...editForm, placeholder: e.target.checked })}
                      />
                      Masih contoh — tampilkan badge &ldquo;Contoh&rdquo; di website
                    </label>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 text-sm font-medium text-ink/65 hover:bg-black/8 rounded-lg transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 text-sm font-bold bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-ink">{item.author}</h3>
                        {item.placeholder && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">
                            Contoh
                          </span>
                        )}
                      </div>
                      <p className="text-brand font-semibold text-xs uppercase mb-2">
                        {item.role.id} · {item.company}
                      </p>
                      <p className="text-ink/55 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                        &ldquo;{item.quote.id}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => moveItem(i, 'up')} className="p-2 text-ink/40 hover:text-ink transition-colors">↑</button>
                      <button onClick={() => moveItem(i, 'down')} className="p-2 text-ink/40 hover:text-ink transition-colors">↓</button>
                      <div className="w-px h-4 bg-black/8 mx-1" />
                      <button
                        onClick={() => startEdit(i)}
                        className="px-3 py-1.5 text-sm font-medium text-ink/65 hover:text-brand hover:bg-black/5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeItem(i)}
                        className="px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="bg-off-white border-2 border-dashed border-black/8 rounded-2xl p-12 text-center">
            <p className="text-ink/55 mb-4">Belum ada testimoni.</p>
            <button onClick={addItem} className="text-brand font-bold hover:underline">Tambah testimoni pertama</button>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
