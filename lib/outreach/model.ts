export const SHARE_ORIGIN = 'https://getcompel.co';
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_BYTES = 8 * 1024 * 1024;
export const MAX_VIDEO_SECONDS = 4 * 60 * 60;
export const VIDEO_MIME = 'video/mp4';
export const THUMBNAIL_MIME = 'image/jpeg';

export type MediaKind = 'video' | 'thumbnail';

export type OutreachPage = {
  id: string;
  name: string;
  revision: number;
  video_id: string;
  thumbnail_id: string;
  created_at: string;
  updated_at: string;
};

export type DashboardPage = OutreachPage & {
  visits: number;
  plays: number;
  watched_ms: number;
  completion: number;
  last_activity: string | null;
};

export function isId(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);
}

export function watchPath(id: string) {
  return `/watch/${id}`;
}

export function mediaPath(id: string, kind: MediaKind, assetId: string) {
  return `/api/outreach/watch/${id}/${kind}?asset=${assetId}`;
}
