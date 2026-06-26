"use client";

import { InvoiceMock } from './visuals/InvoiceMock';
import { Button } from './ui/Button';

interface HeroProps {
  niche?: string;
}

const NicheHero = ({ niche }: HeroProps) => {
  const formattedNiche = niche ? `${niche.charAt(0).toUpperCase() + niche.slice(1)} Coaches` : "Coaches";
  const badgeText = niche ? `Performance-Based Acquisition for ${formattedNiche}` : "Performance-Based Acquisition";
  
  return (
    <section className="relative pt-40 pb-24 px-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Overhead Badge */}
      <div className="mb-10 border border-neutral-800 bg-neutral-950/60 rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-sm shadow-sm">
        <span className="text-accent text-xs">✦</span>
        <span className="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase font-semibold">{badgeText}</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[84px] font-bold tracking-[-0.03em] leading-[1.05] text-center text-text max-w-5xl mb-6">
        Your calendar should be full.<br />
        <span className="text-neutral-300">If it&apos;s not, your lead generation funnel is <span className="font-serif italic font-extralight text-accent">broken</span>.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-neutral-400 max-w-3xl text-center mb-8 font-medium">
        We refuse 80% of applicants. We exclusively engineer high-speed funnels for {formattedNiche.toLowerCase()} with proven offers who can handle serious volume. If you want a pretty digital brochure, close this tab.
      </p>

      <Button size="lg" className="rounded-full font-bold text-lg px-10 mb-10" onClick={() => window.open('https://calendly.com/dellasaymen/discovery-call-revlane', '_blank')}>
        Book Your Free Action Plan
      </Button>

      {/* Sub-line */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-neutral-400 font-mono text-xs md:text-sm mb-20">
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;For {formattedNiche} /&gt;</span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;Done-For-You /&gt;</span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;$0 Retainer /&gt;</span>
      </div>

      {/* Hero Visual: Stripe Invoice Component Mock */}
      <div className="w-full max-w-4xl relative mt-8">
        {/* Subtle green radial glow */}
        <div className="absolute inset-0 bg-accent/15 blur-3xl rounded-full translate-y-8 pointer-events-none" />

        {/* Floating Metrics */}
        <div className="hidden md:flex absolute -left-12 top-20 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 rounded-xl p-4 flex-col gap-1 z-20 shadow-xl">
          <span className="text-neutral-400 text-xs font-mono">Conversion Rate</span>
          <span className="text-text font-bold text-xl">+14.2% <span className="text-accent text-sm">↑</span></span>
        </div>

        <div className="hidden md:flex absolute -right-8 bottom-32 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 rounded-xl p-4 flex-col gap-1 z-20 shadow-xl">
          <span className="text-neutral-400 text-xs font-mono">Cost Per Call</span>
          <span className="text-text font-bold text-xl">-$42.50 <span className="text-accent text-sm">↓</span></span>
        </div>

        <InvoiceMock />
      </div>
    </section>
  );
};

export default NicheHero;
