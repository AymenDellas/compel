import { notFound } from 'next/navigation';
import { WatchPresentation } from '@/components/outreach/WatchPresentation';
import { isId } from '@/lib/outreach/model';
import { configured, issueVisit } from '@/lib/outreach/security';
import { getPage } from '@/lib/outreach/store';

export const dynamic = 'force-dynamic';

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isId(id) || !configured()) notFound();
  const page = await getPage(id);
  if (!page) notFound();
  return <WatchPresentation page={page} ticket={issueVisit(id, page.video_id)} />;
}
