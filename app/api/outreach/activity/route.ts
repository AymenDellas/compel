import { outreachRoute, OutreachError, readJson, requireOrigin } from '@/lib/outreach/http';
import { readVisit } from '@/lib/outreach/security';
import { recordActivity } from '@/lib/outreach/store';

function metric(value: unknown, maximum: number) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > maximum) {
    throw new OutreachError(400, 'Invalid activity.');
  }
  return value;
}

export function POST(request: Request) {
  return outreachRoute(async () => {
    requireOrigin(request);
    const { ticket, plays, watchedMs, completion } = await readJson(request);
    const visit = typeof ticket === 'string' && ticket.length < 256 ? readVisit(ticket) : null;
    if (!visit) throw new OutreachError(401, 'Invalid visit.');
    await recordActivity({ ...visit, plays: metric(plays, 1000), watchedMs: metric(watchedMs, 86_400_000), completion: metric(completion, 100) });
    return new Response(null, { status: 204 });
  });
}
