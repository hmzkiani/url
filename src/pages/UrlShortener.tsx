import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Link as LinkIcon,
  QrCode,
  ExternalLink,
  RotateCcw,
  Sparkles,
  BarChart3,
  Trash2,
  Download,
  AlertCircle,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';
import { ShortLinkItem } from '../types';
import { getShortUrl } from '../utils/config';

export const UrlShortener: React.FC = () => {
  const { addToast } = useToast();
  const [destinationUrl, setDestinationUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLink, setCurrentLink] = useState<ShortLinkItem | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [linkHistory, setLinkHistory] = useState<ShortLinkItem[]>([]);
  const [showQrModal, setShowQrModal] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('seoflow_shortlinks');
      if (saved) {
        setLinkHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load shortlinks history:', e);
    }
  }, []);

  const saveHistory = (items: ShortLinkItem[]) => {
    setLinkHistory(items);
    try {
      localStorage.setItem('seoflow_shortlinks', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save short links:', e);
    }
  };

  const validateUrl = (url: string): { valid: boolean; reason?: string } => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { valid: false, reason: 'Only HTTP and HTTPS destination URLs are allowed.' };
      }
      if (!parsed.hostname || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost')) {
        return { valid: false, reason: 'Please enter a valid web address (e.g. https://example.com).' };
      }
      return { valid: true };
    } catch {
      return { valid: false, reason: 'Please enter a complete, valid URL including https://' };
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let target = destinationUrl.trim();
    if (!target) {
      setError('Please enter a destination URL.');
      return;
    }

    if (!/^https?:\/\//i.test(target)) {
      target = 'https://' + target;
    }

    const validation = validateUrl(target);
    if (!validation.valid) {
      setError(validation.reason || 'Invalid URL.');
      return;
    }

    setLoading(true);

    try {
      // Check if backend companion API is available
      let backendSuccess = false;
      let newLinkItem: ShortLinkItem | null = null;

      try {
        const res = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: target })
        });
        if (res.ok) {
          const data = await res.json();
          newLinkItem = {
            code: data.code,
            destination: data.destination,
            createdAt: data.createdAt,
            clicks: data.clicks || 0
          };
          backendSuccess = true;
        } else {
          const errData = await res.json();
          if (errData.error) {
            setError(errData.error);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Backend not running, proceed in client-side local mode
      }

      if (!backendSuccess || !newLinkItem) {
        // Generate automatic random 6-character code
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        newLinkItem = {
          code,
          destination: target,
          createdAt: new Date().toISOString(),
          clicks: 0
        };
      }

      // Generate QR Code using configured base domain
      const shortUrl = getShortUrl(newLinkItem.code);
      const qr = await QRCode.toDataURL(shortUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff'
        }
      });

      setQrDataUrl(qr);
      setCurrentLink(newLinkItem);

      // Update history list (prepend)
      const updated = [newLinkItem, ...linkHistory.filter(l => l.code !== newLinkItem?.code)];
      saveHistory(updated);

      addToast('Short link generated successfully!', 'success');
      setDestinationUrl('');
    } catch (err: any) {
      setError('An error occurred while generating the short link: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDestinationUrl('');
    setError(null);
    setCurrentLink(null);
    setQrDataUrl(null);
  };

  const handleDeleteHistory = (code: string) => {
    const updated = linkHistory.filter(l => l.code !== code);
    saveHistory(updated);
    if (currentLink?.code === code) {
      setCurrentLink(null);
      setQrDataUrl(null);
    }
    addToast('Link removed from history', 'info');
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl || !currentLink) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${currentLink.code}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('QR Code downloaded!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free URL Shortener & QR Code Generator"
        description="Shorten long URLs with instant QR code generation, safe click redirection, and local analytics. 100% free with no expiration or paid subscriptions."
        canonicalPath="/url-shortener"
      />

      <Breadcrumb
        items={[
          { name: 'URL & Redirect Tools', path: '/tools?category=urls' },
          { name: 'URL Shortener' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Free URL Shortener</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Shorten, Share & Track Links
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Turn long destination URLs into compact, reliable short links with instant high-resolution QR codes.
        </p>
      </div>

      {/* Main Shortener Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <form onSubmit={handleShorten} className="space-y-4">
          <div>
            <label
              htmlFor="destination-url"
              className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2"
            >
              Paste Your Long URL <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <LinkIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  id="destination-url"
                  required
                  value={destinationUrl}
                  onChange={e => setDestinationUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-with-parameters"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  id="shorten-submit-btn"
                  disabled={loading || !destinationUrl.trim()}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                >
                  {loading ? (
                    <span>Shortening...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Shorten URL</span>
                    </>
                  )}
                </button>
                {(destinationUrl || currentLink) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
                    title="Reset form"
                    aria-label="Reset form"
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
            <span>{error}</span>
          </div>
        )}

        {/* Generated Link Result Box */}
        {currentLink && (
          <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Generated Short Link
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Created: {new Date(currentLink.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#151E19] rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="truncate">
                <a
                  href={getShortUrl(currentLink.code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {getShortUrl(currentLink.code)}
                </a>
                <div className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  Target: {currentLink.destination}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <CopyButton
                  text={getShortUrl(currentLink.code)}
                  label="Copy Link"
                  variant="primary"
                />
                <a
                  href={getShortUrl(currentLink.code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  title="Open destination"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                {qrDataUrl && (
                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Inline QR Code Preview */}
            {qrDataUrl && (
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 border-t border-emerald-100 dark:border-emerald-900/60">
                <img
                  src={qrDataUrl}
                  alt={`QR Code for /r/${currentLink.code}`}
                  className="w-24 h-24 rounded-xl border border-white dark:border-stone-800 shadow-xs bg-white p-1"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    High-Resolution QR Code
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Scan with any smartphone camera to visit the destination URL directly.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Technical Notice & Limitations */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Architecture & Deployment Notes</span>
          </div>
          <p>
            • <strong>Local Development / Static Hosting:</strong> Short links are mapped via client storage and routed through our local <code>/r/:code</code> safety handler.
          </p>
          <p>
            • <strong>Production Companion API:</strong> For permanent public redirects reachable across all global visitors without relying on browser storage, deploy the included lightweight Express server (<code>npm run server</code>) or connect your preferred free-tier Node host.
          </p>
          <p>
            • <strong>Safety Verification:</strong> All destinations are strictly checked to allow only secure HTTP/HTTPS endpoints and protect visitors from deceptive intermediate redirects.
          </p>
        </div>
      </div>

      {/* History and Analytics Table */}
      {linkHistory.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <span>Link History & Analytics</span>
            </h2>
            <span className="text-xs text-stone-500">
              {linkHistory.length} {linkHistory.length === 1 ? 'saved link' : 'saved links'}
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151E19] shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Short Link</th>
                  <th className="p-3.5">Destination URL</th>
                  <th className="p-3.5 text-center">Clicks</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 text-stone-700 dark:text-stone-300">
                {linkHistory.map(item => (
                  <tr key={item.code} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="p-3.5 font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      <a href={getShortUrl(item.code)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        /r/{item.code}
                      </a>
                    </td>
                    <td className="p-3.5 max-w-xs truncate" title={item.destination}>
                      {item.destination}
                    </td>
                    <td className="p-3.5 text-center font-semibold text-stone-900 dark:text-white">
                      {item.clicks || 0}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <CopyButton
                          text={getShortUrl(item.code)}
                          label=""
                          variant="icon"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteHistory(item.code)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Delete link"
                          aria-label="Delete link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && qrDataUrl && currentLink && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-[#151E19] rounded-3xl p-6 max-w-sm w-full border border-stone-200 dark:border-stone-800 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              QR Code: /r/{currentLink.code}
            </h3>
            <div className="bg-white p-3 rounded-2xl border inline-block shadow-xs">
              <img src={qrDataUrl} alt="Short URL QR Code" className="w-56 h-56 mx-auto" />
            </div>
            <p className="text-xs text-stone-500 break-all">
              {getShortUrl(currentLink.code)}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadQr}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
