import React, { useState } from 'react';
import { HelpCircle, Search, CheckCircle2, Repeat, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

interface StatusCodeInfo {
  code: number;
  name: string;
  category: '2xx' | '3xx' | '4xx' | '5xx';
  meaning: string;
  seoImpact: string;
  causes: string;
  fix: string;
}

export const HttpStatusCodes: React.FC = () => {
  const [filterClass, setFilterClass] = useState<'all' | '2xx' | '3xx' | '4xx' | '5xx'>('all');
  const [search, setSearch] = useState('');

  const statusList: StatusCodeInfo[] = [
    {
      code: 200,
      name: 'OK',
      category: '2xx',
      meaning: 'The request succeeded and the server returned the requested webpage or resource.',
      seoImpact: 'Ideal status for indexable pages. Googlebot crawls and indexes the content normally.',
      causes: 'Standard successful HTTP response.',
      fix: 'No fix needed; desired outcome for live URLs.'
    },
    {
      code: 301,
      name: 'Moved Permanently',
      category: '3xx',
      meaning: 'The requested resource has been definitively moved to a new permanent location.',
      seoImpact: 'Transfers 90-99% of link equity (PageRank). Google updates its index to the new destination URL.',
      causes: 'Permanent site migration, domain changes, or URL slug updates.',
      fix: 'Ensure destination URL returns 200 OK without intermediate chains or redirect loops.'
    },
    {
      code: 302,
      name: 'Found (Temporary Redirect)',
      category: '3xx',
      meaning: 'The resource is temporarily residing under a different URI.',
      seoImpact: 'Google keeps the original URL in its index. Link equity is generally not permanently transferred.',
      causes: 'Temporary promotional redirects, seasonal landing pages, or maintenance periods.',
      fix: 'If the change is permanent, switch to a 301 Moved Permanently rule.'
    },
    {
      code: 304,
      name: 'Not Modified',
      category: '3xx',
      meaning: 'The resource has not changed since the last request version specified by If-Modified-Since.',
      seoImpact: 'Saves server bandwidth and Googlebot crawl budget. Googlebot retains cached version.',
      causes: 'Browser or crawler cache validation using ETag or Last-Modified headers.',
      fix: 'Working as intended for efficient caching.'
    },
    {
      code: 307,
      name: 'Temporary Redirect (HTTP/1.1)',
      category: '3xx',
      meaning: 'Temporary redirect guaranteeing that the HTTP method (POST/GET) cannot change.',
      seoImpact: 'Treated similarly to 302. Original URL stays in index.',
      causes: 'Temporary form redirection or API proxying.',
      fix: 'Use 308 for permanent method-preserving redirects, or 301 for standard GET requests.'
    },
    {
      code: 400,
      name: 'Bad Request',
      category: '4xx',
      meaning: 'The server cannot process the request due to perceived client syntax error.',
      seoImpact: 'Prevents Googlebot from crawling the page. If persistent, page will be deindexed.',
      causes: 'Malformed URL encoding, invalid query strings, or corrupted cookies.',
      fix: 'Verify URL encoding and check syntax of requested parameters.'
    },
    {
      code: 401,
      name: 'Unauthorized',
      category: '4xx',
      meaning: 'The request requires HTTP user authentication credentials.',
      seoImpact: 'Googlebot cannot crawl password-protected content. Will not be indexed.',
      causes: 'Protected staging servers or private login portals.',
      fix: 'Working as intended for private areas; remove auth if page should be public.'
    },
    {
      code: 403,
      name: 'Forbidden',
      category: '4xx',
      meaning: 'The server understands the request but refuses to authorize access.',
      seoImpact: 'Googlebot cannot index the page. Continued 403 responses result in deindexation.',
      causes: 'Firewall rules, IP blocking (Cloudflare), or incorrect file permissions on server.',
      fix: 'Check server file permissions (.htaccess) and ensure Googlebot IP ranges are not firewalled.'
    },
    {
      code: 404,
      name: 'Not Found',
      category: '4xx',
      meaning: 'The server cannot find any resource matching the requested URI.',
      seoImpact: 'Googlebot will eventually drop the page from the index. Internal 404s waste crawl budget and harm UX.',
      causes: 'Broken internal links, mistyped URLs, or deleted pages without redirects.',
      fix: 'Add a 301 redirect to relevant replacement content, or fix the source link.'
    },
    {
      code: 410,
      name: 'Gone',
      category: '4xx',
      meaning: 'The resource requested is intentionally no longer available and no forwarding address exists.',
      seoImpact: 'Tells Googlebot to remove the page from index faster than a standard 404.',
      causes: 'Permanently discontinued products or retired content with no relevant substitute.',
      fix: 'Use 410 intentionally when you want Google to purge obsolete URLs swiftly.'
    },
    {
      code: 429,
      name: 'Too Many Requests',
      category: '4xx',
      meaning: 'The user has sent too many requests in a given amount of time (rate limiting).',
      seoImpact: 'Critical issue. Googlebot will slow down its crawl rate or stop crawling your site entirely.',
      causes: 'Aggressive server rate limiting or anti-DDoS rules misidentifying Googlebot.',
      fix: 'Whitelist verified Googlebot reverse DNS IPs in your firewall or CDN settings.'
    },
    {
      code: 500,
      name: 'Internal Server Error',
      category: '5xx',
      meaning: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
      seoImpact: 'High severity. Googlebot will reduce crawl rate and deindex URLs if 500s persist.',
      causes: 'PHP/Node fatal errors, database connection drops, or corrupted server config.',
      fix: 'Inspect server error logs (e.g. error.log) and repair application code or database.'
    },
    {
      code: 502,
      name: 'Bad Gateway',
      category: '5xx',
      meaning: 'The gateway server received an invalid response from the upstream server.',
      seoImpact: 'Site appears completely down to search engine crawlers.',
      causes: 'PHP-FPM crash, reverse proxy misconfiguration (Nginx/Apache), or backend timeout.',
      fix: 'Restart upstream services (PHP-FPM, Node process) and check proxy socket configurations.'
    },
    {
      code: 503,
      name: 'Service Unavailable',
      category: '5xx',
      meaning: 'The server is currently unable to handle the request due to temporary overloading or maintenance.',
      seoImpact: 'Safe for temporary downtime. Googlebot will return later without immediately deindexing if accompanied by a Retry-After header.',
      causes: 'Server maintenance, resource spikes, or database maintenance.',
      fix: 'Return 503 with a Retry-After HTTP header during scheduled site updates.'
    }
  ];

  const filtered = statusList.filter(item => {
    const matchesCat = filterClass === 'all' || item.category === filterClass;
    const q = search.toLowerCase().trim();
    const matchesQuery =
      !q ||
      String(item.code).includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.seoImpact.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="HTTP Status Code SEO Guide (200, 301, 404, 500)"
        description="Comprehensive reference for HTTP response codes. Understand what each status code means for Googlebot indexing and SEO crawl budget."
        canonicalPath="/http-status-codes"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'HTTP Status Code Guide' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          HTTP Status Codes & SEO Impact Guide
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Learn how Googlebot interprets 2xx, 3xx, 4xx, and 5xx response headers and how each impacts your site's search rankings.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Codes' },
              { id: '2xx', label: '2xx Success' },
              { id: '3xx', label: '3xx Redirects' },
              { id: '4xx', label: '4xx Client Errors' },
              { id: '5xx', label: '5xx Server Errors' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterClass(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterClass === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search code (e.g. 301, 404)..."
              className="pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Status Codes List */}
        <div className="space-y-4 pt-2">
          {filtered.map(item => (
            <div
              key={item.code}
              className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19] hover:border-stone-300 dark:hover:border-stone-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-xl text-sm font-bold font-mono ${
                      item.category === '2xx'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.category === '3xx'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : item.category === '4xx'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    HTTP {item.code}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {item.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold uppercase text-stone-400">
                  {item.category} Class
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {item.meaning}
              </p>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-700 dark:text-emerald-300 block">
                  SEO & Googlebot Impact
                </span>
                <p>{item.seoImpact}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                    Common Causes:
                  </span>
                  <span className="text-stone-600 dark:text-stone-400">{item.causes}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-0.5">
                    Recommended Fix:
                  </span>
                  <span className="text-stone-600 dark:text-stone-400">{item.fix}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
