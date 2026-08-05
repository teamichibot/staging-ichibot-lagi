import { NextResponse } from 'next/server'

type UnsplashApiPhoto = {
  id: string
  urls: { thumb: string; raw: string }
  user: { name: string; links: { html: string } }
  links: { download_location: string }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const key = process.env.UNSPLASH_ACCESS_KEY

  if (!key) {
    return NextResponse.json({ error: 'Unsplash Access Key not configured on server.' }, { status: 500 })
  }

  if (action === 'search') {
    const query = searchParams.get('query')
    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    try {
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${key}&per_page=12`
      const res = await fetch(unsplashUrl)
      if (!res.ok) {
        const errorText = await res.text()
        return NextResponse.json({ error: `Unsplash API error: ${res.statusText}`, details: errorText }, { status: res.status })
      }
      const data = await res.json()
      // Map relevant fields to send to client
      const photos = data.results.map((p: UnsplashApiPhoto) => ({
        id: p.id,
        urls: {
          thumb: p.urls.thumb,
          raw: p.urls.raw,
        },
        user: {
          name: p.user.name,
          links: {
            html: p.user.links.html,
          }
        },
        links: {
          download_location: p.links.download_location,
        }
      }))
      return NextResponse.json({ results: photos })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (action === 'download') {
    const downloadLocation = searchParams.get('url')
    if (!downloadLocation) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    try {
      // Unsplash requires GET request with authentication to the download_location link
      const res = await fetch(downloadLocation, {
        headers: {
          'Authorization': `Client-ID ${key}`
        }
      })
      if (!res.ok) {
        const errorText = await res.text()
        return NextResponse.json({ error: `Unsplash API error: ${res.statusText}`, details: errorText }, { status: res.status })
      }
      return NextResponse.json({ ok: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
