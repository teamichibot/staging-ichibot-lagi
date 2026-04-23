'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { ServiceData } from '@/lib/services-data'

export function Services({ serviceItems }: { serviceItems: ServiceData[] }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 20)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    handleScroll()
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.01 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="layanan" className="pt-12 md:pt-16 pb-12 md:pb-16 bg-transparent relative group/section" ref={sectionRef}>
      {/* Intense Ambient Glows */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="reveal max-w-2xl mb-16 mx-auto text-center">
          <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
            {tx(t.services.sectionLabel)}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {tx(t.services.heading)}
          </h2>
          <p className="text-muted text-lg leading-relaxed mx-auto max-w-xl">{tx(t.services.subheading)}</p>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hidden md:flex ${
              canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hidden md:flex ${
              canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-5 md:gap-6 pt-10 pb-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
          >
            {serviceItems.slice(0, 5).map((service, i) => (
              <div
                key={service.slug}
                className="reveal flex-none w-[75vw] md:w-[400px] snap-center group flex flex-col glass-3d-premium overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative w-full h-48 overflow-hidden bg-navy/5">
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
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{service.desc[lang]}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/60">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="inline-flex items-center text-sm font-bold text-white hover:text-sky-400 transition-colors group/btn"
                    >
                      {tx(t.services.ctaLearn)}
                      <svg className="w-4 h-4 ml-1.5 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Services Card */}
            <Link
              href="/layanan"
              className="reveal flex-none w-[75vw] md:w-[400px] snap-center group relative h-[auto] min-h-[400px] flex flex-col justify-center items-center glass-3d-premium overflow-hidden cursor-pointer bg-white/5 border border-white/10"
              style={{ transitionDelay: `${Math.min(serviceItems.length, 5) * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal group-hover:text-navy transition-all duration-300 text-teal">
                  <svg className="w-7 h-7 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-light transition-colors">
                  {lang === 'id' ? 'Lihat Semua Layanan' : 'View All Services'}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
