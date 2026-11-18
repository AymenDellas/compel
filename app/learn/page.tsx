import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'The Journal | Coaching Conversion Guides | Compel',
  description: 'Practical thinking about coaching offers, landing pages, booking journeys and relevant follow-up.',
  alternates: { canonical: 'https://getcompel.co/learn' },
  openGraph: {
    title: 'The Journal | Compel',
    description: 'Practical thinking about the experience between interest and a coaching conversation.',
    url: 'https://getcompel.co/learn',
    type: 'website',
    images: [{ url: 'https://getcompel.co/opengraph-image' }],
  },
};

const startingPoints = [
  'coaching-funnel-template',
  'coaching-booking-page-best-practices',
  'coaching-landing-page-best-practices',
  'coaching-discovery-call-script',
];

export default function LearnPage() {
  const articles = getAllArticles().sort((a, b) =>
    (b.date || '').localeCompare(a.date || '') || (a.title || '').localeCompare(b.title || '')
  );
  const featured = startingPoints
    .map(slug => articles.find(article => article.slug === slug))
    .filter((article): article is (typeof articles)[number] => Boolean(article));

  const collections = [
    { title: 'Business coaching', prefix: 'business-coaching-' },
    { title: 'Career coaching', prefix: 'career-coaching-' },
    { title: 'Executive coaching', prefix: 'executive-coaching-' },
    { title: 'Life coaching', prefix: 'life-coaching-' },
    { title: 'Performance coaching', prefix: 'performance-coaching-' },
  ];
  const general = articles.filter(article => !collections.some(group => article.slug.startsWith(group.prefix)));

  return (
    <div className="public-page">
      <main id="main-content" className="studio-wrap public-content">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-accent">Home</Link> <span aria-hidden="true">/</span> Learn
        </nav>
        <header className="public-intro">
          <p className="small-label">The journal</p>
          <h1>Thoughtful work starts<br /><em>with better questions.</em></h1>
          <p>
            Ideas on clearer coaching offers, considered booking experiences and the details that help interest become a conversation.
          </p>
        </header>

        <Link href="/tools/coaching-funnel-calculator" className="mb-16 block rounded-2xl border border-accent/40 bg-accent/10 p-6 transition-colors hover:border-accent sm:p-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Free interactive tool</span>
          <h2 className="mt-3 text-2xl font-semibold">Find the leaks in your coaching funnel</h2>
          <p className="mt-3 max-w-2xl text-neutral-300">Enter your own visitor, lead, and booking numbers to calculate each conversion rate and see where to investigate next.</p>
          <span className="mt-4 inline-block font-semibold text-accent">Use the funnel calculator →</span>
        </Link>

        <section aria-labelledby="start-here" className="mb-20">
          <h2 id="start-here" className="mb-6 text-2xl font-semibold">Start here</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map(article => (
              <Link key={article.slug} href={`/learn/${article.slug}`} className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-6 transition-colors hover:border-accent/60">
                <h3 className="text-lg font-semibold group-hover:text-accent">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{article.excerpt}</p>
                <span className="mt-5 inline-block text-sm font-medium text-accent">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="all-guides">
          <h2 id="all-guides" className="mb-3 text-2xl font-semibold">All guides</h2>
          <p className="mb-8 text-neutral-400">Browse by coaching niche or explore the full funnel library.</p>
          {collections.map(group => {
            const entries = articles.filter(article => article.slug.startsWith(group.prefix));
            if (!entries.length) return null;
            return (
              <div key={group.prefix} className="mb-10">
                <h3 className="mb-4 text-lg font-semibold text-accent">{group.title}</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {entries.map(article => <li key={article.slug}><Link className="text-neutral-200 underline decoration-neutral-700 underline-offset-4 hover:text-accent" href={`/learn/${article.slug}`}>{article.title}</Link></li>)}
                </ul>
              </div>
            );
          })}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-accent">Funnels, conversion, and growth</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {general.map(article => <li key={article.slug}><Link className="text-neutral-200 underline decoration-neutral-700 underline-offset-4 hover:text-accent" href={`/learn/${article.slug}`}>{article.title}</Link></li>)}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
