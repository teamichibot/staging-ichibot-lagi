'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import type { ServiceData } from '@/lib/services-data'
import { WHATSAPP_NUMBER } from '@/lib/translations'

export function ServiceDetail({ service }: { service: ServiceData }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(
    lang === 'id'
      ? `Halo Ichibot, saya tertarik dengan layanan "${service.title.id}". Bisa info lebih lanjut?`
      : `Hello Ichibot, I am interested in your "${service.title.en}" service. Could you share more details?`
  )

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/#layanan"
            className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {lang === 'id' ? 'Kembali ke Layanan' : 'Back to Services'}
          </Link>

          <div className="mt-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.05]">
              {tx(service.title)}
            </h1>
            <p className="text-ink/55 text-lg md:text-xl leading-relaxed mt-6">
              {tx(service.longDesc)}
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[180px] text-center"
              >
                {lang === 'id' ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}
              </a>
              <Link
                href="/contact"
                className="bg-white hover:bg-black/5 border border-black/10 text-ink font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[180px] text-center"
              >
                {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="rounded-2xl overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1800'}
              alt={tx(service.title)}
              className="w-full h-64 md:h-[480px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight max-w-3xl mb-12 md:mb-14">
            {lang === 'id' ? 'Keunggulan Layanan' : 'Service Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-7 flex items-start gap-4">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className="text-ink/75 text-[15px] leading-relaxed">{tx(benefit)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight max-w-3xl mb-12 md:mb-14">
            {lang === 'id' ? 'Proses Implementasi' : 'Implementation Process'}
          </h2>
          <div className="relative max-w-4xl">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-black/10 hidden md:block" />
            <ol className="space-y-8 md:space-y-10">
              {service.process.map((step, i) => (
                <li key={i} className="relative flex gap-6 md:gap-8 items-start">
                  <div className="relative z-10 flex-none w-10 h-10 rounded-full bg-brand text-white font-display font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight mb-2">
                      {tx(step.title)}
                    </h3>
                    <p className="text-ink/55 text-[15px] leading-relaxed">{tx(step.desc)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight max-w-3xl mb-12 md:mb-14">
            {lang === 'id' ? 'Contoh Use Case' : 'Example Use Cases'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {service.useCases.map((uc, i) => (
              <div key={i} className="bg-white rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-ink tracking-tight mb-2">{tx(uc.title)}</h3>
                <p className="text-ink/55 text-[15px] leading-relaxed">{tx(uc.desc)}</p>
              </div>
            ))}
          </div>
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
                {lang === 'id' ? 'Tertarik dengan layanan ini?' : 'Interested in this service?'}
              </h2>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                {lang === 'id'
                  ? 'Diskusi awal tanpa komitmen. Kami bantu pemetaan kebutuhan dan solusi yang paling cocok untuk pabrik Anda.'
                  : 'Initial discussion with no commitment. We help map needs and the solutions best suited to your factory.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-white/95 text-brand font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[180px] text-center"
                >
                  {lang === 'id' ? 'Konsultasi Gratis' : 'Free Consultation'}
                </a>
                <Link
                  href="/contact"
                  className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[180px] text-center"
                >
                  {lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
