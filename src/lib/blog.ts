import { supabase } from './supabase'

/**
 * Blog posts, read the way the old site read them: rows of `blog_posts` (the
 * table the admin blog editor writes to) merged with the Markdown files in
 * `content/blog/`. A database row wins over a file with the same slug, so a
 * post edited in the admin shows the edit. Both sources hold Markdown bodies.
 */

export type PostMeta = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  videoUrl: string
}

export type Post = PostMeta & { content: string }

const files = import.meta.glob<string>('/content/blog/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Frontmatter here is flat `key: "value"` lines, so a full YAML parser is not needed. */
function parseFile(path: string, raw: string): Post {
  const slug = path.split('/').pop()!.replace(/\.mdx?$/, '')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const data: Record<string, string> = {}
  for (const line of (match?.[1] ?? '').split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) data[kv[1]] = kv[2].trim().replace(/^(["'])(.*)\1$/, '$2')
  }
  return {
    slug,
    title: data.title || slug,
    date: data.date ?? '',
    category: data.category ?? '',
    excerpt: data.excerpt ?? '',
    image: data.image ?? '',
    videoUrl: data.videoUrl ?? '',
    content: match?.[2] ?? raw,
  }
}

const filePosts: Post[] = Object.entries(files).map(([path, raw]) => parseFile(path, raw))

type Row = {
  slug: string
  title: string
  date: string | null
  category: string | null
  excerpt: string | null
  image: string | null
  video_url: string | null
  content?: string | null
}

const fromRow = (r: Row): Post => ({
  slug: r.slug,
  title: r.title,
  date: r.date ?? '',
  category: r.category ?? '',
  excerpt: r.excerpt ?? '',
  image: r.image ?? '',
  videoUrl: r.video_url ?? '',
  content: r.content ?? '',
})

const byDateDesc = (a: PostMeta, b: PostMeta) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

/** Every post, newest first. A database outage leaves the Markdown posts rather than an empty list. */
export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, date, category, excerpt, image, video_url')
  if (error) console.error('[blog] blog_posts:', error.message)
  const dbPosts = ((data ?? []) as Row[]).map(fromRow)
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  return [...dbPosts, ...filePosts.filter((p) => !dbSlugs.has(p.slug))]
    .map(({ content: _, ...meta }) => meta)
    .sort(byDateDesc)
}

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle()
  if (error) console.error('[blog] blog_posts:', error.message)
  if (data) return fromRow(data as Row)
  return filePosts.find((p) => p.slug === slug) ?? null
}

export const formatDate = (d: string, lang: 'en' | 'id' = 'en') =>
  d ? new Date(d).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

/** Stock photo the old site showed for posts without an image. */
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
