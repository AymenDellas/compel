import CompelLogo from '@/components/CompelLogo';
import { Dashboard } from '@/components/outreach/Dashboard';
import { SignIn } from '@/components/outreach/SignIn';
import { configured, isAdmin } from '@/lib/outreach/security';
import { listPages } from '@/lib/outreach/store';

export const dynamic = 'force-dynamic';

export default async function OutreachDashboard() {
  if (await isAdmin()) return <Dashboard initialPages={await listPages()} />;
  return <main className="outreach-root outreach-login" id="main-content">
    <div className="outreach-login-inner">
      <CompelLogo width={108} />
      <h1>Video outreach</h1>
      {configured() ? <SignIn /> : <p className="outreach-error">The outreach dashboard is unavailable.</p>}
    </div>
  </main>;
}
