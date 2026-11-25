'use client';

import { useId, useRef, useState } from 'react';
import { ArrowDown, Minus } from 'lucide-react';
import { WebsiteReviewForm } from '../WebsiteReviewForm';

export function ReviewDisclosure({ nav = false }: { nav?: boolean }) {
  const panelId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const Icon = open ? Minus : ArrowDown;

  return (
    <div
      className={nav ? 'studio-review-trigger studio-review-trigger-nav' : 'studio-review-trigger'}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={`studio-button studio-action${nav ? ' studio-button-nav' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(value => !value)}
      >
        <span>{nav ? 'Free site review' : 'Review my site for free'}</span>
        <span className="studio-button-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.7} /></span>
      </button>
      <div className="studio-review-disclosure" id={panelId} data-open={open} inert={!open} aria-hidden={!open}>
        <div className="studio-review-disclosure-clip">
          <div className="studio-review-disclosure-inner">
            <WebsiteReviewForm compact />
          </div>
        </div>
      </div>
    </div>
  );
}
