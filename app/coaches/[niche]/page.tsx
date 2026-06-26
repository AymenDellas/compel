import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllNiches } from '../../../lib/niches'
import NicheHero from '../../../components/NicheHero'
import WhoItsFor from '../../../components/WhoItsFor'
import HowItWorks from '../../../components/HowItWorks'
import TheGuarantee from '../../../components/TheGuarantee'
import WhyCompel from '../../../components/WhyCompel'
import FAQ from '../../../components/FAQ'
import CTA from '../../../components/CTA'

type Props = {
  params: Promise<{ niche: string }>
}

export function generateStaticParams() {
  const niches = getAllNiches()
  return niches.map((niche) => ({
    niche: niche,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params
  const formattedNiche = niche ? `${niche.charAt(0).toUpperCase() + niche.slice(1)} Coaches` : "Coaches"
  
  return {
    title: `Compel | Performance-Based Acquisition for ${formattedNiche}`,
    description: `Performance-Based Acquisition for ${formattedNiche}. Scale your coaching business with guaranteed results.`,
    openGraph: {
      title: `Compel | Performance-Based Acquisition for ${formattedNiche}`,
      description: `Performance-Based Acquisition for ${formattedNiche}. Scale your coaching business with guaranteed results.`,
    },
    twitter: {
      title: `Compel | Performance-Based Acquisition for ${formattedNiche}`,
      description: `Performance-Based Acquisition for ${formattedNiche}. Scale your coaching business with guaranteed results.`,
    }
  }
}

export default async function Page({ params }: Props) {
  const { niche } = await params
  const formattedNiche = niche ? `${niche.charAt(0).toUpperCase() + niche.slice(1)} Coaches` : "Coaches"

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Compel for ${formattedNiche}`,
    description: `Performance-Based Acquisition for ${formattedNiche}. Scale your coaching business with guaranteed results.`,
  }

  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-black font-sans bg-background text-text overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
      </div>
      
      <main>
        <header>
          <NicheHero niche={niche} />
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
      </main>

      <footer>
        <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
          <CTA />
        </Suspense>
      </footer>
    </div>
  )
}
