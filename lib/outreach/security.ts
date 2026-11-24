import 'server-only';
import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import { cookies } from 'next/headers';
import { isId } from './model';

const secure = process.env.NODE_ENV === 'production';
export const sessionCookie = secure ? '__Host-compel-outreach' : 'compel-outreach';
export const sessionAge = 8 * 60 * 60;
export const sessionOptions = { httpOnly: true, secure, sameSite: 'strict' as const, path: '/' };

export function configured() {
  const passwordLength = process.env.OUTREACH_ADMIN_PASSWORD?.length ?? 0;
  return Boolean(process.env.OUTREACH_DATABASE_URL && process.env.OUTREACH_R2_BUCKET
    && (process.env.OUTREACH_R2_ACCOUNT_ID || process.env.OUTREACH_STORAGE_ENDPOINT)
    && process.env.OUTREACH_R2_ACCESS_KEY_ID && process.env.OUTREACH_R2_SECRET_ACCESS_KEY
    && passwordLength >= 24 && passwordLength <= 256
    && (process.env.OUTREACH_SIGNING_SECRET?.length ?? 0) >= 32);
}

export function sameSecret(left: string, right: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(left), digest(right));
}

function sign(purpose: string, payload: string) {
  return createHmac('sha256', process.env.OUTREACH_SIGNING_SECRET!).update(`${purpose}\n${payload}`).digest('base64url');
}

function issue(purpose: string, fields: string[], seconds: number) {
  const payload = [...fields, String(Math.floor(Date.now() / 1000) + seconds)].join('.');
  return `${payload}.${sign(purpose, payload)}`;
}

function read(purpose: string, token: string, arity: number) {
  const parts = token.split('.');
  if (parts.length !== arity + 2) return null;
  const signature = parts.pop()!;
  if (!sameSecret(signature, sign(purpose, parts.join('.')))) return null;
  const expires = Number(parts.pop());
  return expires > Math.floor(Date.now() / 1000) ? parts : null;
}

const adminPurpose = () => `admin:${createHash('sha256').update(process.env.OUTREACH_ADMIN_PASSWORD!).digest('hex')}`;

export function issueAdminSession() {
  return issue(adminPurpose(), [randomUUID()], sessionAge);
}

export async function isAdmin() {
  if (!configured()) return false;
  const token = (await cookies()).get(sessionCookie)?.value;
  return Boolean(token && read(adminPurpose(), token, 1));
}

export function issueVisit(pageId: string, videoId: string) {
  return issue('visit', [pageId, videoId, randomUUID()], 24 * 60 * 60);
}

export function readVisit(token: string) {
  const fields = read('visit', token, 3);
  if (!fields || !fields.every(isId)) return null;
  const [pageId, videoId, visitId] = fields;
  return { pageId, videoId, visitId };
}

export function loginFingerprint(request: Request) {
  const address = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : null;
  return sign('login', address && isIP(address) ? address : 'default');
}

export function sameOrigin(request: Request) {
  try {
    const origin = new URL(request.headers.get('origin') ?? '');
    const host = request.headers.get('host');
    const local = origin.hostname === 'localhost' || origin.hostname === '127.0.0.1' || origin.hostname === '[::1]';
    return origin.host === host && (origin.protocol === 'https:' || (local && origin.protocol === 'http:'))
      && (!request.headers.has('sec-fetch-site') || request.headers.get('sec-fetch-site') === 'same-origin');
  } catch {
    return false;
  }
}
