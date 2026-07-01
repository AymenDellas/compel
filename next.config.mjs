/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
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
