# Century Holidays

Marketing website for Century Holidays, a travel agency in Nashik, Maharashtra,
serving travellers from Nashik, Pune and Mumbai.

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).
Pages are pre-rendered to plain HTML at build time, so the live site is static
files with no server to maintain.

---

## "I just want to change X" — start here

| I want to change… | Edit this file |
| --- | --- |
| **Phone number, email, WhatsApp, social links** | `src/data/contact.ts` |
| **Google titles & descriptions, keywords, sitemap** | `src/data/site.ts` |
| **Hide a page from Google / from sitelinks** | `src/data/site.ts` → set `index: false` |
| **robots.txt** — what search engines may crawl | `public/robots.txt` |
| **Business address, opening hours, cities served** | `src/data/site.ts` |
| **Trip packages** — names, prices, durations, photos | `src/data/trips.ts` |
| **The top menu / logo / navigation** | `src/components/Navbar.astro` |
| **The menu that slides in on phones** | `src/components/MobileNav.astro` |
| **The footer** — links, newsletter, contact block | `src/components/Footer.astro` |
| **The "Explore Destinations" grid** (homepage + its own page) | `src/components/DestinationsSection.astro` |
| **The "Trending Trips" section** (homepage + its own page) | `src/components/TrendingSection.astro` |
| **"Why Choose Century Holidays"** (homepage + its own page) | `src/components/WhyUsSection.astro` |
| **Homepage text, sections and their order** | `src/pages/index.astro` |
| **FAQ questions and answers** | `src/pages/index.astro` (the `faqs` list at the top) |
| **Brand colours, fonts, shadows** | `src/styles/global.css` |
| **The website's live address (domain)** | `astro.config.mjs` → `site:` |

> **Changing the domain:** canonical links, the sitemap and social-share
> previews are all built from `site:` in `astro.config.mjs`. The only other
> place the domain is written is the `Sitemap:` line in `public/robots.txt`.
> If the domain changes, update both — nowhere else needs touching.

> **Shared sections:** Destinations, Trending Trips and Why Choose Us each appear
> both on the homepage and on a page of their own. They are the same component
> in both places, so one edit updates both — there is no second copy to keep
> in sync.

---

## Project structure

```
src/
├── pages/            One file = one page on the website
│   ├── index.astro         Homepage              →  /
│   ├── about.astro         About Us              →  /about.html
│   ├── destinations.astro  Explore Destinations  →  /destinations.html
│   ├── trending.astro      Trending Trips        →  /trending.html
│   ├── why-us.astro        Why Choose Us         →  /why-us.html
│   ├── book.astro          Booking form          →  /book.html      (hidden from Google)
│   ├── contact.astro       Contact page          →  /contact.html   (hidden from Google)
│   ├── privacy.astro       Privacy Policy        →  /privacy.html   (hidden from Google)
│   ├── terms.astro         Terms & Conditions    →  /terms.html     (hidden from Google)
│   └── sitemap.xml.ts      Generates /sitemap.xml   (do not edit; see site.ts)
│
├── layouts/
│   └── BaseLayout.astro  The shared page shell: <head> tags, SEO, header,
│                         footer and floating contact buttons. Every page
│                         wraps itself in this, so a change here shows on
│                         every page at once.
│
├── components/       Reusable blocks. Each file is one visual piece.
│   ├── Navbar.astro               Top header bar (logo, menu, phone, search)
│   ├── MobileNav.astro            Slide-in menu on phones
│   ├── Footer.astro               Footer
│   ├── DestinationsSection.astro  "Explore Destinations" filterable grid
│   ├── TrendingSection.astro      "Trending Trips" (scrolling row or grid)
│   ├── WhyUsSection.astro         "Why Choose Century Holidays"
│   ├── SpecialitiesSection.astro  "Book with Confidence" list
│   ├── TripCard.astro             One destination card
│   ├── DestinationCircles.astro   Round destination thumbnails row
│   ├── PosterSlider.astro         "Early Bird Sale" offer carousel
│   ├── SideScrollingBanners.astro Wide banner carousel
│   ├── CategoryCard.astro         "Real Experiences" photo cards
│   ├── MarqueeTrack.astro         Auto-scrolling row wrapper
│   ├── FaqItem.astro              One expandable FAQ row
│   ├── FormField.astro            One labelled form input
│   ├── PageHero.astro             Page title banner on inner pages
│   ├── QuickContact.astro         Floating call + WhatsApp buttons
│   ├── TravelerPopupModal.astro   Enquiry popup
│   └── icons/                     Small inline SVG icons
│
├── data/             Content and settings, kept out of the markup
│   ├── site.ts           SEO control panel + business details  ← most edits
│   ├── contact.ts        Phone, email, WhatsApp, social links
│   ├── trips.ts          All trip packages
│   └── schema.ts         Google structured data (built from site.ts)
│
├── styles/
│   └── global.css        Brand colours, fonts, shared utilities
│
└── assets/images/    Photos used on the site (optimised at build time)

public/               Files served exactly as-is: robots.txt, favicons, logo.svg, og-icon
scripts/              One-off tools that regenerate the favicons from logo.png
```

---

## SEO

Everything Google reads is set in **`src/data/site.ts`**. See the comments in
that file — it is written to be edited without touching any page.

**Target keywords**

- Primary: `Century Holidays`
- Secondary: `travel agency in Nashik`, `travel company in Nashik`,
  `travel agency in Mumbai`, `travel company in Mumbai`,
  `travel agency in Pune`, `travel company in Pune`

**What is in place**

- A unique title and description per page, written around those keywords
- `TravelAgency` + `WebSite` structured data on every page, with `areaServed`
  covering Nashik, Pune and Mumbai
- `FAQPage` structured data on the homepage, so the questions can appear
  directly in Google results
- `BreadcrumbList` on inner pages
- Canonical URLs, Open Graph and Twitter card tags
- `/sitemap.xml`, generated at build time from `src/data/site.ts` so it can
  never go stale
- `/robots.txt`, a plain file at `public/robots.txt` that allows all crawling
  and points search engines at the sitemap

**Sitelinks** (the sub-links under the main Google result)

Google chooses sitelinks automatically; no code or setting can force a
particular page in. What the site controls is which pages are *eligible*.
Only these are indexable, so only these can be picked:

- About Us — `/about.html`
- Explore Destinations — `/destinations.html`
- Trending Trips — `/trending.html`
- Why Choose Century Holidays — `/why-us.html`

Book, Contact, Privacy and Terms carry a `noindex` tag and are left out of the
sitemap, so they drop out of Google over time and cannot appear as sitelinks.
They still work normally for visitors. To change which pages are eligible,
flip `index` for that page in `src/data/site.ts`.

Google takes days to weeks to re-crawl and update sitelinks after a deploy.
Requesting indexing for the new pages in Search Console speeds it up.

**After deploying,** submit the sitemap once in
[Google Search Console](https://search.google.com/search-console)
(Indexing → Sitemaps → enter `sitemap.xml`), and check a page against the
[Rich Results Test](https://search.google.com/test/rich-results).

**Worth knowing:** on-page SEO gets you eligible to rank — it does not by itself
put you at the top for "travel agency in Nashik". For local terms the biggest
remaining lever is a verified **Google Business Profile** with the same name,
address and phone as `site.ts`, plus genuine customer reviews.

---

## Running the site

```bash
npm install        # once
npm run dev        # local preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # preview the built site
```

`dist/` is generated output — it is not committed, and there is no need to edit
it. Deploying means running `npm run build` and publishing `dist/`.

## Regenerating the logo and favicons

`public/logo.svg` is traced from `src/assets/images/logo.png`. The favicons and
`og-icon.png` are drawn from `src/assets/images/logo-mark.png`:

```bash
node scripts/trace-logo.mjs          # redraws public/logo.svg
node scripts/build-brand-assets.mjs  # redraws favicons + og-icon
```

`og-icon.png` is the small image shown when a link to the site is shared on
WhatsApp, Facebook, LinkedIn or X: the favicon's compass disc on the site's dark
ink colour. It is 256×256 on purpose — WhatsApp turns larger images into a big
banner above the message. After replacing it, bump `?v=` on `ogImageURL` in
`src/layouts/BaseLayout.astro`: apps cache preview images by URL, and without
that they keep showing the old one.
