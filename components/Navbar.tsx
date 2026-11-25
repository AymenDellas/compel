'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CompelLogo from './CompelLogo';
import { ReviewButton } from './ReviewButton';
import { ReviewDisclosure } from './home/ReviewDisclosure';
import { isPrivateSitePath } from '@/lib/private-site-path';

export const Navbar = () => {
  const pathname = usePathname();
  if (isPrivateSitePath(pathname)) return null;
  return <>
    <a href="#main-content" className="studio-skip">Skip to content</a>
    <header className="studio-header">
      <nav className="studio-navigation" aria-label="Main navigation">
        <Link href={pathname === '/' ? '#beginning' : '/'} className="studio-wordmark" aria-label="Compel home"><CompelLogo width={116} /></Link>
        {pathname === '/'
          ? <ReviewDisclosure nav />
          : <ReviewButton className="studio-button-nav" label="Get a free review" />}
      </nav>
    </header>
  </>;
};
