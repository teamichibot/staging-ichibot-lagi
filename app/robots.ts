import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.ichibot.id'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
