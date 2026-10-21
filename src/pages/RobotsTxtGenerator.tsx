import React, { useState } from 'react';
import { Bot, Download, RotateCcw, Copy, Info, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';

export const RobotsTxtGenerator: React.FC = () => {
  const { addToast } = useToast();
  const [userAgent, setUserAgent] = useState('*');
  const [allowPaths, setAllowPaths] = useState('/');
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/api/\n/private/');
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [crawlDelay, setCrawlDelay] = useState('');

  const applyPreset = (type: 'allowAll' | 'blockAll' | 'blockAi' | 'standardWeb') => {
    if (type === 'allowAll') {
      setUserAgent('*');
      setAllowPaths('/');
      setDisallowPaths('');
      setCrawlDelay('');
    } else if (type === 'blockAll') {
      setUserAgent('*');
      setAllowPaths('');
      setDisallowPaths('/');
      setCrawlDelay('');
    } else if (type === 'blockAi') {
      setUserAgent('*');
      setAllowPaths('/');
      setDisallowPaths('/admin/');
      // We will inject AI scraper rules in output
      addToast('Applied AI Scraper blocking rules preset', 'info');
    } else if (type === 'standardWeb') {
      setUserAgent('*');
      setAllowPaths('/');
      setDisallowPaths('/wp-admin/\n/admin/\n/login/\n/cgi-bin/');
      setCrawlDelay('');
    }
  };

  const generatedRobots = `# SEOFlow Tools Generated robots.txt
User-agent: ${userAgent}
${allowPaths.split('\n').filter(p => p.trim()).map(p => `Allow: ${p.trim()}`).join('\n')}
${disallowPaths.split('\n').filter(p => p.trim()).map(p => `Disallow: ${p.trim()}`).join('\n')}${crawlDelay ? `\nCrawl-delay: ${crawlDelay}` : ''}
${sitemapUrl ? `\nSitemap: ${sitemapUrl.trim()}` : ''}

# Disallow common aggressive AI scrapers (Optional)
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Bytespider
Disallow: /`;

  const handleDownload = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('robots.txt downloaded successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Robots.txt Generator & AI Scraper Blocker"
        description="Generate standards-compliant robots.txt files with custom user-agents, allow/disallow paths, sitemap directives, and AI scraper blocks."
        canonicalPath="/robots-txt-generator"
      />

      <Breadcrumb
        items={[
          { name: 'Meta Tags & Technical SEO', path: '/tools?category=technical' },
          { name: 'Robots.txt Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Robots.txt Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Create crawler instructions for Googlebot, Bingbot, and AI scrapers to manage crawl budgets and protect private sections.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Preset Buttons */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            Quick Configuration Presets
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyPreset('allowAll')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
            >
              Allow Everything (Standard)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('blockAll')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
            >
              Block All (Staging / Dev)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('standardWeb')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
            >
              Standard CMS / Web App
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="user-agent" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              User-Agent
            </label>
            <input
              type="text"
              id="user-agent"
              value={userAgent}
              onChange={e => setUserAgent(e.target.value)}
              placeholder="* (All robots)"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="sitemap-dir" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Sitemap URL Directive
            </label>
            <input
              type="text"
              id="sitemap-dir"
              value={sitemapUrl}
              onChange={e => setSitemapUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="allow-paths" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Allow Paths (One per line)
            </label>
            <textarea
              id="allow-paths"
              rows={4}
              value={allowPaths}
              onChange={e => setAllowPaths(e.target.value)}
              placeholder="/"
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="disallow-paths" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
              Disallow Paths (One per line)
            </label>
            <textarea
              id="disallow-paths"
              rows={4}
              value={disallowPaths}
              onChange={e => setDisallowPaths(e.target.value)}
              placeholder="/admin/&#10;/private/"
              className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
            />
          </div>
        </div>

        {/* Live Output */}
        <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Generated robots.txt Preview
            </span>
            <div className="flex items-center gap-2">
              <CopyButton text={generatedRobots} label="Copy robots.txt" variant="primary" />
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
            <code>{generatedRobots}</code>
          </pre>
        </div>

        {/* Advisory Protocol Notice */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>Advisory Crawler Protocol Note</span>
          </div>
          <p>
            <code>robots.txt</code> is a voluntary crawler directive followed by well-behaved search engines. It is <strong>not</strong> an access-control or security firewall. To protect sensitive or private data from unauthorized visitors, always use password authentication or server access rules.
          </p>
        </div>
      </div>
    </div>
  );
};
