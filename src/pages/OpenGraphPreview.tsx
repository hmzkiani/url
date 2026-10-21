import React, { useState } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const OpenGraphPreview: React.FC = () => {
  const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook');
  const [title, setTitle] = useState('SEOFlow Tools - Free Complete SEO Toolkit & URL Shortener');
  const [description, setDescription] = useState(
    'Analyze websites, optimize content, create short links with QR codes, and simplify your SEO workflow without paid subscriptions.'
  );
  const [url, setUrl] = useState('https://seoflowtools.com');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
  const [siteName, setSiteName] = useState('SEOFlow Tools');

  const metaTags = `<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:site_name" content="${siteName}">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">`;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Social Media Open Graph & Twitter Card Preview"
        description="Simulate how your webpage link cards will look when shared across Facebook, Twitter / X, and LinkedIn."
        canonicalPath="/open-graph-preview"
      />

      <Breadcrumb
        items={[
          { name: 'Website SEO Analysis', path: '/tools?category=seo' },
          { name: 'Open Graph Preview' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Open Graph Social Preview
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Preview how your links, titles, and thumbnails will appear when shared across Facebook, Twitter/X, and LinkedIn.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Platform Tabs */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'facebook', label: 'Facebook Card' },
              { id: 'twitter', label: 'Twitter / X Card' },
              { id: 'linkedin', label: 'LinkedIn Card' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPlatform(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  platform === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <CopyButton text={metaTags} label="Copy Meta Tags" variant="secondary" />
        </div>

        {/* Live Social Card Simulation */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            {platform.toUpperCase()} Sharing Card Preview
          </span>

          <div className="max-w-lg mx-auto bg-white dark:bg-[#151E19] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
            {/* Thumbnail Image */}
            <div className="relative aspect-[1.91/1] w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="OG Preview"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400 text-xs">
                  [No Image URL specified]
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-1 bg-stone-50 dark:bg-[#151E19]/90 border-t border-stone-100 dark:border-stone-800">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold truncate">
                {url ? new URL(url.startsWith('http') ? url : 'https://' + url).hostname : 'example.com'}
              </div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-white line-clamp-2 leading-snug">
                {title || 'Page Title'}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                {description || 'Page description'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
              Social Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
              Social Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
              Thumbnail Image URL (1200x630)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
              Target Destination URL
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
