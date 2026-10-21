import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, RotateCcw, Info, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

interface ValidationResult {
  valid: boolean;
  type: 'urlset' | 'sitemapindex' | 'unknown';
  totalUrls: number;
  errors: string[];
  warnings: string[];
  urlsSample: string[];
}

export const SitemapValidator: React.FC = () => {
  const [xmlInput, setXmlInput] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-02-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);

  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = xmlInput.trim();
    if (!raw) {
      setResult(null);
      return;
    }

    const errors: string[] = [];
    const warnings: string[] = [];
    const urlsSample: string[] = [];

    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(raw, 'text/xml');

    // Check parser errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      errors.push('Malformed XML: ' + parserError.textContent?.slice(0, 150));
      setResult({
        valid: false,
        type: 'unknown',
        totalUrls: 0,
        errors,
        warnings,
        urlsSample: []
      });
      return;
    }

    let type: 'urlset' | 'sitemapindex' | 'unknown' = 'unknown';
    if (xmlDoc.querySelector('urlset')) {
      type = 'urlset';
    } else if (xmlDoc.querySelector('sitemapindex')) {
      type = 'sitemapindex';
    } else {
      errors.push('Missing valid root tag. Sitemaps must have either a <urlset> or <sitemapindex> root element.');
    }

    if (type === 'urlset') {
      const urlNodes = Array.from(xmlDoc.querySelectorAll('url'));
      if (urlNodes.length === 0) {
        warnings.push('The <urlset> root was found but contains 0 <url> tags.');
      }

      urlNodes.forEach((node, i) => {
        const loc = node.querySelector('loc');
        if (!loc || !loc.textContent?.trim()) {
          errors.push(`URL #${i + 1} is missing a required <loc> tag.`);
        } else {
          const locText = loc.textContent.trim();
          if (urlsSample.length < 8) urlsSample.push(locText);
          try {
            const u = new URL(locText);
            if (u.protocol !== 'http:' && u.protocol !== 'https:') {
              errors.push(`URL "${locText}" uses an unsupported protocol (${u.protocol}). Only HTTP and HTTPS are permitted.`);
            }
          } catch {
            errors.push(`URL "${locText}" is not a valid absolute URL.`);
          }
        }

        const priority = node.querySelector('priority');
        if (priority && priority.textContent) {
          const val = parseFloat(priority.textContent.trim());
          if (isNaN(val) || val < 0.0 || val > 1.0) {
            warnings.push(`URL #${i + 1} has an invalid <priority> value "${priority.textContent}". Priority must be between 0.0 and 1.0.`);
          }
        }
      });
    }

    setResult({
      valid: errors.length === 0,
      type,
      totalUrls: type === 'urlset' ? xmlDoc.querySelectorAll('url').length : xmlDoc.querySelectorAll('sitemap').length,
      errors,
      warnings,
      urlsSample
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free XML Sitemap Validator & Syntax Tester"
        description="Validate XML sitemap syntax, verify sitemaps.org standards, check URL formatting, and detect indexing errors."
        canonicalPath="/sitemap-validator"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'Sitemap Validator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          XML Sitemap Validator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Paste your XML sitemap to check XML schema structure, validate &lt;loc&gt; formatting, and catch errors before search engines crawl your file.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label htmlFor="sitemap-xml-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Paste XML Sitemap Code
            </label>
            <textarea
              id="sitemap-xml-input"
              rows={8}
              required
              value={xmlInput}
              onChange={e => setXmlInput(e.target.value)}
              placeholder="<?xml version='1.0' encoding='UTF-8'?><urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>...</urlset>"
              className="w-full p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">
              Tested against sitemaps.org XML 0.9 schema standard
            </span>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                Validate Sitemap
              </button>
              <button
                type="button"
                onClick={() => {
                  setXmlInput('');
                  setResult(null);
                }}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Validation Results */}
        {result && (
          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 animate-in fade-in duration-150">
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                result.valid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {result.valid ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    {result.valid ? 'Valid XML Sitemap Structure!' : 'Sitemap Validation Issues Found'}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    Root type: <code>&lt;{result.type}&gt;</code> • {result.totalUrls} {result.totalUrls === 1 ? 'entry' : 'entries'} parsed
                  </div>
                </div>
              </div>
            </div>

            {/* Errors List */}
            {result.errors.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Validation Errors ({result.errors.length})</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {result.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings List */}
            {result.warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Warnings ({result.warnings.length})</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {result.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
