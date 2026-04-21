import 'server-only'
import { readData } from './admin-data'
import { servicesData, type ServiceData } from './services-data'
import { productsData, type ProductData } from './products-data'

export async function getAllServices(): Promise<ServiceData[]> {
  return readData('services', servicesData)
}

export async function getServiceBySlugLive(slug: string): Promise<ServiceData | undefined> {
  const list = await getAllServices()
  return list.find((s) => s.slug === slug)
}

export async function getAllProducts(): Promise<ProductData[]> {
  return readData('products', productsData)
}

export async function getProductBySlugLive(slug: string): Promise<ProductData | undefined> {
  const list = await getAllProducts()
  return list.find((p) => p.slug === slug)
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

const defaultTeam: TeamMember[] = [
  {
    name: 'Angga Priyatmoko',
    role: 'Founder & CEO',
    bio: 'Memimpin Ichibot sejak 2016. Engineer dengan latar belakang robotika kompetitif yang kini berfokus pada transformasi industri melalui AI dan IoT.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Andi Pratama',
    role: 'Chief Technology Officer',
    bio: 'Memimpin pengembangan platform AI-IoT Ichibot. Spesialis sistem embedded, edge computing, dan integrasi protokol industri.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Citra Dewi',
    role: 'Chief Operating Officer',
    bio: 'Memastikan setiap proyek dieksekusi tepat waktu dan sesuai standar. Berpengalaman dalam manajemen proyek industri skala besar.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Rizky Fauzan',
    role: 'Head of AI Research',
    bio: 'Memimpin riset dan pengembangan model AI untuk aplikasi industri. Fokus pada computer vision dan predictive analytics untuk manufaktur.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
  },
]

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return readData('team', defaultTeam)
}
