'use client'

import { useLang } from '@/contexts/LanguageContext'
import type { TestimonialData } from '@/lib/homepage-data'

function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  const { lang } = useLang()

  if (testimonials.length === 0) return null

  return (
    <section id="testimoni" className="bg-[#0B0E13] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-sky-400 text-sm font-semibold tracking-wide uppercase mb-4">
            {lang === 'id' ? 'Kata Mereka' : 'Testimonials'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {lang === 'id'
              ? 'Langsung dari yang memakainya.'
              : 'Straight from the people using it.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-sky-400/40 mb-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M9.5 6C6.5 7.6 5 10.2 5 13.8V18h5.6v-5.6H8.2c0-1.9.8-3.3 2.6-4.3zm8.9 0c-3 1.6-4.5 4.2-4.5 7.8V18h5.6v-5.6h-2.4c0-1.9.8-3.3 2.6-4.3z" />
              </svg>

              <blockquote className="flex-1">
                <p className="text-white/85 text-base leading-relaxed">
                  &ldquo;{item.quote[lang]}&rdquo;
                </p>
              </blockquote>

              <figcaption className="flex items-center gap-4 mt-7 pt-6 border-t border-white/10">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.logo}
                      alt={item.company}
                      className="w-full h-full object-contain p-1.5 grayscale invert opacity-90"
                    />
                  ) : (
                    <span className="text-white/60 text-xs font-bold tracking-tight">
                      {initials(item.company)}
                    </span>
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-white font-semibold text-sm truncate">{item.author}</span>
                  <span className="block text-white/45 text-xs mt-0.5 truncate">
                    {item.role[lang]} · {item.company}
                  </span>
                </span>
              </figcaption>

              {item.placeholder && (
                <span className="mt-4 self-start text-[10px] font-semibold uppercase tracking-wide text-amber-300/80 bg-amber-300/10 border border-amber-300/20 rounded-full px-2.5 py-1">
                  {lang === 'id' ? 'Contoh · menunggu testimoni asli' : 'Sample · awaiting real testimonial'}
                </span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
