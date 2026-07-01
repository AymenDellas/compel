import { NextResponse } from 'next/server';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://getcompel.co/sitemaps/core.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://getcompel.co/sitemaps/articles.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://getcompel.co/sitemaps/niches.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
