import type { Metadata } from 'next'
import './globals.css'
import { SiteShell } from '@/components/layout/SiteShell'

export const metadata: Metadata = {
  title: 'Ichibot — IoT & AI untuk Industri Indonesia',
  description:
    'Ichibot membantu perusahaan manufaktur mengadopsi IoT dan AI secara praktis dan terjangkau. Digitalisasi pabrik tanpa ganti infrastruktur.',
  openGraph: {
    title: 'Ichibot — IoT & AI untuk Industri Indonesia',
    description:
      'Digitalisasi pabrik tanpa ganti infrastruktur. IoT monitoring, AI computer vision, dan dashboard real-time untuk industri Indonesia.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ichibot — IoT & AI untuk Industri Indonesia',
    description: 'Digitalisasi pabrik tanpa ganti infrastruktur.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
