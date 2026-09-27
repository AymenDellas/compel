"use client";

import { Button } from "./ui/Button";
import { useLeadCapture } from "./LeadCaptureProvider";

const Hero = () => {
  const { openModal } = useLeadCapture();
  return (
    <section className="compel-hero relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-40 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10 xl:gap-14">
      <div className="flex min-w-0 flex-col items-center lg:items-start">
      {/* Overhead Badge */}
      <div className="hero-eyebrow mb-10 border border-neutral-800 bg-neutral-950/60 rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-sm shadow-sm">
        <span className="text-accent text-xs">✦</span>
        <span className="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase font-semibold">
          Performance-Based Acquisition
        </span>
      </div>

      <h1 className="hero-title mb-6 max-w-5xl text-center text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-text sm:text-5xl md:text-[72px] lg:text-left lg:text-[56px] xl:text-[64px]">
        Funnels for Coaches That Book More <br />
        <span className="text-neutral-300">
          <span className="font-serif italic font-extralight text-accent">
            Discovery Calls
          </span>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="hero-description mb-8 max-w-3xl text-center text-lg font-medium text-neutral-400 md:text-xl lg:text-left">
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
      <div className="hero-tags flex flex-wrap justify-center gap-3 text-xs font-mono text-neutral-400 md:gap-4 md:text-sm lg:justify-start">
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
      </div>

      {/* Performance-based arrangement */}
      <div className="relative mt-8 w-full max-w-4xl lg:mt-0">
        <div className="arrangement-card relative flex flex-col rounded-[16px] border border-[#D6DDCE] bg-[#F3F4EC] p-8 text-[#191C16] shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-10 lg:min-h-[530px] xl:min-h-[565px] xl:p-12">
          <div className="flex items-center gap-4">
            <span className="h-2.5 w-2.5 shrink-0 bg-[#A6C63B]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#596350]">The arrangement</p>
            <span className="h-px flex-1 bg-[#C8D0C1]" aria-hidden="true" />
          </div>

          <div className="mt-8 flex items-baseline gap-4 xl:mt-10">
            <span className="arrangement-amount text-[96px] font-semibold leading-none tracking-[-0.09em] sm:text-[112px]">$0</span>
            <span className="font-serif text-[27px] italic text-[#495840] sm:text-[30px]">upfront</span>
          </div>

          <div className="mt-8 border-t-2 border-[#262D22] pt-7">
            <p className="max-w-md text-[25px] font-medium leading-[1.25] tracking-tight sm:text-[28px]">
              You pay when we reach the agreed increase in discovery calls.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-[#C8D0C1] pt-5 text-sm leading-relaxed text-[#596350] lg:mt-auto">
            <span className="font-semibold text-[#627B30]" aria-hidden="true">↳</span>
            <p>We agree on your baseline and target before the build starts.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
