import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { servicesData } from '@/lib/services-data'
import { revalidatePath } from 'next/cache'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = await readData('services', servicesData)
  const item = list.find((s) => s.slug === slug)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const updated = await request.json()
  const list = await readData('services', servicesData)
  const idx = list.findIndex((s) => s.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  list[idx] = updated
  await writeData('services', list)
  revalidatePath('/')
  revalidatePath(`/layanan/${slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = await readData('services', servicesData)
  await writeData('services', list.filter((s) => s.slug !== slug))
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
