import { useRef, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { timelineSteps } from '../data/content';

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          node.textContent = value.toFixed(0);
        },
      });
      return () => controls.stop();
    }
  }, [from, to]);

  return <span ref={nodeRef} />;
};

const HowItWorks = () => {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase">
          The Execution Timeline
        </h2>
        <p className="text-xl text-neutral-400 font-mono">
          Systematic execution. No guessing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {timelineSteps.map((step, index) => {
          return (
            <motion.div 
              key={step.id} 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8 md:p-12 overflow-hidden relative group-hover:border-neutral-700 transition-colors">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1">
                    <div className="font-mono text-sm text-neutral-500 mb-4 uppercase tracking-widest">[ {step.days} ]</div>
                    <h3 className="text-3xl text-white font-semibold mb-4">{step.title}</h3>
                    <p className="text-neutral-400 text-lg">{step.description}</p>
                  </div>
                  
                  <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
                    {index === 0 && (
                      <div className="w-full bg-neutral-950 rounded-xl border border-neutral-800 p-6 flex items-center justify-center relative min-h-[200px]">
                        <div className="w-full max-w-[240px] space-y-4">
                          <div className="w-full h-8 bg-neutral-900 rounded-sm" />
                          <div className="w-3/4 h-4 bg-neutral-900 rounded-sm" />
                          <div className="w-1/2 h-4 bg-neutral-900 rounded-sm" />
                          <div className="relative mt-6">
                            <div className="w-full h-12 bg-neutral-800 rounded-sm border-2 border-red-500/50" />
                            <div className="absolute -top-10 -right-12 bg-red-500 text-white text-[10px] font-mono px-3 py-1.5 rounded shadow-lg">
                              Drop-off rate: 78%<br/>→ Fix identified
                              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-red-500 rotate-45" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="flex flex-col gap-3 font-mono text-xs w-full max-w-[300px]">
                        <div className="bg-neutral-900 border border-neutral-700 px-4 py-3 rounded text-neutral-300 text-center relative">
                          [ Ad / Organic ]
                          <div className="absolute -bottom-3 left-1/2 w-[1px] h-3 bg-neutral-700" />
                        </div>
                        <div className="bg-neutral-900 border border-neutral-700 px-4 py-3 rounded text-neutral-300 text-center relative">
                          [ High-Speed LP ]
                          <div className="absolute -bottom-3 left-1/2 w-[1px] h-3 bg-neutral-700" />
                        </div>
                        <div className="bg-accent/10 border border-accent/50 px-4 py-3 rounded text-accent text-center relative font-bold shadow-[0_0_15px_rgba(200,241,53,0.1)]">
                          [ Frictionless Cal ]
                          <div className="absolute -bottom-3 left-1/2 w-[1px] h-3 bg-neutral-700" />
                        </div>
                        <div className="bg-neutral-900 border border-neutral-700 px-4 py-3 rounded text-neutral-300 text-center">
                          [ Nurture Sequence ]
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="w-full bg-neutral-950 rounded-xl border border-neutral-800 p-8 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
                        <div className="font-mono text-[64px] md:text-[80px] text-white tracking-tighter leading-none mb-4 relative z-10 font-light">
                          $<Counter from={5000} to={0} /><span className="text-neutral-600">.00</span>
                        </div>
                        <div className="text-neutral-500 text-xs text-center max-w-[200px] relative z-10 mb-8">
                          "Our invoice sits in escrow until the dashboard hits your custom target."
                        </div>
                        <button 
                          onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
                          className="relative z-10 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors"
                        >
                          Book a Strategy Session
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
