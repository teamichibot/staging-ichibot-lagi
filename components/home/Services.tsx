'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import { servicesData } from '@/lib/services-data'

export function Services() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="layanan" className="py-24 md:py-32 bg-off-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal max-w-2xl mb-16 mx-auto text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            {tx(t.services.sectionLabel)}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            {tx(t.services.heading)}
          </h2>
          <p className="text-muted text-lg leading-relaxed mx-auto">{tx(t.services.subheading)}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((item, i) => {
            const serviceData = servicesData[i]
            return (
              <div
                key={i}
                className="reveal group flex flex-col rounded-2xl bg-white border border-border overflow-hidden hover:border-teal/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative w-full h-56 overflow-hidden bg-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={serviceData.image}
                    alt={tx(item.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                    {tx(item.title)}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">{tx(item.desc)}</p>
                  <div className="mt-auto pt-4 border-t border-border/60">
                    <p className="text-teal text-xs font-medium italic border-l-2 border-teal/40 pl-3 py-1 bg-teal/5 rounded-r mb-5">
                      {tx(item.example)}
                    </p>
                    <Link
                      href={`/layanan/${serviceData.slug}`}
                      className="inline-flex items-center text-sm font-bold text-navy hover:text-teal transition-colors group/btn"
                    >
                      {/* @ts-ignore */}
                      {tx(t.services.ctaLearn)}
                      <svg className="w-4 h-4 ml-1.5 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
