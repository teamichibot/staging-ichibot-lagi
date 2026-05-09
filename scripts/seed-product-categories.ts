/**
 * One-shot script: fetches all products from Supabase site_data
 * and assigns categories based on title matching.
 *
 * Run with:
 *   npx tsx scripts/seed-product-categories.ts
 *
 * Or with bun:
 *   bun run scripts/seed-product-categories.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load .env.local manually (script runs outside Next.js)
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  })
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!url || !key) {
  console.error('Missing Supabase env vars (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)')
  process.exit(1)
}

const supabase = createClient(url, key)

// Map: produk title (case-insensitive substring match) → category
// Edit this table if names differ in admin DB.
const CATEGORY_RULES: Array<{ match: string[]; category: string }> = [
  {
    category: 'Dashboard & Monitoring',
    match: [
      'dashboard monitoring kompresor',
      'dashboard monitoring transformer',
      'dashboard monitoring konsumsi energi',
      'dashboard monitoring energi',
      'energy usage monitoring',
      'equipment monitoring',
      'klenik iot dashboard',
      'klinik iot dashboard',
    ],
  },
  {
    category: 'AI Computer Vision',
    match: [
      'ai deteksi apd',
      'ai penjaga zona',
      'ai deteksi gestur',
      'ai penghitung objek',
      'ai deteksi objek',
    ],
  },
  {
    category: 'AI Decision & Automation',
    match: [
      'ai predictive maintenance',
      'ai chatbot',
      'maintenance ai chatbot',
      'ai scan',
      'ai scan & rekap struk',
    ],
  },
  {
    category: 'Hardware & Device',
    match: [
      'iot gateway',
      'smart farming',
      'esp32',
      'training kit',
    ],
  },
]

function pickCategory(title: string): string | null {
  const t = title.toLowerCase().trim()
  for (const rule of CATEGORY_RULES) {
    if (rule.match.some((m) => t.includes(m))) return rule.category
  }
  return null
}

async function main() {
  const { data, error } = await supabase
    .from('site_data')
    .select('value')
    .eq('key', 'products')
    .single()

  if (error || !data) {
    console.error('Failed to fetch products from Supabase:', error)
    process.exit(1)
  }

  const products = data.value as Array<{ slug: string; title: { id: string; en: string }; category?: string }>
  if (!Array.isArray(products)) {
    console.error('Unexpected data shape — expected an array.')
    process.exit(1)
  }

  console.log(`Fetched ${products.length} products from Supabase.\n`)

  let updated = 0
  let skipped = 0
  const unmatched: string[] = []

  const next = products.map((p) => {
    const matched = pickCategory(p.title.id) || pickCategory(p.title.en)
    if (matched) {
      if (p.category === matched) {
        skipped++
        console.log(`  ✓ ${p.title.id}  →  (already ${matched})`)
      } else {
        updated++
        console.log(`  → ${p.title.id}  →  ${matched}`)
      }
      return { ...p, category: matched }
    }
    unmatched.push(p.title.id)
    return p
  })

  if (unmatched.length > 0) {
    console.log(`\n  ⚠  ${unmatched.length} products without a category match:`)
    unmatched.forEach((t) => console.log(`     - ${t}`))
    console.log('     → Edit CATEGORY_RULES at the top of this script and re-run.\n')
  }

  if (updated === 0) {
    console.log('\nNothing to update.')
    return
  }

  console.log(`\nWriting ${updated} updates back to Supabase...`)
  const { error: writeErr } = await supabase
    .from('site_data')
    .upsert({ key: 'products', value: next, updated_at: new Date().toISOString() })

  if (writeErr) {
    console.error('Write failed:', writeErr)
    process.exit(1)
  }

  console.log(`Done. ${updated} updated, ${skipped} unchanged, ${unmatched.length} unmatched.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
