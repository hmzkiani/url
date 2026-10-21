import React, { useState } from 'react';
import { BookmarkCheck, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw, Info } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

interface CanonicalReport {
  canonicalsFound: string[];
  hasCanonical: boolean;
  isMultiple: boolean;
  isAbsolute: boolean;
  isHttps: boolean;
  issues: string[];
  recommendations: string[];
}

export const CanonicalChecker: React.FC = () => {
  const [input, setInput] = useState(
    `<head>
  <title>Sample Webpage</title>
  <link rel="canonical" href="https://example.com/canonical-page" />
</head>`
  );

  const [report, setReport] = useState<CanonicalReport | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Extract all canonical tags using regex
    const regex = /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["']/gi;
    const regexReversed = /<link\b[^>]*\bhref=["']([^"']*)["'][^>]*\brel=["']canonical["']/gi;

    const matches: string[] = [];
    let m;
    while ((m = regex.exec(input)) !== null) {
      matches.push(m[1].trim());
    }
    while ((m = regexReversed.exec(input)) !== null) {
      if (!matches.includes(m[1].trim())) matches.push(m[1].trim());
    }

    const issues: string[] = [];
    const recommendations: string[] = [];

    const hasCanonical = matches.length > 0;
    const isMultiple = matches.length > 1;

    let isAbsolute = true;
    let isHttps = true;

    if (!hasCanonical) {
      issues.push('No rel="canonical" link found in the provided HTML snippet.');
      recommendations.push('Add <link rel="canonical" href="https://yourdomain.com/exact-page-path" /> inside the <head> tag.');
    } else {
      if (isMultiple) {
        issues.push(`Multiple conflicting canonical tags detected (${matches.length} found). Search engines will ignore all canonical declarations if duplicates conflict.`);
        recommendations.push('Ensure exactly one canonical tag exists per webpage.');
      }

      matches.forEach(href => {
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
          isAbsolute = false;
          issues.push(`Canonical URL "${href}" is relative. Google strongly advises using absolute URLs including the domain.`);
          recommendations.push('Always use full absolute URLs with domain name (e.g. https://example.com/page).');
        } else if (href.startsWith('http://')) {
          isHttps = false;
          issues.push(`Canonical URL "${href}" uses insecure HTTP instead of HTTPS.`);
          recommendations.push('Update the canonical URL to use the secure HTTPS protocol.');
        }
      });
    }

    setReport({
      canonicalsFound: matches,
      hasCanonical,
      isMultiple,
      isAbsolute,
      isHttps,
      issues,
      recommendations
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Canonical URL Tag Checker & Audit"
        description="Inspect HTML canonical tags to detect missing declarations, duplicate conflicting canonicals, and relative URL errors."
        canonicalPath="/canonical-checker"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'Canonical Tag Checker' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Canonical Tag Checker
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Verify rel="canonical" link syntax and prevent duplicate content penalties across parameterized or syndicated URLs.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label htmlFor="canonical-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Paste HTML Header or Canonical Tag
            </label>
            <textarea
              id="canonical-input"
              rows={6}
              required
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="<link rel='canonical' href='https://example.com/page' />"
              className="w-full p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">
              Evaluates RFC 6596 rel=canonical best practices
            </span>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                Inspect Canonical Tag
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setReport(null);
                }}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {report && (
          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 animate-in fade-in duration-150">
            {/* Status card */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${
                report.hasCanonical && !report.isMultiple && report.issues.length === 0
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {report.hasCanonical && !report.isMultiple && report.issues.length === 0 ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    {report.hasCanonical
                      ? `Found ${report.canonicalsFound.length} Canonical Declaration`
                      : 'Missing Canonical Tag'}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    {report.canonicalsFound.length > 0 ? (
                      <code className="font-mono">{report.canonicalsFound.join(', ')}</code>
                    ) : (
                      'No canonical link was found in the input HTML.'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Issues */}
            {report.issues.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Detected Issues ({report.issues.length})</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {report.issues.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations.length > 0 && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                <div className="font-semibold text-stone-800 dark:text-stone-200">
                  Best Practice Advice
                </div>
                <ul className="space-y-1">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">→</span>
                      <span>{rec}</span>
                    </li>
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
