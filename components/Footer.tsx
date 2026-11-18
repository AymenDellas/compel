import Link from 'next/link';

/** Essential business and legal links, without a separate marketing section. */
export default function Footer() {
  return (
    <footer className="site-colophon studio-wrap">
      <p>© {new Date().getFullYear()} Compel</p>
      <nav aria-label="Business and legal information">
        <Link href="/about">About</Link>
        <Link href="/learn">Journal</Link>
        <a href="mailto:aymen@getcompel.co">Contact</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
