import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './studio.css';

const manrope = localFont({ src: './fonts/Manrope-Variable.ttf', variable: '--font-manrope', weight: '200 800', display: 'swap' });
const editorial = localFont({ src: './fonts/InstrumentSerif-Italic.ttf', variable: '--font-editorial', weight: '400', style: 'italic', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://getcompel.co'),
  title: 'Compel | A Conversion Studio for Established Coaches',
  description:
    'What helps an interested prospect take the next step? Clarity about your coaching, the conversation and what happens after they book. Explore the experience with Compel.',
  alternates: {
    canonical: 'https://getcompel.co/',
  },
  openGraph: {
    title: 'Compel | A Conversion Studio for Established Coaches',
    description:
      'Your reputation brings them here. Give them a clear way to book. A practical look at the steps between interest and a coaching conversation.',
    type: 'website',
    url: 'https://getcompel.co/',
    siteName: 'Compel',
    locale: 'en_US',
    images: [
      {
        url: 'https://getcompel.co/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Compel. From interest to conversation.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compel | A Conversion Studio for Established Coaches',
    description:
      'A clear coaching page, a straightforward booking process and useful follow-up emails, written and built around your business.',
    images: ['https://getcompel.co/opengraph-image'],
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
import { PublicSiteScripts } from '../components/PublicSiteScripts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-background text-text ${manrope.variable} ${editorial.variable} ${manrope.className}`}
      >
        <LeadCaptureProvider>
          <MotionProvider>
            <Navbar />
            {children}
          </MotionProvider>
          <LeadCaptureModal />
        </LeadCaptureProvider>

        <PublicSiteScripts />
      </body>
    </html>
  );
}
