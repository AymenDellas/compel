import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const CTA = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [calls, setCalls] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url && calls) {
      if ((window as any).Calendly) {
        const calendlyUrl = `https://calendly.com/compel/audit?name=${encodeURIComponent(name)}&a1=${encodeURIComponent(url)}&a2=${encodeURIComponent(calls)}`;
        (window as any).Calendly.initPopupWidget({ url: calendlyUrl });
      } else {
        alert("Calendly widget is loading. Please try again in a moment.");
      }
    } else {
      alert("Please fill out all fields to initialize the audit.");
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0A1205_0%,#000000_70%)] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 z-0" />

      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 items-center">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight uppercase">
            Ready to scale?
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 font-medium max-w-xl mx-auto lg:mx-0">
            Fill out the baseline specs below. We don't take on every project. If your offer isn't proven or your fulfillment can't handle a 30% surge in volume, we will reject your application. If we accept, you pay nothing upfront.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
          <form 
            onSubmit={handleInitAudit}
            className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 shadow-2xl relative"
          >
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

            <div className="space-y-6">
              <Input 
                id="userName"
                label="Your Name"
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
              <Input 
                id="userUrl"
                label="Your Primary Offer URL"
                type="url" 
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com/offer"
                className="font-mono text-sm"
              />
              <Input 
                id="userCalls"
                label="Current Monthly Discovery Calls"
                type="number" 
                required
                value={calls}
                onChange={(e) => setCalls(e.target.value)}
                placeholder="e.g. 12"
                className="font-mono"
              />

              <Button type="submit" variant="secondary" className="w-full mt-4 h-14 text-lg">
                [ Initialize Funnel Audit <span className="ml-2">→</span> ]
              </Button>
            </div>
            
            <div className="mt-6 text-center">
               <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
                 Secured via Calendly API
               </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
