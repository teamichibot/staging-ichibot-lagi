import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { servicesData } from '@/lib/services-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(readData('services.json', servicesData))
}

export async function POST(request: Request) {
  const newItem = await request.json()
  const list = readData('services.json', servicesData)
  list.push(newItem)
  writeData('services.json', list)
  revalidatePath('/')
  revalidatePath('/layanan/[slug]', 'page')
  return NextResponse.json({ ok: true })
}

export async function PUT(request: Request) {
  const body = await request.json()
  writeData('services.json', body)
  revalidatePath('/')
  revalidatePath('/layanan/[slug]', 'page')
  return NextResponse.json({ ok: true })
}
