import { ArrowDown } from 'lucide-react';

export function TimelineVisual({ step }: { step: number }) {
  if (step === 0) return (
    <figure className="home-audit-visual" aria-label="Illustration of identifying friction in a booking flow">
      <div className="home-browser-bar" aria-hidden="true"><i /><i /><i /><span>Booking form review</span></div>
      <div className="home-audit-page" aria-hidden="true"><div className="home-wire-heading" /><div className="home-wire-line" /><div className="home-wire-line short" /><div className="home-audit-form"><span>Name</span><span>Email</span><span className="home-friction-field">Another required question...</span></div><div className="home-audit-finding">Does this question need to come before the call?</div></div>
      <figcaption>Illustration / review the booking form</figcaption>
    </figure>
  );
  if (step === 1) return (
    <figure className="home-flow-visual" aria-label="Illustration of the page, booking and follow-up sequence">
      <div className="home-flow-node">Your existing traffic</div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node">Landing page</div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node home-flow-booking">Booking flow</div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node">Follow-up emails</div>
      <figcaption>Illustration / connect the booking steps</figcaption>
    </figure>
  );
  return (
    <figure className="home-window-visual" aria-label="The 30-day measurement window and agreed payment trigger">
      <div className="home-window-top"><span>Measured against your current bookings</span></div>
      <p className="home-window-number">30<span>days</span></p>
      <div className="home-window-rule" aria-hidden="true">{Array.from({ length: 31 }, (_, index) => <i key={index} />)}</div>
      <div className="home-window-ends"><span>Launch</span><span>Review the result</span></div>
      <figcaption>Payment follows the agreed increase.</figcaption>
    </figure>
  );
}

export function AgencyContrast() {
  return (
    <figure className="home-agency-contrast" aria-label="Illustration comparing visual clutter with a focused path to booking">
      <div className="home-contrast-half home-contrast-clutter"><span>Competing next steps</span><div className="home-clutter-nav" aria-hidden="true"><i /><i /><i /><i /></div><div className="home-clutter-body" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="home-clutter-buttons" aria-hidden="true"><i /><i /><i /></div></div>
      <div className="home-contrast-half home-contrast-focus"><span>One booking action</span><div className="home-focus-heading" aria-hidden="true" /><div className="home-focus-copy" aria-hidden="true" /><div className="home-focus-copy short" aria-hidden="true" /><div className="home-focus-cta">Book a call</div></div>
      <figcaption>Illustration / focus on the booking</figcaption>
    </figure>
  );
}

export function DirectChannel() {
  return <div className="home-direct-channel"><span>You</span><span className="home-channel-link" aria-hidden="true"><i /></span><span>Your funnel builder</span></div>;
}
