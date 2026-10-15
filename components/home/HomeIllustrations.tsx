import { ArrowDown, ArrowRight, Check, MessageSquare, MousePointer2, ScanLine, Target } from 'lucide-react';

export function TimelineVisual({ step }: { step: number }) {
  if (step === 0) return (
    <figure className="home-audit-visual" aria-label="Illustration of identifying friction in a booking flow">
      <div className="home-browser-bar" aria-hidden="true"><i /><i /><i /><span>Funnel audit</span><ScanLine size={15} /></div>
      <div className="home-audit-page" aria-hidden="true"><div className="home-wire-heading" /><div className="home-wire-line" /><div className="home-wire-line short" /><div className="home-audit-form"><span>Name</span><span>Email</span><span className="home-friction-field">One more required field…<MousePointer2 size={18} /></span></div><div className="home-audit-finding"><i />Booking friction identified</div></div>
      <figcaption>Illustration / find the friction</figcaption>
    </figure>
  );
  if (step === 1) return (
    <figure className="home-flow-visual" aria-label="Illustration of the connected funnel infrastructure">
      <div className="home-flow-node">Ad / organic traffic</div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node">Landing page</div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node home-flow-booking">Booking flow<Check size={16} aria-hidden="true" /></div><ArrowDown size={16} aria-hidden="true" />
      <div className="home-flow-node">Nurture sequence</div>
      <figcaption>Illustration / connect the journey</figcaption>
    </figure>
  );
  return (
    <figure className="home-window-visual" aria-label="The 30-day measurement window and agreed payment trigger">
      <div className="home-window-top"><Target size={17} aria-hidden="true" /><span>Measured against your baseline</span></div>
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
      <div className="home-contrast-half home-contrast-clutter"><span>More busywork</span><div className="home-clutter-nav" aria-hidden="true"><i /><i /><i /><i /></div><div className="home-clutter-body" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="home-clutter-buttons" aria-hidden="true"><i /><i /><i /></div></div>
      <div className="home-contrast-half home-contrast-focus"><span>One clear next step</span><div className="home-focus-heading" aria-hidden="true" /><div className="home-focus-copy" aria-hidden="true" /><div className="home-focus-copy short" aria-hidden="true" /><div className="home-focus-cta">Book a call<ArrowRight size={14} aria-hidden="true" /></div><MousePointer2 className="home-focus-pointer" size={22} aria-hidden="true" /></div>
      <figcaption>Illustration / focus on the booking</figcaption>
    </figure>
  );
}

export function DirectChannel() {
  return <div className="home-direct-channel"><span>You</span><span className="home-channel-link" aria-hidden="true"><i /><MessageSquare size={18} /><i /></span><span>Your funnel engineer</span></div>;
}
