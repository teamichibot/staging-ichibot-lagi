import { NextResponse } from 'next/server'
import { writeData } from '@/lib/admin-data'
import { getAllTeamMembers } from '@/lib/server-data'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const data = await getAllTeamMembers()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await writeData('team', body)
    revalidatePath('/about')
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
