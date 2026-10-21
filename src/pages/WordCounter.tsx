import React, { useState, useMemo } from 'react';
import { FileText, Clock, Volume2, RotateCcw, Copy, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState(
    'Search engine optimization requires consistent publishing of high-quality, relevant content that satisfies user intent. Writing clearly, organizing sections with informative headings, and providing authentic value helps search engines identify your webpage as a trusted authority.'
  );

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        topWords: []
      };
    }

    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;

    const wordsArray = text.trim().match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const words = wordsArray.length;

    // Sentence splitting by . ! ?
    const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length || (words > 0 ? 1 : 0);

    // Paragraph splitting by double newline or newline
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    // Reading time: standard adult avg ~225 words/min
    const readingTimeMinutes = Math.ceil((words / 225) * 10) / 10;
    // Speaking time: avg ~130 words/min
    const speakingTimeMinutes = Math.ceil((words / 130) * 10) / 10;

    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'it', 'its',
      'this', 'that', 'these', 'those', 'as', 'your', 'you', 'we', 'our', 'they', 'their'
    ]);

    const freq: Record<string, number> = {};
    wordsArray.forEach(w => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        freq[lower] = (freq[lower] || 0) + 1;
      }
    });

    const topWords = Object.entries(freq)
      .map(([word, count]) => ({ word, count, percentage: ((count / words) * 100).toFixed(1) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      topWords
    };
  }, [text]);

  const summaryText = `Text Statistics Report:
Words: ${stats.words}
Characters (with spaces): ${stats.charsWithSpaces}
Characters (no spaces): ${stats.charsWithoutSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ~${stats.readingTimeMinutes} min
Speaking Time: ~${stats.speakingTimeMinutes} min`;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Word Counter & Text Character Analyzer"
        description="Count words, characters with/without spaces, sentences, paragraphs, and estimate reading/speaking times instantly in your browser."
        canonicalPath="/word-counter"
      />

      <Breadcrumb
        items={[
          { name: 'Keyword & Content Tools', path: '/tools?category=content' },
          { name: 'Word Counter & Text Analyzer' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Word Counter & Text Analyzer
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Real-time word counts, character limits, sentence complexity, and estimated reading/speaking durations.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">Total Words</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-0.5 block">
              {stats.words.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <span className="text-xs font-semibold text-stone-500 block">Characters</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-0.5 block">
              {stats.charsWithSpaces.toLocaleString()}
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {stats.charsWithoutSpaces} no spaces
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <span className="text-xs font-semibold text-stone-500 block">Sentences</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-0.5 block">
              {stats.sentences}
            </span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {stats.paragraphs} {stats.paragraphs === 1 ? 'paragraph' : 'paragraphs'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
            <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Reading Time</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-0.5 block">
              ~{stats.readingTimeMinutes}m
            </span>
            <span className="text-[11px] text-sky-600/80 dark:text-sky-400/80 block mt-0.5">
              Speaking: ~{stats.speakingTimeMinutes}m
            </span>
          </div>
        </div>

        {/* Text Input Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="word-counter-input" className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              Type or Paste Content
            </label>
            <div className="flex items-center gap-2">
              <CopyButton text={summaryText} label="Copy Stats" variant="secondary" />
              <button
                type="button"
                onClick={() => setText('')}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                title="Clear text"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            id="word-counter-input"
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start typing or paste your article here to analyze word counts in real time..."
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Word Frequency Table */}
        {stats.topWords.length > 0 && (
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Most Frequent Content Words (Excluding Stop Words)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {stats.topWords.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-stone-800 dark:text-stone-200 truncate">{item.word}</span>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{item.count}x</span>
                    <span className="text-[10px] text-stone-400">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
