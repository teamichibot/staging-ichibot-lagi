'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '../AdminShell'

type PostMeta = { slug: string; title: string; date: string; category: string; excerpt: string; image: string }

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((d) => { setPosts(d); setLoading(false) })
  }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`Hapus post "${slug}"?`)) return
    setDeleting(slug)
    await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' })
    setPosts((p) => p.filter((x) => x.slug !== slug))
    setDeleting(null)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Blog</h1>
            <p className="text-ink/55 text-sm mt-1">{posts.length} artikel tersimpan.</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Artikel
          </Link>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="divide-y divide-black/8">
              {posts.length === 0 && (
                <p className="px-6 py-10 text-center text-ink/40 text-sm">Belum ada artikel.</p>
              )}
              {posts.map((p) => (
                <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title} className="w-16 h-11 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink truncate">{p.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {p.category && (
                        <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">{p.category}</span>
                      )}
                      {p.date && <span className="text-xs text-ink/40">{p.date}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/blog/${p.slug}`}
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
