export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts } from '@/lib/server-data'

export const metadata: Metadata = {
  title: 'Produk — Ichibot',
  description: 'Solusi IoT & AI siap pakai dari Ichibot untuk efisiensi dan monitoring industri manufaktur.',
}

const categoryColors: Record<string, string> = {
  'Energy': 'bg-amber-50 text-amber-700',
  'Monitoring': 'bg-blue-50 text-blue-700',
  'AI': 'bg-purple-50 text-purple-700',
  'Platform': 'bg-teal-50 text-teal-700',
}

const productCategories = ['Energy', 'Monitoring', 'AI', 'Platform']

export default async function ProdukPage() {
  const productsData = await getAllProducts()
  return (
    <div className="pt-24 pb-24 md:pt-32 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">Produk</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2 mb-3">
            Solusi Siap Pakai
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Produk kami dirancang untuk langsung bisa diimplementasikan di fasilitas produksi Anda — tanpa perlu membangun dari nol.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productsData.map((product, i) => (
            <Link
              key={product.slug}
              href={`/produk/${product.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-border hover:border-teal/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden bg-navy/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title.id}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[productCategories[i]] ?? 'bg-gray-100 text-gray-600'}`}>
                  {productCategories[i]}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="font-display text-xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                  {product.title.id}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {product.desc.id}
                </p>

                {/* Highlights preview */}
                <ul className="space-y-2 mb-6">
                  {product.highlights.slice(0, 3).map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-navy/70">
                      <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {h.id}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/60">
                  <span className="inline-flex items-center text-sm font-bold text-navy group-hover:text-teal transition-colors">
                    Pelajari Lebih Lanjut
                    <svg className="w-4 h-4 ml-1.5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-navy p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Tidak menemukan yang sesuai?
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
            Kami juga menerima pengembangan solusi kustom yang dirancang khusus untuk kebutuhan spesifik pabrik Anda.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            Konsultasi Gratis
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
