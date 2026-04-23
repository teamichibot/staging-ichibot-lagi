'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'
import type { PostMeta } from '@/lib/blog'

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-500/20 text-blue-300',
  AI: 'bg-purple-500/20 text-purple-300',
  'Case Study': 'bg-amber-500/20 text-amber-300',
  Tutorial: 'bg-green-500/20 text-green-300',
}

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
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
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <section className="py-12 md:py-16 bg-[#050A14] relative overflow-hidden group/section" ref={sectionRef}>
      {/* Intense Ambient Glows */}
      <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-teal/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] bg-navy/30 rounded-full blur-[140px] pointer-events-none opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
              Newsroom & Insight
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              {tx(t.blogPreview.heading)}
            </h2>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 px-6 rounded-full transition-all text-sm border border-white/10 backdrop-blur-md group shadow-xl">
            {tx(t.blogPreview.viewAll)}
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
            className="flex overflow-x-auto gap-6 pt-10 pb-12 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0"
          >
            {posts.slice(0, 5).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="reveal flex-none w-[82vw] md:w-[380px] snap-center group flex flex-col glass-3d-premium overflow-hidden"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative w-full h-44 overflow-hidden bg-navy/5">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy/10 to-teal/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${categoryColors[post.category] ?? 'bg-slate-700/50 text-slate-300'}`}>
                      {post.category}
                    </span>
                    <span className="text-muted text-xs">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-3 leading-snug group-hover:text-teal transition-colors flex-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-5">{post.excerpt}</p>
                  <span className="text-teal group-hover:text-teal-light transition-colors text-sm font-semibold flex items-center gap-1.5 mt-auto">
                    {tx(t.blogPreview.readMore)}
                    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}

            {/* View All Blog Card */}
            <Link
              href="/blog"
              className="reveal flex-none w-[82vw] md:w-[380px] snap-center group relative min-h-[300px] flex flex-col justify-center items-center glass-3d-premium overflow-hidden cursor-pointer bg-white/5 border border-white/10"
              style={{ transitionDelay: `${Math.min(posts.length, 5) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal group-hover:text-navy transition-all duration-300 text-teal">
                  <svg className="w-7 h-7 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-teal-light transition-colors">
                  {lang === 'id' ? 'Lihat Semua Blog' : 'View All Posts'}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
