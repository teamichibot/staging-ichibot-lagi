'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '../AdminShell'

type Service = { slug: string; title: { id: string; en: string }; desc: { id: string; en: string }; image: string }

export default function AdminLayananPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

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

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Layanan</h1>
            <p className="text-gray-500 text-sm mt-1">{services.length} layanan tersimpan.</p>
          </div>
          <Link
            href="/admin/layanan/new"
            className="flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Layanan
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Memuat data...</p>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {services.map((s) => (
                <div key={s.slug} className="flex items-center gap-4 px-6 py-4">
                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.title.id} className="w-14 h-10 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{s.title.id}</p>
                    <p className="text-gray-500 text-xs truncate mt-0.5">{s.desc.id}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/layanan/${s.slug}`}
                      className="text-sm font-medium text-gray-600 hover:text-teal transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.slug)}
                      disabled={deleting === s.slug}
                      className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-40"
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
