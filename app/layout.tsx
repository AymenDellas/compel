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
  title: 'Compel | Performance-Based Acquisition for Coaches',
  description:
    'Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.',
  alternates: {
    canonical: 'https://getcompel.co/',
  },
  openGraph: {
    title: 'Compel | Performance-Based Acquisition for Coaches',
    description:
      'Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.',
    type: 'website',
    url: 'https://getcompel.co/',
    images: [
      {
        url: 'https://getcompel.co/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compel | Performance-Based Acquisition for Coaches',
    description:
      'Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.',
    images: ['https://getcompel.co/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

import { MotionProvider } from '../components/MotionProvider';
import { Navbar } from '../components/Navbar';

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
        <MotionProvider>
          <Navbar />
          {children}
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Compel",
              "url": "https://getcompel.co",
              "description": "Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.",
              "priceRange": "$0",
              "image": "https://getcompel.co/og-image.jpg",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "$0 upfront, 30-day window, 100% financial downside covered."
              }
            })
          }}
        />
      </body>
    </html>
  );
}
