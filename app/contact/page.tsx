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
    <div className="pt-24 pb-24 md:pt-32 bg-[#050A14] min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-80">
            {tx(t.nav.contact)}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {tx(t.contact.heading)}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">{tx(t.contact.subheading)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-3d-premium p-8 md:p-10">
              {state?.success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6 border border-teal/20">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#00D1FF" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {lang === 'id' ? 'Terima kasih!' : 'Thank you!'}
                  </h3>
                  <p className="text-slate-400">{tx(t.contact.success)}</p>
                </div>
              ) : (
                <form action={action} className="space-y-6">
                  {state && !state.success && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-5 py-4">
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
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {tx(t.contact.fields.service)}
                    </label>
                    <select
                      name="service"
                      className="glass-input w-full appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0B1221]"> — </option>
                      {t.contact.serviceOptions.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#0B1221]">
                          {tx(opt)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {tx(t.contact.fields.message)} <span className="text-teal">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="glass-input w-full resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-teal hover:bg-teal-light text-navy font-bold py-4 rounded-xl transition-all duration-300 text-sm disabled:opacity-60 shadow-lg shadow-teal/20"
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
            <div className="glass-3d-premium p-8">
              <h3 className="font-display font-bold text-white text-lg mb-6">
                {tx(t.contact.infoHeading)}
              </h3>
              <div className="space-y-6">
                <InfoItem
                  icon={
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div className="relative group overflow-hidden rounded-2xl bg-teal/5 border border-teal/20 p-6">
              <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 border border-teal/20">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
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
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="glass-input w-full"
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
    <div className="flex items-start gap-4">
      <div className="text-teal mt-1 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white font-semibold group-hover:text-teal transition-colors">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block group transition-transform hover:translate-x-1"
      >
        {content}
      </a>
    )
  }
  return content
}
