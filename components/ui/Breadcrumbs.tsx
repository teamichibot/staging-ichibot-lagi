import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-xs font-medium text-muted mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-teal transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <svg
              className="w-3 h-3 text-border flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {item.href ? (
              <Link href={item.href} className="hover:text-teal transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
