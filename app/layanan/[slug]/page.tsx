import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServiceBySlugLive } from '@/lib/server-data'
import { servicesData } from '@/lib/services-data'
import { ServiceDetail } from '@/components/layanan/ServiceDetail'

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
  return {
    title: `${service.title.id} — Ichibot`,
    description: service.longDesc.id,
    openGraph: {
      title: `${service.title.id} — Ichibot`,
      description: service.longDesc.id,
      images: [service.image],
    },
  }
}

export default async function LayananDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlugLive(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
