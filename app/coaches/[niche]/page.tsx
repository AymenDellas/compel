import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllNiches, getNicheConfig } from '../../../lib/niches'
import NicheHero from '../../../components/NicheHero'
import WhoItsFor from '../../../components/WhoItsFor'
import HowItWorks from '../../../components/HowItWorks'
import TheGuarantee from '../../../components/TheGuarantee'
import WhyCompel from '../../../components/WhyCompel'
import FAQ from '@/components/FAQ'
import CTA from '../../../components/CTA'
import Footer from '../../../components/Footer'
import Breadcrumbs from '../../../components/Breadcrumbs'

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
  const config = getNicheConfig(niche)
  
  if (!config) {
    return { title: 'Not Found' }
  }

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `https://getcompel.co/coaches/${niche}`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://getcompel.co/coaches/${niche}`,
      type: 'website',
      images: [{ url: 'https://getcompel.co/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: ['https://getcompel.co/twitter-image.png'],
    },
  }
}

export default async function Page({ params }: Props) {
  const { niche } = await params
  const config = getNicheConfig(niche)
  
  if (!config) {
    return <div>Not Found</div>
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Compel — Funnel Agency for ${config.displayName}`,
    description: config.description,
    url: `https://getcompel.co/coaches/${niche}`,
    serviceType: `Performance-Based Funnel Building for ${config.displayName}`,
    areaServed: ['US', 'GB', 'CA'],
    provider: {
      '@type': 'Organization',
      name: 'Compel',
      url: 'https://getcompel.co',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://getcompel.co',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: config.displayName,
        item: `https://getcompel.co/coaches/${niche}`,
      },
    ],
  }

  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-black font-sans bg-background text-text overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
      </div>
      
      <main>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: config.displayName },
        ]} />
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
        <Footer />
      </footer>
    </div>
  )
}
