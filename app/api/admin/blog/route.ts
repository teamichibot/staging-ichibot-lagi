import { NextResponse } from 'next/server'
import { getAllPostsMerged } from '@/lib/blog'
import { validatePostContent } from '@/lib/content-guard'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const posts = await getAllPostsMerged()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const { slug, title, date, category, excerpt, image, videoUrl, content } = await request.json()

  if (!slug || !title) {
    return NextResponse.json({ error: 'slug dan title wajib diisi' }, { status: 400 })
  }

  const blocked = validatePostContent({ title, excerpt: excerpt ?? '', content: content ?? '' })
  if (blocked) return NextResponse.json({ error: blocked }, { status: 422 })

  const { error: existsError, data: existing } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('slug', slug)
    .single()

  if (!existsError && existing) {
    return NextResponse.json({ error: 'Slug sudah dipakai' }, { status: 409 })
  }

  const { error } = await supabase.from('blog_posts').insert({
    slug,
    title,
    date: date ?? '',
    category: category ?? '',
    excerpt: excerpt ?? '',
    image: image ?? '',
    video_url: videoUrl ?? '',
    content: content ?? '',
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}
