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
    tag: lang === 'id' ? 'Solusi Unggulan' : 'Featured Solution',
    href: '',
    client: null as { name: string; logo: string } | null,
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
      href: `/blog/${cs.slug}`,
      client: cs.client ?? null,
    })),
    ...products.map((p) => ({
      isDefault: false,
      type: 'product' as const,
      headline: [p.title.id],
      subheadline: p.desc.id,
      image: p.image || FALLBACK_IMAGE,
      tag: lang === 'id' ? 'Produk' : 'Product',
      href: `/produk/${p.slug}`,
      client: null as { name: string; logo: string } | null,
    }))
  ]

  const goTo = useCallback((idx: number) => {
    setActiveSlide(idx)
    setTimerKey(k => k + 1)
  }, [])

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

      {/* Top darkening — keeps the transparent navbar legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" />

      {/* Bottom darkening — anchors the bottom-left text/buttons */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Vignette — darkens the edges/corners for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />

      {/* Slide content */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          const isActive = i === activeSlide
          return (
            <div
              key={i}
              className={`absolute left-6 right-16 md:left-[max(40px,calc((100vw-1400px)/2+40px))] md:right-24 bottom-24 md:bottom-28 flex flex-col items-start text-left transition-all duration-700 ease-out ${
                isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              {/* Tag chip */}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-4">
                {slide.tag}
              </span>

              {/* Client logo */}
              {slide.client?.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.client.logo}
                  alt={slide.client.name}
                  className="h-9 md:h-11 w-auto max-w-[170px] object-contain grayscale invert opacity-90 mb-4"
                />
              )}

              {/* Headline */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 max-w-2xl line-clamp-2 [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                {slide.headline.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < slide.headline.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {/* Subheadline */}
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-7 max-w-md line-clamp-2">
                {slide.subheadline}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
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

      {/* Pagination dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-6 md:left-[max(40px,calc((100vw-1400px)/2+40px))] flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                i === activeSlide ? 'w-12 bg-white/25' : 'w-1.5 bg-white/45 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === activeSlide && (
                <span
                  key={timerKey}
                  className="block h-full bg-white rounded-full"
                  style={{ animation: `hero-progress ${SLIDE_DURATION}ms linear forwards` }}
                />
              )}
            </button>
          ))}
          <style>{`@keyframes hero-progress { from { width: 0% } to { width: 100% } }`}</style>
        </div>
      )}

    </section>
  )
}
