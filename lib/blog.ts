import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { supabase } from './supabase'

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  videoUrl: string
}

export interface Post extends PostMeta {
  content: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  return files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        category: data.category ?? '',
        excerpt: data.excerpt ?? '',
        image: data.image ?? '',
        videoUrl: data.videoUrl ?? '',
      } satisfies PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getAllPostsMerged(): Promise<PostMeta[]> {
  const mdxPosts = getAllPosts()
  const { data: dbRows } = await supabase
    .from('blog_posts')
    .select('slug, title, date, category, excerpt, image, video_url')
    .order('date', { ascending: false })
  const dbPosts: PostMeta[] = (dbRows ?? []).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date ?? '',
    category: p.category ?? '',
    excerpt: p.excerpt ?? '',
    image: p.image ?? '',
    videoUrl: p.video_url ?? '',
  }))
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const uniqueMdx = mdxPosts.filter((p) => !dbSlugs.has(p.slug))
  return [...dbPosts, ...uniqueMdx].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlugMerged(slug: string): Promise<Post | null> {
  const mdx = getPostBySlug(slug)
  if (mdx) return mdx
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).single()
  if (!data) return null
  return {
    slug: data.slug,
    title: data.title,
    date: data.date ?? '',
    category: data.category ?? '',
    excerpt: data.excerpt ?? '',
    image: data.image ?? '',
    videoUrl: data.video_url ?? '',
    content: data.content ?? '',
  }
}

export function getPostBySlug(slug: string): Post | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`]
  for (const candidate of candidates) {
    const filePath = path.join(POSTS_DIR, candidate)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        category: data.category ?? '',
        excerpt: data.excerpt ?? '',
        image: data.image ?? '',
        videoUrl: data.videoUrl ?? '',
        content,
      }
    }
  }
  return null
}
