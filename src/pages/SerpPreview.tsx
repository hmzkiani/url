import React, { useState } from 'react';
import { Eye, Smartphone, Monitor, Copy, RotateCcw, Info, Globe } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const SerpPreview: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [title, setTitle] = useState('Best Free SEO Tools 2026 - SEOFlow Tools');
  const [description, setDescription] = useState(
    'Discover 24+ completely free SEO tools and link utilities. Analyze on-page SEO, shorten links with QR codes, generate XML sitemaps, and optimize content effortlessly.'
  );
  const [displayUrl, setDisplayUrl] = useState('https://seoflowtools.com/free-seo-tools');

  const maxTitleChars = device === 'desktop' ? 60 : 55;
  const maxDescChars = device === 'desktop' ? 160 : 120;

  const handleReset = () => {
    setTitle('SEOFlow Tools | Free Website SEO Checker');
    setDescription('Analyze your website, optimize content, create short links, and simplify your SEO workflow with 100% free online tools.');
    setDisplayUrl('https://example.com/tools');
  };

  // Format breadcrumb-style display URL
  const formatDisplayUrl = (raw: string) => {
    try {
      const parsed = new URL(raw.startsWith('http') ? raw : 'https://' + raw);
      const pathParts = parsed.pathname.split('/').filter(Boolean);
      return (
        <span className="flex items-center gap-1 font-sans text-xs text-stone-700 dark:text-stone-300">
          <span className="font-medium text-stone-800 dark:text-stone-200">{parsed.hostname}</span>
          {pathParts.map((p, i) => (
            <React.Fragment key={i}>
              <span className="text-stone-400">›</span>
              <span className="text-stone-500 dark:text-stone-400">{p}</span>
            </React.Fragment>
          ))}
        </span>
      );
    } catch {
      return <span className="text-xs text-stone-600 dark:text-stone-400">{raw}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Google SERP Search Result Snippet Preview"
        description="Simulate how your page title, meta description, and display URL appear in Google Search desktop and mobile snippets."
        canonicalPath="/serp-preview"
      />

      <Breadcrumb
        items={[
          { name: 'Website SEO Analysis', path: '/tools?category=seo' },
          { name: 'Google SERP Preview' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Google SERP Preview
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Preview how your title and description will look on Google search results pages across desktop and mobile screens.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Device Toggle */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                device === 'desktop'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                device === 'mobile'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <CopyButton
              text={`Title: ${title}\nDescription: ${description}\nURL: ${displayUrl}`}
              label="Copy Snippet"
              variant="secondary"
            />
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
              title="Reset fields"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Search Snippet Card Simulation */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Google {device === 'desktop' ? 'Desktop' : 'Mobile'} Result Simulator
          </span>

          <div
            className={`p-6 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 shadow-sm transition-all ${
              device === 'mobile' ? 'max-w-md mx-auto' : 'w-full'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">{formatDisplayUrl(displayUrl)}</div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-normal text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug line-clamp-2">
                {title || 'Your SEO Title Goes Here'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {description || 'Enter a meta description to see how it will preview in Google search snippets.'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Controls with Character & Pixel Guidance */}
        <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="serp-title" className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                SEO Title
              </label>
              <span className={`text-xs font-mono ${title.length > maxTitleChars ? 'text-amber-500 font-bold' : 'text-stone-400'}`}>
                {title.length}/{maxTitleChars} chars {title.length > maxTitleChars ? '(Likely truncated)' : ''}
              </span>
            </div>
            <input
              type="text"
              id="serp-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="serp-desc" className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Meta Description
              </label>
              <span className={`text-xs font-mono ${description.length > maxDescChars ? 'text-amber-500 font-bold' : 'text-stone-400'}`}>
                {description.length}/{maxDescChars} chars {description.length > maxDescChars ? '(May be clipped)' : ''}
              </span>
            </div>
            <textarea
              id="serp-desc"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="serp-url" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Display URL
            </label>
            <input
              type="text"
              id="serp-url"
              value={displayUrl}
              onChange={e => setDisplayUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Clear Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>Preview Simulation Notice</span>
          </div>
          <p>
            This tool provides an accurate visual approximation based on typical Google pixel-width constraints (~600px on desktop, ~480px on mobile). Google search algorithms dynamically test and sometimes rewrite titles or choose different page excerpts based on the user's search query.
          </p>
        </div>
      </div>
    </div>
  );
};
