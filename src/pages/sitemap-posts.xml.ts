import type { APIRoute } from 'astro'
import { getAllPosts } from '../lib/blog'
import { localize } from '../i18n'

/**
 * The site's pages and every blog post, in both languages, with hreflang
 * alternates. Pages render on the server and posts live in Supabase, so
 * @astrojs/sitemap (which only sees routes known at build time) cannot list
 * them; this is built per request and referenced from robots.txt.
 */
export const GET: APIRoute = async ({ site }) => {
  const posts = await getAllPosts()
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const abs = (path: string) => esc(new URL(path, site).href)
  const entry = (path: string, lastmod?: string) => {
    const alternates = (['en', 'id'] as const)
      .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(localize(path, l))}"/>`)
      .join('')
    const mod = lastmod && /^\d{4}-\d{2}-\d{2}/.test(lastmod) ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''
    return (['en', 'id'] as const).map((l) => `<url><loc>${abs(localize(path, l))}</loc>${mod}${alternates}</url>`).join('')
  }
  const urls = [
    ...['/', '/about', '/contact', '/blog'].map((p) => entry(p)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.date)),
  ]
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } },
  )
}
