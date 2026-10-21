import React, { useState, useMemo } from 'react';
import { Sparkles, Download, Copy, Filter, RotateCcw, Info, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';

export const KeywordSuggestions: React.FC = () => {
  const { addToast } = useToast();
  const [seed, setSeed] = useState('seo audit');
  const [filterType, setFilterType] = useState<'all' | 'questions' | 'modifiers' | 'commercial' | 'comparisons'>('all');
  const [selectedPhrases, setSelectedPhrases] = useState<Set<string>>(new Set());

  const suggestions = useMemo(() => {
    const raw = seed.trim().toLowerCase();
    if (!raw) return { questions: [], modifiers: [], commercial: [], comparisons: [], all: [] };

    const questionsList = [
      `how to do ${raw}`,
      `what is ${raw}`,
      `why is ${raw} important`,
      `when to perform ${raw}`,
      `where to find ${raw}`,
      `who needs ${raw}`,
      `can ${raw} improve rankings`,
      `is ${raw} worth it`,
      `how much does ${raw} cost`,
      `how to automate ${raw}`,
      `should i do ${raw} myself`,
      `what are the benefits of ${raw}`
    ];

    const modifiersList = [
      `best ${raw} checklist`,
      `free ${raw} template`,
      `${raw} step by step guide`,
      `${raw} for beginners`,
      `${raw} for small business`,
      `${raw} tips and tricks`,
      `advanced ${raw} strategies`,
      `${raw} best practices 2026`,
      `easy ${raw} tutorial`,
      `complete ${raw} workflow`,
      `${raw} common mistakes`,
      `${raw} examples`
    ];

    const commercialList = [
      `top rated ${raw} tools`,
      `hire ${raw} specialist`,
      `${raw} services near me`,
      `${raw} agency pricing`,
      `cheap ${raw} alternatives`,
      `affordable ${raw} packages`,
      `professional ${raw} consultation`,
      `${raw} software comparison`
    ];

    const comparisonsList = [
      `${raw} vs competitor`,
      `${raw} alternatives`,
      `${raw} pros and cons`,
      `manual ${raw} vs automated`,
      `${raw} review`,
      `${raw} case study`
    ];

    const all = [
      ...questionsList.map(p => ({ phrase: p, type: 'questions' })),
      ...modifiersList.map(p => ({ phrase: p, type: 'modifiers' })),
      ...commercialList.map(p => ({ phrase: p, type: 'commercial' })),
      ...comparisonsList.map(p => ({ phrase: p, type: 'comparisons' }))
    ];

    return {
      questions: questionsList,
      modifiers: modifiersList,
      commercial: commercialList,
      comparisons: comparisonsList,
      all
    };
  }, [seed]);

  const displayedList = useMemo(() => {
    if (filterType === 'all') return suggestions.all;
    return suggestions.all.filter(s => s.type === filterType);
  }, [suggestions, filterType]);

  const toggleSelect = (phrase: string) => {
    const next = new Set(selectedPhrases);
    if (next.has(phrase)) next.delete(phrase);
    else next.add(phrase);
    setSelectedPhrases(next);
  };

  const selectAll = () => {
    if (selectedPhrases.size === displayedList.length) {
      setSelectedPhrases(new Set());
    } else {
      setSelectedPhrases(new Set(displayedList.map(s => s.phrase)));
    }
  };

  const handleExportCsv = () => {
    const items = selectedPhrases.size > 0
      ? Array.from(selectedPhrases)
      : displayedList.map(s => s.phrase);

    if (items.length === 0) return;

    const csvContent = 'data:text/csv;charset=utf-8,' + ['Keyword Suggestion,Category'].concat(
      items.map(p => `"${p}","${filterType}"`)
    ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `keywords-${seed.replace(/\s+/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${items.length} keywords as CSV!`, 'success');
  };

  const copyText = selectedPhrases.size > 0
    ? Array.from(selectedPhrases).join('\n')
    : displayedList.map(s => s.phrase).join('\n');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Keyword Suggestion Helper & Long-Tail Generator"
        description="Generate 40+ long-tail keyword variations, question queries, commercial phrases, and search intent modifiers from any seed keyword."
        canonicalPath="/keyword-suggestions"
      />

      <Breadcrumb
        items={[
          { name: 'Keyword & Content Tools', path: '/tools?category=content' },
          { name: 'Keyword Suggestion Helper' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Keyword Suggestion Helper
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Generate rule-based long-tail phrases, customer questions, and commercial modifiers from any topic or seed phrase.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="seed-keyword" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Enter Seed Keyword
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              id="seed-keyword"
              value={seed}
              onChange={e => setSeed(e.target.value)}
              placeholder="e.g. coffee beans, website design, running shoes"
              className="flex-1 px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {seed && (
              <button
                type="button"
                onClick={() => setSeed('')}
                className="p-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl border border-stone-200 dark:border-stone-700"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: `All (${suggestions.all.length})` },
              { id: 'questions', label: `Questions (${suggestions.questions.length})` },
              { id: 'modifiers', label: `Guides & Tips (${suggestions.modifiers.length})` },
              { id: 'commercial', label: `Commercial (${suggestions.commercial.length})` },
              { id: 'comparisons', label: `Vs / Reviews (${suggestions.comparisons.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={selectAll}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              {selectedPhrases.size === displayedList.length && displayedList.length > 0
                ? 'Deselect All'
                : 'Select All'}
            </button>
            <CopyButton
              text={copyText}
              label={selectedPhrases.size > 0 ? `Copy Selected (${selectedPhrases.size})` : 'Copy All'}
              variant="secondary"
            />
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Suggestion List */}
        <div className="space-y-2">
          {displayedList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {displayedList.map((item, idx) => {
                const isSelected = selectedPhrases.has(item.phrase);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleSelect(item.phrase)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-[#151E19] border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-medium truncate">{item.phrase}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                        {item.type}
                      </span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 dark:border-stone-700'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-400">
              Enter a seed keyword above to generate variations.
            </div>
          )}
        </div>

        {/* Search Volume Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Algorithmic Permutations Notice</span>
          </div>
          <p>
            Suggestions are generated using proven linguistic patterns, question stems, and intent modifiers. They are actionable content ideas and are clearly labeled as algorithmic suggestions, not live paid Google Ads search-volume metrics.
          </p>
        </div>
      </div>
    </div>
  );
};
