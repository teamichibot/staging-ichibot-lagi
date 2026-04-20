import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/admin-data'
import { productsData } from '@/lib/products-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(readData('products.json', productsData))
}

export async function POST(request: Request) {
  const newItem = await request.json()
  const list = readData('products.json', productsData)
  list.push(newItem)
  writeData('products.json', list)
  revalidatePath('/')
  revalidatePath('/produk/[slug]', 'page')
  return NextResponse.json({ ok: true })
}

export async function PUT(request: Request) {
  const body = await request.json()
  writeData('products.json', body)
  revalidatePath('/')
  revalidatePath('/produk/[slug]', 'page')
  return NextResponse.json({ ok: true })
}
