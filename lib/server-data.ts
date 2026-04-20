import 'server-only'
import fs from 'fs'
import path from 'path'
import { servicesData, type ServiceData } from './services-data'
import { productsData, type ProductData } from './products-data'

function readJson<T>(filename: string, fallback: T): T {
  try {
    const file = path.join(process.cwd(), 'data', filename)
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8')) as T
    }
  } catch {
    // fall through
  }
  return fallback
}

export function getAllServices(): ServiceData[] {
  return readJson('services.json', servicesData)
}

export function getServiceBySlugLive(slug: string): ServiceData | undefined {
  return getAllServices().find((s) => s.slug === slug)
}

export function getAllProducts(): ProductData[] {
  return readJson('products.json', productsData)
}

export function getProductBySlugLive(slug: string): ProductData | undefined {
  return getAllProducts().find((p) => p.slug === slug)
}
