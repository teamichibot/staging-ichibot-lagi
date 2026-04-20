import { NextResponse } from 'next/server'
import { readData } from '@/lib/admin-data'
import { t } from '@/lib/translations'

const defaultClients = {
  industry: t.socialProof.industryClients.map((name, i) => ({ id: String(i), name, logo: '' })),
  academic: t.socialProof.academicPartners.map((name, i) => ({ id: String(i), name, logo: '' })),
}

export async function GET() {
  const data = readData('clients.json', defaultClients)
  return NextResponse.json(data)
}
