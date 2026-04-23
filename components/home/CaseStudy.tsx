'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { PostMeta } from '@/lib/blog'

interface Props {
  posts: PostMeta[]
}

export function CaseStudy({ posts }: Props) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section id="studi-kasus" className="py-12 md:py-16 bg-[#050A14] relative overflow-hidden group/section" ref={sectionRef}>
      {/* Intense Ambient Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[800px] h-[800px] bg-teal/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy/40 rounded-full blur-[150px] pointer-events-none opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
              {tx(t.caseStudies.sectionLabel)}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              {tx(t.caseStudies.heading)}
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl">{tx(t.caseStudies.subheading)}</p>
          </div>
          <Link
            href="/blog?category=Case Study"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 px-6 rounded-full transition-all text-sm border border-white/10 backdrop-blur-md group shadow-xl"
          >
            {lang === 'id' ? 'Lihat Semua' : 'View All'}
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
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
            {posts.slice(0, 5).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="reveal flex-none w-[75vw] md:w-[400px] snap-center group flex flex-col glass-3d-premium overflow-hidden hover:translate-y-[-4px] transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative w-full h-48 overflow-hidden bg-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600&h=400'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300">
                      {lang === 'id' ? 'Studi Kasus' : 'Case Study'}
                    </span>
                    <span className="text-slate-400 text-xs">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors flex-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-sky-400 group-hover:text-sky-300 transition-colors text-sm font-semibold flex items-center gap-1.5 mt-auto">
                    {lang === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}

            {/* View All Card */}
            <Link
              href="/blog?category=Case Study"
              className="reveal flex-none w-[75vw] md:w-[400px] snap-center group relative min-h-[300px] flex flex-col justify-center items-center glass-3d-premium overflow-hidden cursor-pointer bg-white/5 border border-white/10"
              style={{ transitionDelay: `${Math.min(posts.length, 5) * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal group-hover:text-navy transition-all duration-300 text-teal">
                  <svg className="w-7 h-7 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-light transition-colors">
                  {lang === 'id' ? 'Lihat Semua Studi Kasus' : 'View All Case Studies'}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
