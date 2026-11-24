/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  async headers() {
    const headers = [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
    ];
    return ['/watch/:path*', '/outreach/:path*', '/api/outreach/:path*'].map(source => ({ source, headers }));
  },
  async redirects() {
    return [
      // Legacy niche slug redirects (301 permanent)
      {
        source: '/coaches/biz',
        destination: '/coaches/business-coaching',
        permanent: true,
      },
      {
        source: '/coaches/career',
        destination: '/coaches/career-coaching',
        permanent: true,
      },
      {
        source: '/coaches/performance',
        destination: '/coaches/performance-coaching',
        permanent: true,
      },
      {
        source: '/coaches/life',
        destination: '/coaches/life-coaching',
        permanent: true,
      },
      {
        source: '/coaches/executive',
        destination: '/coaches/executive-coaching',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
