'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { faqs, filterProfiles, targetProfiles, timelineSteps } from '../../data/content';
import { useLeadCapture } from '../LeadCaptureProvider';
import CompelLogo from '../CompelLogo';
import { AgencyContrast, DirectChannel, TimelineVisual } from './HomeIllustrations';

/*
 * Compel: a continuous ink canvas, lime signal light, diagonal architectural
 * flutes and a hero paired with the payment arrangement. A common content spine
 * anchors the illustrated process and anti-agency panels.
 * Mobile becomes a single left-aligned flow. No fabricated dashboards or metrics.
 */
function SignalLight() {
  return (
    <div className="compel-signal" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" fill="none" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="compel-flute" x1="0" y1="0" x2="42" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#dce2df" stopOpacity="0" />
            <stop offset=".5" stopColor="#dce2df" stopOpacity=".09" />
            <stop offset=".8" stopColor="#dce2df" stopOpacity=".02" />
            <stop offset="1" stopColor="#dce2df" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="compel-light-mask">
            <stop stopColor="white" />
            <stop offset=".5" stopColor="white" stopOpacity=".65" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="compel-light-fade"><ellipse cx="1110" cy="125" rx="900" ry="730" fill="url(#compel-light-mask)" /></mask>
        </defs>
        <g mask="url(#compel-light-fade)">
          <g transform="translate(1090 -580) rotate(34)">
            {Array.from({ length: 31 }, (_, index) => (
              <rect key={index} width="42" height="1600" fill="url(#compel-flute)" transform={`translate(${index * 42 - 640} 0)`} />
            ))}
          </g>
          <path d="M70 0 1320 1000M780 0 1600 660" stroke="#dce2df" strokeOpacity=".06" />
        </g>
      </svg>
    </div>
  );
}

function CallButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="home-button" onClick={onClick}>
      <span>Book Your Free Discovery Call</span>
      <ArrowRight size={19} strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}

export default function CompelLanding() {
  const { openModal } = useLeadCapture();
  const [search, setSearch] = useState('');
  const term = search.trim().toLowerCase();
  const filteredFaqs = faqs.filter(faq =>
    `${faq.q} ${faq.a} ${faq.keywords.join(' ')}`.toLowerCase().includes(term)
  );

  return (
    <div className="compel-home">
      <a className="home-skip" href="#compel-main">Skip to main content</a>
      <SignalLight />
      <header className="home-brandbar home-wide">
        <Link href="/" aria-label="Compel home"><CompelLogo width={154} /></Link>
        <span className="home-brandline">Landing pages / Booking / Follow-up</span>
      </header>

      <main id="compel-main">
        <section className="home-hero home-wide" aria-labelledby="home-headline">
          <div className="home-hero-copy">
          <p className="home-eyebrow">For Coaches <span aria-hidden="true">/</span> Done-For-You <span aria-hidden="true">/</span> Pay On Results</p>
          <h1 id="home-headline"><span>Funnels for Coaches</span>{' '}<span>That Book More</span>{' '}<span className="home-highlight">Discovery Calls</span></h1>
          <p className="home-hero-description">You have a coaching offer and people interested in it. We build your <strong>landing page, booking flow and follow-up emails</strong> to help more of those people book a discovery call. <strong>You pay when we reach the agreed increase.</strong></p>
          <CallButton onClick={openModal} />
          </div>
          <aside className="home-arrangement" aria-labelledby="arrangement-heading">
          <div className="home-arrangement-amount"><h2 id="arrangement-heading" className="home-label">The arrangement</h2><p><span>$0</span><em>upfront</em></p></div>
          <div className="home-arrangement-terms"><p className="home-arrangement-promise">You pay when we reach the agreed increase in discovery calls.</p><p>We agree on your baseline and target before the build starts.</p></div>
          </aside>
        </section>

        <section className="home-fit home-spine home-section" aria-labelledby="fit-heading">
          <div className="home-section-heading"><p className="home-label">The fit</p><h2 id="fit-heading">When we can help</h2></div>
          <ul className="home-profile-list">
            {targetProfiles.map(profile => (
              <li key={profile.specificity}><div><h3>{profile.specificity}</h3><p>{profile.quote}</p></div></li>
            ))}
          </ul>
          <div className="home-not-fit">
            <h3>When this work <span>isn&apos;t the right fit</span></h3>
            <ul>{filterProfiles.map(profile => (
              <li key={profile.title}><div><h4>{profile.title}</h4><p>{profile.description}</p></div></li>
            ))}</ul>
          </div>
          <CallButton onClick={openModal} />
        </section>

        <section className="home-process home-spine home-section" aria-labelledby="process-heading">
          <div className="home-section-heading"><p className="home-label">The work</p><h2 id="process-heading">The Execution Timeline</h2><p>Agree on the target. Build the funnel. Measure the change in booked calls.</p></div>
          <ol className="home-timeline">{timelineSteps.map((step, index) => (
            <li key={step.id}><div className="home-step-copy"><span className="home-step-number" aria-hidden="true">{step.id}</span><h3>{step.title}</h3><p>{step.description}</p></div><TimelineVisual step={index} /></li>
          ))}</ol>
          <div className="home-delivery-line" aria-label="Funnel components"><span>Landing page</span><ArrowRight aria-hidden="true" size={18} /><span>Booking flow</span><ArrowRight aria-hidden="true" size={18} /><span>Nurture sequence</span></div>
        </section>

        <section className="home-guarantee home-spine home-section" aria-labelledby="guarantee-heading">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Service', name: 'Compel performance-based funnel build',
            provider: { '@type': 'Organization', name: 'Compel' },
            description: 'We build your landing page, booking flow and follow-up emails. Payment depends on reaching the agreed increase in discovery calls.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: '$0 upfront. Payment follows the agreed increase in discovery calls during the 30-day measurement window.' },
          }) }} />
          <div className="home-section-heading"><p className="home-label">The agreement</p><h2 id="guarantee-heading">How payment works</h2></div>
          <p className="home-guarantee-copy">Before the build, we agree on your current bookings and the increase we&apos;re working toward. You pay nothing upfront. We measure the results over 30 days after launch. <strong>If we don&apos;t reach the agreed target, you don&apos;t pay our fee.</strong></p>
          <div className="home-comparison">
            <div><h3>Agreed before we build</h3><ul><li>Your current discovery-call bookings</li><li>The increase that triggers payment</li><li>How bookings will be measured</li></ul></div>
            <div className="home-comparison-compel"><h3><CompelLogo width={118} /></h3><ul><li>$0 upfront</li><li>A 30-day measurement window</li><li>No fee if the agreed target isn&apos;t reached</li></ul></div>
          </div>
          <CallButton onClick={openModal} />
        </section>

        <section className="home-difference home-spine home-section" aria-labelledby="difference-heading">
          <div className="home-section-heading"><p className="home-label">How we work</p><h2 id="difference-heading">The Anti-Agency</h2></div>
          <div className="home-agency-feature"><h3>The page is only part of the job.<span>We build the steps around the booking.</span></h3><AgencyContrast /></div>
          <div className="home-principles">
            <div><h3>Talk to the person building it.</h3><p>Your questions and feedback go directly to the person working on your funnel. You don&apos;t have to relay them through an account manager.</p><DirectChannel /></div>
            <div><h3>See where bookings drop off.</h3><p>We track page visits, call requests and booked calls to see which step needs attention.</p><div className="home-telemetry-panel"><div className="home-telemetry-label"><span>What we measure</span><span>Step</span></div><ol className="home-events" aria-label="Booking steps measured"><li>Page visit<span>01</span></li><li>Call request<span>02</span></li><li>Call booked<span>03</span></li></ol></div></div>
          </div>
        </section>

        <section className="home-faq home-spine home-section" aria-labelledby="faq-heading">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
          }) }} />
          <div className="home-section-heading"><p className="home-label">Before we talk</p><h2 id="faq-heading">Frequently Asked Questions</h2></div>
          <div className="home-faq-search"><Search size={17} aria-hidden="true" /><input type="search" aria-label="Search FAQs" placeholder="Search questions..." value={search} onChange={event => setSearch(event.target.value)} /></div>
          <div className="home-faq-list" aria-live="polite">
            {filteredFaqs.map(faq => <details key={faq.q}><summary>{faq.q}<span aria-hidden="true" /></summary><p>{faq.a}</p></details>)}
            {filteredFaqs.length === 0 && <div className="home-faq-empty"><p>No matching queries found.</p><button type="button" onClick={() => setSearch('')}>Clear search <ArrowRight size={15} aria-hidden="true" /></button></div>}
          </div>
        </section>

        <section className="home-closing home-wide" id="cta-section" aria-labelledby="closing-heading">
          <p className="home-label">Next step</p>
          <h2 id="closing-heading">Let&apos;s look at what&apos;s stopping your next booking.</h2>
          <CallButton onClick={openModal} />
          <p className="home-closing-note">Start with a free discovery call.</p>
        </section>
      </main>
    </div>
  );
}
