import React, { useState } from 'react';
import { GitFork, Copy, Info, CheckCircle2, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const RedirectGenerator: React.FC = () => {
  const [redirectType, setRedirectType] = useState<'301' | '302' | '307'>('301');
  const [sourcePath, setSourcePath] = useState('/old-page');
  const [targetUrl, setTargetUrl] = useState('https://example.com/new-page');
  const [activeTab, setActiveTab] = useState<'htaccess' | 'nginx' | 'html'>('htaccess');

  const cleanSource = sourcePath.trim().startsWith('/') ? sourcePath.trim() : '/' + sourcePath.trim();
  const cleanTarget = targetUrl.trim();

  // Apache .htaccess
  const htaccessCode = `# SEOFlow Tools Generated ${redirectType} Redirect
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^${cleanSource.replace(/^\//, '')}/?$ ${cleanTarget} [R=${redirectType},L]
</IfModule>

# Alternative simple directive:
# Redirect ${redirectType} ${cleanSource} ${cleanTarget}`;

  // Nginx configuration
  const nginxFlag = redirectType === '301' ? 'permanent' : 'redirect';
  const nginxCode = `# SEOFlow Tools Generated ${redirectType} Nginx Redirect
# Add inside your server { ... } block:

location = ${cleanSource} {
    return ${redirectType} ${cleanTarget};
}

# Regex alternative:
# rewrite ^${cleanSource}/?$ ${cleanTarget} ${nginxFlag};`;

  // HTML Meta Refresh
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${cleanTarget}">
  <link rel="canonical" href="${cleanTarget}">
  <title>Redirecting...</title>
</head>
<body>
  <p>If you are not redirected automatically, <a href="${cleanTarget}">click here</a>.</p>
</body>
</html>`;

  const descriptions = {
    '301': {
      title: '301 Moved Permanently',
      seo: 'Best for permanent URL migrations. Passes ~90-99% of link equity (PageRank). Search engines will update their index to the new destination URL.',
      useCase: 'Permanent website migrations, domain changes, or retired pages.'
    },
    '302': {
      title: '302 Found (Temporary)',
      seo: 'Indicates the content is temporarily moved. Search engines keep the original URL indexed and do not transfer full link equity permanently.',
      useCase: 'A/B testing, seasonal promotions, or temporary maintenance redirects.'
    },
    '307': {
      title: '307 Temporary Redirect (HTTP/1.1)',
      seo: 'Guarantees the HTTP request method (GET/POST) remains unchanged during redirect. Treated similarly to 302 for SEO indexing.',
      useCase: 'Form submissions or API actions temporarily redirected to a fallback server.'
    }
  };

  const currentCode = activeTab === 'htaccess' ? htaccessCode : activeTab === 'nginx' ? nginxCode : htmlCode;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Redirect Rule Generator (301, 302, 307)"
        description="Generate standard 301, 302, and 307 redirect configurations for Apache .htaccess, Nginx, and HTML meta refresh."
        canonicalPath="/redirect-generator"
      />

      <Breadcrumb
        items={[
          { name: 'URL & Redirect Tools', path: '/tools?category=urls' },
          { name: 'Redirect Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Redirect Rule Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Create server configuration rules for Apache, Nginx, or HTML redirects with proper HTTP status codes.
        </p>
      </div>

      {/* Configuration Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
            Redirect Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['301', '302', '307'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setRedirectType(type)}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all text-center ${
                  redirectType === type
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                <div>{type}</div>
                <div className="text-[11px] font-normal opacity-90">
                  {type === '301' ? 'Permanent' : type === '302' ? 'Found (Temp)' : 'HTTP 1.1 Temp'}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-xs space-y-1">
            <div className="font-semibold text-emerald-900 dark:text-emerald-200">
              {descriptions[redirectType].title}
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              {descriptions[redirectType].seo}
            </p>
            <p className="text-stone-500 dark:text-stone-400 italic">
              Common use case: {descriptions[redirectType].useCase}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="source-path"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Old Source Path
            </label>
            <input
              type="text"
              id="source-path"
              value={sourcePath}
              onChange={e => setSourcePath(e.target.value)}
              placeholder="/old-page-name"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              Relative URL path starting with a forward slash
            </span>
          </div>

          <div>
            <label
              htmlFor="target-url"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              New Destination URL
            </label>
            <input
              type="text"
              id="target-url"
              value={targetUrl}
              onChange={e => setTargetUrl(e.target.value)}
              placeholder="https://example.com/new-page-name"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              Target URL (full URL or relative path)
            </span>
          </div>
        </div>

        {/* Output Code Tabs */}
        <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('htaccess')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'htaccess'
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                Apache (.htaccess)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('nginx')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'nginx'
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                Nginx (nginx.conf)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'html'
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                HTML Meta Refresh
              </button>
            </div>
            <CopyButton text={currentCode} label="Copy Rule" variant="secondary" />
          </div>

          <div className="relative">
            <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>

        {/* Server Installation Notice */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>Server Installation Requirement</span>
          </div>
          <p>
            Generated configuration snippets must be uploaded and installed on your own web server (e.g. inside the <code>.htaccess</code> file in your public root directory for Apache, or inside your server block in <code>/etc/nginx/sites-available/</code> for Nginx) to take effect.
          </p>
        </div>
      </div>
    </div>
  );
};
