'use client'

import { useLang } from '@/contexts/LanguageContext'

const Icon = {
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Recycle: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  ),
  Layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

export function WhyIchibot() {
  const { lang } = useLang()

  const traditionalPoints = lang === 'id'
    ? ['Investasi besar di awal', 'Lead time pengadaan berbulan-bulan', 'Hardware baru menambah e-waste']
    : ['Massive upfront investment', 'Months of procurement lead time', 'New hardware adds to e-waste']

  const ichibotPoints = lang === 'id'
    ? ['Investasi minimal, ROI cepat', 'Deploy dalam hitungan minggu', 'Tetap pakai hardware terpercaya']
    : ['Minimal investment, faster ROI', 'Deploy in a matter of weeks', 'Keep using the hardware you trust']

  const benefits = [
    {
      icon: <Icon.Recycle />,
      title: { id: 'Tanpa Penggantian', en: 'Zero Replacement' },
      desc: {
        id: 'Pertahankan hardware yang Anda percaya. Hilangkan limbah peralatan.',
        en: 'Keep the hardware you trust. Eliminate equipment waste.',
      },
    },
    {
      icon: <Icon.Layers />,
      title: { id: 'Integrasi Mulus', en: 'Seamless Integration' },
      desc: {
        id: 'Instalasi non-disruptif. Produksi Anda tetap berjalan.',
        en: 'Non-disruptive installation. Your production stays live.',
      },
    },
    {
      icon: <Icon.Zap />,
      title: { id: 'Koneksi Instan', en: 'Instant Connectivity' },
      desc: {
        id: 'Dari offline ke online. Data real-time dari mesin mana pun.',
        en: 'From offline to online. Get real-time data from any machine.',
      },
    },
  ]

  return (
    <section className="bg-[#0B0E13] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Hero image with overlaid heading */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black mb-12 md:mb-16" style={{ height: 'min(58vh, 560px)', minHeight: '420px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&q=80&w=2400"
            alt="Industrial machinery with retrofit smart layer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-4 md:whitespace-nowrap">
              {lang === 'id' ? 'Otak Modern. Otot Terbukti.' : 'Modern Brains. Proven Muscles.'}
            </h2>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl line-clamp-2">
              {lang === 'id'
                ? 'Industri 4.0 tidak harus mengganti perangkat lama — kami pasang AI dan IoT pada mesin yang sudah Anda miliki.'
                : "Industry 4.0 shouldn't replace your hardware — we retrofit AI and IoT into your existing machinery."}
            </p>
          </div>
        </div>

        {/* Comparison — side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16">
          {/* Traditional */}
          <div className="bg-[#171B23] rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              {lang === 'id' ? 'Beli Mesin Smart Baru' : 'Buy New Smart Machines'}
            </h3>
            <p className="text-white/55 mb-7 leading-relaxed">
              {lang === 'id' ? 'CAPEX tinggi & lead time lama' : 'High CAPEX & long lead times'}
            </p>
            <ul className="space-y-3.5">
              {traditionalPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-white/65">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-white/8 text-white/40 flex items-center justify-center shrink-0">
                    <Icon.X />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ichibot — brand-navy dominant */}
          <div className="relative bg-brand rounded-2xl p-8 md:p-10 text-white">
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {lang === 'id' ? 'Retrofit Aset Existing' : 'Retrofit Existing Assets'}
            </h3>
            <p className="text-white/75 mb-7 leading-relaxed">
              {lang === 'id' ? 'CAPEX rendah & deploy cepat' : 'Low CAPEX & rapid deployment'}
            </p>
            <ul className="space-y-3.5">
              {ichibotPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-white/90">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                    <Icon.Check />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="border-t border-white/15 pt-7">
              <div className="w-11 h-11 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-5">
                {b.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2">
                {b.title[lang]}
              </h3>
              <p className="text-white/55 text-[15px] leading-relaxed">
                {b.desc[lang]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
