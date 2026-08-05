'use client'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  const delta = 1
  const range: (number | '...')[] = []
  const start = Math.max(2, page - delta)
  const end = Math.min(totalPages - 1, page + delta)

  range.push(1)
  if (start > 2) range.push('...')
  for (let i = start; i <= end; i++) range.push(i)
  if (end < totalPages - 1) range.push('...')
  if (totalPages > 1) range.push(totalPages)

  return range
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav aria-label="Navigasi halaman" className="flex items-center justify-center gap-1.5 pt-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Halaman sebelumnya"
        className="p-2 rounded-lg text-ink/55 hover:text-ink hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-ink/40 text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-semibold transition-colors ${
              p === page
                ? 'bg-brand text-white'
                : 'text-ink/65 hover:text-ink hover:bg-black/5'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Halaman berikutnya"
        className="p-2 rounded-lg text-ink/55 hover:text-ink hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}
