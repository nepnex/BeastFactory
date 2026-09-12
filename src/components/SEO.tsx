import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../hooks/useData';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'product';
  noIndex?: boolean;
  structuredData?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noIndex = false,
  structuredData,
}) => {
  const { settings } = useData();
  const location = useLocation();

  const siteName = settings.gymName || 'Beast Factory';
  const siteUrl = settings.siteUrl || 'https://beastfactorynepal.com';

  const metaTitle = title
    ? `${title} | ${siteName}`
    : settings.siteTitle || `${siteName} Gym | Premier Fitness Center in Damak, Jhapa`;

  const metaDescription =
    description ||
    settings.defaultMetaDescription ||
    `Beast Factory is the premier gym & fitness center in Damak-1, Falgunanda Chowk, Jhapa, Nepal. Elite personal coaching, bodybuilding, boxing ring, Finnish sauna spa & hydrotherapy. Open 365 days, 3:30 AM – 11:00 PM. Call ${settings.phone}.`;

  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${siteUrl}${currentPath === '/' ? '' : currentPath}`;
  const metaOgImage = ogImage || settings.defaultOgImage || `${siteUrl}/assets/hero_bg.png`;

  useEffect(() => {
    // 1. Title
    document.title = metaTitle;

    // Helper to set meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', metaTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteName);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', metaOgImage);

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', metaTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', metaOgImage);

    // Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // Structured Data (JSON-LD)
    const scriptId = 'beast-factory-structured-data';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (scriptElem) {
      scriptElem.remove();
    }

    if (structuredData) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      scriptElem.text = JSON.stringify(structuredData);
      document.head.appendChild(scriptElem);
    }
  }, [metaTitle, metaDescription, canonicalUrl, metaOgImage, ogType, noIndex, structuredData, siteName]);

  return null;
};
