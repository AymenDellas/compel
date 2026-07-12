import type { Metadata } from 'next';
import { Outfit, Fira_Code } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://getcompel.co'),
  title: 'Compel | Performance-Based Funnels for Coaches — $0 Upfront',
  description:
    'We build high-converting funnels for executive, business, life, and career coaches. $0 upfront — pay only when your discovery calls increase.',
  alternates: {
    canonical: 'https://getcompel.co/',
    languages: {
      'en-US': 'https://getcompel.co/',
      'en-GB': 'https://getcompel.co/',
      'en-CA': 'https://getcompel.co/',
    },
  },
  openGraph: {
    title: 'Compel | Performance-Based Funnels for Coaches — $0 Upfront',
    description:
      'We build high-converting funnels for executive, business, life, and career coaches. $0 upfront — pay only when your discovery calls increase.',
    type: 'website',
    url: 'https://getcompel.co/',
    siteName: 'Compel',
    locale: 'en_US',
    images: [
      {
        url: 'https://getcompel.co/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compel — Performance-Based Funnels for Coaches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compel | Performance-Based Funnels for Coaches — $0 Upfront',
    description:
      'We build high-converting funnels for coaches. $0 upfront — pay only when your discovery calls increase.',
    images: ['https://getcompel.co/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { MotionProvider } from '../components/MotionProvider';
import { Navbar } from '../components/Navbar';
import { LeadCaptureProvider } from '../components/LeadCaptureProvider';
import { LeadCaptureModal } from '../components/LeadCaptureModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-background text-text ${outfit.variable} ${firaCode.variable} ${outfit.className}`}
      >
        <LeadCaptureProvider>
          <MotionProvider>
            <Navbar />
            {children}
          </MotionProvider>
          <LeadCaptureModal />
        </LeadCaptureProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Compel",
              "url": "https://getcompel.co",
              "logo": "https://getcompel.co/brand/compel-logo-primary.svg",
              "description": "Performance-based funnel agency for coaches. We build high-converting funnels — you only pay when your discovery calls increase.",
              "priceRange": "$0 upfront",
              "image": "https://getcompel.co/og-image.png",
              "areaServed": ["US", "GB", "CA"],
              "serviceType": "Performance-Based Funnel Building for Coaches",
              "knowsAbout": [
                "coaching funnels",
                "lead generation for coaches",
                "conversion optimization",
                "landing page design",
                "email nurture sequences",
                "discovery call booking systems"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "sales",
                "url": "https://calendly.com/dellasaymen/discovery-call-compel"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "$0 upfront, 30-day performance window, 100% financial downside covered. Pay only if discovery calls increase."
              }
            })
          }}
        />
      </body>
    </html>
  );
}
