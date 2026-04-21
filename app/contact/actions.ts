'use server'

import { Resend } from 'resend'

export type ContactResult = { success: true } | { success: false; error: string }

export async function submitContact(_prev: ContactResult | null, formData: FormData): Promise<ContactResult> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const company = formData.get('company')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const service = formData.get('service')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Isi kolom wajib (Nama, Email, Pesan).' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Ichibot Website <noreply@ichibot.id>',
      to: 'hello@ichibot.id',
      replyTo: email,
      subject: `Pesan baru dari ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
          <h2 style="color:#0f172a;margin-bottom:4px">Pesan Baru dari Website</h2>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b;width:120px">Nama</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#14b8a6">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#64748b">No. HP</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px 0;color:#64748b">Perusahaan</td><td style="padding:8px 0">${company}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;color:#64748b">Layanan</td><td style="padding:8px 0">${service}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
          <p style="color:#64748b;margin-bottom:8px">Pesan:</p>
          <p style="background:#f8fafc;padding:16px;border-radius:8px;white-space:pre-wrap">${message}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
          <p style="color:#94a3b8;font-size:12px">Dikirim dari ichibot.id/contact</p>
        </div>
      `,
    })
    return { success: true }
  } catch (err) {
    console.error('Resend error:', err)
    return { success: false, error: 'Gagal mengirim pesan. Coba lagi atau hubungi kami via WhatsApp.' }
  }
}
