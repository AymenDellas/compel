import { getAllArticles, getArticleBySlug } from '@/lib/markdown';
import ArticleCTA from '@/components/ArticleCTA';
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

  return {
    title: article.title || 'Article',
    description: article.excerpt || article.description || '',
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

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article>
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {article.title}
          </h1>
          {article.date && (
            <time dateTime={article.date} className="text-lg text-gray-500 font-medium">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </header>

        <div 
          className="prose prose-lg prose-blue mx-auto text-gray-800 leading-relaxed mb-16"
          dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }} 
        />
      </article>

      <ArticleCTA />
    </main>
  );
}
