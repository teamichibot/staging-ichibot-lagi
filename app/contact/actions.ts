'use server'

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

  // TODO: Kirim ke email / Google Sheets / CRM
  console.log('Contact form submission:', { name, email, company, phone, service, message })

  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 600))

  return { success: true }
}
