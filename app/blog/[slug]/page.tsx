export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getPostBySlugMerged } from '@/lib/blog'
import { VideoEmbed } from '@/components/blog/VideoEmbed'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { Metadata } from 'next'
import { getBlogPostingSchema } from '@/lib/seo'

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

  const title = `${post.title} | Blog Ichibot`
  const description = post.excerpt

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://ichibot.id/blog/${slug}`,
      publishedTime: post.date,
      authors: ['Ichibot Team'],
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  }
}


const categoryColors: Record<string, string> = {
  IoT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  AI: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Case Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Tutorial: 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlugMerged(slug)
  if (!post) notFound()

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  const blogSchema = getBlogPostingSchema(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="pt-24 pb-24 md:pt-32 bg-[#050A14] min-h-screen relative overflow-hidden">

      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-navy/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Navigation & Breadcrumbs */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Breadcrumbs items={breadcrumbs} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal text-sm font-bold transition-all group/back"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="rotate-180 transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <span
              className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                categoryColors[post.category] ?? 'bg-white/5 text-slate-400 border-white/10'
              }`}
            >
              {post.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-slate-400 text-sm font-medium">
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed font-medium opacity-90 max-w-3xl">
            {post.excerpt}
          </p>
        </div>

        {/* Hero Image */}
        {post.image && (
          <div className="mb-16 rounded-[2.5rem] overflow-hidden glass-3d-premium aspect-video animate-reveal opacity-0 shadow-2xl" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
            />
          </div>
        )}

        {/* Article Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '300ms' }}>
          <div className="lg:col-span-12">
            <article className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-display prose-headings:text-white prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
              prose-h3:text-2xl prose-h3:mt-10
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-8
              prose-li:text-slate-300 prose-li:mb-3
              prose-a:text-teal prose-a:no-underline hover:prose-a:text-teal-light transition-colors
              prose-strong:text-white prose-strong:font-bold
              prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:my-12
              prose-code:text-teal prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
              <ReactMarkdown 
                components={{
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="w-full rounded-[2rem] my-12 object-cover shadow-2xl border border-white/10" />
                  ),
                  h2: ({ children }) => <h2 className="text-3xl font-bold pt-10 mb-8 border-b border-white/10 pb-4 tracking-tight">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold pt-8 mb-6 tracking-tight">{children}</h3>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Video Embed */}
            {post.videoUrl && (
              <div className="mt-20 p-10 rounded-[2.5rem] glass-3d-premium">
                <p className="font-display font-bold text-white mb-8 text-2xl tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" /></svg>
                  </span>
                  Video Terkait
                </p>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <VideoEmbed url={post.videoUrl} />
                </div>
              </div>
            )}

            {/* CTA Footer */}
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 glass-3d-premium p-12 rounded-[2.5rem]">
              <div className="max-w-md">
                <p className="font-display text-2xl font-bold text-white mb-3">Siap untuk Inovasi?</p>
                <p className="text-slate-400 text-base leading-relaxed opacity-80">
                  Konsultasikan tantangan teknologi industri Anda dengan tim ahli Ichibot hari ini.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-teal hover:bg-teal-light text-navy font-bold px-10 py-5 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:-translate-y-1 text-base whitespace-nowrap group/cta"
              >
                Mulai Konsultasi Gratis
                <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}




