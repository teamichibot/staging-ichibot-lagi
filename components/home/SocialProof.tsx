'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

import { Skeleton } from '../ui/Skeleton'

type Client = { id: string; name: string; logo: string }

export function SocialProof() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const [data, setData] = useState<{ industry: Client[]; academic: Client[] }>({ industry: [], academic: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients')
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const renderTrack = (clients: Client[], label: string, speed: string = 'animate-marquee') => {
    if (clients.length === 0) return null
    const track = [...clients, ...clients] // Use exactly 2 sets for a perfect 50% translation loop
    
    return (
      <div className="mb-8 last:mb-0">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-6">
          {label}
        </p>
        <div
          className="relative"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
          }}
        >
          <div className={`flex ${speed} hover-pause gap-12 w-max items-center py-2`}>
            {track.map((client, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center h-10 px-4 transition-all duration-500 group">
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 md:h-10 w-auto max-w-[140px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <span className="text-navy/40 font-display font-bold text-sm tracking-tight whitespace-nowrap select-none group-hover:text-navy/80 transition-colors">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section 
      id="client-logos" 
      className="relative z-20 -mt-16 md:-mt-24 pt-16 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6"
    >
      {/* Background shape - Unified with Deep Dark theme */}
      <div className="absolute inset-0 bg-[#050A14]" />
      
      <div className="relative max-w-6xl mx-auto bg-white/90 backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.12)] border border-white/20 rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
        {loading ? (
          <div className="space-y-10">
            <div>
              <Skeleton className="h-3 w-32 mx-auto mb-6" />
              <div className="flex gap-8 justify-center overflow-hidden">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-10 w-28 shrink-0" />)}
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderTrack(data.industry, tx(t.socialProof.industryLabel))}
            {data.academic.length > 0 && (
              <div className="mt-10 pt-10 border-t border-navy/5">
                {renderTrack(data.academic, lang === 'id' ? 'MITRA AKADEMIK' : 'ACADEMIK PARTNERS', 'animate-marquee-reverse')}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
