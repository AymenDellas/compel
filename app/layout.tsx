import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { home } from '@/content/home';
import './globals.css';
import './studio.css';

const manrope = localFont({ src: './fonts/Manrope-Variable.ttf', variable: '--font-manrope', weight: '200 800', display: 'swap' });
const editorial = localFont({ src: './fonts/InstrumentSerif-Italic.ttf', variable: '--font-editorial', weight: '400', style: 'italic', display: 'swap' });

const title = 'Compel | Guaranteed More Booked Calls for Coaches';
const description = 'A client gives someone your name. Compel rebuilds the page they read, the calendar they book through, and the email that follows. Pay only if bookings increase under agreed terms.';

export const metadata: Metadata = {
  metadataBase: new URL('https://getcompel.co'),
  title,
  description,
  alternates: {
    canonical: 'https://getcompel.co/',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://getcompel.co/',
    siteName: 'Compel',
    locale: 'en_US',
    images: [
      {
        url: 'https://getcompel.co/opengraph-image',
        width: 1200,
        height: 630,
        alt: `Compel. ${home.hero.headline} ${home.hero.payment}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
