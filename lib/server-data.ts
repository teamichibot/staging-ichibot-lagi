import 'server-only'
import { readData } from './admin-data'
import { servicesData, type ServiceData } from './services-data'
import { productsData, type ProductData } from './products-data'

export async function getAllServices(): Promise<ServiceData[]> {
  return readData('services', servicesData)
}

export async function getServiceBySlugLive(slug: string): Promise<ServiceData | undefined> {
  const list = await getAllServices()
  return list.find((s) => s.slug === slug)
}

export async function getAllProducts(): Promise<ProductData[]> {
  return readData('products', productsData)
}

export async function getProductBySlugLive(slug: string): Promise<ProductData | undefined> {
  const list = await getAllProducts()
  return list.find((p) => p.slug === slug)
}
