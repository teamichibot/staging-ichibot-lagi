export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { getAllPosts, getPostBySlugMerged } from '@/lib/blog'
import { VideoEmbed } from '@/components/blog/VideoEmbed'
import type { Metadata } from 'next'
import { getBlogPostingSchema } from '@/lib/seo'

// Keep HTML comments (e.g. Unsplash attribution) as invisible comments in
// the rendered output instead of stripping or leaking them as text.
const sanitizeSchema = { ...defaultSchema, allowComments: true }

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
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlugMerged(slug)
  if (!post) notFound()

  const blogSchema = getBlogPostingSchema(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="bg-white">

        {/* Header */}
        <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Blog
            </Link>

            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6 text-xs">
                <span className="font-semibold text-brand uppercase">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-ink/20" />
                <span className="text-ink/55 font-medium">
                  {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.05] mb-6">
                {post.title}
              </h1>
              <p className="text-ink/65 text-lg md:text-xl leading-relaxed">{post.excerpt}</p>
            </div>
          </div>
        </section>

        {/* Hero image */}
        {post.image && (
          <section className="bg-white pb-16 md:pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        )}

        {/* Body */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <article className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-ink prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-ink/75 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-ink/75 prose-li:mb-2
              prose-a:text-brand prose-a:no-underline hover:prose-a:text-brand-dark hover:prose-a:underline
              prose-strong:text-ink prose-strong:font-bold
              prose-img:rounded-2xl prose-img:my-10
              prose-code:text-brand prose-code:bg-off-white prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-brand prose-blockquote:text-ink/75 prose-blockquote:not-italic
              prose-hr:border-black/10 prose-hr:my-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
                components={{
                  // eslint-disable-next-line @next/next/no-img-element
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="w-full rounded-2xl my-10 object-cover" />
                  ),
                  h2: ({ children }) => <h2 className="text-3xl font-bold pt-10 mb-6 tracking-tight text-ink">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold pt-8 mb-4 tracking-tight text-ink">{children}</h3>,
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 my-6 space-y-2 text-ink/75">{children}</ol>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 my-6 space-y-2 text-ink/75">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-2xl border border-black/8">
                      <table className="w-full text-sm border-collapse">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-off-white">{children}</thead>,
                  tbody: ({ children }) => <tbody className="divide-y divide-black/8">{children}</tbody>,
                  tr: ({ children }) => <tr>{children}</tr>,
                  th: ({ children }) => (
                    <th className="text-left px-5 py-3 font-semibold text-ink text-[13px] uppercase">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-5 py-3 text-ink/75 align-top">{children}</td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Video embed */}
            {post.videoUrl && (
              <div className="mt-16 bg-off-white rounded-2xl p-6 md:p-8">
                <p className="font-display font-bold text-ink text-lg mb-5 tracking-tight">Video Terkait</p>
                <div className="rounded-xl overflow-hidden">
                  <VideoEmbed url={post.videoUrl} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="relative bg-brand rounded-3xl px-8 py-16 md:px-16 md:py-20 text-white text-center overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4 max-w-2xl mx-auto">
                  Siap untuk inovasi?
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  Konsultasikan tantangan teknologi industri Anda dengan tim ahli Ichibot hari ini.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white hover:bg-white/95 text-brand font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[200px] text-center"
                >
                  Mulai Konsultasi Gratis
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
