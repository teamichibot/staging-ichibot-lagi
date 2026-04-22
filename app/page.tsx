export const dynamic = 'force-dynamic'

import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Services } from '@/components/home/Services'
import { Products } from '@/components/home/Products'
import { CaseStudy } from '@/components/home/CaseStudy'
import { WhyIchibot } from '@/components/home/WhyIchibot'
import { CTASection } from '@/components/home/CTASection'
import { BlogPreview } from '@/components/home/BlogPreview'
import { getAllPostsMerged } from '@/lib/blog'
import { getAllServices, getAllProducts } from '@/lib/server-data'

export default async function HomePage() {
  const [allPosts, serviceItems, productItems] = await Promise.all([
    getAllPostsMerged(),
    getAllServices(),
    getAllProducts(),
  ])

  const caseStudyPosts = allPosts.filter((p) => p.category === 'Case Study').slice(0, 3)
  const previewPosts = allPosts.slice(0, 3)

  const sortedProducts = [...productItems].reverse()

  return (
    <>
      <Hero caseStudies={caseStudyPosts} products={sortedProducts.slice(0, 2)} />
      <SocialProof />
      <Services serviceItems={serviceItems} />
      <Products productItems={sortedProducts} />
      <CaseStudy posts={caseStudyPosts} />
      <WhyIchibot />
      <CTASection />
      <BlogPreview posts={previewPosts} />
    </>
  )
}
