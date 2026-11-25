'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';

const reviewEmail = 'aymen@getcompel.co';

export function WebsiteReviewForm({ compact = false }: { compact?: boolean }) {
  const fieldId = useId();
  const confirmation = useRef<HTMLHeadingElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedWebsite, setSubmittedWebsite] = useState('');

  useEffect(() => {
    if (submittedWebsite) confirmation.current?.focus();
  }, [submittedWebsite]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const website = String(new FormData(event.currentTarget).get('url') || '').trim();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: website, source: 'funnel-review' }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(response.status === 400 && typeof result?.error === 'string'
          ? result.error
          : 'We couldn’t save your request. Try again or email us.');
        return;
      }

      setSubmittedWebsite(website);
      window.gtag?.('event', 'generate_lead', { lead_source: 'funnel_review' });
    } catch {
      setError('We couldn’t save your request. Try again or email us.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedWebsite) {
    const subject = encodeURIComponent('My free funnel review');
    const message = encodeURIComponent(
      `Hi Aymen, please send my funnel review to this email address.\n\nWebsite: ${submittedWebsite}`
    );

    return (
      <div className="review-receipt">
        <h3 ref={confirmation} tabIndex={-1}>We’ve got your website.</h3>
        <p>We’ll use the business email listed on your site. If there isn’t one or you’d prefer another address, email us from the address you want us to use.</p>
        <a href={`mailto:${reviewEmail}?subject=${subject}&body=${message}`}>Email Compel about my review <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    );
  }

  return (
    <form className={`website-review-form${compact ? ' website-review-form-compact' : ''}`} onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <label className={compact ? 'sr-only' : undefined} htmlFor={fieldId}>Your website</label>
      <div className="website-review-entry">
        <input
          id={fieldId}
          name="url"
          inputMode="url"
          autoComplete="url"
          placeholder="yourpractice.com"
          required
          maxLength={2000}
          readOnly={isSubmitting}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        <button className="studio-button studio-action" type="submit" disabled={isSubmitting} title={compact ? 'Send website for review' : undefined}>
          <span className={compact ? 'sr-only' : undefined}>{isSubmitting ? 'Sending your request…' : compact ? 'Send my website for review' : 'Send my site for a free review'}</span>
          <span className="studio-button-icon" aria-hidden="true">
            {compact && isSubmitting ? <LoaderCircle className="review-spinner" size={19} /> : <ArrowUpRight size={19} />}
          </span>
        </button>
      </div>
      {error && <p className="review-error" id={`${fieldId}-error`} role="alert">{error} <a href={`mailto:${reviewEmail}`}>{reviewEmail}</a></p>}
      <p className="review-privacy"><Link href="/privacy">Privacy policy</Link></p>
    </form>
  );
}
