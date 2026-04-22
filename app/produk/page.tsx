export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts } from '@/lib/server-data'

export const metadata: Metadata = {
  title: 'Produk — Ichibot',
  description: 'Solusi IoT & AI siap pakai dari Ichibot untuk efisiensi dan monitoring industri manufaktur.',
}

const categoryColors: Record<string, string> = {
  'Energy': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Monitoring': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'AI': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Platform': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
}

const productCategories = ['Energy', 'Monitoring', 'AI', 'Platform']

export default async function ProdukPage() {
  const productsData = await getAllProducts()
  return (
    <div className="pt-24 pb-24 md:pt-32 bg-[#050A14] min-h-screen relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="text-teal text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Produk Unggulan</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-6 tracking-tight">
            Solusi Siap Pakai
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl opacity-80">
            Produk kami dirancang untuk langsung bisa diimplementasikan di fasilitas produksi Anda tanpa perlu membangun dari nol.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {productsData.map((product, i) => {
            const category = productCategories[i % productCategories.length];
            return (
              <Link
                key={product.slug}
                href={`/produk/${product.slug}`}
                className="group flex flex-col glass-3d-premium overflow-hidden animate-reveal opacity-0"
                style={{ 
                  animationFillMode: 'forwards', 
                  animationDelay: `${(i * 100) + 200}ms` 
                }}
              >
                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title.id}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <span className={`absolute top-6 left-6 text-[10px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-md shadow-xl ${categoryColors[category] ?? 'bg-white/5 text-slate-400 border-white/10'}`}>
                    {category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col flex-grow">
                  <h2 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-teal transition-colors tracking-tight">
                    {product.title.id}
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow opacity-90 group-hover:opacity-100 transition-opacity">
                    {product.desc.id}
                  </p>

                  {/* Highlights preview */}
                  <ul className="grid grid-cols-1 gap-3 mb-10 pt-8 border-t border-white/5">
                    {product.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="flex items-start gap-4 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="opacity-80 group-hover:opacity-100 transition-opacity">{h.id}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <span className="inline-flex items-center text-xs font-bold text-teal tracking-widest uppercase group-hover:gap-3 transition-all">
                      Pelajari Lebih Lanjut
                      <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-[3rem] glass-3d-premium p-12 md:p-16 text-center animate-reveal opacity-0 shadow-2xl relative overflow-hidden" 
             style={{ animationFillMode: 'forwards', animationDelay: '600ms' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Tidak menemukan yang sesuai?
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Kami juga menerima pengembangan solusi kustom yang dirancang khusus untuk kebutuhan spesifik pabrik dan industri Anda.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-navy font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:-translate-y-1 text-base group/cta"
          >
            Mulai Konsultasi Gratis
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
