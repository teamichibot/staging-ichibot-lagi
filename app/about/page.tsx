import { Metadata } from 'next'
import { CTASection } from '@/components/home/CTASection'
import { Timeline } from '@/components/about/Timeline'

export const metadata: Metadata = {
  title: 'Tentang Kami — Ichibot',
  description: 'Ichibot adalah AI-IoT Enablement Platform yang membantu industri Indonesia mempercepat transformasi digital.',
}

const stats = [
  { value: '4.000+', label: 'Engineer & Inovator' },
  { value: '1.500+', label: 'Komponen di Ichibot Store' },
  { value: '~10', label: 'Tahun Pengalaman' },
  { value: '50+', label: 'Klien Enterprise' },
]

const whyItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Full-Stack dari Silikon ke Cloud',
    desc: 'Kami memahami sistem dari level firmware dan protokol komunikasi non-standar hingga platform cloud. Ketika kebutuhan tak tersedia di pasar, tim kami mengerjakannya in-house — tanpa ketergantungan vendor luar.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'Solusi End-to-End + Enablement',
    desc: 'Setiap engagement mencakup solusi AI-IoT yang end-to-end, enablement tim internal klien untuk mandiri, dan akses ke ekosistem engineer serta komponen yang telah kami rawat hampir satu dekade.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Ekosistem 4.000+ Engineer',
    desc: 'Komunitas aktif yang menjadi talent pipeline dan kontribusi nyata pada kedaulatan teknologi nasional. Ichibot Store dengan 1.500+ komponen mendukung riset dan pengembangan di seluruh Indonesia.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Terbukti di Skala Enterprise',
    desc: 'Kepercayaan Toyota, Pertamina, BCA, dan perusahaan enterprise Indonesia bukan sekadar referensi — ini adalah bukti bahwa sistem kami bekerja di lingkungan produksi yang paling menuntut sekalipun.',
  },
]

const team = [
  {
    name: 'Angga Priyatmoko',
    role: 'Founder & CEO',
    bio: 'Memimpin Ichibot sejak 2016. Engineer dengan latar belakang robotika kompetitif yang kini berfokus pada transformasi industri melalui AI dan IoT.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Andi Pratama',
    role: 'Chief Technology Officer',
    bio: 'Memimpin pengembangan platform AI-IoT Ichibot. Spesialis sistem embedded, edge computing, dan integrasi protokol industri.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Citra Dewi',
    role: 'Chief Operating Officer',
    bio: 'Memastikan setiap proyek dieksekusi tepat waktu dan sesuai standar. Berpengalaman dalam manajemen proyek industri skala besar.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Rizky Fauzan',
    role: 'Head of AI Research',
    bio: 'Memimpin riset dan pengembangan model AI untuk aplikasi industri. Fokus pada computer vision dan predictive analytics untuk manufaktur.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-teal/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-teal/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            PT Gasgas Anagata Semesta
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
            AI-IoT Enablement Platform{' '}
            <span className="text-teal-light">untuk Industri Indonesia</span>
          </h1>
          <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-3xl">
            Membantu perusahaan manufaktur, energi, transportasi, dan institusi pemerintahan mengubah data operasional menjadi keputusan strategis — melalui arsitektur teknologi yang modular, terintegrasi, dan siap produksi.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-display text-3xl md:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-white/50 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang Kami ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Text */}
            <div>
              <span className="text-teal text-sm font-semibold uppercase tracking-widest">Tentang Kami</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3 mb-8 leading-tight">
                Transformasi Bermakna,<br />Bukan Solusi Generik
              </h2>
              <div className="space-y-5 text-navy/70 text-base leading-relaxed">
                <p>
                  Ichibot hadir karena satu keyakinan: akselerasi Industri 4.0 tidak lahir dari solusi generik yang dibeli lepas dari rak. Transformasi yang bermakna hanya mungkin melalui <span className="font-semibold text-navy">pendampingan teknis yang mendalam</span>, adaptasi pada konteks operasional klien, dan transfer pengetahuan yang menyeluruh.
                </p>
                <p>
                  Karena itu, setiap <em>engagement</em> kami selalu mencakup tiga hal: <span className="font-semibold text-navy">solusi AI-IoT industri yang end-to-end</span>, <span className="font-semibold text-navy">enablement bagi tim internal klien</span> untuk memelihara dan mengembangkan sistemnya sendiri, dan <span className="font-semibold text-navy">akses ke ekosistem engineer dan komponen</span> yang telah kami rawat selama hampir satu dekade.
                </p>
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[420px] shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Ichibot Lab"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-display text-xl font-bold text-white italic leading-snug">
                    "Teknologi tinggi baru berguna jika memecahkan masalah bumi manusia."
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl border border-border p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-navy text-sm">Dipercaya sejak 2016</p>
                  <p className="text-muted text-xs">Toyota · Pertamina · BCA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Perjalanan Kami ── */}
      <section className="py-24 md:py-32 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">Perjalanan Kami</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">
              Hampir Satu Dekade Inovasi
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Dari arena robotika hingga platform AI-IoT industri berskala nasional.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* ── Mengapa Ichibot ── */}
      <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">Mengapa Ichibot</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              Membangun Fondasi, Bukan Sekadar Sistem
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Kami tidak sekadar membangun sistem — kami membangun fondasi teknologi yang dapat diandalkan untuk generasi industri Indonesia berikutnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-teal/30 transition-all duration-300"
              >
                <div className="flex-none w-12 h-12 rounded-xl bg-teal/15 flex items-center justify-center text-teal">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tim Ichibot ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">Tim Kami</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3 mb-4">
              Orang-Orang di Balik Ichibot
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Engineer dan inovator yang mendedikasikan diri untuk mendorong batas kemungkinan teknologi industri Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person, i) => (
              <div
                key={i}
                className="group flex flex-col rounded-2xl border border-border overflow-hidden hover:border-teal/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative w-full h-64 overflow-hidden bg-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <h3 className="font-display text-lg font-bold text-navy mb-0.5">{person.name}</h3>
                  <p className="text-teal text-xs font-semibold uppercase tracking-wide mb-3">{person.role}</p>
                  <p className="text-muted text-sm leading-relaxed flex-grow">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection />
    </main>
  )
}
