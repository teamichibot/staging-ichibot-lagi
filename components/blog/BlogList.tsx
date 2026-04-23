'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { PostMeta } from '@/lib/blog'

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  AI: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Case Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Tutorial: 'bg-green-500/10 text-green-400 border-green-500/20',
}

interface BlogListProps {
  initialPosts: PostMeta[]
}

export function BlogList({ initialPosts }: BlogListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category') || 'All'

  const [searchQuery, setSearchQuery] = useState('')

  // Update URL when category changes
  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map((post) => post.category))
    return ['All', ...Array.from(cats).sort()]
  }, [initialPosts])

  // Filter posts logic
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
    <div className="space-y-12">
      {/* Controls: Search & Categories */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
        {/* Search Input */}
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-teal transition-colors">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal/50 transition-all glass-3d-premium"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="relative w-full md:w-auto min-w-[200px] group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-teal">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            value={categoryParam}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal/50 transition-all glass-3d-premium cursor-pointer font-bold text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-navy text-white">
                {cat === 'All' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>


      {/* Results Count & Clear Filter */}
      {(searchQuery || categoryParam !== 'All') && (
        <div className="flex items-center justify-between text-sm animate-fade-in">
          <p className="text-slate-400">
            Menampilkan <span className="text-white font-bold">{filteredPosts.length}</span> artikel
            {categoryParam !== 'All' && <span> di kategori <span className="text-teal">{categoryParam}</span></span>}
            {searchQuery && <span> untuk kata kunci &quot;<span className="text-teal">{searchQuery}</span>&quot;</span>}
          </p>
          <button 
            onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
            className="text-teal hover:text-teal-light font-bold flex items-center gap-1 transition-colors"
          >
            Hapus Filter
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>
      )}


      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-24 text-center glass-3d-premium rounded-3xl animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <p className="text-slate-400 text-lg font-medium">Artikel tidak ditemukan.</p>
          <p className="text-slate-500 text-sm mt-2">Coba gunakan kata kunci lain atau ubah kategori filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col glass-3d-premium overflow-hidden cursor-pointer animate-reveal opacity-0"
              style={{ 
                animationFillMode: 'forwards',
                animationDelay: `${(i % 9) * 50}ms` // Limit delay cycle for better UX
              }}
            >
              {/* Image */}
              {post.image ? (
                <div className="relative w-full h-56 overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/80 to-transparent pointer-events-none opacity-60" />
                </div>
              ) : (
                <div className="h-2 bg-gradient-to-r from-teal to-teal-light" />
              )}

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      categoryColors[post.category] ?? 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">
                    {new Date(post.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-4 leading-tight group-hover:text-teal transition-colors flex-1 decoration-teal/0 group-hover:decoration-teal/30 underline underline-offset-4 decoration-2">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-teal text-xs font-bold flex items-center gap-2 tracking-wider uppercase group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
