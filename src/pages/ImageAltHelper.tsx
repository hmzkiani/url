import React, { useState, useMemo } from 'react';
import { Image, Copy, Sparkles, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const ImageAltHelper: React.FC = () => {
  const [subject, setSubject] = useState('black ceramic pour-over coffee dripper');
  const [context, setContext] = useState('brewing manual filter coffee in a modern kitchen');
  const [keyDetails, setKeyDetails] = useState('steam rising with warm morning light in background');
  const [imageType, setImageType] = useState<'product' | 'article' | 'chart' | 'decorative'>('article');

  const suggestions = useMemo(() => {
    if (imageType === 'decorative') {
      return {
        concise: 'alt=""',
        descriptive: 'alt="" (Mark as purely decorative, ignored by screen readers)',
        detailed: 'alt="" (Screen readers skip decorative borders, spacers, and background patterns)'
      };
    }

    const cleanSubject = subject.trim();
    const cleanContext = context.trim();
    const cleanDetails = keyDetails.trim();

    if (!cleanSubject) {
      return { concise: '', descriptive: '', detailed: '' };
    }

    // 1. Concise
    const concise = cleanSubject;

    // 2. Descriptive & Contextual
    const descriptive = cleanContext
      ? `${cleanSubject} while ${cleanContext.replace(/^(while|during|in)\s+/i, '')}`
      : cleanSubject;

    // 3. Detailed
    const detailed = [cleanSubject, cleanContext, cleanDetails].filter(Boolean).join(', ');

    return { concise, descriptive, detailed };
  }, [subject, context, keyDetails, imageType]);

  const handleReset = () => {
    setSubject('');
    setContext('');
    setKeyDetails('');
    setImageType('article');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Image ALT Text Helper & Accessibility Formatter"
        description="Craft descriptive, accessible, and SEO-friendly image ALT attributes from your image context without keyword stuffing."
        canonicalPath="/image-alt-helper"
      />

      <Breadcrumb
        items={[
          { name: 'Text & Website Utilities', path: '/tools?category=utilities' },
          { name: 'Image ALT Text Helper' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Image ALT Text Helper
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Formulate accessible, descriptive image alternative text that complies with WCAG accessibility guidelines and enhances image search SEO.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Purpose selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Image Role
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'article', label: 'Article / Blog Photo' },
              { id: 'product', label: 'E-Commerce Product' },
              { id: 'chart', label: 'Chart or Infographic' },
              { id: 'decorative', label: 'Purely Decorative' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setImageType(item.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  imageType === item.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {imageType !== 'decorative' ? (
          <div className="space-y-4 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div>
              <label htmlFor="img-subject" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Primary Subject / Main Object <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="img-subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. red vintage bicycle, modern laptop on oak desk"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="img-context" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Context / Action Taking Place
              </label>
              <input
                type="text"
                id="img-context"
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="e.g. parked against a brick wall in autumn park"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="img-details" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                Additional Details / Atmosphere
              </label>
              <input
                type="text"
                id="img-details"
                value={keyDetails}
                onChange={e => setKeyDetails(e.target.value)}
                placeholder="e.g. golden hour sunlight with wicker basket on handlebars"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400 space-y-1">
            <div className="font-semibold text-stone-800 dark:text-stone-200">
              Decorative Image Rule (WCAG 1.1.1)
            </div>
            <p>
              If an image is purely decorative (such as visual flourishes, icons next to explanatory text, or background textures), screen readers should skip it by applying an empty alt attribute: <code>alt=""</code>.
            </p>
          </div>
        )}

        {/* Generated ALT Text Variations */}
        {suggestions.concise && (
          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Generated Suggestions for &lt;img alt="..."&gt;
            </h3>

            {/* Option 1: Concise */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Option 1: Concise & Direct (Recommended for dense layouts)
                </span>
                <p className="font-medium text-sm text-stone-900 dark:text-white mt-0.5">
                  &ldquo;{suggestions.concise}&rdquo;
                </p>
                <span className="text-[11px] text-stone-400">
                  {suggestions.concise.length} characters
                </span>
              </div>
              <CopyButton text={suggestions.concise} label="Copy ALT" variant="secondary" />
            </div>

            {/* Option 2: Descriptive */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Option 2: Descriptive & Contextual (Best for SEO & Screen Readers)
                </span>
                <p className="font-medium text-sm text-stone-900 dark:text-white mt-0.5">
                  &ldquo;{suggestions.descriptive}&rdquo;
                </p>
                <span className="text-[11px] text-stone-400">
                  {suggestions.descriptive.length} characters
                </span>
              </div>
              <CopyButton text={suggestions.descriptive} label="Copy ALT" variant="primary" />
            </div>

            {/* Option 3: Detailed */}
            {suggestions.detailed !== suggestions.descriptive && (
              <div className="p-4 rounded-2xl bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Option 3: Rich / Detailed (For diagrams or featured hero imagery)
                  </span>
                  <p className="font-medium text-sm text-stone-900 dark:text-white mt-0.5">
                    &ldquo;{suggestions.detailed}&rdquo;
                  </p>
                  <span className="text-[11px] text-stone-400">
                    {suggestions.detailed.length} characters
                  </span>
                </div>
                <CopyButton text={suggestions.detailed} label="Copy ALT" variant="secondary" />
              </div>
            )}
          </div>
        )}

        {/* Accessibility Best Practices */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-500" />
            <span>ALT Text Accessibility Guidelines</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Never start with &ldquo;image of&rdquo; or &ldquo;photo of&rdquo; — screen readers already announce images automatically.</li>
            <li>Avoid repetitive keyword stuffing. Describe the functional message the visual conveys to a reader who cannot see it.</li>
            <li>Keep the text concise (typically under 125 characters) so screen reader users can digest it fluidly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
