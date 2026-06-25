import { useState, useEffect } from 'react';
import { Card } from './ui/Card';

const TelemetryLog = () => {
  const [logs, setLogs] = useState([
    { time: "14:21:03.012", event: "$pageview", latency: "42" },
    { time: "14:21:08.441", event: "btn_cta_click", latency: "12", highlight: true },
    { time: "14:21:08.455", event: "modal_open", latency: "14" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = {
          time: new Date().toISOString().substring(11, 23),
          event: ["scroll", "hover", "input_focus"][Math.floor(Math.random() * 3)],
          latency: Math.floor(Math.random() * 50).toString()
        };
        return [...prev.slice(1), newLog];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black border border-neutral-800 rounded-lg p-3 font-mono text-[10px] text-neutral-400 mt-6 space-y-2 shadow-inner">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
        <span className="text-neutral-400">timestamp</span>
        <span className="text-neutral-400">event</span>
        <span className="text-neutral-400">latency_ms</span>
      </div>
      {logs.map((log, i) => (
        <div key={i} className={`flex justify-between items-center ${log.highlight ? 'text-accent' : 'text-neutral-300'}`}>
          <span>{log.time}</span>
          <span>{log.event}</span>
          <span className="text-neutral-400">{log.latency}</span>
        </div>
      ))}
    </div>
  );
};

const WhyCompel = () => {
  return (
    <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 uppercase">
          The Anti-Agency
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="md:col-span-2 rounded-3xl md:p-12 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 z-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">If you want to debate color palettes on weekly Zoom calls, hire a traditional agency.<br/><span className="text-accent">We build execution engines.</span></h3>
          </div>
          <div className="flex-1 w-full flex flex-col md:flex-row h-auto md:h-64 rounded-xl border border-white/10 overflow-hidden relative">
            <div className="w-full md:w-1/2 h-32 md:h-full bg-gradient-to-br from-neutral-900 to-neutral-950 flex flex-col p-4 gap-3 opacity-60">
               <div className="w-full h-8 bg-white/10 rounded" />
               <div className="w-3/4 h-24 bg-white/10 rounded" />
               <div className="w-1/2 h-8 bg-white/10 rounded" />
            </div>
            <div className="w-full md:w-1/2 h-48 md:h-full bg-neutral-950 p-4 relative border-t md:border-t-0 md:border-l border-neutral-800">
               <div className="absolute top-0 right-0 bottom-0 w-full opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
               
               <div className="w-full h-8 border border-neutral-700 mb-3 relative">
                 <div className="absolute -left-2 -top-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#C8F135]" />
               </div>
               <div className="w-full h-20 border border-neutral-700 bg-neutral-900 mb-3 relative flex items-center justify-center text-[10px] font-mono text-neutral-400">
                  HERO_AREA
               </div>
               <div className="w-1/2 h-8 bg-accent/20 border border-accent flex items-center justify-center text-[8px] font-mono text-accent">
                  PRIMARY_CTA
               </div>
               
               <div className="absolute top-16 -left-4 md:-left-8 bg-accent text-black font-mono text-[8px] px-2 py-1 rounded shadow-lg z-20 hidden sm:flex items-center gap-1">
                 <div className="w-1 h-1 bg-black rounded-full" /> CR: +14%
               </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl md:p-10 flex flex-col justify-between">
          <div className="mb-12 relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-4">Zero Account Managers.</h3>
            <p className="text-neutral-400 leading-relaxed">
              You don't get handed off to a 23-year-old 'Client Success Lead' who reads off a script. You interface directly with the engineers building your pipeline.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase relative z-10">
            // Direct Comm Channel
          </div>
        </Card>

        <Card className="rounded-3xl md:p-10 flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full" />
           <div className="mb-12 relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-4">Obsessive Telemetry.</h3>
            <div>
              <TelemetryLog />
            </div>
          </div>
          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase relative z-10">
            // Data-Driven Iteration
          </div>
        </Card>

      </div>
    </section>
  );
};

export default WhyCompel;
