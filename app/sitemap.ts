import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/markdown';
import { getAllNiches } from '@/lib/niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const niches = getAllNiches();
  const articles = getAllArticles();

  const nicheUrls: MetadataRoute.Sitemap = niches.map((niche) => ({
    url: `https://getcompel.co/coaches/${niche}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `https://getcompel.co/learn/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://getcompel.co',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...nicheUrls,
    ...articleUrls,
  ];
}
