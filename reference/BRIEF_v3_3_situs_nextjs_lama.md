# BRIEF: Website Ichibot

## Workflow

Kerjakan dengan urutan berikut agar efisien:

1. **Plan dulu.** Baca seluruh brief ini, lalu buat rencana: daftar halaman, daftar komponen yang perlu dibuat, dan urutan pengerjaannya. Tunjukkan plan-nya ke saya untuk approval sebelum nulis kode.
2. **Setup project.** Setelah plan di-approve, setup Next.js + Tailwind + TypeScript + struktur folder. Commit.
3. **Bangun per-section.** Kerjakan homepage section by section (Hero → Layanan → dst). Setiap section selesai, commit dan lanjut.
4. **Halaman tambahan.** Setelah homepage selesai, kerjakan /contact dan /blog.
5. **Polish.** Responsive check, SEO meta tags, bilingual, WhatsApp button.
6. **Deploy.** Push ke Vercel.

Jangan bangun semuanya sekaligus. Kerjakan incremental agar mudah di-review dan di-debug.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Bilingual:** Bahasa Indonesia (default) + English (toggle via navbar)
- **Deployment:** Vercel

---

## Tentang Ichibot

Ichibot adalah perusahaan teknologi Indonesia yang membantu perusahaan manufaktur dan industri mengadopsi IoT dan AI secara praktis dan terjangkau. Klien utama Ichibot adalah pabrik-pabrik yang punya mesin lama dan ingin digitalisasi tanpa harus ganti seluruh infrastruktur.

**Yang Ichibot tawarkan:**

### Layanan (Services)

1. **IoT System Implementation**
   Pemasangan sensor di mesin lama, koneksi data mesin ke internet, monitoring real-time. Contoh: tarik data suhu dan getaran mesin produksi ke dashboard online.

2. **AI Computer Vision**
   Deteksi cacat produk otomatis, counting objek, early warning system berbasis kamera. Contoh: kamera di conveyor yang otomatis tandai produk cacat.

3. **AI Decision Support**
   Chatbot pintar per use case industri, predictive analytics, otomasi keputusan. Contoh: chatbot yang bisa jawab SOP mesin berdasarkan data historis.

4. **Dashboard & Monitoring**
   Real-time monitoring equipment, visualisasi data operasional, alert system. Contoh: dashboard pabrik yang bisa diakses dari HP kapan saja.

5. **Training & Consulting**
   Transfer knowledge ke tim klien, project-based training, mentoring teknis. Contoh: workshop 2 minggu, setelahnya tim klien bisa maintain sistem sendiri.

### Produk (Products)
Solusi siap pakai yang bisa langsung diimplementasikan:

1. **Energy Usage Monitoring**
   Sistem monitoring konsumsi energi real-time untuk efisiensi dan penghematan biaya listrik pabrik.

2. **Equipment Monitoring**
   Sistem pemantauan kondisi mesin dan equipment secara real-time — deteksi anomali sebelum terjadi kerusakan.

3. **Maintenance AI Chatbot**
   Chatbot berbasis AI yang menjawab pertanyaan maintenance, SOP mesin, dan troubleshooting berdasarkan data historis.

### Klien & Partner
**Enterprise/Industri:** Toyota (TMMIN), Pertamina, BCA, Johnson Controls, Erlangga, Asperio, Kuanta, DocO, EKRAF
**Universitas:** UGM, Telkom University, PENS, UIN, UMS, UNW, Itekraf, Amikom, AKTI, UNY

Proyek aktif saat ini:
- **Toyota** — IoT Monitoring System (proyek berkelanjutan)
- **PT GAP (Erlangga Group)** — proyek implementasi baru

---

## Struktur Homepage

Homepage adalah single-page long-scroll. Setiap section punya tujuan spesifik.

### 1. Hero
Pengunjung harus langsung paham apa yang Ichibot lakukan dalam 5 detik.

- **Headline:** langsung ke value, bukan tagline generik. Contoh: "Digitalisasi Pabrik Anda Tanpa Ganti Infrastruktur" atau "IoT & AI untuk Industri — Praktis, Fleksibel, Terjangkau"
- **Subheadline:** 1 kalimat yang memperjelas. Contoh: "Kami bantu perusahaan manufaktur tarik data dari mesin lama, deteksi cacat produk, dan ambil keputusan lebih cepat dengan AI."
- **CTA utama:** "Konsultasi Gratis" (link ke /contact atau WhatsApp)
- **CTA sekunder:** "Lihat Layanan" (scroll ke section berikutnya)
- Hero jangan full-screen — sisakan ruang agar pengunjung lihat ada konten di bawahnya.

### 2. Layanan
Tampilkan 5 layanan di atas sebagai card/grid yang setara. Masing-masing dengan:
- Icon yang relevan
- Judul layanan
- Deskripsi 1-2 kalimat
- Contoh implementasi konkret (1 kalimat)

Pengunjung harus bisa scan semua layanan dalam 10 detik tanpa harus baca paragraf panjang.

### 3. Social Proof
Bangun trust. Letakkan setelah layanan — di titik ini pengunjung sudah mulai bertanya "ini beneran atau cuma klaim?"

**Logo strip dalam 2 baris:**

Baris 1 — **"Trusted by Industry Leaders"**
Logo grayscale horizontal: Toyota (TMMIN), Pertamina, BCA, Johnson Controls, Erlangga, Asperio, Kuanta, DocO, EKRAF

Baris 2 — **"Academic Partners"**
Logo grayscale horizontal: UGM, Telkom University, PENS, UIN, UMS, UNW, Itekraf, Amikom, AKTI, UNY

**Di bawah logo strip**, tambahkan 1-2 mini highlight proyek (format singkat):
- "Toyota — Monitoring IoT real-time untuk equipment di lini produksi"
- "PT GAP (Erlangga) — Digitalisasi proses operasional pabrik"

File logo akan disediakan terpisah. Untuk sementara bisa pakai placeholder teks nama perusahaan yang disusun rapi.

### 4. Produk
Tampilkan 3 produk sebagai card yang jelas dan visual. Masing-masing dengan:
- Icon atau ilustrasi sederhana
- Nama produk
- Deskripsi 1-2 kalimat tentang apa yang dilakukan dan manfaatnya
- CTA: "Pelajari Lebih Lanjut" atau "Tanya Detail"

Produk:
1. **Energy Usage Monitoring** — monitoring konsumsi energi real-time untuk efisiensi dan penghematan biaya listrik pabrik.
2. **Equipment Monitoring** — pemantauan kondisi mesin real-time, deteksi anomali sebelum terjadi kerusakan.
3. **Maintenance AI Chatbot** — chatbot AI yang jawab pertanyaan maintenance, SOP, dan troubleshooting dari data historis.

### 5. Why Ichibot
3-4 poin singkat yang menjelaskan kenapa Ichibot berbeda:
- **Terjangkau** — Digitalisasi tanpa biaya ratusan juta
- **Praktis** — Dipasang di mesin existing, tanpa ganti infrastruktur
- **Fleksibel** — Dari implementasi full-service sampai training agar tim Anda mandiri
- **Terbukti** — Dipercaya Toyota dan perusahaan enterprise Indonesia

### 6. CTA Section
- Headline: "Siap Digitalisasi Pabrik Anda?"
- Subtext singkat + button ke form kontak atau WhatsApp
- Bisa tambahkan quote: "Industrial AI bukan lagi masa depan, tapi kebutuhan hari ini. Ichibot hadir untuk membuatnya terjangkau."

### 7. Blog Preview
- 3 artikel terbaru (dummy content dulu tidak apa-apa)
- Link ke /blog

### 8. Footer
- Logo, navigasi (Layanan, Produk, Blog, Kontak), alamat, email, social media, WhatsApp, copyright

---

## Navigasi (Navbar)

```
Layanan | Produk | Blog | Kontak | [ID / EN] | [Button: Konsultasi Gratis]
```

Button CTA "Konsultasi Gratis" selalu visible di navbar. Language toggle di pojok.

---

## Halaman Lain

### /contact
- Form: Nama, Email, Perusahaan, No. HP, Layanan yang diminati (dropdown), Pesan
- Submit ke email atau Google Sheets (sementara)
- Validasi client-side, success/error state
- Tampilkan juga info kontak langsung (email, WhatsApp, alamat)

### /blog
- Listing artikel dengan kategori (IoT, AI, Case Study, Tutorial)
- Bisa pakai MDX (static) atau siapkan struktur untuk CMS nanti

### /blog/[slug]
- Detail artikel, SEO-friendly (meta tags, Open Graph)
- Share buttons, related articles

---

## Design Direction

### Tone
Profesional dan modern, tapi tidak kaku. Ini website untuk perusahaan teknologi yang melayani industri berat — harus terasa trustworthy tapi juga approachable.

### Warna
- **Primary:** Deep Navy (sekitar #0A1628) — authority
- **Accent:** Teal (sekitar #0D9488) — teknologi, inovasi
- **Background:** putih atau off-white untuk content area
- **Dark sections:** navy untuk hero dan CTA (buat kontras)

### Font
Pilih font yang distinctive, jangan pakai Inter/Roboto/Arial. Saran:
- Heading: serif atau display yang tegas
- Body: sans-serif yang clean dan readable
- Pastikan font ada di Google Fonts agar gampang di-load

### Layout
- Variasikan layout antar section — jangan semua pakai format yang sama
- Generous whitespace
- Mobile-first responsive

### Animasi
- Scroll-triggered reveal yang subtle untuk tiap section
- Hover effects pada card dan button
- Jangan berlebihan — profesional, bukan flashy

### Referensi Visual
Lihat website-website ini untuk inspirasi tone dan struktur (bukan untuk di-copy, tapi untuk memahami standar kualitas):
- **linear.app** — clean, focused, dark theme yang elegan
- **vercel.com** — tech company modern, typography kuat, whitespace generous
- **ramp.com** — B2B fintech tapi layout-nya sangat clear, value proposition langsung terasa
- **lattice.com** — B2B SaaS dengan social proof yang kuat dan navigasi intuitif

---

## Fitur Teknis

### WhatsApp Floating Button
- Pojok kanan bawah, selalu visible
- Klik → buka WhatsApp dengan pesan template: "Halo Ichibot, saya tertarik dengan layanan AI-IoT untuk perusahaan saya."
- Nomor WhatsApp: placeholder dulu, nanti diganti

### Bilingual (ID/EN)
- Bahasa Indonesia = default
- Toggle di navbar untuk switch ke English
- Semua teks homepage dan halaman utama harus punya versi ID dan EN
- Implementasi bisa pakai i18n library atau custom context
- Blog boleh single-language (Indonesia) dulu

### SEO
- Meta title + description per halaman
- Open Graph + Twitter cards
- Sitemap + robots.txt
- Optimasi gambar pakai next/image
- Schema markup: Organization + Service

---

## Prioritas

### Harus ada di launch pertama:
1. Homepage lengkap (semua section)
2. Halaman /contact dengan form
3. Bilingual toggle
4. WhatsApp floating button
5. Responsive mobile
6. Basic SEO
7. Deploy ke Vercel

### Bisa menyusul:
1. Blog + artikel
2. Halaman detail per layanan
3. Halaman produk
4. Scroll animation
5. Analytics (GA / Plausible)
