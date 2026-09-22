// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Server output, not static: content lives in Supabase and the admin panel has
// to publish changes live, with no rebuild step. See the amendments in CLAUDE.md.
export default defineConfig({
  site: 'https://www.ichibot.id',
  output: 'server',
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  image: {
    // Case-study photos live on Ichibot's own image host. They are 2 MB PNGs at
    // source, so they go through Astro's optimiser rather than straight into
    // the page.
    domains: ['img.ichibot.id'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
