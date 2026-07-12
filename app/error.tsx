'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">Something went wrong</h1>
      <p className="text-neutral-400 max-w-md mb-8 text-lg">
        We apologize for the inconvenience. An unexpected error occurred.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-neutral-800 text-white font-semibold rounded-lg px-6 py-3 hover:bg-neutral-700 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="bg-[#C8F135] text-black font-semibold rounded-lg px-6 py-3 hover:bg-[#b5da30] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
