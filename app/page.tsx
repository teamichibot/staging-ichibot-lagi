import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Services } from '@/components/home/Services'
import { Products } from '@/components/home/Products'
import { CaseStudy } from '@/components/home/CaseStudy'
import { WhyIchibot } from '@/components/home/WhyIchibot'
import { CTASection } from '@/components/home/CTASection'
import { BlogPreview } from '@/components/home/BlogPreview'
import { getAllPostsMerged } from '@/lib/blog'

export default async function HomePage() {
  const allPosts = await getAllPostsMerged()
  const caseStudyPosts = allPosts.filter((p) => p.category === 'Case Study').slice(0, 3)
  const previewPosts = allPosts.slice(0, 3)

  return (
    <>
      <Hero caseStudies={caseStudyPosts} />
      <SocialProof />
      <Services />
      <Products />
      <CaseStudy posts={caseStudyPosts} />
      <WhyIchibot />
      <CTASection />
      <BlogPreview posts={previewPosts} />
    </>
  )
}
