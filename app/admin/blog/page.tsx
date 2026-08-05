'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell } from '../AdminShell'
import { Pagination } from '@/components/Pagination'

type PostMeta = { slug: string; title: string; date: string; category: string; excerpt: string; image: string }

const PAGE_SIZE = 30

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((d) => { setPosts(d); setLoading(false) })
  }, [])

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedPosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

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
              {paginatedPosts.map((p) => (
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
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat"
                      aria-label={`Lihat artikel "${p.title}"`}
                      className="text-ink/65 hover:text-brand transition-colors p-2 rounded-lg hover:bg-black/5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </Link>
                    <Link
                      href={`/admin/blog/${p.slug}`}
                      title="Edit"
                      aria-label={`Edit artikel "${p.title}"`}
                      className="text-ink/65 hover:text-brand transition-colors p-2 rounded-lg hover:bg-black/5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(p.slug)}
                      disabled={deleting === p.slug}
                      title="Hapus"
                      aria-label={`Hapus artikel "${p.title}"`}
                      className="text-ink/40 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 disabled:opacity-40"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </AdminShell>
  )
}
