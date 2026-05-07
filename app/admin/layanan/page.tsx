'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '../AdminShell'

type Service = { slug: string; title: { id: string; en: string }; desc: { id: string; en: string }; image: string }

export default function AdminLayananPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/services')
      .then((r) => r.json())
      .then((d) => { setServices(d); setLoading(false) })
  }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`Hapus layanan "${slug}"?`)) return
    setDeleting(slug)
    await fetch(`/api/admin/services/${slug}`, { method: 'DELETE' })
    setServices((s) => s.filter((x) => x.slug !== slug))
    setDeleting(null)
  }

  async function persistOrder(list: Service[]) {
    setSavingOrder(true)
    setOrderSaved(false)
    try {
      await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list),
      })
      setOrderSaved(true)
      setTimeout(() => setOrderSaved(false), 1800)
    } finally {
      setSavingOrder(false)
    }
  }

  function reorder(from: number, to: number) {
    if (from === to) return
    setServices((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      persistOrder(next)
      return next
    })
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= services.length) return
    reorder(index, target)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">Layanan</h1>
            <p className="text-ink/55 text-sm mt-2">
              {services.length} layanan tersimpan.{' '}
              <span className="text-ink/45">Drag baris untuk mengubah urutan.</span>
              {savingOrder && <span className="ml-2 text-ink/55">Menyimpan…</span>}
              {orderSaved && <span className="ml-2 text-emerald-600 font-semibold">Tersimpan ✓</span>}
            </p>
          </div>
          <Link
            href="/admin/layanan/new"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-sm text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Tambah Layanan
          </Link>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="divide-y divide-black/8">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  draggable
                  onDragStart={(e) => {
                    setDragIndex(i)
                    e.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = 'move'
                    if (dragOverIndex !== i) setDragOverIndex(i)
                  }}
                  onDragLeave={() => setDragOverIndex((v) => (v === i ? null : v))}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i)
                    setDragIndex(null)
                    setDragOverIndex(null)
                  }}
                  onDragEnd={() => {
                    setDragIndex(null)
                    setDragOverIndex(null)
                  }}
                  className={`flex items-center gap-4 px-4 md:px-6 py-4 transition-colors ${
                    dragIndex === i ? 'opacity-40' : ''
                  } ${dragOverIndex === i && dragIndex !== null && dragIndex !== i ? 'bg-brand/5' : ''}`}
                >
                  {/* Drag handle */}
                  <span
                    className="cursor-grab active:cursor-grabbing text-ink/30 hover:text-ink/60 transition-colors shrink-0"
                    aria-label="Drag untuk mengubah urutan"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="6" r="1" fill="currentColor" />
                      <circle cx="9" cy="12" r="1" fill="currentColor" />
                      <circle cx="9" cy="18" r="1" fill="currentColor" />
                      <circle cx="15" cy="6" r="1" fill="currentColor" />
                      <circle cx="15" cy="12" r="1" fill="currentColor" />
                      <circle cx="15" cy="18" r="1" fill="currentColor" />
                    </svg>
                  </span>

                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.title.id} className="w-14 h-10 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{s.title.id}</p>
                    <p className="text-ink/55 text-xs truncate mt-0.5">{s.desc.id}</p>
                  </div>

                  {/* Up/Down arrows for touch */}
                  <div className="flex items-center gap-0.5 md:hidden shrink-0">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0 || savingOrder}
                      className="p-2 text-ink/40 hover:text-ink hover:bg-black/5 rounded-md disabled:opacity-30 transition-colors"
                      aria-label="Naikkan"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === services.length - 1 || savingOrder}
                      className="p-2 text-ink/40 hover:text-ink hover:bg-black/5 rounded-md disabled:opacity-30 transition-colors"
                      aria-label="Turunkan"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/layanan/${s.slug}`}
                      className="text-sm font-medium text-ink/65 hover:text-brand transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.slug)}
                      disabled={deleting === s.slug}
                      className="text-sm font-medium text-ink/40 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-40"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
