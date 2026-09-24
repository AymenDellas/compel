import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import FunnelCalculator from '@/components/FunnelCalculator';

export const metadata: Metadata = {
  title: 'Free Coaching Funnel Conversion Calculator | Compel',
  description: 'Calculate visitor-to-lead, lead-to-booking, show-up, and client conversion rates from your own coaching funnel numbers.',
  alternates: { canonical: 'https://getcompel.co/tools/coaching-funnel-calculator' },
  openGraph: {
    title: 'Free Coaching Funnel Conversion Calculator | Compel',
    description: 'See where prospects move forward or drop out of your coaching funnel using your own numbers.',
    url: 'https://getcompel.co/tools/coaching-funnel-calculator',
    type: 'website',
    images: [{ url: 'https://getcompel.co/og-image.png' }],
  },
};

export default function CoachingFunnelCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-accent">Home</Link> <span aria-hidden="true">/</span> <Link href="/learn" className="hover:text-accent">Learn</Link> <span aria-hidden="true">/</span> Funnel calculator
        </nav>
        <header className="mb-12 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">Free tool for coaches</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Coaching funnel conversion calculator</h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">Enter your real visitor, lead, booking, attendance, and client counts. See the conversion rate at each step without relying on a generic industry benchmark.</p>
        </header>
        <FunnelCalculator />

        <section className="mt-20 max-w-4xl" aria-labelledby="how-to-read">
          <h2 id="how-to-read" className="text-2xl font-semibold">How to read the numbers</h2>
          <div className="mt-6 space-y-5 leading-relaxed text-neutral-300">
            <p>Each rate is the next stage divided by the previous stage. For example, if 20 of 100 leads book a call, your lead-to-booking rate is 20%. Use counts from the same month and the same traffic source.</p>
            <p>A lower rate does not automatically mean that step is broken. Look at lead quality, offer fit, traffic source, and the size of your sample. Compare against your own history before changing a page or email sequence.</p>
            <p>If bookings lag behind leads, inspect the invitation and scheduling flow. If many booked calls are missed, inspect confirmation and reminders. If attended calls rarely become clients, review qualification and the offer itself.</p>
          </div>
          <h2 className="mt-12 text-2xl font-semibold">Learn what to improve next</h2>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-neutral-300">
            <li><Link className="text-accent underline underline-offset-4" href="/learn/coaching-funnel-template">Map the four stages of a coaching funnel</Link></li>
            <li><Link className="text-accent underline underline-offset-4" href="/learn/coaching-booking-page-best-practices">Reduce booking page friction</Link></li>
            <li><Link className="text-accent underline underline-offset-4" href="/learn/coaching-website-conversion-rate">Understand coaching website conversion rates</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
