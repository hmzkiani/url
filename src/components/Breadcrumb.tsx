import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs sm:text-sm text-stone-500 dark:text-stone-400">
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-400 dark:text-stone-600 shrink-0" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors truncate"
            >
              {item.name}
            </Link>
          ) : (
            <span className="font-semibold text-stone-850 dark:text-stone-200 truncate">
              {item.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
