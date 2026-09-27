import { readSiteData } from './site-data'
import { products as productDefaults, type Product } from '../data/products'
import { services as serviceDefaults, steps as stepDefaults, type Service, type Step } from '../data/services'

/**
 * v2's own editable content, stored in Supabase `site_data` under new keys so
 * the old site's `products` and `services` rows (still used by ichibot.id)
 * are left alone:
 *
 *   v2_products  [{ key, name, desc, included, proofLabel, proof, deploymentTime }]
 *   v2_services  { services: [{ id, title, body }], steps: [{ title, body }] }
 *
 * Only text lives in the database. Visuals (dashboard replicas, icons) stay in
 * code and are matched by `key` / `id`, so a row for a product the code has no
 * dashboard for is ignored, and a missing key falls back to the defaults in
 * src/data. scripts/seed-v2-content.ts writes those defaults as the first rows.
 */

export type ProductText = Pick<Product, 'key' | 'name' | 'desc' | 'included' | 'proofLabel' | 'proof' | 'deploymentTime'>
export type ServicesText = { services: Pick<Service, 'id' | 'title' | 'body'>[]; steps: Step[] }

export const productTextDefaults: ProductText[] = productDefaults.map(
  ({ key, name, desc, included, proofLabel, proof, deploymentTime }) => ({ key, name, desc, included, proofLabel, proof, deploymentTime }),
)
export const servicesTextDefaults: ServicesText = {
  services: serviceDefaults.map(({ id, title, body }) => ({ id, title, body })),
  steps: stepDefaults,
}

/** Products in the database's order, text from the database, visuals from code. */
export async function getProducts(): Promise<Product[]> {
  const rows = await readSiteData<ProductText[] | null>('v2_products', null)
  if (!Array.isArray(rows) || rows.length === 0) return productDefaults
  const byKey = new Map(productDefaults.map((p) => [p.key, p]))
  const out = rows.filter((r) => byKey.has(r.key)).map((r) => ({ ...byKey.get(r.key)!, ...r }))
  return out.length ? out : productDefaults
}

export async function getServices(): Promise<{ services: Service[]; steps: Step[] }> {
  const data = await readSiteData<ServicesText | null>('v2_services', null)
  const icons = new Map(serviceDefaults.map((s) => [s.id, s.icon]))
  const services = Array.isArray(data?.services) && data.services.length
    ? data.services.map((s) => ({ ...s, icon: icons.get(s.id) ?? '' }))
    : serviceDefaults
  const steps = Array.isArray(data?.steps) && data.steps.length ? data.steps : stepDefaults
  return { services, steps }
}
