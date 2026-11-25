'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLeadCapture } from './LeadCaptureProvider';

export function ReviewButton({ className = '', label = 'Get my free funnel review' }: {
  className?: string;
  label?: string;
}) {
  const { openModal } = useLeadCapture();
  return (
    <button type="button" className={`studio-button studio-action ${className}`} onClick={openModal}>
      <span>{label}</span>
      <span className="studio-button-icon" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={1.7} /></span>
    </button>
  );
}
