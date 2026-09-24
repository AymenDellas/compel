import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule Your Call | Compel',
  alternates: { canonical: 'https://getcompel.co/thank-you' },
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
