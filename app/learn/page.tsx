import { getAllArticles } from '@/lib/markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Learn | Coaching Funnel Guides & Marketing Resources — Compel',
  description:
    'Free guides on coaching funnels, lead generation, client acquisition, and performance marketing for executive, business, life, and career coaches.',
  alternates: {
    canonical: 'https://getcompel.co/learn',
  },
  openGraph: {
    title: 'Learn | Coaching Funnel Guides & Marketing Resources — Compel',
    description:
      'Free guides on coaching funnels, lead generation, client acquisition, and performance marketing for coaches.',
    url: 'https://getcompel.co/learn',
    type: 'website',
    images: [{ url: 'https://getcompel.co/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Funnel Guides & Resources — Compel',
    description:
      'Free guides on coaching funnels, lead generation, and performance marketing for coaches.',
    images: ['https://getcompel.co/twitter-image.png'],
  },
};

export default function LearnPage() {
  const articles = getAllArticles();

  // Sort by date descending
  const sortedArticles = [...articles].sort((a: any, b: any) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

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
        name: 'Learn',
        item: 'https://getcompel.co/learn',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
        ]} />

        <header className="mt-8 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Coaching Funnel Guides & Resources
          </h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-2xl">
            Actionable guides on building high-converting funnels, lowering your cost per acquisition, and scaling your coaching practice.
          </p>
        </header>

        {sortedArticles.length === 0 ? (
          <p className="text-gray-500 dark:text-zinc-400">No articles published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {sortedArticles.map((article: any) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="group block p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg transition-all duration-200"
              >
                <article>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {article.title}
                    </h2>
                    {article.date && (
                      <time
                        dateTime={article.date}
                        className="text-sm text-gray-400 dark:text-zinc-500 font-mono whitespace-nowrap"
                      >
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                  {article.excerpt && (
                    <p className="text-gray-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <span className="inline-block mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                    Read article →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
