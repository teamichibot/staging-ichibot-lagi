import { MetadataRoute } from 'next'
import { getAllProducts, getAllServices } from '@/lib/server-data'
import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://ichibot.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services] = await Promise.all([
    getAllProducts(),
    getAllServices(),
  ])
  const posts = getAllPosts()

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/produk',
    '/layanan',
    '/blog',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }))

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/produk/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/layanan/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...blogRoutes]
}
