import Link from 'next/link';
import { Check } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ThankYouPage() {
  return <><main id="main-content" className="public-page"><div className="studio-wrap public-content"><header className="public-intro"><span className="thank-you-mark"><Check size={25} /></span><p className="small-label">Your request is with us</p><h1>A little context.<br /><em>A better conversation.</em></h1><p>Thank you for sharing your coaching business with us. We&apos;ll review your website and what you&apos;ve told us, then reply by email with the next step.</p></header><div className="public-prose"><h2>What happens now?</h2><p>We&apos;ll look at how your offer is presented, how someone moves towards an enquiry, and where the experience could be clearer. If the work looks like a fit, we&apos;ll explain what we suggest and why.</p><p>Have something to add? Email <a href="mailto:aymen@getcompel.co">aymen@getcompel.co</a>.</p><Link href="/">Return to Compel →</Link></div></div></main><Footer /></>;
}
