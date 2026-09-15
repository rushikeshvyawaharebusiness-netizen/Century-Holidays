/*
  ============================================================================
  STRUCTURED DATA (schema.org)
  ============================================================================
  This is the machine-readable description of the business that Google reads
  to build the local result panel — the box with your name, star rating, phone
  number and opening hours.

  You normally do NOT need to edit this file. It is assembled from the details
  in `site.ts` and `contact.ts`, so change those instead.

  To check your work after deploying, paste a page URL into:
    https://search.google.com/test/rich-results
  ============================================================================
*/

import { AREAS_SERVED, BUSINESS, ALL_KEYWORDS } from './site';

/** Absolute URL helper — schema.org requires full URLs, never relative ones. */
const abs = (site: URL | undefined, path: string) => new URL(path, site).href;

/**
 * The main business entity. Published on every page via `@id` so Google treats
 * all pages as belonging to one business rather than several.
 */
export function travelAgencySchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${abs(site, '/')}#organization`,
    name: BUSINESS.name,
    description: BUSINESS.summary,
    slogan: BUSINESS.tagline,
    url: abs(site, '/'),
    logo: abs(site, '/logo.svg'),
    image: abs(site, '/og-icon.png'),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    keywords: ALL_KEYWORDS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    /*
      The honest way to rank for "travel agency in Pune/Mumbai" without
      claiming a physical office there. Edit AREAS_SERVED in site.ts.
    */
    areaServed: AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: BUSINESS.openingHours.days,
      opens: BUSINESS.openingHours.opens,
      closes: BUSINESS.openingHours.closes,
    },
    sameAs: BUSINESS.socialProfiles,
  };
}

/** Identifies the site itself, and wires up the search box in some results. */
export function webSiteSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${abs(site, '/')}#website`,
    name: BUSINESS.name,
    url: abs(site, '/'),
    publisher: { '@id': `${abs(site, '/')}#organization` },
    inLanguage: 'en-IN',
  };
}

/**
 * Describes the page itself and links it to the business and website above, so
 * every page reinforces the one "Century Holidays" entity instead of standing
 * alone. Title and description come from PAGES in site.ts.
 */
export function webPageSchema(
  site: URL | undefined,
  page: { path: string; title: string; description: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(site, page.path)}#webpage`,
    url: abs(site, page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${abs(site, '/')}#website` },
    about: { '@id': `${abs(site, '/')}#organization` },
  };
}

/**
 * Turns the homepage FAQ list into FAQ rich results — the expandable
 * questions that can appear directly under your link in Google.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** The "Home > About" trail Google shows instead of a raw URL. */
export function breadcrumbSchema(
  site: URL | undefined,
  trail: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(site, item.path),
    })),
  };
}
