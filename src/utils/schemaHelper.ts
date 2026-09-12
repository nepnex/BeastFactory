import { BusinessSettings } from '../types';

/**
 * Generates HealthClub / LocalBusiness JSON-LD schema
 */
export const getLocalBusinessSchema = (settings: BusinessSettings) => {
  const siteUrl = settings.siteUrl || 'https://beastfactorynepal.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': `${siteUrl}/#healthclub`,
    name: settings.gymName || 'Beast Factory',
    alternateName: 'Beast Factory Gym',
    description: settings.defaultMetaDescription || 'Premier gym & fitness center in Damak-1, Jhapa, Nepal.',
    url: siteUrl,
    telephone: settings.phone || '+977 23577880',
    email: settings.email || 'beastfactorynepal@gmail.com',
    logo: `${siteUrl}/assets/logo.png`,
    image: [
      `${siteUrl}/assets/hero_bg.png`,
      `${siteUrl}/assets/logo.png`
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Falgunanda Chowk',
      addressLocality: 'Damak-1',
      addressRegion: 'Jhapa',
      addressCountry: 'NP',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '03:30',
        closes: '23:00'
      }
    ],
    sameAs: [
      settings.facebookUrl || 'https://www.facebook.com/BeastFactoryGymCenter/',
      settings.instagramUrl || 'https://www.instagram.com/beastfactory21/',
      settings.tiktokUrl || 'https://www.tiktok.com/@beastfactory_official'
    ],
    priceRange: 'NPR 2,500 - 9,000',
  };
};

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export const getBreadcrumbSchema = (siteUrl: string, items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`
    }))
  };
};

/**
 * Generates FAQPage JSON-LD schema
 */
export const getFaqSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

/**
 * Generates Product JSON-LD schema
 */
export const getProductSchema = (siteUrl: string, product: { name: string; description: string; priceNpr: number; imageUrls: string[]; inStock: boolean }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrls,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'NPR',
      price: product.priceNpr,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/products`
    }
  };
};

/**
 * Generates Person / Coach JSON-LD schema
 */
export const getTrainerSchema = (siteUrl: string, trainer: { fullName: string; title: string; shortBio: string; photoUrl: string; specializations: string[] }) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: trainer.fullName,
    jobTitle: trainer.title,
    description: trainer.shortBio,
    image: trainer.photoUrl,
    worksFor: {
      '@type': 'HealthClub',
      name: 'Beast Factory Gym',
      url: siteUrl
    },
    knowsAbout: trainer.specializations
  };
};
