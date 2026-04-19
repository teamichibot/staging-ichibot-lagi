'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

const serviceLinks = t.services.items.map((item, i) => ({
  label: item.title,
  href: `/#layanan`,
}))

const productLinks = t.products.items.map((item) => ({
  label: item.title,
  href: `/#produk`,
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

      <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      {/* Floating pill */}
      <nav className="pointer-events-auto max-w-4xl mx-auto flex items-center justify-between h-14 px-5 rounded-2xl bg-navy/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <NavLogo />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">

          {/* Layanan dropdown */}
          <div
            className="relative"
            onMouseEnter={() => open('layanan')}
            onMouseLeave={close}
          >
            <button className="flex items-center gap-1 text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
              {tx(t.nav.services)}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={`transition-transform duration-200 ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
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
            <button className="flex items-center gap-1 text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
              {tx(t.nav.products)}
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className={`transition-transform duration-200 ${activeDropdown === 'produk' ? 'rotate-180' : ''}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
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
          <Link href="/blog" className="text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
            {tx(t.nav.blog)}
          </Link>
          <Link href="/about" className="text-white/75 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-colors">
            {tx(t.nav.about)}
          </Link>
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
          className="md:hidden text-white p-1"
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
      </nav>

      {/* Mobile menu — outside pill, full width */}
      {mobileOpen && (
        <div className="pointer-events-auto mt-2 max-w-4xl mx-auto bg-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-5 py-5 flex flex-col gap-4">
          {[
            { label: tx(t.nav.services), href: '/#layanan' },
            { label: tx(t.nav.products), href: '/#produk' },
            { label: tx(t.nav.caseStudies), href: '/#studi-kasus' },
            { label: tx(t.nav.blog), href: '/blog' },
            { label: tx(t.nav.about), href: '/about' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 text-base font-medium"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-1 border-t border-white/10">
            <button onClick={toggle} className="text-white/60 text-sm border border-white/20 rounded-lg px-3 py-1.5">
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="bg-teal text-white text-sm font-semibold px-5 py-2 rounded-xl">
              {tx(t.nav.cta)}
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  )
}
