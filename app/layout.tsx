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
    canonical: 'https://compel.co/',
  },
  openGraph: {
    title: 'Compel | Performance-Based Acquisition for Coaches',
    description:
      'Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.',
    type: 'website',
    url: 'https://compel.co/',
    images: [
      {
        url: 'https://compel.co/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compel | Performance-Based Acquisition for Coaches',
    description:
      'Performance-Based Acquisition for Coaches. Scale your coaching business with guaranteed results.',
    images: ['https://compel.co/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

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
        {children}
      </body>
    </html>
  );
}
