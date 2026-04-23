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

  const caseStudyPosts = allPosts.filter((p) => p.category === 'Case Study').slice(0, 5)
  const previewPosts = allPosts.slice(0, 5)

  const sortedProducts = [...productItems].reverse()

  return (
    <main className="bg-[#050A14] relative overflow-hidden">
      {/* Global Ambient Glows (Seamless Background) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[2%] left-[-10%] w-[600px] h-[600px] bg-teal/20 rounded-full blur-[140px]" />
        <div className="absolute top-[12%] right-[-5%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[25%] left-[5%] w-[700px] h-[700px] bg-navy/40 rounded-full blur-[160px]" />
        <div className="absolute top-[38%] right-[5%] w-[600px] h-[600px] bg-teal/15 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[-5%] w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[65%] right-[0%] w-[700px] h-[700px] bg-teal/10 rounded-full blur-[140px]" />
        <div className="absolute top-[78%] left-[5%] w-[600px] h-[600px] bg-navy/30 rounded-full blur-[130px]" />
        <div className="absolute top-[88%] right-[-5%] w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[2%] left-[-10%] w-[600px] h-[600px] bg-teal/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Hero caseStudies={caseStudyPosts} products={sortedProducts.slice(0, 2)} />
        <SocialProof />
        <Services serviceItems={serviceItems} />
        <Products productItems={sortedProducts} />
        <CaseStudy posts={caseStudyPosts} />
        <WhyIchibot />
        <CTASection />
        <BlogPreview posts={previewPosts} />
      </div>
    </main>
  )
}
