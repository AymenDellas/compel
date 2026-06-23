import { X } from 'lucide-react';
import { targetProfiles, filterProfiles } from '../data/content';
import { Card } from './ui/Card';

const WhoItsFor = () => {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto space-y-40">
      {/* --- SECTION: THE MIRROR (Who It's For) --- */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        {/* Left Column (Sticky) */}
        <div className="lg:w-[35%] lg:sticky top-32 h-fit">
          <div className="font-mono text-xs text-neutral-500 tracking-widest mb-6 uppercase">
            01 / Target Profile
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            You have the offer. <br />
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
        <div className="absolute -inset-40 bg-[#1A0B0B] blur-[120px] rounded-full pointer-events-none" />

        {/* Left Column (Sticky) */}
        <div className="lg:w-[35%] lg:sticky top-32 h-fit">
          <div className="font-mono text-xs text-[#E56B6B]/70 tracking-widest mb-6 uppercase">
            02 / The Filter
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
            If any of these apply, <br />
            <span className="text-[#E56B6B]/80">please close this tab.</span>
          </h2>
        </div>

        {/* Right Column */}
        <div className="lg:w-[65%] flex flex-col gap-6">
          {filterProfiles.map((profile, index) => (
            <div key={index} className="relative bg-[#080303] border border-[#2A1111] rounded-2xl p-8 md:p-10 transition-opacity duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <X aria-hidden="true" className="absolute top-6 right-6 text-[#E56B6B]/30 w-6 h-6" />
              <div className="font-mono text-sm text-[#E56B6B]/80 mb-3">
                {profile.title}
              </div>
              <p className="text-lg text-neutral-400 leading-relaxed pr-8">
                {profile.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
