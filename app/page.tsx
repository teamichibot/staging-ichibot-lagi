export const dynamic = 'force-dynamic'

import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Industries } from '@/components/home/Industries'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Solutions } from '@/components/home/Solutions'
import { Services } from '@/components/home/Services'
import { CaseStudy } from '@/components/home/CaseStudy'
import { Testimonials } from '@/components/home/Testimonials'
import { CTASection } from '@/components/home/CTASection'
import { BlogPreview } from '@/components/home/BlogPreview'
import { getAllPostsMerged } from '@/lib/blog'
import { getAllServices, getAllProducts, getAllTestimonials, getAllIndustries } from '@/lib/server-data'

export default async function HomePage() {
  const [allPosts, serviceItems, productItems, testimonials, industries] = await Promise.all([
    getAllPostsMerged(),
    getAllServices(),
    getAllProducts(),
    getAllTestimonials(),
    getAllIndustries(),
  ])

  const caseStudyPosts = allPosts.filter((p) => p.category === 'Case Study')
  const previewPosts = allPosts.slice(0, 5)

  return (
    <main className="bg-[#0B0E13]">
      <Hero caseStudies={caseStudyPosts.slice(0, 5)} products={productItems.slice(0, 2)} />
      <SocialProof />
      <Industries industries={industries} />
      <CaseStudy posts={caseStudyPosts} />
      <Solutions productItems={productItems} />
      <Services serviceItems={serviceItems} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <CTASection />
      <BlogPreview posts={previewPosts} />
    </main>
  )
}
