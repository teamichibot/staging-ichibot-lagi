import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog'
import { validatePostContent } from '@/lib/content-guard'
import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const { title, date, category, excerpt, image, videoUrl, content } = await request.json()

  const blocked = validatePostContent({ title: title ?? '', excerpt: excerpt ?? '', content: content ?? '' })
  if (blocked) return NextResponse.json({ error: blocked }, { status: 422 })

  const frontmatter = [
    '---',
    `title: "${title}"`,
    `date: "${date}"`,
    `category: "${category}"`,
    `excerpt: "${excerpt}"`,
    image ? `image: "${image}"` : null,
    videoUrl ? `videoUrl: "${videoUrl}"` : null,
    '---',
  ].filter(Boolean).join('\n')

  const fileContent = `${frontmatter}\n\n${content ?? ''}`

  const candidates = [`${slug}.mdx`, `${slug}.md`]
  const filePath = candidates.map((c) => path.join(POSTS_DIR, c)).find((p) => fs.existsSync(p))
  if (!filePath) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  fs.writeFileSync(filePath, fileContent, 'utf8')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  const candidates = [`${slug}.mdx`, `${slug}.md`]
  const filePath = candidates.map((c) => path.join(POSTS_DIR, c)).find((p) => fs.existsSync(p))
  if (!filePath) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  fs.unlinkSync(filePath)
  revalidatePath('/blog')
  return NextResponse.json({ ok: true })
}
