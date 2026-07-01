import { getAllArticles, getArticleBySlug } from '@/lib/markdown';
import ArticleCTA from '@/components/ArticleCTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  let article;
  try {
    article = await getArticleBySlug(resolvedParams.slug);
  } catch (error) {
    return { title: 'Not Found' };
  }

  if (!article) {
    return { title: 'Not Found' };
  }

  const title = article.title || 'Article';
  const description = article.excerpt || article.description || '';

  return {
    title: `${title} | Compel`,
    description,
    alternates: {
      canonical: `https://getcompel.co/learn/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://getcompel.co/learn/${resolvedParams.slug}`,
      publishedTime: article.date,
      authors: ['Compel'],
      images: [{ url: 'https://getcompel.co/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://getcompel.co/twitter-image.png'],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  let article;
  try {
    article = await getArticleBySlug(resolvedParams.slug);
  } catch (error) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  // Get related articles for internal linking
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a: any) => a.slug !== resolvedParams.slug)
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Aymen Dellas',
      url: 'https://getcompel.co/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Compel',
      url: 'https://getcompel.co',
      logo: {
        '@type': 'ImageObject',
        url: 'https://getcompel.co/brand/compel-logo-primary.svg',
      },
    },
    description: article.excerpt || article.description || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://getcompel.co/learn/${resolvedParams.slug}`,
    },
    image: 'https://getcompel.co/og-image.png',
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://getcompel.co/learn/${resolvedParams.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Learn', href: '/learn' },
          { label: article.title || 'Article' },
        ]} />

        <article className="mt-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              {article.title}
            </h1>
            {article.date && (
              <time dateTime={article.date} className="text-lg text-gray-500 dark:text-zinc-400 font-medium">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>

          <div 
            className="prose prose-lg prose-blue dark:prose-invert mx-auto text-gray-800 dark:text-zinc-200 leading-relaxed mb-16"
            dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }} 
          />
        </article>

        {/* Related Articles — Internal Linking */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => (
                <a
                  key={related.slug}
                  href={`/learn/${related.slug}`}
                  className="group block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2">
                    {related.excerpt || ''}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        <ArticleCTA />
      </main>

      <Footer />
    </div>
  );
}
