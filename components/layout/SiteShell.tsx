'use client'

import { usePathname } from 'next/navigation'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function SiteShell({
  children,
  liveServices,
  liveProducts,
  liveCaseStudies
}: {
  children: React.ReactNode,
  liveServices?: any[],
  liveProducts?: any[],
  liveCaseStudies?: any[]
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <LanguageProvider>
      <Navbar liveServices={liveServices} liveProducts={liveProducts} liveCaseStudies={liveCaseStudies} />
      <main className="flex-1">{children}</main>
      <Footer liveServices={liveServices} liveProducts={liveProducts} />
    </LanguageProvider>
  )
}
