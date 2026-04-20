import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { servicesData } from '@/lib/services-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(await readData('services', servicesData))
}

export async function POST(request: Request) {
  const newItem = await request.json()
  const list = await readData('services', servicesData)
  list.push(newItem)
  await writeData('services', list)
  revalidatePath('/')
  revalidatePath('/layanan/[slug]', 'page')
  return NextResponse.json({ ok: true })
}

export async function PUT(request: Request) {
  const body = await request.json()
  await writeData('services', body)
  revalidatePath('/')
  revalidatePath('/layanan/[slug]', 'page')
  return NextResponse.json({ ok: true })
}
