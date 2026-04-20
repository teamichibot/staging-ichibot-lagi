import { NextResponse } from 'next/server'
import { getPostBySlugMerged } from '@/lib/blog'
import { validatePostContent } from '@/lib/content-guard'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const post = await getPostBySlugMerged(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const { title, date, category, excerpt, image, videoUrl, content } = await request.json()

  const blocked = validatePostContent({ title: title ?? '', excerpt: excerpt ?? '', content: content ?? '' })
  if (blocked) return NextResponse.json({ error: blocked }, { status: 422 })

  const { error } = await supabase.from('blog_posts').upsert({
    slug,
    title,
    date: date ?? '',
    category: category ?? '',
    excerpt: excerpt ?? '',
    image: image ?? '',
    video_url: videoUrl ?? '',
    content: content ?? '',
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  const { error } = await supabase.from('blog_posts').delete().eq('slug', slug)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/blog')
  return NextResponse.json({ ok: true })
}
