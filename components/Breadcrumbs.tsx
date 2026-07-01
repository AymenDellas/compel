import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-6xl mx-auto px-6 pt-24 pb-0"
    >
      <ol className="flex items-center gap-2 text-xs font-mono text-neutral-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-neutral-700" aria-hidden="true">/</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-300" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
