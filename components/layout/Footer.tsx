'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function Footer({ 
  liveServices, 
  liveProducts 
}: { 
  liveServices?: any[], 
  liveProducts?: any[] 
}) {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  // Process live data for the groups
  const navGroups = t.footer.navGroups.map(group => {
    if (group.label.id === 'Layanan' && liveServices && liveServices.length > 0) {
      return { 
        ...group, 
        links: liveServices.map(s => ({ label: s.title, href: `/layanan/${s.slug}` })) 
      }
    }
    if (group.label.id === 'Produk' && liveProducts && liveProducts.length > 0) {
      return { 
        ...group, 
        links: liveProducts.map(p => ({ label: p.title, href: `/produk/${p.slug}` })) 
      }
    }
    return group
  })

  return (
    <footer className="bg-navy-light text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logos/logo.svg"
                alt="Ichibot"
                width={120}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/logos/logo_gas.svg" 
                alt="Logo GAS" 
                width={28} 
                height={20} 
                className="brightness-0 invert opacity-90 object-contain"
              />
              <h3 className="text-white font-bold tracking-wider text-sm">
                PT. GASGAS ANAGATA SEMESTA
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {tx(t.footer.tagline)}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ichibot.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@ichibot.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.41-.01 2.31 0 4.62-.01 6.93-.11 2.37-1.22 4.71-3.23 6.02-2.02 1.31-4.72 1.54-6.9 1.14-2.18-.4-4.22-1.78-5.32-3.76-1.1-1.98-1.2-4.43-.6-6.6.61-2.18 2.21-4.06 4.33-4.8 1.34-.47 2.82-.5 4.2-.21V12a4.42 4.42 0 00-2.29.61c-.81.47-1.41 1.24-1.68 2.15-.27.91-.18 1.93.3 2.73.48.81 1.3 1.38 2.22 1.55.92.17 1.91-.08 2.65-.63.74-.55 1.19-1.4 1.25-2.33.06-.51.05-4.84.05-12.28z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ichibot_id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                className="text-white/60 hover:text-teal transition-colors"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.label.id}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {tx(group.label)}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, idx) => (
                  <li key={link.href + idx}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {tx(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">{tx(t.footer.copyright)}</p>
          <p className="text-white/40 text-sm">{t.footer.email}</p>
        </div>
      </div>
    </footer>
  )
}
