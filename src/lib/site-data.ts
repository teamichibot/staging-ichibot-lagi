import { supabase } from './supabase'

/**
 * Reads one key of the `site_data` table: the same key/value store the old
 * site's admin panel (ichibot.id/admin) writes to. Pages that render from it
 * therefore show edits made in that admin without a rebuild. Falls back to
 * `fallback` when the key is missing or the query fails, so a database outage
 * degrades a section rather than breaking the page.
 */
export async function readSiteData<T>(key: string, fallback: T): Promise<T> {
  const { data, error } = await supabase.from('site_data').select('value').eq('key', key).single()
  if (error) {
    console.error(`[site-data] ${key}:`, error.message)
    return fallback
  }
  return (data?.value as T) ?? fallback
}

export type ClientLogo = { id: string; name: string; logo: string }
export type Clients = { industry: ClientLogo[]; academic: ClientLogo[] }

/** Client logos as managed under Admin → Logo Klien. Rows without a logo URL are skipped. */
export async function getClientLogos(): Promise<ClientLogo[]> {
  const clients = await readSiteData<Clients>('clients', { industry: [], academic: [] })
  return (clients.industry ?? []).filter((c) => c.logo && /^https?:\/\//.test(c.logo))
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string | null
}

/** Latest posts from `blog_posts`, the table the admin blog editor writes to. */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, date, category, excerpt, image')
    .order('date', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('[site-data] blog_posts:', error.message)
    return []
  }
  return (data ?? []) as BlogPost[]
}
