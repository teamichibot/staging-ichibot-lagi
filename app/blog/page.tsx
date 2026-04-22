export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getAllPostsMerged } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Ichibot',
  description: 'Insight dan update seputar IoT, AI, dan digitalisasi industri dari tim Ichibot.',
}

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  AI: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Case Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Tutorial: 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default async function BlogPage() {
  const posts = await getAllPostsMerged()

  return (
    <div className="pt-24 pb-24 md:pt-32 bg-[#050A14] min-h-screen relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="text-teal text-sm font-bold uppercase tracking-[0.2em]">Blog</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
            Insight & Update
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Artikel seputar IoT, AI, dan digitalisasi industri dari tim ahli Ichibot.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center glass-3d-premium rounded-3xl animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
            <p className="text-slate-500 font-medium">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col glass-3d-premium overflow-hidden cursor-pointer animate-reveal opacity-0"
                style={{ 
                  transitionDelay: `${i * 50}ms`,
                  animationFillMode: 'forwards',
                  animationDelay: `${(i * 50) + 200}ms`
                }}
              >
                {/* Image */}
                {post.image ? (
                  <div className="relative w-full h-56 overflow-hidden bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/80 to-transparent pointer-events-none opacity-60" />
                  </div>
                ) : (
                  <div className="h-2 bg-gradient-to-r from-teal to-teal-light" />
                )}

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                        categoryColors[post.category] ?? 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-white mb-4 leading-tight group-hover:text-teal transition-colors flex-1 decoration-teal/0 group-hover:decoration-teal/30 underline underline-offset-4 decoration-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-teal text-xs font-bold flex items-center gap-2 tracking-wider uppercase group-hover:gap-3 transition-all">
                      Baca Selengkapnya
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
