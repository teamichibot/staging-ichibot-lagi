'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '../AdminShell'

type Product = { slug: string; title: { id: string; en: string }; desc: { id: string; en: string }; image: string }

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((d) => { setProducts(d); setLoading(false) })
  }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`Hapus produk "${slug}"?`)) return
    setDeleting(slug)
    await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' })
    setProducts((p) => p.filter((x) => x.slug !== slug))
    setDeleting(null)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Produk</h1>
            <p className="text-ink/55 text-sm mt-1">{products.length} produk tersimpan.</p>
          </div>
          <Link
            href="/admin/produk/new"
            className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Produk
          </Link>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="divide-y divide-black/8">
              {products.map((p) => (
                <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title.id} className="w-14 h-10 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{p.title.id}</p>
                    <p className="text-ink/55 text-xs truncate mt-0.5">{p.desc.id}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/produk/${p.slug}`}
                      className="text-sm font-medium text-ink/65 hover:text-brand transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.slug)}
                      disabled={deleting === p.slug}
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
