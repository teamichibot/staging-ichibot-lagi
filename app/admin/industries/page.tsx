'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '../AdminShell'
import { industryIcons } from '@/components/home/Industries'
import type { IndustryData } from '@/lib/homepage-data'

const inputClass =
  'w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none'
const labelClass = 'block text-[10px] font-bold text-ink/40 uppercase mb-1'

const iconKeys = Object.keys(industryIcons)

export default function AdminIndustriesPage() {
  const [items, setItems] = useState<IndustryData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<IndustryData | null>(null)

  useEffect(() => {
    fetch('/api/admin/industries')
      .then((r) => r.json())
      .then((d) => {
        setItems(Array.isArray(d) ? d : [])
        setLoading(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    const res = await fetch('/api/admin/industries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
    if (res.ok) alert('Berhasil disimpan!')
    setSaving(false)
  }

  function startEdit(index: number, source: IndustryData[] = items) {
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
    const newItem: IndustryData = {
      id: String(Date.now()),
      icon: 'factory',
      name: { id: 'Nama Kategori', en: 'Category Name' },
      desc: { id: 'Deskripsi singkat kategori ini...', en: 'A short description of this category...' },
    }
    const next = [...items, newItem]
    setItems(next)
    startEdit(next.length - 1, next)
  }

  function removeItem(index: number) {
    if (!confirm('Hapus kategori ini?')) return
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
            <h1 className="text-2xl font-bold text-ink">Kategori Bisnis</h1>
            <p className="text-ink/55 text-sm mt-1">Atur sektor industri yang ditampilkan di halaman utama.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-white hover:bg-off-white text-ink/85 border border-black/8 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Tambah Kategori
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
                      <label className={labelClass}>Ikon</label>
                      <div className="flex flex-wrap gap-2">
                        {iconKeys.map((key) => (
                          <button
                            key={key}
                            type="button"
                            title={key}
                            onClick={() => setEditForm({ ...editForm, icon: key })}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors ${
                              editForm.icon === key
                                ? 'bg-brand text-white border-brand'
                                : 'bg-white text-ink/55 border-black/8 hover:border-brand/40 hover:text-brand'
                            }`}
                          >
                            {industryIcons[key]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nama (Indonesia)</label>
                        <input
                          className={inputClass}
                          value={editForm.name.id}
                          onChange={(e) => setEditForm({ ...editForm, name: { ...editForm.name, id: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Nama (English)</label>
                        <input
                          className={inputClass}
                          value={editForm.name.en}
                          onChange={(e) => setEditForm({ ...editForm, name: { ...editForm.name, en: e.target.value } })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Deskripsi (Indonesia)</label>
                      <textarea
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={editForm.desc.id}
                        onChange={(e) => setEditForm({ ...editForm, desc: { ...editForm.desc, id: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Deskripsi (English)</label>
                      <textarea
                        rows={3}
                        className={`${inputClass} resize-none`}
                        value={editForm.desc.en}
                        onChange={(e) => setEditForm({ ...editForm, desc: { ...editForm.desc, en: e.target.value } })}
                      />
                    </div>
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
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                        {industryIcons[item.icon] ?? industryIcons.factory}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-ink">{item.name.id}</h3>
                        <p className="text-ink/40 text-xs mb-2">{item.name.en}</p>
                        <p className="text-ink/55 text-sm leading-relaxed line-clamp-2 max-w-2xl">{item.desc.id}</p>
                      </div>
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
            <p className="text-ink/55 mb-4">Belum ada kategori bisnis.</p>
            <button onClick={addItem} className="text-brand font-bold hover:underline">Tambah kategori pertama</button>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
