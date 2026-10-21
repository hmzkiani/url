import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { ShortLinkItem } from '../types';

export const RedirectHandler: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [destination, setDestination] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (!code) {
      setError('Invalid short link code.');
      return;
    }

    let targetUrl: string | null = null;

    const resolveLink = async () => {
      // 1. Try fetching from server companion API
      try {
        const res = await fetch(`/api/shortlink/${code}`);
        if (res.ok) {
          const data = await res.json();
          targetUrl = data.destination;
          // Notify click on server
          fetch(`/api/shortlink/${code}/click`, { method: 'POST' }).catch(() => {});
        }
      } catch {
        // server offline, fallback to localStorage
      }

      // 2. Fallback to localStorage
      if (!targetUrl) {
        try {
          const saved = localStorage.getItem('seoflow_shortlinks');
          if (saved) {
            const list: ShortLinkItem[] = JSON.parse(saved);
            const foundIndex = list.findIndex(l => l.code === code);
            if (foundIndex !== -1) {
              targetUrl = list[foundIndex].destination;
              // increment local clicks
              list[foundIndex].clicks = (list[foundIndex].clicks || 0) + 1;
              list[foundIndex].lastClickedAt = new Date().toISOString();
              localStorage.setItem('seoflow_shortlinks', JSON.stringify(list));
            }
          }
        } catch (e) {
          console.warn('Failed to access local shortlinks:', e);
        }
      }

      if (targetUrl) {
        setDestination(targetUrl);
        // Instant redirection
        window.location.replace(targetUrl);
      } else {
        setError(`Short link "/r/${code}" was not found or has expired.`);
      }
    };

    resolveLink();
  }, [code]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#151E19] rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-xl text-center space-y-6">
        {error ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-stone-900 dark:text-white">
                Link Not Found
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {error}
              </p>
            </div>
            <Link
              to="/url-shortener"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Create New Short Link</span>
            </Link>
          </>
        ) : destination ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-stone-900 dark:text-white">
                Redirecting Safely...
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                You are being redirected in <strong className="text-emerald-600 dark:text-emerald-400">{countdown}s</strong> to:
              </p>
              <div className="p-3 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-700 dark:text-stone-300 break-all text-left">
                {destination}
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={destination}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
              >
                <span>Continue Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/"
                className="block text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 pt-1"
              >
                Cancel & Return to SEOFlow Tools
              </Link>
            </div>
          </>
        ) : (
          <div className="py-8 space-y-4">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
              Verifying link destination...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
