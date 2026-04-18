'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function Footer() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold text-white">
              Ichibot
            </Link>
            <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-xs">
              {tx(t.footer.tagline)}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                className="text-white/60 hover:text-white transition-colors"
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
          {t.footer.navGroups.map((group) => (
            <div key={group.label.id}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {tx(group.label)}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
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
