'use client'

import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

interface Logo {
  name: string
  src: string
  w: number   // display width at h=40
  invert?: boolean  // for logos with dark background
}

const logos: Logo[] = [
  { name: 'Toyota (TMMIN)',   src: '/logos/toyota.png',            w: 96  },
  { name: 'Pertamina',        src: '/logos/Pertamina_Logo.svg',    w: 130 },
  { name: 'BCA',              src: '/logos/bca.png',               w: 100 },
  { name: 'Johnson Controls', src: '/logos/johnson-controls.png',  w: 150 },
  { name: 'Asperio',          src: '/logos/asperio.png',           w: 72,  invert: true },
  { name: 'Kuanta',           src: '/logos/kuanta.webp',           w: 130 },
  { name: 'DocO',             src: '/logos/doco.png',              w: 100 },
  { name: 'EKRAF',            src: '/logos/ekraf.png',             w: 120 },
  { name: 'Erlangga',         src: '',                             w: 110 }, // logo menyusul
]

const track = [...logos, ...logos]

export function SocialProof() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]

  return (
    <section id="client-logos" className="relative z-20 -mt-16 md:-mt-24 pb-16 md:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 rounded-[2rem] pt-8 pb-10 px-6 sm:px-10 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-8">
          {tx(t.socialProof.industryLabel)}
        </p>

        <div 
          className="relative"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex animate-marquee gap-12 w-max items-center">
            {track.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: logo.w, height: 40 }}
              >
                {logo.src ? (
                  <div className="relative w-full h-full group/logo">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      sizes={`${logo.w}px`}
                      className="object-contain transition-all duration-300"
                      style={{
                        filter: logo.invert
                          ? 'brightness(0) grayscale(1) opacity(0.55)'
                          : 'grayscale(1) opacity(0.55)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = logo.invert ? 'brightness(1) grayscale(0) opacity(1)' : 'grayscale(0) opacity(1)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter = logo.invert ? 'brightness(0) grayscale(1) opacity(0.55)' : 'grayscale(1) opacity(0.55)'
                      }}
                    />
                  </div>
                ) : (
                  /* Placeholder untuk logo yang belum ada */
                  <span className="text-navy/30 font-semibold text-sm whitespace-nowrap select-none border border-border rounded px-3 py-1">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
