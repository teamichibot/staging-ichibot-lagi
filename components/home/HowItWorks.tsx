'use client'

import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

function StepVisual({ index }: { index: number }) {
  // Step 1 — Problem & Needs Analysis (checklist + magnifier)
  if (index === 0) {
    return (
      <div className="relative w-40 h-32">
        <div className="absolute inset-x-0 top-2 bottom-2 rounded-2xl bg-white border border-black/8 p-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-brand flex items-center justify-center text-white">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div className="h-1.5 flex-1 rounded bg-black/12 max-w-[78px]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-brand flex items-center justify-center text-white">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div className="h-1.5 flex-1 rounded bg-black/12 max-w-[96px]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border border-black/20" />
              <div className="h-1.5 flex-1 rounded bg-black/10 max-w-[60px]" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-14 h-14 rounded-2xl bg-brand flex items-center justify-center shadow-[0_8px_24px_rgba(0,52,89,0.25)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </div>
      </div>
    )
  }

  // Step 2 — Site Survey & Discussion (map + people)
  if (index === 1) {
    return (
      <div className="relative w-40 h-32">
        <div className="absolute inset-x-0 top-2 bottom-2 rounded-2xl bg-white border border-black/8 overflow-hidden flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-black/[0.06]" aria-hidden>
            <defs>
              <pattern id="grid-survey" width="14" height="14" patternUnits="userSpaceOnUse">
                <path d="M 14 0 L 0 0 0 14" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-survey)" />
          </svg>
          <div className="relative z-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="rgba(0,52,89,0.12)" />
              <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-12 h-12 rounded-full bg-brand flex items-center justify-center shadow-[0_8px_24px_rgba(0,52,89,0.25)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
    )
  }

  // Step 3 — Solution Design & Deployment (blueprint + rocket)
  if (index === 2) {
    return (
      <div className="relative w-40 h-32">
        <div className="absolute inset-x-0 top-2 bottom-2 rounded-2xl bg-brand p-4 overflow-hidden">
          <div className="space-y-2">
            <div className="h-1.5 w-16 rounded bg-white/40" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-7 rounded bg-white/20 border border-white/15" />
              <div className="h-7 rounded bg-white/30 border border-white/20" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="h-3 rounded bg-white/15" />
              <div className="h-3 rounded bg-white/25" />
              <div className="h-3 rounded bg-white/15" />
            </div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-12 h-12 rounded-full bg-white border border-black/8 flex items-center justify-center shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
      </div>
    )
  }

  // Step 4 — Hand-over & Training (handover doc + graduation)
  return (
    <div className="relative w-40 h-32 flex items-center justify-center">
      <div className="relative w-24 h-28 rounded-xl bg-white border border-black/10 p-3">
        <div className="space-y-1.5 mb-3">
          <div className="h-1.5 w-3/4 rounded bg-black/12" />
          <div className="h-1.5 w-1/2 rounded bg-black/10" />
          <div className="h-1.5 w-2/3 rounded bg-black/10" />
        </div>
        <div className="h-1 w-full rounded bg-black/8 mb-2" />
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </span>
          <div className="h-1.5 flex-1 rounded bg-black/10" />
        </div>
      </div>
      <div className="absolute -top-1 right-2 w-12 h-12 rounded-full bg-brand flex items-center justify-center shadow-[0_8px_24px_rgba(0,52,89,0.25)]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M22 10v6" />
          <path d="m2 10 10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>
    </div>
  )
}

const steps = [
  {
    title: { id: 'Analisis Kebutuhan & Masalah', en: 'Problem & Needs Analysis' },
  },
  {
    title: { id: 'Survei Lapangan & Diskusi', en: 'Site Survey & Discussion' },
  },
  {
    title: { id: 'Desain Solusi & Deployment', en: 'Solution Design & Deployment' },
  },
  {
    title: { id: 'Serah Terima & Pelatihan', en: 'Hand-over & Training' },
  },
]

export function HowItWorks() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-off-white rounded-3xl px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">

          {/* Header — centered */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight md:whitespace-nowrap">
              {tx(t.howItWorks.heading)}
            </h2>
          </div>

          {/* Steps */}
          <div className="relative">

            {/* Curved dotted connector — desktop only */}
            <svg
              className="hidden md:block absolute inset-x-0 top-[60px] w-full h-24 text-ink/25 pointer-events-none"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 150 50 Q 300 -10 450 50 T 750 50 T 1050 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 6"
                strokeLinecap="round"
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-14 md:gap-x-6 relative">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center px-2">
                  <div className="mb-8">
                    <StepVisual index={i} />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-ink leading-tight tracking-tight">
                    {tx(step.title)}
                  </h3>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
