import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { t } from '@/lib/translations'
import { revalidatePath } from 'next/cache'

const defaultClients = {
  industry: t.socialProof.industryClients.map((name, i) => ({ id: String(i), name, logo: '' })),
  academic: t.socialProof.academicPartners.map((name, i) => ({ id: String(i), name, logo: '' })),
}

export async function GET() {
  return NextResponse.json(readData('clients.json', defaultClients))
}

export async function PUT(request: Request) {
  const body = await request.json()
  writeData('clients.json', body)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
