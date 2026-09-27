import type { APIRoute } from 'astro'
import { getClientLogos } from '../../lib/site-data'

/**
 * Serves a client logo from our own origin. Logos in Admin → Logo Klien
 * point at a dozen third-party hosts; hotlinked straight from the page some
 * of them rate-limit (Wikimedia answers 429) or block, and a phone would open
 * a connection to each. This fetches the one logo whose id is in the list,
 * so it is not an open proxy, and lets Vercel's CDN cache it.
 *
 * Client sites are slow or down now and then (a CBU logo timed out on
 * 2026-09-28 and logged a 504 on the homepage). A fetched logo is therefore
 * kept for a week and served stale for up to 30 days while it revalidates,
 * so the client's server is rarely asked and an outage there does not reach
 * the page. Failures are never cached.
 */
const LOGO_CACHE = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000'
const NO_CACHE = { 'cache-control': 'no-store' }
export const GET: APIRoute = async ({ params }) => {
  const logo = (await getClientLogos()).find((c) => c.id === params.id)
  if (!logo) return new Response('Not found', { status: 404 })

  try {
    const upstream = await fetch(logo.logo, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; IchibotSite/1.0; +https://www.ichibot.id)' },
      signal: AbortSignal.timeout(8000),
    })
    const type = upstream.headers.get('content-type') ?? ''
    if (!upstream.ok || !type.startsWith('image/')) return new Response('Upstream error', { status: 502, headers: NO_CACHE })
    return new Response(upstream.body, {
      headers: {
        'content-type': type,
        'cache-control': LOGO_CACHE,
        // an SVG served from our origin must not be able to run script
        'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        'x-content-type-options': 'nosniff',
      },
    })
  } catch {
    return new Response('Upstream timeout', { status: 504, headers: NO_CACHE })
  }
}
