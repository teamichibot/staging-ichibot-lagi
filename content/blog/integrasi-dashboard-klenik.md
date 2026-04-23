---
title: "Cara Mengintegrasikan Data Sensor ke Dashboard Klenik"
date: "2026-05-15"
category: "Tutorial"
excerpt: "Panduan teknis menghubungkan gateway IoT pihak ketiga atau sensor kustom ke platform dashboard industri Ichibot."
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
---

## Klenik: Platform Dashboard Terbuka

Meskipun Ichibot menyediakan hardware sendiri, platform **Klenik Dashboard** kami dirancang untuk bisa menerima data dari berbagai sumber melalui API atau protokol standar.

### Alur Integrasi

*   **Step 1: Registrasi Device**: Daftarkan ID perangkat unik di panel admin Klenik.
*   **Step 2: Konfigurasi Payload**: Sesuaikan format JSON data sensor Anda dengan standar Klenik.
*   **Step 3: Koneksi MQTT/HTTP**: Kirim data menggunakan protokol pilihan Anda.
*   **Step 4: Widget Mapping**: Tarik data tersebut ke widget grafik, gauge, atau table di dashboard.

Fleksibilitas ini memungkinkan Anda untuk mengintegrasikan sistem yang sudah ada ke dalam satu pusat kendali yang terpadu.
