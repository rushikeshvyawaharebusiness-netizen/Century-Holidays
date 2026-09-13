/*
  ============================================================================
  SITEMAP — generated, not hand-written
  ============================================================================
  Builds /sitemap.xml at build time from the PAGES list in src/data/site.ts.

  Why generated: the previous sitemap.xml was typed by hand, so it drifted —
  it listed a stale lastmod date on every page. This version cannot go stale,
  because the page list and the build date come from the code itself.

  TO ADD A PAGE TO THE SITEMAP: add it to PAGES in src/data/site.ts. There is
  nothing to change in this file.

  After deploying, submit https://your-domain/sitemap.xml once in
  Google Search Console (Indexing > Sitemaps). Google re-reads it on its own
  after that.
  ============================================================================
*/

import type { APIRoute } from 'astro';
import { PAGES } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  // Date of the build, as YYYY-MM-DD, which is what <lastmod> expects.
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = Object.entries(PAGES)
    .map(([path, seo]) => {
      const loc = new URL(path, site).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${seo.changefreq}</changefreq>
    <priority>${seo.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
