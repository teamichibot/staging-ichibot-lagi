import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServiceBySlugLive } from '@/lib/server-data'
import { servicesData } from '@/lib/services-data'
import { ServiceDetail } from '@/components/layanan/ServiceDetail'
import { getServiceSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlugLive(slug)
  if (!service) return {}

  const title = `${service.title.id} — Layanan IoT & AI Ichibot`
  const description = service.longDesc.id

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ichibot.id/layanan/${slug}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title.id,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.image],
    },
  }
}

export default async function LayananDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlugLive(slug)
  if (!service) notFound()

  const serviceSchema = getServiceSchema(service)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail service={service} />
    </>
  )
}

