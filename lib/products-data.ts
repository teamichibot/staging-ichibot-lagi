export type BilingualText = { id: string; en: string }

export type ProductData = {
  slug: string
  image: string
  title: BilingualText
  desc: BilingualText
  longDesc: BilingualText
  highlights: BilingualText[]
  features: Array<{ title: BilingualText; desc: BilingualText }>
  specs: Array<{ label: BilingualText; value: BilingualText }>
}

const productImages = [
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200&h=600',
  'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200&h=600',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200&h=600',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600',
]

export const productsData: ProductData[] = [
  {
    slug: 'energy-usage-monitoring',
    image: productImages[0],
    title: { id: 'Energy Usage Monitoring', en: 'Energy Usage Monitoring' },
    desc: {
      id: 'Sistem monitoring konsumsi energi real-time untuk efisiensi dan penghematan biaya listrik pabrik.',
      en: 'Real-time energy consumption monitoring system for efficiency and electricity cost savings.',
    },
    longDesc: {
      id: 'Produk monitoring energi Ichibot memberikan visibilitas penuh terhadap konsumsi listrik di setiap mesin dan area produksi. Dengan data real-time dan analitik cerdas, manajemen dapat mengidentifikasi pemborosan, mengoptimalkan jadwal operasi, dan membuktikan penghematan secara terukur.',
      en: "Ichibot's energy monitoring product provides full visibility into electricity consumption at every machine and production area. With real-time data and intelligent analytics, management can identify waste, optimize operation schedules, and prove savings in measurable terms.",
    },
    highlights: [
      { id: 'Monitoring konsumsi energi per mesin secara real-time', en: 'Per-machine real-time energy consumption monitoring' },
      { id: 'Dashboard KWh, biaya, dan tren konsumsi harian/bulanan', en: 'KWh, cost, and daily/monthly consumption trend dashboard' },
      { id: 'Alert saat konsumsi melebihi threshold yang ditetapkan', en: 'Alerts when consumption exceeds defined thresholds' },
      { id: 'Laporan efisiensi energi otomatis untuk manajemen', en: 'Automatic energy efficiency reports for management' },
      { id: 'Analitik perbandingan antar mesin dan antar shift', en: 'Comparative analytics between machines and shifts' },
    ],
    features: [
      {
        title: { id: 'Real-time Energy Dashboard', en: 'Real-time Energy Dashboard' },
        desc: { id: 'Tampilan visual konsumsi daya listrik dari seluruh mesin dalam satu layar yang mudah dibaca oleh operator maupun manajemen.', en: 'Visual display of power consumption from all machines on one screen, easy to read by operators and management.' },
      },
      {
        title: { id: 'Smart Alert System', en: 'Smart Alert System' },
        desc: { id: 'Notifikasi otomatis via web, email, atau WhatsApp saat konsumsi energi melebihi batas yang ditetapkan.', en: 'Automatic notifications via web, email, or WhatsApp when energy consumption exceeds set limits.' },
      },
      {
        title: { id: 'Laporan & Analitik Otomatis', en: 'Automatic Reports & Analytics' },
        desc: { id: 'Laporan konsumsi energi harian dan bulanan yang terkirim otomatis beserta insight efisiensi dan rekomendasi tindakan.', en: 'Daily and monthly energy consumption reports sent automatically with efficiency insights and action recommendations.' },
      },
      {
        title: { id: 'Integrasi Sensor Clamp', en: 'Clamp Sensor Integration' },
        desc: { id: 'Menggunakan sensor arus clamp-on yang dipasang tanpa memutus instalasi listrik existing — instalasi aman dan cepat.', en: 'Using clamp-on current sensors installed without cutting existing electrical installation — safe and fast installation.' },
      },
    ],
    specs: [
      { label: { id: 'Akurasi Pengukuran', en: 'Measurement Accuracy' }, value: { id: '±1% untuk arus AC', en: '±1% for AC current' } },
      { label: { id: 'Interval Data', en: 'Data Interval' }, value: { id: 'Setiap 1 detik – 1 menit (dapat dikonfigurasi)', en: 'Every 1 second – 1 minute (configurable)' } },
      { label: { id: 'Komunikasi', en: 'Communication' }, value: { id: 'WiFi / 4G / Ethernet', en: 'WiFi / 4G / Ethernet' } },
      { label: { id: 'Akses Dashboard', en: 'Dashboard Access' }, value: { id: 'Web browser & aplikasi mobile (iOS/Android)', en: 'Web browser & mobile app (iOS/Android)' } },
      { label: { id: 'Kapasitas Sensor', en: 'Sensor Capacity' }, value: { id: 'Hingga 256 titik pengukuran per gateway', en: 'Up to 256 measurement points per gateway' } },
    ],
  },
  {
    slug: 'equipment-monitoring',
    image: productImages[1],
    title: { id: 'Equipment Monitoring', en: 'Equipment Monitoring' },
    desc: {
      id: 'Pemantauan kondisi mesin real-time — deteksi anomali sebelum terjadi kerusakan.',
      en: 'Real-time machine condition monitoring — detect anomalies before breakdowns occur.',
    },
    longDesc: {
      id: 'Sistem monitoring kondisi mesin Ichibot memantau parameter kritis seperti suhu, getaran, dan tekanan secara terus-menerus. Dengan AI anomali detection, sistem dapat memprediksi potensi kerusakan jauh sebelum terjadi — memungkinkan jadwal maintenance yang proaktif dan mengurangi downtime tak terduga secara signifikan.',
      en: "Ichibot's equipment monitoring system continuously monitors critical parameters such as temperature, vibration, and pressure. With AI anomaly detection, the system can predict potential failures well before they occur — enabling proactive maintenance scheduling and significantly reducing unexpected downtime.",
    },
    highlights: [
      { id: 'Monitoring suhu, getaran, dan tekanan secara real-time', en: 'Real-time monitoring of temperature, vibration, and pressure' },
      { id: 'AI anomali detection untuk prediksi kerusakan dini', en: 'AI anomaly detection for early failure prediction' },
      { id: 'Riwayat kondisi mesin lengkap untuk analisis tren', en: 'Complete machine condition history for trend analysis' },
      { id: 'Integrasi dengan jadwal PM (Preventive Maintenance)', en: 'Integration with PM (Preventive Maintenance) schedules' },
      { id: 'Pengurangan downtime tak terduga hingga 40%', en: 'Reduction of unexpected downtime by up to 40%' },
    ],
    features: [
      {
        title: { id: 'Condition Monitoring Dashboard', en: 'Condition Monitoring Dashboard' },
        desc: { id: 'Tampilan status kondisi setiap mesin dengan indikator kesehatan (Health Score) yang mudah dipahami oleh teknisi dan manajer.', en: 'Status display for each machine condition with Health Score indicators easily understood by technicians and managers.' },
      },
      {
        title: { id: 'AI Anomaly Detection', en: 'AI Anomaly Detection' },
        desc: { id: 'Model AI yang belajar dari pola normal operasi mesin dan otomatis mendeteksi penyimpangan yang mengindikasikan potensi masalah.', en: 'AI model learning from normal machine operation patterns and automatically detecting deviations indicating potential issues.' },
      },
      {
        title: { id: 'Predictive Maintenance Alert', en: 'Predictive Maintenance Alert' },
        desc: { id: 'Notifikasi prediktif yang merekomendasikan tindakan maintenance sebelum kerusakan terjadi, lengkap dengan estimasi urgensi.', en: 'Predictive notifications recommending maintenance actions before failure occurs, complete with urgency estimates.' },
      },
      {
        title: { id: 'Riwayat & Audit Trail', en: 'History & Audit Trail' },
        desc: { id: 'Rekam jejak lengkap seluruh kejadian, alert, dan tindakan maintenance untuk keperluan audit dan analisis.', en: 'Complete record of all events, alerts, and maintenance actions for audit and analysis purposes.' },
      },
    ],
    specs: [
      { label: { id: 'Parameter Terukur', en: 'Measured Parameters' }, value: { id: 'Suhu, getaran (3-axis), tekanan, arus, RPM', en: 'Temperature, vibration (3-axis), pressure, current, RPM' } },
      { label: { id: 'Frekuensi Sampling', en: 'Sampling Frequency' }, value: { id: 'Hingga 1 kHz untuk getaran', en: 'Up to 1 kHz for vibration' } },
      { label: { id: 'Komunikasi', en: 'Communication' }, value: { id: 'WiFi / 4G / Ethernet / RS-485', en: 'WiFi / 4G / Ethernet / RS-485' } },
      { label: { id: 'Retensi Data', en: 'Data Retention' }, value: { id: 'Minimal 2 tahun data historis', en: 'Minimum 2 years of historical data' } },
      { label: { id: 'IP Rating', en: 'IP Rating' }, value: { id: 'IP65 (tahan debu & semprotan air)', en: 'IP65 (dust and water spray resistant)' } },
    ],
  },
  {
    slug: 'maintenance-ai-chatbot',
    image: productImages[2],
    title: { id: 'Maintenance AI Chatbot', en: 'Maintenance AI Chatbot' },
    desc: {
      id: 'Chatbot AI yang menjawab pertanyaan maintenance, SOP mesin, dan troubleshooting dari data historis.',
      en: 'AI chatbot answering maintenance questions, machine SOPs, and troubleshooting from historical data.',
    },
    longDesc: {
      id: 'Chatbot AI Ichibot dilatih menggunakan dokumen teknis, SOP, dan riwayat maintenance mesin Anda sendiri. Teknisi dapat bertanya kapan saja — tentang prosedur, troubleshooting, atau riwayat kerusakan — dan mendapatkan jawaban yang akurat dan relevan dalam hitungan detik.',
      en: 'The Ichibot AI Chatbot is trained using your own technical documents, SOPs, and machine maintenance history. Technicians can ask anytime — about procedures, troubleshooting, or failure history — and get accurate, relevant answers in seconds.',
    },
    highlights: [
      { id: 'Menjawab pertanyaan SOP dan prosedur maintenance secara instan', en: 'Instantly answers SOP and maintenance procedure questions' },
      { id: 'Dilatih dengan dokumen teknis dan riwayat mesin Anda sendiri', en: 'Trained on your own technical documents and machine history' },
      { id: 'Tersedia 24/7 — tidak perlu menunggu supervisor atau manual fisik', en: '24/7 availability — no need to wait for supervisor or physical manual' },
      { id: 'Mendukung bahasa Indonesia dan Inggris', en: 'Supports Indonesian and English language' },
      { id: 'Terus belajar dan meningkat dari interaksi nyata', en: 'Continuously learns and improves from real interactions' },
    ],
    features: [
      {
        title: { id: 'SOP & Manual Query', en: 'SOP & Manual Query' },
        desc: { id: 'Tanyakan prosedur operasi, langkah maintenance, atau spesifikasi teknis mesin dan dapatkan jawaban tepat dari dokumen resmi.', en: 'Ask about operating procedures, maintenance steps, or machine technical specifications and get precise answers from official documents.' },
      },
      {
        title: { id: 'Troubleshooting Guide', en: 'Troubleshooting Guide' },
        desc: { id: 'Deskripsikan gejala masalah dan chatbot akan memberikan panduan troubleshooting step-by-step berdasarkan kasus serupa di masa lalu.', en: 'Describe the problem symptoms and the chatbot provides step-by-step troubleshooting guides based on similar past cases.' },
      },
      {
        title: { id: 'Riwayat Kerusakan & Perbaikan', en: 'Failure & Repair History' },
        desc: { id: 'Akses riwayat lengkap kerusakan dan perbaikan setiap mesin, serta pola kerusakan yang teridentifikasi AI.', en: 'Access complete failure and repair history for each machine, plus AI-identified failure patterns.' },
      },
      {
        title: { id: 'Integrasi dengan CMMS', en: 'CMMS Integration' },
        desc: { id: 'Terhubung dengan sistem CMMS atau work order existing untuk membuat tiket maintenance langsung dari percakapan.', en: 'Connected to existing CMMS or work order systems to create maintenance tickets directly from conversation.' },
      },
    ],
    specs: [
      { label: { id: 'Model AI', en: 'AI Model' }, value: { id: 'Large Language Model (LLM) fine-tuned', en: 'Fine-tuned Large Language Model (LLM)' } },
      { label: { id: 'Sumber Pengetahuan', en: 'Knowledge Source' }, value: { id: 'PDF, Word, Excel, database internal', en: 'PDF, Word, Excel, internal database' } },
      { label: { id: 'Bahasa', en: 'Language' }, value: { id: 'Indonesia & Inggris', en: 'Indonesian & English' } },
      { label: { id: 'Platform', en: 'Platform' }, value: { id: 'Web app, WhatsApp, Telegram', en: 'Web app, WhatsApp, Telegram' } },
      { label: { id: 'Keamanan Data', en: 'Data Security' }, value: { id: 'On-premise atau private cloud tersedia', en: 'On-premise or private cloud available' } },
    ],
  },
  {
    slug: 'klenik-iot-dashboard',
    image: productImages[3],
    title: { id: 'Klenik IoT Dashboard', en: 'Klenik IoT Dashboard' },
    desc: {
      id: 'Platform dashboard monitoring terintegrasi untuk visualisasi dan manajemen data sensor IoT di seluruh fasilitas.',
      en: 'Integrated dashboard monitoring platform for visualizing and managing IoT sensor data across your facility.',
    },
    longDesc: {
      id: 'Klenik adalah platform dashboard IoT industri milik Ichibot yang dibangun khusus untuk lingkungan manufaktur. Platform ini mengaggregasi data dari berbagai sumber sensor, menampilkannya dalam dashboard yang dapat dikustomisasi, dan memungkinkan manajemen untuk melihat gambaran operasional secara menyeluruh dalam satu platform terpadu.',
      en: "Klenik is Ichibot's proprietary industrial IoT dashboard platform built specifically for manufacturing environments. The platform aggregates data from various sensor sources, displays it in customizable dashboards, and enables management to see a comprehensive operational overview in one integrated platform.",
    },
    highlights: [
      { id: 'Dashboard dapat dikustomisasi sesuai kebutuhan setiap role pengguna', en: 'Dashboards customizable to each user role\'s needs' },
      { id: 'Aggregasi data dari berbagai sumber sensor dan protokol', en: 'Data aggregation from various sensor sources and protocols' },
      { id: 'Multi-site: pantau semua lokasi dari satu platform', en: 'Multi-site: monitor all locations from one platform' },
      { id: 'Alert, notifikasi, dan laporan otomatis terintegrasi', en: 'Integrated alerts, notifications, and automated reports' },
      { id: 'API terbuka untuk integrasi dengan sistem ERP, MES, atau SCADA', en: 'Open API for integration with ERP, MES, or SCADA systems' },
    ],
    features: [
      {
        title: { id: 'Drag-and-drop Dashboard Builder', en: 'Drag-and-drop Dashboard Builder' },
        desc: { id: 'Buat dan kustomisasi tampilan dashboard tanpa coding — pilih widget, atur layout, dan hubungkan ke sumber data yang relevan.', en: 'Create and customize dashboard views without coding — choose widgets, arrange layouts, and connect to relevant data sources.' },
      },
      {
        title: { id: 'Multi-protocol Data Ingestion', en: 'Multi-protocol Data Ingestion' },
        desc: { id: 'Terima data dari berbagai sumber dan protokol: MQTT, Modbus, OPC-UA, HTTP API, maupun koneksi database langsung.', en: 'Receive data from various sources and protocols: MQTT, Modbus, OPC-UA, HTTP API, or direct database connections.' },
      },
      {
        title: { id: 'Rule Engine & Automation', en: 'Rule Engine & Automation' },
        desc: { id: 'Buat aturan logika bisnis untuk memicu alert, kirim notifikasi, atau jalankan aksi otomatis berdasarkan kondisi data sensor.', en: 'Create business logic rules to trigger alerts, send notifications, or run automated actions based on sensor data conditions.' },
      },
      {
        title: { id: 'Open API & Integrasi', en: 'Open API & Integration' },
        desc: { id: 'REST API lengkap untuk integrasi dengan sistem ERP, MES, SCADA, atau aplikasi internal perusahaan Anda.', en: 'Complete REST API for integration with your ERP, MES, SCADA, or internal company applications.' },
      },
    ],
    specs: [
      { label: { id: 'Protokol Didukung', en: 'Supported Protocols' }, value: { id: 'MQTT, Modbus TCP/RTU, OPC-UA, HTTP, WebSocket', en: 'MQTT, Modbus TCP/RTU, OPC-UA, HTTP, WebSocket' } },
      { label: { id: 'Deployment', en: 'Deployment' }, value: { id: 'Cloud, on-premise, atau hybrid', en: 'Cloud, on-premise, or hybrid' } },
      { label: { id: 'Skalabilitas', en: 'Scalability' }, value: { id: 'Dari puluhan hingga ribuan titik data', en: 'From tens to thousands of data points' } },
      { label: { id: 'Akses', en: 'Access' }, value: { id: 'Web browser (responsif) & mobile app', en: 'Web browser (responsive) & mobile app' } },
      { label: { id: 'SLA Uptime', en: 'Uptime SLA' }, value: { id: '99.9% untuk cloud deployment', en: '99.9% for cloud deployment' } },
    ],
  },
]

export function getProductBySlug(slug: string): ProductData | undefined {
  return productsData.find((p) => p.slug === slug)
}
