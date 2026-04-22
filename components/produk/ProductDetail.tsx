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
    <main className="min-h-screen bg-[#050A14] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-navy/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero */}
      <section className="relative bg-[#050A14] overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

        <div className="relative max-w-4xl mx-auto px-6 reveal">
          <div className="mb-10">
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal text-sm font-bold transition-all group/back"
            >
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {lang === 'id' ? 'Kembali ke Produk' : 'Back to Products'}
            </Link>
          </div>

          <span className="block text-teal text-xs font-bold uppercase tracking-[0.2em] mb-6">
            {lang === 'id' ? 'Produk Unggulan' : 'Featured Product'}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            {tx(product.title)}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl opacity-90">
            {tx(product.longDesc)}
          </p>

          <div className="flex flex-wrap gap-5 mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-navy font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:-translate-y-1 text-base group/cta"
            >
              {tx(t.nav.cta)}
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-10 py-5 rounded-2xl transition-all text-base backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.25a.75.75 0 00.918.919l5.444-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.772-.509-5.356-1.397l-.383-.219-3.981 1.076 1.075-3.926-.237-.394A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
               WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 mb-24 relative z-20 reveal" style={{ animationDelay: '200ms' }}>
        <div className="rounded-[2.5rem] overflow-hidden glass-3d-premium shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={tx(product.title)}
            className="w-full h-64 md:h-[450px] object-cover transform hover:scale-105 transition-transform duration-1000"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32 relative z-10">
        {/* Highlights */}
        <section className="mb-24 reveal" style={{ animationDelay: '300ms' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            {lang === 'id' ? 'Keunggulan Produk' : 'Product Highlights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-6 p-7 rounded-[2rem] glass-3d-premium group hover:border-teal/30 transition-all duration-500">
                <div className="flex-none w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-300 text-base leading-relaxed pt-1 opacity-90">{tx(h)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-24 reveal" style={{ animationDelay: '400ms' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            {lang === 'id' ? 'Fitur Utama' : 'Key Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.features.map((feature, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] glass-3d-premium group hover:border-teal/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-3xl pointer-events-none group-hover:bg-teal/10 transition-colors" />
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4 tracking-tight">{tx(feature.title)}</h3>
                <p className="text-slate-400 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{tx(feature.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specs */}
        <section className="mb-24 reveal" style={{ animationDelay: '500ms' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            {lang === 'id' ? 'Spesifikasi Teknis' : 'Technical Specifications'}
          </h2>
          <div className="rounded-[2.5rem] glass-3d-premium overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10 px-10 py-6 ${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} border-b border-white/5 last:border-0`}
              >
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider sm:w-64 shrink-0">{tx(spec.label)}</span>
                <span className="text-white text-base font-semibold tracking-wide">{tx(spec.value)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[3rem] glass-3d-premium p-12 md:p-16 text-center reveal shadow-2xl" style={{ animationDelay: '600ms' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-teal/20 rounded-full blur-2xl pointer-events-none" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {lang === 'id' ? 'Siap Mencoba Produk Ini?' : 'Ready to Try This Product?'}
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            {lang === 'id'
              ? 'Kami siap mendemonstrasikan produk ini di fasilitas Anda. Hubungi kami untuk jadwal demo gratis.'
              : 'We are ready to demonstrate this product at your facility. Contact us to schedule a free demo.'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-navy font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:-translate-y-1 text-base group/cta"
            >
              {tx(t.nav.cta)}
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold px-10 py-5 rounded-2xl transition-all text-base"
            >
              {lang === 'id' ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </div>
        </section>
      </div>
      
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.2; transform: scale(1.1) rotate(10deg); }
        }
      `}</style>
    </main>
  )
}
