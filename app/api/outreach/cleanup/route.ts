import { outreachRoute, OutreachError } from '@/lib/outreach/http';
import { sameSecret } from '@/lib/outreach/security';
import { cleanExpiredUploads } from '@/lib/outreach/store';

export const maxDuration = 60;

export function GET(request: Request) {
  return outreachRoute(async () => {
    const secret = process.env.CRON_SECRET;
    if (!secret || !sameSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) {
      throw new OutreachError(401, 'Unauthorized.');
    }
    await cleanExpiredUploads();
    return new Response(null, { status: 204 });
  });
}
