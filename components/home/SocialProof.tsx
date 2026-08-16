'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '../ui/Skeleton'

type Client = { id: string; name: string; logo: string }

export function SocialProof() {
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

  const renderTrack = (clients: Client[], speed: string = 'animate-marquee') => {
    if (clients.length === 0) return null
    const track = [...clients, ...clients] // Use exactly 2 sets for a perfect 50% translation loop

    return (
      <div
        className="relative mb-5 last:mb-0"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <div className={`flex ${speed} hover-pause gap-24 w-max items-center py-2`}>
          {track.map((client, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-9 px-6 transition-all duration-500 group">
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-6 md:h-8 w-auto max-w-[120px] object-contain grayscale invert opacity-90 group-hover:filter-none group-hover:opacity-100 transition-all duration-500"
                />
              ) : (
                <span className="text-white/40 font-display font-bold text-sm tracking-tight whitespace-nowrap select-none group-hover:text-white transition-colors">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      id="client-logos"
      className="relative z-20 py-4 md:py-6 overflow-hidden bg-[#0B0E13]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {loading ? (
          <div>
            <Skeleton className="h-3 w-40 mx-auto mb-8 bg-white/10" />
            <div className="flex gap-12 justify-center overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-12 w-32 shrink-0 bg-white/10" />)}
            </div>
          </div>
        ) : (
          <>
            {renderTrack(data.industry)}
            {data.academic.length > 0 && renderTrack(data.academic, 'animate-marquee-reverse')}
          </>
        )}
      </div>
    </section>
  )
}
