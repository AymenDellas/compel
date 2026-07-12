"use client";

import { Button } from "./ui/Button";
import { useLeadCapture } from "./LeadCaptureProvider";

const CTA = () => {
  const { openModal } = useLeadCapture();

  return (
    <section
      id="cta-section"
      className="relative w-full px-6 py-32 md:py-40 border-t border-neutral-800/50"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Mono label */}
        <div className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.3em] mb-6">
          — Next step
        </div>

        {/* Headline — left-aligned, massive, no-nonsense */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tighter text-white leading-[1] mb-12 max-w-4xl">
          You&apos;ve read the page. You know if this is for you.
        </h2>

        {/* Button row with secondary detail */}
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:items-center">
          <Button
            size="lg"
            className="rounded-full font-bold text-lg px-10"
            onClick={openModal}
          >
            Book Your Free Discovery Call
          </Button>

          <span className="text-neutral-600 text-sm font-mono">
            $0 upfront · takes 30 seconds
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTA;
