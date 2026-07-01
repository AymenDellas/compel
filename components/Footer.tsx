import Link from 'next/link';
import { getAllNiches, getNicheConfig } from '../lib/niches';

const Footer = () => {
  const niches = getAllNiches();

  return (
    <section className="border-t border-neutral-800 bg-neutral-950/80">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" className="h-7 w-auto">
                <text x="45%" y="50%" dominantBaseline="central" textAnchor="middle" style={{ letterSpacing: '-0.02em' }}>
                  <tspan style={{ fontWeight: 300, fontSize: '72px' }} fill="#FFFFFF">com</tspan>
                  <tspan style={{ fontWeight: 700, fontSize: '72px' }} fill="#FFFFFF">pel</tspan>
                </text>
                <circle cx="264" cy="72" r="8" fill="#C8F135" />
              </svg>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Performance-based funnel agency for coaches. We build high-converting funnels — you only pay when your discovery calls increase.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {niches.map((slug) => {
                const config = getNicheConfig(slug);
                if (!config) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/coaches/${slug}`}
                      className="text-sm text-neutral-300 hover:text-accent transition-colors"
                    >
                      Funnels for {config.displayName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/learn" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/learn/cpa-high-ticket" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  Coaching CPA Guide
                </Link>
              </li>
              <li>
                <Link href="/learn/retainer-vs-performance" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  Retainer vs. Performance
                </Link>
              </li>
              <li>
                <Link href="/learn/why-funnel-leaking" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  Why Your Funnel Leaks
                </Link>
              </li>
              <li>
                <Link href="/learn/zero-upfront-model" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  The $0 Upfront Model
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://calendly.com/dellasaymen/discovery-call-compel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 hover:text-accent transition-colors"
                >
                  Book a Discovery Call
                </a>
              </li>
              <li>
                <a
                  href="mailto:aymen@getcompel.co"
                  className="text-sm text-neutral-300 hover:text-accent transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 font-mono">
            &copy; {new Date().getFullYear()} Compel. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600 font-mono">
            Performance-Based Acquisition for Coaches
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
