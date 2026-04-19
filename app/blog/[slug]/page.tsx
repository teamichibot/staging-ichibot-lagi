import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Ichibot Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      ...(post.image ? { images: [post.image] } : {}),
    },
  }
}

const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-50 text-blue-700',
  AI: 'bg-purple-50 text-purple-700',
  'Case Study': 'bg-amber-50 text-amber-700',
  Tutorial: 'bg-green-50 text-green-700',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="pt-24 pb-24 md:pt-32 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-navy text-sm font-medium transition-colors"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'
              }`}
            >
              {post.category}
            </span>
            <span className="text-muted text-sm">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        <div className="border-t border-border mb-10" />

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-display prose-a:text-teal">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('## ')) {
              return <h2 key={i} className="font-display text-2xl font-bold text-navy mt-10 mb-4">{para.replace('## ', '')}</h2>
            }
            if (para.startsWith('### ')) {
              return <h3 key={i} className="font-display text-xl font-bold text-navy mt-8 mb-3">{para.replace('### ', '')}</h3>
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').filter(l => l.startsWith('- '))
              return (
                <ul key={i} className="list-disc list-inside text-navy/80 text-base leading-relaxed space-y-1.5 mb-5">
                  {items.map((item, j) => <li key={j}>{item.replace('- ', '')}</li>)}
                </ul>
              )
            }
            if (para.trim()) {
              return <p key={i} className="text-navy/80 text-base leading-relaxed mb-5">{para}</p>
            }
            return null
          })}
        </div>

        <div className="border-t border-border mt-16 pt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            Tertarik? Konsultasi Gratis
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
