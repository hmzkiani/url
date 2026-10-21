import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-200/80 dark:border-stone-850 bg-white dark:bg-[#0D1310] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 inline-block group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                SEOFlow <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              100% free online SEO toolkit, URL shortener, and technical web utilities.
              Built for website owners, bloggers, and developers to analyze websites, create clean links, and optimize content without paid subscriptions or API keys.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Free forever • No credit card • Local privacy first</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  All Tools (24+)
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  SEO Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/url-shortener" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  URL Shortener
                </Link>
              </li>
              <li>
                <Link to="/seo-analyzer" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  SEO Analyzer
                </Link>
              </li>
              <li>
                <Link to="/sitemap-generator" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Sitemap Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:Askhmzkiani@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Askhmzkiani@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {currentYear} SEOFlow Tools. All rights reserved. Free SEO & Webmaster Toolkit.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with care for webmasters <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
