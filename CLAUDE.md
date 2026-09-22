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

@AGENTS.md
