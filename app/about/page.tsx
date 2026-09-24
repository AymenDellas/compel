import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Compel | Funnel Agency for Coaches',
  description: 'Meet Compel, a performance-based funnel agency founded by Aymen Dellas. We build landing pages, nurture emails, and booking flows for coaches.',
  alternates: { canonical: 'https://getcompel.co/about' },
  openGraph: {
    title: 'About Compel | Funnel Agency for Coaches',
    description: 'Learn who builds Compel’s coaching funnels and how the performance-based engagement works.',
    url: 'https://getcompel.co/about',
    type: 'website',
    images: [{ url: 'https://getcompel.co/og-image.png' }],
  },
};

export default function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aymen Dellas',
    url: 'https://getcompel.co/about',
    jobTitle: 'Founder',
    worksFor: { '@id': 'https://getcompel.co/#organization' },
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-accent">Home</Link> <span aria-hidden="true">/</span> About
        </nav>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">About Compel</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Performance-based funnels for coaches</h1>
        <p className="mt-8 text-lg leading-relaxed text-neutral-300">
          Compel builds landing pages, email nurture sequences, and booking flows for coaches who already have an offer and want more qualified discovery calls. Aymen Dellas founded Compel around a simple engagement model: no upfront build fee, with payment tied to an agreed increase in bookings.
        </p>

        <section className="mt-16" aria-labelledby="what-we-build">
          <h2 id="what-we-build" className="text-2xl font-semibold">What we build</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800 p-6"><h3 className="font-semibold text-accent">Direct-to-call</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">A focused page and booking flow for an audience ready to speak with you.</p></div>
            <div className="rounded-2xl border border-neutral-800 p-6"><h3 className="font-semibold text-accent">Lead magnet</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">An opt-in page and follow-up sequence for prospects who need more time and context.</p></div>
            <div className="rounded-2xl border border-neutral-800 p-6"><h3 className="font-semibold text-accent">Video-led</h3><p className="mt-3 text-sm leading-relaxed text-neutral-300">A video sales page supported by copy and a clear path to a discovery call.</p></div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="how-engagement-works">
          <h2 id="how-engagement-works" className="text-2xl font-semibold">How an engagement works</h2>
          <ol className="mt-6 list-decimal space-y-4 pl-6 text-neutral-300">
            <li>We review your offer, existing traffic, and current booking baseline.</li>
            <li>We agree on the target and build the page, follow-up, and booking flow.</li>
            <li>We measure bookings during the agreed performance window. Payment is due only if the agreed target is reached.</li>
          </ol>
          <p className="mt-6 text-sm text-neutral-400">Specific targets, measurement rules, and scope are agreed before work begins.</p>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link href="/learn" className="rounded-full border border-neutral-700 px-6 py-3 font-medium hover:border-accent hover:text-accent">Read our guides</Link>
          <a href="mailto:aymen@getcompel.co" className="rounded-full bg-accent px-6 py-3 font-semibold text-black hover:bg-accent/90">Contact Compel</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
