'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

const blogImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
]

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-50 text-blue-700',
  AI: 'bg-purple-50 text-purple-700',
  'Case Study': 'bg-amber-50 text-amber-700',
  Tutorial: 'bg-green-50 text-green-700',
}

export function BlogPreview() {
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-24 md:py-32 bg-off-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              {tx(t.blogPreview.sectionLabel)}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2">
              {tx(t.blogPreview.heading)}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-teal font-semibold text-sm hover:underline flex items-center gap-1.5 flex-shrink-0"
          >
            {tx(t.blogPreview.viewAll)}
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.blogPreview.posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal group flex flex-col bg-white rounded-2xl border border-border hover:border-teal/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image Cover */}
              <div className="relative w-full h-48 overflow-hidden bg-navy/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blogImages[i % blogImages.length]} 
                  alt={tx(post.title)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-muted text-xs">{formatDate(post.date)}</span>
                </div>
                <h3 className="font-display text-base font-bold text-navy mb-3 leading-snug group-hover:text-teal transition-colors flex-1">
                  {tx(post.title)}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-5">
                  {tx(post.excerpt)}
                </p>
                <span className="text-teal text-sm font-semibold flex items-center gap-1.5">
                  {tx(t.blogPreview.readMore)}
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
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
