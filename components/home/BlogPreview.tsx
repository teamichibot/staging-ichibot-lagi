'use client'

import { useEffect, useRef } from 'react'
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
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
    <section className="py-24 md:py-32 bg-[#050A14] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
              Newsroom & Insight
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              {tx(t.blogPreview.heading)}
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-2.5 px-6 rounded-full transition-all text-sm border border-white/10 backdrop-blur-md group shadow-xl">
            {tx(t.blogPreview.viewAll)}
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal group flex flex-col glass-3d-premium overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative w-full h-48 overflow-hidden bg-navy/5">
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
                <h3 className="font-display text-base font-bold text-white mb-3 leading-snug group-hover:text-teal transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                <span className="text-teal group-hover:text-teal-light transition-colors text-sm font-semibold flex items-center gap-1.5 mt-auto">
                  {tx(t.blogPreview.readMore)}
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
