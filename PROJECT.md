# Ichibot Web — Project Documentation

## Stack
- **Next.js 16** (App Router, `params: Promise<{slug}>` — harus `await params` di server, `use(params)` di client)
- **Tailwind CSS v4**
- **TypeScript**
- **gray-matter** — parse frontmatter MDX blog
- **@uiw/react-md-editor** — rich text editor di admin blog

---

## Struktur Direktori Penting

```
app/
  layout.tsx              ← Root layout: <html>+<body>+<SiteShell>
  page.tsx                ← Home: server component, pass posts ke Hero/CaseStudy/BlogPreview
  admin/
    layout.tsx            ← Admin layout: hanya <div>, TIDAK ada <html>/<body>
    login/page.tsx        ← Halaman login admin
    AdminShell.tsx        ← Sidebar admin (client component)
    page.tsx              ← Dashboard admin
    clients/page.tsx      ← Kelola logo klien
    layanan/
      page.tsx            ← List layanan
      [slug]/page.tsx     ← Edit/tambah layanan
    produk/
      page.tsx            ← List produk
      [slug]/page.tsx     ← Edit/tambah produk
    blog/
      page.tsx            ← List artikel
      [slug]/page.tsx     ← Edit/tambah artikel (pakai MDEditor)
  api/
    blog/route.ts         ← PUBLIC: GET semua post (dynamic, no-cache)
    clients/route.ts      ← PUBLIC: GET data klien
    services/route.ts     ← PUBLIC: GET semua layanan
    products/route.ts     ← PUBLIC: GET semua produk
    admin/
      auth/route.ts       ← Login/logout (OPEN — dikecualikan dari middleware)
      clients/route.ts    ← GET+PUT klien
      services/route.ts   ← GET+POST+PUT layanan
      services/[slug]/    ← GET+PUT+DELETE layanan by slug
      products/route.ts   ← GET+POST+PUT produk
      products/[slug]/    ← GET+PUT+DELETE produk by slug
      blog/route.ts       ← GET+POST artikel
      blog/[slug]/        ← GET+PUT+DELETE artikel by slug
  blog/
    page.tsx              ← Listing blog (server component)
    [slug]/page.tsx       ← Detail artikel (server component)
  layanan/[slug]/page.tsx ← Detail layanan (server component)
  produk/
    page.tsx              ← Listing produk (server component)
    [slug]/page.tsx       ← Detail produk (server component)
  about/page.tsx
  contact/page.tsx

components/
  layout/
    SiteShell.tsx         ← Client: cek pathname, hide Navbar/Footer untuk /admin/*
    Navbar.tsx            ← Dropdown "Perusahaan" (Blog + Tentang Kami)
    Footer.tsx
  home/
    Hero.tsx              ← Slider hero — pakai cs.image dari PostMeta (BUKAN hardcoded)
    SocialProof.tsx       ← Logo klien — fetch dari /api/clients
    Services.tsx          ← Pakai servicesData dari lib/services-data.ts
    Products.tsx          ← Pakai productsData dari lib/products-data.ts
    CaseStudy.tsx         ← Pakai post.image dari PostMeta (BUKAN hardcoded)
    BlogPreview.tsx       ← Terima props posts[] dari app/page.tsx (server)
  blog/
    VideoEmbed.tsx        ← Auto-detect YouTube/Shorts/TikTok/Instagram dari URL
  layanan/ServiceDetail.tsx
  produk/ProductDetail.tsx
  about/Timeline.tsx

lib/
  blog.ts                 ← getAllPosts(), getPostBySlug() — baca MDX dari content/blog/
  translations.ts         ← WHATSAPP_NUMBER di baris ~355
  admin-data.ts           ← readData/writeData/deleteDataFile — Node.js fs, server-only
  services-data.ts        ← servicesData[], getAllServices(), getServiceBySlugLive()
  products-data.ts        ← productsData[], getAllProducts(), getProductBySlugLive()
  content-guard.ts        ← validatePostContent() — blok keyword judol/pinjol
  
middleware.ts             ← Proteksi /admin/* (redirect) dan /api/admin/* (401 JSON)
                            KECUALI /admin/login dan /api/admin/auth

data/                     ← JSON hasil simpan dari admin (dibuat otomatis)
  clients.json
  services.json           ← (dibuat saat pertama kali admin save layanan)
  products.json           ← (dibuat saat pertama kali admin save produk)

content/blog/             ← File MDX artikel
  *.mdx                   ← Frontmatter: title, date, category, excerpt, image, videoUrl
```

---

## Alur Data (Data Flow)

### Blog
- **Buat/Edit** → admin form → POST/PUT `/api/admin/blog/[slug]` → tulis file `.mdx`
- **Baca publik** → `getAllPosts()` baca langsung dari `content/blog/*.mdx`
- **Landing page** → `app/page.tsx` (server) panggil `getAllPosts()` → pass ke `BlogPreview`, `CaseStudy`, `Hero` sebagai props

### Layanan & Produk
- **Buat/Edit** → admin form → POST/PUT `/api/admin/services|products` → tulis `data/*.json`
- **Baca publik** → `getAllServices()` / `getAllProducts()` — cek `data/*.json` dulu, fallback ke TypeScript static data di `lib/services-data.ts` / `lib/products-data.ts`
- **Detail page** → `getServiceBySlugLive()` / `getProductBySlugLive()`

### Logo Klien
- **Edit** → admin clients → PUT `/api/admin/clients` → tulis `data/clients.json`
- **Baca publik** → `SocialProof` fetch `/api/clients` → baca `data/clients.json`

---

## Autentikasi Admin
- Password disimpan di `.env.local`: `ADMIN_PASSWORD="..."`
- Login: POST `/api/admin/auth` → set httpOnly cookie `admin_token = btoa(password)`
- Middleware verifikasi cookie di semua `/admin/*` dan `/api/admin/*`
- `/api/admin/auth` dikecualikan (endpoint login itu sendiri)
- Content guard aktif di POST/PUT blog: blok keyword judol, pinjol, penipuan

---

## Hal Penting / Gotchas

1. **Next.js 16 params** — selalu `Promise<{slug}>`. Di server: `await params`. Di client: `use(params)` dari React.
2. **Nested layout** — `app/admin/layout.tsx` TIDAK boleh punya `<html>`/`<body>`. Root layout yang pegang itu. `SiteShell` handle kondisional Navbar/Footer.
3. **Slug blog** — harus URL-safe (lowercase, tanda hubung). Admin form sudah auto-sanitize. File MDX yang namanya pakai spasi akan 404.
4. **Gambar di landing page** — Hero, CaseStudy, BlogPreview semua pakai `post.image` dari MDX frontmatter, BUKAN array hardcoded. Jangan balik ke pattern lama.
5. **`#` di .env** — dianggap komentar. Gunakan tanda kutip: `ADMIN_PASSWORD="pass#word"`.
6. **Restart dev server** setiap ganti `.env.local`.
7. **`dynamic = 'force-dynamic'`** — dipasang di `/api/blog/route.ts` agar tidak di-cache.

---

## Fitur yang Sudah Jalan
- [x] Detail page layanan (`/layanan/[slug]`)
- [x] Detail page produk (`/produk/[slug]`)
- [x] Listing produk (`/produk`)
- [x] Halaman About dengan timeline interaktif
- [x] Navbar dropdown "Perusahaan" (Blog + Tentang Kami)
- [x] Blog dengan cover image dan video embed (YouTube/Shorts/TikTok/Instagram)
- [x] Admin panel: login, dashboard, clients, layanan, produk, blog
- [x] Rich text editor (MDEditor) di admin blog
- [x] Proteksi API admin via middleware
- [x] Content guard anti judol/pinjol
- [x] Logo klien dinamis dari admin
- [x] Semua gambar landing page dinamis dari data artikel

## Nomor WhatsApp
Ganti di `lib/translations.ts` baris ~355: `export const WHATSAPP_NUMBER = '628...'`
