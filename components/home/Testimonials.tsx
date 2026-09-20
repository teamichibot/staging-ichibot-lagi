'use client'

import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import type { TestimonialData, TestimonialTone } from '@/lib/homepage-data'

type Tone = {
  card: string
  ink: string
  muted: string
  rule: string
  watermark: string
  badge: string
}

/** Warna kartu yang bisa dipilih per testimoni dari admin panel. */
export const testimonialTones: Record<TestimonialTone, Tone> = {
  ice: {
    card: 'bg-gradient-to-br from-[#EEF3FB] via-[#E4ECF8] to-[#D7E4F4]',
    ink: 'text-[#0A1A2B]',
    muted: 'text-[#0A1A2B]/55',
    rule: 'bg-[#0A1A2B]/15',
    watermark: 'text-[#0A1A2B]/[0.045]',
    badge: 'text-[#7A5310] bg-[#0A1A2B]/[0.06] border-[#0A1A2B]/10',
  },
  lime: {
    card: 'bg-[#DCEF5E]',
    ink: 'text-[#141A07]',
    muted: 'text-[#141A07]/60',
    rule: 'bg-[#141A07]/15',
    watermark: 'text-[#141A07]/[0.07]',
    badge: 'text-[#5B4A0C] bg-[#141A07]/[0.07] border-[#141A07]/10',
  },
  sky: {
    card: 'bg-gradient-to-br from-[#CFE8F7] to-[#A9D4EE]',
    ink: 'text-[#052034]',
    muted: 'text-[#052034]/55',
    rule: 'bg-[#052034]/15',
    watermark: 'text-[#052034]/[0.06]',
    badge: 'text-[#6B4A0B] bg-[#052034]/[0.06] border-[#052034]/10',
  },
  sand: {
    card: 'bg-gradient-to-br from-[#F4EADA] to-[#EADCC4]',
    ink: 'text-[#2A1E0C]',
    muted: 'text-[#2A1E0C]/55',
    rule: 'bg-[#2A1E0C]/15',
    watermark: 'text-[#2A1E0C]/[0.06]',
    badge: 'text-[#6B4A0B] bg-[#2A1E0C]/[0.07] border-[#2A1E0C]/10',
  },
}

const toneOrder: TestimonialTone[] = ['ice', 'lime', 'sky', 'sand']

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

/**
 * Lebar kartu dibuat tidak seragam seperti panel kutipan besar: tiap baris
 * berisi dua kartu dengan rasio 2:1 yang bergantian arahnya, dan kartu
 * terakhir yang tidak punya pasangan melebar penuh.
 */
function layoutFor(index: number, total: number) {
  // Kartu terakhir tanpa pasangan melebar penuh, dan dibuat lebih pendek
  // supaya tidak menyisakan ruang kosong besar di tengah.
  if (index === total - 1 && total % 2 === 1) {
    return { span: 'lg:col-span-3', minHeight: 'min-h-[18rem] md:min-h-[20rem]' }
  }
  const rowIsEven = Math.floor(index / 2) % 2 === 0
  const isFirstOfRow = index % 2 === 0
  const wide = rowIsEven ? isFirstOfRow : !isFirstOfRow
  return {
    span: wide ? 'lg:col-span-2' : 'lg:col-span-1',
    minHeight: 'min-h-[22rem] md:min-h-[26rem]',
  }
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  const { lang } = useLang()

  if (testimonials.length === 0) return null

  return (
    <section id="testimoni" className="bg-[#0B0E13] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-sky-400 text-sm font-semibold tracking-wide uppercase mb-4">
            {lang === 'id' ? 'Kata Mereka' : 'Testimonials'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {lang === 'id'
              ? 'Langsung dari yang memakainya.'
              : 'Straight from the people using it.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((item, i) => {
            const tone = testimonialTones[item.color ?? toneOrder[i % toneOrder.length]]
            const layout = layoutFor(i, testimonials.length)
            return (
              <figure
                key={item.id}
                className={`${tone.card} ${layout.span} ${layout.minHeight} relative isolate overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className={`${tone.watermark} pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 md:w-64 md:h-64 -z-10`}
                >
                  <path d="M9.5 6C6.5 7.6 5 10.2 5 13.8V18h5.6v-5.6H8.2c0-1.9.8-3.3 2.6-4.3zm8.9 0c-3 1.6-4.5 4.2-4.5 7.8V18h5.6v-5.6h-2.4c0-1.9.8-3.3 2.6-4.3z" />
                </svg>

                <blockquote className="flex-1">
                  <p
                    className={`${tone.ink} font-display font-semibold tracking-tight text-[1.6rem] leading-[1.28] md:text-[2rem] md:leading-[1.22]`}
                  >
                    &ldquo;{item.quote[lang]}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="flex items-start gap-4 mt-10">
                  <span className="w-11 h-11 shrink-0 flex items-center justify-center overflow-hidden">
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className={`${tone.ink} text-sm font-bold tracking-tight`}>
                        {initials(item.company)}
                      </span>
                    )}
                  </span>
                  <span className={`${tone.rule} w-px self-stretch min-h-10 shrink-0`} />
                  <span className="min-w-0">
                    <span className={`${tone.ink} block font-semibold text-[0.95rem]`}>
                      {item.author}
                    </span>
                    <span className={`${tone.muted} block text-[0.95rem] leading-snug`}>
                      {item.role[lang]}, {item.company}
                    </span>
                  </span>
                </figcaption>

                {item.placeholder && (
                  <span
                    className={`${tone.badge} mt-5 self-start text-[10px] font-semibold uppercase tracking-wide border rounded-full px-2.5 py-1`}
                  >
                    {lang === 'id' ? 'Contoh · menunggu testimoni asli' : 'Sample · awaiting real testimonial'}
                  </span>
                )}
              </figure>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45 text-sm md:text-base max-w-2xl">
            {lang === 'id'
              ? 'Ichibot menangani implementasi IoT, AI, dan otomasi di sektor manufaktur, energi, logistik, hingga perkebunan.'
              : 'Ichibot delivers IoT, AI, and automation projects across manufacturing, energy, logistics, and plantations.'}
          </p>
          <Link
            href="/blog?category=Case Study"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm md:text-base font-medium transition-colors shrink-0"
          >
            {lang === 'id' ? 'Lihat studi kasus' : 'Customer stories'}
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
