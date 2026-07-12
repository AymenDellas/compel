import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-neutral-300">Page Not Found</h2>
      <p className="text-neutral-400 max-w-md mb-8 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="bg-[#C8F135] text-black font-semibold rounded-lg px-8 py-3 hover:bg-[#b5da30] transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
