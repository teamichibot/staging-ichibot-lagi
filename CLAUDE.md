# Ichibot Website — Project Brief

## Context
Company website for **Ichibot** (PT Gagas Anagata Semesta), an Indonesian AIoT company in Yogyakarta.
Positioning: **"Intelligent industrial hub"**. Target visitors: plant managers, engineering, HSE and maintenance teams at BUMN and manufacturers.

Visual reference: `reference/ichibot-website-draft.html` (approved draft layout). Rebuild it as a production site; keep the layout, copy, interactions and design tokens.

## Stack
- **Astro** + TypeScript (content-heavy marketing site, static output, fast)
- **Tailwind CSS** with design tokens as CSS variables (light + dark via `prefers-color-scheme`)
- Interactive parts (product tabs, deployment toggle, hub animation) as small islands, vanilla TS or Preact
- Content in **Astro content collections** (Markdown/MDX): `products`, `case-studies`, `blog`, `faq`
- Font: Geist (self-hosted via `@fontsource-variable/geist`)
- Deploy target: static hosting (Vercel / Cloudflare Pages)

## Design direction
Linear / Vercel polish + Stripe-style explanatory diagrams. Ichibot identity via amber accent.

| Token | Light | Dark |
|---|---|---|
| bg | #FBFBFC | #08090B |
| bg2 | #F2F3F5 | #0E1014 |
| panel | #FFFFFF | #121419 |
| text | #121418 | #EDEEF0 |
| muted | #5E6470 | #8A8F98 |
| border | rgba(18,20,24,.10) | rgba(255,255,255,.08) |
| accent (amber) | #E89A0C | #F7B32B |
| live (teal) | #0FA38C | #2DD4BF |

Rules: 1px borders, radius 10–16px, pill buttons, subtle grid background in hero, radial amber glow behind hero visual and CTA. One orchestrated page-load animation only; respect `prefers-reduced-motion`. No all-caps labels, no gradient decorations beyond the hero headline and glows.

## Page structure (home)
1. **Hero** — chip "Running at Pertamina and Toyota Indonesia", H1 "Intelligent industrial hub", tagline, CTAs (Book a site survey / Explore products), animated hub diagram in a window frame (sources → Ichibot Edge → dashboard, ERP/MES, alerts, AI insights).
2. **Client logos** — Pertamina, Toyota, Citra Borneo Utama, Erlangga, PT Garam (monochrome SVG).
3. **Products** — tabbed interface, 5 products from the `products` collection. Each: name, description, what's included, "Proven at" client list, deployment time, dashboard mockup/screenshot.
   - Smart energy usage monitoring — Toyota (2 MVA transformer), Erlangga (substation)
   - AI Vision Box — Pertamina (PPE detection, PPE + oil spill)
   - Smart equipment monitoring — Toyota (Kaeser compressor), Pertamina (vehicle tilt & pitch), PT Garam (main pump)
   - Marine safety monitoring — Pertamina (docking early warning, wind & wave)
   - Smart plantation — **Pilot** badge, oil palm LoRa soil monitoring (on-going)
4. **Platform** — bento grid: dashboard visualization, ERP integration (Weighbridge → Edge → ERP, Citra Borneo Utama), on-prem/cloud/hybrid toggle, protocol chips.
5. **Industries** — pill links: oil & gas and energy, automotive, agribusiness, printing & publishing, port & marine, salt & mining.
6. **Why Ichibot** — 4 columns: proven at scale, works with old machines, global capability local price, engineers who show up.
7. **Case studies** — 3 cards with client quote inside: Pertamina PPE detection, Citra Borneo weighbridge ERP, Toyota compressor monitoring. Link to all projects.
8. **Services + How we work** — installation, in-house training, custom integration, maintenance; 3 steps: site survey → pilot on one line → scale up.
9. **Blog** — latest 3 posts from `blog` collection.
10. **FAQ** — accordion from `faq` collection, placed right before CTA.
11. **CTA** — "Tell us about your plant", Book a site survey + WhatsApp.
12. **Footer** — products, company, ecosystem (Ichibot Store, Ichibot Robotics), legal.

## Additional pages
- `/products/[slug]` — product detail
- `/case-studies` and `/case-studies/[slug]` — includes non-highlight projects (DoConnect, UV Disinfectant Robot, etc.)
- `/blog` and `/blog/[slug]`
- `/contact` — site survey form (name, company, industry, phone/WA, message)

## Requirements
- Responsive down to 360px; product tabs become horizontal scroll on mobile
- Accessible: keyboard nav on tabs (arrow keys), visible focus, ARIA roles, alt text
- SEO: meta tags, Open Graph, sitemap, JSON-LD Organization
- Lighthouse ≥ 90 on all categories
- Language: English first, structure ready for Bahasa Indonesia (i18n routing `/id/...`)

## Open items (do not invent — leave clear placeholders)
- Deployment time per product
- Real client quotes (name, title) for case studies
- Result numbers per case study
- Monochrome client logo files + written permission per client
- Real dashboard screenshots (Klenik / Ichiboard) to replace mockups
- Final protocol list matching the edge computer at launch
- Office address, email, WhatsApp number, social links

## Amendments (decided 2026-09-22, these override the sections above)

The brief originally specified static output with all content in Astro content
collections. That is **not** what we are building. Ichibot needs the admin panel
it already has, so:

- **Astro server output** via `@astrojs/vercel`, not a pure static build.
  Marketing pages are prerendered where they can be; anything reading live data
  and the whole admin area render on the server.
- **Supabase stays the single source of truth** for blog posts, products,
  services, clients and team — same `site_data` key/value table and `blog_posts`
  table the old site uses. Content collections are *not* used for these.
- **The admin panel is ported** from the old Next.js site: cookie `admin_token`
  checked against `ADMIN_PASSWORD`, login page, list/edit/reorder/save screens,
  and JSON endpoints under `/api/admin/*`. Editing must stay login → edit →
  save → live, with no rebuild step.
- **Migration runs into Supabase, not out of it.** The 24 Markdown posts in
  `content/blog/` are imported into the `blog_posts` table so there is one
  source. All 183 existing posts are kept; the 23-way category list gets
  consolidated during the import.
- **Old product URLs are dropped**, not redirected. The 12 current products are
  consolidated into the 5 in this brief and the old `/produk/[slug]` paths are
  allowed to 404.
- **The accent is Ichibot blue, not amber.** The brief and the draft both use
  amber; that is overridden. `--accent` is `#0369A1` in light and `#38BDF8`
  (the sky-400 the old site already used) in dark, picked so small text clears
  4.5:1 on each background. `--on-accent` now differs per theme — white on the
  light accent, `#08090B` on the dark one — because a single value fails one
  of them. The draft file still renders amber and is not being repainted; it
  is the reference for layout and interaction, not for accent colour.
- Language stays **English-first** as specified, with `/id/...` to follow.

Everything else in this brief — layout, design tokens, page structure,
accessibility, SEO and the "do not invent" list — still stands.

@AGENTS.md
