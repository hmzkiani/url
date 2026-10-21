import React, { useState } from 'react';
import { Repeat, ArrowRight, AlertTriangle, CheckCircle2, AlertCircle, Info, Loader2, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { RedirectCheckResult } from '../types';

export const RedirectChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RedirectCheckResult | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let target = url.trim();
    if (!target) {
      setError('Please enter a URL to check.');
      return;
    }
    if (!/^https?:\/\//i.test(target)) {
      target = 'https://' + target;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/check-redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned error ${res.status}`);
      }

      const data: RedirectCheckResult = await res.json();
      setResult(data);
    } catch (err: any) {
      // In case the companion API is not reachable, provide a clear explanation
      setError(
        err.message ||
        'Could not connect to the redirect checker service. Standard web browsers block cross-origin redirects directly due to CORS security policies. Make sure the SEOFlow companion API is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setError(null);
    setResult(null);
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          {status} OK
        </span>
      );
    }
    if (status >= 300 && status < 400) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          {status} Redirect
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
        {status || 'Error'}
      </span>
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="HTTP Redirect Status Checker & Chain Inspector"
        description="Check HTTP redirect status codes, follow full redirect chains, detect redirect loops, and diagnose 301/302 link issues."
        canonicalPath="/redirect-checker"
      />

      <Breadcrumb
        items={[
          { name: 'URL & Redirect Tools', path: '/tools?category=urls' },
          { name: 'Redirect Status Checker' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Redirect Status Checker
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Trace the complete HTTP redirect path of any URL to verify status codes and prevent infinite redirect loops.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label
              htmlFor="check-url"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Target Webpage URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                id="check-url"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/redirect-source"
                className="flex-1 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Repeat className="w-4 h-4" />
                      <span>Check Redirects</span>
                    </>
                  )}
                </button>
                {url && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Check Failed</div>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-200">
            {/* Summary Banner */}
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                result.isLoop
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                  : result.totalRedirects > 0
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {result.isLoop ? (
                  <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
                ) : result.totalRedirects > 0 ? (
                  <Repeat className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    {result.isLoop
                      ? 'Infinite Redirect Loop Detected!'
                      : result.totalRedirects === 0
                      ? 'Direct URL (No Redirects)'
                      : `${result.totalRedirects} Redirect ${result.totalRedirects === 1 ? 'Hop' : 'Hops'} Followed`}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    Final Status: {result.finalStatus} • Final destination: <code className="font-mono">{result.finalUrl}</code>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <CopyButton
                  text={`Redirect Chain for ${result.initialUrl}:\n${result.hops.map((h, i) => `${i + 1}. [HTTP ${h.status}] ${h.url}${h.location ? ` -> ${h.location}` : ''}`).join('\n')}`}
                  label="Copy Chain"
                  variant="secondary"
                />
              </div>
            </div>

            {/* Step-by-Step Chain */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Redirect Path Steps
              </h3>
              <div className="space-y-2">
                {result.hops.map((hop, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div className="space-y-1 truncate max-w-xl">
                        <div className="font-mono text-stone-900 dark:text-white font-medium truncate" title={hop.url}>
                          {hop.url}
                        </div>
                        {hop.location && (
                          <div className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono truncate">
                            <ArrowRight className="w-3 h-3 shrink-0" />
                            <span className="truncate">Redirects to: {hop.location}</span>
                          </div>
                        )}
                        {hop.error && (
                          <div className="text-rose-600 dark:text-rose-400">
                            Error: {hop.error}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      {getStatusBadge(hop.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CORS & Browser Limitation Notice */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Why Server-Side Checking is Required</span>
          </div>
          <p>
            Web browser security restrictions (CORS) strictly prevent client-side JavaScript from reading intermediate HTTP 301/302 response headers or following cross-origin redirect chains directly. This tool communicates with our safe, SSRF-protected companion endpoint to trace each step faithfully.
          </p>
        </div>
      </div>
    </div>
  );
};
