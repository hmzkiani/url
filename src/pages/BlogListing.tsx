import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Tag,
  ChevronRight
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

export const BlogListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_ARTICLES.map(a => a.category)));
    return ['all', ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = BLOG_ARTICLES[0];
  const regularArticles =
    !searchQuery && selectedCategory === 'all'
      ? filteredArticles.slice(1)
      : filteredArticles;

  return (
    <div className="space-y-12">
      <SEOHead
        title="SEO Guides & Tutorials | SEOFlow Blog"
        description="Learn practical search engine optimization with free, in-depth tutorials on URL shortening, technical audits, meta tags, sitemaps, and robots.txt."
        canonicalPath="/blog"
      />

      <Breadcrumb items={[{ name: 'SEO Blog' }]} />

      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-2 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Practical Technical SEO Knowledge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          SEO Guides, Tutorials &amp; Best Practices
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Comprehensive, actionable guides to help website owners, bloggers, and developers master technical on-page SEO, link management, and crawl efficiency.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -transtone-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs text-sm transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#151E19] text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/60'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Hero (When no search filter is active) */}
      {!searchQuery && selectedCategory === 'all' && featuredArticle && (
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800/90 shadow-sm hover:shadow-md transition-all group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Featured Guide
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {featuredArticle.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                <Link to={`/blog/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {featuredArticle.shortDescription}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {featuredArticle.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {featuredArticle.readingTime}
                </span>
              </div>
              <div className="pt-2">
                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs group-hover:shadow-sm"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:transtone-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-2xl bg-stone-100 dark:bg-[#151E19] border border-stone-200/60 dark:border-stone-800 aspect-[16/9] lg:aspect-[4/3] relative">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="eager"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = '/images/blog/article-1-url-shortener.svg';
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            {searchQuery ? `Search Results (${filteredArticles.length})` : 'All Articles'}
          </h2>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Showing {filteredArticles.length} guides
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#151E19] rounded-3xl border border-stone-200/80 dark:border-stone-800 p-8">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">No articles found</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1">
              We couldn't find any guides matching "{searchQuery}". Try searching for another topic or clear filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularArticles.map(article => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between bg-white dark:bg-[#151E19] rounded-2xl border border-stone-200/80 dark:border-stone-800/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-600/60 hover:-transtone-y-1 transition-all duration-200 overflow-hidden"
              >
                <div>
                  {/* Article Thumbnail */}
                  <Link to={`/blog/${article.slug}`} className="block overflow-hidden aspect-[16/9] bg-stone-100 dark:bg-[#151E19] relative">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src = '/images/blog/article-1-url-shortener.svg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-900/80 backdrop-blur-md text-white border border-white/20">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Article Meta & Title */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {article.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {article.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-400 dark:text-stone-500 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Free Guide</span>
                  </span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 group-hover:transtone-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
