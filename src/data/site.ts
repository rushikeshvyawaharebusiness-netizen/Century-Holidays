/*
  ============================================================================
  SITE + SEO CONTROL PANEL
  ============================================================================
  Almost everything Google reads about this website is set in this one file.
  Edit here and it updates across every page, the sitemap and robots.txt at
  the same time — you should not need to touch the page files for SEO.

  WHAT TO EDIT FOR WHAT:
    - Page titles / descriptions in Google results ...... PAGES (bottom)
    - Business name, address, phone, opening hours ...... BUSINESS
    - Cities you want to rank in ....................... AREAS_SERVED
    - Target keywords .................................. KEYWORDS
    - Which pages appear in the sitemap ................ PAGES

  IMPORTANT — YOUR LIVE DOMAIN:
  The website address itself is NOT set here. It lives in `astro.config.mjs`
  as `site:`. Everything below (canonical links, sitemap, robots.txt, social
  previews) is built from that one value, so when you move to your real
  domain, change it in that file only.
  ============================================================================
*/

import { EMAIL, PHONE_E164, SOCIAL } from './contact';

/* ---------------------------------------------------------------------------
   BUSINESS DETAILS
   Used for the Google "local business" panel (structured data). Keep this
   accurate and identical to your Google Business Profile — Google cross-checks
   the name, address and phone, and mismatches hurt local ranking.
--------------------------------------------------------------------------- */
export const BUSINESS = {
  name: 'Century Holidays',
  tagline: 'Crafting memories for every century',
  /** Short description reused in structured data and social previews. */
  summary:
    'Century Holidays is a travel agency based in Nashik, Maharashtra, planning custom holiday packages, group treks and international tours for travellers from Nashik, Pune and Mumbai.',
  email: EMAIL,
  phone: PHONE_E164,
  address: {
    street: '4th floor, Trinity Towers, near Jairam Glass, Tidke Colony',
    city: 'Nashik',
    region: 'Maharashtra',
    postalCode: '422002',
    country: 'IN',
  },
  geo: { latitude: 19.9975, longitude: 73.7898 },
  /** Days/hours shown in search results. 24-hour clock. */
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },
  /** Profiles Google uses to confirm this is the same business. */
  socialProfiles: [SOCIAL.instagram, SOCIAL.facebook],
  priceRange: '₹₹',
};

/* ---------------------------------------------------------------------------
   AREAS SERVED
   The cities this agency wants to be found in. These are published as
   `areaServed` in structured data, which is the honest way to signal "we serve
   Pune and Mumbai" without claiming an office there. Add a city here and it is
   picked up automatically.
--------------------------------------------------------------------------- */
export const AREAS_SERVED = ['Nashik', 'Pune', 'Mumbai', 'Maharashtra', 'India'];

/* ---------------------------------------------------------------------------
   KEYWORDS
   `primary` is the brand term; `secondary` are the service+city phrases.

   A note worth knowing: the <meta name="keywords"> tag is ignored by Google
   (and has been since 2009). It is written into the pages below because it
   costs nothing and some smaller crawlers still read it, but it is NOT what
   makes you rank. The real ranking work is in the page titles, descriptions
   and structured data in this file, plus the wording on the pages themselves.
--------------------------------------------------------------------------- */
export const KEYWORDS = {
  primary: 'Century Holidays',
  secondary: [
    'travel agency in Nashik',
    'travel company in Nashik',
    'travel agency in Mumbai',
    'travel company in Mumbai',
    'travel agency in Pune',
    'travel company in Pune',
    'tour packages from Nashik',
    'holiday packages Maharashtra',
  ],
};

export const ALL_KEYWORDS = [KEYWORDS.primary, ...KEYWORDS.secondary].join(', ');

/* ---------------------------------------------------------------------------
   PAGES — titles and descriptions shown in Google results
   ---------------------------------------------------------------------------
   `title`       Aim for 50-60 characters. Longer gets cut off with "...".
   `description` Aim for 150-160 characters. This is the grey text under the
                 blue link. It does not affect ranking directly, but a clear
                 one gets more clicks.
   `priority`    Relative importance for the sitemap, 0.0 to 1.0.
   `changefreq`  How often the page content changes.

   Adding a new page? Add an entry here using the same key as its URL path,
   and it appears in the sitemap automatically.
--------------------------------------------------------------------------- */
export interface PageSeo {
  title: string;
  description: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Century Holidays | Travel Agency in Nashik, Pune & Mumbai',
    description:
      'Century Holidays is a trusted travel agency in Nashik serving Pune and Mumbai. Custom tour packages, group treks and international holidays. Call +91 7066187551.',
    priority: 1.0,
    changefreq: 'weekly',
  },
  '/about.html': {
    title: 'About Us | Century Holidays, Travel Company in Nashik',
    description:
      'Meet Century Holidays, an accredited travel company in Nashik serving travellers from Pune and Mumbai. Our story, our certifications and how we plan your trips.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/book.html': {
    title: 'Book Your Trip | Century Holidays Travel Agency',
    description:
      'Book custom holiday packages with Century Holidays, a travel agency serving Nashik, Pune and Mumbai. Group treks, international tours and weekend getaways.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  '/contact.html': {
    title: 'Contact Us | Century Holidays, Travel Agency in Nashik',
    description:
      'Contact Century Holidays, a travel company in Nashik serving Pune and Mumbai. Call +91 7066187551 or WhatsApp our travel experts to start planning your trip.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  '/privacy.html': {
    title: 'Privacy Policy | Century Holidays',
    description:
      'How Century Holidays collects, uses and protects your personal data when you enquire about or book travel with our Nashik-based travel agency.',
    priority: 0.3,
    changefreq: 'yearly',
  },
  '/terms.html': {
    title: 'Terms & Conditions | Century Holidays',
    description:
      'Booking terms, payment schedule, cancellation and rescheduling policy for trips booked with Century Holidays, a travel agency in Nashik, Maharashtra.',
    priority: 0.3,
    changefreq: 'yearly',
  },
};

/** Convenience lookup so a page can just ask for its own metadata. */
export function seoFor(path: string): PageSeo {
  const page = PAGES[path];
  if (!page) {
    throw new Error(
      `No SEO entry for "${path}" in src/data/site.ts. Add one to PAGES so the page gets a title, description and sitemap entry.`,
    );
  }
  return page;
}
