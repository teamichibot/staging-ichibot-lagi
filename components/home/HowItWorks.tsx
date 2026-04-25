'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

const icons = [
  <svg key="1" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 12.55a11 11 0 0114.08 0" />
    <path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="14" r="2" />
    <circle cx="19" cy="14" r="2" />
    <circle cx="12" cy="19" r="2" />
    <path d="M12 7v4M7 14h4M13 14h4M10.5 17.5l1.5 1.5M13.5 17.5l-1.5 1.5M6.8 12.5L10 10M14 10l3.2 2.5" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h3" />
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
  </svg>,
]

type Phase = 'before' | 'active' | 'past'

export function HowItWorks() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const outerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [phase, setPhase] = useState<Phase>('before')
  const [isDesktop, setIsDesktop] = useState(false)

  const steps = t.howItWorks.steps

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setIsDesktop(!mobile)

      // Mobile: show all steps, no scroll animation
      if (mobile) {
        setPhase('past')
        setActiveStep(steps.length - 1)
        return
      }

      const outer = outerRef.current
      if (!outer) return

      const rect = outer.getBoundingClientRect()
      const scrolledIn = -rect.top                              // px scrolled into outer div
      const scrollRange = outer.offsetHeight - window.innerHeight // usable range

      if (scrolledIn <= 0) {
        setPhase('before')
        setActiveStep(-1)
      } else if (scrolledIn >= scrollRange) {
        setPhase('past')
        setActiveStep(steps.length - 1)
      } else {
        setPhase('active')
        const newStep = Math.min(
          Math.floor((scrolledIn / scrollRange) * steps.length),
          steps.length - 1
        )
        setActiveStep(newStep)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [steps.length])

  const lineWidth = activeStep <= 0 ? '0%' : `${(activeStep / (steps.length - 1)) * 100}%`

  // Desktop only: JS-controlled fixed/absolute positioning for sticky scroll
  // Mobile: no inline styles, normal flow
  const sectionStyle: React.CSSProperties = isDesktop
    ? phase === 'active'
      ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20 }
      : phase === 'past'
      ? { position: 'absolute', bottom: 0, left: 0, right: 0 }
      : { position: 'absolute', top: 0, left: 0, right: 0 }
    : {}

  return (
    // Outer div: tall on desktop for scroll space, auto height on mobile
    <div ref={outerRef} className="relative md:h-[260vh]">

      {/* Visual section */}
      <section
        className="bg-[#06101f] py-20 md:py-0 md:h-screen md:flex md:flex-col md:justify-center overflow-hidden"
        style={sectionStyle}
      >
        <div className="max-w-7xl mx-auto w-full px-6">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              {tx(t.howItWorks.sectionLabel)}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
              {tx(t.howItWorks.heading)}
            </h2>
            <p className="text-white/50 text-lg">{tx(t.howItWorks.subheading)}</p>
          </div>

          {/* Badge row + connector — desktop only */}
          <div className="relative hidden md:block mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-teal to-teal-light -translate-y-1/2"
              style={{ width: lineWidth, transition: 'width 0.5s ease' }}
            />
            <div className="grid grid-cols-4">
              {steps.map((_, i) => (
                <div key={i} className="flex justify-center py-1">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm z-10 border-2 transition-all duration-500 ${
                    i <= activeStep
                      ? 'bg-teal border-teal text-navy font-extrabold shadow-lg shadow-teal/40 scale-110'
                      : 'bg-[#06101f] border-white/20 text-white/30'
                  }`}>
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((step, i) => {
              const isActive  = i <= activeStep
              const isCurrent = i === activeStep
              const isLast    = i === steps.length - 1
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-500 ${
                    isCurrent
                      ? isLast
                        ? 'border-teal/60 bg-teal/15 shadow-xl shadow-teal/20 -translate-y-1'
                        : 'border-teal/40 bg-white/10 shadow-lg -translate-y-1'
                      : isActive
                        ? 'border-white/15 bg-white/5'
                        : 'border-white/5 bg-white/[0.02] opacity-25'
                  }`}
                >
                  {/* Mobile step badge */}
                  <div className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 mb-3 transition-all duration-500 ${
                    isActive ? 'bg-teal border-teal text-white' : 'bg-white/5 border-white/20 text-white/30'
                  }`}>
                    {i + 1}
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActive
                      ? isLast ? 'bg-teal/25 text-teal' : 'bg-teal/15 text-teal'
                      : 'bg-white/5 text-white/20'
                  }`}>
                    {icons[i]}
                  </div>
                  <h3 className={`font-display text-base font-bold mb-2 leading-snug transition-colors duration-500 ${
                    isActive ? (isLast ? 'text-teal' : 'text-white') : 'text-white/25'
                  }`}>
                    {tx(step.title)}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-white/50' : 'text-white/15'
                  }`}>
                    {tx(step.desc)}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Scroll hint */}
          {phase === 'active' && activeStep < steps.length - 1 && (
            <p className="hidden md:block text-center text-white/25 text-xs mt-8 animate-bounce">
              ↓ scroll untuk lanjut
            </p>
          )}

        </div>
      </section>
    </div>
  )
}
