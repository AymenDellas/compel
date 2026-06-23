import { motion } from 'framer-motion';

export const InvoiceMock = () => {
  return (
    <div className="relative bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden ring-1 ring-white/5">
      {/* Header of Invoice */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b border-neutral-800/80 pb-6 mb-12 gap-4">
        <div>
          <div className="text-white font-semibold text-lg mb-1 tracking-tight">Invoice Trigger Event</div>
          <div className="text-neutral-500 text-sm font-medium">Performance Target Hit (+30%)</div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-neutral-500 text-sm font-medium">Due upon completion</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64 relative w-[calc(100%-2.5rem)] ml-10 mt-6 mb-12 sm:mb-16 border-l border-b border-neutral-800/60">
          
          {/* Grid lines */}
          <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={`h-${i}`} className="w-full border-t border-neutral-800/30 h-0" />
            ))}
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none flex justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={`v-${i}`} className="h-full border-l border-neutral-800/30 w-0" />
            ))}
          </div>

          {/* Dotted Threshold Line */}
          <div className="absolute top-[50%] left-0 right-0 border-t-2 border-dashed border-neutral-700/50 flex items-center justify-end z-0">
            <span className="text-xs font-mono text-neutral-400 -mt-6 bg-[#0A0A0A] px-2">Invoice Trigger (+30%)</span>
          </div>

          {/* Chart SVGs */}
          <div className="absolute inset-0 z-10">
            <svg aria-hidden="true" className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d="M0,70 L100,70" stroke="#404040" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M100,70 C140,70 160,10 200,5" stroke="var(--color-accent)" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
              <motion.path 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                d="M100,70 C140,70 160,10 200,5 L200,100 L100,100 Z" fill="url(#greenGlow)" />
            </svg>
          </div>

          {/* Data Points (Absolute Divs to avoid SVG squishing) */}
          <div className="absolute z-20 w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-[#404040] rounded-full top-[70%] left-[0%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute z-20 w-3 h-3 bg-[#0A0A0A] border-[2.5px] border-[#404040] rounded-full top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
          
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute z-20 w-4 h-4 bg-accent rounded-full top-[5%] left-[100%] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(200,241,53,0.8)]"
          />

          {/* Y-Axis Labels */}
          <div className="absolute -left-10 top-[5%] -translate-y-1/2 text-[10px] font-mono text-neutral-500">100%</div>
          <div className="absolute -left-10 top-[50%] -translate-y-1/2 text-[10px] font-mono text-neutral-500">30%</div>
          <div className="absolute -left-10 top-[70%] -translate-y-1/2 text-[10px] font-mono text-neutral-500">0%</div>

          {/* Labels */}
          <div className="absolute -bottom-8 left-[25%] -translate-x-1/2 text-xs font-medium text-neutral-500 whitespace-nowrap">Your baseline</div>
          <div className="absolute -bottom-8 left-[75%] -translate-x-1/2 text-xs font-medium text-accent whitespace-nowrap">Compel execution</div>
      </div>
    </div>
  );
};
