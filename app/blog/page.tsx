import Link from 'next/link'
import { getAllPostsMerged } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Ichibot',
  description: 'Insight dan update seputar IoT, AI, dan digitalisasi industri dari tim Ichibot.',
}

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-50 text-blue-700',
  AI: 'bg-purple-50 text-purple-700',
  'Case Study': 'bg-amber-50 text-amber-700',
  Tutorial: 'bg-green-50 text-green-700',
}

export default async function BlogPage() {
  const posts = await getAllPostsMerged()

  return (
    <div className="pt-24 pb-24 md:pt-32 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">Blog</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2 mb-3">
            Insight & Update
          </h1>
          <p className="text-muted text-lg">
            Artikel seputar IoT, AI, dan digitalisasi industri dari tim Ichibot.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-border hover:border-teal/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                {post.image ? (
                  <div className="relative w-full h-48 overflow-hidden bg-navy/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="h-1.5 bg-gradient-to-r from-teal to-teal-light" />
                )}

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-muted text-xs">
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="font-display text-base font-bold text-navy mb-3 leading-snug group-hover:text-teal transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <span className="text-teal text-sm font-semibold flex items-center gap-1.5">
                    Baca Selengkapnya
                    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
