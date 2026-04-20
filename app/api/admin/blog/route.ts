import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { validatePostContent } from '@/lib/content-guard'
import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const { slug, title, date, category, excerpt, image, videoUrl, content } = await request.json()

  if (!slug || !title) {
    return NextResponse.json({ error: 'slug dan title wajib diisi' }, { status: 400 })
  }

  const blocked = validatePostContent({ title, excerpt: excerpt ?? '', content: content ?? '' })
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
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Slug sudah dipakai' }, { status: 409 })
  }

  fs.writeFileSync(filePath, fileContent, 'utf8')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}
