import { Suspense } from 'react'
import { getAllPostsMerged } from '@/lib/blog'
import { BlogList } from '@/components/blog/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Ichibot',
  description: 'Insight dan update seputar IoT, AI, dan digitalisasi industri dari tim Ichibot.',
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
          <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-3xl" />}>
            <BlogList initialPosts={posts} />
          </Suspense>
        )}
      </div>
    </div>
  )
}


