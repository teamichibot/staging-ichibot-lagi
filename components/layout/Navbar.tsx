'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

import { servicesData } from '@/lib/services-data'
import { productsData } from '@/lib/products-data'

function NavLogo() {
  const [imgError, setImgError] = useState(false)
  if (imgError) {
    return <span className="font-display text-lg font-bold tracking-tight text-ink">Ichibot</span>
  }
  return (
    <Image
      src="/logos/logo.svg"
      alt="Ichibot"
      width={88}
      height={26}
      className="brightness-0"
      priority
      onError={() => setImgError(true)}
    />
  )
}

export function Navbar({
  liveServices = servicesData,
  liveProducts = productsData,
  liveCaseStudies = [],
}: {
  liveServices?: any[]
  liveProducts?: any[]
  liveCaseStudies?: any[]
}) {
  const { lang, toggle } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const serviceLinks = liveServices.map((s) => ({ label: s.title, href: `/layanan/${s.slug}`, image: s.image }))
  const productLinks = liveProducts.map((p) => ({ label: p.title, href: `/produk/${p.slug}`, image: p.image, category: p.category as string | undefined }))

  // Group products by category, preserving the order of first appearance
  const productGroups: { category: string; items: typeof productLinks }[] = []
  const categoryIndexMap = new Map<string, number>()
  for (const item of productLinks) {
    const cat = (item.category && item.category.trim()) || 'Lainnya'
    if (categoryIndexMap.has(cat)) {
      productGroups[categoryIndexMap.get(cat)!].items.push(item)
    } else {
      categoryIndexMap.set(cat, productGroups.length)
      productGroups.push({ category: cat, items: [item] })
    }
  }
  const hasCategorizedProducts = productGroups.some((g) => g.category !== 'Lainnya')
  const caseStudyLinks = liveCaseStudies.map((cs: any) => ({
    title: cs.title as string,
    href: `/blog/${cs.slug}`,
    image: cs.image as string,
  }))

  const companyLinks = [
    {
      label: { id: 'Tentang Kami', en: 'About Us' },
      href: '/about',
      external: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
          <path d="M17 8h2a2 2 0 0 1 2 2v11" />
          <path d="M3 21h18" />
          <path d="M8 7h2M8 11h2M8 15h2" />
        </svg>
      ),
    },
    {
      label: { id: 'Blog', en: 'Blog' },
      href: '/blog',
      external: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4z" />
          <path d="M19 8h2a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3" />
          <path d="M8 8h7M8 12h7M8 16h4" />
        </svg>
      ),
    },
    {
      label: { id: 'Internship', en: 'Internship' },
      href: 'https://internship.ichibot.id',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
          <path d="M22 10v5" />
        </svg>
      ),
    },
    {
      label: { id: 'ICHIBOT Store', en: 'ICHIBOT Store' },
      href: 'https://www.store.ichibot.id',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      ),
    },
    {
      label: { id: 'ICHIBOT Robotics', en: 'ICHIBOT Robotics' },
      href: 'https://robotics.ichibot.id',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="6" y="9" width="12" height="11" rx="2" />
          <circle cx="9.5" cy="13.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="13.5" r="1" fill="currentColor" />
          <path d="M9 17h6" />
          <path d="M12 9V5" />
          <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
          <path d="M4 13v3M20 13v3" />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const sections = ['produk', 'layanan', 'studi-kasus']
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        } else {
          setActiveSection((current) => (current === entry.target.id ? '' : current))
        }
      }),
      { threshold: 0.3, rootMargin: '-64px 0px -50% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const tx = (obj: { id: string; en: string }) => obj[lang]

  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(name)
  }
  const close = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const navLinkClass = (section?: string) =>
    `text-sm font-medium text-ink rounded-md px-3 py-1.5 transition-colors duration-150 hover:bg-black/5 ${
      section && activeSection === section ? 'bg-black/5' : ''
    }`


  return (
    <>
      {/* Dropdown backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${activeDropdown || mobileOpen ? 'opacity-100 pointer-events-auto bg-black/20' : 'opacity-0 pointer-events-none'}`}
        onClick={() => { setMobileOpen(false); setActiveDropdown(null) }}
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl"
        onMouseLeave={close}
      >
        <div className="max-w-[1400px] mx-auto h-[64px] flex items-center px-6 md:px-10">

          {/* Left: Logo */}
          <div className="flex items-center shrink-0 pr-8">
            <Link href="/" className="flex items-center">
              <NavLogo />
            </Link>
          </div>

          {/* Center: Nav links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-2">

            {/* Solusi */}
            <Link
              href="/#produk"
              onMouseEnter={() => open('solusi')}
              className={`${navLinkClass('produk')} flex items-center gap-1`}
            >
              {lang === 'id' ? 'Solusi' : 'Solutions'}
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`transition-transform duration-200 ${activeDropdown === 'solusi' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" />
              </svg>
            </Link>

            {/* Studi Kasus */}
            <Link
              href="/#studi-kasus"
              onMouseEnter={() => caseStudyLinks.length > 0 ? open('studi-kasus') : setActiveDropdown(null)}
              className={`${navLinkClass('studi-kasus')} flex items-center gap-1`}
            >
              {tx(t.nav.caseStudies)}
              {caseStudyLinks.length > 0 && (
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`transition-transform duration-200 ${activeDropdown === 'studi-kasus' ? 'rotate-180' : ''}`}>
                  <path d="M4 6l4 4 4-4" />
                </svg>
              )}
            </Link>

            {/* Perusahaan */}
            <button
              onMouseEnter={() => open('perusahaan')}
              className={`${navLinkClass()} flex items-center gap-1`}
            >
              {lang === 'id' ? 'Perusahaan' : 'Company'}
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`transition-transform duration-200 ${activeDropdown === 'perusahaan' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>

          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center justify-end gap-2 shrink-0 pl-8">
            <button
              onClick={toggle}
              onMouseEnter={() => setActiveDropdown(null)}
              className="text-ink hover:bg-black/5 rounded-md p-2 transition-colors"
              aria-label={`Switch to ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
              title={lang === 'id' ? 'EN' : 'ID'}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <ellipse cx="12" cy="12" rx="4" ry="9" />
                <path d="M3 12h18" />
              </svg>
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message[lang])}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveDropdown(null)}
              className="text-brand hover:bg-black/5 rounded-md p-2 transition-colors flex items-center justify-center"
              aria-label={tx(t.nav.cta)}
              title={tx(t.nav.cta)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden text-ink p-1 ml-auto"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>

        </div>

        {/* Megamenu — full-width panel that extends from navbar */}
        <div
          className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            activeDropdown ? 'max-h-[720px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onMouseEnter={() => activeDropdown && open(activeDropdown)}
          onMouseLeave={close}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-14 flex justify-center">

            {activeDropdown === 'solusi' && (
              <div className={`grid grid-cols-[auto_auto] gap-x-12 items-start ${productLinks.length > 6 ? 'min-w-[720px]' : 'min-w-[460px]'}`}>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase text-ink/40 mb-5">
                    {tx(t.nav.services)}
                  </h4>
                  <ul className="space-y-1.5">
                    {serviceLinks.map((item) => (
                      <li key={item.href + (item.label.id || item.label)}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="text-[14px] text-ink/65 hover:text-brand transition-colors leading-snug block"
                        >
                          {tx(item.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase text-ink/40 mb-5">
                    {tx(t.nav.products)}
                  </h4>
                  {hasCategorizedProducts && productGroups.length > 1 ? (
                    <>
                      <div className="grid grid-cols-[auto_auto] gap-x-12 gap-y-7 items-start">
                        {productGroups.map((group) => (
                          <div key={group.category}>
                            <p className="text-[13px] font-bold text-ink mb-2.5 leading-tight">
                              {group.category}
                            </p>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item.label.id || item.label}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-[14px] text-ink/65 hover:text-brand transition-colors leading-snug block"
                                  >
                                    {tx(item.label)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/produk"
                        className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-dark transition-colors mt-7"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {lang === 'id' ? 'Lihat semua produk →' : 'View all products →'}
                      </Link>
                    </>
                  ) : (
                    <ul className="space-y-1.5">
                      {productLinks.map((item) => (
                        <li key={item.label.id || item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="text-[14px] text-ink/65 hover:text-brand transition-colors leading-snug block"
                          >
                            {tx(item.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {activeDropdown === 'studi-kasus' && caseStudyLinks.length > 0 && (
              <div className="w-[680px]">
                <div className="grid grid-cols-2 gap-x-12 gap-y-2.5 items-start">
                  {caseStudyLinks.slice(0, 10).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="text-[14px] text-ink/65 hover:text-brand transition-colors leading-snug line-clamp-2"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog?category=Case Study"
                  className="inline-block mt-6 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  {lang === 'id' ? 'Lihat semua studi kasus →' : 'View all case studies →'}
                </Link>
              </div>
            )}

            {activeDropdown === 'perusahaan' && (
              <div className="min-w-[360px]">
                <ul className="grid grid-cols-2 gap-x-12 gap-y-2 items-start">
                  {companyLinks.map((item) => {
                    const linkClass = "text-[14px] text-ink/65 hover:text-brand transition-colors leading-snug"
                    return (
                      <li key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {tx(item.label)}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={linkClass}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {tx(item.label)}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* Mobile drawer — drops below the bar */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-black/6 bg-white ${mobileOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 space-y-0.5">
            {[
              { label: lang === 'id' ? 'Solusi' : 'Solutions', href: '/#produk' },
              { label: tx(t.nav.caseStudies), href: '/#studi-kasus' },
              { label: lang === 'id' ? 'Tentang Kami' : 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Internship', href: 'https://internship.ichibot.id' },
              { label: 'ICHIBOT Store', href: 'https://www.store.ichibot.id' },
              { label: 'ICHIBOT Robotics', href: 'https://robotics.ichibot.id' },
            ].map((l) => {
              const isExternal = l.href.startsWith('http')
              return isExternal ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-2 py-3 text-sm text-ink/65 hover:text-ink border-b border-black/5 last:border-0 transition-colors"
                >
                  <span>{l.label}</span>
                  <svg className="w-3.5 h-3.5 text-ink/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2-2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-2 py-3 text-sm text-ink/65 hover:text-ink border-b border-black/5 last:border-0 transition-colors"
                >
                  <span>{l.label}</span>
                  <svg className="w-3.5 h-3.5 text-ink/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>
          <div className="px-4 py-4 border-t border-black/6 flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-ink/40 hover:text-ink text-xs font-semibold transition-colors"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
            >
              {tx(t.nav.cta)}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
