import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllServices, getServiceBySlugLive } from '@/lib/services-data'
import { ServiceDetail } from '@/components/layanan/ServiceDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlugLive(slug)
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
  const service = getServiceBySlugLive(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
