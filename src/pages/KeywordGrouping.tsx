import React, { useState, useMemo } from 'react';
import { Layers, Download, RotateCcw, Info, Sparkles, Plus, Trash2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';

interface KeywordGroup {
  name: string;
  keywords: string[];
}

export const KeywordGrouping: React.FC = () => {
  const { addToast } = useToast();
  const [inputKeywords, setInputKeywords] = useState(
    `best seo tools
free seo audit
seo tools for beginners
how to do seo audit
cheap running shoes
running shoes for men
trail running shoes
marathon running shoes
best coffee beans
buy coffee online
french press coffee beans`
  );

  const [minSharedTokens, setMinSharedTokens] = useState(1);

  // Grouping algorithm based on root token similarity
  const groups = useMemo<KeywordGroup[]>(() => {
    const lines = inputKeywords
      .split('\n')
      .map(k => k.trim())
      .filter(Boolean);

    if (lines.length === 0) return [];

    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'to', 'in', 'of', 'on', 'with', 'how']);

    // Extract core tokens for each keyword
    const parsed = lines.map(line => {
      const tokens = line
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 2 && !stopWords.has(t));
      return { raw: line, tokens };
    });

    // Count frequency of tokens to find prominent anchor themes
    const tokenFreq: Record<string, number> = {};
    parsed.forEach(p => {
      p.tokens.forEach(t => {
        tokenFreq[t] = (tokenFreq[t] || 0) + 1;
      });
    });

    // Sort tokens by frequency
    const topTokens = Object.keys(tokenFreq).sort((a, b) => tokenFreq[b] - tokenFreq[a]);

    const assigned = new Set<string>();
    const clusterMap: Record<string, string[]> = {};

    topTokens.forEach(token => {
      if (tokenFreq[token] > 1) {
        parsed.forEach(p => {
          if (!assigned.has(p.raw) && p.tokens.includes(token)) {
            if (!clusterMap[token]) clusterMap[token] = [];
            clusterMap[token].push(p.raw);
            assigned.add(p.raw);
          }
        });
      }
    });

    // Any remaining keywords go to "General / Uncategorized"
    const remaining: string[] = [];
    parsed.forEach(p => {
      if (!assigned.has(p.raw)) remaining.push(p.raw);
    });

    const result: KeywordGroup[] = Object.entries(clusterMap).map(([root, kws]) => ({
      name: `${root.charAt(0).toUpperCase() + root.slice(1)} Cluster`,
      keywords: kws
    }));

    if (remaining.length > 0) {
      result.push({
        name: 'Unclustered Variations',
        keywords: remaining
      });
    }

    return result;
  }, [inputKeywords]);

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(groups, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-clusters.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('Keyword clusters exported to JSON!', 'success');
  };

  const handleExportCsv = () => {
    const rows = ['Cluster Name,Keyword'];
    groups.forEach(g => {
      g.keywords.forEach(kw => {
        rows.push(`"${g.name}","${kw}"`);
      });
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = 'keyword-clusters.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('Keyword clusters exported to CSV!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Keyword Grouping & Topic Clustering Tool"
        description="Cluster keyword lists into semantic topic clusters based on shared root words and phrase similarity. Export to CSV or JSON."
        canonicalPath="/keyword-grouping"
      />

      <Breadcrumb
        items={[
          { name: 'Keyword & Content Tools', path: '/tools?category=content' },
          { name: 'Keyword Grouping Tool' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Keyword Grouping & Clustering Tool
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Organize large keyword research lists into thematic clusters using linguistic normalization and root token matching.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        <div>
          <label htmlFor="cluster-keywords" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Enter Keywords (One per line)
          </label>
          <textarea
            id="cluster-keywords"
            rows={8}
            value={inputKeywords}
            onChange={e => setInputKeywords(e.target.value)}
            placeholder="keyword one&#10;keyword two&#10;keyword three"
            className="w-full p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="text-xs text-stone-500 font-medium">
            Found <strong className="text-stone-800 dark:text-stone-200">{groups.length}</strong> topic clusters from{' '}
            <strong className="text-stone-800 dark:text-stone-200">
              {inputKeywords.split('\n').filter(k => k.trim()).length}
            </strong>{' '}
            keywords.
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 text-xs font-semibold border border-stone-200 dark:border-stone-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setInputKeywords('')}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              title="Clear input"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clustered Groups Output */}
        <div className="space-y-4 pt-2">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#151E19]/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    {group.name}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    ({group.keywords.length} {group.keywords.length === 1 ? 'keyword' : 'keywords'})
                  </span>
                </div>
                <CopyButton
                  text={group.keywords.join('\n')}
                  label="Copy Group"
                  variant="ghost"
                  className="text-xs py-1 px-2"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Informational Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Similarity Grouping Notice</span>
          </div>
          <p>
            This tool groups keywords by shared lemma roots and grammatical token overlap. It provides a clean starting point for content silos and editorial calendars, but does not claim to represent verified live Google SERP intent clustering.
          </p>
        </div>
      </div>
    </div>
  );
};
