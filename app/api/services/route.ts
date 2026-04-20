import { NextResponse } from 'next/server'
import { readData } from '@/lib/admin-data'
import { servicesData } from '@/lib/services-data'

export async function GET() {
  const data = readData('services.json', servicesData)
  return NextResponse.json(data)
}
