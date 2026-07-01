import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Aymen Dellas | Compel',
  description: 'Learn more about Aymen Dellas, founder of Compel and SEO Expert.',
  alternates: {
    canonical: 'https://getcompel.co/about',
  },
};

export default function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aymen Dellas',
    url: 'https://getcompel.co/about',
    jobTitle: 'CEO & SEO Expert',
    worksFor: {
      '@type': 'Organization',
      name: 'Compel',
    },
    sameAs: [
      'https://linkedin.com/in/aymendellas',
      'https://twitter.com/aymendellas',
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="flex-grow max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              About Aymen Dellas
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl">
              Founder & CEO of Compel. Passionate about creating software that works harder, faster, and smarter.
            </p>
          </header>

          <div className="prose prose-lg prose-blue dark:prose-invert max-w-none text-gray-800 dark:text-zinc-300 space-y-6">
            <p>
              Hi, I'm Aymen. I've spent years deep-diving into software engineering and SEO, aiming to build 
              tools that empower businesses to grow organically and effortlessly.
            </p>
            <p>
              At Compel, our mission is to redefine how growth happens. I lead our strategy and operations, 
              focusing on delivering a frictionless experience to our users. Whether it's crafting high-quality 
              code or shaping marketing narratives, I believe in bridging the gap between technical excellence 
              and business value.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Connect with me</h2>
            <ul className="flex flex-wrap gap-4 list-none p-0">
              <li>
                <a 
                  href="https://twitter.com/aymendellas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm text-decoration-none"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/aymendellas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm text-decoration-none"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
