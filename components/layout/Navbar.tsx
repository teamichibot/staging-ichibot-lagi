'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

import { servicesData } from '@/lib/services-data'
import { productsData } from '@/lib/products-data'

const serviceLinks = t.services.items.map((item, i) => ({
  label: item.title,
  href: `/layanan/${servicesData[i].slug}`,
}))

const productLinks = t.products.items.map((item, i) => ({
  label: item.title,
  href: `/produk/${productsData[i].slug}`,
}))

function NavLogo() {
  const [imgError, setImgError] = useState(false)
  if (imgError) {
    return <span className="font-display text-xl font-bold text-white tracking-tight">Ichibot</span>
  }
  return (
    <Image
      src="/logos/logo.svg"
      alt="Ichibot"
      width={96}
      height={28}
      className="brightness-0 invert"
      priority
      onError={() => setImgError(true)}
    />
  )
}

export function Navbar() {
  const { lang, toggle } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isCollapsed = isScrolled && !isHovered && !mobileOpen && !activeDropdown

  const tx = (obj: { id: string; en: string }) => obj[lang]

  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(name)
  }
  const close = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <>
      {/* Blur Overlay Backdrop */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${activeDropdown || mobileOpen ? 'opacity-100 backdrop-blur-md bg-navy/30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => { setMobileOpen(false); setActiveDropdown(null); }}
      />

      <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none flex flex-col items-center gap-2">
      {/* Floating pill */}
      <nav 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`pointer-events-auto flex items-center h-14 rounded-2xl bg-navy/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-[width,max-width] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-visible w-full px-5 ${isCollapsed ? 'max-w-[136px]' : 'max-w-[860px]'}`}
      >

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center z-10 w-[96px]">
          <NavLogo />
        </Link>

        {/* Expanding Inner Container */}
        <div className={`flex items-center justify-between flex-1 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${isCollapsed ? 'opacity-0 max-w-0 overflow-hidden pointer-events-none ml-0' : 'opacity-100 max-w-[1000px] overflow-visible pointer-events-auto ml-4'}`}>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">

          {/* Layanan dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open('layanan')}
            onMouseLeave={close}
          >
            <Link href="/#layanan" className="flex items-center gap-1 text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
              {tx(t.nav.services)}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={`transition-transform duration-200 pointer-events-none ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            {activeDropdown === 'layanan' && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
                onMouseEnter={() => open('layanan')}
                onMouseLeave={close}
              >
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href + item.label.id}
                    href={item.href}
                    className="flex items-center px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors text-sm"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span>{tx(item.label)}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Produk dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open('produk')}
            onMouseLeave={close}
          >
            <Link href="/#produk" className="flex items-center gap-1 text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
              {tx(t.nav.products)}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={`transition-transform duration-200 pointer-events-none ${activeDropdown === 'produk' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            {activeDropdown === 'produk' && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2"
                onMouseEnter={() => open('produk')}
                onMouseLeave={close}
              >
                {productLinks.map((item) => (
                  <Link
                    key={item.label.id}
                    href={item.href}
                    className="flex items-center px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors text-sm"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {tx(item.label)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#studi-kasus" className="text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
            {tx(t.nav.caseStudies)}
          </Link>

          {/* Perusahaan dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open('perusahaan')}
            onMouseLeave={close}
          >
            <button className="flex items-center gap-1 text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
              {lang === 'id' ? 'Perusahaan' : 'Company'}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={`transition-transform duration-200 ${activeDropdown === 'perusahaan' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            {activeDropdown === 'perusahaan' && (
              <div
                className="absolute top-full left-0 mt-2 w-52 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden"
                onMouseEnter={() => open('perusahaan')}
                onMouseLeave={close}
              >
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors text-sm"
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  {tx(t.nav.about)}
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors text-sm"
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </span>
                  {tx(t.nav.blog)}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-white/50 hover:text-white text-xs font-semibold transition-colors px-2.5 py-1.5 border border-white/15 rounded-lg hover:border-white/30"
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <Link
            href="/contact"
            className="bg-teal hover:bg-teal-light text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {tx(t.nav.cta)}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1 ml-auto"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`pointer-events-auto mt-2 w-full max-w-[860px] mx-auto overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Nav Links */}
          <div className="px-2 py-3">
            {[
              { label: tx(t.nav.services), href: '/#layanan' },
              { label: tx(t.nav.products), href: '/#produk' },
              { label: tx(t.nav.caseStudies), href: '/#studi-kasus' },
              { label: lang === 'id' ? 'Tentang Kami' : 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-white/80 hover:text-white hover:bg-white/6 rounded-xl transition-colors text-sm font-medium border-b border-white/5 last:border-0"
              >
                <span>{l.label}</span>
                <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-4 border-t border-white/8 flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-white/60 hover:text-white text-xs font-semibold border border-white/15 hover:border-white/30 rounded-lg px-3 py-2 transition-colors"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center bg-teal hover:bg-teal-light text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              {tx(t.nav.cta)}
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
