import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
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
      } satisfies PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
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
        content,
      }
    }
  }
  return null
}
