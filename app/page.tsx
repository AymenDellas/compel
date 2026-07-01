import { Suspense } from 'react'
import Link from 'next/link'
import Hero from '../components/Hero'
import WhoItsFor from '../components/WhoItsFor'
import HowItWorks from '../components/HowItWorks'
import TheGuarantee from '../components/TheGuarantee'
import WhyCompel from '../components/WhyCompel'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import { getAllArticles } from '../lib/markdown'
import { getAllNiches, getNicheConfig } from '../lib/niches'

export default function Page() {
  const articles = getAllArticles()
  const niches = getAllNiches()

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Compel Performance Funnels for Coaches",
    "description": "Learn how we build high-converting funnels for coaches with $0 upfront cost.",
    "thumbnailUrl": "https://getcompel.co/og-image.png",
    "uploadDate": "2026-06-25T08:00:00+08:00",
    "contentUrl": "https://www.youtube.com/watch?v=placeholder",
    "embedUrl": "https://www.youtube.com/embed/placeholder"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <div className="relative min-h-screen selection:bg-accent selection:text-black font-sans bg-background text-text overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
      </div>
      
      <main>
        <header>
          <Hero />
        </header>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <WhoItsFor />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <TheGuarantee />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <WhyCompel />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <FAQ />
        </Suspense>

        {/* Niche Pages Internal Links */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 uppercase text-center">
            Specialized Funnels by Coaching Niche
          </h2>
          <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
            Every coaching niche has unique conversion patterns. We build funnels engineered for your specific audience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {niches.map((slug) => {
              const config = getNicheConfig(slug)
              if (!config) return null
              return (
                <Link
                  key={slug}
                  href={`/coaches/${slug}`}
                  className="group flex items-center justify-between p-5 rounded-xl border border-neutral-800 bg-neutral-950/50 hover:border-accent/50 hover:bg-neutral-900/50 transition-all duration-200"
                >
                  <span className="text-white font-medium group-hover:text-accent transition-colors">
                    {config.displayName}
                  </span>
                  <svg
                    className="w-4 h-4 text-neutral-600 group-hover:text-accent group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Resources / Articles Internal Links */}
        <section className="py-20 px-6 max-w-6xl mx-auto border-t border-neutral-800">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 uppercase">
                Resources
              </h2>
              <p className="text-neutral-400 max-w-xl">
                Guides on coaching funnels, client acquisition costs, and scaling your practice.
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden sm:flex items-center gap-2 text-sm text-accent font-medium hover:underline"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article: any) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group block p-6 rounded-xl border border-neutral-800 bg-neutral-950/50 hover:border-accent/30 hover:bg-neutral-900/50 transition-all duration-200"
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-accent transition-colors leading-tight line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-3">
                    {article.excerpt}
                  </p>
                )}
                <span className="text-xs text-accent font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/learn"
              className="text-sm text-accent font-medium hover:underline"
            >
              View all articles →
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <CTA />
        </Suspense>
        <Footer />
      </footer>
    </div>
    </>
  )
}
