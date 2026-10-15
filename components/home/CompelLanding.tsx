'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Search, X } from 'lucide-react';
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
            <stop stopColor="#c8f135" stopOpacity="0" />
            <stop offset=".5" stopColor="#d7ed9e" stopOpacity=".12" />
            <stop offset=".8" stopColor="#d7ed9e" stopOpacity=".03" />
            <stop offset="1" stopColor="#c8f135" stopOpacity="0" />
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
          <path d="M70 0 1320 1000M780 0 1600 660" stroke="#d1e9a1" strokeOpacity=".08" />
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
        <span className="home-brandline"><i aria-hidden="true" />Performance-Based Acquisition</span>
      </header>

      <main id="compel-main">
        <section className="home-hero home-wide" aria-labelledby="home-headline">
          <div className="home-hero-copy">
          <p className="home-eyebrow">For Coaches <span aria-hidden="true">/</span> Done-For-You <span aria-hidden="true">/</span> Pay On Results</p>
          <h1 id="home-headline"><span>Funnels for Coaches</span>{' '}<span>That Book More</span>{' '}<span className="home-highlight">Discovery Calls</span></h1>
          <p className="home-hero-description">You&apos;re a coach who wants to <strong>grow your business</strong> and <strong>help more clients</strong>, but you&apos;re struggling to <strong>fill your calendar</strong> with booked discovery calls. We&apos;ll build and install a complete funnel that <strong>increases your booked calls</strong>, and you pay <strong>zero upfront</strong>.</p>
          <CallButton onClick={openModal} />
          </div>
          <aside className="home-arrangement" aria-labelledby="arrangement-heading">
          <div className="home-arrangement-amount"><h2 id="arrangement-heading" className="home-label">The arrangement</h2><p><span>$0</span><em>upfront</em></p></div>
          <div className="home-arrangement-terms"><p className="home-arrangement-promise">You pay when we reach the agreed increase in discovery calls.</p><p>We agree on your baseline and target before the build starts.</p></div>
          </aside>
        </section>

        <section className="home-fit home-spine home-section" aria-labelledby="fit-heading">
          <div className="home-section-heading"><p className="home-label">The fit</p><h2 id="fit-heading">This is for you <span className="home-highlight">IF...</span></h2></div>
          <ul className="home-profile-list">
            {targetProfiles.map(profile => (
              <li key={profile.specificity}><Check size={20} strokeWidth={1.5} aria-hidden="true" /><div><h3>{profile.specificity}</h3><p>{profile.quote}</p></div></li>
            ))}
          </ul>
          <div className="home-not-fit">
            <h3>If any of these apply, <span>please close this tab.</span></h3>
            <ul>{filterProfiles.map(profile => (
              <li key={profile.title}><X size={17} strokeWidth={1.5} aria-hidden="true" /><div><h4>{profile.title}</h4><p>{profile.description}</p></div></li>
            ))}</ul>
          </div>
          <CallButton onClick={openModal} />
        </section>

        <section className="home-process home-spine home-section" aria-labelledby="process-heading">
          <div className="home-section-heading"><p className="home-label">From audit to outcome</p><h2 id="process-heading">The Execution Timeline</h2><p>Systematic execution. No guessing.</p></div>
          <ol className="home-timeline">{timelineSteps.map((step, index) => (
            <li key={step.id}><div className="home-step-copy"><span className="home-step-number" aria-hidden="true">{step.id}</span><h3>{step.title}</h3><p>{step.description}</p></div><TimelineVisual step={index} /></li>
          ))}</ol>
          <div className="home-delivery-line" aria-label="Funnel components"><span>Landing page</span><ArrowRight aria-hidden="true" size={18} /><span>Booking flow</span><ArrowRight aria-hidden="true" size={18} /><span>Nurture sequence</span></div>
        </section>

        <section className="home-guarantee home-spine home-section" aria-labelledby="guarantee-heading">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Service', name: 'The Unconditional Escrow',
            provider: { '@type': 'Organization', name: 'Compel' },
            description: "If your discovery calls don't increase, our invoice is shredded. We rebuild your funnel and take 100% of the financial downside.",
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: '$0 upfront, 30-day window, 100% financial downside covered.' },
          }) }} />
          <div className="home-section-heading"><p className="home-label">Our skin in the game</p><h2 id="guarantee-heading">The Unconditional Escrow</h2></div>
          <blockquote className="home-guarantee-copy">&ldquo;We can only offer this because we brutally filter out weak businesses. We do not ask for a 3-month commitment. If you pass our initial audit, we rebuild your funnel and take 100% of the financial downside. <strong>If your discovery calls don&apos;t increase, our invoice is shredded.</strong>&rdquo;</blockquote>
          <div className="home-comparison">
            <div><h3>Standard Agencies</h3><ul><li><X size={17} aria-hidden="true" />$5,000 upfront</li><li><X size={17} aria-hidden="true" />3-month lock-in</li><li><X size={17} aria-hidden="true" />They blame the &ldquo;algorithm&rdquo; if it fails.</li></ul></div>
            <div className="home-comparison-compel"><h3><CompelLogo width={118} /></h3><ul><li><Check size={18} aria-hidden="true" />$0 upfront</li><li><Check size={18} aria-hidden="true" />30-day window</li><li><Check size={18} aria-hidden="true" />We take 100% of the financial downside.</li></ul></div>
          </div>
          <CallButton onClick={openModal} />
        </section>

        <section className="home-difference home-spine home-section" aria-labelledby="difference-heading">
          <div className="home-section-heading"><p className="home-label">Built around the outcome</p><h2 id="difference-heading">The Anti-Agency</h2></div>
          <div className="home-agency-feature"><h3>If you want to debate color palettes on weekly Zoom calls, hire a traditional agency.<span>We are a math problem.</span></h3><AgencyContrast /></div>
          <div className="home-principles">
            <div><h3>Zero Account Managers.</h3><p>You don&apos;t get handed off to a 23-year-old &apos;Client Success Lead&apos; who reads off a script. You interface directly with the engineers building your pipeline.</p><DirectChannel /><span className="home-principle-note">Direct Comm Channel</span></div>
            <div><h3>Obsessive Telemetry.</h3><div className="home-telemetry-panel"><div className="home-telemetry-label"><span>Conversion journey</span><span>Event</span></div><ol className="home-events" aria-label="Conversion journey"><li><i aria-hidden="true" />Page visit<span>01</span></li><li><i aria-hidden="true" />Call request<span>02</span></li><li><i aria-hidden="true" />Call booked<span>03</span></li></ol></div><span className="home-principle-note">Data-Driven Iteration</span></div>
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
          <div className="home-closing-light" aria-hidden="true" />
          <p className="home-label">Next step</p>
          <h2 id="closing-heading">You&apos;ve read the page.<br />You know if this is <span>for you.</span></h2>
          <CallButton onClick={openModal} />
          <p className="home-closing-note">$0 upfront <span aria-hidden="true">·</span> takes 30 seconds</p>
        </section>
      </main>
    </div>
  );
}
