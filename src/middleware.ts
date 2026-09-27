import { defineMiddleware } from 'astro:middleware'

/**
 * Two things for every server-rendered page:
 *
 * 1. One URL per page. `/about/` and `/about` both rendered, which splits
 *    ranking between two addresses; a trailing slash now 308-redirects to the
 *    bare path (query kept). The root stays `/`.
 *
 * 2. CDN caching. Pages read Supabase on every request, which made the server
 *    response 0.3–1.2 s and exposed visitors to cold starts. Successful HTML
 *    GETs are now cached at Vercel's edge for five minutes and served stale
 *    while revalidating, so an admin edit shows up within about five minutes.
 *    Form posts, redirects and non-HTML responses are left alone.
 */
const PAGE_CACHE = 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400'
const NOT_FOUND_CACHE = 'public, max-age=0, s-maxage=60'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return context.redirect(pathname.replace(/\/+$/, '') + search, 308)
  }

  const response = await next()
  if (context.request.method !== 'GET') return response
  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('text/html')) return response
  if (response.status === 200) response.headers.set('Cache-Control', PAGE_CACHE)
  else if (response.status === 404) response.headers.set('Cache-Control', NOT_FOUND_CACHE)
  return response
})
