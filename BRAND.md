# Ichibot Visual Brand Guidelines

A practical reference for any new Ichibot-family project. Built around the Apple-minimalist aesthetic used on ichibot.id — white surfaces, brand-navy accents, system typography.

> Bahasa: dokumen ini ditulis dalam bahasa teknis (EN). Tokennya bisa dipakai untuk project bahasa apapun.

---

## 1. Brand

| | |
|---|---|
| **Name** | Ichibot |
| **Parent entity** | PT. GASGAS ANAGATA SEMESTA |
| **Logo** | `/logos/logo.svg` — use `brightness-0` for solid black, `brightness-0 invert` for white |
| **Voice** | Practical, technical, no buzzwords. Lead with concrete outcomes ("Pasang sensor di mesin existing") not abstractions ("Transformasi digital holistik"). |
| **Languages** | ID + EN, both equal-priority. Always provide bilingual content where possible. |

---

## 2. Colors

```
--color-brand:        #003459    /* primary navy — buttons, footer, CTA card, accent fills */
--color-brand-dark:   #002440    /* hover for primary buttons */
--color-ink:          #1D1D1F    /* primary text on light surfaces */
--color-off-white:    #F5F5F7    /* secondary surface — alternating section bg */
--color-surface:      #FFFFFF    /* primary surface */
```

### Usage

| Token | Where |
|---|---|
| `bg-brand` | Primary CTA card backdrop, footer, "Smart Choice" comparison card, footer of dark surfaces |
| `text-brand` | Section eyebrows (when used), brand-color "see all →" links, icon tiles `bg-brand/10 text-brand` |
| `text-ink` | Headings, body text |
| `text-ink/55` | Muted body text, captions |
| `text-ink/65` / `text-ink/75` | Comparison card body, blog body text |
| `text-ink/40` | De-emphasized labels, table headers |
| `bg-white` | Primary surface, light cards on off-white sections |
| `bg-off-white` | Alternating section backgrounds for visual rhythm |
| `border-black/8` | Default card border |
| `border-black/10` / `border-black/12` | Form inputs, slightly heavier borders |

### Status colors

```
emerald-50 / emerald-200 / emerald-700   /* "smart choice", success */
red-50    / red-200    / red-700         /* error states, destructive actions */
```

Avoid using more accent colors. Brand-navy + emerald (success) + red (error) is the entire palette.

---

## 3. Typography

```
--font-display: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-sans:    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

System fonts only. No Google Fonts. The site picks up Apple SF Pro / Windows Segoe UI / Linux fallback automatically.

### Scale

| Use | Class |
|---|---|
| Hero headline (H1, page title) | `font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]` |
| Section heading (H2) | `font-display text-4xl md:text-5xl font-bold tracking-tight` |
| Subsection / card heading (H3 large) | `font-display text-2xl font-bold tracking-tight` |
| Card heading (H3 default) | `font-display text-xl md:text-2xl font-bold tracking-tight` |
| Card heading (H3 compact) | `font-display text-lg font-bold tracking-tight` |
| Body large (subhead) | `text-lg md:text-xl leading-relaxed text-ink/55` |
| Body | `text-[15px] md:text-base leading-relaxed text-ink/65` |
| Caption / meta | `text-sm text-ink/55` |
| Label | `text-xs font-semibold text-ink/55` |

### Tracking

- Use `tracking-tight` on **display headings only** (`font-display` items at `text-2xl` and above).
- **Avoid** `tracking-wide`, `tracking-wider`, `tracking-widest` — they create the dated "spaced uppercase" look that doesn't fit the aesthetic.
- Lowercase or sentence case is preferred over UPPERCASE labels.

### Weights

`font-medium` (500) for nav links and small UI text. `font-semibold` (600) for buttons and emphasized labels. `font-bold` (700) for headings only.

---

## 4. Spacing & layout

### Container

```html
<div class="max-w-7xl mx-auto px-6 md:px-10">…</div>
```

Every section uses `max-w-7xl` (1280px) with `px-6 md:px-10` (24px / 40px). The navbar uses `max-w-[1400px]` for slightly wider chrome — referenceable via `(100vw-1400px)/2+40px` math when aligning carousel arrows or full-bleed elements to the navbar logo.

### Section vertical rhythm

| Section type | Padding |
|---|---|
| Standard section | `py-20 md:py-28` |
| Tight strip (logo marquee) | `py-4 md:py-6` |
| Header → content gap (centered) | `mb-16 md:mb-20` |
| Header → content gap (with right-aligned link) | `pb-10 md:pb-12` |
| Carousel section | `pt-20 md:pt-28` (header) + `pb-20 md:pb-28` (pagination) |

### Internal spacing

- Card padding: `p-6 md:p-8` (default) or `p-7 md:p-8` (more breathing room)
- Stack gap: `space-y-3` (tight list), `space-y-5` (form), `space-y-10` (sections)
- Grid gap: `gap-4 md:gap-5` for card grids, `gap-x-12` between paired columns

---

## 5. Border radius

| Element | Radius |
|---|---|
| Image cards (Tesla-style) | `rounded-2xl` (16px) |
| Section wrapper cards (CTA, HowItWorks) | `rounded-3xl` (24px) |
| Buttons (primary CTA) | `rounded-sm` (2px) — rectangle, Tesla-style |
| Pills (filter, badge) | `rounded-full` |
| Form inputs | `rounded-xl` (12px) or `rounded-full` (search) |
| Icon tiles | `rounded-xl` (12px) or `rounded-full` (status badge) |

Never use `rounded-md` arbitrarily — choose `rounded-sm` for sharp/serious or `rounded-2xl` for soft/friendly.

---

## 6. Components

### Buttons

**Primary on light surface**
```html
<a class="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center">
  Konsultasi
</a>
```

**Secondary on light surface**
```html
<a class="bg-white/90 hover:bg-white text-ink font-semibold px-7 py-2.5 rounded-sm transition-colors text-sm min-w-[150px] text-center">
  Pelajari
</a>
```

**Primary on dark/brand surface**
```html
<a class="bg-white hover:bg-white/95 text-brand font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[180px] text-center">
  Konsultasi Gratis
</a>
```

**Glass secondary on dark**
```html
<a class="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3 rounded-sm transition-colors text-sm">
  Hubungi Kami
</a>
```

**Inline brand link** (use for "see all →" or contextual links)
```html
<a class="text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
  Lihat semua produk →
</a>
```

### Cards

**Tesla-style image card** (used for products, services, case studies, blog posts)
```html
<div class="relative overflow-hidden rounded-2xl bg-black"
     style="height: min(60vh, 600px); min-height: 440px;">
  <img class="absolute inset-0 w-full h-full object-cover" src="…" alt="…" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none"></div>

  <div class="absolute top-8 left-8 md:top-10 md:left-12">
    <span class="text-white/85 text-sm font-medium">Tag</span>
  </div>

  <div class="absolute bottom-10 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white
              [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
    <h3 class="font-display text-xl md:text-2xl font-bold tracking-tight mb-2 leading-tight">
      Title
    </h3>
    <p class="text-white/90 text-sm md:text-base leading-relaxed mb-7 max-w-md line-clamp-2">
      Description
    </p>
    <div class="flex flex-wrap gap-3"><!-- buttons --></div>
  </div>
</div>
```

The bottom gradient + `[text-shadow:0_2px_12px_rgba(0,0,0,0.45)]` ensures legibility regardless of the image content. Always include both.

**Light card**
```html
<div class="bg-white border border-black/8 rounded-2xl p-6 md:p-8">
  <h3 class="font-display text-xl font-bold text-ink tracking-tight mb-3">…</h3>
  <p class="text-ink/55 text-[15px] leading-relaxed">…</p>
</div>
```

**Brand-navy card** (CTA, dominant card in comparisons)
```html
<div class="relative bg-brand rounded-3xl px-8 py-16 md:px-16 md:py-24 text-white text-center overflow-hidden">
  <div class="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.06] blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
  <div class="relative">
    <!-- content -->
  </div>
</div>
```

The two soft `blur-3xl` highlights add depth without using gradients.

### Form inputs

```html
<input class="w-full bg-white border border-black/12 text-ink rounded-xl px-4 py-3 text-sm
              focus:outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15 transition-colors" />
```

### Comparison cards (Traditional vs Ichibot)

Pair a quiet `bg-black/[0.03]` card (or `bg-white` on off-white surfaces) with a dominant `bg-brand text-white` card. Use grey X-circles (`bg-black/5 text-ink/40`) on the quiet side, white check-circles (`bg-white/20 text-white`) on the dominant side.

---

## 7. Imagery

- **Hero images**: full-bleed, dark gradient overlay (`bg-gradient-to-t from-black/85 via-black/35 to-black/10`), text + buttons overlaid bottom-left.
- **Card images**: `object-cover` always, never `object-contain`. Subtle `transition-transform duration-700 group-hover:scale-105` for cards inside a Link.
- **Logos** in social proof: `grayscale opacity-70`, on hover `group-hover:grayscale-0 group-hover:opacity-100`. Brand colors return on hover only.
- **Avoid** heavy filters, vignettes, or saturated overlays.

---

## 8. Iconography

- Style: **Lucide-style** stroke icons (or inline SVG matching Lucide vocabulary). No filled glyph fonts.
- Stroke width: `1.8` for default, `2` for buttons, `3` for tiny check/X marks.
- Stroke caps: `strokeLinecap="round" strokeLinejoin="round"`.
- Sizes: `16` (in inline text), `20` (default), `24` (feature icons), `28+` (hero/illustrative).

**Icon tile pattern** (used in benefits cards, megamenu)
```html
<div class="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
  <svg width="22" height="22" …>…</svg>
</div>
```

---

## 9. Motion

Keep it minimal. The project deliberately avoids scroll-triggered animations.

| Where | Transition |
|---|---|
| Color change (text, bg) | `transition-colors duration-150` |
| Image hover scale | `transition-transform duration-700 group-hover:scale-105` |
| Card opacity / general | `transition-all duration-300` |
| Carousel scroll | native `scroll-behavior: smooth` |

No `animate-bounce`, no parallax, no float effects.

---

## 10. Section composition patterns

**Header with right-side link** (carousel sections)
```html
<div class="max-w-7xl mx-auto px-6 md:px-10">
  <div class="pt-20 md:pt-28 pb-10 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
    <h2 class="max-w-3xl font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">…</h2>
    <a class="text-sm font-semibold text-brand hover:text-brand-dark whitespace-nowrap shrink-0">
      Lihat semua →
    </a>
  </div>
</div>
```

**Centered header** (HowItWorks, CTA)
```html
<div class="text-center max-w-2xl mx-auto mb-16 md:mb-20">
  <h2 class="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">…</h2>
</div>
```

**Visual rhythm**: alternate `bg-white` and `bg-off-white` outer sections to avoid a wall of white. Don't overuse — every other section is too stripey; every 2-3 sections feels right.

---

## 11. Tailwind theme (v4 `@theme inline`)

Drop into a fresh Tailwind v4 project to inherit the system:

```css
@import "tailwindcss";

@theme inline {
  --color-brand:       #003459;
  --color-brand-dark:  #002440;
  --color-off-white:   #F5F5F7;
  --color-surface:     #FFFFFF;
  --color-ink:         #1D1D1F;
  --color-ink-2:       #424245;
  --color-ink-3:       #6E6E73;

  --font-display: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-sans:    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

body {
  font-family: var(--font-sans);
  background-color: #FFFFFF;
  color: #1D1D1F;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 { font-family: var(--font-display); }
```

For Tailwind v3, translate to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#003459',
        'brand-dark': '#002440',
        ink: '#1D1D1F',
        'off-white': '#F5F5F7',
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        sans:    ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
}
```

---

## 12. What to avoid

- **Glassmorphism** with heavy blur and translucent dark cards (the old Ichibot look). Replaced by clean white/off-white cards with subtle borders.
- **Multiple accent colors** (cyan, purple, amber category badges). Stick to brand-navy + ink grayscale + emerald (success) + red (error).
- **Gradient buttons** or rainbow gradients. Use solid colors.
- **Glow shadows** like `shadow-[0_0_30px_rgba(...)]`. Use `shadow-sm` only when needed; mostly skip shadows.
- **Wide-tracked uppercase labels**. Sentence case + normal tracking is the rule.
- **Custom scroll/reveal animations** that fire as the user scrolls. Static loading is faster and feels more confident.
- **Custom fonts via Google/web fonts**. System stack only.

---

## 13. Quick reference summary

```
Surface:    white, off-white (#F5F5F7), brand-navy (#003459 — for inversion)
Text:       ink (#1D1D1F), ink/55, ink/65
Borders:    border-black/8
Radii:      rounded-2xl (cards), rounded-3xl (wrappers), rounded-sm (buttons)
Container:  max-w-7xl mx-auto px-6 md:px-10
Padding:    py-20 md:py-28
Buttons:    bg-brand text-white px-7 py-2.5 rounded-sm font-semibold
Heading:    font-display text-4xl md:text-5xl font-bold tracking-tight
```
