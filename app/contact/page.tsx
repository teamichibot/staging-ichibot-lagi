'use client'

import { useActionState } from 'react'
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
    <div className="pt-24 pb-24 md:pt-32 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            {tx(t.nav.contact)}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2 mb-3">
            {tx(t.contact.heading)}
          </h1>
          <p className="text-muted text-lg">{tx(t.contact.subheading)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
              {state?.success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0D9488" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">
                    {lang === 'id' ? 'Terima kasih!' : 'Thank you!'}
                  </h3>
                  <p className="text-muted">{tx(t.contact.success)}</p>
                </div>
              ) : (
                <form action={action} className="space-y-6">
                  {state && !state.success && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                      {state.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field
                      name="name"
                      label={tx(t.contact.fields.name)}
                      required
                      type="text"
                      autoComplete="name"
                    />
                    <Field
                      name="email"
                      label={tx(t.contact.fields.email)}
                      required
                      type="email"
                      autoComplete="email"
                    />
                    <Field
                      name="company"
                      label={tx(t.contact.fields.company)}
                      type="text"
                      autoComplete="organization"
                    />
                    <Field
                      name="phone"
                      label={tx(t.contact.fields.phone)}
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      {tx(t.contact.fields.service)}
                    </label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
                    >
                      <option value="">—</option>
                      {t.contact.serviceOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {tx(opt)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      {tx(t.contact.fields.message)} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy resize-none focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-teal hover:bg-teal-light text-white font-semibold py-3.5 rounded-full transition-colors text-sm disabled:opacity-60"
                  >
                    {pending
                      ? lang === 'id' ? 'Mengirim...' : 'Sending...'
                      : tx(t.contact.fields.submit)}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border p-7">
              <h3 className="font-display font-bold text-navy mb-5">
                {tx(t.contact.infoHeading)}
              </h3>
              <div className="space-y-4">
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="2,4 12,13 22,4" />
                    </svg>
                  }
                  label="Email"
                  value={t.footer.email}
                  href={`mailto:${t.footer.email}`}
                />
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  }
                  label="WhatsApp"
                  value={lang === 'id' ? 'Chat sekarang' : 'Chat now'}
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  external
                />
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  label={lang === 'id' ? 'Lokasi' : 'Location'}
                  value="Indonesia"
                />
              </div>
            </div>

            {/* Response time */}
            <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal/15 text-teal flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="text-sm text-navy/70">
                  {lang === 'id'
                    ? 'Kami merespons dalam 1 hari kerja. Untuk keperluan mendesak, hubungi via WhatsApp.'
                    : 'We respond within 1 business day. For urgent matters, reach us via WhatsApp.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
      />
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
    <div className="flex items-start gap-3">
      <div className="text-teal mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-muted font-medium">{label}</p>
        <p className="text-sm text-navy font-semibold">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    )
  }
  return content
}
