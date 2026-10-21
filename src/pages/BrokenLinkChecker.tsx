import React, { useState } from 'react';
import { Link2Off, CheckCircle2, AlertTriangle, AlertCircle, Loader2, RotateCcw, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

interface LinkResult {
  url: string;
  anchorText: string;
  status: number;
  statusText: string;
  isInternal: boolean;
  reachable: boolean;
  error?: string;
}

export const BrokenLinkChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [maxLinks, setMaxLinks] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    pageUrl: string;
    totalChecked: number;
    brokenCount: number;
    reachableCount: number;
    links: LinkResult[];
  } | null>(null);

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);

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
      const res = await fetch('/api/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target, maxLinks })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(
        err.message ||
        'Link audit failed. Automated crawling requires the SEOFlow companion API to run with SSRF protection. If the target server blocks automated crawlers, test individual URLs via the Redirect Checker.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setError(null);
    setResults(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Broken Link Checker & Dead URL Audit"
        description="Audit webpage links to find broken 404 links, redirect chains, and failed URLs safely with SSRF protection."
        canonicalPath="/broken-link-checker"
      />

      <Breadcrumb
        items={[
          { name: 'URL & Redirect Tools', path: '/tools?category=urls' },
          { name: 'Broken Link Checker' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Broken Link Checker
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Find broken links, dead URLs, and connection timeouts on any webpage to preserve your site's SEO equity.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <form onSubmit={handleCrawl} className="space-y-4">
          <div>
            <label
              htmlFor="crawl-url"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Page URL to Audit
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                id="crawl-url"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/blog-post"
                className="flex-1 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <div className="flex items-center gap-2">
                <select
                  value={maxLinks}
                  onChange={e => setMaxLinks(Number(e.target.value))}
                  className="px-3 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  title="Maximum links to check"
                >
                  <option value={10}>Max 10 links</option>
                  <option value={15}>Max 15 links</option>
                  <option value={25}>Max 25 links</option>
                </select>

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
                      <Link2Off className="w-4 h-4" />
                      <span>Audit Links</span>
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
              <div className="font-semibold">Audit Could Not Complete</div>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Audit Results */}
        {results && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-200">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <div className="text-xs font-semibold text-stone-500">Total Links Checked</div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                  {results.totalChecked}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Reachable Links</div>
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                  {results.reachableCount}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">Broken / Issues</div>
                <div className="text-2xl font-bold text-rose-800 dark:text-rose-200 mt-1">
                  {results.brokenCount}
                </div>
              </div>
            </div>

            {/* Links Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19]">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Anchor Text</th>
                    <th className="p-3.5">Destination URL</th>
                    <th className="p-3.5">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                  {results.links.map((link, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="p-3.5 whitespace-nowrap">
                        {link.reachable ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{link.status || 200} OK</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{link.status ? `${link.status} ${link.statusText}` : 'Unreachable'}</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 max-w-[180px] truncate font-medium text-stone-800 dark:text-stone-200" title={link.anchorText}>
                        {link.anchorText}
                      </td>
                      <td className="p-3.5 max-w-[260px] truncate font-mono" title={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-600 dark:text-emerald-400">
                          {link.url}
                        </a>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${link.isInternal ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}>
                          {link.isInternal ? 'Internal' : 'External'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Security & SSRF Protection Banner */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Strict SSRF Safety & Crawl Depth Limits</span>
          </div>
          <p>
            To prevent Server-Side Request Forgery (SSRF) and protect server infrastructure, all target URLs are validated to ensure they never resolve to internal IP subnets, loopback hosts, or cloud metadata endpoints. Crawls are restricted to single-depth with a safe request quota.
          </p>
        </div>
      </div>
    </div>
  );
};
