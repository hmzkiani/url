export type ThemeMode = 'light' | 'dark' | 'system';

export type ToolCategory =
  | 'urls'
  | 'seo'
  | 'content'
  | 'technical'
  | 'schema'
  | 'utilities';

export interface ToolItem {
  id: string;
  name: string;
  path: string;
  category: ToolCategory;
  categoryName: string;
  description: string;
  iconName: string;
  badge?: string;
  keywords: string[];
}

export interface ShortLinkItem {
  code: string;
  destination: string;
  createdAt: string;
  clicks: number;
  lastClickedAt?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface SeoAnalysisResult {
  url?: string;
  status?: number;
  pageSizeBytes?: number;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  canonical: string;
  robotsMeta: string;
  viewport: string;
  charset: string;
  language: string;
  h1: string[];
  h2Count: number;
  h3Count: number;
  totalImages: number;
  missingAltImages: string[];
  internalLinks: number;
  externalLinks: number;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
  robotsTxtAvailable?: boolean | null;
  sitemapXmlAvailable?: boolean | null;
}

export interface RedirectHop {
  url: string;
  status: number;
  statusText: string;
  location?: string | null;
  contentType?: string | null;
  server?: string | null;
  error?: string;
}

export interface RedirectCheckResult {
  initialUrl: string;
  finalUrl: string;
  hops: RedirectHop[];
  totalRedirects: number;
  isLoop: boolean;
  finalStatus: number;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogTocItem {
  id: string;
  title: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  publishDate: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  imageNumber: number;
  author: string;
  relatedToolPath: string;
  relatedToolName: string;
  toc: BlogTocItem[];
  contentHtml: string;
  faqs: BlogFaq[];
  relatedSlugs: string[];
}
