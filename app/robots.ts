import { MetadataRoute } from 'next'

// Admin-only host: nothing here should be crawled. The public site and its
// sitemaps live at www.ichibot.id.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  }
}
