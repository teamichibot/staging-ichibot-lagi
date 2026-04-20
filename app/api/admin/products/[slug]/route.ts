import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { productsData } from '@/lib/products-data'
import { revalidatePath } from 'next/cache'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = await readData('products', productsData)
  const item = list.find((p) => p.slug === slug)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const updated = await request.json()
  const list = await readData('products', productsData)
  const idx = list.findIndex((p) => p.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  list[idx] = updated
  await writeData('products', list)
  revalidatePath('/')
  revalidatePath(`/produk/${slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = await readData('products', productsData)
  await writeData('products', list.filter((p) => p.slug !== slug))
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
