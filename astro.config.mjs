// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

// Server output, not static: content lives in Supabase and the admin panel has
// to publish changes live, with no rebuild step. See the amendments in CLAUDE.md.
export default defineConfig({
  site: 'https://www.ichibot.id',
  output: 'server',
  adapter: vercel(),
  // No @astrojs/sitemap: pages render on the server, so src/pages/sitemap.xml.ts
  // builds the sitemap (pages and posts, both languages) per request.
  integrations: [mdx()],
  image: {
    // Case-study photos live on Ichibot's own image host. They are 2 MB PNGs at
    // source, so they go through Astro's optimiser rather than straight into
    // the page. Blog thumbnails also come from Unsplash and Pinterest; those
    // are resized and re-encoded too (see components/PostImage.astro).
    domains: ['img.ichibot.id', 'images.unsplash.com', 'i.pinimg.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
