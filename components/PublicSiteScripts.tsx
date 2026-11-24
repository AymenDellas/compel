"use client";
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { isPrivateSitePath } from '@/lib/private-site-path';
export function PublicSiteScripts() {
  const pathname = usePathname();
  if (isPrivateSitePath(pathname)) return null;
  return <>
        <Script id="microsoft-clarity" strategy="afterInteractive" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ymtpyq0lb1");
          `}
        </Script>
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
              "logo": "https://getcompel.co/brand/compel-logo.png",
              "description": "A conversion-focused digital studio for established executive, leadership and business coaches. We connect landing pages, booking journeys and follow-up.",
              "image": "https://getcompel.co/opengraph-image",
              "knowsAbout": [
                "coaching funnels",
                "coaching consultation journeys",
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
  </>;
}
