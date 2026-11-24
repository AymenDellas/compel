import { MAX_VIDEO_SECONDS, THUMBNAIL_MIME, type MediaKind } from '@/lib/outreach/model';

export class RequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function request<T = void>(path: string, method: string, body?: object): Promise<T> {
  const response = await fetch(`/api/outreach/${path}`, {
    method,
    cache: 'no-store',
    ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
  });
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) throw new RequestError(response.status, data?.error ?? 'The request failed. Please try again.');
  return data as T;
}

export type SignedUpload = { id: string; kind: MediaKind; url: string; headers: Record<string, string> };

export function uploadFile(upload: SignedUpload, file: Blob, progress: (bytes: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', upload.url);
    xhr.timeout = 20 * 60 * 1000;
    for (const [name, value] of Object.entries(upload.headers)) xhr.setRequestHeader(name, value);
    const fail = () => reject(new Error(`The ${upload.kind} upload failed. Check your connection and try again.`));
    xhr.upload.onprogress = event => progress(event.loaded);
    xhr.onerror = fail;
    xhr.ontimeout = fail;
    xhr.onabort = fail;
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) { fail(); return; }
      progress(file.size);
      resolve();
    };
    xhr.send(file);
  });
}

function waitForVideo(video: HTMLVideoElement, event: string) {
  return new Promise<void>((resolve, reject) => {
    const controller = new AbortController();
    const finish = (error?: Error) => {
      window.clearTimeout(timeout);
      controller.abort();
      if (error) reject(error); else resolve();
    };
    const fail = () => finish(new Error('This video could not be opened. Export it as an H.264 MP4 and try again.'));
    const timeout = window.setTimeout(fail, 15_000);
    video.addEventListener(event, () => finish(), { once: true, signal: controller.signal });
    video.addEventListener('error', fail, { once: true, signal: controller.signal });
  });
}

function toPoster(source: CanvasImageSource, width: number, height: number) {
  if (!width || !height) throw new Error('Couldn’t prepare the thumbnail. Choose another image.');
  const scale = Math.min(1, 1280 / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Couldn’t prepare the thumbnail in this browser.');
  context.fillStyle = '#090b08';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Couldn’t prepare the thumbnail.')), THUMBNAIL_MIME, 0.86);
  });
}

export async function prepareVideo(file: File, captureFrame: boolean) {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  try {
    const metadata = waitForVideo(video, 'loadedmetadata');
    video.src = url;
    await metadata;
    if (!Number.isFinite(video.duration) || video.duration <= 0 || !video.videoWidth || !video.videoHeight) {
      throw new Error('Choose an MP4 with a playable video track.');
    }
    if (video.duration > MAX_VIDEO_SECONDS) throw new Error('Choose a video no longer than four hours.');
    const seeked = waitForVideo(video, 'seeked');
    video.currentTime = Math.min(1.5, video.duration * 0.12);
    await seeked;
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) await waitForVideo(video, 'loadeddata');
    return captureFrame ? await toPoster(video, video.videoWidth, video.videoHeight) : undefined;
  } finally {
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(url);
  }
}

export async function prepareThumbnail(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode().catch(() => { throw new Error('This thumbnail couldn’t be opened. Choose a JPG, PNG or WebP.'); });
    return await toPoster(image, image.naturalWidth, image.naturalHeight);
  } finally {
    URL.revokeObjectURL(url);
  }
}
