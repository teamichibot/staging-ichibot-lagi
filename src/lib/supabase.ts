import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client. The service-role key must never reach the
 * browser, so this module is only ever imported from Astro frontmatter or an
 * API route — never from a <script> block or a client component.
 */
const url = import.meta.env.SUPABASE_URL
const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. Copy them into .env.local.'
  )
}

export const supabase = createClient(url, key)
