export type BilingualText = { id: string; en: string }

/** Warna kartu testimoni. Lihat testimonialTones di components/home/Testimonials.tsx */
export type TestimonialTone = 'ice' | 'lime' | 'sky' | 'sand'

/** Testimoni klien yang tampil di halaman utama. */
export type TestimonialData = {
  id: string
  quote: BilingualText
  author: string
  role: BilingualText
  company: string
  /** URL logo perusahaan. Kosongkan untuk memakai inisial nama perusahaan. */
  logo: string
  /** Warna kartu. Kosongkan untuk memakai urutan warna bawaan. */
  color?: TestimonialTone
  /** true selama teksnya masih contoh — memunculkan badge "Contoh" di kartu. */
  placeholder?: boolean
}

/** Kategori bisnis / industri yang bisa dikerjakan Ichibot. */
export type IndustryData = {
  id: string
  /** Kunci ikon, lihat industryIcons di components/home/Industries.tsx */
  icon: string
  name: BilingualText
  desc: BilingualText
}

export const testimonialsData: TestimonialData[] = [
  {
    id: '1',
    quote: {
      id: 'Mesin-mesin lama kami akhirnya bisa dipantau dari satu dashboard tanpa harus diganti. Downtime yang dulu baru ketahuan saat produksi berhenti, sekarang terdeteksi lebih awal.',
      en: 'Our legacy machines are finally visible on a single dashboard without replacing any of them. Downtime we used to discover only when production stopped is now caught early.',
    },
    author: 'Nama Narasumber',
    role: { id: 'Manajer Produksi', en: 'Production Manager' },
    company: 'Nama Perusahaan',
    logo: '',
    color: 'ice',
    placeholder: true,
  },
  {
    id: '2',
    quote: {
      id: 'Proses pemasangannya tidak mengganggu jadwal produksi sama sekali. Tim Ichibot mengerjakan asesmen di lapangan lalu instalasi berjalan bertahap.',
      en: 'The installation did not disrupt our production schedule at all. The Ichibot team ran an on-site assessment first, then rolled out the install in stages.',
    },
    author: 'Nama Narasumber',
    role: { id: 'Kepala Maintenance', en: 'Head of Maintenance' },
    company: 'Nama Perusahaan',
    logo: '',
    color: 'lime',
    placeholder: true,
  },
  {
    id: '3',
    quote: {
      id: 'Yang paling terasa adalah datanya bisa dipakai untuk mengambil keputusan, bukan sekadar angka di layar. Laporan yang dulu manual kini otomatis.',
      en: 'What stands out is that the data is actually usable for decisions, not just numbers on a screen. Reports that used to be manual are now automatic.',
    },
    author: 'Nama Narasumber',
    role: { id: 'Direktur Operasional', en: 'Operations Director' },
    company: 'Nama Perusahaan',
    logo: '',
    color: 'sky',
    placeholder: true,
  },
]

export const industriesData: IndustryData[] = [
  {
    id: '1',
    icon: 'factory',
    name: { id: 'Manufaktur', en: 'Manufacturing' },
    desc: {
      id: 'Monitoring mesin produksi, pelacakan OEE, dan deteksi cacat produk berbasis vision — tanpa mengganti mesin yang sudah ada.',
      en: 'Production machine monitoring, OEE tracking, and vision-based defect detection — without replacing the machines you already run.',
    },
  },
  {
    id: '2',
    icon: 'leaf',
    name: { id: 'Smart Farming & Perkebunan', en: 'Smart Farming & Plantation' },
    desc: {
      id: 'Sensor iklim mikro, kelembapan tanah, dan irigasi otomatis untuk greenhouse, lahan terbuka, hingga perkebunan skala luas.',
      en: 'Microclimate sensing, soil moisture, and automated irrigation for greenhouses, open fields, and large-scale plantations.',
    },
  },
  {
    id: '3',
    icon: 'bolt',
    name: { id: 'Energi & Utilitas', en: 'Energy & Utilities' },
    desc: {
      id: 'Pemantauan konsumsi listrik, genset, dan panel daya untuk menekan biaya energi serta memenuhi pelaporan audit.',
      en: 'Power consumption, genset, and switchgear monitoring to cut energy costs and satisfy audit reporting.',
    },
  },
  {
    id: '4',
    icon: 'truck',
    name: { id: 'Logistik & Pergudangan', en: 'Logistics & Warehousing' },
    desc: {
      id: 'Pelacakan aset, penghitungan barang otomatis, dan pemantauan kondisi gudang seperti suhu dan kelembapan.',
      en: 'Asset tracking, automated item counting, and warehouse condition monitoring such as temperature and humidity.',
    },
  },
  {
    id: '5',
    icon: 'building',
    name: { id: 'Gedung & Fasilitas', en: 'Building & Facilities' },
    desc: {
      id: 'Integrasi HVAC, kelistrikan, dan sistem keamanan gedung ke dalam satu dashboard terpusat.',
      en: 'HVAC, electrical, and building security systems integrated into one centralised dashboard.',
    },
  },
  {
    id: '6',
    icon: 'flask',
    name: { id: 'Pendidikan & Riset', en: 'Education & Research' },
    desc: {
      id: 'Perangkat praktikum IoT dan robotika, serta dukungan riset terapan bersama kampus dan lembaga penelitian.',
      en: 'IoT and robotics lab equipment, plus applied research support alongside universities and research institutes.',
    },
  },
]
