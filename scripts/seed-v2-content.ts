/**
 * Writes v2's default product and service copy into Supabase `site_data` as
 * the keys v2_products and v2_services (see src/lib/content.ts).
 *
 * Insert-only: a key that already exists is left untouched, so this never
 * overwrites edits made in the database. The old site's `products` and
 * `services` keys are not read or written.
 *
 *   npx tsx --env-file=.env.local scripts/seed-v2-content.ts
 */
import { createClient } from '@supabase/supabase-js'
import { products } from '../src/data/products'
import { services, steps } from '../src/data/services'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
const db = createClient(url, key)

const rows = [
  {
    key: 'v2_products',
    value: products.map(({ key, name, desc, included, proofLabel, proof, deploymentTime }) => ({
      key, name, desc, included, proofLabel, proof, deploymentTime,
    })),
  },
  {
    key: 'v2_services',
    value: { services: services.map(({ id, title, body }) => ({ id, title, body })), steps },
  },
]

for (const row of rows) {
  const { data: existing, error: readErr } = await db.from('site_data').select('key').eq('key', row.key).maybeSingle()
  if (readErr) throw readErr
  if (existing) {
    console.log(`${row.key}: already in the database, left as is`)
    continue
  }
  const { error } = await db.from('site_data').insert({ ...row, updated_at: new Date().toISOString() })
  if (error) throw error
  console.log(`${row.key}: inserted`)
}
