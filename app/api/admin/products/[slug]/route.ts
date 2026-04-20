import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { productsData } from '@/lib/products-data'
import { revalidatePath } from 'next/cache'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = readData('products.json', productsData)
  const item = list.find((p) => p.slug === slug)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const updated = await request.json()
  const list = readData('products.json', productsData)
  const idx = list.findIndex((p) => p.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  list[idx] = updated
  writeData('products.json', list)
  revalidatePath('/')
  revalidatePath(`/produk/${slug}`)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params
  const list = readData('products.json', productsData)
  const filtered = list.filter((p) => p.slug !== slug)
  writeData('products.json', filtered)
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
