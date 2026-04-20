import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { productsData } from '@/lib/products-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(await readData('products', productsData))
}

export async function POST(request: Request) {
  const newItem = await request.json()
  const list = await readData('products', productsData)
  list.push(newItem)
  await writeData('products', list)
  revalidatePath('/')
  revalidatePath('/produk/[slug]', 'page')
  return NextResponse.json({ ok: true })
}

export async function PUT(request: Request) {
  const body = await request.json()
  await writeData('products', body)
  revalidatePath('/')
  revalidatePath('/produk/[slug]', 'page')
  return NextResponse.json({ ok: true })
}
