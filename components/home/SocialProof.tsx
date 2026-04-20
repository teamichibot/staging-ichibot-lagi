'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

type Client = { id: string; name: string; logo: string }

export function SocialProof() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    fetch('/api/clients')
      .then((r) => r.json())
      .then((d: { industry: Client[]; academic: Client[] }) => {
        setClients(d.industry ?? [])
      })
  }, [])

  const track = clients.length > 0 ? [...clients, ...clients] : []

  return (
    <section 
      id="client-logos" 
      className="relative z-20 -mt-16 md:-mt-24 pt-16 md:pt-24 pb-16 md:pb-24 px-4 sm:px-6"
      style={{ background: 'linear-gradient(to bottom, var(--color-navy) 50%, var(--color-navy-light) 50%)' }}
    >
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 rounded-[2rem] pt-8 pb-10 px-6 sm:px-10 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-8">
          {tx(t.socialProof.industryLabel)}
        </p>

        {track.length > 0 && (
          <div
            className="relative"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex animate-marquee gap-12 w-max items-center">
              {track.map((client, i) => (
                <div key={i} className="flex-shrink-0 flex items-center justify-center h-10">
                  {client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-10 w-auto max-w-[140px] object-contain transition-all duration-300"
                      style={{ filter: 'grayscale(1) opacity(0.55)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0) opacity(1)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) opacity(0.55)' }}
                    />
                  ) : (
                    <span className="text-navy/30 font-semibold text-sm whitespace-nowrap select-none border border-border rounded px-3 py-1">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
