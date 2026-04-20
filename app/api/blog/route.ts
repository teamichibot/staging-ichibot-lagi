import { NextResponse } from 'next/server'
import { getAllPostsMerged } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await getAllPostsMerged()
  return NextResponse.json(posts)
}
