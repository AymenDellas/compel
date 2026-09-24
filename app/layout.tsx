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
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script id="microsoft-clarity" strategy="beforeInteractive" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ymtpyq0lb1");
          `}
        </Script>
      </head>
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

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-T46JFTGK75" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T46JFTGK75');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://getcompel.co/#organization",
              "name": "Compel",
              "url": "https://getcompel.co",
              "logo": "https://getcompel.co/brand/compel-logo-primary.svg",
              "description": "Performance-based funnel agency for coaches. We build high-converting funnels — you only pay when your discovery calls increase.",
              "image": "https://getcompel.co/og-image.png",
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
                "email": "aymen@getcompel.co"
              },
              "founder": { "@type": "Person", "name": "Aymen Dellas", "url": "https://getcompel.co/about" }
            })
          }}
        />
      </body>
    </html>
  );
}
