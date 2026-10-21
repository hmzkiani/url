import { getShortLink, recordClick } from '../server/storage.js';

export default async function handler(req, res) {
  // Extract code from query or URL
  let code = req.query?.code;
  if (!code && req.url) {
    const cleanPath = req.url.split('?')[0];
    const match = cleanPath.match(/\/r\/([a-zA-Z0-9-_]+)/);
    if (match) {
      code = match[1];
    } else {
      const parts = cleanPath.split('/').filter(Boolean);
      code = parts[parts.length - 1];
    }
  }

  if (!code || code === 'r') {
    res.writeHead(302, { Location: '/url-shortener' });
    return res.end();
  }

  code = String(code).trim().toLowerCase();
  const item = await getShortLink(code);

  if (!item) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(`<!DOCTYPE html>
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
      a { display: inline-block; background: #059669; color: #fff; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem; transition: background 0.2s; }
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
</html>`);
  }

  // Record click count asynchronously
  recordClick(code).catch(() => {});

  // Direct HTTP 302 Redirection
  res.writeHead(302, {
    Location: item.destination,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  return res.end();
}
