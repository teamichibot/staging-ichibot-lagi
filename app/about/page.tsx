import { Metadata } from 'next'
import Image from 'next/image'
import { CTASection } from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'About Us - Ichibot',
  description: 'Mengenal Ichibot (PT Gasgas Anagata Semesta) dan tim inovator di baliknya.',
}

const team = [
  {
    name: 'Budi Santoso',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Andi Pratama',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Citra Dewi',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-teal/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            PT Gasgas Anagata Semesta
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Membangun Masa Depan <span className="text-teal-light">Industri Indonesia</span>
          </h1>
          <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-balance">
            Ichibot lahir dari visi untuk memberikan solusi teknologi otomasi dan AI yang praktis, terjangkau, dan dapat langsung diimplementasikan oleh seluruh lapisan industri manufaktur di Indonesia tanpa perlu membongkar infrastruktur lama.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Tech Lab" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white font-display text-2xl font-bold italic mb-2">"Teknologi tinggi baru berguna jika memecahkan masalah bumi manusia."</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-8">Visi Kami</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                Menjadi katalisator transformasi digital nomor satu bagi sektor manufaktur lokal. Kami percaya bahwa setiap pabrik, dari yang berskala menengah hingga enterprise besar, berhak menikmati efisiensi tingkat tinggi lewat kekuatan <i>Internet of Things (IoT)</i> dan kecerdasan buatan, membawa ekosistem perindustrian tanah air naik kelas ke level global.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-xl mb-2">Agility</h3>
                    <p className="text-gray-600">Terus bergerak cepat dan beradaptasi memberikan solusi paling efektif untuk kendala lapangan yang kompleks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-xl mb-2">Empowering</h3>
                    <p className="text-gray-600">Bukan sekadar menjual teknologi, tapi mentransfer wawasan agar tim Anda dapat mandiri dan berkembang.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Table */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">Leadership Team</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Para penggerak yang mendedikasikan hidupnya untuk mendorong batas teknologi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((person, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-xl font-bold text-navy mb-1">{person.name}</h3>
                  <p className="text-teal font-medium text-sm">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <CTASection />
    </main>
  )
}
