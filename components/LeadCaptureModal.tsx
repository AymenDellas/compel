'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useLeadCapture } from './LeadCaptureProvider';
import { WebsiteReviewForm } from './WebsiteReviewForm';

export function LeadCaptureModal() {
  const { isOpen, closeModal } = useLeadCapture();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector('input')?.focus();

    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
      if (event.key !== 'Tab') return;

      const items = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, a[href]');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keydown);
      previousFocus?.focus();
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="review-overlay" onClick={event => { if (event.target === event.currentTarget) closeModal(); }}>
      <div className="review-dialog" ref={panel} role="dialog" aria-modal="true" aria-labelledby="review-title" aria-describedby="review-description">
        <div className="review-dialog-top">
          <button type="button" className="review-close" onClick={closeModal} aria-label="Close review request"><X size={17} /></button>
        </div>
        <h2 id="review-title">Get a <em>free funnel review.</em></h2>
        <p id="review-description" className="review-intro">Send us your site and we’ll look at what might be getting in the way of a booking.</p>
        <WebsiteReviewForm />
      </div>
    </div>
  );
}
