import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Compass, Search, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const NotFound: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <SEOHead
        title="Page Not Found (404) - SEOFlow Tools"
        description="The requested page could not be found. Explore 24+ free SEO tools and link utilities on SEOFlow Tools."
      />

      <div className="max-w-md w-full bg-white dark:bg-[#151E19] rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-2xl flex items-center justify-center mx-auto">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            The page or tool you are looking for doesn't exist, has been moved, or the link may be mistyped.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a tool (e.g. sitemap, schema)..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 p-1 text-stone-400 hover:text-emerald-600"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            to="/"
            id="notfound-home-btn"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/tools"
            id="notfound-tools-btn"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-semibold text-xs transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
