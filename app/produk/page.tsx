export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts } from '@/lib/server-data'
import { ProductGrid } from '@/components/produk/ProductGrid'

export const metadata: Metadata = {
  title: 'Produk — Ichibot',
  description: 'Solusi IoT & AI siap pakai dari Ichibot untuk efisiensi dan monitoring industri manufaktur.',
}

export default async function ProdukPage() {
  const productsData = await getAllProducts()
  return (
    <main className="bg-white">

      {/* Hero header */}
      <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Beranda
          </Link>

          <div className="mt-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.05]">
              Produk Siap Pakai
            </h1>
            <p className="text-ink/55 text-lg md:text-xl leading-relaxed mt-6">
              Produk kami dirancang untuk langsung bisa diimplementasikan di fasilitas produksi Anda — tanpa perlu membangun dari nol.
            </p>
          </div>
        </div>
      </section>

      {/* Product grid + category filter */}
      <section className="bg-off-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ProductGrid products={productsData} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative bg-brand rounded-3xl px-8 py-16 md:px-16 md:py-24 text-white text-center overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
                Tidak menemukan yang sesuai?
              </h2>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Kami juga menerima pengembangan solusi kustom yang dirancang khusus untuk kebutuhan spesifik pabrik dan industri Anda.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white hover:bg-white/95 text-brand font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[200px] text-center"
              >
                Mulai Konsultasi Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
