/**
 * Inherited from the old site, where it was annotated
 * `// placeholder — ganti nanti`. It is what www.ichibot.id currently sends
 * people to, so it is not invented — but it is not confirmed either, and the
 * brief lists the WhatsApp number among the things still to be supplied.
 * Confirm before launch; everything that links to WhatsApp reads from here.
 */
export const WHATSAPP_NUMBER = '6287763484384'

const GREETING = 'Hello Ichibot, I would like to talk about monitoring for our plant.'

export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GREETING)}`

/** From the old site's footer and CTA (branch main: lib/translations.ts, CTASection.tsx). */
export const EMAIL = 'hello@ichibot.id'
export const SURVEY_FORM = 'https://ichibot.fillout.com/proyekindustri'
export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/ichibot.id/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@ichibot.id' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ichibot_id' },
]

/** WhatsApp link whose opening message names the product the visitor asked about. */
export const demoLink = (product: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    product === 'Custom'
      ? 'Hello Ichibot, I would like to discuss a custom system for our plant.'
      : `Hello Ichibot, I would like to request a demo of ${product}.`,
  )}`
