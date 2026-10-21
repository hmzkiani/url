import React, { useState, useMemo } from 'react';
import { Sliders, Copy, RotateCcw, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const UrlParser: React.FC = () => {
  const [inputUrl, setInputUrl] = useState(
    'https://blog.example.com:8080/articles/seo-guide?utm_source=google&utm_medium=cpc&sort=popular#section-3'
  );

  const parsed = useMemo(() => {
    try {
      const u = new URL(inputUrl.trim());
      const queryParams: { key: string; value: string }[] = [];
      u.searchParams.forEach((value, key) => {
        queryParams.push({ key, value });
      });

      const hostParts = u.hostname.split('.');
      let rootDomain = u.hostname;
      let subdomain = '';
      if (hostParts.length > 2) {
        subdomain = hostParts.slice(0, hostParts.length - 2).join('.');
        rootDomain = hostParts.slice(-2).join('.');
      }

      const pathSegments = u.pathname.split('/').filter(Boolean);

      const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(u.hostname);
      const isHttps = u.protocol === 'https:';

      return {
        valid: true,
        protocol: u.protocol,
        hostname: u.hostname,
        subdomain,
        rootDomain,
        port: u.port || (u.protocol === 'https:' ? '443 (default)' : '80 (default)'),
        pathname: u.pathname,
        pathSegments,
        search: u.search,
        queryParams,
        hash: u.hash,
        isIp,
        isHttps
      };
    } catch {
      return { valid: false };
    }
  }, [inputUrl]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free URL & Domain Structure Parser"
        description="Deconstruct any URL into protocol, hostname, subdomain, pathname segments, query parameters table, and hash fragment."
        canonicalPath="/url-parser"
      />

      <Breadcrumb
        items={[
          { name: 'Text & Website Utilities', path: '/tools?category=utilities' },
          { name: 'Domain & URL Parser' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Domain & URL Parser
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Deconstruct web addresses into protocol, subdomain, root domain, path segments, and query parameters.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="url-parse-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            URL to Parse
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              id="url-parse-input"
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              placeholder="https://subdomain.example.com/path?key=value#hash"
              className="flex-1 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={() => setInputUrl('')}
                className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {parsed.valid ? (
          <div className="space-y-6 pt-2 animate-in fade-in duration-150">
            {/* Overview Security Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                <span className="text-[11px] text-stone-400 font-medium block">Protocol</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white mt-0.5 font-mono block">
                  {parsed.protocol}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                <span className="text-[11px] text-stone-400 font-medium block">Root Domain</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white mt-0.5 font-mono block">
                  {parsed.rootDomain}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                <span className="text-[11px] text-stone-400 font-medium block">Subdomain</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white mt-0.5 font-mono block">
                  {parsed.subdomain || '[None]'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                <span className="text-[11px] text-stone-400 font-medium block">Port</span>
                <span className="text-sm font-bold text-stone-900 dark:text-white mt-0.5 font-mono block">
                  {parsed.port}
                </span>
              </div>
            </div>

            {/* Path and Fragment Breakdown */}
            <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Pathname ({parsed.pathSegments?.length || 0} segments)
                </span>
                <CopyButton text={parsed.pathname || ''} label="Copy Path" variant="ghost" className="text-xs py-1" />
              </div>
              <div className="font-mono text-xs text-stone-800 dark:text-stone-200 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800">
                {parsed.pathname}
              </div>

              {parsed.hash && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Hash / Fragment
                  </span>
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/40">
                    {parsed.hash}
                  </div>
                </div>
              )}
            </div>

            {/* Query Parameters Table */}
            {parsed.queryParams && parsed.queryParams.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Query Parameters ({parsed.queryParams.length})
                  </span>
                  <CopyButton
                    text={parsed.queryParams.map(q => `${q.key}=${q.value}`).join('\n')}
                    label="Copy Params"
                    variant="ghost"
                    className="text-xs py-1"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 font-semibold text-stone-500">
                      <tr>
                        <th className="p-3">Key (Parameter)</th>
                        <th className="p-3">Value</th>
                        <th className="p-3 text-right">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono">
                      {parsed.queryParams.map((param, idx) => (
                        <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                          <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">{param.key}</td>
                          <td className="p-3 text-stone-800 dark:text-stone-200 break-all">{param.value}</td>
                          <td className="p-3 text-right">
                            <CopyButton text={param.value} label="" variant="icon" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-stone-400 border border-dashed rounded-2xl">
            Please enter a valid URL (including protocol like https://) to inspect its parts.
          </div>
        )}
      </div>
    </div>
  );
};
