import type { Metadata } from 'next';
import { privateMetadata } from '@/lib/outreach/metadata';
import './dashboard.css';

export const metadata: Metadata = { ...privateMetadata, title: 'Video outreach | Compel' };

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
