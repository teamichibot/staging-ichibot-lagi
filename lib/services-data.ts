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
    slug: 'iot-system-implementation',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'IoT System Implementation', en: 'IoT System Implementation' },
    desc: {
      id: 'Pemasangan sensor di mesin lama, koneksi ke internet, dan monitoring real-time.',
      en: 'Install sensors on legacy machines, connect to the internet, and enable real-time monitoring.',
    },
    example: {
      id: 'Tarik data suhu & getaran mesin produksi ke dashboard online.',
      en: 'Stream temperature & vibration data from production machines to an online dashboard.',
    },
    longDesc: {
      id: 'Kami pasang sensor pada mesin lama Anda — tanpa mengganti infrastruktur — lalu menghubungkannya ke internet untuk monitoring real-time. Dari suhu, getaran, tekanan, hingga kecepatan produksi, semua data terekam dan dapat diakses kapan saja dari perangkat apa pun.',
      en: 'We install sensors on your legacy machines — without replacing infrastructure — then connect them to the internet for real-time monitoring. From temperature, vibration, pressure, to production speed, all data is recorded and accessible anytime from any device.',
    },
    benefits: [
      { id: 'Mesin lama bisa langsung dimonitor tanpa penggantian unit', en: 'Legacy machines monitored immediately without unit replacement' },
      { id: 'Data real-time dari seluruh lantai produksi dalam satu platform', en: 'Real-time data from the entire production floor in one platform' },
      { id: 'Alert otomatis saat ada anomali atau nilai di luar batas normal', en: 'Automatic alerts when anomalies or out-of-range values occur' },
      { id: 'Biaya implementasi jauh lebih rendah dibanding solusi baru', en: 'Implementation cost far lower compared to new solutions' },
      { id: 'Instalasi non-invasif tanpa menghentikan produksi', en: 'Non-invasive installation without stopping production' },
    ],
    process: [
      {
        title: { id: 'Assessment Mesin', en: 'Machine Assessment' },
        desc: { id: 'Evaluasi mesin dan infrastruktur existing untuk menentukan jenis sensor yang paling tepat.', en: 'Evaluate existing machines and infrastructure to determine the most suitable sensor types.' },
      },
      {
        title: { id: 'Instalasi Sensor', en: 'Sensor Installation' },
        desc: { id: 'Pemasangan sensor non-invasif pada titik-titik kritis mesin produksi.', en: 'Non-invasive sensor installation on critical points of production machines.' },
      },
      {
        title: { id: 'Koneksi & Gateway IoT', en: 'IoT Connectivity & Gateway' },
        desc: { id: 'Setup gateway IoT untuk mengirim data ke cloud secara aman dan handal.', en: 'IoT gateway setup to send data to the cloud securely and reliably.' },
      },
      {
        title: { id: 'Dashboard & Alert System', en: 'Dashboard & Alert System' },
        desc: { id: 'Konfigurasi dashboard monitoring dan sistem alert berdasarkan threshold yang ditentukan bersama.', en: 'Configure monitoring dashboard and alert system based on jointly defined thresholds.' },
      },
      {
        title: { id: 'Training & Serah Terima', en: 'Training & Handover' },
        desc: { id: 'Pelatihan tim operator dan maintenance untuk mengelola sistem secara mandiri.', en: 'Training for operator and maintenance teams to manage the system independently.' },
      },
    ],
    useCases: [
      {
        title: { id: 'Monitoring Suhu & Getaran Mesin', en: 'Machine Temperature & Vibration Monitoring' },
        desc: { id: 'Deteksi dini potensi kerusakan mesin produksi berdasarkan anomali suhu dan getaran.', en: 'Early detection of potential machine failures based on temperature and vibration anomalies.' },
      },
      {
        title: { id: 'Tracking Konsumsi Energi', en: 'Energy Consumption Tracking' },
        desc: { id: 'Monitor konsumsi daya listrik setiap mesin untuk mengidentifikasi pemborosan dan peluang efisiensi.', en: 'Monitor power consumption per machine to identify waste and efficiency opportunities.' },
      },
      {
        title: { id: 'Monitoring Kualitas Lingkungan', en: 'Environmental Quality Monitoring' },
        desc: { id: 'Pantau suhu, kelembaban, dan kualitas udara di area produksi untuk menjaga standar kualitas produk.', en: 'Monitor temperature, humidity, and air quality in production areas to maintain product quality standards.' },
      },
    ],
  },
  {
    slug: 'ai-computer-vision',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'AI Computer Vision', en: 'AI Computer Vision' },
    desc: {
      id: 'Deteksi cacat produk otomatis, counting objek, dan early warning berbasis kamera.',
      en: 'Automatic product defect detection, object counting, and camera-based early warning.',
    },
    example: {
      id: 'Kamera di conveyor yang otomatis tandai produk cacat.',
      en: 'Camera on conveyor automatically flags defective products.',
    },
    longDesc: {
      id: 'Sistem AI berbasis kamera yang bekerja 24/7 untuk mendeteksi cacat produk, menghitung objek, dan memberikan peringatan dini tanpa kelelahan manusia. Model AI kami dilatih khusus berdasarkan data visual dari proses produksi Anda sehingga akurasi deteksi sangat tinggi.',
      en: 'An AI-based camera system that works 24/7 to detect product defects, count objects, and provide early warnings without human fatigue. Our AI model is trained specifically on visual data from your production process for very high detection accuracy.',
    },
    benefits: [
      { id: 'Akurasi deteksi cacat >97% tanpa kelelahan manusia', en: '>97% defect detection accuracy without human fatigue' },
      { id: 'Inspeksi berjalan 24/7 tanpa biaya lembur', en: 'Inspection runs 24/7 without overtime costs' },
      { id: 'Konsistensi kualitas inspeksi antar shift terjaga', en: 'Consistent inspection quality maintained across shifts' },
      { id: 'Waktu deteksi lebih cepat dari inspeksi manual', en: 'Detection time faster than manual inspection' },
      { id: 'Model AI dilatih khusus sesuai produk dan defect type Anda', en: 'AI model trained specifically to your product and defect types' },
    ],
    process: [
      {
        title: { id: 'Pengumpulan Data Visual', en: 'Visual Data Collection' },
        desc: { id: 'Pengumpulan sampel gambar produk bagus dan cacat sebagai data training model AI.', en: 'Collecting sample images of good and defective products as AI model training data.' },
      },
      {
        title: { id: 'Training Model AI', en: 'AI Model Training' },
        desc: { id: 'Pelatihan model computer vision khusus berdasarkan data visual dari proses produksi Anda.', en: 'Training a specialized computer vision model based on visual data from your production process.' },
      },
      {
        title: { id: 'Instalasi Kamera & Hardware', en: 'Camera & Hardware Installation' },
        desc: { id: 'Pemasangan kamera industri dan hardware edge computing di titik inspeksi produksi.', en: 'Installation of industrial cameras and edge computing hardware at production inspection points.' },
      },
      {
        title: { id: 'Integrasi & Kalibrasi', en: 'Integration & Calibration' },
        desc: { id: 'Integrasi sistem dengan lini produksi dan kalibrasi model untuk akurasi optimal.', en: 'System integration with the production line and model calibration for optimal accuracy.' },
      },
      {
        title: { id: 'Validasi & Go-Live', en: 'Validation & Go-Live' },
        desc: { id: 'Pengujian sistem bersama tim QC Anda sebelum beroperasi penuh di lini produksi.', en: 'System testing with your QC team before full operation on the production line.' },
      },
    ],
    useCases: [
      {
        title: { id: 'Inspeksi Cacat Produk di Conveyor', en: 'Product Defect Inspection on Conveyor' },
        desc: { id: 'Kamera yang mendeteksi retak, goresan, warna tidak sesuai, atau bentuk produk yang cacat secara real-time.', en: 'Camera detecting cracks, scratches, wrong colors, or defective product shapes in real-time.' },
      },
      {
        title: { id: 'Counting & Tracking Produk', en: 'Product Counting & Tracking' },
        desc: { id: 'Hitung jumlah produk yang melewati conveyor secara otomatis dan akurat untuk laporan produksi.', en: 'Automatically and accurately count products passing through the conveyor for production reports.' },
      },
      {
        title: { id: 'Safety Monitoring Area Kerja', en: 'Work Area Safety Monitoring' },
        desc: { id: 'Deteksi APD (Alat Pelindung Diri) yang tidak dipakai atau pelanggaran zona berbahaya di area produksi.', en: 'Detect missing PPE (Personal Protective Equipment) or dangerous zone violations in production areas.' },
      },
    ],
  },
  {
    slug: 'ai-decision-support',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'AI Decision Support', en: 'AI Decision Support' },
    desc: {
      id: 'Chatbot pintar per use case industri, predictive analytics, dan otomasi keputusan.',
      en: 'Industry-specific smart chatbots, predictive analytics, and decision automation.',
    },
    example: {
      id: 'Chatbot yang menjawab SOP mesin berdasarkan data historis.',
      en: 'Chatbot that answers machine SOPs based on historical data.',
    },
    longDesc: {
      id: 'Kami bangun sistem AI yang membantu tim Anda mengambil keputusan lebih cepat dan akurat berdasarkan data. Dari chatbot yang menjawab pertanyaan teknis hingga predictive analytics yang meramalkan kerusakan mesin sebelum terjadi — semua dirancang khusus untuk industri Anda.',
      en: 'We build AI systems that help your team make faster and more accurate decisions based on data. From chatbots answering technical questions to predictive analytics forecasting machine failures before they happen — all designed specifically for your industry.',
    },
    benefits: [
      { id: 'Keputusan operasional lebih cepat berbasis data, bukan asumsi', en: 'Faster operational decisions based on data, not assumptions' },
      { id: 'Prediksi kerusakan mesin sebelum terjadi (predictive maintenance)', en: 'Predict machine failures before they occur (predictive maintenance)' },
      { id: 'Akses pengetahuan teknis kapan saja melalui chatbot', en: 'Access technical knowledge anytime through chatbot' },
      { id: 'Otomasi laporan dan analisis rutin', en: 'Automated routine reports and analysis' },
      { id: 'Sistem AI yang terus belajar dari data historis Anda', en: 'AI system that continuously learns from your historical data' },
    ],
    process: [
      {
        title: { id: 'Audit Data & Use Case', en: 'Data Audit & Use Case' },
        desc: { id: 'Inventarisasi data yang tersedia dan identifikasi use case AI yang paling bernilai untuk operasional Anda.', en: 'Inventory available data and identify the most valuable AI use cases for your operations.' },
      },
      {
        title: { id: 'Pengembangan Model AI', en: 'AI Model Development' },
        desc: { id: 'Pembangunan model AI (chatbot, predictive, klasifikasi) sesuai dengan use case yang telah ditentukan.', en: 'Building AI models (chatbot, predictive, classification) according to defined use cases.' },
      },
      {
        title: { id: 'Integrasi ke Sistem Existing', en: 'Integration to Existing Systems' },
        desc: { id: 'Integrasi AI ke sistem yang sudah berjalan — ERP, dashboard, atau platform internal perusahaan.', en: 'Integrating AI into running systems — ERP, dashboard, or internal company platforms.' },
      },
      {
        title: { id: 'Testing & Validasi', en: 'Testing & Validation' },
        desc: { id: 'Pengujian akurasi dan relevansi output AI bersama tim domain expert Anda.', en: 'Testing accuracy and relevance of AI outputs together with your domain expert team.' },
      },
      {
        title: { id: 'Training & Monitoring', en: 'Training & Monitoring' },
        desc: { id: 'Pelatihan pengguna dan setup monitoring performa model AI jangka panjang.', en: 'User training and long-term AI model performance monitoring setup.' },
      },
    ],
    useCases: [
      {
        title: { id: 'Chatbot SOP & Maintenance', en: 'SOP & Maintenance Chatbot' },
        desc: { id: 'Chatbot yang menjawab pertanyaan prosedur operasional dan troubleshooting mesin berdasarkan dokumen teknis internal.', en: 'Chatbot answering operational procedure and machine troubleshooting questions based on internal technical documents.' },
      },
      {
        title: { id: 'Predictive Maintenance', en: 'Predictive Maintenance' },
        desc: { id: 'Model AI yang memprediksi kapan mesin perlu servis berdasarkan pola data historis sensor.', en: 'AI model predicting when machines need servicing based on historical sensor data patterns.' },
      },
      {
        title: { id: 'Analisis Akar Masalah Otomatis', en: 'Automated Root Cause Analysis' },
        desc: { id: 'AI yang menganalisis pola kejadian dan merekomendasikan penyebab masalah produksi secara otomatis.', en: 'AI analyzing event patterns and automatically recommending production problem root causes.' },
      },
    ],
  },
  {
    slug: 'dashboard-monitoring',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'Dashboard & Monitoring', en: 'Dashboard & Monitoring' },
    desc: {
      id: 'Real-time monitoring equipment, visualisasi data operasional, dan alert system.',
      en: 'Real-time equipment monitoring, operational data visualization, and alert systems.',
    },
    example: {
      id: 'Dashboard pabrik yang bisa diakses dari HP kapan saja.',
      en: 'Factory dashboard accessible from your phone anytime.',
    },
    longDesc: {
      id: 'Kami bangun dashboard monitoring yang menyajikan data operasional pabrik secara real-time — dapat diakses dari komputer maupun smartphone. Seluruh data sensor, status mesin, KPI produksi, dan riwayat kejadian tersaji dalam tampilan yang mudah dipahami oleh operator hingga manajemen.',
      en: 'We build monitoring dashboards that present factory operational data in real-time — accessible from computers and smartphones. All sensor data, machine status, production KPIs, and event history presented in a format easy to understand by operators and management alike.',
    },
    benefits: [
      { id: 'Visibilitas penuh ke seluruh operasional pabrik dari satu layar', en: 'Full visibility into all factory operations from one screen' },
      { id: 'Akses dari mana saja melalui web atau aplikasi mobile', en: 'Access from anywhere via web or mobile app' },
      { id: 'Alert real-time via notifikasi, email, atau WhatsApp', en: 'Real-time alerts via notifications, email, or WhatsApp' },
      { id: 'Laporan otomatis harian, mingguan, dan bulanan', en: 'Automatic daily, weekly, and monthly reports' },
      { id: 'Tampilan yang dapat dikustomisasi per role pengguna', en: 'Customizable display per user role' },
    ],
    process: [
      {
        title: { id: 'Requirement & Desain UI', en: 'Requirements & UI Design' },
        desc: { id: 'Diskusi kebutuhan KPI dan tampilan dashboard bersama tim operasional dan manajemen.', en: 'Discussing KPI needs and dashboard layout with operations and management teams.' },
      },
      {
        title: { id: 'Koneksi Sumber Data', en: 'Data Source Connection' },
        desc: { id: 'Integrasi dengan sumber data existing — sensor IoT, database, ERP, atau API eksternal.', en: 'Integration with existing data sources — IoT sensors, databases, ERP, or external APIs.' },
      },
      {
        title: { id: 'Pengembangan Dashboard', en: 'Dashboard Development' },
        desc: { id: 'Pembangunan dashboard web responsif dengan visualisasi data, chart, dan alert system.', en: 'Building a responsive web dashboard with data visualization, charts, and alert system.' },
      },
      {
        title: { id: 'Setup Alert & Laporan', en: 'Alert & Report Setup' },
        desc: { id: 'Konfigurasi threshold alert dan jadwal pengiriman laporan otomatis sesuai kebutuhan.', en: 'Configuring alert thresholds and automatic report delivery schedules as needed.' },
      },
      {
        title: { id: 'Deployment & Training', en: 'Deployment & Training' },
        desc: { id: 'Peluncuran dashboard ke seluruh pengguna dan pelatihan cara membaca serta memanfaatkan data.', en: 'Dashboard rollout to all users and training on how to read and use the data.' },
      },
    ],
    useCases: [
      {
        title: { id: 'OEE & KPI Produksi Real-time', en: 'Real-time OEE & Production KPIs' },
        desc: { id: 'Pantau Overall Equipment Effectiveness, throughput, dan downtime secara real-time dari seluruh lini produksi.', en: 'Monitor Overall Equipment Effectiveness, throughput, and downtime in real-time from all production lines.' },
      },
      {
        title: { id: 'Monitoring Multi-site', en: 'Multi-site Monitoring' },
        desc: { id: 'Satu dashboard terpusat untuk memantau performa operasional dari beberapa lokasi pabrik sekaligus.', en: 'One centralized dashboard to monitor operational performance from multiple factory locations simultaneously.' },
      },
      {
        title: { id: 'Executive Summary & Laporan', en: 'Executive Summary & Reports' },
        desc: { id: 'Dashboard ringkasan eksekutif dan laporan otomatis yang dikirim ke manajemen secara terjadwal.', en: 'Executive summary dashboard and automated reports delivered to management on schedule.' },
      },
    ],
  },
  {
    slug: 'training-consulting',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'Training & Consulting', en: 'Training & Consulting' },
    desc: {
      id: 'Transfer knowledge ke tim klien, project-based training, dan mentoring teknis.',
      en: 'Knowledge transfer to client teams, project-based training, and technical mentoring.',
    },
    example: {
      id: 'Workshop 2 minggu, setelahnya tim klien bisa maintain sistem sendiri.',
      en: '2-week workshop, after which the client team can maintain the system independently.',
    },
    longDesc: {
      id: 'Kami tidak hanya membangun sistem — kami memastikan tim Anda mampu mengoperasikan dan mengembangkannya secara mandiri. Program training kami dirancang berbasis proyek nyata di lingkungan kerja Anda, sehingga ilmu yang diserap langsung relevan dan dapat diterapkan.',
      en: "We don't just build systems — we ensure your team can operate and develop them independently. Our training programs are project-based in your real work environment, so the knowledge absorbed is immediately relevant and applicable.",
    },
    benefits: [
      { id: 'Tim internal dapat mandiri mengelola sistem IoT & AI', en: 'Internal team can independently manage IoT & AI systems' },
      { id: 'Training berbasis proyek nyata, bukan teori belaka', en: 'Project-based training on real scenarios, not just theory' },
      { id: 'Mengurangi ketergantungan pada vendor jangka panjang', en: 'Reduces long-term vendor dependency' },
      { id: 'Kurikulum disesuaikan dengan level dan kebutuhan tim', en: 'Curriculum tailored to team level and needs' },
      { id: 'Mentoring teknis berkelanjutan pasca training', en: 'Ongoing technical mentoring post-training' },
    ],
    process: [
      {
        title: { id: 'Assessment Kemampuan Tim', en: 'Team Capability Assessment' },
        desc: { id: 'Evaluasi skill dan pengetahuan tim untuk menentukan starting point dan kurikulum yang tepat.', en: 'Evaluate team skills and knowledge to determine the right starting point and curriculum.' },
      },
      {
        title: { id: 'Desain Kurikulum', en: 'Curriculum Design' },
        desc: { id: 'Penyusunan kurikulum training berbasis studi kasus nyata dari industri dan operasional Anda.', en: 'Developing training curriculum based on real case studies from your industry and operations.' },
      },
      {
        title: { id: 'Workshop & Hands-on', en: 'Workshop & Hands-on' },
        desc: { id: 'Pelaksanaan workshop intensif dengan sesi teori dan praktik langsung di environment Anda.', en: 'Intensive workshop execution with theory and hands-on practice sessions in your environment.' },
      },
      {
        title: { id: 'Proyek Capstone', en: 'Capstone Project' },
        desc: { id: 'Tim Anda menyelesaikan proyek mini yang relevan sebagai bukti kompetensi.', en: 'Your team completes a relevant mini-project as proof of competency.' },
      },
      {
        title: { id: 'Mentoring Pasca Training', en: 'Post-training Mentoring' },
        desc: { id: 'Sesi mentoring berkala untuk memastikan implementasi berjalan dan menjawab pertanyaan teknis.', en: 'Regular mentoring sessions to ensure implementation progresses and answer technical questions.' },
      },
    ],
    useCases: [
      {
        title: { id: 'Training IoT untuk Teknisi Pabrik', en: 'IoT Training for Factory Technicians' },
        desc: { id: 'Program intensif untuk teknisi agar bisa memasang, mengkonfigurasi, dan troubleshoot sistem IoT secara mandiri.', en: 'Intensive program for technicians to independently install, configure, and troubleshoot IoT systems.' },
      },
      {
        title: { id: 'Consulting Roadmap Digitalisasi', en: 'Digitalization Roadmap Consulting' },
        desc: { id: 'Pendampingan strategic untuk memetakan prioritas dan rencana implementasi digitalisasi pabrik secara bertahap.', en: 'Strategic consulting to map out priorities and phased factory digitalization implementation plans.' },
      },
      {
        title: { id: 'Akademik & Penelitian', en: 'Academic & Research' },
        desc: { id: 'Program kolaborasi dengan perguruan tinggi untuk proyek penelitian IoT dan AI industri berbasis kasus nyata.', en: 'Collaboration program with universities for real-case-based industrial IoT and AI research projects.' },
      },
    ],
  },
  {
    slug: 'layanan-kustom',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200&h=600',
    title: { id: 'Layanan Kustom', en: 'Custom Services' },
    desc: {
      id: 'Pengembangan IoT & AI khusus sesuai dengan masalah operasional spesifik di pabrik Anda.',
      en: 'Custom IoT & AI development tailored to specific operational problems in your factory.',
    },
    example: {
      id: 'Solusi end-to-end yang dirancang eksklusif berdasarkan kebutuhan unik.',
      en: 'End-to-end solution designed exclusively based on unique requirements.',
    },
    longDesc: {
      id: 'Setiap pabrik memiliki tantangan uniknya sendiri. Layanan kustom kami dirancang untuk masalah operasional spesifik yang tidak bisa diselesaikan dengan solusi generik — mulai dari integrasi sistem lama, protokol komunikasi tidak standar, hingga pengembangan hardware khusus.',
      en: "Every factory has its own unique challenges. Our custom services are designed for specific operational problems that cannot be solved with generic solutions — from legacy system integration, non-standard communication protocols, to custom hardware development.",
    },
    benefits: [
      { id: 'Solusi dirancang 100% sesuai kebutuhan dan constraint spesifik Anda', en: 'Solution designed 100% to your specific needs and constraints' },
      { id: 'Tim engineering berpengalaman di berbagai protokol industri', en: 'Engineering team experienced in various industrial protocols' },
      { id: 'Pendekatan iteratif dengan feedback loop yang cepat', en: 'Iterative approach with fast feedback loops' },
      { id: 'Ownership penuh atas solusi dan kode yang dikembangkan', en: 'Full ownership of the developed solution and code' },
      { id: 'Dukungan jangka panjang dan pengembangan berkelanjutan', en: 'Long-term support and continuous development' },
    ],
    process: [
      {
        title: { id: 'Discovery & Problem Framing', en: 'Discovery & Problem Framing' },
        desc: { id: 'Sesi mendalam untuk memahami masalah, constraint teknis, dan tujuan bisnis yang ingin dicapai.', en: 'Deep-dive session to understand the problem, technical constraints, and business goals to achieve.' },
      },
      {
        title: { id: 'Desain Arsitektur Solusi', en: 'Solution Architecture Design' },
        desc: { id: 'Perancangan arsitektur teknis yang optimal berdasarkan kebutuhan dan constraint yang telah dipetakan.', en: 'Designing the optimal technical architecture based on mapped needs and constraints.' },
      },
      {
        title: { id: 'Proof of Concept (PoC)', en: 'Proof of Concept (PoC)' },
        desc: { id: 'Pengembangan prototype cepat untuk memvalidasi pendekatan sebelum implementasi penuh.', en: 'Rapid prototype development to validate the approach before full implementation.' },
      },
      {
        title: { id: 'Pengembangan & Iterasi', en: 'Development & Iteration' },
        desc: { id: 'Pengembangan solusi penuh dengan siklus review berkala bersama tim Anda.', en: 'Full solution development with regular review cycles with your team.' },
      },
      {
        title: { id: 'Deployment & Dukungan', en: 'Deployment & Support' },
        desc: { id: 'Implementasi di environment produksi dan setup dukungan teknis jangka panjang.', en: 'Implementation in production environment and long-term technical support setup.' },
      },
    ],
    useCases: [
      {
        title: { id: 'Integrasi Mesin Legacy ke Sistem Modern', en: 'Legacy Machine Integration to Modern Systems' },
        desc: { id: 'Jembatan komunikasi antara mesin lama (RS-232, Modbus, PLC) dengan platform cloud modern.', en: 'Communication bridge between legacy machines (RS-232, Modbus, PLC) and modern cloud platforms.' },
      },
      {
        title: { id: 'Pengembangan Hardware Kustom', en: 'Custom Hardware Development' },
        desc: { id: 'Desain dan fabrikasi perangkat IoT khusus untuk kondisi lingkungan industri yang ekstrem.', en: 'Design and fabrication of specialized IoT devices for extreme industrial environmental conditions.' },
      },
      {
        title: { id: 'Platform SaaS Industri', en: 'Industrial SaaS Platform' },
        desc: { id: 'Pengembangan platform perangkat lunak industri berbasis web yang dapat digunakan oleh banyak pengguna secara bersamaan.', en: 'Development of web-based industrial software platform usable by multiple users simultaneously.' },
      },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}

export function getAllServices(): ServiceData[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path') as typeof import('path')
    const file = path.join(process.cwd(), 'data', 'services.json')
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8')) as ServiceData[]
    }
  } catch {
    // fall through to static data
  }
  return servicesData
}

export function getServiceBySlugLive(slug: string): ServiceData | undefined {
  return getAllServices().find((s) => s.slug === slug)
}
