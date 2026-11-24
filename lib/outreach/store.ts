import 'server-only';
import { neon } from '@neondatabase/serverless';
import { OutreachError } from './http';
import type { DashboardPage, OutreachPage } from './model';
import { removeAsset, verifyUpload, type Upload } from './storage';

let database: ReturnType<typeof neon<false, false>>;
const sql = () => database ??= neon(process.env.OUTREACH_DATABASE_URL!);

export async function getPage(id: string) {
  const [page] = await sql()`SELECT * FROM outreach_pages WHERE id = ${id}`;
  return page as OutreachPage | undefined;
}

export async function listPages() {
  const pages = await sql()`
    SELECT p.*, count(a.visit_id)::int AS visits,
      coalesce(sum(a.plays) FILTER (WHERE a.video_id = p.video_id), 0)::float8 AS plays,
      coalesce(sum(a.watched_ms) FILTER (WHERE a.video_id = p.video_id), 0)::float8 AS watched_ms,
      coalesce(max(a.completion) FILTER (WHERE a.video_id = p.video_id), 0)::int AS completion,
      max(a.last_activity) AS last_activity
    FROM outreach_pages p LEFT JOIN outreach_activity a ON a.page_id = p.id
    GROUP BY p.id ORDER BY p.created_at DESC`;
  return pages as DashboardPage[];
}

export async function reserveUploads(uploads: Upload[]) {
  const query = sql();
  await query.transaction(uploads.map(({ id, kind, bytes }) =>
    query`INSERT INTO outreach_assets (id, kind, bytes) VALUES (${id}, ${kind}, ${bytes})`));
}

type PageChange = { id: string; name: string; videoId: string; thumbnailId: string; revision?: number };

export async function savePage({ id, name, videoId, thumbnailId, revision }: PageChange) {
  const current = await getPage(id);
  if (current?.name === name && current.video_id === videoId && current.thumbnail_id === thumbnailId) return current;
  if (revision !== undefined && !current) throw new OutreachError(404, 'This video page was deleted.');
  if (current?.revision !== revision) throw new OutreachError(409, 'This page changed. Refresh the list before editing it.');

  const changed = [
    [{ id: videoId, kind: 'video' }, current?.video_id],
    [{ id: thumbnailId, kind: 'thumbnail' }, current?.thumbnail_id],
  ] as const;
  const required = changed.filter(([asset, previous]) => asset.id !== previous).map(([asset]) => asset);
  if (required.length) {
    const assets = await sql()`SELECT id, kind, bytes FROM outreach_assets
      WHERE id = ANY(${required.map(asset => asset.id)}::uuid[]) AND state = 'pending' AND expires_at > now()`;
    if (!required.every(asset => assets.some(row => row.id === asset.id && row.kind === asset.kind))) {
      throw new OutreachError(409, 'An upload expired or is already in use. Please upload the files again.');
    }
    await Promise.all((assets as Upload[]).map(verifyUpload));
  }

  try {
    const [page] = revision === undefined
      ? await sql()`INSERT INTO outreach_pages (id, name, video_id, thumbnail_id)
          VALUES (${id}, ${name}, ${videoId}, ${thumbnailId}) ON CONFLICT (id) DO NOTHING RETURNING *`
      : await sql()`UPDATE outreach_pages SET name = ${name}, video_id = ${videoId}, thumbnail_id = ${thumbnailId},
          revision = revision + 1, updated_at = now() WHERE id = ${id} AND revision = ${revision} RETURNING *`;
    if (page) return page as OutreachPage;
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code !== 'P0001' && code !== '23505' && code !== '23503') throw error;
    throw new OutreachError(409, 'An upload expired or is already in use. Please upload the files again.');
  }
  const saved = await getPage(id);
  if (saved?.name === name && saved.video_id === videoId && saved.thumbnail_id === thumbnailId) return saved;
  throw new OutreachError(409, 'This page changed. Refresh the list before editing it.');
}

export async function deletePage(id: string, revision: number) {
  const [removed] = await sql()`DELETE FROM outreach_pages WHERE id = ${id} AND revision = ${revision} RETURNING id`;
  if (!removed && await getPage(id)) throw new OutreachError(409, 'This page changed. Refresh the list before deleting it.');
}

export async function claimLoginAttempt(fingerprint: string) {
  const windowStart = Math.floor(Date.now() / 900_000) * 900;
  const [attempt] = await sql()`INSERT INTO outreach_login_attempts (fingerprint, window_start, attempts)
    VALUES (${fingerprint}, ${windowStart}, 1)
    ON CONFLICT (fingerprint, window_start) DO UPDATE SET attempts = outreach_login_attempts.attempts + 1
    WHERE outreach_login_attempts.attempts < 10 RETURNING attempts`;
  return Boolean(attempt);
}

export type VisitSnapshot = { pageId: string; videoId: string; visitId: string; plays: number; watchedMs: number; completion: number };

export async function recordActivity({ pageId, videoId, visitId, plays, watchedMs, completion }: VisitSnapshot) {
  try {
    await sql()`INSERT INTO outreach_activity AS a (page_id, video_id, visit_id, plays, watched_ms, completion)
      SELECT id, video_id, ${visitId}, ${plays}, ${watchedMs}, ${completion}
      FROM outreach_pages WHERE id = ${pageId} AND video_id = ${videoId}
      ON CONFLICT (page_id, visit_id) DO UPDATE SET
        plays = greatest(a.plays, excluded.plays), watched_ms = greatest(a.watched_ms, excluded.watched_ms),
        completion = greatest(a.completion, excluded.completion), last_activity = now()
      WHERE excluded.plays > a.plays OR excluded.watched_ms > a.watched_ms OR excluded.completion > a.completion`;
  } catch (error) {
    // An in-flight event can race with deletion of its parent page.
    if ((error as { code?: string }).code !== '23503') throw error;
  }
}

export async function cleanExpiredUploads() {
  const assets = await sql()`UPDATE outreach_assets SET state = 'retired'
    WHERE id IN (SELECT id FROM outreach_assets WHERE state <> 'attached' AND expires_at <= now()
      ORDER BY expires_at LIMIT 50 FOR UPDATE SKIP LOCKED)
    RETURNING id`;
  // Keep the database rows until storage confirms deletion, so failures can be retried.
  for (let offset = 0; offset < assets.length; offset += 8) {
    const batch = await Promise.allSettled(assets.slice(offset, offset + 8).map(async ({ id }) => {
      await removeAsset(id);
      return id as string;
    }));
    const removed = batch.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
    if (removed.length) await sql()`DELETE FROM outreach_assets WHERE id = ANY(${removed}::uuid[]) AND state = 'retired'`;
    if (removed.length !== batch.length) console.error('Some outreach uploads could not be removed.');
  }
  await sql()`DELETE FROM outreach_login_attempts WHERE window_start < extract(epoch FROM now() - interval '1 day')`;
}
