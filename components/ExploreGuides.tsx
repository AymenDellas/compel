import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

const selected = [
  'coaching-funnel-template',
  'coaching-lead-generation-strategies',
  'coaching-landing-page-best-practices',
];

export default function ExploreGuides() {
  const all = getAllArticles();
  const guides = selected.map(slug => all.find(article => article.slug === slug)).filter((article): article is (typeof all)[number] => Boolean(article));

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20" aria-labelledby="guides-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Learn the system</p>
          <h2 id="guides-heading" className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Guides for growing a coaching practice</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="/tools/coaching-funnel-calculator" className="text-sm font-semibold text-accent underline underline-offset-4">Try the free calculator →</Link>
          <Link href="/learn" className="text-sm font-semibold text-accent underline underline-offset-4">Explore all guides →</Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {guides.map(article => (
          <Link key={article.slug} href={`/learn/${article.slug}`} className="group rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 hover:border-accent/60">
            <h3 className="text-lg font-semibold text-white group-hover:text-accent">{article.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
