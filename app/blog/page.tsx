import { Suspense } from 'react'
import Link from 'next/link'
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
    <main className="bg-white">

      {/* Hero header */}
      <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Beranda
          </Link>

          <div className="mt-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.05]">
              Insight & Update
            </h1>
            <p className="text-ink/55 text-lg md:text-xl leading-relaxed mt-6">
              Artikel seputar IoT, AI, dan digitalisasi industri dari tim ahli Ichibot.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {posts.length === 0 ? (
            <div className="py-24 text-center bg-white rounded-2xl">
              <p className="text-ink/55 font-medium">Belum ada artikel yang diterbitkan.</p>
            </div>
          ) : (
            <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-2xl" />}>
              <BlogList initialPosts={posts} />
            </Suspense>
          )}
        </div>
      </section>

    </main>
  )
}
