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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <button
          onClick={add}
          className="flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal/80 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {clients.map((client, i) => (
          <div key={client.id} className="px-6 py-4 flex items-center gap-3">
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
              <img src={client.logo} alt={client.name} className="w-10 h-10 object-contain rounded border border-gray-200 bg-gray-50 shrink-0" />
            )}
            <button
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="px-6 py-8 text-center text-gray-400 text-sm">Belum ada klien. Klik Tambah.</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Logo Klien</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola daftar klien dan mitra yang ditampilkan di landing page.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-teal hover:bg-teal/90 disabled:opacity-50 text-navy font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            {saving ? 'Menyimpan...' : saved ? '✓ Tersimpan' : 'Simpan Perubahan'}
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Memuat data...</p>
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

      <style>{`.input-field { width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; transition: border-color 0.15s; } .input-field:focus { border-color: #2dd4bf; }`}</style>
    </AdminShell>
  )
}
