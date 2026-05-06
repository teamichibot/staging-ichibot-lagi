'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'
import type { PostMeta } from '@/lib/blog'
import type { ProductData } from '@/lib/products-data'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1800'
const SLIDE_DURATION = 6000

interface HeroProps {
  caseStudies?: PostMeta[]
  products?: ProductData[]
}

export function Hero({ caseStudies = [], products = [] }: HeroProps) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  const [activeSlide, setActiveSlide] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const defaultSlide = {
    isDefault: true,
    headline: tx(t.hero.headline).split('\n'),
    subheadline: tx(t.hero.subheadline),
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1800',
    tag: lang === 'id' ? 'Sistem Utama' : 'Main System',
    href: ''
  }

  const slides = [
    defaultSlide,
    ...caseStudies.map((cs) => ({
      isDefault: false,
      type: 'case-study' as const,
      headline: [cs.title],
      subheadline: cs.excerpt,
      image: cs.image || FALLBACK_IMAGE,
      tag: 'Case Study',
      href: `/blog/${cs.slug}`
    })),
    ...products.map((p) => ({
      isDefault: false,
      type: 'product' as const,
      headline: [p.title.id],
      subheadline: p.desc.id,
      image: p.image,
      tag: lang === 'id' ? 'Produk' : 'Product',
      href: `/produk/${p.slug}`
    }))
  ]

  const goTo = useCallback((idx: number) => {
    setActiveSlide(idx)
    setTimerKey(k => k + 1)
  }, [])

  const prev = () => goTo((activeSlide - 1 + slides.length) % slides.length)
  const next = () => goTo((activeSlide + 1) % slides.length)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length, timerKey])

  return (
    <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden bg-black">

      {/* Slide images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.headline.join(' ')}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${i === activeSlide ? 'scale-105' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/55 pointer-events-none" />

      {/* Center text/button readability gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_35%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Slide content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-[18vh]">
        {slides.map((slide, i) => {
          const isActive = i === activeSlide
          return (
            <div
              key={i}
              className={`absolute flex flex-col items-center transition-all duration-700 ease-out px-4 w-full max-w-5xl mx-auto ${
                isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
              style={{ top: '18vh' }}
            >
              {/* Headline */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 max-w-4xl line-clamp-2">
                {slide.headline.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < slide.headline.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {/* Subheadline */}
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-7 max-w-xl line-clamp-2">
                {slide.subheadline}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {slide.isDefault ? (
                  <>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-sm transition-colors text-sm min-w-[160px]"
                    >
                      {tx(t.hero.ctaPrimary)}
                    </a>
                    <a
                      href="#produk"
                      className="bg-white/90 hover:bg-white text-ink font-semibold px-8 py-3 rounded-sm transition-colors text-sm min-w-[160px]"
                    >
                      {tx(t.hero.ctaSecondary)}
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      href={slide.href}
                      className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-sm transition-colors text-sm min-w-[160px]"
                    >
                      {(slide as { type?: string }).type === 'product'
                        ? (lang === 'id' ? 'Lihat Produk' : 'View Product')
                        : (lang === 'id' ? 'Baca Studi Kasus' : 'Read Case Study')}
                    </Link>
                    <a
                      href="#produk"
                      className="bg-white/90 hover:bg-white text-ink font-semibold px-8 py-3 rounded-sm transition-colors text-sm min-w-[160px]"
                    >
                      {lang === 'id' ? 'Lihat Layanan' : 'Explore Services'}
                    </a>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Left arrow */}
      {slides.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-6 md:left-[max(40px,calc((100vw-1400px)/2+40px))] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-sm transition-all text-white"
          aria-label="Previous"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {slides.length > 1 && (
        <button
          onClick={next}
          className="absolute right-6 md:right-[max(40px,calc((100vw-1400px)/2+40px))] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-sm transition-all text-white"
          aria-label="Next"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Pagination dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

    </section>
  )
}
