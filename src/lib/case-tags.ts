import type { ClientLogo } from './site-data'
import { productIcons } from '../data/product-icons'

/**
 * Case studies are blog posts with free-text Indonesian titles, so the client
 * and the product each one demonstrates are inferred from the title and
 * excerpt. Rules run in order; the first match wins. A post that matches
 * nothing simply shows no tag.
 */

/** title pattern → client name as it appears in Admin → Logo Klien */
const CLIENT_RULES: [RegExp, RegExp][] = [
  [/toyota|tmmin/i, /toyota/i],
  [/pertamina/i, /pertamina/i],
  [/pt garam|pegaraman/i, /garam/i],
  [/citra borneo|\bcbu\b/i, /\bcbu\b|citra borneo/i],
  [/pt gap|gelora aksara/i, /pt gap/i],
  [/erlangga/i, /erlangga/i],
]

export type CaseTag = { label: string; icon: string }

const TAG_RULES: [RegExp, string, string][] = [
  [/training|pelatihan/i, 'In-house training', 'training'],
  [/listrik|gardu|daya|energi|transformer|kwh/i, 'Smart energy monitoring', 'energy'],
  [/kompresor|compressor|pompa|pump|mesin|vibrasi|getaran/i, 'Smart equipment monitoring', 'equip'],
  [/apd|ppe|cctv|kamera|vision/i, 'AI Vision Engine', 'vision'],
  [/sawit|plantation|kebun|tanah/i, 'Smart plantation system', 'plant'],
  [/timbang|weigh|erp|plc|panel|integrasi/i, 'Custom system integration', 'integration'],
  [/sandar|kapal|dermaga|cuaca|gelombang|early warning/i, 'Custom monitoring system', 'integration'],
]

export function clientFor(text: string, logos: ClientLogo[]): ClientLogo | undefined {
  for (const [inText, inName] of CLIENT_RULES) {
    if (inText.test(text)) return logos.find((l) => inName.test(l.name))
  }
}

/** Bahasa labels for the tags that are not product names. */
const TAG_LABELS_ID: Record<string, string> = {
  'In-house training': 'Pelatihan in-house',
  'Custom system integration': 'Integrasi sistem custom',
  'Custom monitoring system': 'Sistem monitoring custom',
}

export function tagFor(text: string, lang: 'en' | 'id' = 'en'): CaseTag | undefined {
  const hit = TAG_RULES.find(([re]) => re.test(text))
  if (!hit) return undefined
  const label = lang === 'id' ? (TAG_LABELS_ID[hit[1]] ?? hit[1]) : hit[1]
  return { label, icon: hit[2] }
}

/** 16x16 line icons: the product ones, plus two for service-led projects. */
export const tagIcons: Record<string, string> = {
  ...productIcons,
  training: '<rect x="1.8" y="2" width="12.4" height="8.4" rx="1.4"/><path d="M4.5 7.6l2.2-2 2 1.5 2.8-2.8M8 10.4V14M5.5 14h5"/>',
  integration: '<circle cx="3.6" cy="3.6" r="1.9"/><circle cx="12.4" cy="3.6" r="1.9"/><circle cx="8" cy="12.4" r="1.9"/><path d="M5 5l2.2 5.6M11 5L8.8 10.6M5.5 3.6h5"/>',
}
