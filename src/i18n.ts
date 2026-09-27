/**
 * Two languages: English at the root (the default, so existing URLs keep
 * working) and Bahasa Indonesia under /id. The language comes from the URL
 * alone, so any component can read it with langFromUrl(Astro.url) without
 * threading props. Astro's own i18n middleware is not used: its default-
 * locale redirects fight the site's other routes (/admin, /client-logo, 404).
 */
export type Lang = 'en' | 'id'
export const LANGS: Lang[] = ['en', 'id']

const isId = (pathname: string) => pathname === '/id' || pathname.startsWith('/id/')

export const langFromUrl = (url: URL): Lang => (isId(url.pathname) ? 'id' : 'en')

/** The English path of any page URL: `/id/blog/x` → `/blog/x`. */
export const basePath = (pathname: string) => (isId(pathname) ? pathname.slice(3) || '/' : pathname)

/** An English path (`/blog`, `/#products`) in the given language. */
export function localize(path: string, lang: Lang): string {
  if (lang === 'en') return path
  if (path === '/') return '/id'
  if (path.startsWith('/#')) return `/id${path.slice(1)}`
  return path.startsWith('/') ? `/id${path}` : path
}

/** Pick the current language's value from an `{ en, id }` pair. */
export const pick = <T>(lang: Lang, pair: { en: T; id: T }): T => pair[lang]

export const dateLocale = (lang: Lang) => (lang === 'id' ? 'id-ID' : 'en-GB')
