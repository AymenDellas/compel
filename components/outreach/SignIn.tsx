'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { request } from './client';

export function SignIn() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      await request('session', 'POST', { password: form.get('password') });
      window.location.replace('/outreach');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign-in failed. Please try again.');
      setBusy(false);
    }
  }

  return <form className="outreach-form" method="post" action="/api/outreach/session" onSubmit={submit}>
    <label className="outreach-field">Admin passphrase
      <input type="password" name="password" autoComplete="current-password" required maxLength={256} disabled={busy} />
    </label>
    {error && <p role="alert" className="outreach-error">{error}</p>}
    <button type="submit" className="outreach-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ArrowRight size={16} aria-hidden="true" /></button>
  </form>;
}
