import { ToolItem } from '../types';

export const TOOLS: ToolItem[] = [
  // URL Shortener & Redirect Tools
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    path: '/url-shortener',
    category: 'urls',
    categoryName: 'URL & Redirect Tools',
    description: 'Create short, memorable links with instant QR code generation, click tracking, and safe redirection.',
    iconName: 'Link',
    badge: 'Popular',
    keywords: ['short link', 'url shortener', 'tiny url', 'qr code', 'link tracker', 'bitly alternative']
  },
  {
    id: 'redirect-generator',
    name: 'Redirect Generator',
    path: '/redirect-generator',
    category: 'urls',
    categoryName: 'URL & Redirect Tools',
    description: 'Generate 301, 302, and 307 redirect rules for Apache .htaccess, Nginx, and HTML meta refresh.',
    iconName: 'GitFork',
    keywords: ['301 redirect', '302 redirect', 'htaccess', 'nginx config', 'url rewrite', 'permanent redirect']
  },
  {
    id: 'redirect-checker',
    name: 'Redirect Status Checker',
    path: '/redirect-checker',
    category: 'urls',
    categoryName: 'URL & Redirect Tools',
    description: 'Follow the full HTTP redirect chain, inspect response codes, and detect infinite redirect loops.',
    iconName: 'Repeat',
    keywords: ['redirect checker', 'http status', 'redirect chain', 'redirect loop', '301 check', 'header check']
  },
  {
    id: 'utm-builder',
    name: 'UTM Campaign Link Builder',
    path: '/utm-builder',
    category: 'urls',
    categoryName: 'URL & Redirect Tools',
    description: 'Build trackable marketing campaign URLs with Google Analytics UTM parameters and live preview.',
    iconName: 'Compass',
    keywords: ['utm builder', 'campaign url', 'utm tags', 'google analytics', 'traffic tracking']
  },
  {
    id: 'broken-link-checker',
    name: 'Broken Link Checker',
    path: '/broken-link-checker',
    category: 'urls',
    categoryName: 'URL & Redirect Tools',
    description: 'Audit webpage links to detect dead 404 links, faulty redirects, and connection timeouts safely.',
    iconName: 'Link2Off',
    keywords: ['broken links', '404 finder', 'dead links', 'link audit', 'crawler']
  },

  // Website SEO Analysis
  {
    id: 'seo-analyzer',
    name: 'Website SEO Analyzer',
    path: '/seo-analyzer',
    category: 'seo',
    categoryName: 'Website SEO Analysis',
    description: 'Inspect meta tags, headings, canonicals, image alt attributes, and technical health of any webpage.',
    iconName: 'SearchCheck',
    badge: 'Core Tool',
    keywords: ['seo audit', 'page analyzer', 'on-page seo', 'meta tags audit', 'seo checker', 'h1 checker']
  },
  {
    id: 'serp-preview',
    name: 'Google SERP Preview',
    path: '/serp-preview',
    category: 'seo',
    categoryName: 'Website SEO Analysis',
    description: 'Simulate how your title, description, and URL appear on Google desktop and mobile search snippets.',
    iconName: 'Eye',
    keywords: ['serp simulator', 'google preview', 'snippet preview', 'title length', 'meta preview']
  },
  {
    id: 'open-graph-preview',
    name: 'Open Graph Social Preview',
    path: '/open-graph-preview',
    category: 'seo',
    categoryName: 'Website SEO Analysis',
    description: 'Preview how your webpage cards look when shared across Facebook, Twitter / X, and LinkedIn.',
    iconName: 'Share2',
    keywords: ['open graph', 'og preview', 'social card', 'twitter card', 'meta preview']
  },

  // Meta Tags & Technical SEO
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    path: '/meta-tag-generator',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Generate clean, standards-compliant HTML meta tags for SEO, Open Graph, and Twitter Cards.',
    iconName: 'FileCode2',
    keywords: ['meta tags', 'html meta', 'og tags', 'twitter card', 'seo head']
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    path: '/sitemap-generator',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Generate valid, search-engine-ready XML sitemaps conforming to sitemaps.org standards.',
    iconName: 'Map',
    keywords: ['sitemap xml', 'xml sitemap generator', 'google sitemap', 'urlset']
  },
  {
    id: 'sitemap-validator',
    name: 'XML Sitemap Validator',
    path: '/sitemap-validator',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Validate sitemap XML syntax, check URL schemas, and diagnose formatting errors.',
    iconName: 'CheckCircle2',
    keywords: ['sitemap validator', 'xml check', 'sitemap test', 'loc validation']
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    path: '/robots-txt-generator',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Create customized crawler rules for Googlebot, Bingbot, and AI scrapers with standard directives.',
    iconName: 'Bot',
    keywords: ['robots txt', 'crawler rules', 'googlebot allow', 'disallow', 'block ai bots']
  },
  {
    id: 'canonical-checker',
    name: 'Canonical Tag Checker',
    path: '/canonical-checker',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Inspect canonical tag declarations in HTML to prevent duplicate content indexing issues.',
    iconName: 'BookmarkCheck',
    keywords: ['canonical tag', 'rel canonical', 'duplicate content', 'canonical url']
  },
  {
    id: 'http-status-codes',
    name: 'HTTP Status Code Guide',
    path: '/http-status-codes',
    category: 'technical',
    categoryName: 'Meta Tags & Technical SEO',
    description: 'Comprehensive directory of 2xx, 3xx, 4xx, and 5xx status codes and their SEO indexing impact.',
    iconName: 'HelpCircle',
    keywords: ['http status', 'status codes', '200 ok', '301 vs 302', '404 vs 410', '500 error']
  },

  // Keyword & Content Tools
  {
    id: 'keyword-density',
    name: 'Keyword Density Checker',
    path: '/keyword-density',
    category: 'content',
    categoryName: 'Keyword & Content Tools',
    description: 'Analyze keyword frequency and density percentages to avoid keyword stuffing penalties.',
    iconName: 'BarChart2',
    keywords: ['keyword density', 'keyword frequency', 'content audit', 'over optimization']
  },
  {
    id: 'keyword-suggestions',
    name: 'Keyword Suggestion Helper',
    path: '/keyword-suggestions',
    category: 'content',
    categoryName: 'Keyword & Content Tools',
    description: 'Generate rule-based question phrases, transactional modifiers, and local intent variations.',
    iconName: 'Sparkles',
    keywords: ['keyword ideas', 'keyword generator', 'question keywords', 'long tail keywords']
  },
  {
    id: 'keyword-grouping',
    name: 'Keyword Grouping Tool',
    path: '/keyword-grouping',
    category: 'content',
    categoryName: 'Keyword & Content Tools',
    description: 'Cluster large keyword lists into thematic clusters using text normalization and root matching.',
    iconName: 'Layers',
    keywords: ['keyword clustering', 'keyword groups', 'keyword bucket', 'search intent grouping']
  },
  {
    id: 'word-counter',
    name: 'Word Counter & Text Stats',
    path: '/word-counter',
    category: 'content',
    categoryName: 'Keyword & Content Tools',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading & speaking times.',
    iconName: 'FileText',
    keywords: ['word counter', 'character count', 'reading time', 'sentence count', 'text stats']
  },
  {
    id: 'readability-checker',
    name: 'Readability Score Checker',
    path: '/readability-checker',
    category: 'content',
    categoryName: 'Keyword & Content Tools',
    description: 'Calculate Flesch Reading Ease and Flesch-Kincaid Grade Level scores with actionable tips.',
    iconName: 'BookOpen',
    keywords: ['readability', 'flesch reading ease', 'grade level', 'text complexity', 'writing clarity']
  },

  // Schema Markup Tools
  {
    id: 'schema-generator',
    name: 'JSON-LD Schema Generator',
    path: '/schema-generator',
    category: 'schema',
    categoryName: 'Schema Markup Tools',
    description: 'Generate structured data for Articles, FAQs, Organizations, Products, Breadcrumbs, and Local Businesses.',
    iconName: 'Code',
    badge: 'Essential',
    keywords: ['schema markup', 'json-ld', 'structured data', 'faq schema', 'rich snippets']
  },

  // Text & Website Utilities
  {
    id: 'image-alt-helper',
    name: 'Image ALT Text Helper',
    path: '/image-alt-helper',
    category: 'utilities',
    categoryName: 'Text & Website Utilities',
    description: 'Craft descriptive, accessible, and SEO-friendly image ALT text without keyword stuffing.',
    iconName: 'Image',
    keywords: ['image alt', 'alt text generator', 'image accessibility', 'seo images']
  },
  {
    id: 'url-parser',
    name: 'Domain & URL Parser',
    path: '/url-parser',
    category: 'utilities',
    categoryName: 'Text & Website Utilities',
    description: 'Break down any URL into protocol, hostname, path segments, and query parameter keys & values.',
    iconName: 'Sliders',
    keywords: ['url parser', 'query string parser', 'url components', 'domain inspection']
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    path: '/url-encoder-decoder',
    category: 'utilities',
    categoryName: 'Text & Website Utilities',
    description: 'Safely encode and decode special characters in URLs using standard URI component specifications.',
    iconName: 'ArrowLeftRight',
    keywords: ['url encode', 'url decode', 'uri component', 'percent encoding']
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    path: '/slug-generator',
    category: 'utilities',
    categoryName: 'Text & Website Utilities',
    description: 'Convert article titles and headings into clean, SEO-friendly, lowercase URL slugs.',
    iconName: 'Hash',
    keywords: ['slug generator', 'url slug', 'permalink generator', 'clean url']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Tools', count: TOOLS.length },
  { id: 'urls', name: 'URL & Redirect Tools', count: TOOLS.filter(t => t.category === 'urls').length },
  { id: 'seo', name: 'Website SEO Analysis', count: TOOLS.filter(t => t.category === 'seo').length },
  { id: 'technical', name: 'Meta Tags & Technical SEO', count: TOOLS.filter(t => t.category === 'technical').length },
  { id: 'content', name: 'Keyword & Content Tools', count: TOOLS.filter(t => t.category === 'content').length },
  { id: 'schema', name: 'Schema Markup Tools', count: TOOLS.filter(t => t.category === 'schema').length },
  { id: 'utilities', name: 'Text & Website Utilities', count: TOOLS.filter(t => t.category === 'utilities').length },
];
