'use client'

import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function CTASection() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative bg-brand rounded-3xl px-8 py-16 md:px-16 md:py-24 lg:py-28 text-white text-center overflow-hidden">

          {/* Soft ambient highlights */}
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto">
              {tx(t.cta.heading)}
            </h2>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
              {tx(t.cta.subtext)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://ichibot.fillout.com/projectcustom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-white/95 text-brand font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[180px] text-center"
              >
                {tx(t.cta.button)}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3 rounded-sm transition-colors text-sm min-w-[180px] text-center inline-flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {tx(t.cta.whatsapp)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
