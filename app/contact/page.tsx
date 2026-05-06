'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'
import { submitContact, type ContactResult } from './actions'

export default function ContactPage() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]

  const [state, action, pending] = useActionState<ContactResult | null, FormData>(
    submitContact,
    null
  )

  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  return (
    <main className="bg-white">

      {/* Hero header */}
      <section className="bg-white pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/55 hover:text-ink text-sm font-semibold transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Beranda
          </Link>

          <div className="mt-10 max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.05]">
              {tx(t.contact.heading)}
            </h1>
            <p className="text-ink/55 text-lg md:text-xl leading-relaxed mt-6">
              {tx(t.contact.subheading)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10">
                {state?.success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-5">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink tracking-tight mb-3">
                      {lang === 'id' ? 'Terima kasih!' : 'Thank you!'}
                    </h3>
                    <p className="text-ink/55">{tx(t.contact.success)}</p>
                  </div>
                ) : (
                  <form action={action} className="space-y-5">
                    {state && !state.success && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
                        {state.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field name="name" label={tx(t.contact.fields.name)} required type="text" autoComplete="name" />
                      <Field name="email" label={tx(t.contact.fields.email)} required type="email" autoComplete="email" />
                      <Field name="company" label={tx(t.contact.fields.company)} type="text" autoComplete="organization" />
                      <Field name="phone" label={tx(t.contact.fields.phone)} type="tel" autoComplete="tel" />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-ink/55 uppercase">
                        {tx(t.contact.fields.service)}
                      </label>
                      <select name="service" className={inputCls + ' appearance-none cursor-pointer'}>
                        <option value=""> — </option>
                        {t.contact.serviceOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>{tx(opt)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-ink/55 uppercase">
                        {tx(t.contact.fields.message)} <span className="text-brand">*</span>
                      </label>
                      <textarea name="message" rows={5} required className={inputCls + ' resize-none'} />
                    </div>

                    <button
                      type="submit"
                      disabled={pending}
                      className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-sm transition-colors text-sm disabled:opacity-60"
                    >
                      {pending
                        ? lang === 'id' ? 'Mengirim...' : 'Sending...'
                        : tx(t.contact.fields.submit)}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Side info */}
            <div className="space-y-5 md:space-y-6">
              <div className="bg-white rounded-2xl p-7 md:p-8">
                <h3 className="font-display font-bold text-ink text-lg mb-6 tracking-tight">
                  {tx(t.contact.infoHeading)}
                </h3>
                <div className="space-y-5">
                  <InfoItem
                    icon={(
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="2,4 12,13 22,4" />
                      </svg>
                    )}
                    label="Email"
                    value={t.footer.email}
                    href={`mailto:${t.footer.email}`}
                  />
                  <InfoItem
                    icon={(
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    )}
                    label="WhatsApp"
                    value={lang === 'id' ? 'Chat sekarang' : 'Chat now'}
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                    external
                  />
                  <InfoItem
                    icon={(
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                    label={lang === 'id' ? 'Lokasi' : 'Location'}
                    value="Yogyakarta, Indonesia"
                  />
                </div>
              </div>

              <div className="bg-brand/5 border border-brand/15 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <p className="text-sm text-ink/65 leading-relaxed">
                    {lang === 'id'
                      ? 'Kami merespons dalam 1 hari kerja. Untuk keperluan mendesak, hubungi via WhatsApp.'
                      : 'We respond within 1 business day. For urgent matters, reach us via WhatsApp.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

const inputCls =
  'w-full bg-white border border-black/12 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand/40 transition-colors text-sm'

function Field({
  name, label, required, type = 'text', autoComplete,
}: {
  name: string
  label: string
  required?: boolean
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-ink/55 uppercase">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className={inputCls} />
    </div>
  )
}

function InfoItem({
  icon, label, value, href, external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="text-brand mt-1 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[11px] text-ink/45 font-semibold uppercase mb-1">{label}</p>
        <p className="text-ink font-semibold group-hover:text-brand transition-colors">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block group"
      >
        {content}
      </a>
    )
  }
  return content
}
