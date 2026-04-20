import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlugLive } from '@/lib/server-data'
import { productsData } from '@/lib/products-data'
import { ProductDetail } from '@/components/produk/ProductDetail'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlugLive(slug)
  if (!product) return {}
  return {
    title: `${product.title.id} — Ichibot`,
    description: product.longDesc.id,
    openGraph: {
      title: `${product.title.id} — Ichibot`,
      description: product.longDesc.id,
      images: [product.image],
    },
  }
}

export default async function ProdukDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlugLive(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
