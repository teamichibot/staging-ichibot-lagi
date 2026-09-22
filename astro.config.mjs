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
  vite: {
    plugins: [tailwindcss()],
  },
})
