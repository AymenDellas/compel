import { randomUUID } from 'node:crypto';
import { adminRoute, OutreachError, readJson } from '@/lib/outreach/http';
import { MAX_THUMBNAIL_BYTES, MAX_VIDEO_BYTES, type MediaKind } from '@/lib/outreach/model';
import { reserveUploads } from '@/lib/outreach/store';
import { signUpload, type Upload } from '@/lib/outreach/storage';

function makeUpload(kind: MediaKind, bytes: unknown, max: number): Upload | null {
  if (bytes === undefined) return null;
  if (typeof bytes !== 'number' || !Number.isInteger(bytes) || bytes <= 0 || bytes > max) {
    throw new OutreachError(400, kind === 'video' ? 'Choose an MP4 video up to 500 MB.' : 'Choose a thumbnail up to 8 MB.');
  }
  return { id: randomUUID(), kind, bytes };
}

export function POST(request: Request) {
  return adminRoute(request, async () => {
    const { videoBytes, thumbnailBytes } = await readJson(request);
    const uploads = [makeUpload('video', videoBytes, MAX_VIDEO_BYTES), makeUpload('thumbnail', thumbnailBytes, MAX_THUMBNAIL_BYTES)]
      .filter((upload): upload is Upload => upload !== null);
    if (!uploads.length) throw new OutreachError(400, 'Select a file to upload.');
    await reserveUploads(uploads);
    return Response.json({ uploads: await Promise.all(uploads.map(signUpload)) });
  });
}
