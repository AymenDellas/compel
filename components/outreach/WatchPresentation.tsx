import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import CompelLogo from '@/components/CompelLogo';
import { mediaPath, type OutreachPage } from '@/lib/outreach/model';
import { signRead } from '@/lib/outreach/storage';
import { VideoPlayer } from './VideoPlayer';

export async function WatchPresentation({ page, ticket, preview = false }: { page: OutreachPage; ticket?: string; preview?: boolean }) {
  const preparedVideo = await signRead(page.video_id, 'GET');

  return <main id="main-content" className="watch-root">
    <div className="watch-wrap">
      <header className="watch-brand">
        <CompelLogo width={108} />
        {preview && <a className="watch-reply" href="/outreach"><ArrowLeft size={15} aria-hidden="true" /> Back to dashboard</a>}
      </header>
      <h1 className="watch-heading">A video for <em>{page.name}</em></h1>
      <VideoPlayer key={page.video_id} preparedVideo={preparedVideo} videoUrl={mediaPath(page.id, 'video', page.video_id)}
        thumbnailUrl={mediaPath(page.id, 'thumbnail', page.thumbnail_id)} ticket={ticket} />
      <footer className="watch-footer">
        <a className="watch-reply" href="mailto:aymen@getcompel.co?subject=Re%3A%20Your%20Compel%20video">
          Reply to Aymen <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>
    </div>
  </main>;
}
