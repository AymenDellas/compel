import { NextResponse } from 'next/server';
import { getAllNiches } from '@/lib/niches';

export async function GET() {
  const niches = getAllNiches();
  
  const urls = niches.map(nicheSlug => `
  <url>
    <loc>https://getcompel.co/coaches/${nicheSlug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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
