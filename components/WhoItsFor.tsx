"use client";

import { X } from 'lucide-react';
import { targetProfiles, filterProfiles } from '../data/content';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const WhoItsFor = () => {
  return (
    <section className="py-20 space-y-20 md:py-32 md:space-y-40 px-6 max-w-6xl mx-auto">
      {/* --- SECTION: THE MIRROR (Who It's For) --- */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        {/* Left Column (Sticky) */}
        <div className="lg:w-[35%] lg:sticky top-32 h-fit">
          <div className="font-mono text-sm text-neutral-500 tracking-widest mb-6 uppercase">
            This is for..
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            You have the offer. <br className="hidden md:inline" />
            <span className="text-neutral-500">You just don't have the plumbing.</span>
          </h2>
        </div>

        {/* Right Column */}
        <div className="lg:w-[65%] flex flex-col gap-6">
          {targetProfiles.map((profile, index) => (
            <Card key={index} hoverEffect className="group transition-all duration-300">
              {/* Left Border Light-Up */}
              <div className="absolute left-[-1px] top-4 bottom-4 w-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_var(--color-accent)]" />

              <div className="font-mono text-sm text-accent mb-4 bg-accent/10 w-fit px-3 py-1 rounded">
                [ Specificity: {profile.specificity} ]
              </div>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                {profile.quote}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* --- SECTION: THE GATEKEEPER (Who It's NOT For) --- */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        {/* Ambient background glow */}
        <div className="absolute -inset-40 bg-danger/10 blur-3xl rounded-full pointer-events-none opacity-30 z-0" />

        {/* Left Column (Sticky) */}
        <div className="lg:w-[35%] lg:sticky top-32 h-fit relative z-10">
          <div className="font-mono text-sm text-danger/70 tracking-widest mb-6 uppercase">
            This is NOT for..
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            If any of these apply, <br className="hidden md:inline" />
            <span className="text-danger/80">please close this tab.</span>
          </h2>
        </div>

        {/* Right Column */}
        <div className="lg:w-[65%] flex flex-col gap-6 relative z-10">
          {filterProfiles.map((profile, index) => (
            <Card key={index} hoverEffect className="group transition-all duration-300">
              <div className="absolute left-[-1px] top-4 bottom-4 w-[2px] bg-danger opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
              <X aria-hidden="true" className="absolute top-6 right-6 text-danger/30 w-6 h-6" />
              <div className="font-mono text-sm text-danger/80 mb-3">
                {profile.title}
              </div>
              <p className="text-lg text-neutral-400 leading-relaxed pr-8">
                {profile.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-16 relative z-10">
        <Button size="lg" className="rounded-full font-bold text-lg px-10" onClick={() => window.open('https://calendly.com/dellasaymen/discovery-call-revlane', '_blank')}>
          Book Your Free Discovery Call
        </Button>
      </div>
    </section>
  );
};

export default WhoItsFor;
