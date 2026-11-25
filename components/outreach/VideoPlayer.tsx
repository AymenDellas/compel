'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

type Stats = { plays: number; watchedMs: number; completion: number };
type Sample = { time: number; position: number; rate: number };

function coverage(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
  const ranges = video.played;
  let seconds = 0;
  for (let index = 0; index < ranges.length; index++) seconds += ranges.end(index) - ranges.start(index);
  const fraction = seconds / video.duration;
  return fraction >= 0.999 ? 100 : Math.min(99, Math.floor(fraction * 100));
}

export function VideoPlayer({ preparedVideo, videoUrl, thumbnailUrl, ticket }: {
  preparedVideo: { url: string; expiresAt: number };
  videoUrl: string;
  thumbnailUrl: string;
  ticket?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stats = useRef<Stats>({ plays: 0, watchedMs: 0, completion: 0 });
  const sample = useRef<Sample | null>(null);
  const active = useRef(false);
  const replay = useRef(false);
  const attempt = useRef(0);
  const playbackRequested = useRef(false);
  const resumeAt = useRef(0);
  const restoreFocus = useRef(false);
  const lastSent = useRef('');
  const [state, setState] = useState<'ready' | 'loading' | 'playing' | 'error'>('ready');
  const [hasThumbnail, setHasThumbnail] = useState(true);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !ticket) return;
    const next = { time: performance.now(), position: video.currentTime, rate: video.playbackRate };
    const previous = sample.current;
    if (active.current && previous && !video.seeking) {
      const progressedMs = (next.position - previous.position) * 1000 / previous.rate;
      if (progressedMs > 0) stats.current.watchedMs += Math.min(progressedMs, next.time - previous.time);
    }
    sample.current = active.current ? next : null;
    stats.current.completion = Math.max(stats.current.completion, coverage(video));
  }, [ticket]);

  const send = useCallback(() => {
    if (!ticket) return;
    const { plays, watchedMs, completion } = stats.current;
    const body = JSON.stringify({ ticket, plays: Math.min(plays, 1000), watchedMs: Math.min(Math.floor(watchedMs), 86_400_000), completion });
    if (body === lastSent.current) return;
    lastSent.current = body;
    void fetch('/api/outreach/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
      .then(response => { if (response.status >= 500 && lastSent.current === body) lastSent.current = ''; })
      .catch(() => { if (lastSent.current === body) lastSent.current = ''; });
  }, [ticket]);

  useEffect(() => {
    if (!ticket) return;
    let visited = false;
    const visitOrFlush = () => {
      if (document.visibilityState === 'visible') visited = true;
      if (visited) { capture(); send(); }
    };
    const flush = () => { if (visited) { capture(); send(); } };
    visitOrFlush();
    document.addEventListener('visibilitychange', visitOrFlush);
    window.addEventListener('pagehide', flush);
    const timer = window.setInterval(() => { if (active.current) flush(); }, 15_000);
    return () => {
      document.removeEventListener('visibilitychange', visitOrFlush);
      window.removeEventListener('pagehide', flush);
      window.clearInterval(timer);
    };
  }, [capture, send, ticket]);

  function stop(flush: boolean) {
    capture();
    active.current = false;
    sample.current = null;
    if (flush && stats.current.plays) send();
  }

  function startPlayback(video: HTMLVideoElement, refresh: boolean) {
    setState('loading');
    if (refresh) video.src = `${videoUrl}&attempt=${++attempt.current}`;
    const currentAttempt = attempt.current;
    void video.play().catch(error => {
      if (currentAttempt !== attempt.current || video.error || error?.name === 'AbortError') return;
      // If playback needs another user gesture, expose the native play control.
      setState('playing');
      requestAnimationFrame(() => video.focus());
    });
  }

  function play() {
    const video = videoRef.current;
    if (!video) return;
    playbackRequested.current = true;
    restoreFocus.current = true;
    const expiring = Date.now() + 10_000 >= preparedVideo.expiresAt;
    startPlayback(video, Boolean(video.error) || state === 'error' || expiring);
  }

  function playing() {
    setState('playing');
    if (restoreFocus.current) {
      restoreFocus.current = false;
      requestAnimationFrame(() => videoRef.current?.focus());
    }
    active.current = true;
    capture();
    if (!stats.current.plays || replay.current) {
      replay.current = false;
      stats.current.plays++;
      send();
    }
  }

  function failed() {
    const video = videoRef.current;
    if (!video || !playbackRequested.current) return;
    if (Number.isFinite(video.currentTime) && video.currentTime > 0) resumeAt.current = video.currentTime;
    stop(true);
    // A rejected prepared link gets one fresh attempt through the page's media route.
    if (!attempt.current && !stats.current.plays) {
      startPlayback(video, true);
      return;
    }
    setState('error');
  }

  return <div className="watch-stage" data-state={state}>
    {state !== 'playing' && hasThumbnail && (
      // Keep private media out of the image optimizer and its shared cache.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="watch-poster" src={thumbnailUrl} alt="" onError={() => setHasThumbnail(false)} />
    )}
    <video ref={videoRef} src={preparedVideo.url} controls={state === 'playing'} preload="metadata" playsInline aria-label="Personalized video"
      tabIndex={state === 'playing' ? 0 : -1} onPlaying={playing} onTimeUpdate={capture} onRateChange={capture}
      onPause={() => stop(true)} onWaiting={() => stop(false)} onSeeking={() => { sample.current = null; }}
      onSeeked={capture} onEnded={() => { replay.current = true; stop(true); }} onError={failed}
      onLoadedMetadata={event => {
        if (resumeAt.current > 0 && resumeAt.current < event.currentTarget.duration) {
          event.currentTarget.currentTime = resumeAt.current;
          resumeAt.current = 0;
        }
      }} />
    {state !== 'playing' && <div className="watch-overlay">
      {state === 'loading' ? <p role="status" className="watch-video-note">Loading video…</p> : <>
        <button className="watch-play" type="button" onClick={play} aria-label={state === 'error' ? 'Retry video' : 'Play video'}>
          {state === 'error' ? <RotateCcw size={26} aria-hidden="true" /> : <Play size={28} fill="currentColor" aria-hidden="true" />}
        </button>
        {state === 'error' && <p className="watch-video-note" role="alert">Couldn’t play the video. Try again.</p>}
      </>}
    </div>}
  </div>;
}
