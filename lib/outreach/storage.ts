import 'server-only';
import { AwsClient } from 'aws4fetch';
import { THUMBNAIL_MIME, VIDEO_MIME, type MediaKind } from './model';
import { OutreachError } from './http';

export type Upload = { id: string; kind: MediaKind; bytes: number };
const cacheControl = 'private, no-store';
let client: AwsClient;

function storage() {
  return client ??= new AwsClient({
    accessKeyId: process.env.OUTREACH_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.OUTREACH_R2_SECRET_ACCESS_KEY!,
    service: 's3',
    region: 'auto',
    retries: 2,
  });
}

function objectUrl(id: string) {
  const endpoint = process.env.OUTREACH_STORAGE_ENDPOINT ?? `https://${process.env.OUTREACH_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  return new URL(`/${process.env.OUTREACH_R2_BUCKET}/outreach/${id}`, endpoint);
}

const mime = (kind: MediaKind) => kind === 'video' ? VIDEO_MIME : THUMBNAIL_MIME;

export async function signUpload(upload: Upload) {
  const url = objectUrl(upload.id);
  url.searchParams.set('X-Amz-Expires', '1200');
  const headers = { 'Content-Type': mime(upload.kind), 'Cache-Control': cacheControl, 'If-None-Match': '*' };
  const request = await storage().sign(url, {
    method: 'PUT',
    headers: { ...headers, 'Content-Length': String(upload.bytes) },
    aws: { signQuery: true, allHeaders: true },
  });
  return { id: upload.id, kind: upload.kind, url: request.url, headers };
}

export async function verifyUpload(upload: Upload) {
  const response = await storage().fetch(objectUrl(upload.id), { method: 'HEAD', signal: AbortSignal.timeout(8000) });
  if (response.status === 404) throw new OutreachError(409, 'An upload is missing. Please upload the files again.');
  if (!response.ok) throw new Error(`Media verification failed (${response.status})`);
  if (response.headers.get('content-length') !== String(upload.bytes) || response.headers.get('content-type') !== mime(upload.kind)) {
    throw new OutreachError(409, 'The uploaded file differs from the selected file. Please upload the files again.');
  }
}

export async function signRead(id: string, method: 'GET' | 'HEAD') {
  const url = objectUrl(id);
  url.searchParams.set('X-Amz-Expires', '900');
  const signed = await storage().sign(url, { method, aws: { signQuery: true } });
  return signed.url;
}

export async function removeAsset(id: string) {
  const response = await storage().fetch(objectUrl(id), { method: 'DELETE', signal: AbortSignal.timeout(8000) });
  if (!response.ok && response.status !== 404) throw new Error(`Media cleanup failed (${response.status})`);
}
