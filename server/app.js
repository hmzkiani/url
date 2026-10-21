import express from 'express';
import cors from 'cors';
import dns from 'dns/promises';
import { URL } from 'url';
import { getShortLink, saveShortLink, recordClick } from './storage.js';

const app = express();

app.use(cors());

// Vercel Serverless rewrite path normalizer:
// If Vercel rewrites /api/... to /api/index.js, restore the original URL so Express routes match correctly
app.use((req, res, next) => {
  const matchedPath = req.headers['x-matched-path'] || req.headers['x-forwarded-uri'];
  if (matchedPath && (req.url === '/' || req.url === '/api' || req.url === '/api/index.js' || req.url.startsWith('/api/index.js'))) {
    req.url = matchedPath;
  }
  next();
});

// Safe body parser: respects Vercel pre-parsed body or falls back to express.json()
app.use((req, res, next) => {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch (e) {
        // ignore
      }
    }
    return next();
  }
  return express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Malformed JSON payload: ' + err.message });
    }
    next();
  });
});

// SSRF Protection Helper
async function isSafeUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { safe: false, reason: 'Only HTTP and HTTPS protocols are allowed.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost and common local domain names
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.lan') ||
      hostname.endsWith('.home')
    ) {
      return { safe: false, reason: 'Local and internal hostnames are prohibited.' };
    }

    // Resolve IP address
    let lookup;
    try {
      lookup = await dns.lookup(hostname, { all: true });
    } catch (err) {
      return { safe: false, reason: 'Domain name could not be resolved by DNS: ' + err.message };
    }

    for (const record of lookup) {
      const ip = record.address;
      // IPv4 checks
      if (record.family === 4) {
        const parts = ip.split('.').map(Number);
        // 0.0.0.0/8
        if (parts[0] === 0) return { safe: false, reason: 'Reserved IP range prohibited (0.0.0.0/8).' };
        // 127.0.0.0/8 (Loopback)
        if (parts[0] === 127) return { safe: false, reason: 'Loopback IP addresses (127.x.x.x) are prohibited.' };
        // 10.0.0.0/8 (Private)
        if (parts[0] === 10) return { safe: false, reason: 'Private network addresses (10.x.x.x) are prohibited.' };
        // 172.16.0.0/12 (Private)
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
          return { safe: false, reason: 'Private network addresses (172.16-31.x.x) are prohibited.' };
        }
        // 192.168.0.0/16 (Private)
        if (parts[0] === 192 && parts[1] === 168) {
          return { safe: false, reason: 'Private network addresses (192.168.x.x) are prohibited.' };
        }
        // 169.254.0.0/16 (Link-local / Cloud metadata)
        if (parts[0] === 169 && parts[1] === 254) {
          return { safe: false, reason: 'Cloud metadata / link-local addresses (169.254.x.x) are prohibited.' };
        }
        // 255.255.255.255 (Broadcast)
        if (parts[0] === 255 && parts[1] === 255 && parts[2] === 255 && parts[3] === 255) {
          return { safe: false, reason: 'Broadcast IP prohibited.' };
        }
      } else if (record.family === 6) {
        // IPv6 checks
        const lower = ip.toLowerCase();
        if (lower === '::1' || lower === '::' || lower.startsWith('fe80:') || lower.startsWith('fc00:') || lower.startsWith('fd00:')) {
          return { safe: false, reason: 'Internal or loopback IPv6 addresses are prohibited.' };
        }
      }
    }

    return { safe: true, parsed };
  } catch (err) {
    return { safe: false, reason: 'Invalid URL format: ' + err.message };
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    service: 'SEOFlow Companion API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Direct HTTP Redirection Endpoint (/r/:code)
app.get('/r/:code', async (req, res) => {
  const code = (req.params.code || '').trim().toLowerCase();
  const item = await getShortLink(code);

  if (!item) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Short Link Not Found - SEOFlow Tools</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #faf9f5; color: #1c1917; text-align: center; padding: 4rem 1rem; }
            .card { max-width: 440px; margin: 0 auto; background: #fff; padding: 2.5rem 2rem; border-radius: 1.5rem; border: 1px solid #e7e5e4; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
            h1 { font-size: 1.5rem; color: #dc2626; margin-bottom: 0.5rem; font-weight: 700; }
            p { font-size: 0.875rem; color: #78716c; margin-bottom: 1.5rem; line-height: 1.5; }
            code { background: #f5f5f4; padding: 0.2rem 0.4rem; border-radius: 0.375rem; font-weight: 600; color: #44403c; }
            a { display: inline-block; background: #059669; color: #fff; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem; }
            a:hover { background: #047857; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Link Not Found</h1>
            <p>The shortened link <code>/r/${code}</code> does not exist, was deleted, or has expired.</p>
            <a href="/url-shortener">Create a Short Link &rarr;</a>
          </div>
        </body>
      </html>
    `);
  }

  // Increment click counter asynchronously
  recordClick(code).catch(() => {});

  // Instant Real HTTP 302 Redirect
  return res.redirect(302, item.destination);
});

// URL Shortener API: Create short link
app.post('/api/shorten', async (req, res) => {
  try {
    let { url, customAlias } = req.body;
    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ error: 'Destination URL is required.' });
    }

    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    let parsed;
    try {
      parsed = new URL(url);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return res.status(400).json({ error: 'Only HTTP and HTTPS URLs can be shortened.' });
      }
      if (!parsed.hostname) {
        return res.status(400).json({ error: 'Invalid destination domain name.' });
      }
      if (
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname.startsWith('127.') ||
        parsed.hostname === '0.0.0.0' ||
        parsed.hostname === '::1'
      ) {
        return res.status(400).json({ error: 'Loopback IP addresses (127.x.x.x) are prohibited.' });
      }
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format: ' + e.message });
    }

    let code = customAlias ? customAlias.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') : '';
    if (code) {
      if (code.length < 3 || code.length > 30) {
        return res.status(400).json({ error: 'Custom alias must be between 3 and 30 characters.' });
      }
      const existing = await getShortLink(code);
      if (existing) {
        return res.status(409).json({ error: 'Custom alias is already taken. Please choose another.' });
      }
    } else {
      // Generate random 6 character code
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let attempt = 0; attempt < 10; attempt++) {
        let generated = '';
        for (let i = 0; i < 6; i++) {
          generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const existing = await getShortLink(generated);
        if (!existing) {
          code = generated;
          break;
        }
      }
      if (!code) {
        code = Date.now().toString(36).slice(-6);
      }
    }

    const item = {
      code,
      destination: parsed.toString(),
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    const saved = await saveShortLink(item);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL: ' + err.message });
  }
});

// Get short link info
app.get('/api/shortlink/:code', async (req, res) => {
  const code = (req.params.code || '').trim().toLowerCase();
  const item = await getShortLink(code);
  if (!item) {
    return res.status(404).json({ error: 'Short link not found.' });
  }
  res.json(item);
});

// Track click on redirect
app.post('/api/shortlink/:code/click', async (req, res) => {
  const code = (req.params.code || '').trim().toLowerCase();
  const item = await getShortLink(code);
  if (item) {
    await recordClick(code);
    return res.json({ success: true, clicks: (item.clicks || 0) + 1 });
  }
  res.status(404).json({ error: 'Link not found' });
});

// Redirect Status Checker API
app.post('/api/check-redirects', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required.' });

    const initialCheck = await isSafeUrl(url);
    if (!initialCheck.safe) {
      return res.status(400).json({ error: initialCheck.reason });
    }

    let currentUrl = initialCheck.parsed.toString();
    const hops = [];
    const visited = new Set();
    let isLoop = false;
    const MAX_HOPS = 10;

    for (let i = 0; i < MAX_HOPS; i++) {
      if (visited.has(currentUrl)) {
        isLoop = true;
        hops.push({
          url: currentUrl,
          status: 0,
          statusText: 'Redirect Loop Detected',
          error: 'This URL redirects back to an earlier URL in the chain.'
        });
        break;
      }
      visited.add(currentUrl);

      // Verify each hop for SSRF safety
      const hopCheck = await isSafeUrl(currentUrl);
      if (!hopCheck.safe) {
        hops.push({
          url: currentUrl,
          status: 0,
          statusText: 'Blocked Destination',
          error: hopCheck.reason
        });
        break;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(currentUrl, {
          method: 'GET',
          redirect: 'manual',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEOFlowToolsRedirectChecker/1.0; +https://seoflowtools.local)'
          }
        });
        clearTimeout(timeout);

        const status = response.status;
        const statusText = response.statusText || String(status);
        const locationHeader = response.headers.get('location');

        hops.push({
          url: currentUrl,
          status,
          statusText,
          location: locationHeader || null,
          contentType: response.headers.get('content-type') || null,
          server: response.headers.get('server') || null
        });

        // If redirect status, resolve next destination
        if ([301, 302, 303, 307, 308].includes(status) && locationHeader) {
          const nextUrl = new URL(locationHeader, currentUrl).toString();
          currentUrl = nextUrl;
        } else {
          // Terminal response
          break;
        }
      } catch (err) {
        clearTimeout(timeout);
        hops.push({
          url: currentUrl,
          status: 0,
          statusText: 'Connection Error',
          error: err.name === 'AbortError' ? 'Request timed out after 8 seconds.' : err.message
        });
        break;
      }
    }

    const lastHop = hops[hops.length - 1];
    res.json({
      initialUrl: url,
      finalUrl: lastHop ? lastHop.url : url,
      hops,
      totalRedirects: Math.max(0, hops.length - 1),
      isLoop,
      finalStatus: lastHop ? lastHop.status : 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to inspect redirects: ' + err.message });
  }
});

// Simple regex-based HTML metadata extractor
function extractSeoFromHtml(html, pageUrl) {
  const result = {
    title: '',
    titleLength: 0,
    metaDescription: '',
    metaDescriptionLength: 0,
    canonical: '',
    robotsMeta: '',
    viewport: '',
    charset: '',
    language: '',
    h1: [],
    h2Count: 0,
    h3Count: 0,
    totalImages: 0,
    missingAltImages: [],
    internalLinks: 0,
    externalLinks: 0,
    openGraph: {},
    twitter: {}
  };

  try {
    const htmlTagMatch = html.match(/<html\b[^>]*\blang=["']([^"']*)["']/i);
    if (htmlTagMatch) result.language = htmlTagMatch[1];

    const charsetMatch = html.match(/<meta\b[^>]*\bcharset=["']?([^"'>\s]+)/i);
    if (charsetMatch) result.charset = charsetMatch[1];

    const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      result.title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      result.titleLength = result.title.length;
    }

    const metaRegex = /<meta\b([^>]*)>/gi;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      const attrs = match[1];
      const nameMatch = attrs.match(/\b(name|property)\s*=\s*["']([^"']*)["']/i);
      const contentMatch = attrs.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
      if (nameMatch && contentMatch) {
        const key = nameMatch[2].toLowerCase();
        const content = contentMatch[1].trim();

        if (key === 'description') {
          result.metaDescription = content;
          result.metaDescriptionLength = content.length;
        } else if (key === 'robots') {
          result.robotsMeta = content;
        } else if (key === 'viewport') {
          result.viewport = content;
        } else if (key.startsWith('og:')) {
          result.openGraph[key] = content;
        } else if (key.startsWith('twitter:')) {
          result.twitter[key] = content;
        }
      }
    }

    const canonicalMatch = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["']/i) ||
                           html.match(/<link\b[^>]*\bhref=["']([^"']*)["'][^>]*\brel=["']canonical["']/i);
    if (canonicalMatch) result.canonical = canonicalMatch[1].trim();

    const h1Regex = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
    let h1Match;
    while ((h1Match = h1Regex.exec(html)) !== null) {
      const text = h1Match[1].replace(/<[^>]+>/g, '').trim();
      if (text) result.h1.push(text);
    }

    const h2Matches = html.match(/<h2\b[^>]*>/gi);
    result.h2Count = h2Matches ? h2Matches.length : 0;

    const h3Matches = html.match(/<h3\b[^>]*>/gi);
    result.h3Count = h3Matches ? h3Matches.length : 0;

    const imgRegex = /<img\b([^>]*)>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      result.totalImages++;
      const attrs = imgMatch[1];
      const altMatch = attrs.match(/\balt\s*=\s*["']([^"']*)["']/i);
      const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']*)["']/i);
      const altText = altMatch ? altMatch[1].trim() : null;
      if (!altText) {
        const src = srcMatch ? srcMatch[1] : 'unnamed-image';
        if (result.missingAltImages.length < 10) {
          result.missingAltImages.push(src);
        }
      }
    }

    const baseHost = pageUrl ? new URL(pageUrl).hostname : '';
    const linkRegex = /<a\b[^>]*\bhref=["']([^"']*)["']/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null) {
      const href = linkMatch[1].trim();
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }
      try {
        const resolved = pageUrl ? new URL(href, pageUrl) : null;
        if (resolved && resolved.hostname === baseHost) {
          result.internalLinks++;
        } else {
          result.externalLinks++;
        }
      } catch (e) {
        result.internalLinks++;
      }
    }
  } catch (err) {
    console.error('Error parsing HTML:', err);
  }

  return result;
}

// Website SEO Analyzer API
app.post('/api/analyze-seo', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required.' });

    const check = await isSafeUrl(url);
    if (!check.safe) {
      return res.status(400).json({ error: check.reason });
    }

    const targetUrl = check.parsed.toString();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let html = '';
    let status = 200;

    try {
      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (compatible; SEOFlowToolsAnalyzer/1.0; +https://seoflowtools.local)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      clearTimeout(timeout);

      status = response.status;
      if (!response.ok) {
        return res.status(400).json({
          error: `The webpage returned HTTP ${status} (${response.statusText}). Could not perform full SEO audit.`,
          status
        });
      }

      html = await response.text();
    } catch (err) {
      clearTimeout(timeout);
      return res.status(400).json({
        error: err.name === 'AbortError'
          ? 'Request timed out after 12 seconds. The site may be slow or blocking automated crawlers.'
          : 'Could not connect to URL: ' + err.message
      });
    }

    let robotsTxtStatus = null;
    let sitemapXmlStatus = null;

    try {
      const robotsUrl = new URL('/robots.txt', targetUrl).toString();
      const rCheck = await isSafeUrl(robotsUrl);
      if (rCheck.safe) {
        const rRes = await fetch(robotsUrl, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
        robotsTxtStatus = rRes.status === 200;
      }
    } catch (e) {
      robotsTxtStatus = false;
    }

    try {
      const sitemapUrl = new URL('/sitemap.xml', targetUrl).toString();
      const sCheck = await isSafeUrl(sitemapUrl);
      if (sCheck.safe) {
        const sRes = await fetch(sitemapUrl, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
        sitemapXmlStatus = sRes.status === 200;
      }
    } catch (e) {
      sitemapXmlStatus = false;
    }

    const audit = extractSeoFromHtml(html, targetUrl);
    audit.robotsTxtAvailable = robotsTxtStatus;
    audit.sitemapXmlAvailable = sitemapXmlStatus;
    audit.url = targetUrl;
    audit.status = status;
    audit.pageSizeBytes = Buffer.byteLength(html, 'utf8');

    res.json(audit);
  } catch (err) {
    res.status(500).json({ error: 'SEO Analysis failed: ' + err.message });
  }
});

// Broken Link Checker API
app.post('/api/check-links', async (req, res) => {
  try {
    const { url, maxLinks = 20 } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required.' });

    const check = await isSafeUrl(url);
    if (!check.safe) {
      return res.status(400).json({ error: check.reason });
    }

    const pageUrl = check.parsed.toString();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let html = '';
    try {
      const response = await fetch(pageUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEOFlowToolsLinkChecker/1.0; +https://seoflowtools.local)'
        }
      });
      clearTimeout(timeout);
      if (!response.ok) {
        return res.status(400).json({ error: `Page returned HTTP ${response.status}. Cannot crawl links.` });
      }
      html = await response.text();
    } catch (err) {
      clearTimeout(timeout);
      return res.status(400).json({ error: 'Failed to fetch base page: ' + err.message });
    }

    const linkRegex = /<a\b[^>]*\bhref=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    const rawLinks = [];
    const seenHrefs = new Set();
    let match;

    const baseHost = new URL(pageUrl).hostname;

    while ((match = linkRegex.exec(html)) !== null && rawLinks.length < maxLinks) {
      const href = match[1].trim();
      const anchorText = match[2].replace(/<[^>]+>/g, '').trim() || '[No anchor text]';

      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }

      try {
        const fullUrl = new URL(href, pageUrl).toString();
        if (!seenHrefs.has(fullUrl)) {
          seenHrefs.add(fullUrl);
          rawLinks.push({
            url: fullUrl,
            anchorText,
            isInternal: new URL(fullUrl).hostname === baseHost
          });
        }
      } catch (e) {
        // invalid URL
      }
    }

    const results = [];
    for (const linkItem of rawLinks) {
      const linkCheck = await isSafeUrl(linkItem.url);
      if (!linkCheck.safe) {
        results.push({
          ...linkItem,
          status: 0,
          statusText: 'Blocked (Internal/SSRF)',
          error: linkCheck.reason,
          reachable: false
        });
        continue;
      }

      try {
        const linkRes = await fetch(linkItem.url, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000),
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEOFlowToolsLinkChecker/1.0; +https://seoflowtools.local)'
          }
        });
        results.push({
          ...linkItem,
          status: linkRes.status,
          statusText: linkRes.statusText || String(linkRes.status),
          reachable: linkRes.status >= 200 && linkRes.status < 400
        });
      } catch (err) {
        try {
          const getRes = await fetch(linkItem.url, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SEOFlowToolsLinkChecker/1.0; +https://seoflowtools.local)'
            }
          });
          results.push({
            ...linkItem,
            status: getRes.status,
            statusText: getRes.statusText || String(getRes.status),
            reachable: getRes.status >= 200 && getRes.status < 400
          });
        } catch (getErr) {
          results.push({
            ...linkItem,
            status: 0,
            statusText: 'Failed',
            error: getErr.name === 'TimeoutError' ? 'Timeout (5s)' : getErr.message,
            reachable: false
          });
        }
      }
    }

    res.json({
      pageUrl,
      totalChecked: results.length,
      brokenCount: results.filter(r => !r.reachable).length,
      reachableCount: results.filter(r => r.reachable).length,
      links: results
    });
  } catch (err) {
    res.status(500).json({ error: 'Broken link check failed: ' + err.message });
  }
});

export default app;
