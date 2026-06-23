const TheGuarantee = () => {
  return (
    <section className="w-full bg-[#F8F9FA] text-black py-32 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 uppercase text-black">
          The Unconditional Escrow
        </h2>
        
        <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mb-16 text-neutral-600">
          "We can only offer this because we brutally filter out weak businesses. We do not ask for a 3-month commitment. If you pass our initial audit, we rebuild your funnel and take 100% of the financial downside. If your discovery calls don't increase by 30% in 30 days, our invoice is shredded."
        </p>

        <div className="w-full grid md:grid-cols-2 gap-8 md:gap-12 border-t border-neutral-300 pt-16 text-left">
          {/* Standard Agencies */}
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-sm tracking-widest text-neutral-500 uppercase border-b border-neutral-300 pb-2">
              Standard Agencies
            </h3>
            <ul className="space-y-4 font-medium text-neutral-600">
              <li className="flex items-center gap-3">
                <span className="text-neutral-400">✕</span> $5,000 upfront
              </li>
              <li className="flex items-center gap-3">
                <span className="text-neutral-400">✕</span> 3-month lock-in
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-400 mt-1">✕</span> 
                <span>They blame the "algorithm" if it fails.</span>
              </li>
            </ul>
          </div>

          {/* Compel */}
          <div className="flex flex-col gap-6 relative">
            <h3 className="font-mono text-sm tracking-widest text-black uppercase border-b border-black pb-2 font-bold">
              Compel
            </h3>
            <ul className="space-y-4 font-semibold text-lg text-black">
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">✓</span> $0 upfront
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">✓</span> 30-day window
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] mt-1">✓</span> 
                <span>We take 100% of the financial downside.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheGuarantee;
