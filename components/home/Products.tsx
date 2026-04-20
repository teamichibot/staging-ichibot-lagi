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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(progress || 0)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="produk" className="py-24 md:py-32 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Centered */}
        <div className="reveal max-w-2xl mb-16 mx-auto text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            {tx(t.products.sectionLabel)}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3 mb-6">
            {tx(t.products.heading)}
          </h2>
          <p className="text-muted text-lg leading-relaxed mx-auto">{tx(t.products.subheading)}</p>
        </div>

        {/* Product cards - Immersive UI with Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
        >
          {t.products.items.map((item, i) => {
            const productData = productItems[i]
            if (!productData) return null
            return (
              <div
                key={i}
                className="reveal flex-none w-[85vw] md:w-[400px] snap-center group relative h-[500px] flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productData.image}
                  alt={tx(item.title)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content block positioned at the bottom */}
                <div className="relative flex flex-col flex-1 justify-end p-8 pb-10 w-full h-full z-10 text-white text-left">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold mb-3 text-white">
                      {tx(item.title)}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-8">
                      {tx(item.desc)}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href={`/produk/${productData.slug}`}
                        className="inline-flex items-center justify-center text-sm font-semibold text-white bg-teal/90 backdrop-blur-md hover:bg-teal py-2.5 px-6 rounded-full transition-all duration-300 group/btn"
                      >
                        {tx(t.products.ctaLearn)}
                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* View All Products Card */}
          <Link
            href="/produk"
            className="reveal flex-none w-[85vw] md:w-[400px] snap-center group relative h-[500px] flex flex-col justify-center items-center rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-navy"
            style={{ transitionDelay: `${t.products.items.length * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-navy opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal transition-all duration-300 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-teal-light transition-colors">
                {lang === 'id' ? 'Lihat Semua Produk' : 'View All Products'}
              </h3>
            </div>
          </Link>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="max-w-[120px] mx-auto h-2 bg-navy/5 rounded-full overflow-hidden mt-2 relative">
          <div
            className="absolute top-0 bottom-0 left-0 w-1/4 bg-teal rounded-full transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${scrollProgress * 3}%)` }}
          />
        </div>
      </div>
    </section>
  )
}
