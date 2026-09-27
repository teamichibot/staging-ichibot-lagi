import type { APIRoute } from 'astro'
import { getClientLogos } from '../../lib/site-data'

/**
 * Serves a client logo from our own origin. Logos in Admin → Logo Klien
 * point at a dozen third-party hosts; hotlinked straight from the page some
 * of them rate-limit (Wikimedia answers 429) or block, and a phone would open
 * a connection to each. This fetches the one logo whose id is in the list,
 * so it is not an open proxy, and lets Vercel's CDN cache it for a day.
 */
export const GET: APIRoute = async ({ params }) => {
  const logo = (await getClientLogos()).find((c) => c.id === params.id)
  if (!logo) return new Response('Not found', { status: 404 })

  try {
    const upstream = await fetch(logo.logo, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; IchibotSite/1.0; +https://www.ichibot.id)' },
      signal: AbortSignal.timeout(8000),
    })
    const type = upstream.headers.get('content-type') ?? ''
    if (!upstream.ok || !type.startsWith('image/')) return new Response('Upstream error', { status: 502 })
    return new Response(upstream.body, {
      headers: {
        'content-type': type,
        'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        // an SVG served from our origin must not be able to run script
        'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        'x-content-type-options': 'nosniff',
      },
    })
  } catch {
    return new Response('Upstream timeout', { status: 504 })
  }
}
