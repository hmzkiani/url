import React, { useState, useMemo } from 'react';
import { BarChart2, RotateCcw, Copy, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const KeywordDensity: React.FC = () => {
  const [text, setText] = useState(
    'Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Effective search engine optimization requires keyword research, quality content creation, on-page optimization, and technical website health.'
  );
  const [targetKeyword, setTargetKeyword] = useState('seo');

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        targetOccurrences: 0,
        targetDensity: 0,
        top1Words: [],
        top2Words: [],
        top3Words: []
      };
    }

    const characters = text.length;
    // Extract tokens
    const rawTokens = text.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
    const totalWords = rawTokens.length;

    // Common English stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'from', 'up', 'about', 'into', 'over', 'after', 'is', 'are', 'was', 'were', 'be', 'been',
      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'it', 'its', 'this', 'that', 'these',
      'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which', 'who', 'when', 'where',
      'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
      'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just'
    ]);

    // Target keyword occurrences
    let targetOccurrences = 0;
    if (targetKeyword.trim()) {
      const cleanTarget = targetKeyword.trim().toLowerCase();
      const targetRegex = new RegExp(`\\b${cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = text.match(targetRegex);
      targetOccurrences = matches ? matches.length : 0;
    }
    const targetDensity = totalWords > 0 ? (targetOccurrences / totalWords) * 100 : 0;

    // Top 1-word frequency
    const freq1: Record<string, number> = {};
    for (const w of rawTokens) {
      if (w.length > 2 && !stopWords.has(w)) {
        freq1[w] = (freq1[w] || 0) + 1;
      }
    }
    const top1Words = Object.entries(freq1)
      .map(([word, count]) => ({ word, count, density: (count / totalWords) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top 2-word phrases
    const freq2: Record<string, number> = {};
    for (let i = 0; i < rawTokens.length - 1; i++) {
      const p1 = rawTokens[i];
      const p2 = rawTokens[i + 1];
      if (!stopWords.has(p1) || !stopWords.has(p2)) {
        const phrase = `${p1} ${p2}`;
        freq2[phrase] = (freq2[phrase] || 0) + 1;
      }
    }
    const top2Words = Object.entries(freq2)
      .filter(([, count]) => count > 1)
      .map(([phrase, count]) => ({ phrase, count, density: (count / (totalWords - 1 || 1)) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Top 3-word phrases
    const freq3: Record<string, number> = {};
    for (let i = 0; i < rawTokens.length - 2; i++) {
      const phrase = `${rawTokens[i]} ${rawTokens[i + 1]} ${rawTokens[i + 2]}`;
      freq3[phrase] = (freq3[phrase] || 0) + 1;
    }
    const top3Words = Object.entries(freq3)
      .filter(([, count]) => count > 1)
      .map(([phrase, count]) => ({ phrase, count, density: (count / (totalWords - 2 || 1)) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      words: totalWords,
      characters,
      targetOccurrences,
      targetDensity,
      top1Words,
      top2Words,
      top3Words
    };
  }, [text, targetKeyword]);

  const reportText = `Keyword Density Analysis Report:
Total Words: ${stats.words}
Total Characters: ${stats.characters}
Target Keyword: "${targetKeyword}"
Occurrences: ${stats.targetOccurrences}
Density: ${stats.targetDensity.toFixed(2)}%

Top 1-Word Keywords:
${stats.top1Words.map(w => `- ${w.word}: ${w.count} times (${w.density.toFixed(2)}%)`).join('\n')}
`;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Keyword Density Checker & Text Frequency Analyzer"
        description="Analyze keyword density percentages, multi-word phrases, and identify keyword stuffing issues in your content."
        canonicalPath="/keyword-density"
      />

      <Breadcrumb
        items={[
          { name: 'Keyword & Content Tools', path: '/tools?category=content' },
          { name: 'Keyword Density Checker' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Keyword Density Checker
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Calculate the exact repetition and density of your focus keywords to maintain natural, search-friendly writing.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="density-text" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Paste Article or Web Content
          </label>
          <textarea
            id="density-text"
            rows={7}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label htmlFor="target-keyword" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Focus Target Keyword
            </label>
            <input
              type="text"
              id="target-keyword"
              value={targetKeyword}
              onChange={e => setTargetKeyword(e.target.value)}
              placeholder="e.g. seo, website traffic"
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <CopyButton text={reportText} label="Copy Report" variant="secondary" />
            <button
              type="button"
              onClick={() => {
                setText('');
                setTargetKeyword('');
              }}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Clear text"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Target Keyword Density Metric Banner */}
        {targetKeyword.trim() && (
          <div
            className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              stats.targetDensity > 3.5
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                : stats.targetDensity >= 1 && stats.targetDensity <= 3
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Focus Keyword: &ldquo;{targetKeyword}&rdquo;
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-stone-900 dark:text-white">
                  {stats.targetDensity.toFixed(2)}%
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-300">
                  ({stats.targetOccurrences} {stats.targetOccurrences === 1 ? 'occurrence' : 'occurrences'} in {stats.words} words)
                </span>
              </div>
            </div>

            <div className="text-xs max-w-xs">
              {stats.targetDensity > 3.5 ? (
                <div className="flex items-start gap-1.5 text-rose-800 dark:text-rose-200">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>High density. Consider using synonyms to avoid potential keyword stuffing flags.</span>
                </div>
              ) : stats.targetDensity >= 1 && stats.targetDensity <= 3 ? (
                <div className="flex items-start gap-1.5 text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Optimal natural density range (1% - 3%).</span>
                </div>
              ) : (
                <div className="text-stone-600 dark:text-stone-400">
                  Under 1% density. You may want to ensure the target term appears naturally in key headings and body paragraphs.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phrases Frequency Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              Top 1-Word Keywords
            </h3>
            <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 font-semibold text-stone-500">
                  <tr>
                    <th className="p-2.5">Word</th>
                    <th className="p-2.5 text-center">Count</th>
                    <th className="p-2.5 text-right">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {stats.top1Words.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="p-2.5 font-medium text-stone-800 dark:text-stone-200">{item.word}</td>
                      <td className="p-2.5 text-center text-stone-600 dark:text-stone-400">{item.count}</td>
                      <td className="p-2.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                        {item.density.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              Top 2-Word Phrases
            </h3>
            {stats.top2Words.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 font-semibold text-stone-500">
                    <tr>
                      <th className="p-2.5">Phrase</th>
                      <th className="p-2.5 text-center">Count</th>
                      <th className="p-2.5 text-right">Density</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {stats.top2Words.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                        <td className="p-2.5 font-medium text-stone-800 dark:text-stone-200">{item.phrase}</td>
                        <td className="p-2.5 text-center text-stone-600 dark:text-stone-400">{item.count}</td>
                        <td className="p-2.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          {item.density.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-stone-400 border border-dashed rounded-xl">
                No repeated 2-word phrases found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
