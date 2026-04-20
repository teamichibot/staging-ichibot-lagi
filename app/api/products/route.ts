import { NextResponse } from 'next/server'
import { readData } from '@/lib/admin-data'
import { productsData } from '@/lib/products-data'

export async function GET() {
  const data = readData('products.json', productsData)
  return NextResponse.json(data)
}
