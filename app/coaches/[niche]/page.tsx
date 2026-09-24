import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Compel — Funnel Agency for ${config.displayName}`,
    description: config.description,
    url: `https://getcompel.co/coaches/${niche}`,
    serviceType: `Performance-Based Funnel Building for ${config.displayName}`,
    areaServed: ['US', 'GB', 'CA'],
    provider: {
      '@type': 'Organization',
      '@id': 'https://getcompel.co/#organization',
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
        <section className="relative mx-auto max-w-5xl px-6 py-16" aria-labelledby="niche-approach">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Built for {config.displayName}</p>
          <h2 id="niche-approach" className="text-3xl font-semibold text-white md:text-4xl">A clearer path from interest to conversation</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6"><h3 className="text-lg font-semibold text-accent">The challenge</h3><p className="mt-3 leading-relaxed text-neutral-300">{config.challenge}</p></div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6"><h3 className="text-lg font-semibold text-accent">Our approach</h3><p className="mt-3 leading-relaxed text-neutral-300">{config.approach}</p></div>
          </div>
          <Link href={`/learn/${config.guideSlug}`} className="mt-6 inline-block text-sm font-semibold text-accent underline underline-offset-4">Read: {config.guideLabel} →</Link>
        </section>
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
