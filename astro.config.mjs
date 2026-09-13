// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  /*
    The live address of the site. Canonical tags, /sitemap.xml and social share
    previews are all built from this value.

    One other place also names the domain: the Sitemap line in
    public/robots.txt, which is a plain file so it can be edited on GitHub.
    If the domain changes, update both.

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
