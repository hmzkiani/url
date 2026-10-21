import React, { useState, useMemo } from 'react';
import { Map, Download, Copy, RotateCcw, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';

export const SitemapGenerator: React.FC = () => {
  const { addToast } = useToast();
  const [urlsInput, setUrlsInput] = useState(
    `https://example.com/
https://example.com/about
https://example.com/services
https://example.com/blog
https://example.com/contact`
  );

  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [lastmodDate, setLastmodDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [changefreq, setChangefreq] = useState<'weekly' | 'daily' | 'monthly' | 'yearly' | 'none'>('weekly');
  const [priority, setPriority] = useState('0.8');

  const { validUrls, invalidLines, xmlContent } = useMemo(() => {
    const lines = urlsInput.split('\n').map(l => l.trim()).filter(Boolean);
    const valid: string[] = [];
    const invalid: string[] = [];

    lines.forEach(line => {
      try {
        const u = new URL(line.startsWith('http') ? line : 'https://' + line);
        if (u.hostname && u.hostname.includes('.')) {
          valid.push(u.toString());
        } else {
          invalid.push(line);
        }
      } catch {
        invalid.push(line);
      }
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    valid.forEach(u => {
      xml += `  <url>\n    <loc>${u}</loc>\n`;
      if (includeLastmod && lastmodDate) {
        xml += `    <lastmod>${lastmodDate}</lastmod>\n`;
      }
      if (changefreq !== 'none') {
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
      }
      if (priority) {
        xml += `    <priority>${priority}</priority>\n`;
      }
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    return {
      validUrls: valid,
      invalidLines: invalid,
      xmlContent: valid.length > 0 ? xml : ''
    };
  }, [urlsInput, includeLastmod, lastmodDate, changefreq, priority]);

  const handleDownloadXml = () => {
    if (!xmlContent) return;
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('sitemap.xml downloaded successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free XML Sitemap Generator (sitemaps.org schema)"
        description="Generate clean, valid XML sitemaps conforming to sitemaps.org standards with customizable lastmod, changefreq, and priority tags."
        canonicalPath="/sitemap-generator"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'XML Sitemap Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          XML Sitemap Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Create standards-compliant XML sitemaps for Google, Bing, and other search engines to index your website pages efficiently.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="sitemap-urls" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Page URLs (One per line)
          </label>
          <textarea
            id="sitemap-urls"
            rows={7}
            value={urlsInput}
            onChange={e => setUrlsInput(e.target.value)}
            placeholder="https://example.com/page-1&#10;https://example.com/page-2"
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {invalidLines.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{invalidLines.length} Invalid or incomplete URL {invalidLines.length === 1 ? 'line' : 'lines'} skipped:</span>
            </div>
            <p className="font-mono">{invalidLines.join(', ')}</p>
          </div>
        )}

        {/* Optional Directive Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Last Modified Date
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLastmod}
                  onChange={e => setIncludeLastmod(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Include &lt;lastmod&gt; tag</span>
              </label>
              {includeLastmod && (
                <input
                  type="date"
                  value={lastmodDate}
                  onChange={e => setLastmodDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Change Frequency
            </label>
            <select
              value={changefreq}
              onChange={e => setChangefreq(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
            >
              <option value="weekly">weekly (Default)</option>
              <option value="daily">daily</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
              <option value="none">None (Omit tag)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Default Priority
            </label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
            >
              <option value="1.0">1.0 (Highest - Homepage)</option>
              <option value="0.8">0.8 (High - Main landing pages)</option>
              <option value="0.6">0.6 (Standard content)</option>
              <option value="0.4">0.4 (Low priority)</option>
            </select>
          </div>
        </div>

        {/* Live Generated XML Preview */}
        {xmlContent && (
          <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Generated sitemap.xml ({validUrls.length} {validUrls.length === 1 ? 'URL' : 'URLs'})
              </span>
              <div className="flex items-center gap-2">
                <CopyButton text={xmlContent} label="Copy XML" variant="primary" />
                <button
                  type="button"
                  onClick={handleDownloadXml}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download XML</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed border border-stone-800">
              <code>{xmlContent}</code>
            </pre>
          </div>
        )}

        {/* Deployment & Upload Instructions */}
        <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>How to Upload & Submit Your Sitemap</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Download the generated <code>sitemap.xml</code> file using the button above.</li>
            <li>Upload it to the root public folder of your web hosting (e.g. <code>https://yourdomain.com/sitemap.xml</code>).</li>
            <li>Add a reference inside your <code>robots.txt</code> file: <code>Sitemap: https://yourdomain.com/sitemap.xml</code>.</li>
            <li>Submit the URL in Google Search Console under the <strong>Sitemaps</strong> section for priority crawling.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
