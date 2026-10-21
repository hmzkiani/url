import React, { useState, useMemo } from 'react';
import { Compass, RotateCcw, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const UtmBuilder: React.FC = () => {
  const [url, setUrl] = useState('https://example.com/landing-page');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('spring_launch');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const presets = [
    { name: 'Google Ads (CPC)', source: 'google', medium: 'cpc', campaign: 'brand_search' },
    { name: 'Facebook Ad', source: 'facebook', medium: 'paid_social', campaign: 'retargeting' },
    { name: 'Email Newsletter', source: 'newsletter', medium: 'email', campaign: 'weekly_digest' },
    { name: 'LinkedIn Post', source: 'linkedin', medium: 'social', campaign: 'product_announcement' },
    { name: 'Twitter / X Post', source: 'twitter', medium: 'social', campaign: 'launch_tweet' }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setSource(preset.source);
    setMedium(preset.medium);
    setCampaign(preset.campaign);
  };

  const generatedUrl = useMemo(() => {
    let base = url.trim();
    if (!base) return '';
    if (!/^https?:\/\//i.test(base)) {
      base = 'https://' + base;
    }

    try {
      const parsed = new URL(base);
      if (source.trim()) parsed.searchParams.set('utm_source', source.trim());
      if (medium.trim()) parsed.searchParams.set('utm_medium', medium.trim());
      if (campaign.trim()) parsed.searchParams.set('utm_campaign', campaign.trim());
      if (term.trim()) parsed.searchParams.set('utm_term', term.trim());
      if (content.trim()) parsed.searchParams.set('utm_content', content.trim());
      return parsed.toString();
    } catch {
      return '';
    }
  }, [url, source, medium, campaign, term, content]);

  const handleReset = () => {
    setUrl('');
    setSource('');
    setMedium('');
    setCampaign('');
    setTerm('');
    setContent('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="UTM Campaign Link Builder for Google Analytics"
        description="Generate correctly encoded campaign URLs with UTM parameters (source, medium, campaign, term, content) for Google Analytics tracking."
        canonicalPath="/utm-builder"
      />

      <Breadcrumb
        items={[
          { name: 'URL & Redirect Tools', path: '/tools?category=urls' },
          { name: 'UTM Link Builder' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          UTM Campaign Link Builder
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Build URL-encoded tracking links for Google Analytics (GA4) and track marketing campaign effectiveness.
        </p>
      </div>

      {/* Main Builder Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Quick Presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Quick Channel Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="utm-website"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Website Destination URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="utm-website"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/pricing"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label
              htmlFor="utm-source"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Campaign Source <span className="text-rose-500">*</span> (<code>utm_source</code>)
            </label>
            <input
              type="text"
              id="utm-source"
              required
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="e.g. google, newsletter, facebook"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="utm-medium"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Campaign Medium <span className="text-rose-500">*</span> (<code>utm_medium</code>)
            </label>
            <input
              type="text"
              id="utm-medium"
              required
              value={medium}
              onChange={e => setMedium(e.target.value)}
              placeholder="e.g. cpc, email, social, banner"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="utm-campaign"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Campaign Name (<code>utm_campaign</code>)
            </label>
            <input
              type="text"
              id="utm-campaign"
              value={campaign}
              onChange={e => setCampaign(e.target.value)}
              placeholder="e.g. spring_sale, webinar_2026"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="utm-term"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Campaign Term <span className="text-stone-400 font-normal lowercase">(optional)</span> (<code>utm_term</code>)
            </label>
            <input
              type="text"
              id="utm-term"
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="e.g. running+shoes"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="utm-content"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Campaign Content <span className="text-stone-400 font-normal lowercase">(optional)</span> (<code>utm_content</code>)
            </label>
            <input
              type="text"
              id="utm-content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="e.g. header_banner, blue_cta_button"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Live Generated URL Box */}
        {generatedUrl && (
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Generated Campaign URL
              </span>
              <div className="flex items-center gap-2">
                <CopyButton text={generatedUrl} label="Copy URL" variant="primary" />
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  title="Test link in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-[#151E19] rounded-xl border border-stone-200 dark:border-stone-800 font-mono text-xs text-stone-800 dark:text-stone-200 break-all select-all">
              {generatedUrl}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Fields</span>
          </button>
        </div>
      </div>
    </div>
  );
};
