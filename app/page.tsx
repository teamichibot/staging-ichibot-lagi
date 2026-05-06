export const dynamic = 'force-dynamic'

import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Solutions } from '@/components/home/Solutions'
import { Services } from '@/components/home/Services'
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

  const caseStudyPosts = allPosts.filter((p) => p.category === 'Case Study').slice(0, 5)
  const previewPosts = allPosts.slice(0, 5)

  const sortedProducts = [...productItems].reverse()

  return (
    <main className="bg-white">
      <Hero caseStudies={caseStudyPosts} products={sortedProducts.slice(0, 2)} />
      <SocialProof />
      <CaseStudy posts={caseStudyPosts} />
      <WhyIchibot />
      <Solutions productItems={sortedProducts} />
      <Services serviceItems={serviceItems} />
      <HowItWorks />
      <CTASection />
      <BlogPreview posts={previewPosts} />
    </main>
  )
}
