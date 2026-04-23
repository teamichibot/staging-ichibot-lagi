import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlugLive } from '@/lib/server-data'
import { productsData } from '@/lib/products-data'
import { ProductDetail } from '@/components/produk/ProductDetail'
import { getProductSchema } from '@/lib/seo'

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
  
  const title = `${product.title.id} — Solusi IoT & AI Ichibot`
  const description = product.longDesc.id

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ichibot.id/produk/${slug}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title.id,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  }
}

export default async function ProdukDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlugLive(slug)
  if (!product) notFound()

  const productSchema = getProductSchema(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
    </>
  )
}

