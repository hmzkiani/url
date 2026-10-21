import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
  ChevronDown,
  Sparkles,
  Link as LinkIcon,
  SearchCheck,
  Wrench,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeMode } from '../types';

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [seoDropdownOpen, setSeoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const seoDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setThemeDropdownOpen(false);
    setSeoDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for theme & seo dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (seoDropdownRef.current && !seoDropdownRef.current.contains(event.target as Node)) {
        setSeoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIcons = {
    light: <Sun className="w-4 h-4 text-amber-500" />,
    dark: <Moon className="w-4 h-4 text-emerald-400" />,
    system: <Laptop className="w-4 h-4 text-stone-400" />
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
      isActive
        ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 font-semibold border border-emerald-200/60 dark:border-emerald-800/60 shadow-xs'
        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-stone-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 dark:border-stone-850 bg-[#FAF9F5]/90 dark:bg-[#0D1310]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Name */}
        <Link
          to="/"
          id="header-logo"
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-xl group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
              SEOFlow <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Tools</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/tools" className={navLinkClass}>
            All Tools
          </NavLink>
          <NavLink to="/url-shortener" className={navLinkClass}>
            URL Shortener
          </NavLink>

          {/* SEO Tools Dropdown */}
          <div className="relative" ref={seoDropdownRef}>
            <button
              type="button"
              onClick={() => setSeoDropdownOpen(!seoDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-stone-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              aria-expanded={seoDropdownOpen}
              aria-haspopup="true"
            >
              <span>SEO Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${seoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {seoDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase text-stone-400 dark:text-stone-500 tracking-wider">
                  Popular SEO Tools
                </div>
                <Link
                  to="/seo-analyzer"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-medium">SEO Analyzer</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">On-page technical audit</div>
                  </div>
                </Link>
                <Link
                  to="/meta-tag-generator"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-medium">Meta Tag Generator</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">OG & Twitter tags</div>
                  </div>
                </Link>
                <Link
                  to="/serp-preview"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-medium">Google SERP Preview</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">Desktop & mobile preview</div>
                  </div>
                </Link>
                <Link
                  to="/sitemap-generator"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="font-medium">XML Sitemap Generator</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">Search engine sitemaps</div>
                  </div>
                </Link>
                <div className="my-1 border-t border-stone-100 dark:border-stone-800" />
                <Link
                  to="/tools"
                  className="block px-3 py-1.5 text-xs font-semibold text-center text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  View all 24+ free tools →
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
        </nav>

        {/* Right side controls: Theme selector & Mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* Theme selector dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="theme-selector-btn"
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-850 border border-stone-200/80 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors"
              aria-label="Theme mode selector"
              aria-expanded={themeDropdownOpen}
            >
              {themeIcons[theme]}
              <span className="hidden sm:inline text-xs font-semibold capitalize text-stone-700 dark:text-stone-200">
                {theme}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#151E19] border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in duration-150">
                {(['light', 'dark', 'system'] as ThemeMode[]).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setTheme(mode);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium capitalize text-left transition-colors ${
                      theme === mode
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {themeIcons[mode]}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-[#FAF9F5]/98 dark:bg-[#0D1310]/98 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top-3 duration-200 shadow-xl">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/tools"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              <span>All Tools (24+)</span>
            </NavLink>
            <NavLink
              to="/url-shortener"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              <span>URL Shortener</span>
              <LinkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </NavLink>
            <NavLink
              to="/seo-analyzer"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              <span>SEO Analyzer</span>
              <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              <span>SEO Blog</span>
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3.5 py-2.5 rounded-xl text-base font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* Mobile Theme selector buttons */}
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2 px-1">
                Theme Appearance
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'dark', 'system'] as ThemeMode[]).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTheme(mode)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium capitalize border transition-all ${
                      theme === mode
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {mode === 'light' && <Sun className="w-3.5 h-3.5" />}
                    {mode === 'dark' && <Moon className="w-3.5 h-3.5" />}
                    {mode === 'system' && <Laptop className="w-3.5 h-3.5" />}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
