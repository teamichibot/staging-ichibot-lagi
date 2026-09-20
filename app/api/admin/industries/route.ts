import { NextResponse } from 'next/server'
import { writeData } from '@/lib/admin-data'
import { getAllIndustries } from '@/lib/server-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const data = await getAllIndustries()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await writeData('industries', body)
    revalidatePath('/')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
