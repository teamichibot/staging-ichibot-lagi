import Link from 'next/link'
import { AdminShell } from './AdminShell'

const sections = [
  {
    href: '/admin/clients',
    label: 'Logo Klien',
    desc: 'Kelola logo klien industri dan mitra akademik yang ditampilkan di halaman utama.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/admin/layanan',
    label: 'Layanan',
    desc: 'Tambah, edit, dan hapus layanan yang ditampilkan di halaman utama dan halaman detail.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    href: '/admin/produk',
    label: 'Produk',
    desc: 'Kelola produk siap pakai Ichibot beserta fitur, spesifikasi, dan detail halamannya.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    href: '/admin/blog',
    label: 'Blog',
    desc: 'Tulis, edit, dan hapus artikel blog serta case study.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4z" />
        <path d="M19 8h2a1 1 0 0 1 1 1v9a3 3 0 0 1-3 3" />
        <path d="M8 8h7M8 12h7M8 16h4" />
      </svg>
    ),
  },
  {
    href: '/admin/team',
    label: 'Tim Kami',
    desc: 'Kelola data anggota tim Ichibot yang ditampilkan di halaman tentang.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function AdminDashboard() {
  return (
    <AdminShell>
      <div className="p-6 md:p-10 max-w-5xl">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight">Dashboard</h1>
          <p className="text-ink/55 mt-2">Pilih bagian yang ingin dikelola.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-2xl border border-black/8 p-6 hover:border-brand/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                {s.icon}
              </div>
              <p className="font-display font-bold text-ink text-lg tracking-tight group-hover:text-brand transition-colors">{s.label}</p>
              <p className="text-ink/55 text-sm leading-relaxed mt-2">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
