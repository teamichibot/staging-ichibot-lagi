'use client'

import { useEffect, useRef } from 'react'

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

function getTikTokId(url: string): string | null {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/)
  return match ? match[1] : null
}

function getInstagramCode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-2xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

function TikTokEmbed({ videoId, originalUrl }: { videoId: string; originalUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const existing = document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
    if (existing) {
      // Script already loaded — re-trigger processing
      if (typeof window !== 'undefined' && (window as { tiktokEmbed?: { lib?: { render?: () => void } } }).tiktokEmbed?.lib?.render) {
        (window as { tiktokEmbed?: { lib?: { render?: () => void } } }).tiktokEmbed!.lib!.render!()
      }
      return
    }
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [videoId])

  return (
    <div ref={ref} className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={originalUrl}
        data-video-id={videoId}
        style={{ maxWidth: 605, minWidth: 325 }}
      >
        <section />
      </blockquote>
    </div>
  )
}

function InstagramEmbed({ code, originalUrl }: { code: string; originalUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    if (existing) {
      if (typeof window !== 'undefined' && (window as { instgrm?: { Embeds?: { process?: () => void } } }).instgrm?.Embeds?.process) {
        (window as { instgrm?: { Embeds?: { process?: () => void } } }).instgrm!.Embeds!.process!()
      }
      return
    }
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [code])

  return (
    <div ref={ref} className="flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={originalUrl}
        data-instgrm-version="14"
        style={{ maxWidth: 540, minWidth: 326, width: '100%' }}
      />
    </div>
  )
}

export function VideoEmbed({ url }: { url: string }) {
  if (!url) return null

  const ytId = getYouTubeId(url)
  if (ytId) return <YouTubeEmbed videoId={ytId} />

  const ttId = getTikTokId(url)
  if (ttId) return <TikTokEmbed videoId={ttId} originalUrl={url} />

  const igCode = getInstagramCode(url)
  if (igCode) return <InstagramEmbed code={igCode} originalUrl={url} />

  return null
}
