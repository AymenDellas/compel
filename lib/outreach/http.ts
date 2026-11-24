import 'server-only';
import { configured, isAdmin, sameOrigin } from './security';

export class OutreachError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get('content-type')?.startsWith('application/json') || !request.body) {
    throw new OutreachError(400, 'Expected a JSON request.');
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  let bytes = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 4096) {
      void reader.cancel();
      throw new OutreachError(413, 'This request is too large.');
    }
    text += decoder.decode(value, { stream: true });
  }
  try {
    const body = JSON.parse(text + decoder.decode());
    if (body && typeof body === 'object' && !Array.isArray(body)) return body;
  } catch { /* Invalid input is handled below. */ }
  throw new OutreachError(400, 'Invalid request.');
}

export async function outreachRoute(action: () => Promise<Response>) {
  try {
    if (!configured()) throw new OutreachError(503, 'Video outreach is unavailable.');
    return await action();
  } catch (error) {
    if (error instanceof OutreachError) return Response.json({ error: error.message }, { status: error.status });
    console.error('Outreach request failed', error instanceof Error ? error.name : typeof error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export function requireOrigin(request: Request) {
  if (!sameOrigin(request)) throw new OutreachError(403, 'This request is not allowed.');
}

export function adminRoute(request: Request, action: () => Promise<Response>) {
  return outreachRoute(async () => {
    if (request.method !== 'GET') requireOrigin(request);
    if (!(await isAdmin())) throw new OutreachError(401, 'Sign in to manage your video pages.');
    return action();
  });
}
