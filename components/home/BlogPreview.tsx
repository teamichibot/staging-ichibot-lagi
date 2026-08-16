'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { PostMeta } from '@/lib/blog'

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 20)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20)
    const items = scrollContainerRef.current.children
    if (items.length > 0) {
      const itemWidth = (items[0] as HTMLElement).offsetWidth + 24
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll > 0 && scrollLeft >= maxScroll - 20) {
        setActiveIndex(items.length - 1)
      } else {
        setActiveIndex(Math.round(scrollLeft / itemWidth))
      }
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const { clientWidth } = scrollContainerRef.current
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5,
      behavior: 'smooth',
    })
  }

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return
    const items = scrollContainerRef.current.children
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <section className="bg-[#0B0E13] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="pt-14 md:pt-16 pb-10 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
          <h2 className="max-w-3xl font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            {tx(t.blogPreview.heading)}
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'id' ? 'Lihat semua artikel →' : 'View all articles →'}
          </Link>
        </div>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-6 md:left-[max(40px,calc((100vw-1400px)/2+40px))] top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-sm transition-all text-white ${
            canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Previous"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-6 md:right-[max(40px,calc((100vw-1400px)/2+40px))] top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-sm transition-all text-white ${
            canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Next"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory pl-[max(24px,calc((100vw-1280px)/2+24px))] md:pl-[max(40px,calc((100vw-1280px)/2+40px))] pr-[max(24px,calc((100vw-1280px)/2+24px))] md:pr-[max(40px,calc((100vw-1280px)/2+40px))] scroll-pl-[max(24px,calc((100vw-1280px)/2+24px))] md:scroll-pl-[max(40px,calc((100vw-1280px)/2+40px))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="flex-none snap-start w-[88vw] md:w-[calc(50vw-12px)] relative overflow-hidden rounded-2xl bg-black"
              style={{ transitionDelay: `${i * 60}ms`, height: 'min(60vh, 600px)', minHeight: '440px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1800'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

              {/* Top label */}
              <div className="absolute top-8 left-8 md:top-10 md:left-12">
                <span className="text-white/85 text-sm font-medium">
                  {post.category || (lang === 'id' ? 'Artikel' : 'Article')}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-10 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                {post.client?.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.client.logo}
                    alt={post.client.name}
                    className="h-8 md:h-9 w-auto max-w-[150px] object-contain grayscale invert opacity-90 mb-3"
                  />
                )}
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-2 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-7 max-w-md line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center"
                  >
                    {tx(t.blogPreview.readMore)}
                  </Link>
                  <Link
                    href="/blog"
                    className="bg-white/90 hover:bg-white text-ink font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center"
                  >
                    {tx(t.blogPreview.viewAll)}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-2 pb-14 md:pb-16">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-8 bg-white' : 'w-1.5 bg-white/15 hover:bg-white/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
