'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, X } from 'lucide-react';
import { useLeadCapture } from './LeadCaptureProvider';

export const LeadCaptureModal = () => {
  const { isOpen, closeModal } = useLeadCapture();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const panel = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
      if (event.key === 'Tab') {
        const items = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href]');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); previousFocus?.focus(); };
  }, [isOpen, closeModal]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const values = new FormData(event.currentTarget);
    setError(''); setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: String(values.get('name') || '').trim(), email: String(values.get('email') || '').trim(), url: String(values.get('url') || '').trim(), offer: String(values.get('offer') || '').trim(), context: String(values.get('context') || '').trim(), source: 'funnel-review' }) });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(response.status === 400 && typeof result?.error === 'string' ? result.error : 'We couldn’t save your request. Please try again, or email us directly.');
      }
      window.gtag?.('event', 'generate_lead', { lead_source: 'funnel_review' });
      closeModal();
      router.push('/thank-you');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'We couldn’t send your request. Please try again.'); }
    finally { setIsSubmitting(false); }
  }

  if (!isOpen) return null;
  return <div className="review-overlay" onClick={event => { if (event.target === event.currentTarget) closeModal(); }}><div className="review-dialog" ref={panel} role="dialog" aria-modal="true" aria-labelledby="review-title" aria-describedby="review-description"><div className="review-dialog-top"><button type="button" className="review-close" onClick={closeModal} aria-label="Close review request"><X size={17} /></button></div><h2 id="review-title">Tell us about<br /><em>your coaching.</em></h2><p id="review-description" className="review-intro">Send us your website and tell us who you coach. We&apos;ll take a look and reply by email.</p><form onSubmit={handleSubmit} aria-busy={isSubmitting}><div className="review-fields"><div><label htmlFor="review-name">Your name</label><input ref={nameRef} id="review-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={150} disabled={isSubmitting} /></div><div><label htmlFor="review-email">Email address</label><input id="review-email" name="email" type="email" autoComplete="email" placeholder="you@yourpractice.com" required maxLength={254} disabled={isSubmitting} /></div><div className="review-field-wide"><label htmlFor="review-url">Your website</label><input id="review-url" name="url" type="url" autoComplete="url" placeholder="https://yourpractice.com" required maxLength={2000} disabled={isSubmitting} /></div><div className="review-field-wide"><label htmlFor="review-offer">Who do you coach, and what do you offer?</label><textarea id="review-offer" name="offer" placeholder="The clients you work with and the coaching offer you’d like us to review." required maxLength={2000} disabled={isSubmitting} /></div><div className="review-field-wide"><label htmlFor="review-context">Where does interest come from today? <span>(optional)</span></label><input id="review-context" name="context" placeholder="e.g. LinkedIn, referrals, speaking. Any visitor or enquiry numbers help." maxLength={2000} disabled={isSubmitting} /></div></div>{error && <p className="review-error" role="alert">{error} <a href="mailto:aymen@getcompel.co">aymen@getcompel.co</a></p>}<button className="studio-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending your request…' : 'Send my review request'}<ArrowUpRight size={18} aria-hidden="true" /></button><p className="review-privacy">We&apos;ll use these details to respond to your request. <Link href="/privacy">Privacy policy</Link></p></form></div></div>;
};
