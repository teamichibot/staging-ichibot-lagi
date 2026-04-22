import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, from = 'id', to = 'en' } = await req.json()

    if (!text) {
      return NextResponse.json({ text: '' })
    }

    // Using a public, non-API-key endpoint for Google Translate
    // This is for demonstration/small-scale use. 
    // In production, a paid API is recommended for reliability.
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    
    const response = await fetch(url)
    const data = await response.json()

    // The structure of the response is an array where the first element 
    // contains the translated parts.
    let translatedText = ''
    if (data && data[0]) {
      translatedText = data[0].map((part: any) => part[0]).join('')
    }

    return NextResponse.json({ text: translatedText })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json({ error: 'Failed to translate' }, { status: 500 })
  }
}
