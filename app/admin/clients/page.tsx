'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '../AdminShell'

type Client = { id: string; name: string; logo: string }
type ClientsData = { industry: Client[]; academic: Client[] }

function ClientList({
  title,
  clients,
  onChange,
}: {
  title: string
  clients: Client[]
  onChange: (updated: Client[]) => void
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  function update(i: number, field: keyof Client, value: string) {
    const next = clients.map((c, idx) => (idx === i ? { ...c, [field]: value } : c))
    onChange(next)
  }

  function add() {
    onChange([...clients, { id: Date.now().toString(), name: '', logo: '' }])
  }

  function remove(i: number) {
    onChange(clients.filter((_, idx) => idx !== i))
  }

  function reorder(from: number, to: number) {
    if (from === to) return
    const next = [...clients]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    onChange(next)
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= clients.length) return
    reorder(index, target)
  }

  return (
    <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
      <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-ink">{title}</h2>
          {clients.length > 1 && (
            <p className="text-ink/45 text-xs mt-0.5">Drag baris untuk mengubah urutan.</p>
          )}
        </div>
        <button
          onClick={add}
          className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah
        </button>
      </div>

      <div className="divide-y divide-black/8">
        {clients.map((client, i) => (
          <div
            key={client.id}
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
            className={`px-4 md:px-6 py-4 flex items-center gap-3 transition-colors ${
              dragIndex === i ? 'opacity-40' : ''
            } ${dragOverIndex === i && dragIndex !== null && dragIndex !== i ? 'bg-brand/5' : ''}`}
          >
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

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={client.name}
                onChange={(e) => update(i, 'name', e.target.value)}
                placeholder="Nama klien"
                className="input-field"
              />
              <input
                value={client.logo}
                onChange={(e) => update(i, 'logo', e.target.value)}
                placeholder="URL logo (opsional)"
                className="input-field"
              />
            </div>
            {client.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={client.logo} alt={client.name} className="w-10 h-10 object-contain rounded border border-black/8 bg-off-white shrink-0" />
            )}

            <div className="flex items-center gap-0.5 md:hidden shrink-0">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="p-2 text-ink/40 hover:text-ink hover:bg-black/5 rounded-md disabled:opacity-30 transition-colors"
                aria-label="Naikkan"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === clients.length - 1}
                className="p-2 text-ink/40 hover:text-ink hover:bg-black/5 rounded-md disabled:opacity-30 transition-colors"
                aria-label="Turunkan"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => remove(i)}
              className="text-ink/40 hover:text-red-500 transition-colors shrink-0"
              aria-label="Hapus"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="px-6 py-8 text-center text-ink/40 text-sm">Belum ada klien. Klik Tambah.</p>
        )}
      </div>
    </div>
  )
}

export default function AdminClientsPage() {
  const [data, setData] = useState<ClientsData>({ industry: [], academic: [] })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/clients')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/clients', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">Logo Klien</h1>
            <p className="text-ink/55 text-sm mt-2">Kelola daftar klien dan mitra yang ditampilkan di landing page.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-sm text-sm transition-colors"
          >
            {saving ? 'Menyimpan...' : saved ? '✓ Tersimpan' : 'Simpan Perubahan'}
          </button>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="space-y-6">
            <ClientList
              title="Klien Industri"
              clients={data.industry}
              onChange={(v) => setData((d) => ({ ...d, industry: v }))}
            />
            <ClientList
              title="Mitra Akademik"
              clients={data.academic}
              onChange={(v) => setData((d) => ({ ...d, academic: v }))}
            />
          </div>
        )}
      </div>

      <style>{`.input-field { width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; transition: border-color 0.15s; } .input-field:focus { border-color: #003459; }`}</style>
    </AdminShell>
  )
}
