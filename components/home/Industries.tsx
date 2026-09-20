'use client'

import { useLang } from '@/contexts/LanguageContext'
import type { IndustryData } from '@/lib/homepage-data'

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Kunci ikon yang bisa dipilih dari admin panel. */
export const industryIcons: Record<string, React.ReactNode> = {
  factory: (
    <svg {...iconProps}>
      <path d="M3 21V10l5 3V10l5 3V8l6 3v10z" />
      <path d="M17 11V3h3v8" />
      <path d="M3 21h18" />
    </svg>
  ),
  leaf: (
    <svg {...iconProps}>
      <path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-10 0 9-3 16-9 17z" />
      <path d="M4 21c2-6 6-9 11-11" />
    </svg>
  ),
  bolt: (
    <svg {...iconProps}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  truck: (
    <svg {...iconProps}>
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  building: (
    <svg {...iconProps}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1" />
      <path d="M10 22v-4h4v4" />
    </svg>
  ),
  flask: (
    <svg {...iconProps}>
      <path d="M9 2v6l-5.6 9.7A2 2 0 0 0 5.1 21h13.8a2 2 0 0 0 1.7-3.3L15 8V2" />
      <path d="M8 2h8" />
      <path d="M6.6 15h10.8" />
    </svg>
  ),
  chip: (
    <svg {...iconProps}>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </svg>
  ),
  droplet: (
    <svg {...iconProps}>
      <path d="M12 2.7s6 6 6 10.3a6 6 0 0 1-12 0C6 8.7 12 2.7 12 2.7z" />
    </svg>
  ),
  shield: (
    <svg {...iconProps}>
      <path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" />
    </svg>
  ),
  cart: (
    <svg {...iconProps}>
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h3l2.4 11.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  ),
}

export function Industries({ industries }: { industries: IndustryData[] }) {
  const { lang } = useLang()

  if (industries.length === 0) return null

  return (
    <section id="industri" className="bg-[#0B0E13] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-sky-400 text-sm font-semibold tracking-wide uppercase mb-4">
            {lang === 'id' ? 'Industri yang Kami Layani' : 'Industries We Serve'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {lang === 'id'
              ? 'Satu pendekatan, banyak sektor.'
              : 'One approach, many sectors.'}
          </h2>
          <p className="text-white/55 text-base md:text-lg leading-relaxed mt-5">
            {lang === 'id'
              ? 'Kebutuhan tiap industri berbeda, tapi masalahnya sering sama: data yang terkunci di mesin dan proses yang masih manual. Berikut sektor yang sudah kami kerjakan.'
              : 'Every industry has its own needs, but the problem is often the same: data locked inside machines and processes still done by hand. These are the sectors we work in.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {industries.map((item) => (
            <div
              key={item.id}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8 hover:bg-white/[0.06] hover:border-sky-400/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-6 group-hover:bg-sky-400 group-hover:text-[#0B0E13] transition-colors">
                {industryIcons[item.icon] ?? industryIcons.factory}
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight mb-3">
                {item.name[lang]}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
