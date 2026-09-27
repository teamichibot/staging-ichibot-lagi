import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

/**
 * Post bodies are GitHub-flavoured Markdown that may carry raw HTML (the admin
 * editor and its AI writer produce both). The old site rendered them with
 * rehype-raw then rehype-sanitize; this does the same with marked and
 * sanitize-html. HTML comments, such as Unsplash attributions, are dropped.
 */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { gfm: true, async: false })
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'video', 'source']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      video: ['src', 'controls', 'poster', 'width', 'height'],
      source: ['src', 'type'],
      th: ['align'],
      td: ['align'],
    },
    transformTags: {
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
      a: (tagName, attribs) =>
        /^https?:\/\//.test(attribs.href ?? '') && !attribs.href.includes('ichibot.id')
          ? { tagName, attribs: { ...attribs, target: '_blank', rel: 'noopener' } }
          : { tagName, attribs },
    },
  })
}

/**
 * Iframe embed for the video links the admin accepts (YouTube, TikTok,
 * Instagram), or null for anything else. TikTok and Instagram are portrait.
 */
export function videoEmbed(url: string): { src: string; portrait: boolean } | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, portrait: false }
  const tt = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/)
  if (tt) return { src: `https://www.tiktok.com/embed/v2/${tt[1]}`, portrait: true }
  const ig = url.match(/instagram\.com\/(reel|p)\/([\w-]+)/)
  if (ig) return { src: `https://www.instagram.com/${ig[1]}/${ig[2]}/embed`, portrait: true }
  return null
}
