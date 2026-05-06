'use client'

import { useState } from 'react'

const milestones = [
  {
    year: '2016',
    title: 'Fondasi',
    subtitle: 'Lahir dari Arena Kompetisi',
    desc: 'Ichibot didirikan di Yogyakarta oleh Angga Priyatmoko bersama sekelompok engineer muda. Kapabilitas rekayasa ditempa melalui kompetisi robotika tingkat tinggi — menuntut presisi hardware, keandalan sistem real-time, dan optimasi hingga tingkat komponen. Disiplin inilah yang menjadi DNA kami.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    year: '2019',
    title: 'Transformasi',
    subtitle: 'Dari Lab ke Perusahaan',
    desc: 'Bergabung dengan Amikom Business Park (ABP) Incubator dan bertransformasi dari tim riset menjadi perusahaan teknologi yang terstruktur. Kapabilitas berkembang dari rekayasa perangkat keras menuju integrasi IoT dan AI untuk kebutuhan industri.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    year: '2021',
    title: 'Pengakuan Global',
    subtitle: 'Asia Hardware Battle',
    desc: 'Pengakuan di ajang Asia Hardware Battle mengukuhkan kemampuan rekayasa Ichibot di panggung regional. Kapabilitas IoT dan AI untuk industri mendapat validasi internasional sebagai solusi yang siap bersaing di level Asia.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    year: '2022',
    title: 'Kemitraan Enterprise',
    subtitle: 'Toyota & Pertamina',
    desc: 'Kemitraan strategis dengan Pertamina dan Toyota mengukuhkan posisi Ichibot sebagai mitra teknologi dalam negeri yang layak dipercaya untuk pekerjaan berskala besar. Sistem IoT monitoring real-time di lini produksi Toyota menjadi flagship project yang membuktikan keandalan platform kami.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    year: 'Kini',
    title: 'Ekosistem Nasional',
    subtitle: '4.000+ Engineer & Ichibot Store',
    desc: 'Ekosistem Ichibot kini mencakup lebih dari 4.000 engineer dan inovator dalam komunitas yang aktif, serta Ichibot Store dengan 1.500+ komponen elektronika dan sensor untuk riset dan pengembangan. Ini adalah talent pipeline dan kontribusi kami pada kedaulatan teknologi nasional.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export function Timeline() {
  const [active, setActive] = useState(0)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: horizontal nodes */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between mb-14 px-8">
          <div className="absolute top-6 left-8 right-8 h-px bg-black/10" />
          <div
            className="absolute top-6 left-8 h-px bg-brand transition-all duration-700 ease-out"
            style={{ width: `calc(${(active / (milestones.length - 1)) * 100}% - 16px)` }}
          />

          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative flex flex-col items-center group z-10"
              style={{ width: `${100 / milestones.length}%` }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  i <= active
                    ? 'bg-brand border-brand text-white scale-110'
                    : 'bg-white border-black/10 text-ink/45 group-hover:border-brand/40 group-hover:text-brand'
                }`}
              >
                {m.icon}
              </div>
              <span
                className={`mt-4 text-xs font-bold uppercase transition-colors duration-300 ${
                  i <= active ? 'text-brand' : 'text-ink/40'
                }`}
              >
                {m.year}
              </span>
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="bg-off-white rounded-2xl p-10 min-h-[220px]">
          <div key={active} className="animate-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-brand text-xs font-bold uppercase">{milestones[active].year}</span>
              <span className="w-8 h-px bg-black/15" />
              <span className="text-ink/55 text-xs font-semibold uppercase">{milestones[active].subtitle}</span>
            </div>
            <h3 className="font-display text-3xl font-bold text-ink mb-4 tracking-tight">{milestones[active].title}</h3>
            <p className="text-ink/65 text-base md:text-lg leading-relaxed max-w-3xl">{milestones[active].desc}</p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden space-y-3">
        {milestones.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i === active ? -1 : i)}
            className={`w-full text-left rounded-2xl border transition-colors overflow-hidden ${
              i === active
                ? 'border-brand/30 bg-off-white'
                : 'border-black/8 bg-white hover:bg-off-white'
            }`}
          >
            <div className="flex items-center gap-4 p-5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  i === active
                    ? 'bg-brand text-white'
                    : 'bg-black/5 text-ink/45'
                }`}
              >
                {m.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-bold uppercase ${i === active ? 'text-brand' : 'text-ink/40'}`}>
                  {m.year}
                </span>
                <p className={`font-display font-bold text-lg leading-tight mt-1 ${i === active ? 'text-ink' : 'text-ink/65'}`}>
                  {m.title}
                </p>
              </div>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${i === active ? 'rotate-180 text-brand' : 'text-ink/35'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {i === active && (
              <div className="px-5 pb-6">
                <p className="text-ink/45 text-[11px] font-bold uppercase mb-2">{m.subtitle}</p>
                <p className="text-ink/65 text-sm leading-relaxed">{m.desc}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
