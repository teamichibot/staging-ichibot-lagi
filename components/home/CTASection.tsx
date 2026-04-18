'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function CTASection() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-navy rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-[0_20px_60px_rgba(10,37,64,0.15)] reveal">
          
          {/* Decorative Blur and Gradients for CTA */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Quote SVG */}
            <svg className="mx-auto mb-8 text-teal/40" viewBox="0 0 40 32" width="48" height="38" fill="currentColor">
              <path d="M0 32V20C0 8.667 6.667 2 20 0l2.667 4C16.889 5.333 13.333 8.667 12 14H20V32H0zm20 0V20C20 8.667 26.667 2 40 0l2.667 4C37.111 5.333 33.333 8.667 32 14H40V32H20z" />
            </svg>
            <p className="text-white/80 text-xl md:text-2xl font-light italic leading-relaxed mb-12">
              "{tx(t.cta.quote)}"
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-teal to-transparent mx-auto mb-12" />

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {tx(t.cta.heading)}
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 font-light">
              {tx(t.cta.subtext)}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="https://ichibot.fillout.com/projectcustom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-light text-white font-bold px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(45,212,191,0.3)] text-base group"
              >
                {tx(t.cta.button)}
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" className="transform transition-transform duration-300 group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 border border-white/10 text-base"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {tx(t.cta.whatsapp)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
