export type Lang = 'id' | 'en'

export const t = {
  nav: {
    services: { id: 'Layanan', en: 'Services' },
    products: { id: 'Produk', en: 'Products' },
    caseStudies: { id: 'Studi Kasus', en: 'Case Studies' },
    blog: { id: 'Blog', en: 'Blog' },
    about: { id: 'Tentang Kami', en: 'About Us' },
    contact: { id: 'Kontak', en: 'Contact' },
    cta: { id: 'Konsultasi Gratis', en: 'Free Consultation' },
  },

  hero: {
    headline: {
      id: 'Digitalisasi Pabrik Anda\nTanpa Ganti Infrastruktur',
      en: 'Digitize Your Factory\nWithout Replacing Infrastructure',
    },
    subheadline: {
      id: 'Kami bantu perusahaan manufaktur tarik data dari mesin lama, deteksi cacat produk, dan ambil keputusan lebih cepat dengan AI.',
      en: 'We help manufacturers pull data from legacy machines, detect product defects, and make faster decisions with AI.',
    },
    ctaPrimary: { id: 'Konsultasi Gratis', en: 'Free Consultation' },
    ctaSecondary: { id: 'Lihat Layanan', en: 'See Services' },
  },

  services: {
    sectionLabel: { id: 'Layanan', en: 'Services' },
    heading: { id: 'Apa yang Kami Lakukan', en: 'What We Do' },
    subheading: {
      id: 'Berbagai layanan yang membantu industri Anda bertransformasi secara praktis.',
      en: 'Various services that help your industry transform practically.',
    },
    ctaLearn: { id: 'Pelajari Selengkapnya', en: 'Learn More' },
    items: [
      {
        title: { id: 'IoT System Implementation', en: 'IoT System Implementation' },
        desc: {
          id: 'Pemasangan sensor di mesin lama, koneksi ke internet, dan monitoring real-time.',
          en: 'Install sensors on legacy machines, connect to the internet, and enable real-time monitoring.'
        },
        example: {
          id: 'Tarik data suhu & getaran mesin produksi ke dashboard online.',
          en: 'Stream temperature & vibration data from production machines to an online dashboard.'
        },
      },
      {
        title: { id: 'AI Computer Vision', en: 'AI Computer Vision' },
        desc: {
          id: 'Deteksi cacat produk otomatis, counting objek, dan early warning berbasis kamera.',
          en: 'Automatic product defect detection, object counting, and camera-based early warning.'
        },
        example: {
          id: 'Kamera di conveyor yang otomatis tandai produk cacat.',
          en: 'Camera on conveyor automatically flags defective products.'
        },
      },
      {
        title: { id: 'AI Decision Support', en: 'AI Decision Support' },
        desc: {
          id: 'Chatbot pintar per use case industri, predictive analytics, dan otomasi keputusan.',
          en: 'Industry-specific smart chatbots, predictive analytics, and decision automation.'
        },
        example: {
          id: 'Chatbot yang menjawab SOP mesin berdasarkan data historis.',
          en: 'Chatbot that answers machine SOPs based on historical data.'
        },
      },
      {
        title: { id: 'Dashboard & Monitoring', en: 'Dashboard & Monitoring' },
        desc: {
          id: 'Real-time monitoring equipment, visualisasi data operasional, dan alert system.',
          en: 'Real-time equipment monitoring, operational data visualization, and alert systems.'
        },
        example: {
          id: 'Dashboard pabrik yang bisa diakses dari HP kapan saja.',
          en: 'Factory dashboard accessible from your phone anytime.'
        },
      },
      {
        title: { id: 'Training & Consulting', en: 'Training & Consulting' },
        desc: {
          id: 'Transfer knowledge ke tim klien, project-based training, dan mentoring teknis.',
          en: 'Knowledge transfer to client teams, project-based training, and technical mentoring.'
        },
        example: {
          id: 'Workshop 2 minggu, setelahnya tim klien bisa maintain sistem sendiri.',
          en: '2-week workshop, after which the client team can maintain the system independently.'
        },
      },
      {
        title: { id: 'Layanan Kustom', en: 'Custom Services' },
        desc: {
          id: 'Pengembangan IoT & AI khusus sesuai dengan masalah operasional spesifik di pabrik Anda.',
          en: 'Custom IoT & AI development tailored to specific operational problems in your factory.'
        },
        example: {
          id: 'Solusi end-to-end yang dirancang eksklusif berdasarkan kebutuhan unik.',
          en: 'End-to-end solution designed exclusively based on unique requirements.'
        },
      },
    ],
  },

  socialProof: {
    industryLabel: { id: 'Dipercaya oleh Industry Leaders', en: 'Trusted by Industry Leaders' },
    academicLabel: { id: 'Mitra Akademik', en: 'Academic Partners' },
    projectsHeading: { id: 'Proyek Aktif', en: 'Active Projects' },
    projects: [
      {
        client: 'Toyota',
        desc: {
          id: 'Monitoring IoT real-time untuk equipment di lini produksi.',
          en: 'Real-time IoT monitoring for equipment on the production line.'
        },
      },
      {
        client: 'PT GAP (Erlangga)',
        desc: {
          id: 'Digitalisasi proses operasional pabrik.',
          en: 'Digitalization of factory operational processes.'
        },
      },
    ],
    industryClients: ['Toyota (TMMIN)', 'Pertamina', 'BCA', 'Johnson Controls', 'Erlangga', 'Asperio', 'Kuanta', 'DocO', 'EKRAF'],
    academicPartners: ['UGM', 'Telkom University', 'PENS', 'UIN', 'UMS', 'UNW', 'Itekraf', 'Amikom', 'AKTI', 'UNY'],
  },

  products: {
    sectionLabel: { id: 'Produk', en: 'Products' },
    heading: { id: 'Solusi Siap Pakai', en: 'Ready-to-Deploy Solutions' },
    subheading: {
      id: 'Produk kami dirancang untuk langsung bisa diimplementasikan di fasilitas produksi Anda.',
      en: 'Our products are designed for immediate deployment in your production facility.',
    },
    ctaLearn: { id: 'Pelajari Lebih Lanjut', en: 'Learn More' },
    ctaAsk: { id: 'Tanya Detail', en: 'Ask Details' },
    items: [
      {
        title: { id: 'Energy Usage Monitoring', en: 'Energy Usage Monitoring' },
        desc: {
          id: 'Sistem monitoring konsumsi energi real-time untuk efisiensi dan penghematan biaya listrik pabrik.',
          en: 'Real-time energy consumption monitoring system for efficiency and electricity cost savings.',
        },
      },
      {
        title: { id: 'Equipment Monitoring', en: 'Equipment Monitoring' },
        desc: {
          id: 'Pemantauan kondisi mesin real-time — deteksi anomali sebelum terjadi kerusakan.',
          en: 'Real-time machine condition monitoring — detect anomalies before breakdowns occur.',
        },
      },
      {
        title: { id: 'Maintenance AI Chatbot', en: 'Maintenance AI Chatbot' },
        desc: {
          id: 'Chatbot AI yang menjawab pertanyaan maintenance, SOP mesin, dan troubleshooting dari data historis.',
          en: 'AI chatbot answering maintenance questions, machine SOPs, and troubleshooting from historical data.',
        },
      },
      {
        title: { id: 'Klenik IoT Dashboard', en: 'Klenik IoT Dashboard' },
        desc: {
          id: 'Platform dashboard monitoring terintegrasi untuk visualisasi dan manajemen data sensor IoT di seluruh fasilitas.',
          en: 'Integrated dashboard monitoring platform for visualizing and managing IoT sensor data across your facility.',
        },
      },
    ],
  },

  whyIchibot: {
    sectionLabel: { id: 'Kenapa Ichibot', en: 'Why Ichibot' },
    heading: { id: 'Digitalisasi yang Masuk Akal', en: 'Digitalization That Makes Sense' },
    subheading: {
      id: 'Bukan sekadar teknologi — tapi solusi yang benar-benar bisa diimplementasikan di lapangan.',
      en: 'Not just technology — but solutions that can actually be deployed on the ground.',
    },
    items: [
      {
        title: { id: 'Cost-effective', en: 'Cost-effective' },
        desc: {
          id: 'Sistem yang independen dan efisien, tanpa kaku mengikat pabrik Anda pada ekosistem brand tertentu.',
          en: 'An independent and efficient system, without rigidly tying your factory to a specific brand ecosystem.'
        },
      },
      {
        title: { id: 'Praktis', en: 'Practical' },
        desc: {
          id: 'Dipasang di mesin existing tanpa perlu ganti infrastruktur atau hentikan produksi.',
          en: 'Installed on existing machines without replacing infrastructure or stopping production.'
        },
      },
      {
        title: { id: 'Fleksibel', en: 'Flexible' },
        desc: {
          id: 'Dari full-service implementation sampai training agar tim Anda bisa mandiri.',
          en: 'From full-service implementation to training so your team becomes self-sufficient.'
        },
      },
      {
        title: { id: 'Terbukti', en: 'Proven' },
        desc: {
          id: 'Dipercaya Toyota, Pertamina, BCA, dan perusahaan enterprise Indonesia.',
          en: 'Trusted by Toyota, Pertamina, BCA, and Indonesian enterprise companies.'
        },
      },
      {
        title: { id: 'Mendukung Net Zero', en: 'Net Zero Friendly' },
        desc: {
          id: 'Tidak ada mesin lama yang dibuang, tidak ada produksi hardware baru. Digitalisasi Ichibot bekerja di atas infrastruktur yang sudah ada — lebih efisien, lebih hijau.',
          en: 'No old machines scrapped, no new hardware manufactured. Ichibot works on top of your existing infrastructure — more efficient, lower carbon footprint.'
        },
      },
    ],
  },

  cta: {
    heading: { id: 'Coba Gratis di Pabrik Anda', en: 'Try It Free at Your Factory' },
    subtext: {
      id: 'Kami jalankan Proof of Concept langsung di fasilitas Anda — tanpa biaya, tanpa komitmen jangka panjang.',
      en: 'We run a Proof of Concept directly at your facility — no cost, no long-term commitment.',
    },
    quote: {
      id: 'Industrial AI bukan lagi masa depan, tapi kebutuhan hari ini. Ichibot hadir untuk membuatnya terjangkau.',
      en: 'Industrial AI is no longer the future — it\'s today\'s necessity. Ichibot is here to make it affordable.',
    },
    button: { id: 'Ajukan POC Gratis', en: 'Apply for Free POC' },
    whatsapp: { id: 'Chat via WhatsApp', en: 'Chat via WhatsApp' },
  },

  blogPreview: {
    sectionLabel: { id: 'Blog', en: 'Blog' },
    heading: { id: 'Insight & Update', en: 'Insight & Update' },
    viewAll: { id: 'Lihat Semua Artikel', en: 'View All Articles' },
    readMore: { id: 'Baca Selengkapnya', en: 'Read More' },
    posts: [
      {
        slug: 'iot-untuk-pabrik-lama',
        category: 'IoT',
        title: {
          id: 'IoT untuk Mesin Lama: Mulai dari Mana?',
          en: 'IoT for Legacy Machines: Where to Start?'
        },
        excerpt: {
          id: 'Sebagian besar pabrik di Indonesia masih menggunakan mesin lama yang tidak terhubung ke internet. Berikut cara kami mendekati masalah ini.',
          en: 'Most factories in Indonesia still use legacy machines disconnected from the internet. Here\'s how we approach this problem.'
        },
        date: '2025-12-10',
      },
      {
        slug: 'computer-vision-quality-control',
        category: 'AI',
        title: {
          id: 'Computer Vision untuk Quality Control: Studi Kasus Lini Produksi',
          en: 'Computer Vision for Quality Control: Production Line Case Study'
        },
        excerpt: {
          id: 'Bagaimana kamera AI mampu mendeteksi cacat produk 10x lebih cepat dari inspektur manusia — dan apa trade-off-nya.',
          en: 'How AI cameras can detect product defects 10x faster than human inspectors — and what the trade-offs are.'
        },
        date: '2025-11-28',
      },
      {
        slug: 'roi-digitalisasi-pabrik',
        category: 'Case Study',
        title: {
          id: 'Menghitung ROI Digitalisasi Pabrik: Panduan Praktis',
          en: 'Calculating Factory Digitalization ROI: A Practical Guide'
        },
        excerpt: {
          id: 'Sebelum investasi di IoT dan AI, penting untuk menghitung potensi ROI secara realistis. Kami bagikan framework yang kami gunakan bersama klien.',
          en: 'Before investing in IoT and AI, it\'s important to calculate potential ROI realistically. We share the framework we use with clients.'
        },
        date: '2025-11-15',
      },
    ],
  },

  footer: {
    tagline: { id: 'IoT & AI untuk Industri Indonesia.', en: 'IoT & AI for Indonesian Industry.' },
    navGroups: [
      {
        label: { id: 'Solusi', en: 'Solutions' },
        links: [
          { label: { id: 'Layanan', en: 'Services' }, href: '/#layanan' },
          { label: { id: 'Produk', en: 'Products' }, href: '/#produk' },
        ],
      },
      {
        label: { id: 'Perusahaan', en: 'Company' },
        links: [
          { label: { id: 'Blog', en: 'Blog' }, href: '/blog' },
          { label: { id: 'Tentang Kami', en: 'About Us' }, href: '/about' },
        ],
      },
    ],
    address: { id: 'Indonesia', en: 'Indonesia' },
    email: 'hello@ichibot.id',
    copyright: { id: '© 2025 Ichibot. Hak cipta dilindungi.', en: '© 2025 Ichibot. All rights reserved.' },
  },

  contact: {
    heading: { id: 'Hubungi Kami', en: 'Contact Us' },
    subheading: {
      id: 'Ceritakan kebutuhan Anda — kami akan balas dalam 1 hari kerja.',
      en: 'Tell us your needs — we\'ll reply within 1 business day.',
    },
    fields: {
      name: { id: 'Nama Lengkap', en: 'Full Name' },
      email: { id: 'Email', en: 'Email' },
      company: { id: 'Perusahaan', en: 'Company' },
      phone: { id: 'No. HP / WhatsApp', en: 'Phone / WhatsApp' },
      service: { id: 'Layanan yang Diminati', en: 'Service of Interest' },
      message: { id: 'Pesan', en: 'Message' },
      submit: { id: 'Kirim Pesan', en: 'Send Message' },
    },
    serviceOptions: [
      { id: 'IoT System Implementation', en: 'IoT System Implementation' },
      { id: 'AI Computer Vision', en: 'AI Computer Vision' },
      { id: 'AI Decision Support', en: 'AI Decision Support' },
      { id: 'Dashboard & Monitoring', en: 'Dashboard & Monitoring' },
      { id: 'Training & Consulting', en: 'Training & Consulting' },
      { id: 'Lainnya', en: 'Other' },
    ],
    success: {
      id: 'Pesan Anda terkirim! Kami akan menghubungi Anda segera.',
      en: 'Your message has been sent! We\'ll be in touch shortly.',
    },
    error: {
      id: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.',
      en: 'Something went wrong. Please try again or contact us via WhatsApp.',
    },
    infoHeading: { id: 'Kontak Langsung', en: 'Direct Contact' },
  },

  caseStudies: {
    sectionLabel: { id: 'Studi Kasus', en: 'Case Studies' },
    heading: { id: 'Hasil Nyata dari Klien Kami', en: 'Real Results from Our Clients' },
    subheading: {
      id: 'Bukan sekadar demo — ini proyek nyata yang sudah berjalan di lapangan.',
      en: 'Not just demos — these are real projects running on the ground.',
    },
    items: [
      {
        client: 'Toyota (TMMIN)',
        tag: { id: 'IoT Monitoring', en: 'IoT Monitoring' },
        challenge: {
          id: 'Mesin-mesin di lini produksi tidak memiliki visibilitas real-time — kerusakan baru diketahui setelah terjadi.',
          en: 'Production line machines had no real-time visibility — breakdowns were only known after they occurred.',
        },
        solution: {
          id: 'Implementasi IoT sensor di seluruh equipment kritis dengan dashboard monitoring real-time.',
          en: 'IoT sensors deployed across critical equipment with a real-time monitoring dashboard.',
        },
        results: [
          { id: 'Deteksi anomali sebelum breakdown', en: 'Anomaly detection before breakdown' },
          { id: 'Visibilitas penuh ke kondisi mesin', en: 'Full visibility into machine condition' },
          { id: 'Proyek berkelanjutan hingga saat ini', en: 'Ongoing project to date' },
        ],
      },
      {
        client: 'PT GAP — Erlangga Group',
        tag: { id: 'Digitalisasi Operasional', en: 'Operational Digitalization' },
        challenge: {
          id: 'Proses operasional pabrik masih manual — data produksi tersebar dan sulit dianalisis.',
          en: 'Factory operations were still manual — production data was scattered and hard to analyze.',
        },
        solution: {
          id: 'Digitalisasi alur kerja produksi dengan sistem monitoring terpusat dan pelaporan otomatis.',
          en: 'Digitalized production workflow with a centralized monitoring system and automated reporting.',
        },
        results: [
          { id: 'Data operasional terpusat dalam satu platform', en: 'Operational data centralized in one platform' },
          { id: 'Laporan produksi otomatis harian', en: 'Automated daily production reports' },
          { id: 'Pengambilan keputusan lebih cepat', en: 'Faster decision-making' },
        ],
      },
      {
        client: 'Klien Industri Manufaktur',
        tag: { id: 'AI Computer Vision', en: 'AI Computer Vision' },
        challenge: {
          id: 'Tingkat defect produk tinggi dan inspeksi manual tidak konsisten antar shift.',
          en: 'High product defect rate and inconsistent manual inspection across shifts.',
        },
        solution: {
          id: 'Sistem computer vision di conveyor untuk deteksi cacat produk otomatis 24/7.',
          en: 'Computer vision system on the conveyor for 24/7 automatic product defect detection.',
        },
        results: [
          { id: 'Akurasi deteksi cacat >97%', en: '>97% defect detection accuracy' },
          { id: 'Inspeksi 5× lebih cepat dari manual', en: '5× faster inspection than manual' },
          { id: 'Defect rate turun signifikan', en: 'Significant reduction in defect rate' },
        ],
      },
    ],
  },

  whatsapp: {
    message: {
      id: 'Halo Ichibot, saya tertarik dengan layanan AI-IoT untuk perusahaan saya.',
      en: 'Hello Ichibot, I am interested in your AI-IoT services for my company.',
    },
  },
}

export const WHATSAPP_NUMBER = '6287763484384' // placeholder — ganti nanti
