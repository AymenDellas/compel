"use client";

import { InvoiceMock } from './visuals/InvoiceMock';
import { Button } from './ui/Button';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 px-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Overhead Badge */}
      <div className="mb-10 border border-neutral-800 bg-neutral-950/60 rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-sm shadow-sm">
        <span className="text-accent text-xs">✦</span>
        <span className="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase font-semibold">Performance-Based Acquisition</span>
      </div>

      {/* SEO-Optimized H1 */}
      <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[84px] font-bold tracking-[-0.03em] leading-[1.05] text-center text-text max-w-5xl mb-6">
        We Build High-Converting Funnels for Coaches<br />
        <span className="text-neutral-300"><span className="font-serif italic font-extralight text-accent">$0 Upfront</span> — Pay Only When You Win</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-neutral-400 max-w-3xl text-center mb-8 font-medium">
        We refuse 80% of applicants. We exclusively engineer high-speed funnels for coaches with proven offers who can handle serious volume. If your discovery calls don&apos;t increase by 30% in 30 days, you pay nothing.
      </p>

      <Button size="lg" className="rounded-full font-bold text-lg px-10 mb-10" onClick={() => window.open('https://calendly.com/dellasaymen/discovery-call-compel', '_blank')}>
        Book Your Free Discovery Call
      </Button>

      {/* Sub-line */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-neutral-400 font-mono text-xs md:text-sm mb-20">
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;For Coaches /&gt;</span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;Done-For-You /&gt;</span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">&lt;$0 Retainer /&gt;</span>
      </div>

      {/* Hero Visual: Stripe Invoice Component Mock */}
      <div className="w-full max-w-4xl relative mt-8">
        {/* Subtle green radial glow */}
        <div className="absolute inset-0 bg-accent/15 blur-3xl rounded-full translate-y-8 pointer-events-none" />

        <InvoiceMock />
      </div>
    </section>
  );
};

export default Hero;
