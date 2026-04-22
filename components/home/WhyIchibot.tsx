'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

const icons = [
  // Affordable - wallet
  <svg key="1" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 11a2 2 0 100 4 2 2 0 000-4z" fill="currentColor" stroke="none" />
    <path d="M2 10V7a2 2 0 012-2h16a2 2 0 012 2v3" />
  </svg>,
  // Practical - wrench
  <svg key="2" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>,
  // Flexible - arrows
  <svg key="3" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>,
  // Proven - shield check
  <svg key="4" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>,
  // Net Zero - leaf
  <svg key="5" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M11 20A7 7 0 0118 7c0-3.866-3.582-7-8-7S2 3.134 2 7a7 7 0 007 7h2" />
    <path d="M11 20a7 7 0 007-7" />
    <line x1="11" y1="20" x2="11" y2="22" />
  </svg>,
]

export function WhyIchibot() {
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
    <section className="py-24 md:py-32 bg-transparent relative" ref={sectionRef}>
      {/* Decorative Blur Backgrounds - Delegated to global wrapper */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="reveal max-w-2xl mb-20 text-center mx-auto sm:text-left sm:mx-0">
          <span className="text-sky-400 text-sm font-semibold uppercase tracking-widest block mb-4">
            {tx(t.whyIchibot.sectionLabel)}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {tx(t.whyIchibot.heading)}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">{tx(t.whyIchibot.subheading)}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.whyIchibot.items.map((item, i) => {
            const isNetZero = i === t.whyIchibot.items.length - 1
            return (
              <div
                key={i}
                className={`reveal group p-8 md:p-10 transition-all duration-500 ${
                  isNetZero
                    ? 'lg:col-span-2 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent hover:bg-green-500/20 hover:border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.05)] backdrop-blur-xl'
                    : 'rounded-2xl glass-edge hover:shadow-[0_0_40px_rgba(45,212,191,0.05)] hover:border-teal/30'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 ${
                  isNetZero
                    ? 'bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                    : 'bg-teal/20 text-teal-light shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                }`}>
                  {icons[i]}
                </div>
                {isNetZero && (
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-400 mb-3 bg-green-500/10 px-3 py-1 rounded-full">
                    {lang === 'id' ? 'Komitmen Lingkungan' : 'Environmental Commitment'}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight">
                  {tx(item.title)}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{tx(item.desc)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
