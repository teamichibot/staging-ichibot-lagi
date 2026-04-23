import { ProductData } from './products-data'
import { ServiceData } from './services-data'
import { Post } from './blog'

const SITE_URL = 'https://ichibot.id' // Update with actual domain if known

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ichibot',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Ichibot membantu perusahaan manufaktur mengadopsi IoT dan AI secara praktis dan terjangkau. Digitalisasi pabrik tanpa ganti infrastruktur.',
    sameAs: [
      'https://www.linkedin.com/company/ichibot',
      'https://www.instagram.com/ichibot',
      'https://www.youtube.com/ichibot'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-xxx-xxxx-xxxx',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English']
    }
  }
}

export function getProductSchema(product: ProductData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title.id,
    image: product.image,
    description: product.desc.id,
    brand: {
      '@type': 'Brand',
      name: 'Ichibot'
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/produk/${product.slug}`,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Ichibot'
      }
    }
  }
}

export function getServiceSchema(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title.id,
    serviceType: 'Industrial IoT & AI',
    provider: {
      '@type': 'Organization',
      name: 'Ichibot',
      url: SITE_URL
    },
    description: service.desc.id,
    areaServed: 'Indonesia'
  }
}

export function getBlogPostingSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Ichibot Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ichibot',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    description: post.excerpt
  }
}

export function getBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined
    }))
  }
}
