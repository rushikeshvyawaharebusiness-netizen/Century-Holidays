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
| **Business address, opening hours, cities served** | `src/data/site.ts` |
| **Trip packages** — names, prices, durations, photos | `src/data/trips.ts` |
| **The top menu / logo / navigation** | `src/components/Navbar.astro` |
| **The menu that slides in on phones** | `src/components/MobileNav.astro` |
| **The footer** — links, newsletter, contact block | `src/components/Footer.astro` |
| **Homepage text, sections and their order** | `src/pages/index.astro` |
| **FAQ questions and answers** | `src/pages/index.astro` (the `faqs` list at the top) |
| **Brand colours, fonts, shadows** | `src/styles/global.css` |
| **The website's live address (domain)** | `astro.config.mjs` → `site:` |

> **Changing the domain:** `site:` in `astro.config.mjs` is the single source of
> truth. Canonical links, the sitemap, robots.txt and social-share previews are
> all built from it. Change it there and everything follows — do not hard-code
> the domain anywhere else.

---

## Project structure

```
src/
├── pages/            One file = one page on the website
│   ├── index.astro       Homepage           →  /
│   ├── about.astro       About Us           →  /about.html
│   ├── book.astro        Booking form       →  /book.html
│   ├── contact.astro     Contact page       →  /contact.html
│   ├── privacy.astro     Privacy Policy     →  /privacy.html
│   ├── terms.astro       Terms & Conditions →  /terms.html
│   ├── sitemap.xml.ts    Generates /sitemap.xml   (do not edit; see site.ts)
│   └── robots.txt.ts     Generates /robots.txt    (do not edit; see site.ts)
│
├── layouts/
│   └── BaseLayout.astro  The shared page shell: <head> tags, SEO, header,
│                         footer and floating contact buttons. Every page
│                         wraps itself in this, so a change here shows on
│                         all six pages at once.
│
├── components/       Reusable blocks. Each file is one visual piece.
│   ├── Navbar.astro             Top header bar (logo, menu, phone, search)
│   ├── MobileNav.astro          Slide-in menu on phones
│   ├── Footer.astro             Footer
│   ├── TripCard.astro           One destination card
│   ├── DestinationCircles.astro Round destination thumbnails row
│   ├── PosterSlider.astro       "Early Bird Sale" offer carousel
│   ├── SideScrollingBanners.astro  Wide banner carousel
│   ├── SpecialitiesSection.astro   "Book with Confidence" list
│   ├── WhyUsSection.astro       "Why Choose Century Holidays"
│   ├── CategoryCard.astro       "Real Experiences" photo cards
│   ├── MarqueeTrack.astro       Auto-scrolling row wrapper
│   ├── FaqItem.astro            One expandable FAQ row
│   ├── FormField.astro          One labelled form input
│   ├── PageHero.astro           Page title banner on inner pages
│   ├── QuickContact.astro       Floating call + WhatsApp buttons
│   ├── TravelerPopupModal.astro Enquiry popup
│   └── icons/                   Small inline SVG icons
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

public/               Files served exactly as-is: favicons, logo.svg, og-cover
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
- `/sitemap.xml` and `/robots.txt`, generated at build time so they can never
  go stale

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

`public/logo.svg`, the favicons and `og-cover.png` are generated from
`src/assets/images/logo.png`:

```bash
node scripts/trace-logo.mjs          # redraws public/logo.svg
node scripts/build-brand-assets.mjs  # redraws favicons + og-cover
```
