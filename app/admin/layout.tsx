import type { ReactNode } from 'react'

export const metadata = { title: 'Admin — Ichibot' }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="bg-gray-50 min-h-screen">{children}</div>
}
