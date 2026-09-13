// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://new-century-holidays-website.vercel.app',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
