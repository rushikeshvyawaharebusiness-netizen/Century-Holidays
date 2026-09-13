/*
  ============================================================================
  ROBOTS.TXT — generated, not hand-written
  ============================================================================
  Tells search engines they may crawl the whole site, and points them at the
  sitemap. Generated so the sitemap URL always matches the real domain set as
  `site:` in astro.config.mjs — the old hand-written file had the domain typed
  into it, which silently breaks the moment you move to a custom domain.
  ============================================================================
*/

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', site).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
