import { Metadata } from 'next'
import Link from 'next/link'
import { CTASection } from '@/components/home/CTASection'
import { Timeline } from '@/components/about/Timeline'
import { getAllTeamMembers } from '@/lib/server-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    title: 'Full-Stack dari Silikon ke Cloud',
    desc: 'Kami memahami sistem dari level firmware dan protokol komunikasi non-standar hingga platform cloud. Ketika kebutuhan tak tersedia di pasar, tim kami mengerjakannya in-house — tanpa ketergantungan vendor luar.',
  },
  {
    title: 'Solusi End-to-End + Enablement',
    desc: 'Setiap engagement mencakup solusi AI-IoT yang end-to-end, enablement tim internal klien untuk mandiri, dan akses ke ekosistem engineer serta komponen yang telah kami rawat hampir satu dekade.',
  },
  {
    title: 'Ekosistem 4.000+ Engineer',
    desc: 'Komunitas aktif yang menjadi talent pipeline dan kontribusi nyata pada kedaulatan teknologi nasional. Ichibot Store dengan 1.500+ komponen mendukung riset dan pengembangan di seluruh Indonesia.',
  },
  {
    title: 'Terbukti di Skala Enterprise',
    desc: 'Kepercayaan Toyota, Pertamina, BCA, dan perusahaan enterprise Indonesia bukan sekadar referensi — ini adalah bukti bahwa sistem kami bekerja di lingkungan produksi yang paling menuntut sekalipun.',
  },
]

export default async function AboutPage() {
  const team = await getAllTeamMembers()

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Beranda
          </Link>

          <div className="mt-10 max-w-4xl">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-[1.05]">
              AI-IoT Enablement Platform <span className="text-brand">untuk Industri Indonesia</span>
            </h1>
            <p className="text-ink/55 text-lg md:text-xl leading-relaxed mt-6 max-w-3xl">
              Membantu perusahaan manufaktur, energi, transportasi, dan institusi pemerintahan mengubah data operasional menjadi keputusan strategis melalui arsitektur teknologi yang modular dan siap produksi.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-10 pt-10 border-t border-black/8">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-display text-3xl md:text-5xl font-bold text-ink tracking-tight">{s.value}</p>
                <p className="text-ink/55 text-xs md:text-sm font-semibold uppercase mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About story */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight leading-[1.1] mb-6">
                Transformasi bermakna,<br />bukan solusi generik.
              </h2>
              <div className="space-y-5 text-ink/65 text-lg leading-relaxed">
                <p>
                  Ichibot hadir karena satu keyakinan: akselerasi Industri 4.0 tidak lahir dari solusi generik yang dibeli lepas dari rak. Transformasi yang bermakna hanya mungkin melalui <span className="font-semibold text-ink">pendampingan teknis yang mendalam</span>, adaptasi pada konteks operasional klien, dan transfer pengetahuan yang menyeluruh.
                </p>
                <p>
                  Karena itu, setiap <em>engagement</em> kami selalu mencakup tiga hal: <span className="font-semibold text-ink">solusi AI-IoT industri yang end-to-end</span>, <span className="font-semibold text-ink">enablement bagi tim internal klien</span> untuk memelihara dan mengembangkan sistemnya sendiri, dan akses ke ekosistem engineer yang telah kami rawat selama hampir satu dekade.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[480px] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                  alt="Ichibot Lab"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute bottom-8 left-8 right-8 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                  <p className="font-display text-xl md:text-2xl font-bold italic leading-snug tracking-tight">
                    "Teknologi tinggi baru berguna jika memecahkan masalah bumi manusia."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">
              Hampir satu dekade inovasi
            </h2>
            <p className="text-ink/55 text-lg leading-relaxed mt-4">
              Dari arena robotika hingga platform AI-IoT industri berskala nasional.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Why Ichibot */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">
              Membangun fondasi industri
            </h2>
            <p className="text-ink/55 text-lg leading-relaxed mt-4">
              Kami tidak sekadar membangun sistem — kami membangun fondasi teknologi yang dapat diandalkan untuk kedaulatan industri Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {whyItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 md:p-8">
                <h3 className="font-display text-xl font-bold text-ink tracking-tight mb-3">{item.title}</h3>
                <p className="text-ink/55 text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight">
              Orang-orang di balik Ichibot
            </h2>
            <p className="text-ink/55 text-lg leading-relaxed mt-4">
              Engineer dan inovator yang mendedikasikan diri untuk mendorong batas kemungkinan teknologi industri Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {team.map((person, i) => (
              <div key={i} className="bg-off-white rounded-2xl overflow-hidden flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-bold text-ink tracking-tight">{person.name}</h3>
                  <p className="text-brand text-[11px] font-bold uppercase mt-1 mb-3">{person.role}</p>
                  <p className="text-ink/55 text-sm leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
