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
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">
          {label}
        </p>
        <div
          className="relative"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
          }}
        >
          <div className={`flex ${speed} hover-pause gap-16 w-max items-center py-2`}>
            {track.map((client, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center h-12 px-6 transition-all duration-500 group">
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 md:h-12 w-auto max-w-[160px] object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <span className="text-slate-400 font-display font-bold text-base tracking-tight whitespace-nowrap select-none group-hover:text-teal transition-colors">
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
      className="relative z-20 -mt-24 md:-mt-40 pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* Local Ambient Glow - Specifically for the glass island */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-teal/20 via-sky-500/15 to-teal/20 rounded-full blur-[100px] pointer-events-none opacity-50" />
      
      {/* Light Frosted Glass Container */}
      <div className="relative max-w-6xl mx-auto bg-white/90 backdrop-blur-3xl p-10 md:p-16 overflow-hidden border border-white/40 rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.2)]">
        {loading ? (
          <div className="space-y-12">
            <div>
              <Skeleton className="h-3 w-40 mx-auto mb-8 bg-slate-200" />
              <div className="flex gap-12 justify-center overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-12 w-32 shrink-0 bg-slate-200" />)}
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderTrack(data.industry, tx(t.socialProof.industryLabel))}
            {data.academic.length > 0 && (
              <div className="mt-12 pt-12 border-t border-slate-200">
                {renderTrack(data.academic, lang === 'id' ? 'MITRA AKADEMIK' : 'ACADEMIC PARTNERS', 'animate-marquee-reverse')}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
