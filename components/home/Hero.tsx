'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'
import type { PostMeta } from '@/lib/blog'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'

interface HeroProps {
  caseStudies?: PostMeta[]
}

export function Hero({ caseStudies = [] }: HeroProps) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])
  
  const [activeSlide, setActiveSlide] = useState(0)

  // Construct slides
  const defaultSlide = {
    isDefault: true,
    headline: tx(t.hero.headline).split('\n'),
    subheadline: tx(t.hero.subheadline),
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1200',
    tag: lang === 'id' ? 'Sistem Utama' : 'Main System',
    href: ''
  }

  const slides = [
    defaultSlide,
    ...caseStudies.map((cs) => ({
      isDefault: false,
      headline: [cs.title],
      subheadline: cs.excerpt,
      image: cs.image || FALLBACK_IMAGE,
      tag: 'Case Study',
      href: `/blog/${cs.slug}`
    }))
  ]

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="bg-navy relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-36">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Blue glow left */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-16 min-h-[500px] lg:min-h-[550px]">

          {/* Left: copy (Slider Logic) */}
          <div className="relative w-full h-full flex flex-col justify-center min-h-[350px]">
            {slides.map((slide, index) => {
              const isActive = index === activeSlide
              return (
                <div 
                  key={index} 
                  className={`absolute inset-x-0 transition-all duration-1000 ease-in-out flex flex-col justify-center ${
                    isActive ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 -z-10 pointer-events-none'
                  }`}
                >
                  {!slide.isDefault && (
                     <span className="inline-block px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-widest mb-6 w-max">
                       {slide.tag}
                     </span>
                  )}
                  <h1 className="font-display text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
                    {slide.headline.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < slide.headline.length - 1 && <br />}
                      </span>
                    ))}
                  </h1>
                  <p className="text-white/65 text-lg leading-relaxed mb-10 text-balance line-clamp-3">
                    {slide.subheadline}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {slide.isDefault ? (
                      <>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
                        >
                          {tx(t.hero.ctaPrimary)}
                          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a
                          href="#layanan"
                          className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white font-medium px-7 py-3.5 rounded-full transition-colors text-sm"
                        >
                          {tx(t.hero.ctaSecondary)}
                        </a>
                      </>
                    ) : (
                      <Link
                        href={slide.href}
                        className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
                      >
                       {lang === 'id' ? 'Baca Studi Kasus' : 'Read Case Study'}
                        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: illustration (Slider Logic) */}
          <div className="hidden lg:flex justify-end items-center relative w-full h-full">
            {/* Glowing orb behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group">
              {slides.map((slide, index) => {
                const isActive = index === activeSlide
                return (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={slide.image} 
                      alt={slide.headline.join(' ')} 
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                    />

                    {/* Glass overlay at the bottom for default slide ONLY */}
                    {slide.isDefault && (
                      <div className="absolute bottom-0 left-0 right-0 bg-navy/60 backdrop-blur-md border-t border-white/10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-semibold text-sm mb-1">Status Sistem</p>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-green-400 text-xs font-medium">100% Operasional</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white/60 text-xs mb-1">Efisiensi AI</p>
                            <p className="text-teal-light font-display font-bold text-lg">+98.4%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-0 left-6 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === activeSlide ? 'w-8 bg-teal' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
