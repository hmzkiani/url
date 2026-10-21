/**
 * Configuration helper for resolving base URL across development and production.
 *
 * Rules:
 * 1. If VITE_SITE_URL is explicitly configured (e.g. in Netlify environment variables), use it (trimmed without trailing slash).
 * 2. In browser environments (both local development and deployed client), use `window.location.origin`.
 *    - In development: automatically evaluates to `http://localhost:5173`
 *    - In production (e.g. Netlify at `https://xyz.netlify.app`): automatically evaluates to `https://xyz.netlify.app`
 * 3. Never hardcode localhost as a production fallback.
 */

export function getBaseUrl(): string {
  // 1. Check for custom configured production URL from environment variable
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // 2. Automatically use browser origin in both dev and production
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  // 3. Fallback for SSR / static builds if window is unavailable
  return '';
}

/**
 * Returns the full short link URL for a given code using the configured base URL.
 * Example:
 *  - Dev:  "http://localhost:5173/r/vhy8p9"
 *  - Prod: "https://your-domain.netlify.app/r/vhy8p9"
 */
export function getShortUrl(code: string): string {
  const base = getBaseUrl();
  const cleanCode = encodeURIComponent((code || '').trim().toLowerCase());
  return base ? `${base}/r/${cleanCode}` : `/r/${cleanCode}`;
}
