import { notFound } from 'next/navigation';
import { WatchPresentation } from '@/components/outreach/WatchPresentation';
import { isId } from '@/lib/outreach/model';
import { configured, issueVisit } from '@/lib/outreach/security';
import { getPage, getPageBySlug } from '@/lib/outreach/store';

export const dynamic = 'force-dynamic';

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: identifier } = await params;
  if (identifier.length > 200 || !configured()) notFound();
  const page = isId(identifier) ? await getPage(identifier) : await getPageBySlug(identifier);
  if (!page) notFound();
  return <WatchPresentation page={page} ticket={issueVisit(page.id, page.video_id)} />;
}
