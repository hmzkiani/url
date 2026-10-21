import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

export const AllTools: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some(k => k.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <SEOHead
        title="All Free SEO Tools & Utilities"
        description="Browse all 24+ free SEO tools, URL shorteners, schema generators, and link checkers. No API keys or paid subscriptions required."
        canonicalPath="/tools"
      />

      <Breadcrumb items={[{ name: 'All Tools' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          All Free SEO Tools
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400">
          Explore our complete directory of free web utilities, on-page SEO checkers, link builders, and structured data generators.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-stone-400" />
          <input
            type="text"
            id="all-tools-search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by tool name, purpose, or keyword (e.g. sitemap, schema, redirect, alt)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-xs font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1 hidden sm:block" />
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-[#151E19] text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`ml-1.5 text-[11px] opacity-80 ${selectedCategory === cat.id ? 'text-emerald-100' : 'text-stone-400'}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tool Count Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
        <span>
          Showing <strong className="text-stone-800 dark:text-stone-200">{filteredTools.length}</strong> {filteredTools.length === 1 ? 'tool' : 'tools'}
        </span>
        {searchQuery && (
          <span>
            Filtered for &ldquo;<span className="text-emerald-600 dark:text-emerald-400 font-medium">{searchQuery}</span>&rdquo;
          </span>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800">
          <p className="text-base font-semibold text-stone-800 dark:text-stone-200">
            No tools found matching your criteria.
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Try adjusting your search query or reset category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
