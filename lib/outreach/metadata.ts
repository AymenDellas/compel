import type { Metadata } from 'next';

export const privateMetadata = {
  description: null,
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
  alternates: { canonical: null },
  openGraph: { images: [] },
  twitter: { card: 'summary', images: [] },
  referrer: 'no-referrer',
} satisfies Metadata;
