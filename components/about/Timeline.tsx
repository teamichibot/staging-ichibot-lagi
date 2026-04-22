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
        {/* Track */}
        <div className="relative flex items-start justify-between mb-16">
          {/* Line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-border" />
          <div
            className="absolute top-5 left-0 h-px bg-teal transition-all duration-500 ease-out"
            style={{ width: `${(active / (milestones.length - 1)) * 100}%` }}
          />

          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative flex flex-col items-center group z-10"
              style={{ width: `${100 / milestones.length}%` }}
            >
              {/* Node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  i <= active
                    ? 'bg-teal border-teal text-navy shadow-lg shadow-teal/30'
                    : 'bg-white border-border text-muted group-hover:border-teal/50 group-hover:text-teal'
                }`}
              >
                {m.icon}
              </div>

              {/* Year label */}
              <span
                className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  i === active ? 'text-teal' : 'text-muted group-hover:text-navy'
                }`}
              >
                {m.year}
              </span>
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="relative overflow-hidden rounded-2xl bg-navy p-10 text-white min-h-[200px]">
          <div className="absolute top-0 right-[-5%] w-[300px] h-[300px] bg-teal/10 rounded-full blur-[80px] pointer-events-none" />
          <div key={active} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-teal text-xs font-bold uppercase tracking-widest">{milestones[active].year}</span>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-white/60 text-xs">{milestones[active].subtitle}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">{milestones[active].title}</h3>
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">{milestones[active].desc}</p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden space-y-3">
        {milestones.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i === active ? -1 : i)}
            className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
              i === active ? 'border-teal/40 bg-navy' : 'border-border bg-white hover:border-teal/30'
            }`}
          >
            <div className="flex items-center gap-4 p-5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  i === active ? 'bg-teal text-navy' : 'bg-navy/5 text-muted'
                }`}
              >
                {m.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-bold uppercase tracking-wider ${i === active ? 'text-teal' : 'text-muted'}`}>{m.year}</span>
                <p className={`font-display font-bold text-base leading-tight ${i === active ? 'text-white' : 'text-navy'}`}>{m.title}</p>
              </div>
              <svg
                className={`w-4 h-4 shrink-0 transition-transform duration-300 ${i === active ? 'rotate-180 text-teal' : 'text-muted'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {i === active && (
              <div className="px-5 pb-6">
                <p className="text-white/70 text-sm leading-relaxed">{m.desc}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
