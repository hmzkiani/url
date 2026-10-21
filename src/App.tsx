import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
import { Loader2 } from 'lucide-react';

// Lazy-loaded page components for optimal performance and fast bundle delivery
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AllTools = lazy(() => import('./pages/AllTools').then(m => ({ default: m.AllTools })));
const UrlShortener = lazy(() => import('./pages/UrlShortener').then(m => ({ default: m.UrlShortener })));
const RedirectGenerator = lazy(() => import('./pages/RedirectGenerator').then(m => ({ default: m.RedirectGenerator })));
const RedirectChecker = lazy(() => import('./pages/RedirectChecker').then(m => ({ default: m.RedirectChecker })));
const UtmBuilder = lazy(() => import('./pages/UtmBuilder').then(m => ({ default: m.UtmBuilder })));
const BrokenLinkChecker = lazy(() => import('./pages/BrokenLinkChecker').then(m => ({ default: m.BrokenLinkChecker })));
const SeoAnalyzer = lazy(() => import('./pages/SeoAnalyzer').then(m => ({ default: m.SeoAnalyzer })));
const MetaTagGenerator = lazy(() => import('./pages/MetaTagGenerator').then(m => ({ default: m.MetaTagGenerator })));
const SerpPreview = lazy(() => import('./pages/SerpPreview').then(m => ({ default: m.SerpPreview })));
const KeywordDensity = lazy(() => import('./pages/KeywordDensity').then(m => ({ default: m.KeywordDensity })));
const KeywordSuggestions = lazy(() => import('./pages/KeywordSuggestions').then(m => ({ default: m.KeywordSuggestions })));
const KeywordGrouping = lazy(() => import('./pages/KeywordGrouping').then(m => ({ default: m.KeywordGrouping })));
const WordCounter = lazy(() => import('./pages/WordCounter').then(m => ({ default: m.WordCounter })));
const ReadabilityChecker = lazy(() => import('./pages/ReadabilityChecker').then(m => ({ default: m.ReadabilityChecker })));
const SitemapGenerator = lazy(() => import('./pages/SitemapGenerator').then(m => ({ default: m.SitemapGenerator })));
const SitemapValidator = lazy(() => import('./pages/SitemapValidator').then(m => ({ default: m.SitemapValidator })));
const RobotsTxtGenerator = lazy(() => import('./pages/RobotsTxtGenerator').then(m => ({ default: m.RobotsTxtGenerator })));
const CanonicalChecker = lazy(() => import('./pages/CanonicalChecker').then(m => ({ default: m.CanonicalChecker })));
const SchemaGenerator = lazy(() => import('./pages/SchemaGenerator').then(m => ({ default: m.SchemaGenerator })));
const ImageAltHelper = lazy(() => import('./pages/ImageAltHelper').then(m => ({ default: m.ImageAltHelper })));
const HttpStatusCodes = lazy(() => import('./pages/HttpStatusCodes').then(m => ({ default: m.HttpStatusCodes })));
const UrlParser = lazy(() => import('./pages/UrlParser').then(m => ({ default: m.UrlParser })));
const UrlEncoderDecoder = lazy(() => import('./pages/UrlEncoderDecoder').then(m => ({ default: m.UrlEncoderDecoder })));
const SlugGenerator = lazy(() => import('./pages/SlugGenerator').then(m => ({ default: m.SlugGenerator })));
const OpenGraphPreview = lazy(() => import('./pages/OpenGraphPreview').then(m => ({ default: m.OpenGraphPreview })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(m => ({ default: m.TermsAndConditions })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const RedirectHandler = lazy(() => import('./pages/RedirectHandler').then(m => ({ default: m.RedirectHandler })));

// Blog Pages
const BlogListing = lazy(() => import('./pages/BlogListing').then(m => ({ default: m.BlogListing })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));

const PageFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
    <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
    <span className="text-xs font-semibold text-stone-500 tracking-wider uppercase">Loading SEOFlow Tools...</span>
  </div>
);

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Short link redirect handler outside main navbar layout for clean redirection */}
              <Route path="/r/:code" element={<RedirectHandler />} />

              {/* Main Application with Header and Footer Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<AllTools />} />
                <Route path="/url-shortener" element={<UrlShortener />} />
                <Route path="/redirect-generator" element={<RedirectGenerator />} />
                <Route path="/redirect-checker" element={<RedirectChecker />} />
                <Route path="/utm-builder" element={<UtmBuilder />} />
                <Route path="/broken-link-checker" element={<BrokenLinkChecker />} />
                <Route path="/seo-analyzer" element={<SeoAnalyzer />} />
                <Route path="/meta-tag-generator" element={<MetaTagGenerator />} />
                <Route path="/serp-preview" element={<SerpPreview />} />
                <Route path="/keyword-density" element={<KeywordDensity />} />
                <Route path="/keyword-suggestions" element={<KeywordSuggestions />} />
                <Route path="/keyword-grouping" element={<KeywordGrouping />} />
                <Route path="/word-counter" element={<WordCounter />} />
                <Route path="/readability-checker" element={<ReadabilityChecker />} />
                <Route path="/sitemap-generator" element={<SitemapGenerator />} />
                <Route path="/sitemap-validator" element={<SitemapValidator />} />
                <Route path="/robots-txt-generator" element={<RobotsTxtGenerator />} />
                <Route path="/canonical-checker" element={<CanonicalChecker />} />
                <Route path="/schema-generator" element={<SchemaGenerator />} />
                <Route path="/image-alt-helper" element={<ImageAltHelper />} />
                <Route path="/http-status-codes" element={<HttpStatusCodes />} />
                <Route path="/url-parser" element={<UrlParser />} />
                <Route path="/url-encoder-decoder" element={<UrlEncoderDecoder />} />
                <Route path="/slug-generator" element={<SlugGenerator />} />
                <Route path="/open-graph-preview" element={<OpenGraphPreview />} />

                {/* Blog Routes */}
                <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Company & Legal */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
