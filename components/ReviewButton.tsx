'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLeadCapture } from './LeadCaptureProvider';

export function ReviewButton({ className = '' }: { className?: string }) {
  const { openModal } = useLeadCapture();
  return <button type="button" className={`studio-button studio-action ${className}`} onClick={openModal}>
    <span>Request a Funnel Review</span>
    <span className="studio-button-icon" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={1.7} /></span>
  </button>;
}
