import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const SlugGenerator: React.FC = () => {
  const [title, setTitle] = useState('How to Build a Successful On-Page SEO Strategy in 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState<number>(60);

  const slug = useMemo(() => {
    let str = title.trim();
    if (!str) return '';

    if (lowercase) {
      str = str.toLowerCase();
    }

    // Normalize accents / diacritics
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Stop words
    if (removeStopWords) {
      const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
      const words = str.split(/\s+/);
      str = words.filter(w => !stopWords.includes(w.toLowerCase())).join(' ');
    }

    if (removeNumbers) {
      str = str.replace(/[0-9]/g, '');
    }

    // Replace non-alphanumeric with separator
    str = str.replace(/[^a-zA-Z0-9]+/g, separator);

    // Remove leading/trailing separator
    const sepEscaped = separator === '-' ? '\\-' : separator;
    str = str.replace(new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, 'g'), '');

    if (maxLength > 0 && str.length > maxLength) {
      str = str.slice(0, maxLength).replace(new RegExp(`${sepEscaped}+$`, 'g'), '');
    }

    return str;
  }, [title, separator, lowercase, removeStopWords, removeNumbers, maxLength]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free URL Slug Generator & Permalink Cleaner"
        description="Convert blog titles, product names, and headlines into clean, lowercase, SEO-friendly URL slugs."
        canonicalPath="/slug-generator"
      />

      <Breadcrumb
        items={[
          { name: 'Text & Website Utilities', path: '/tools?category=utilities' },
          { name: 'URL Slug Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          URL Slug Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Turn headlines and article titles into clean, search-engine-optimized URL permalinks.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="slug-title-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
            Page Title or Headline
          </label>
          <input
            type="text"
            id="slug-title-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <div>
            <label className="block text-stone-500 font-semibold mb-1">Separator</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSeparator('-')}
                className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                  separator === '-'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                }`}
              >
                Hyphen (-)
              </button>
              <button
                type="button"
                onClick={() => setSeparator('_')}
                className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                  separator === '_'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                }`}
              >
                Underscore (_)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-stone-500 font-semibold mb-1">Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={e => setMaxLength(Number(e.target.value))}
              min={10}
              max={150}
              className="w-full px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
            />
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={e => setRemoveStopWords(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-stone-700 dark:text-stone-300">Remove stop words</span>
            </label>
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeNumbers}
                onChange={e => setRemoveNumbers(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-stone-700 dark:text-stone-300">Strip numbers</span>
            </label>
          </div>
        </div>

        {/* Generated Slug Banner */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Clean URL Slug ({slug.length} chars)
            </span>
            <CopyButton text={slug} label="Copy Slug" variant="primary" />
          </div>

          <div className="p-3.5 bg-white dark:bg-[#151E19] rounded-xl border border-stone-200 dark:border-stone-800 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 break-all select-all">
            {slug || '[Enter a title above to generate a slug]'}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Example URL: <code>https://example.com/{slug || 'my-slug'}</code>
          </span>
        </div>
      </div>
    </div>
  );
};
