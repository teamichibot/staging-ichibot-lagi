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
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 20)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20)
      
      // Calculate active index
      const items = scrollContainerRef.current.children
      if (items.length > 0) {
        const itemWidth = (items[0] as HTMLElement).offsetWidth + 32 // card width + gap (gap-8 is 32px)
        const index = Math.round(scrollLeft / itemWidth)
        setActiveIndex(index)
      }
    }
  }

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const items = scrollContainerRef.current.children
      if (items[index]) {
        items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
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
      { threshold: 0.01 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const totalItems = productItems.slice(0, 5).length + 1 // +1 for View All

  return (
    <section id="produk" className="py-12 md:py-16 bg-transparent relative group/section" ref={sectionRef}>
      {/* Background shape - Delegated to global wrapper */}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
            {tx(t.products.sectionLabel)}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            {tx(t.products.heading)}
          </h2>
          <p className="text-slate-400 text-lg mt-6 leading-relaxed">
            {tx(t.products.subheading)}
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hidden md:flex ${
              canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-teal hover:text-navy hidden md:flex ${
              canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-5 md:gap-8 pt-10 pb-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
          >
            {productItems.slice(0, 5).map((product, i) => (
              <div
                key={product.slug}
                className="reveal flex-none w-[75vw] md:w-[420px] snap-center group relative h-[520px] flex flex-col glass-3d-premium overflow-hidden cursor-pointer"
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
                    <p className="text-slate-300 text-sm leading-relaxed mb-8 opacity-80 line-clamp-3">
                      {product.desc[lang]}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/produk/${product.slug}`}
                        className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-navy font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal/20 text-sm"
                      >
                        {tx(t.products.ctaLearn)}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Products Card */}
            <Link
              href="/produk"
              className="reveal flex-none w-[75vw] md:w-[420px] snap-center group relative h-[520px] flex flex-col justify-center items-center rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl"
              style={{ transitionDelay: `${Math.min(productItems.length, 5) * 100}ms` }}
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

        {/* Pagination Dots */}
        <div className="reveal mt-4 flex justify-center gap-2">
          {Array.from({ length: totalItems }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-8 bg-teal' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
