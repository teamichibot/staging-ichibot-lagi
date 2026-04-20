'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { ServiceData } from '@/lib/services-data'

export function Services({ serviceItems }: { serviceItems: ServiceData[] }) {
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
    <section id="layanan" className="pt-4 md:pt-8 pb-24 md:pb-32 bg-navy-light relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="reveal max-w-2xl mb-16 mx-auto text-center">
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
            {tx(t.services.sectionLabel)}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            {tx(t.services.heading)}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mx-auto">{tx(t.services.subheading)}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, i) => (
            <div
              key={service.slug}
              className="reveal group flex flex-col rounded-2xl glass-edge overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative w-full h-56 overflow-hidden bg-navy/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {service.title[lang]}
                </h3>
                <div className="flex-grow flex flex-col justify-between">
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.desc[lang]}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-border/60">
                  {service.example && (
                    <p className="text-sky-300 text-xs font-medium italic border-l-2 border-sky-400/40 pl-3 py-1 bg-sky-400/10 rounded-r mb-5">
                      {service.example[lang]}
                    </p>
                  )}
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="inline-flex items-center text-sm font-bold text-white hover:text-sky-400 transition-colors group/btn"
                  >
                    {/* @ts-ignore */}
                    {tx(t.services.ctaLearn)}
                    <svg className="w-4 h-4 ml-1.5 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
