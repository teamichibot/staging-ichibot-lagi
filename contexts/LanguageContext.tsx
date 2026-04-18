'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang
  toggle: () => void
  tx: (obj: { id: string; en: string }) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('id')

  const toggle = () => setLang(l => (l === 'id' ? 'en' : 'id'))

  const tx = (obj: { id: string; en: string }) => obj[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggle, tx }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
