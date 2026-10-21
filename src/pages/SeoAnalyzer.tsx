import React, { useState } from 'react';
import {
  SearchCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Loader2,
  RotateCcw,
  Sparkles,
  Code2,
  Globe,
  ExternalLink
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { SeoAnalysisResult } from '../types';

export const SeoAnalyzer: React.FC = () => {
  const [mode, setMode] = useState<'url' | 'html'>('url');
  const [url, setUrl] = useState('');
  const [htmlInput, setHtmlInput] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete On-Page SEO Guide: Techniques & Best Practices</title>
  <meta name="description" content="Master search engine optimization with our comprehensive on-page SEO checklist. Learn heading structures, meta tags, image alt attributes, and technical site health.">
  <link rel="canonical" href="https://example.com/seo-guide">
  <meta property="og:title" content="Complete On-Page SEO Guide">
  <meta property="og:description" content="Master search engine optimization with our on-page SEO checklist.">
  <meta property="og:image" content="https://example.com/images/seo-guide.jpg">
</head>
<body>
  <h1>The Ultimate On-Page SEO Optimization Guide</h1>
  <h2>Why On-Page SEO Matters</h2>
  <p>On-page search engine optimization is the foundation of organic visibility...</p>
  <h2>Optimizing Heading Hierarchy</h2>
  <img src="https://example.com/images/infographic.png" alt="On-Page SEO Checklist Infographic">
  <img src="https://example.com/images/screenshot.png">
  <a href="/about">About Our SEO Team</a>
  <a href="https://google.com">Google Webmaster Guidelines</a>
</body>
</html>`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audit, setAudit] = useState<SeoAnalysisResult | null>(null);

  // Client-side HTML Parser fallback
  const parseHtmlClientSide = (html: string, pageUrl: string = ''): SeoAnalysisResult => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const titleEl = doc.querySelector('title');
    const title = titleEl ? titleEl.textContent?.trim() || '' : '';

    const metaDescEl = doc.querySelector('meta[name="description" i]');
    const metaDescription = metaDescEl ? metaDescEl.getAttribute('content')?.trim() || '' : '';

    const canonicalEl = doc.querySelector('link[rel="canonical" i]');
    const canonical = canonicalEl ? canonicalEl.getAttribute('href')?.trim() || '' : '';

    const robotsEl = doc.querySelector('meta[name="robots" i]');
    const robotsMeta = robotsEl ? robotsEl.getAttribute('content')?.trim() || '' : '';

    const viewportEl = doc.querySelector('meta[name="viewport" i]');
    const viewport = viewportEl ? viewportEl.getAttribute('content')?.trim() || '' : '';

    const charsetEl = doc.querySelector('meta[charset i]');
    const charset = charsetEl ? charsetEl.getAttribute('charset') || '' : '';

    const htmlTag = doc.querySelector('html');
    const language = htmlTag ? htmlTag.getAttribute('lang') || '' : '';

    const h1Nodes = Array.from(doc.querySelectorAll('h1')).map(h => h.textContent?.trim() || '').filter(Boolean);
    const h2Count = doc.querySelectorAll('h2').length;
    const h3Count = doc.querySelectorAll('h3').length;

    const imgNodes = Array.from(doc.querySelectorAll('img'));
    const totalImages = imgNodes.length;
    const missingAltImages: string[] = [];

    imgNodes.forEach(img => {
      const alt = img.getAttribute('alt');
      if (alt === null || alt.trim() === '') {
        if (missingAltImages.length < 10) {
          missingAltImages.push(img.getAttribute('src') || 'unnamed-image');
        }
      }
    });

    const openGraph: Record<string, string> = {};
    doc.querySelectorAll('meta[property^="og:" i]').forEach(m => {
      const prop = m.getAttribute('property')?.toLowerCase();
      const cont = m.getAttribute('content');
      if (prop && cont) openGraph[prop] = cont;
    });

    const twitter: Record<string, string> = {};
    doc.querySelectorAll('meta[name^="twitter:" i]').forEach(m => {
      const name = m.getAttribute('name')?.toLowerCase();
      const cont = m.getAttribute('content');
      if (name && cont) twitter[name] = cont;
    });

    let internalLinks = 0;
    let externalLinks = 0;
    let baseHost = '';
    try {
      if (pageUrl) baseHost = new URL(pageUrl).hostname;
    } catch {}

    doc.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;
      try {
        if (pageUrl) {
          const resolved = new URL(href, pageUrl);
          if (resolved.hostname === baseHost) internalLinks++;
          else externalLinks++;
        } else {
          if (href.startsWith('http://') || href.startsWith('https://')) externalLinks++;
          else internalLinks++;
        }
      } catch {
        internalLinks++;
      }
    });

    return {
      url: pageUrl || undefined,
      title,
      titleLength: title.length,
      metaDescription,
      metaDescriptionLength: metaDescription.length,
      canonical,
      robotsMeta,
      viewport,
      charset,
      language,
      h1: h1Nodes,
      h2Count,
      h3Count,
      totalImages,
      missingAltImages,
      internalLinks,
      externalLinks,
      openGraph,
      twitter,
      pageSizeBytes: html.length
    };
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAudit(null);

    if (mode === 'url') {
      let target = url.trim();
      if (!target) {
        setError('Please enter a website URL.');
        return;
      }
      if (!/^https?:\/\//i.test(target)) {
        target = 'https://' + target;
      }

      setLoading(true);

      try {
        const res = await fetch('/api/analyze-seo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: target })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with status ${res.status}`);
        }

        const data: SeoAnalysisResult = await res.json();
        setAudit(data);
      } catch (err: any) {
        setError(
          err.message ||
          'Could not analyze live URL. If the site is protected by Cloudflare bot protection or if the companion server is offline, switch to the "Paste HTML" tab above to run an instant client-side audit.'
        );
      } finally {
        setLoading(false);
      }
    } else {
      // HTML Paste Mode
      if (!htmlInput.trim()) {
        setError('Please paste your webpage HTML source code.');
        return;
      }
      setLoading(true);
      try {
        const result = parseHtmlClientSide(htmlInput);
        setAudit(result);
      } catch (err: any) {
        setError('Could not parse provided HTML: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setUrl('');
    setHtmlInput('');
    setError(null);
    setAudit(null);
  };

  // Compile Rules-based Checks
  const getChecks = (data: SeoAnalysisResult) => {
    const passed = [];
    const warnings = [];
    const issues = [];
    const recommendations = [];

    // Title Check
    if (!data.title) {
      issues.push('Missing <title> tag. Search engines require a title to understand and display your webpage.');
      recommendations.push('Add a unique <title> tag between 50 and 60 characters.');
    } else if (data.titleLength < 30) {
      warnings.push(`Title tag is short (${data.titleLength} characters). Ideal length is 50-60 characters.`);
      recommendations.push('Expand your title to include target keywords and brand identity.');
    } else if (data.titleLength > 65) {
      warnings.push(`Title tag is long (${data.titleLength} characters). Google will likely truncate it in search results.`);
      recommendations.push('Trim the title to under 60 characters to prevent truncation on mobile and desktop snippets.');
    } else {
      passed.push(`Title tag present and optimal length (${data.titleLength} characters).`);
    }

    // Meta Description Check
    if (!data.metaDescription) {
      issues.push('Missing meta description tag. Search engines may generate an arbitrary text snippet.');
      recommendations.push('Add an engaging meta description between 150 and 160 characters.');
    } else if (data.metaDescriptionLength < 70) {
      warnings.push(`Meta description is short (${data.metaDescriptionLength} characters). Recommended: 150-160 characters.`);
    } else if (data.metaDescriptionLength > 165) {
      warnings.push(`Meta description is long (${data.metaDescriptionLength} characters). May be clipped in search snippets.`);
    } else {
      passed.push(`Meta description present and well-proportioned (${data.metaDescriptionLength} characters).`);
    }

    // Heading Checks
    if (data.h1.length === 0) {
      issues.push('Missing H1 heading. Every webpage should have exactly one main H1 heading.');
      recommendations.push('Add a single <h1> heading describing the primary topic of the page.');
    } else if (data.h1.length > 1) {
      warnings.push(`Multiple H1 headings detected (${data.h1.length} found). It is best practice to use a single H1 per page.`);
      recommendations.push('Consolidate subheadings into <h2> and <h3> tags and keep only one primary <h1>.');
    } else {
      passed.push('Single H1 heading correctly defined.');
    }

    if (data.h2Count === 0) {
      warnings.push('No H2 subheadings found. Subheadings improve content structure for users and crawlers.');
    } else {
      passed.push(`${data.h2Count} H2 subheadings organizing the content structure.`);
    }

    // Canonical Tag
    if (!data.canonical) {
      warnings.push('Missing rel="canonical" link. Canonical tags prevent duplicate content indexing issues.');
      recommendations.push('Add <link rel="canonical" href="..."> pointing to the preferred master URL.');
    } else {
      passed.push(`Canonical URL declared: ${data.canonical}`);
    }

    // Viewport Mobile Friendliness
    if (!data.viewport) {
      issues.push('Missing <meta name="viewport"> tag. Mobile devices may render the page poorly.');
      recommendations.push('Add <meta name="viewport" content="width=device-width, initial-scale=1.0">.');
    } else {
      passed.push('Mobile viewport meta tag configured.');
    }

    // Language & Charset
    if (!data.language) {
      warnings.push('Missing lang attribute on <html> element.');
      recommendations.push('Add lang="en" (or your language code) to the <html> tag for screen readers and search engines.');
    } else {
      passed.push(`Language attribute defined (lang="${data.language}").`);
    }

    if (!data.charset) {
      warnings.push('Missing character encoding declaration (<meta charset="utf-8">).');
    } else {
      passed.push(`Character encoding declared (${data.charset}).`);
    }

    // Images ALT Check
    if (data.totalImages > 0) {
      if (data.missingAltImages.length > 0) {
        warnings.push(`${data.missingAltImages.length} of ${data.totalImages} images are missing alt attributes.`);
        recommendations.push('Add descriptive ALT text to all informational images for accessibility and image search SEO.');
      } else {
        passed.push(`All ${data.totalImages} images have ALT attributes defined.`);
      }
    } else {
      passed.push('No images requiring ALT attributes found.');
    }

    // Social Media Open Graph
    if (Object.keys(data.openGraph).length > 0) {
      passed.push(`${Object.keys(data.openGraph).length} Open Graph social metadata tags detected.`);
    } else {
      warnings.push('No Open Graph (og:) tags found. Social shares on Facebook and LinkedIn may appear plain.');
    }

    // Robots.txt / Sitemap probe if available
    if (data.robotsTxtAvailable === true) {
      passed.push('robots.txt file detected at root.');
    } else if (data.robotsTxtAvailable === false) {
      warnings.push('robots.txt was not detected or returned a non-200 status.');
    }

    if (data.sitemapXmlAvailable === true) {
      passed.push('sitemap.xml detected at root.');
    } else if (data.sitemapXmlAvailable === false) {
      warnings.push('sitemap.xml was not found at the default root location.');
    }

    return { passed, warnings, issues, recommendations };
  };

  const checks = audit ? getChecks(audit) : null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Website SEO Analyzer & On-Page Audit"
        description="Comprehensive on-page SEO checker. Audit title tags, meta descriptions, H1 headings, image ALTs, canonicals, and open graph tags."
        canonicalPath="/seo-analyzer"
      />

      <Breadcrumb
        items={[
          { name: 'Website SEO Analysis', path: '/tools?category=seo' },
          { name: 'Website SEO Analyzer' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Website SEO Analyzer
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Run transparent, rules-based audits on any webpage or HTML snippet to uncover technical and on-page optimization opportunities.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'url'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Analyze Live URL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('html')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'html'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Paste HTML Code (Instant Local)</span>
          </button>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          {mode === 'url' ? (
            <div>
              <label
                htmlFor="seo-url-input"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
              >
                Website URL to Analyze
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  id="seo-url-input"
                  required
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Auditing...</span>
                    </>
                  ) : (
                    <>
                      <SearchCheck className="w-4 h-4" />
                      <span>Analyze Website</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label
                htmlFor="seo-html-input"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
              >
                Paste Full Page HTML Source
              </label>
              <textarea
                id="seo-html-input"
                required
                rows={7}
                value={htmlInput}
                onChange={e => setHtmlInput(e.target.value)}
                placeholder="<!DOCTYPE html><html><head><title>My Website</title><meta name='description' content='...'>...</head><body>...</body></html>"
                className="w-full p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 flex items-center gap-2"
                >
                  <SearchCheck className="w-4 h-4" />
                  <span>Audit HTML Snippet</span>
                </button>
              </div>
            </div>
          )}
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Audit Notice</div>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Audit Results Dashboard */}
        {audit && checks && (
          <div className="space-y-6 pt-4 border-t border-stone-100 dark:border-stone-800 animate-in fade-in duration-200">
            {/* Header stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700">
              <div>
                <div className="text-xs text-stone-500">Analysis Target</div>
                <div className="font-semibold text-sm text-stone-900 dark:text-white truncate max-w-md">
                  {audit.url || 'Pasted HTML Document'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {checks.passed.length} Passed
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {checks.warnings.length} Warnings
                </span>
                {checks.issues.length > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    {checks.issues.length} Issues
                  </span>
                )}
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800">
                <span className="text-[11px] text-stone-500 font-medium block">Title Length</span>
                <span className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 block">
                  {audit.titleLength} chars
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800">
                <span className="text-[11px] text-stone-500 font-medium block">Meta Desc</span>
                <span className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 block">
                  {audit.metaDescriptionLength} chars
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800">
                <span className="text-[11px] text-stone-500 font-medium block">H1 Headings</span>
                <span className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 block">
                  {audit.h1.length} found
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800">
                <span className="text-[11px] text-stone-500 font-medium block">Images Audited</span>
                <span className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 block">
                  {audit.totalImages} images
                </span>
              </div>
            </div>

            {/* Issues and Recommendations */}
            {checks.issues.length > 0 && (
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Critical SEO Issues ({checks.issues.length})</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200">
                  {checks.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {checks.warnings.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Optimization Warnings ({checks.warnings.length})</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                  {checks.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Passed Checks */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Passed Checks ({checks.passed.length})</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                {checks.passed.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Recommendations */}
            {checks.recommendations.length > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Actionable Recommendations</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                  {checks.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Metadata Breakdown */}
            <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Extracted HTML Elements
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-stone-500 block mb-0.5">Page Title:</span>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 font-medium text-stone-900 dark:text-white">
                    {audit.title || '<Missing Title>'}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-stone-500 block mb-0.5">Meta Description:</span>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {audit.metaDescription || '<Missing Meta Description>'}
                  </div>
                </div>
                {audit.h1.length > 0 && (
                  <div>
                    <span className="font-semibold text-stone-500 block mb-0.5">H1 Content:</span>
                    <div className="space-y-1">
                      {audit.h1.map((h, i) => (
                        <div key={i} className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {audit.missingAltImages.length > 0 && (
                  <div>
                    <span className="font-semibold text-stone-500 block mb-0.5">Sample Images Missing ALT:</span>
                    <div className="space-y-1 font-mono text-[11px]">
                      {audit.missingAltImages.slice(0, 5).map((img, i) => (
                        <div key={i} className="p-1.5 rounded bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 truncate">
                          {img}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Transparent Auditing Methodology</span>
          </div>
          <p>
            SEOFlow Tools audits actual W3C, on-page structure, and search engine technical guidelines. We do not fabricate Google PageRank numbers, keyword ranking promises, or artificial domain authority scores.
          </p>
        </div>
      </div>
    </div>
  );
};
