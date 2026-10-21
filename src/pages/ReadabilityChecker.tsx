import React, { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Info, Sparkles, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

export const ReadabilityChecker: React.FC = () => {
  const [text, setText] = useState(
    'Clear and concise writing improves both search engine indexation and user retention. When visitors can read and comprehend your articles quickly, bounce rates drop and engagement metrics rise. Aim to keep paragraphs short, format key ideas with bullet points, and use simple language whenever possible.'
  );

  // Helper to count syllables in an English word
  const countSyllables = (word: string): number => {
    const w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return 0;
    if (w.length <= 3) return 1;

    let clean = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    clean = clean.replace(/^y/, '');
    const matches = clean.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        sentences: 0,
        syllables: 0,
        avgSentenceLength: 0,
        avgSyllablesPerWord: 0,
        fleschEase: 0,
        fleschGrade: 0,
        rating: 'No content',
        recommendations: []
      };
    }

    const wordsArray = text.trim().match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const words = wordsArray.length;
    const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length || (words > 0 ? 1 : 0);

    let totalSyllables = 0;
    let complexWords = 0;
    wordsArray.forEach(w => {
      const syl = countSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) complexWords++;
    });

    const avgSentenceLength = words / (sentences || 1);
    const avgSyllablesPerWord = totalSyllables / (words || 1);

    // Flesch Reading Ease formula:
    // 206.835 - (1.015 * ASL) - (84.6 * ASW)
    let fleschEase = Math.round(206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord));
    if (fleschEase < 0) fleschEase = 0;
    if (fleschEase > 100) fleschEase = 100;

    // Flesch-Kincaid Grade Level formula:
    // (0.39 * ASL) + (11.8 * ASW) - 15.59
    let fleschGrade = Math.round(((0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59) * 10) / 10;
    if (fleschGrade < 1) fleschGrade = 1;

    let rating = 'Standard (Plain English)';
    if (fleschEase >= 80) rating = 'Very Easy to Read (6th Grade)';
    else if (fleschEase >= 70) rating = 'Fairly Easy (7th Grade)';
    else if (fleschEase >= 60) rating = 'Standard (8th - 9th Grade)';
    else if (fleschEase >= 50) rating = 'Fairly Difficult (10th - 12th Grade)';
    else if (fleschEase >= 30) rating = 'Difficult (College Level)';
    else rating = 'Very Difficult (Academic / Graduate)';

    const recs: string[] = [];
    if (avgSentenceLength > 20) {
      recs.push(`Average sentence length is high (${avgSentenceLength.toFixed(1)} words/sentence). Try breaking longer sentences into shorter, punchier thoughts.`);
    } else {
      recs.push(`Sentence length is well balanced (~${avgSentenceLength.toFixed(1)} words/sentence).`);
    }

    if ((complexWords / (words || 1)) > 0.18) {
      recs.push(`Complex words (3+ syllables) represent ${Math.round((complexWords / words) * 100)}% of the text. Consider substituting plain English synonyms where appropriate.`);
    }

    if (fleschEase < 60) {
      recs.push('For general public blogs and websites, aim for a Flesch Reading Ease score between 60 and 70 to maximize audience engagement.');
    } else {
      recs.push('Excellent readability level suitable for broad web audiences.');
    }

    return {
      words,
      sentences,
      syllables: totalSyllables,
      avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      fleschEase,
      fleschGrade,
      rating,
      recommendations: recs
    };
  }, [text]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free Readability Score Checker (Flesch-Kincaid)"
        description="Calculate Flesch Reading Ease and Flesch-Kincaid Grade Level scores to optimize article clarity and reader engagement."
        canonicalPath="/readability-checker"
      />

      <Breadcrumb
        items={[
          { name: 'Keyword & Content Tools', path: '/tools?category=content' },
          { name: 'Readability Score Checker' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Readability Score Checker
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Analyze sentence length, syllable counts, and readability grade levels to make your writing clear and accessible.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Score Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
              Flesch Reading Ease
            </span>
            <div className="text-4xl font-extrabold text-stone-900 dark:text-white mt-1">
              {analysis.fleschEase} <span className="text-sm font-normal text-stone-400">/ 100</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
              {analysis.rating}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Grade Level
            </span>
            <div className="text-4xl font-extrabold text-stone-900 dark:text-white mt-1">
              {analysis.fleschGrade}
            </div>
            <span className="text-xs text-stone-500 block mt-1">
              Equivalent school grade
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Avg. Sentence Length
            </span>
            <div className="text-4xl font-extrabold text-stone-900 dark:text-white mt-1">
              {analysis.avgSentenceLength}
            </div>
            <span className="text-xs text-stone-500 block mt-1">
              Words per sentence
            </span>
          </div>
        </div>

        {/* Input Text Box */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="readability-input" className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
              Content to Evaluate
            </label>
            <button
              type="button"
              onClick={() => setText('')}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
              title="Clear"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <textarea
            id="readability-input"
            rows={8}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your text here to calculate readability metrics..."
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Improvement Recommendations */}
        <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Readability Improvement Advice</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Readability Metric Notice</span>
          </div>
          <p>
            Flesch-Kincaid calculations are statistical formulas based on average sentence lengths and syllable counts. While valuable for broad accessibility, highly technical or specialized topics naturally score with higher grade levels without being inherently flawed.
          </p>
        </div>
      </div>
    </div>
  );
};
