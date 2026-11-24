'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MAX_THUMBNAIL_BYTES, MAX_VIDEO_BYTES, type DashboardPage, type OutreachPage } from '@/lib/outreach/model';
import { prepareThumbnail, prepareVideo, request, RequestError, type SignedUpload, uploadFile } from './client';

type Uploaded = { videoId: string; thumbnailId: string; at: number };

export function PageEditor({ page, onCancel, onSaved, onBusy }: {
  page: DashboardPage | null;
  onCancel: () => void;
  onSaved: (page: OutreachPage) => void;
  onBusy: (busy: boolean) => void;
}) {
  const [video, setVideo] = useState<File>();
  const [thumbnail, setThumbnail] = useState<File>();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const draftId = useRef<string | null>(null);
  const uploaded = useRef<Uploaded | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const editing = Boolean(page);
  const busy = Boolean(status);

  useEffect(() => { if (editing) nameInput.current?.focus(); }, [editing]);

  function validateFiles() {
    if (!page && !video) throw new Error('Choose a video to publish.');
    if (video && (video.size <= 0 || video.size > MAX_VIDEO_BYTES || !/\.mp4$/i.test(video.name))) {
      throw new Error('Choose an MP4 video up to 500 MB.');
    }
    if (thumbnail && (thumbnail.size <= 0 || thumbnail.size > MAX_THUMBNAIL_BYTES || !/\.(jpe?g|png|webp)$/i.test(thumbnail.name))) {
      throw new Error('Choose a JPG, PNG or WebP up to 8 MB.');
    }
  }

  async function sendMedia() {
    if (uploaded.current && Date.now() - uploaded.current.at < 75 * 60 * 1000) return uploaded.current;
    let videoId = page?.video_id;
    let thumbnailId = page?.thumbnail_id;
    if (video || thumbnail) {
      setStatus('Preparing media…');
      const [frame, customPoster] = await Promise.all([
        video ? prepareVideo(video, !thumbnail) : undefined,
        thumbnail ? prepareThumbnail(thumbnail) : undefined,
      ]);
      const poster = customPoster ?? frame;
      const { uploads } = await request<{ uploads: SignedUpload[] }>('uploads', 'POST', {
        videoBytes: video?.size,
        thumbnailBytes: poster?.size,
      });
      const total = (video?.size ?? 0) + (poster?.size ?? 0);
      const progress = { video: 0, thumbnail: 0 };
      setStatus('Uploading 0%…');
      // Upload the thumbnail first so the form can report a failure before sending the video.
      for (const upload of [...uploads].reverse()) {
        const file = upload.kind === 'video' ? video : poster;
        if (!file) throw new Error('The upload could not be started. Please try again.');
        await uploadFile(upload, file, bytes => {
          progress[upload.kind] = bytes;
          setStatus(`Uploading ${Math.min(100, Math.floor((progress.video + progress.thumbnail) * 100 / total))}%…`);
        });
        if (upload.kind === 'video') videoId = upload.id;
        else thumbnailId = upload.id;
      }
    }
    if (!videoId || !thumbnailId) throw new Error('The video or thumbnail is missing. Try again.');
    return uploaded.current = { videoId, thumbnailId, at: Date.now() };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    onBusy(true);
    setError('');
    const name = String(new FormData(event.currentTarget).get('name') ?? '').trim();
    try {
      if (!name) throw new Error('Enter the prospect’s name.');
      validateFiles();
      const { videoId, thumbnailId } = await sendMedia();
      setStatus(page ? 'Saving changes…' : 'Publishing…');
      const id = page?.id ?? (draftId.current ??= crypto.randomUUID());
      const { page: saved } = await request<{ page: OutreachPage }>('pages', page ? 'PATCH' : 'POST', {
        id, name, videoId, thumbnailId, revision: page?.revision,
      });
      onSaved(saved);
    } catch (error) {
      if (error instanceof RequestError && error.status === 409) uploaded.current = null;
      setError(error instanceof Error ? error.message : 'Couldn’t save the video page. Please try again.');
    } finally {
      setStatus('');
      onBusy(false);
    }
  }

  return <section className="outreach-editor" aria-labelledby="outreach-editor-title">
    <h2 id="outreach-editor-title">{page ? 'Edit video page' : 'Create a video page'}</h2>
    <form className="outreach-form" method="post" onSubmit={submit}>
      <label className="outreach-field">Prospect name
        <input ref={nameInput} name="name" defaultValue={page?.name ?? ''} required maxLength={100} disabled={busy} />
      </label>
      <label className="outreach-field">{page ? 'Replace video' : 'Video'}
        <input name="video" type="file" accept=".mp4,video/mp4" required={!page} disabled={busy}
          onChange={event => { uploaded.current = null; setVideo(event.target.files?.[0]); }} />
        <span className="outreach-help">H.264 MP4, up to 500 MB</span>
      </label>
      <label className="outreach-field"><span>Custom thumbnail <span className="outreach-help">(optional)</span></span>
        <input name="thumbnail" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" disabled={busy}
          onChange={event => { uploaded.current = null; setThumbnail(event.target.files?.[0]); }} />
        <span className="outreach-help">{page && !video ? 'Keep the current thumbnail or choose a new image.' : 'Uses a frame from your video by default.'}</span>
      </label>
      {error && <p className="outreach-error" role="alert">{error}</p>}
      <div className="outreach-form-actions">
        <button className="outreach-primary" type="submit" disabled={busy}>
          {page ? 'Save changes' : 'Publish'} <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        {page && <button type="button" className="outreach-secondary" onClick={onCancel} disabled={busy}>Cancel</button>}
      </div>
      <p className="outreach-upload-status" role="status">{status}</p>
    </form>
  </section>;
}
