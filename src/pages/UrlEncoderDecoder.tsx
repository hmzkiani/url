import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const UrlEncoderDecoder: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [method, setMethod] = useState<'component' | 'full'>('component');
  const [input, setInput] = useState('https://example.com/search?q=running shoes & apparel');

  const output = useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        return method === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        return method === 'component' ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch (err: any) {
      return `Error: Malformed URI sequence (${err.message})`;
    }
  }, [input, mode, method]);

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free URL Encoder & Decoder (encodeURIComponent / encodeURI)"
        description="Encode and decode special characters, spaces, and UTF-8 query strings safely in your web browser."
        canonicalPath="/url-encoder-decoder"
      />

      <Breadcrumb
        items={[
          { name: 'Text & Website Utilities', path: '/tools?category=utilities' },
          { name: 'URL Encoder / Decoder' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          URL Encoder & Decoder
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Safely convert spaces, punctuation, and non-ASCII characters to standard percent-encoded URI strings and back.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Encode (to %20)
            </button>
            <button
              type="button"
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Decode (from %20)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={method}
              onChange={e => setMethod(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300"
            >
              <option value="component">encodeURIComponent (Strict for query values)</option>
              <option value="full">encodeURI (Preserves http:// &amp; protocol)</option>
            </select>
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Swap input & output"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Input */}
        <div>
          <label htmlFor="encoder-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
            Input Text
          </label>
          <textarea
            id="encoder-input"
            rows={4}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter text or URL to encode/decode..."
            className="w-full p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Converted Output */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
            </label>
            <CopyButton text={output} label="Copy Result" variant="primary" />
          </div>
          <textarea
            rows={4}
            readOnly
            value={output}
            className="w-full p-3.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
