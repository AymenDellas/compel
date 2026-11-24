import { cookies } from 'next/headers';
import { outreachRoute, OutreachError, readJson, requireOrigin } from '@/lib/outreach/http';
import { issueAdminSession, loginFingerprint, sameSecret, sessionAge, sessionCookie, sessionOptions } from '@/lib/outreach/security';
import { claimLoginAttempt } from '@/lib/outreach/store';

export function POST(request: Request) {
  return outreachRoute(async () => {
    requireOrigin(request);
    const { password } = await readJson(request);
    if (typeof password !== 'string' || password.length > 256) throw new OutreachError(400, 'Enter your passphrase.');
    if (!(await claimLoginAttempt(loginFingerprint(request)))) {
      throw new OutreachError(429, 'Too many sign-in attempts. Try again in 15 minutes.');
    }
    if (!sameSecret(password, process.env.OUTREACH_ADMIN_PASSWORD!)) throw new OutreachError(401, 'That passphrase is incorrect.');
    (await cookies()).set(sessionCookie, issueAdminSession(), { ...sessionOptions, maxAge: sessionAge });
    return new Response(null, { status: 204 });
  });
}

export function DELETE(request: Request) {
  return outreachRoute(async () => {
    requireOrigin(request);
    (await cookies()).set(sessionCookie, '', { ...sessionOptions, maxAge: 0 });
    return new Response(null, { status: 204 });
  });
}
