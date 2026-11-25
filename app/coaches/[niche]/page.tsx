import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllNiches, getNicheConfig } from '@/lib/niches';
import { ReviewButton } from '@/components/ReviewButton';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ niche: string }> };
export function generateStaticParams() { return getAllNiches().map(niche => ({ niche })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const config = getNicheConfig(niche);
  if (!config) return { title: 'Not Found' };
  return { title: config.title, description: config.description, alternates: { canonical: `https://getcompel.co/coaches/${niche}` }, openGraph: { title: config.title, description: config.description, url: `https://getcompel.co/coaches/${niche}`, images: [{ url: 'https://getcompel.co/opengraph-image' }] }, twitter: { card: 'summary_large_image', title: config.title, description: config.description, images: ['https://getcompel.co/opengraph-image'] } };
}
export default async function NichePage({ params }: Props) {
  const { niche } = await params;
  const config = getNicheConfig(niche);
  if (!config) notFound();
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: `A connected coaching experience for ${config.displayName.toLowerCase()}`, description: config.description, url: `https://getcompel.co/coaches/${niche}`, serviceType: 'Landing page, booking journey and follow-up', provider: { '@id': 'https://getcompel.co/#organization' } };
  return <><main id="main-content" className="public-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="studio-wrap public-content"><header className="public-intro"><p className="small-label">For established {config.displayName.toLowerCase()}</p><h1>They&apos;re interested.<br /><em>Help them take the next step.</em></h1><p>{config.description}</p></header><ReviewButton /><div className="public-prose"><h2>A clearer path to a conversation</h2><p>{config.challenge}</p><p>{config.approach}</p><h2>The page, the booking, the follow-up</h2><p>We clarify how your offer is presented, give each service an appropriate next step, and connect relevant confirmations and preparation. The scope depends on your business and what is already working.</p><h2>Start with what is there</h2><p>Send your website for a free review. We’ll look at what your visitors see, how they book a call, and what we’d fix first.</p><Link href={`/learn/${config.guideSlug}`}>{config.guideLabel} →</Link></div><div className="public-review"><ReviewButton /></div></div></main><Footer /></>;
}
