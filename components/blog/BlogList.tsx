'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { PostMeta } from '@/lib/blog'

interface BlogListProps {
  initialPosts: PostMeta[]
}

export function BlogList({ initialPosts }: BlogListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category') || 'All'

  const [searchQuery, setSearchQuery] = useState('')

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map((post) => post.category))
    return ['All', ...Array.from(cats).sort()]
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryParam === 'All' || post.category === categoryParam
      return matchesSearch && matchesCategory
    })
  }, [initialPosts, searchQuery, categoryParam])

  return (
    <div className="space-y-10">

      {/* Controls: Search & Categories */}
      <div className="flex flex-col gap-5">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ink/35">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-full py-3 pl-11 pr-5 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand/40 transition-colors text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                categoryParam === cat
                  ? 'bg-brand text-white'
                  : 'bg-white text-ink/65 border border-black/10 hover:text-ink hover:bg-black/5'
              }`}
            >
              {cat === 'All' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results meta */}
      {(searchQuery || categoryParam !== 'All') && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-ink/55">
            Menampilkan <span className="text-ink font-bold">{filteredPosts.length}</span> artikel
            {categoryParam !== 'All' && <span> di kategori <span className="text-brand font-semibold">{categoryParam}</span></span>}
            {searchQuery && <span> untuk &quot;<span className="text-brand font-semibold">{searchQuery}</span>&quot;</span>}
          </p>
          <button
            onClick={() => { setSearchQuery(''); handleCategoryChange('All') }}
            className="text-brand hover:text-brand-dark font-semibold transition-colors"
          >
            Hapus filter
          </button>
        </div>
      )}

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-24 text-center bg-off-white rounded-2xl">
          <p className="text-ink/55 font-medium">Artikel tidak ditemukan.</p>
          <p className="text-ink/40 text-sm mt-2">Coba gunakan kata kunci lain atau ubah kategori filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-black flex flex-col"
              style={{ minHeight: '440px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

              <div className="absolute top-6 left-6">
                <span className="text-white/85 text-xs font-medium">{post.category}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-white/70 text-xs mb-2">
                  {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight leading-tight line-clamp-2 mb-2">
                  {post.title}
                </h2>
                <p className="text-white/85 text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Baca selengkapnya
                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  )
}
