"use client";

import { InvoiceMock } from "./visuals/InvoiceMock";
import { Button } from "./ui/Button";
import { useLeadCapture } from "./LeadCaptureProvider";

const Hero = () => {
  const { openModal } = useLeadCapture();
  return (
    <section className="relative pt-40 pb-24 px-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Overhead Badge */}
      <div className="mb-10 border border-neutral-800 bg-neutral-950/60 rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-sm shadow-sm">
        <span className="text-accent text-xs">✦</span>
        <span className="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase font-semibold">
          Performance-Based Acquisition
        </span>
      </div>

      {/* SEO-Optimized H1 */}
      <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[84px] font-bold tracking-[-0.03em] leading-[1.05] text-center text-text max-w-5xl mb-6">
        Get More Booked Discovery Calls Without Lifting a <br />
        <span className="text-neutral-300">
          <span className="font-serif italic font-extralight text-accent">
            Finger
          </span>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-neutral-400 max-w-3xl text-center mb-8 font-medium">
        You're a coach who wants to{" "}
        <span className="font-bold text-white">grow your business</span> and{" "}
        <span className="font-bold text-white">help more clients</span>, but
        you're struggling to{" "}
        <span className="font-bold text-white">fill your calendar</span> with
        booked discovery calls. We'll build and install a complete funnel that{" "}
        <span className="font-bold text-white">
          increases your booked calls
        </span>
        , and you pay <span className="font-bold text-white">zero upfront</span>
        .
      </p>

      <Button
        size="lg"
        className="rounded-full font-bold text-lg px-10 mb-10"
        onClick={openModal}
      >
        Book Your Free Discovery Call
      </Button>

      {/* Sub-line */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-neutral-400 font-mono text-xs md:text-sm mb-20">
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">
          &lt;For Coaches /&gt;
        </span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">
          &lt;Done-For-You /&gt;
        </span>
        <span className="px-4 py-1.5 bg-black/40 rounded-md border border-neutral-800 shadow-sm">
          &lt;Pay On Results/&gt;
        </span>
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
