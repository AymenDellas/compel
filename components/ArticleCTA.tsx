import Link from 'next/link';

export default function ArticleCTA() {
  return (
    <div className="mt-16 mb-8 p-8 bg-blue-600 text-white rounded-2xl shadow-xl text-center">
      <h3 className="text-3xl font-bold mb-4">
        Stop guessing, start scaling.
      </h3>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
        Let us build your performance-based acquisition funnel for $0 upfront.
      </p>
      <Link 
        href="/"
        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Get Started Today
      </Link>
    </div>
  );
}
