import { useEffect } from 'react';
import { getBaseUrl } from '../utils/config';

interface SEOHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  jsonLd?: Record<string, unknown> | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'Free online SEO tools, URL shortener, and website utilities. No API keys or paid subscriptions required.',
  canonicalPath,
  ogType = 'website',
  ogImage,
  publishedTime,
  jsonLd
}) => {
  useEffect(() => {
    // Update Document Title
    const fullTitle = `${title} | SEOFlow Tools`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta description
    setMetaTag('name', 'description', description);

    // Canonical link
    const baseUrl = getBaseUrl();
    const url = canonicalPath ? `${baseUrl}${canonicalPath}` : (typeof window !== 'undefined' ? window.location.href : '');
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', url);
    if (ogImage) {
      const fullImgUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
      setMetaTag('property', 'og:image', fullImgUrl);
      setMetaTag('name', 'twitter:image', fullImgUrl);
    }
    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    // JSON-LD Structured Data
    const existingScript = document.getElementById('seo-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'seo-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const cleanupScript = document.getElementById('seo-structured-data');
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, ogImage, publishedTime, jsonLd]);

  return null;
};
