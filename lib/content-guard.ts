const BLOCKED_PATTERNS = [
  // Judi online
  /\b(slot|togel|judi\s*online|judol|gacor|rtp\s*slot|maxwin|scatter|jackpot\s*slot|spin\s*slot|pragmatic\s*play|pg\s*soft|demo\s*slot|link\s*slot|daftar\s*slot|situs\s*slot|agen\s*slot|bandar\s*judi|bandar\s*togel|toto\s*sgp|toto\s*hk|toto\s*macau)\b/i,
  // Pinjol ilegal
  /\b(pinjol|pinjaman\s*online\s*ilegal|dana\s*cepat\s*tanpa\s*ojk|pinjam\s*tanpa\s*bi\s*checking|kredit\s*kilat\s*ilegal)\b/i,
  // Phishing / penipuan umum
  /\b(klik\s*di\s*sini\s*menang|anda\s*terpilih\s*mendapatkan|transfer\s*ke\s*rekening\s*kami|whatsapp\s*admin\s*untuk\s*klaim)\b/i,
]

export function containsBlockedContent(text: string): boolean {
  return BLOCKED_PATTERNS.some((re) => re.test(text))
}

export function validatePostContent(fields: Record<string, string>): string | null {
  for (const [key, value] of Object.entries(fields)) {
    if (containsBlockedContent(value)) {
      return `Konten tidak diizinkan terdeteksi di field "${key}".`
    }
  }
  return null
}
