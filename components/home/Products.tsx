'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { ProductData } from '@/lib/products-data'

export function Products({ productItems }: { productItems: ProductData[] }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(progress || 0)
      
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
    handleScroll() // Initial check
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="produk" className="py-24 md:py-32 bg-[#050A14] relative overflow-hidden group/section" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal/5 blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Centered */}
        <div className="reveal max-w-2xl mb-16 mx-auto text-center">
          <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
            {tx(t.products.sectionLabel)}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {tx(t.products.heading)}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mx-auto max-w-xl">{tx(t.products.subheading)}</p>
        </div>

        {/* Product cards with Horizontal Scroll & Floating Nav */}
        <div className="relative">
          {/* Navigation Buttons (Desktop Only) */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hover:scale-110 hidden md:flex ${
              canScrollLeft ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-4'
            }`}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hover:scale-110 hidden md:flex ${
              canScrollRight ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'
            }`}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 pt-4 pb-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
          >
            {productItems.map((product, i) => (
              <div
                key={product.slug}
                className="reveal flex-none w-[82vw] md:w-[420px] snap-center group relative h-[520px] flex flex-col glass-3d-premium overflow-hidden cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title[lang]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/95 via-[#050A14]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col flex-1 justify-end p-8 pb-10 w-full h-full z-10 text-white text-left">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold mb-3 text-white">
                      {product.title[lang]}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-8 line-clamp-2">
                      {product.desc[lang]}
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href={`/produk/${product.slug}`}
                        className="inline-flex items-center justify-center text-sm font-bold text-navy bg-teal/90 backdrop-blur-md hover:bg-teal py-3 px-7 rounded-full transition-all duration-300 group/btn"
                      >
                        {tx(t.products.ctaLearn)}
                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Products Card */}
            <Link
              href="/produk"
              className="reveal flex-none w-[82vw] md:w-[420px] snap-center group relative h-[520px] flex flex-col justify-center items-center rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl"
              style={{ transitionDelay: `${productItems.length * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal group-hover:text-navy transition-all duration-300 backdrop-blur-sm text-teal">
                  <svg className="w-8 h-8 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-teal-light transition-colors">
                  {lang === 'id' ? 'Lihat Semua Produk' : 'View All Products'}
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {/* Improved Scroll Progress Indicator */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center reveal">
          <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <div
              className="absolute top-0 bottom-0 left-0 w-1/4 bg-teal rounded-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${scrollProgress * 3}%)` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
