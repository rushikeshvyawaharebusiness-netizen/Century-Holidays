// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  /*
    The live address of the site, and the single source of truth for it.
    Canonical tags, /sitemap.xml, /robots.txt and social share previews are all
    built from this value — so this is the ONLY place the domain is written.

    No trailing slash, and it must match the primary domain configured in
    Vercel exactly. If www.centuryholidays.in is ever made primary instead,
    change it here too, otherwise Google is told the canonical page lives at
    the other address.
  */
  site: 'https://centuryholidays.in',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
