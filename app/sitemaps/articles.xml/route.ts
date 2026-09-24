import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/markdown';

export async function GET() {
  const articles = getAllArticles();
  
  const urls = articles.map(article => `
  <url>
    <loc>https://getcompel.co/learn/${article.slug}</loc>
    ${article.updated ? `<lastmod>${article.updated}</lastmod>` : ''}
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
