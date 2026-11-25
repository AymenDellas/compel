import { type NextRequest } from 'next/server';
import { outreachRoute, OutreachError } from '@/lib/outreach/http';
import { isId } from '@/lib/outreach/model';
import { getPage } from '@/lib/outreach/store';
import { signRead } from '@/lib/outreach/storage';

export function GET(request: NextRequest, { params }: { params: Promise<{ id: string; kind: string }> }) {
  return outreachRoute(async () => {
    const { id, kind } = await params;
    if (!isId(id) || (kind !== 'video' && kind !== 'thumbnail')) throw new OutreachError(404, 'Media unavailable.');
    const page = await getPage(id);
    const asset = kind === 'video' ? page?.video_id : page?.thumbnail_id;
    if (!asset || asset !== request.nextUrl.searchParams.get('asset')) throw new OutreachError(404, 'Media unavailable.');
    const method = request.method === 'HEAD' ? 'HEAD' : 'GET';
    const { url } = await signRead(asset, method);
    return new Response(null, { status: 307, headers: { Location: url } });
  });
}

export const HEAD = GET;
