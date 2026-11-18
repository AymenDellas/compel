'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CompelLogo from './CompelLogo';
import { ReviewButton } from './ReviewButton';

export const Navbar = () => {
  const pathname = usePathname();
  if (pathname === '/proposals' || pathname.startsWith('/proposals/')) return null;
  return <>
    <a href="#main-content" className="studio-skip">Skip to content</a>
    <header className={`studio-header ${pathname === '/' ? 'studio-header-home' : ''}`}>
      <nav className="studio-navigation" aria-label="Main navigation">
        <Link href={pathname === '/' ? '#beginning' : '/'} className="studio-wordmark" aria-label="Compel home"><CompelLogo width={116} /></Link>
        <ReviewButton className="studio-button-nav" />
      </nav>
    </header>
  </>;
};
