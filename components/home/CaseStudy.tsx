'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section id="studi-kasus" className="py-24 md:py-32 bg-navy relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-widest">
              {tx(t.caseStudies.sectionLabel)}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2">
              {tx(t.caseStudies.heading)}
            </h2>
            <p className="text-slate-400 text-lg mt-3 max-w-xl">{tx(t.caseStudies.subheading)}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-navy font-semibold py-2.5 px-6 rounded-full transition-all text-sm shadow-md group"
          >
            {lang === 'id' ? 'Lihat Semua' : 'View All'}
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="transform transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        {posts.length === 0 ? (
          <p className="text-slate-400">{lang === 'id' ? 'Belum ada studi kasus.' : 'No case studies yet.'}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="reveal group flex flex-col rounded-2xl glass-edge overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image Cover */}
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
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
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
          </div>
        )}
      </div>
    </section>
  )
}
