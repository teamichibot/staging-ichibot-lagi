import { Metadata } from 'next'
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
      </svg>
    ),
    title: 'Terbukti di Skala Enterprise',
    desc: 'Kepercayaan Toyota, Pertamina, BCA, dan perusahaan enterprise Indonesia bukan sekadar referensi — ini adalah bukti bahwa sistem kami bekerja di lingkungan produksi yang paling menuntut sekalipun.',
  },
]

export default async function AboutPage() {
  const team = await getAllTeamMembers()
  return (
    <main className="min-h-screen bg-[#050A14] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-navy/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-teal/5 rounded-full blur-[110px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="relative max-w-6xl mx-auto px-6 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.25em] mb-10 backdrop-blur-sm shadow-xl">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="opacity-60">PT GASGAS ANAGATA SEMESTA</span>
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 max-w-5xl tracking-tight">
            AI-IoT Enablement Platform{' '}
            <span className="text-teal transition-all hover:text-teal-light">untuk Industri Indonesia</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl opacity-90">
            Membantu perusahaan manufaktur, energi, transportasi, dan institusi pemerintahan mengubah data operasional menjadi keputusan strategis melalui arsitektur teknologi yang modular dan siap produksi.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20 pt-16 border-t border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="group cursor-default">
                <p className="font-display text-3xl md:text-5xl font-bold text-white group-hover:text-teal transition-colors duration-500">{s.value}</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-3 opacity-60 group-hover:opacity-100 transition-opacity">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang Kami ── */}
      <section className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            {/* Text */}
            <div className="animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
              <span className="text-teal text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Tentang Kami</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 mb-10 leading-tight tracking-tight">
                Transformasi Bermakna,<br />Bukan Solusi Generik
              </h2>
              <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
                <p>
                  Ichibot hadir karena satu keyakinan: akselerasi Industri 4.0 tidak lahir dari solusi generik yang dibeli lepas dari rak. Transformasi yang bermakna hanya mungkin melalui <span className="font-bold text-teal/80">pendampingan teknis yang mendalam</span>, adaptasi pada konteks operasional klien, dan transfer pengetahuan yang menyeluruh.
                </p>
                <p>
                  Karena itu, setiap <em>engagement</em> kami selalu mencakup tiga hal: <span className="font-bold text-white">solusi AI-IoT industri yang end-to-end</span>, <span className="font-bold text-white">enablement bagi tim internal klien</span> untuk memelihara dan mengembangkan sistemnya sendiri, dan akses ke ekosistem engineer yang telah kami rawat selama hampir satu dekade.
                </p>
              </div>
            </div>

            {/* Visual card */}
            <div className="relative animate-reveal opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '400ms' }}>
              <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] glass-3d-premium group shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Ichibot Lab"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/90 via-[#050A14]/30 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="font-display text-2xl font-bold text-white italic leading-snug tracking-tight">
                    "Teknologi tinggi baru berguna jika memecahkan masalah bumi manusia."
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-4 glass-3d-premium p-6 flex items-center gap-5 backdrop-blur-xl border-teal/20 animate-bounce-slow">
                <div className="w-14 h-14 rounded-2xl bg-teal/20 flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-sm tracking-tight">Dipercaya sejak 2016</p>
                  <p className="text-slate-400 text-xs font-medium mt-0.5">Toyota · Pertamina · BCA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Perjalanan Kami ── */}
      <section className="py-24 md:py-40 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="text-teal text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Perjalanan Kami</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-1 mb-6 tracking-tight">
              Hampir Satu Dekade Inovasi
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto opacity-80">
              Dari arena robotika hingga platform AI-IoT industri berskala nasional.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* ── Mengapa Ichibot ── */}
      <section className="py-24 md:py-40 relative overflow-hidden bg-[#050A14]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="text-teal text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Solusi Kami</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-1 mb-6 tracking-tight">
              Membangun Fondasi Industri
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
              Kami tidak sekadar membangun sistem — kami membangun fondasi teknologi yang dapat diandalkan untuk kedaulatan industri Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-8 p-10 rounded-[2.5rem] glass-3d-premium group hover:border-teal/30 hover:-translate-y-2 transition-all duration-500 animate-reveal opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-none w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-teal group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-4 tracking-tight group-hover:text-teal transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tim Ichibot ── */}
      <section className="py-24 md:py-40 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 animate-reveal opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="text-teal text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Tim Kami</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-1 mb-6 tracking-tight">
              Orang-Orang di Balik Ichibot
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto opacity-80">
              Engineer dan inovator yang mendedikasikan diri untuk mendorong batas kemungkinan teknologi industri Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {team.map((person, i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.5rem)] min-w-[300px] max-w-[340px] group flex flex-col glass-3d-premium overflow-hidden animate-reveal opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 100}ms` }}
              >
                {/* Photo */}
                <div className="relative w-full h-80 overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <h3 className="font-display text-xl font-bold text-white mb-1 tracking-tight group-hover:text-teal transition-colors">{person.name}</h3>
                  <p className="text-teal text-xs font-bold uppercase tracking-[0.1em] mb-4 opacity-80">{person.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow opacity-90 group-hover:opacity-100 transition-opacity">{person.bio}</p>
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
