import 'server-only'
import { readData, writeData } from './admin-data'

export interface ClientRef {
  name: string
  logo: string
}

interface ClientEntry {
  id: string
  name: string
  logo: string
}

interface ClientsData {
  industry: ClientEntry[]
  academic: ClientEntry[]
}

const emptyClients: ClientsData = { industry: [], academic: [] }

export async function getClientsData(): Promise<ClientsData> {
  return readData('clients', emptyClients)
}

export async function getBlogClientMap(): Promise<Record<string, string>> {
  return readData('blogClientMap', {})
}

export async function setBlogClientForSlug(slug: string, clientName: string | null): Promise<void> {
  const map = await getBlogClientMap()
  if (clientName) {
    map[slug] = clientName
  } else {
    delete map[slug]
  }
  await writeData('blogClientMap', map)
}

export async function resolveClientsForSlugs(slugs: string[]): Promise<Record<string, ClientRef | null>> {
  const result: Record<string, ClientRef | null> = {}
  if (slugs.length === 0) return result
  const [map, clientsData] = await Promise.all([getBlogClientMap(), getClientsData()])
  const byName = new Map<string, ClientRef>()
  for (const c of [...clientsData.industry, ...clientsData.academic]) {
    if (c.name) byName.set(c.name, { name: c.name, logo: c.logo })
  }
  for (const slug of slugs) {
    const name = map[slug]
    result[slug] = name ? (byName.get(name) ?? null) : null
  }
  return result
}
