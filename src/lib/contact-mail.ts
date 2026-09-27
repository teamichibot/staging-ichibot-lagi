import { EMAIL } from './contact'

/**
 * Mails a site survey request to EMAIL through Resend's HTTP API, as the old
 * site's contact action did (same RESEND_API_KEY, same noreply@ichibot.id
 * sender). Kept out of the .astro page because the Astro compiler misreads
 * HTML inside a template literal in frontmatter.
 */

export type SurveyRequest = {
  name: string
  company: string
  industry: string
  phone: string
  email: string
  message: string
}

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => entities[c])

export async function sendSurveyRequest(req: SurveyRequest, apiKey: string | undefined): Promise<void> {
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const rows = [
    ['Name', req.name],
    ['Company', req.company],
    ['Industry', req.industry],
    ['Phone / WhatsApp', req.phone],
    ['Email', req.email],
  ].filter(([, v]) => v)

  const html = `<div style="font-family:sans-serif;max-width:560px;color:#1e293b">
<h2 style="margin:0 0 12px">Site survey request</h2>
<table style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#64748b">${k}</td><td style="padding:6px 0;font-weight:600">${esc(v)}</td></tr>`)
    .join('')}</table>
<p style="margin:16px 0 6px;color:#64748b">Message</p>
<p style="background:#f8fafc;padding:14px;border-radius:8px;white-space:pre-wrap;margin:0">${esc(req.message)}</p>
<p style="color:#94a3b8;font-size:12px;margin-top:16px">Sent from ichibot.id/contact</p>
</div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Ichibot Website <noreply@ichibot.id>',
      to: EMAIL,
      ...(req.email && { reply_to: req.email }),
      subject: `Site survey request from ${req.name}${req.company ? ` (${req.company})` : ''}`,
      html,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}

export type ContactStatus = 'idle' | 'sent' | 'invalid' | 'failed'
export type ContactResult = { status: ContactStatus; values: SurveyRequest; httpStatus: number }

const EMPTY: SurveyRequest = { name: '', company: '', industry: '', phone: '', email: '', message: '' }

/**
 * Handles the /contact form for either language's route: a GET shows an
 * empty form; a POST is validated and mailed. The honeypot field `website`
 * catches bots, which are told it worked. The route sets `httpStatus`.
 */
export async function handleContactForm(request: Request, apiKey: string | undefined): Promise<ContactResult> {
  if (request.method !== 'POST') return { status: 'idle', values: { ...EMPTY }, httpStatus: 200 }
  const form = await request.formData()
  const get = (k: string) => (form.get(k)?.toString() ?? '').trim().slice(0, 4000)
  const values: SurveyRequest = {
    name: get('name'),
    company: get('company'),
    industry: get('industry'),
    phone: get('phone'),
    email: get('email'),
    message: get('message'),
  }
  if (get('website')) return { status: 'sent', values, httpStatus: 200 }
  if (!values.name || !values.phone || !values.message || (values.email && !/^\S+@\S+\.\S+$/.test(values.email))) {
    return { status: 'invalid', values, httpStatus: 400 }
  }
  try {
    await sendSurveyRequest(values, apiKey)
    return { status: 'sent', values, httpStatus: 200 }
  } catch (err) {
    console.error('[contact]', err)
    return { status: 'failed', values, httpStatus: 502 }
  }
}
