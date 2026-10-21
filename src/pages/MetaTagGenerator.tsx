import React, { useState } from 'react';
import { FileCode2, RotateCcw, Copy, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState('SEOFlow Tools | Free SEO Toolkit & URL Shortener');
  const [description, setDescription] = useState('Analyze your website, optimize content, create short links, and simplify your SEO workflow with 100% free online tools.');
  const [canonical, setCanonical] = useState('https://example.com');
  const [robotsIndex, setRobotsIndex] = useState('index');
  const [robotsFollow, setRobotsFollow] = useState('follow');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('en');

  // Open Graph
  const [ogType, setOgType] = useState('website');
  const [ogImage, setOgImage] = useState('https://example.com/og-image.jpg');
  const [ogSiteName, setOgSiteName] = useState('SEOFlow Tools');

  // Twitter
  const [twitterCard, setTwitterCard] = useState('summary_large_image');
  const [twitterCreator, setTwitterCreator] = useState('@seoflowtools');

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="robots" content="${robotsIndex}, ${robotsFollow}">
<meta name="language" content="${language}">
${author ? `<meta name="author" content="${author}">\n` : ''}${canonical ? `<link rel="canonical" href="${canonical}">\n` : ''}
<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical || 'https://example.com'}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">\n` : ''}${ogSiteName ? `<meta property="og:site_name" content="${ogSiteName}">\n` : ''}
<!-- Twitter / X -->
<meta property="twitter:card" content="${twitterCard}">
<meta property="twitter:url" content="${canonical || 'https://example.com'}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
${ogImage ? `<meta property="twitter:image" content="${ogImage}">\n` : ''}${twitterCreator ? `<meta name="twitter:creator" content="${twitterCreator}">\n` : ''}`;

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setCanonical('');
    setAuthor('');
    setOgImage('');
    setTwitterCreator('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Meta Tag Generator (HTML, Open Graph, Twitter)"
        description="Generate standards-compliant HTML meta tags for SEO, Google Search, Facebook Open Graph, and Twitter/X Cards with live preview."
        canonicalPath="/meta-tag-generator"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'Meta Tag Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Meta Tag Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Create complete, standards-compliant HTML meta tags for Google Search, Facebook Open Graph, and Twitter/X cards.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Form Fields */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="meta-title" className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Page Title <span className="text-rose-500">*</span>
              </label>
              <span className={`text-xs font-mono ${title.length > 60 ? 'text-amber-500 font-bold' : 'text-stone-400'}`}>
                {title.length}/60 chars recommended
              </span>
            </div>
            <input
              type="text"
              id="meta-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Descriptive Title Here"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="meta-desc" className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Meta Description <span className="text-rose-500">*</span>
              </label>
              <span className={`text-xs font-mono ${description.length > 160 ? 'text-amber-500 font-bold' : 'text-stone-400'}`}>
                {description.length}/160 chars recommended
              </span>
            </div>
            <textarea
              id="meta-desc"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief summary of your webpage content (approx. 150-160 characters)"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Canonical & Robots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label htmlFor="meta-canonical" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Canonical URL
              </label>
              <input
                type="text"
                id="meta-canonical"
                value={canonical}
                onChange={e => setCanonical(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Robots Indexing
              </label>
              <select
                value={robotsIndex}
                onChange={e => setRobotsIndex(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="index">index (Allow Google indexing)</option>
                <option value="noindex">noindex (Block Google indexing)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Robots Links
              </label>
              <select
                value={robotsFollow}
                onChange={e => setRobotsFollow(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="follow">follow (Follow page links)</option>
                <option value="nofollow">nofollow (Do not follow links)</option>
              </select>
            </div>
          </div>

          {/* Social Media Details */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Social Media Open Graph & Twitter Cards
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="og-image" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Social Image URL (1200x630)
                </label>
                <input
                  type="text"
                  id="og-image"
                  value={ogImage}
                  onChange={e => setOgImage(e.target.value)}
                  placeholder="https://example.com/share.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Twitter Card Type
                </label>
                <select
                  value={twitterCard}
                  onChange={e => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
                >
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="summary">Summary Small Image</option>
                </select>
              </div>

              <div>
                <label htmlFor="twitter-handle" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  id="twitter-handle"
                  value={twitterCreator}
                  onChange={e => setTwitterCreator(e.target.value)}
                  placeholder="@handle"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Generated HTML Preview */}
        <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Generated HTML Code (Place in <code>&lt;head&gt;</code>)
            </span>
            <div className="flex items-center gap-2">
              <CopyButton text={generatedHtml} label="Copy HTML" variant="primary" />
              <button
                type="button"
                onClick={handleReset}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                title="Reset form"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
            <code>{generatedHtml}</code>
          </pre>
        </div>

        {/* Practical Guidance Notice */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>Search Engine Display Note</span>
          </div>
          <p>
            Character length counters are guidance to help prevent truncations on standard desktop and mobile screens. Google dynamically decides whether to display your exact meta description or an excerpt from the page body matching the searcher's query.
          </p>
        </div>
      </div>
    </div>
  );
};
