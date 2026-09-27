import type { APIRoute } from 'astro'
import { getAllPosts } from '../lib/blog'

/**
 * Blog posts live in Supabase, so @astrojs/sitemap (which only sees routes
 * known at build time) cannot list them. This sitemap is built per request
 * and is referenced from robots.txt next to the generated sitemap-index.xml.
 */
export const GET: APIRoute = async ({ site }) => {
  const posts = await getAllPosts()
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const urls = [
    `<url><loc>${new URL('/blog', site)}</loc></url>`,
    ...posts.map((p) => {
      const lastmod = /^\d{4}-\d{2}-\d{2}/.test(p.date) ? `<lastmod>${p.date.slice(0, 10)}</lastmod>` : ''
      return `<url><loc>${esc(new URL(`/blog/${p.slug}`, site).href)}</loc>${lastmod}</url>`
    }),
  ]
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } },
  )
}
