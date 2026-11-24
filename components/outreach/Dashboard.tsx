'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Link2, LogOut, Pencil, RefreshCw, Trash2 } from 'lucide-react';
import CompelLogo from '@/components/CompelLogo';
import { SHARE_ORIGIN, watchPath, type DashboardPage, type OutreachPage } from '@/lib/outreach/model';
import { PageEditor } from './PageEditor';
import { request, RequestError } from './client';

const shareUrl = (id: string) => `${SHARE_ORIGIN}${watchPath(id)}`;

function watchTime(milliseconds: number) {
  if (milliseconds > 0 && milliseconds < 1000) return '<1 sec';
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const elapsed = seconds % 60;
  return minutes ? `${minutes} min ${elapsed} sec` : `${elapsed} sec`;
}

function metrics(page: DashboardPage, dateFormat: Intl.DateTimeFormat) {
  return [
    ['Visits', page.visits],
    ['Plays', page.plays],
    ['Watch time', watchTime(page.watched_ms)],
    ['Best completion', `${page.completion}%`],
    ['Last activity', page.last_activity ? <time key={page.id} dateTime={new Date(page.last_activity).toISOString()}>
      {dateFormat.format(new Date(page.last_activity))}
    </time> : '—'],
  ];
}

export function Dashboard({ initialPages }: { initialPages: DashboardPage[] }) {
  const [pages, setPages] = useState(initialPages);
  const [editor, setEditor] = useState<DashboardPage | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [pending, setPending] = useState(false);
  const [operation, setOperation] = useState<'refresh' | 'delete' | 'logout' | null>(null);
  const [deleting, setDeleting] = useState<DashboardPage | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [readyLink, setReadyLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState('UTC');
  const dialog = useRef<HTMLDialogElement>(null);
  const linkField = useRef<HTMLInputElement>(null);
  const busy = pending || Boolean(operation);
  const activityDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone });

  useEffect(() => { setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone); }, []);

  useEffect(() => {
    const element = dialog.current;
    if (deleting && element && !element.open) element.showModal();
    if (!deleting && element?.open) element.close();
  }, [deleting]);

  function handleError(error: unknown) {
    if (error instanceof RequestError && error.status === 401) { window.location.replace('/outreach'); return; }
    setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
  }

  async function copy(id: string) {
    setReadyLink(id);
    try {
      await navigator.clipboard.writeText(shareUrl(id));
      setCopied(id);
      setNotice('Link copied.');
    } catch {
      setCopied(null);
      setNotice('Select the link to copy it.');
      requestAnimationFrame(() => { linkField.current?.focus(); linkField.current?.select(); });
    }
  }

  function saved(page: OutreachPage) {
    setPages(previous => {
      const existing = previous.find(item => item.id === page.id);
      if (!existing) return [{ ...page, visits: 0, plays: 0, watched_ms: 0, completion: 0, last_activity: null }, ...previous];
      const mediaMetrics = existing.video_id === page.video_id ? {} : { plays: 0, watched_ms: 0, completion: 0 };
      return previous.map(item => item.id === page.id ? { ...item, ...page, ...mediaMetrics } : item);
    });
    setEditor(null);
    setFormVersion(version => version + 1);
    setReadyLink(page.id);
    setCopied(null);
    setError('');
    setNotice(editor ? 'Changes saved.' : `Video page published for ${page.name}.`);
  }

  async function refresh() {
    setOperation('refresh');
    setError('');
    try {
      const result = await request<{ pages: DashboardPage[] }>('pages', 'GET');
      setPages(result.pages);
      if (editor) {
        const updated = result.pages.find(item => item.id === editor.id) ?? null;
        if (updated?.revision !== editor.revision) setEditor(updated);
      }
      setNotice('Activity refreshed.');
    } catch (error) { handleError(error); }
    finally { setOperation(null); }
  }

  async function remove() {
    if (!deleting) return;
    const { id, revision, name } = deleting;
    setOperation('delete');
    setError('');
    try {
      await request('pages', 'DELETE', { id, revision });
      setPages(previous => previous.filter(item => item.id !== id));
      if (editor?.id === id) setEditor(null);
      if (readyLink === id) setReadyLink(null);
      setNotice(`Video page for ${name} deleted.`);
    } catch (error) { handleError(error); }
    finally { setDeleting(null); setOperation(null); }
  }

  async function signOut() {
    setOperation('logout');
    setError('');
    try {
      await request('session', 'DELETE');
      window.location.replace('/outreach');
    } catch (error) { handleError(error); setOperation(null); }
  }

  return <main className="outreach-root" id="main-content">
    <div className="outreach-wrap">
      <header className="outreach-top">
        <CompelLogo width={105} />
        <button className="outreach-action" type="button" onClick={signOut} disabled={busy}><LogOut size={15} aria-hidden="true" /> Sign out</button>
      </header>
      <h1>Video outreach</h1>
      <p className="outreach-live" role="status">{notice}</p>
      {error && <p className="outreach-error" role="alert">{error}</p>}
      {readyLink && <div className="outreach-share">
        <label className="outreach-field">Shareable link
          <input ref={linkField} value={shareUrl(readyLink)} readOnly onFocus={event => event.target.select()} />
        </label>
        <button className="outreach-secondary" type="button" onClick={() => void copy(readyLink)}>
          {copied === readyLink ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
          {copied === readyLink ? 'Copied' : 'Copy link'}
        </button>
      </div>}
      <div className="outreach-workspace">
        <PageEditor key={editor ? `${editor.id}:${editor.revision}` : formVersion} page={editor}
          onSaved={saved} onCancel={() => setEditor(null)} onBusy={setPending} />
        <section className="outreach-library" aria-labelledby="outreach-library-title">
          <div className="outreach-library-heading">
            <h2 id="outreach-library-title">Published pages</h2>
            <button className="outreach-action" type="button" onClick={refresh} disabled={busy}>
              <RefreshCw size={15} aria-hidden="true" /> {operation === 'refresh' ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
          {pages.length ? <ul className="outreach-pages">
            {pages.map(page => <li key={page.id}>
              <h3>{page.name}</h3>
              <dl className="outreach-metrics">
                {metrics(page, activityDate).map(([label, value]) => <div key={String(label)}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <div className="outreach-page-actions" role="group" aria-label={`Actions for ${page.name}`}>
                <button className="outreach-action outreach-copy" type="button" onClick={() => void copy(page.id)}><Link2 size={15} aria-hidden="true" /> Copy link</button>
                <a className="outreach-action" href={`/outreach/preview/${page.id}`} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={15} aria-hidden="true" /> Preview</a>
                <button className="outreach-action" type="button" disabled={busy} onClick={() => {
                  setNotice('');
                  setEditor(page);
                }}><Pencil size={14} aria-hidden="true" /> Edit</button>
                <button className="outreach-action outreach-delete" type="button" disabled={busy} onClick={() => setDeleting(page)}><Trash2 size={15} aria-hidden="true" /> Delete</button>
              </div>
            </li>)}
          </ul> : <p className="outreach-empty">Published videos and their viewing activity will appear here.</p>}
        </section>
      </div>
    </div>
    <dialog className="outreach-dialog" ref={dialog} aria-labelledby="outreach-delete-title" onCancel={event => {
      event.preventDefault();
      if (operation !== 'delete') setDeleting(null);
    }}>
      <h2 id="outreach-delete-title">Delete this video page?</h2>
      <p>The link for {deleting?.name} will stop working and its viewing activity will be removed.</p>
      <div className="outreach-form-actions">
        <button type="button" className="outreach-secondary" autoFocus disabled={operation === 'delete'} onClick={() => setDeleting(null)}>Cancel</button>
        <button type="button" className="outreach-danger" disabled={operation === 'delete'} onClick={remove}>{operation === 'delete' ? 'Deleting…' : 'Delete page'}</button>
      </div>
    </dialog>
  </main>;
}
