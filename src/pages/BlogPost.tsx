import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Wrench,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { useToast } from '../context/ToastContext';
import { getBaseUrl } from '../utils/config';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentIndex = BLOG_ARTICLES.findIndex(a => a.slug === slug);
  const article = BLOG_ARTICLES[currentIndex];

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  const relatedArticles = BLOG_ARTICLES.filter(a =>
    article.relatedSlugs.includes(a.slug)
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.shortDescription,
          url: window.location.href
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      addToast('Article URL copied to clipboard!', 'success');
    }
  };

  const baseUrl = getBaseUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.shortDescription,
    image: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
    datePublished: article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEOFlow Tools',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <SEOHead
        title={article.title}
        description={article.shortDescription}
        canonicalPath={`/blog/${article.slug}`}
        ogType="article"
        ogImage={article.image}
        publishedTime={article.publishDate}
        jsonLd={articleJsonLd}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { name: 'SEO Blog', path: '/blog' },
          { name: article.title }
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
            {article.category}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Guide #{article.imageNumber}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.18]">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          {article.shortDescription}
        </p>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-2 border-y border-stone-200/80 dark:border-stone-850 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
              <User className="w-4 h-4 text-emerald-600" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-400" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-400" />
              {article.readingTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="overflow-hidden rounded-3xl bg-stone-100 dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800/90 shadow-sm aspect-[16/9] relative">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
          onError={e => {
            (e.currentTarget as HTMLImageElement).src = '/images/blog/article-1-url-shortener.svg';
          }}
        />
      </div>

      {/* Interactive Table of Contents */}
      {article.toc && article.toc.length > 0 && (
        <nav aria-label="Table of Contents" className="p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Table of Contents</span>
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {article.toc.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 py-0.5"
                >
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 w-4">
                    {idx + 1}.
                  </span>
                  <span className="truncate">{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Main Article Content */}
      <article
        className="prose-article bg-white dark:bg-[#151E19] p-6 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Related Tool Call-To-Action Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-[#112219] dark:to-[#0d1c15] border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            <Wrench className="w-3.5 h-3.5" />
            <span>Recommended Free Tool</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            Try the {article.relatedToolName}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Put the actionable advice from this guide into practice immediately. Completely free, no sign-up or credit card required.
          </p>
        </div>
        <Link
          to={article.relatedToolPath}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm shrink-0"
        >
          <span>Launch Tool Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Article FAQs Accordion */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {article.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#151E19] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-600' : 'text-stone-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-850 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Previous / Next Article Navigation */}
      <nav aria-label="Previous and Next Articles" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevArticle ? (
          <Link
            to={`/blog/${prevArticle.slug}`}
            className="group p-5 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/60 dark:hover:border-emerald-600/60 transition-all text-left flex flex-col justify-between"
          >
            <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 flex items-center gap-1 mb-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Guide</span>
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {prevArticle.title}
            </span>
          </Link>
        ) : <div />}

        {nextArticle ? (
          <Link
            to={`/blog/${nextArticle.slug}`}
            className="group p-5 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/60 dark:hover:border-emerald-600/60 transition-all text-right flex flex-col justify-between items-end"
          >
            <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 flex items-center gap-1 mb-1">
              <span>Next Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {nextArticle.title}
            </span>
          </Link>
        ) : <div />}
      </nav>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-stone-200/80 dark:border-stone-850">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
            Related Guides You Might Find Helpful
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map(rel => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="group p-4 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 hover:border-emerald-500/60 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5 bg-stone-100 dark:bg-[#151E19]">
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                </div>
                <div className="pt-2 text-xs text-stone-400 flex items-center justify-between">
                  <span>{rel.readingTime}</span>
                  <span className="text-emerald-600 font-semibold group-hover:transtone-x-0.5 transition-transform flex items-center">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
