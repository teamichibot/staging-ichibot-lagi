import Link from 'next/link'
import { AdminShell } from './AdminShell'

const sections = [
  {
    href: '/admin/clients',
    label: 'Logo Klien',
    desc: 'Kelola logo klien industri dan mitra akademik yang ditampilkan di halaman utama.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/admin/layanan',
    label: 'Layanan',
    desc: 'Tambah, edit, dan hapus layanan yang ditampilkan di halaman utama dan halaman detail.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600',
  },
  {
    href: '/admin/produk',
    label: 'Produk',
    desc: 'Kelola produk siap pakai Ichibot beserta fitur, spesifikasi, dan detail halamannya.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href: '/admin/blog',
    label: 'Blog',
    desc: 'Tulis, edit, dan hapus artikel blog serta case study.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: 'bg-green-50 text-green-600',
  },
]

export default function AdminDashboard() {
  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Pilih bagian yang ingin dikelola.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-teal transition-colors">{s.label}</p>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
