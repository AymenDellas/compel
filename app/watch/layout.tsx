import type { Metadata } from 'next';
import { privateMetadata } from '@/lib/outreach/metadata';
import './watch.css';

export const metadata: Metadata = { ...privateMetadata, title: 'A video from Compel' };

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
