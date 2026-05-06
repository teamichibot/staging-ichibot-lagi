export type BilingualText = { id: string; en: string }

export type ServiceData = {
  slug: string
  image: string
  title: BilingualText
  desc: BilingualText
  example: BilingualText
  longDesc: BilingualText
  benefits: BilingualText[]
  process: Array<{ title: BilingualText; desc: BilingualText }>
  useCases: Array<{ title: BilingualText; desc: BilingualText }>
}

export const servicesData: ServiceData[] = [
  {
    slug: 'iot-real-time-monitoring',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    title: { id: 'IoT Real-time Monitoring', en: 'IoT Real-time Monitoring' },
    desc: {
      id: 'Pantau parameter penting mesin secara real-time, dari mana pun.',
      en: 'Monitor critical machine parameters in real time, from anywhere.',
    },
    example: {
      id: 'Tarik data suhu, getaran, dan konsumsi listrik mesin produksi ke dashboard online.',
      en: 'Stream temperature, vibration, and power consumption data from production machines to an online dashboard.',
    },
    longDesc: {
      id: 'Pasang sensor non-invasif pada mesin existing Anda dan dapatkan visibilitas penuh atas operasi pabrik. Dari suhu, getaran, tekanan, hingga konsumsi energi — semua data terekam real-time dan dapat diakses kapan saja dari perangkat apa pun.',
      en: 'Install non-invasive sensors on your existing machines and gain full visibility into factory operations. From temperature, vibration, and pressure to energy consumption — every parameter is recorded in real time and accessible from any device, anywhere.',
    },
    benefits: [
      { id: 'Visibilitas real-time atas seluruh lantai produksi', en: 'Real-time visibility across the entire production floor' },
      { id: 'Alert otomatis saat parameter di luar batas normal', en: 'Automatic alerts when parameters fall outside normal range' },
      { id: 'Tanpa modifikasi mesin atau gangguan produksi', en: 'No machine modifications or production downtime' },
      { id: 'Data tersimpan untuk analitik dan audit', en: 'Data archived for analytics and audit' },
    ],
    process: [
      { title: { id: 'Assessment Lapangan', en: 'On-site Assessment' }, desc: { id: 'Identifikasi mesin dan parameter kritis yang perlu dipantau.', en: 'Identify machines and critical parameters to monitor.' } },
      { title: { id: 'Instalasi Sensor', en: 'Sensor Installation' }, desc: { id: 'Pasang sensor IoT non-invasif tanpa menghentikan operasi.', en: 'Install non-invasive IoT sensors without halting operations.' } },
      { title: { id: 'Konfigurasi Dashboard', en: 'Dashboard Configuration' }, desc: { id: 'Atur visualisasi, threshold alert, dan akses pengguna.', en: 'Configure visualizations, alert thresholds, and user access.' } },
      { title: { id: 'Go-Live & Training', en: 'Go-Live & Training' }, desc: { id: 'Sistem aktif disertai pelatihan tim operator dan maintenance.', en: 'System goes live with training for operator and maintenance teams.' } },
    ],
    useCases: [
      { title: { id: 'Monitoring Mesin Produksi', en: 'Production Machine Monitoring' }, desc: { id: 'Deteksi dini anomali suhu dan getaran sebelum terjadi kerusakan.', en: 'Early detection of temperature and vibration anomalies before failures occur.' } },
      { title: { id: 'Tracking Konsumsi Energi', en: 'Energy Consumption Tracking' }, desc: { id: 'Pantau penggunaan daya per mesin untuk identifikasi pemborosan.', en: 'Track per-machine power usage to identify waste.' } },
    ],
  },
  {
    slug: 'custom-llm-development',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600',
    title: { id: 'Custom LLM Development', en: 'Custom LLM Development' },
    desc: {
      id: 'Model bahasa khusus untuk operasi pabrik, dilatih dari data Anda sendiri.',
      en: 'Custom language models for factory operations, trained on your own data.',
    },
    example: {
      id: 'Asisten AI yang menjawab pertanyaan teknisi berdasarkan SOP, manual mesin, dan riwayat maintenance perusahaan Anda.',
      en: 'An AI assistant that answers technician questions using your company SOPs, machine manuals, and maintenance history.',
    },
    longDesc: {
      id: 'Kami bangun Large Language Model yang disesuaikan dengan domain dan data internal Anda. Cocok untuk asisten teknisi, knowledge base operasional, atau otomatisasi tugas berbasis dokumen yang sebelumnya butuh waktu manual berjam-jam.',
      en: "We build Large Language Models tailored to your domain and internal data. Ideal for technician assistants, operational knowledge bases, or document-driven task automation that previously took hours of manual effort.",
    },
    benefits: [
      { id: 'Privasi data terjaga — model di-host di infrastruktur Anda', en: 'Data privacy preserved — model hosted on your infrastructure' },
      { id: 'Akurasi tinggi karena dilatih dari data domain spesifik', en: 'High accuracy from domain-specific training data' },
      { id: 'Mengurangi beban pencarian manual di dokumen', en: 'Reduces manual document-search workload' },
      { id: 'Bisa diintegrasikan ke chatbot, app, atau API internal', en: 'Integrable with internal chatbots, apps, or APIs' },
    ],
    process: [
      { title: { id: 'Discovery & Use Case', en: 'Discovery & Use Case' }, desc: { id: 'Petakan kebutuhan, jenis pertanyaan, dan sumber data internal.', en: 'Map needs, query patterns, and internal data sources.' } },
      { title: { id: 'Persiapan Dataset', en: 'Dataset Preparation' }, desc: { id: 'Kumpulkan dan bersihkan dokumen, transkrip, dan data percakapan.', en: 'Gather and clean documents, transcripts, and conversation data.' } },
      { title: { id: 'Fine-tuning Model', en: 'Model Fine-tuning' }, desc: { id: 'Latih dan validasi model pada data Anda dengan iterasi yang terukur.', en: 'Train and validate the model on your data with measurable iterations.' } },
      { title: { id: 'Deploy & Integrasi', en: 'Deploy & Integration' }, desc: { id: 'Sambungkan model ke aplikasi, chatbot, atau workflow internal.', en: 'Connect the model into apps, chatbots, or internal workflows.' } },
    ],
    useCases: [
      { title: { id: 'Asisten Teknisi Maintenance', en: 'Maintenance Technician Assistant' }, desc: { id: 'Pertanyaan teknis dijawab instan berdasarkan SOP dan manual.', en: 'Technical questions answered instantly from SOPs and manuals.' } },
      { title: { id: 'Knowledge Base Internal', en: 'Internal Knowledge Base' }, desc: { id: 'Tim non-teknis dapat menemukan jawaban tanpa harus baca dokumen panjang.', en: 'Non-technical teams find answers without reading long documents.' } },
    ],
  },
  {
    slug: 'aiot-system-integration',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600',
    title: { id: 'AIoT System Integration', en: 'AIoT System Integration' },
    desc: {
      id: 'Integrasi AI + IoT untuk keputusan otomatis berbasis data lapangan.',
      en: 'AI + IoT integration that delivers automated decisions from field data.',
    },
    example: {
      id: 'Sistem yang otomatis mematikan mesin saat sensor mendeteksi getaran abnormal, lalu mengirim laporan diagnosa ke teknisi.',
      en: 'A system that automatically shuts down a machine when sensors detect abnormal vibration, then sends a diagnostic report to technicians.',
    },
    longDesc: {
      id: 'Kami satukan ekosistem sensor IoT dengan algoritma AI sehingga sistem Anda bukan hanya mengumpulkan data, tetapi juga membuat keputusan. Cocok untuk predictive maintenance, kontrol proses adaptif, dan otomatisasi shopfloor.',
      en: 'We unify your IoT sensor ecosystem with AI algorithms so the system not only collects data but also makes decisions. Ideal for predictive maintenance, adaptive process control, and shopfloor automation.',
    },
    benefits: [
      { id: 'Keputusan otomatis tanpa intervensi manual', en: 'Automated decisions without manual intervention' },
      { id: 'Predictive maintenance — perbaikan sebelum mesin rusak', en: 'Predictive maintenance — repairs before failure' },
      { id: 'Mengurangi unplanned downtime hingga 80%', en: 'Reduces unplanned downtime by up to 80%' },
      { id: 'Sistem belajar terus dari data baru', en: 'System continuously learns from new data' },
    ],
    process: [
      { title: { id: 'Audit Infrastruktur', en: 'Infrastructure Audit' }, desc: { id: 'Petakan sistem IoT existing dan titik integrasi AI yang paling tinggi nilainya.', en: 'Map existing IoT systems and the highest-value AI integration points.' } },
      { title: { id: 'Desain Arsitektur', en: 'Architecture Design' }, desc: { id: 'Rancang pipeline data, model AI, dan logic decision yang sesuai.', en: 'Design the data pipeline, AI model, and decision logic.' } },
      { title: { id: 'Implementasi & Tuning', en: 'Implementation & Tuning' }, desc: { id: 'Bangun, deploy, dan tuning model sampai performa stabil.', en: 'Build, deploy, and tune the model until performance is stable.' } },
      { title: { id: 'Monitoring Berkelanjutan', en: 'Continuous Monitoring' }, desc: { id: 'Awasi performa model dan retraining sesuai data baru.', en: 'Monitor model performance and retrain with new data.' } },
    ],
    useCases: [
      { title: { id: 'Predictive Maintenance', en: 'Predictive Maintenance' }, desc: { id: 'AI memprediksi kerusakan mesin sebelum terjadi.', en: 'AI predicts machine failures before they happen.' } },
      { title: { id: 'Adaptive Process Control', en: 'Adaptive Process Control' }, desc: { id: 'Parameter mesin otomatis menyesuaikan dengan kondisi lapangan.', en: 'Machine parameters adapt automatically to field conditions.' } },
    ],
  },
  {
    slug: 'computer-vision-solutions',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    title: { id: 'Computer Vision Solutions', en: 'Computer Vision Solutions' },
    desc: {
      id: 'Inspeksi visual otomatis dengan kamera + AI untuk QC dan monitoring area.',
      en: 'Automated visual inspection with cameras + AI for QC and area monitoring.',
    },
    example: {
      id: 'Kamera di conveyor mendeteksi cacat produk secara real-time dan otomatis menandai unit yang gagal QC.',
      en: 'Cameras on a conveyor detect product defects in real time and automatically flag units that fail QC.',
    },
    longDesc: {
      id: 'Kombinasi kamera industrial-grade dan model computer vision yang dilatih untuk kebutuhan Anda — dari deteksi cacat produk, perhitungan output, sampai monitoring keselamatan area kerja.',
      en: 'A combination of industrial-grade cameras and computer vision models trained to your needs — from defect detection and output counting to workplace safety monitoring.',
    },
    benefits: [
      { id: 'Akurasi inspeksi visual lebih konsisten dari manual', en: 'Visual inspection more consistent than manual' },
      { id: 'Mengurangi kebutuhan operator inspeksi 24/7', en: 'Reduces need for round-the-clock inspection operators' },
      { id: 'Data visual tersimpan untuk traceability', en: 'Visual data archived for traceability' },
      { id: 'Model dapat dilatih ulang untuk SKU baru', en: 'Models retrainable for new SKUs' },
    ],
    process: [
      { title: { id: 'Penentuan Use Case', en: 'Use Case Definition' }, desc: { id: 'Tentukan target inspeksi, akurasi yang dibutuhkan, dan throughput.', en: 'Define inspection targets, required accuracy, and throughput.' } },
      { title: { id: 'Pengumpulan Data Visual', en: 'Visual Data Collection' }, desc: { id: 'Ambil sample image untuk training dan validasi model.', en: 'Capture sample images for model training and validation.' } },
      { title: { id: 'Training Model AI', en: 'AI Model Training' }, desc: { id: 'Latih dan validasi model sampai mencapai akurasi target.', en: 'Train and validate the model to target accuracy.' } },
      { title: { id: 'Instalasi & Go-Live', en: 'Installation & Go-Live' }, desc: { id: 'Pasang kamera, integrasi sistem, dan handover.', en: 'Install cameras, integrate systems, and hand over.' } },
    ],
    useCases: [
      { title: { id: 'Quality Control Otomatis', en: 'Automated Quality Control' }, desc: { id: 'Deteksi cacat produk di lini produksi secara real-time.', en: 'Real-time defect detection on the production line.' } },
      { title: { id: 'Safety & Area Monitoring', en: 'Safety & Area Monitoring' }, desc: { id: 'Pantau penggunaan APD dan zona terlarang area pabrik.', en: 'Monitor PPE compliance and restricted-zone access on the factory floor.' } },
    ],
  },
  {
    slug: 'consultation-enablement',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
    title: { id: 'Consultation & Enablement', en: 'Consultation & Enablement' },
    desc: {
      id: 'Pendampingan strategis dan pelatihan agar tim internal mandiri.',
      en: 'Strategic advisory and training so your internal team becomes self-sufficient.',
    },
    example: {
      id: 'Kami susun roadmap digitalisasi 12 bulan dan latih tim engineering Anda mengoperasikan sistem AI-IoT secara mandiri.',
      en: 'We build a 12-month digitalization roadmap and train your engineering team to run the AI-IoT system independently.',
    },
    longDesc: {
      id: 'Kami bantu pemetaan kebutuhan, prioritisasi inisiatif, dan transfer knowledge agar Industri 4.0 bukan sekadar proyek pihak ketiga — melainkan kapabilitas internal Anda.',
      en: 'We help map needs, prioritize initiatives, and transfer knowledge so Industry 4.0 is not just a third-party project — but a real internal capability.',
    },
    benefits: [
      { id: 'Roadmap digitalisasi yang realistis dan terukur', en: 'Realistic, measurable digitalization roadmap' },
      { id: 'Tim internal naik kelas — tidak bergantung vendor terus-menerus', en: 'Internal team levels up — no constant vendor dependency' },
      { id: 'Materi training disesuaikan dengan konteks pabrik Anda', en: 'Training material tailored to your factory context' },
      { id: 'Sertifikasi internal opsional', en: 'Optional internal certification' },
    ],
    process: [
      { title: { id: 'Diskusi Awal', en: 'Initial Discussion' }, desc: { id: 'Pahami kondisi, target bisnis, dan readiness organisasi.', en: 'Understand conditions, business targets, and organizational readiness.' } },
      { title: { id: 'Roadmap & Prioritisasi', en: 'Roadmap & Prioritization' }, desc: { id: 'Susun rencana berbasis dampak dan kemudahan implementasi.', en: 'Build a plan grounded in impact and feasibility.' } },
      { title: { id: 'Workshop & Training', en: 'Workshop & Training' }, desc: { id: 'Latih tim teknis dan non-teknis sesuai peran masing-masing.', en: 'Train technical and non-technical teams per their roles.' } },
      { title: { id: 'Review Berkala', en: 'Periodic Review' }, desc: { id: 'Evaluasi progress dan koreksi arah jika diperlukan.', en: 'Evaluate progress and adjust direction as needed.' } },
    ],
    useCases: [
      { title: { id: 'Penyusunan Roadmap Industri 4.0', en: 'Industry 4.0 Roadmap Development' }, desc: { id: 'Cetak biru transformasi digital yang spesifik untuk pabrik Anda.', en: 'A digital-transformation blueprint specific to your factory.' } },
      { title: { id: 'Training Tim Internal', en: 'Internal Team Training' }, desc: { id: 'Membuat operator dan engineer mampu mengelola sistem AI-IoT mandiri.', en: 'Empowers operators and engineers to manage AI-IoT systems independently.' } },
    ],
  },
  {
    slug: 'hardware-software-provisioning',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1800',
    title: { id: 'Hardware & Software Provisioning', en: 'Hardware & Software Provisioning' },
    desc: {
      id: 'Pasokan perangkat industrial-grade dan software siap pakai untuk implementasi penuh.',
      en: 'Industrial-grade hardware and ready-to-deploy software for full-stack implementation.',
    },
    example: {
      id: 'Paket lengkap: gateway IoT, sensor, server lokal, dan software dashboard — semua sudah dikonfigurasi dan siap pasang.',
      en: 'A complete package: IoT gateway, sensors, on-prem server, and dashboard software — pre-configured and ready to install.',
    },
    longDesc: {
      id: 'Kami sediakan kombinasi hardware industrial-grade (sensor, gateway, server, kamera) dan software platform yang sudah dikonfigurasi sesuai kebutuhan Anda. Pengadaan, integrasi, dan support — satu pintu.',
      en: 'We supply a combination of industrial-grade hardware (sensors, gateways, servers, cameras) and platform software pre-configured to your needs. Procurement, integration, and support — all in one.',
    },
    benefits: [
      { id: 'Single source untuk hardware + software + integrasi', en: 'Single source for hardware + software + integration' },
      { id: 'Garansi dan support purna jual jangka panjang', en: 'Long-term warranty and after-sales support' },
      { id: 'Stack yang sudah teruji bersama, mengurangi risiko kompatibilitas', en: 'Stack tested together, reducing compatibility risk' },
      { id: 'Lead time lebih singkat dibanding pengadaan terpisah', en: 'Shorter lead time vs separate procurement' },
    ],
    process: [
      { title: { id: 'Spesifikasi Kebutuhan', en: 'Requirements Specification' }, desc: { id: 'Petakan kebutuhan hardware, software, dan kapasitas sistem.', en: 'Map hardware, software, and system-capacity requirements.' } },
      { title: { id: 'Pengadaan & Konfigurasi', en: 'Procurement & Configuration' }, desc: { id: 'Pilih hardware, instal software, dan konfigurasi default.', en: 'Source hardware, install software, and configure defaults.' } },
      { title: { id: 'Instalasi On-site', en: 'On-site Installation' }, desc: { id: 'Pasang dan integrasi langsung di lokasi.', en: 'Install and integrate directly on-site.' } },
      { title: { id: 'Support & Maintenance', en: 'Support & Maintenance' }, desc: { id: 'SLA support, update software, dan penggantian hardware bila perlu.', en: 'SLA support, software updates, and hardware replacement when needed.' } },
    ],
    useCases: [
      { title: { id: 'Paket Turnkey Pabrik', en: 'Turnkey Factory Package' }, desc: { id: 'Hardware, software, dan instalasi dalam satu kontrak.', en: 'Hardware, software, and installation in one contract.' } },
      { title: { id: 'Refresh Infrastruktur IoT', en: 'IoT Infrastructure Refresh' }, desc: { id: 'Upgrade gateway dan platform tanpa membongkar sensor existing.', en: 'Upgrade gateways and platform without ripping out existing sensors.' } },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}
