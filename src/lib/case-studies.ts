import { supabase } from './supabase'

export type CaseStudy = {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
}

/** Both spellings exist in the table; the Indonesian one is a handful of rows. */
const CATEGORIES = ['Case Study', 'Studi Kasus']

/**
 * Only photos Ichibot actually hosts. Three case-study rows point at
 * images.unsplash.com and i.pinimg.com — someone else's pictures standing in
 * for Ichibot's own work. They are excluded rather than whitelisted: the
 * licensing is not ours, the hosts can disappear, and a case study illustrated
 * with borrowed stock undercuts the point of the section.
 */
const OWN_IMAGE_HOST = 'https://img.ichibot.id/'

export async function getCaseStudies(limit = 12): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, image, date')
    .in('category', CATEGORIES)
    .not('image', 'is', null)
    .like('image', `${OWN_IMAGE_HOST}%`)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[case-studies] query failed:', error.message)
    return []
  }
  return (data ?? []) as CaseStudy[]
}
