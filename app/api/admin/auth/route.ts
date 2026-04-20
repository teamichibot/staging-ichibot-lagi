import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  const expected = process.env.ADMIN_PASSWORD ?? 'ichibot-admin'

  if (password !== expected) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 })
  }

  const token = btoa(unescape(encodeURIComponent(password)))
  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('admin_token')
  return response
}
