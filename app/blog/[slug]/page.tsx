export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getPostBySlugMerged } from '@/lib/blog'
import { VideoEmbed } from '@/components/blog/VideoEmbed'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlugMerged(slug)
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
  const post = await getPostBySlugMerged(slug)
  if (!post) notFound()

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  return (
    <div className="pt-24 pb-24 md:pt-32 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation & Breadcrumbs */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Breadcrumbs items={breadcrumbs} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-navy text-sm font-medium transition-colors"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="rotate-180">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'
              }`}
            >
              {post.category}
            </span>
            <span className="text-muted text-sm font-medium">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy leading-[1.15] mb-6">
            {post.title}
          </h1>
          <p className="text-muted text-xl leading-relaxed font-medium opacity-80">
            {post.excerpt}
          </p>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="mb-14 rounded-[2rem] overflow-hidden shadow-2xl shadow-navy/5 aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
            />
          </div>
        )}

        {/* Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12">
            <div className="prose prose-slate prose-lg max-w-none 
              prose-headings:font-display prose-headings:text-navy prose-headings:font-bold
              prose-p:text-navy/80 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-navy/80 prose-li:mb-2
              prose-a:text-teal prose-a:no-underline hover:prose-a:underline
              prose-strong:text-navy prose-strong:font-bold
              prose-img:rounded-2xl prose-img:shadow-lg">
              <ReactMarkdown 
                components={{
                  // Custom rendering for headings and images if needed
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="w-full rounded-2xl my-10 object-cover shadow-xl border border-navy/5" />
                  ),
                  h2: ({ children }) => <h2 className="text-3xl font-bold pt-10 mb-6 border-b border-navy/5 pb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold pt-6 mb-4">{children}</h3>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Video Embed */}
            {post.videoUrl && (
              <div className="mt-20 p-8 rounded-3xl bg-navy/2 border border-navy/5">
                <p className="font-display font-bold text-navy mb-6 text-xl">Video Terkait</p>
                <VideoEmbed url={post.videoUrl} />
              </div>
            )}

            {/* CTA Footer */}
            <div className="mt-20 pt-10 border-t border-navy/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-navy/[0.02] p-10 rounded-3xl">
              <div>
                <p className="font-display text-xl font-bold text-navy mb-1">Siap untuk Inovasi?</p>
                <p className="text-muted text-sm">Konsultasikan kebutuhan teknologi industri Anda dengan tim ahli kami.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-navy font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1 text-sm whitespace-nowrap"
              >
                Mulai Konsultasi Gratis
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
