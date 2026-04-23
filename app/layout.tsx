import type { Metadata } from 'next'
import './globals.css'
import { SiteShell } from '@/components/layout/SiteShell'
import { getAllServices, getAllProducts } from '@/lib/server-data'
import { getOrganizationSchema } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://ichibot.id'),
  title: {
    default: 'Ichibot — IoT & AI untuk Industri Indonesia',
    template: '%s | Ichibot'
  },
  description:
    'Ichibot membantu perusahaan manufaktur mengadopsi IoT dan AI secara praktis dan terjangkau. Digitalisasi pabrik tanpa ganti infrastruktur.',
  keywords: ['IoT Industri', 'AI Indonesia', 'Digitalisasi Pabrik', 'Smart Manufacturing', 'Ichibot', 'Monitoring Energi', 'Predictive Maintenance'],
  authors: [{ name: 'Ichibot Team' }],
  openGraph: {
    title: 'Ichibot — IoT & AI untuk Industri Indonesia',
    description:
      'Digitalisasi pabrik tanpa ganti infrastruktur. IoT monitoring, AI computer vision, dan dashboard real-time untuk industri Indonesia.',
    url: 'https://ichibot.id',
    siteName: 'Ichibot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ichibot — IoT & AI Industri',
      },
    ],
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ichibot — IoT & AI untuk Industri Indonesia',
    description: 'Digitalisasi pabrik tanpa ganti infrastruktur.',
    images: ['/og-image.png'],
  },
  robots: { 
    index: true, 
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [liveServices, liveProducts] = await Promise.all([
    getAllServices(),
    getAllProducts()
  ])

  const organizationSchema = getOrganizationSchema()

  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteShell liveServices={liveServices} liveProducts={liveProducts}>
          {children}
        </SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

