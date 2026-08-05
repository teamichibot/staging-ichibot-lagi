/**
 * Sanitize raw AI chatbot output before JSON.parse.
 *
 * Handles two common issues:
 * 1. Code fences (```json ... ```) wrapping the JSON
 * 2. Auto-linked URLs [https://...](https://...) → plain URL
 *    Only targets patterns where BOTH the link text and href are URLs
 *    so internal links like [deteksi APD](/blog/slug) are NOT affected.
 */
export function sanitizeAiJson(raw: string): string {
  let s = raw.trim()
  // Strip code fence ```json ... ``` if present
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
  // Convert [url](url) → url (only when link text is also a URL)
  s = s.replace(/\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$2')
  return s
}

/**
 * Attempt JSON.parse with a descriptive error message showing
 * the character context around the failure position.
 */
export function parseJsonWithContext(s: string): { ok: true; data: unknown } | { ok: false; error: string } {
  try {
    return { ok: true, data: JSON.parse(s) }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    // Try to extract position from "at position N" or "at column N"
    const posMatch = msg.match(/position\s+(\d+)/i)
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10)
      const start = Math.max(0, pos - 30)
      const end = Math.min(s.length, pos + 30)
      const snippet = s.substring(start, end)
      const pointer = ' '.repeat(Math.min(30, pos - start)) + '↑'
      return {
        ok: false,
        error: `JSON tidak valid di posisi ${pos}:\n\n…${snippet}…\n${pointer}\n\nDetail: ${msg}`,
      }
    }
    return { ok: false, error: `JSON tidak valid: ${msg}` }
  }
}
