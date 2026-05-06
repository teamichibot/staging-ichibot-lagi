'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'
import type { ServiceData } from '@/lib/services-data'

function ServiceCard({
  service,
  className = '',
}: {
  service: ServiceData
  className?: string
}) {
  const { lang } = useLang()
  const waMessage = encodeURIComponent(
    lang === 'id'
      ? `Halo, saya tertarik dengan layanan "${service.title.id}". Bisa info lebih lanjut?`
      : `Hi, I'm interested in your "${service.title.en}" service. Could you share more details?`
  )
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-black ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={service.image}
        alt={service.title[lang]}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
        <span className="text-white/80 text-xs font-medium mb-2">
          {lang === 'id' ? 'Layanan' : 'Service'}
        </span>
        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2">
          {service.title[lang]}
        </h3>
        <p className="text-white/85 text-sm leading-relaxed line-clamp-2 max-w-md mb-7">
          {service.desc[lang]}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center"
          >
            {lang === 'id' ? 'Konsultasi' : 'Consult Now'}
          </a>
          <Link
            href={`/layanan/${service.slug}`}
            className="bg-white/90 hover:bg-white text-ink font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center"
          >
            {lang === 'id' ? 'Pelajari' : 'Learn More'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Services({ serviceItems }: { serviceItems: ServiceData[] }) {
  const { lang } = useLang()
  const items = serviceItems.slice(0, 6)
  const [s1, s2, s3, s4, s5, s6] = items

  if (!s1) return null

  return (
    <section id="layanan" className="bg-off-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="pb-10 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
          <h2 className="max-w-3xl font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">
            {lang === 'id' ? 'Layanan Implementasi' : 'Implementation Services'}
          </h2>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message[lang])}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'id' ? 'Konsultasi gratis →' : 'Free consultation →'}
          </a>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          style={{ gridAutoRows: 'minmax(520px, auto)' }}
        >
          <ServiceCard service={s1} className="md:col-span-2 min-h-[520px]" />
          {s2 && <ServiceCard service={s2} className="min-h-[520px]" />}
          {s3 && <ServiceCard service={s3} className="min-h-[520px]" />}
          {s4 && <ServiceCard service={s4} className="min-h-[520px]" />}
          {s5 && <ServiceCard service={s5} className="min-h-[520px]" />}
          {s6 && <ServiceCard service={s6} className="md:col-span-3 min-h-[520px]" />}
        </div>
      </div>
    </section>
  )
}
