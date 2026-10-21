import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Link as LinkIcon,
  SearchCheck,
  FileText,
  Map,
  Code2,
  Sliders,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { SEOHead } from '../components/SEOHead';
import { BLOG_ARTICLES } from '../data/blogArticles';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const filteredTools = searchQuery.trim()
    ? TOOLS.filter(
        t =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const popularTools = TOOLS.filter(t =>
    ['url-shortener', 'seo-analyzer', 'schema-generator', 'meta-tag-generator', 'sitemap-generator', 'redirect-generator'].includes(t.id)
  );

  const latestArticles = BLOG_ARTICLES.slice(0, 3);

  const categories = [
    {
      title: 'URL Shortener & Redirects',
      description: 'Create short links, generate QR codes, trace redirect chains, and build UTM campaign links.',
      icon: <LinkIcon className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=urls',
      count: '5 tools'
    },
    {
      title: 'Website SEO Analysis',
      description: 'Audit on-page SEO factors, preview search snippets, and test Open Graph social media cards.',
      icon: <SearchCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=seo',
      count: '3 tools'
    },
    {
      title: 'Keyword & Content Tools',
      description: 'Check keyword density, generate question suggestions, calculate readability, and count words.',
      icon: <FileText className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=content',
      count: '5 tools'
    },
    {
      title: 'Meta Tags & Technical SEO',
      description: 'Generate XML sitemaps, robots.txt directives, canonical checks, and HTTP status guides.',
      icon: <Map className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=technical',
      count: '6 tools'
    },
    {
      title: 'Schema Markup Tools',
      description: 'Create clean JSON-LD structured data for Articles, FAQs, Local Businesses, and Products.',
      icon: <Code2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=schema',
      count: 'Essential tool'
    },
    {
      title: 'Text & Website Utilities',
      description: 'Format image ALT text, clean URL slugs, parse domain query parameters, and encode URLs.',
      icon: <Sliders className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      link: '/tools?category=utilities',
      count: '4 tools'
    }
  ];

  const faqs = [
    {
      question: 'Are all SEOFlow tools truly free to use?',
      answer:
        'Yes, 100% free. You will never be asked for a credit card, paid subscription, or API key. All utilities run directly in your browser or through our lightweight, free companion service.'
    },
    {
      question: 'How does the URL shortener work?',
      answer:
        'The URL shortener creates a compact, safe link with an optional custom alias and instant QR code. During local use, links are saved in your browser storage and redirected via the /r/:code route. In production deployment, links can be served directly from our companion backend.'
    },
    {
      question: 'Do any of your tools track personal browsing data?',
      answer:
        'No. We prioritize local-first processing. Text analyzers, sitemap generators, word counters, and schema creators run entirely in your local browser memory. We do not inject tracking or advertising pixels.'
    },
    {
      question: 'Can SEO tools guarantee a #1 rank on Google?',
      answer:
        'No tool can guarantee Google rankings. Search engine algorithms evaluate hundreds of factors including content relevance, backlinks, and user intent. SEOFlow Tools provides accurate, transparent technical guidance and on-page best practices to optimize your website structure.'
    },
    {
      question: 'What happens if a website blocks automated crawlers during SEO analysis?',
      answer:
        'Some servers block automated requests via firewalls or anti-bot protections (like Cloudflare). When that occurs, SEOFlow Tools clearly displays the connection error and allows you to paste the page HTML directly for instant local auditing.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      <SEOHead
        title="Free SEO Tools to Improve Your Website"
        description="Analyze your website, optimize your content, create short links, and simplify your SEO workflow with free online tools."
        canonicalPath="/"
      />

      {/* Redesigned Hero Section with Integrated Image */}
      <section className="pt-4 sm:pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in duration-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Forever • No API Keys • No Sign-up Required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.12]">
              Free SEO Tools to <span className="text-emerald-700 dark:text-emerald-400">Improve</span> Your Website
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              Analyze your website, optimize your content, create short links, and simplify your SEO workflow with 24+ free, privacy-first online tools.
            </p>

            {/* Live Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-stone-400" />
                <input
                  type="text"
                  id="hero-search-input"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 24+ tools (e.g. sitemap, schema, redirect)..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/90 dark:border-stone-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm sm:text-base text-stone-900 dark:text-white transition-all placeholder-stone-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-xs font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Search Dropdown */}
              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl max-h-96 overflow-y-auto z-30 p-2 text-left">
                  {filteredTools.length > 0 ? (
                    filteredTools.map(tool => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/70 transition-colors"
                      >
                        <div className="mt-0.5 p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-white">
                            {tool.name}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-stone-500">
                      No tools found matching "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/tools"
                id="hero-explore-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <span>Explore All 24+ Free Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/url-shortener"
                id="hero-shorten-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#151E19] hover:bg-stone-50 dark:hover:bg-stone-850 text-stone-700 dark:text-stone-200 font-semibold text-sm border border-stone-200/90 dark:border-stone-800 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <span>Shorten a URL &amp; QR</span>
                <LinkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </Link>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#151E19]/80 border border-stone-200/70 dark:border-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">No API Keys Needed</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#151E19]/80 border border-stone-200/70 dark:border-stone-800">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Local-First Speed</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#151E19]/80 border border-stone-200/70 dark:border-stone-800">
                <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Zero Paywalls</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image (User Supplied Homepage Image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle ambient glow behind the image */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-xl pointer-events-none" />

              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/90 dark:border-stone-800 shadow-md">
                <img
                  src="/images/homepage-hero.jpg"
                  alt="Modern workspace featuring desktop computer analyzing website search engine optimization metrics"
                  className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl"
                  loading="eager"
                  onError={e => {
                    // Fallback if image path was missing
                    (e.currentTarget as HTMLImageElement).src = '/images/blog/article-2-seo-audit.png';
                  }}
                />
                <div className="p-4 bg-white/95 dark:bg-[#151E19]/95 backdrop-blur-md border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Website Performance Studio
                  </span>
                  <span className="text-stone-400 dark:text-stone-500">100% Free Suite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Explore by Category
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Find the right utility for your search engine optimization, content auditing, and link management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-600/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:transtone-x-1 transition-transform">
                <span>View tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
              Popular Tools
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              The most widely used utilities for website audits and link workflows.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Browse all 24+ tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Latest Blog Articles Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SEO Knowledge Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
              Latest Guides &amp; Tutorials
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              In-depth articles written by technical specialists to help you master search optimization.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>View all 10 guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between bg-white dark:bg-[#151E19] rounded-2xl border border-stone-200/80 dark:border-stone-800/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 dark:hover:border-emerald-600/60 hover:-transtone-y-1 transition-all duration-200 overflow-hidden"
            >
              <div>
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

                <div className="p-6 space-y-2.5">
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

                  <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {article.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-400 dark:text-stone-500">Read in {article.readingTime}</span>
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
      </section>

      {/* How It Works Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Fast &amp; Straightforward
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            No registration, no credit cards, and no complex configuration. Get work done in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-lg flex items-center justify-center mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
              1
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">
              Select Your Tool
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Choose from 24+ free utilities for URL shortening, on-page SEO, technical sitemaps, or readability.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 font-bold text-lg flex items-center justify-center mb-4 border border-teal-200/60 dark:border-teal-800/60">
              2
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">
              Enter URL or Content
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Input your destination link, text, or website address. Calculations happen instantly in your browser.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 font-bold text-lg flex items-center justify-center mb-4 border border-stone-200/60 dark:border-stone-700">
              3
            </div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">
              Copy, Download, or Apply
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Copy generated sitemaps, short links, QR codes, or JSON-LD schema markups directly to your project.
            </p>
          </div>
        </div>
      </section>

      {/* Why Use SEOFlow Tools Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Why Use SEOFlow Tools?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400">
            A clean, privacy-conscious alternative to bloated marketing suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                Transparent, Rules-Based Audits
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We evaluate real on-page HTML factors without inventing proprietary scores or pretending to have private Google crawler data.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                Zero Ads, Zero User Tracking
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Enjoy a distraction-free workspace. No interstitial video ads, no sponsored pop-ups, and no marketing cookies.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                Mobile-Friendly &amp; Accessible
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Every tool works seamlessly across phones, tablets, and desktops with high-contrast light and dark modes.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                Standards-Compliant Outputs
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Outputs strictly follow W3C, Schema.org, and sitemaps.org guidelines for maximum search engine compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Clear, honest answers about our tools and data handling.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#151E19] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 focus:outline-none"
                aria-expanded={faqOpen === idx}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                    faqOpen === idx ? 'rotate-180 text-emerald-700 dark:text-emerald-400' : ''
                  }`}
                />
              </button>
              {faqOpen === idx && (
                <div className="px-5 pb-5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-850 pt-4 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-emerald-800 via-emerald-900 to-teal-950 text-white text-center shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Optimize Your Website?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Start using our free SEO toolkit and link utilities today. No downloads, no subscriptions, and no delays.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/tools"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-800 font-semibold text-sm hover:bg-emerald-50 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              Browse All Free Tools
            </Link>
            <Link
              to="/blog"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-400/40 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              Read SEO Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
