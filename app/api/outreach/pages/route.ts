import { adminRoute, OutreachError, readJson } from '@/lib/outreach/http';
import { isId } from '@/lib/outreach/model';
import { deletePage, listPages, savePage } from '@/lib/outreach/store';

export function GET(request: Request) {
  return adminRoute(request, async () => Response.json({ pages: await listPages() }));
}

function revisionOf(value: unknown) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value >= 2147483647) {
    throw new OutreachError(400, 'Invalid page revision.');
  }
  return value;
}

function save(request: Request, editing: boolean) {
  return adminRoute(request, async () => {
    const { id, name, videoId, thumbnailId, revision } = await readJson(request);
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 100 || /[\u0000-\u001f\u007f]/.test(name)) {
      throw new OutreachError(400, 'Enter a prospect name up to 100 characters.');
    }
    if (!isId(id) || !isId(videoId) || !isId(thumbnailId)) throw new OutreachError(400, 'Choose a video and thumbnail.');
    const page = await savePage({ id, name: name.trim(), videoId, thumbnailId, revision: editing ? revisionOf(revision) : undefined });
    return Response.json({ page }, { status: editing ? 200 : 201 });
  });
}

export const POST = (request: Request) => save(request, false);
export const PATCH = (request: Request) => save(request, true);

export function DELETE(request: Request) {
  return adminRoute(request, async () => {
    const { id, revision } = await readJson(request);
    if (!isId(id)) throw new OutreachError(400, 'Invalid video page.');
    await deletePage(id, revisionOf(revision));
    return new Response(null, { status: 204 });
  });
}
