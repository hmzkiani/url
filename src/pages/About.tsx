import React from 'react';
import { Sparkles, ShieldCheck, Zap, Heart, Mail, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <SEOHead
        title="About Us - SEOFlow Tools"
        description="Learn about the philosophy, architecture, and mission behind SEOFlow Tools - our free online SEO and link utility platform."
        canonicalPath="/about"
      />

      <Breadcrumb items={[{ name: 'About Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          About SEOFlow Tools
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400">
          Practical web utilities and on-page SEO analysis accessible to everyone without paywalls or subscriptions.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8 leading-relaxed">
        <div className="text-base sm:text-lg text-stone-700 dark:text-stone-200 space-y-4">
          <p className="font-medium text-stone-900 dark:text-white text-xl">
            SEOFlow Tools is a free online toolkit designed to help website owners, bloggers, creators, and developers work more efficiently. Our goal is to make useful SEO and link-management utilities accessible without paid API subscriptions or complicated setup.
          </p>
          <p className="text-stone-600 dark:text-stone-300">
            We focus on practical tools, clear explanations, and a user-friendly experience. Our tools provide guidance and analysis, but results may vary depending on the website, browser, and available technical access.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-100 dark:border-stone-800">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              100% Free Forever
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              No hidden fees, no credit card requirements, and no artificial usage limits. Every tool is built to remain completely free.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              Local-First Processing
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Whenever possible, calculations run directly in your browser. We never log, sell, or collect your private articles or keywords.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-white text-base">
              Honest & Transparent
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              We never fabricate proprietary scores or pretend to have secret Google data. All audits are grounded in clear technical rules.
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-stone-900 dark:text-white">
              Have questions, feedback, or suggestions?
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
              We welcome ideas for new free tools or improvements.
            </div>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </div>
  );
};
