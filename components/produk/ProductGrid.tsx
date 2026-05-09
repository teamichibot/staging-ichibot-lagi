'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { ProductData } from '@/lib/products-data'

export function ProductGrid({ products }: { products: ProductData[] }) {
  const searchParams = useSearchParams()
  const categories = useMemo(() => {
    const seen = new Set<string>()
    products.forEach((p) => {
      if (p.category && p.category.trim()) seen.add(p.category.trim())
    })
    return ['All', ...Array.from(seen)]
  }, [products])

  const [active, setActive] = useState('All')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && categories.includes(cat)) setActive(cat)
    else if (!cat) setActive('All')
  }, [searchParams, categories])

  const filtered = useMemo(() => {
    if (active === 'All') return products
    return products.filter((p) => (p.category || '').trim() === active)
  }, [products, active])

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                active === cat
                  ? 'bg-brand text-white'
                  : 'bg-white text-ink/65 border border-black/10 hover:text-ink hover:bg-black/5'
              }`}
            >
              {cat === 'All' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-24 text-center bg-white rounded-2xl">
          <p className="text-ink/55 font-medium">Belum ada produk di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {filtered.map((product) => (
            <Link
              key={product.slug}
              href={`/produk/${product.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-black"
              style={{ height: 'min(50vh, 480px)', minHeight: '380px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1800'}
                alt={product.title.id}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

              <div className="absolute top-8 left-8 md:top-10 md:left-12">
                <span className="text-white/85 text-sm font-medium">
                  {product.category || 'Produk'}
                </span>
              </div>

              <div className="absolute bottom-10 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-2 leading-tight truncate">
                  {product.title.id}
                </h2>
                <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-md line-clamp-2 mb-5">
                  {product.desc.id}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
