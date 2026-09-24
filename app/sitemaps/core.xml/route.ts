import { NextResponse } from 'next/server';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://getcompel.co/</loc>
  </url>
  <url>
    <loc>https://getcompel.co/about</loc>
  </url>
  <url>
    <loc>https://getcompel.co/learn</loc>
  </url>
  <url>
    <loc>https://getcompel.co/tools/coaching-funnel-calculator</loc>
  </url>
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
