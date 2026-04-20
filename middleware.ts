import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_token')?.value
  const password = process.env.ADMIN_PASSWORD ?? 'ichibot-admin'
  const expected = btoa(unescape(encodeURIComponent(password)))
  return cookie === expected
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /api/admin/* — return 401 JSON (no redirect)
  // /api/admin/auth is the login endpoint itself, must stay open
  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/auth') {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }

  // Protect /admin/* UI pages — redirect to login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
