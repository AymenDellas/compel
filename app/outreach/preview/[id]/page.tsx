import { notFound, redirect } from 'next/navigation';
import { WatchPresentation } from '@/components/outreach/WatchPresentation';
import { isId } from '@/lib/outreach/model';
import { isAdmin } from '@/lib/outreach/security';
import { getPage } from '@/lib/outreach/store';
import '../../../watch/watch.css';

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect('/outreach');
  const { id } = await params;
  if (!isId(id)) notFound();
  const page = await getPage(id);
  if (!page) notFound();
  return <WatchPresentation page={page} preview />;
}
