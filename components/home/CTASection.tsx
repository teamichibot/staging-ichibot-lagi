'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { t, WHATSAPP_NUMBER } from '@/lib/translations'

export function CTASection() {
  const { lang } = useLang()
  const tx = (obj: { id: string; en: string }) => obj[lang]
  const sectionRef = useRef<HTMLDivElement>(null)
  const waMessage = encodeURIComponent(t.whatsapp.message[lang])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-navy rounded-[3rem] p-10 md:p-16 lg:p-24 overflow-hidden shadow-[0_20px_60px_rgba(10,37,64,0.15)] reveal group">
          
          {/* Abstract Mesh Background */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-teal/20 rounded-full blur-[120px] transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[70%] bg-blue-600/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute top-[20%] left-[30%] w-[30%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            {/* Grid texture overlay */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            {/* Left Side: Call to Action */}
            <div className="text-left flex flex-col items-start max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-light text-sm font-semibold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                Let's Transform
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-[4rem] font-bold text-white mb-6 tracking-tight leading-[1.05]">
                {tx(t.cta.heading)}
              </h2>
              
              <p className="text-white/60 text-lg md:text-xl mb-12 font-light leading-relaxed">
                {tx(t.cta.subtext)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="https://ichibot.fillout.com/projectcustom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-navy hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_40px_rgba(255,255,255,0.2)] text-base group/btn"
                >
                  {tx(t.cta.button)}
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" className="transform transition-transform duration-300 group-hover/btn:translate-x-1">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 text-base"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.531 5.85L.057 23.667a.5.5 0 00.613.608l5.913-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 01-5.127-1.41l-.368-.217-3.812 1 .964-3.723-.239-.384A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  {tx(t.cta.whatsapp)}
                </a>
              </div>
            </div>

            {/* Right Side: The Glass Quote Card */}
            <div className="relative w-full lg:ml-auto lg:max-w-md mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal/40 to-blue-500/40 blur-3xl transform rotate-6 scale-90" />
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-10 rounded-[2rem] shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <svg className="absolute top-6 left-6 text-white/5 w-24 h-24 transform -rotate-12 pointer-events-none" viewBox="0 0 40 32" fill="currentColor">
                  <path d="M0 32V20C0 8.667 6.667 2 20 0l2.667 4C16.889 5.333 13.333 8.667 12 14H20V32H0zm20 0V20C20 8.667 26.667 2 40 0l2.667 4C37.111 5.333 33.333 8.667 32 14H40V32H20z" />
                </svg>
                
                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-6 text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-white/95 text-xl font-light italic leading-[1.7] mb-8">
                    "{tx(t.cta.quote)}"
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                      IC
                    </div>
                    <div>
                      <p className="text-white font-semibold flex items-center gap-2">
                        Ichibot Team
                        <svg className="w-4 h-4 text-teal" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </p>
                      <p className="text-white/50 text-sm">Industrial Innovator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
