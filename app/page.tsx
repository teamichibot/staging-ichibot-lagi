import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Services } from '@/components/home/Services'
import { Products } from '@/components/home/Products'
import { CaseStudy } from '@/components/home/CaseStudy'
import { WhyIchibot } from '@/components/home/WhyIchibot'
import { CTASection } from '@/components/home/CTASection'
import { BlogPreview } from '@/components/home/BlogPreview'
import { getAllPosts } from '@/lib/blog'

export default function HomePage() {
  const caseStudyPosts = getAllPosts().filter((p) => p.category === 'Case Study').slice(0, 3)

  return (
    <>
      <Hero caseStudies={caseStudyPosts} />
      <SocialProof />
      <Services />
      <Products />
      <CaseStudy posts={caseStudyPosts} />
      <WhyIchibot />
      <CTASection />
      <BlogPreview />
    </>
  )
}
