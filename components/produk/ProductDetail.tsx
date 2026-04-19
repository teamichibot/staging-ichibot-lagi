'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import type { ProductData } from '@/lib/products-data'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function ProductDetail({ product }: { product: ProductData }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(
    lang === 'id'
      ? `Halo Ichibot, saya tertarik dengan produk ${product.title.id}.`
      : `Hello Ichibot, I am interested in your ${product.title.en} product.`
  )

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-teal/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {lang === 'id' ? 'Kembali ke Produk' : 'Back to Products'}
            </Link>
          </div>

          <span className="block text-teal text-xs font-semibold uppercase tracking-widest mb-4">
            {lang === 'id' ? 'Produk' : 'Product'}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {tx(product.title)}
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
            {tx(product.longDesc)}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              {tx(t.nav.cta)}
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.25a.75.75 0 00.918.919l5.444-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.772-.509-5.356-1.397l-.383-.219-3.981 1.076 1.075-3.926-.237-.394A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              {lang === 'id' ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 mb-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={tx(product.title)}
          className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Highlights */}
        <section className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-10">
            {lang === 'id' ? 'Keunggulan Produk' : 'Product Highlights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-off-white border border-border hover:border-teal/30 transition-colors">
                <div className="flex-none w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-navy/80 text-sm leading-relaxed pt-1">{tx(h)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-10">
            {lang === 'id' ? 'Fitur Utama' : 'Key Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, i) => (
              <div key={i} className="p-7 rounded-2xl border border-border hover:border-teal/30 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-navy mb-2">{tx(feature.title)}</h3>
                <p className="text-muted text-sm leading-relaxed">{tx(feature.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specs */}
        <section className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-10">
            {lang === 'id' ? 'Spesifikasi Teknis' : 'Technical Specifications'}
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-off-white' : 'bg-white'}`}
              >
                <span className="text-muted text-sm font-medium sm:w-48 shrink-0">{tx(spec.label)}</span>
                <span className="text-navy text-sm font-semibold">{tx(spec.value)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-navy p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'id' ? 'Siap Mencoba Produk Ini?' : 'Ready to Try This Product?'}
          </h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
            {lang === 'id'
              ? 'Kami siap mendemonstrasikan produk ini di fasilitas Anda. Hubungi kami untuk jadwal demo gratis.'
              : 'We are ready to demonstrate this product at your facility. Contact us to schedule a free demo.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              {tx(t.nav.cta)}
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              {lang === 'id' ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
